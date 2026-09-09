from fastapi import FastAPI, UploadFile, File, Form, HTTPException
import sys
from typing import List
from pathlib import Path
from contextlib import asynccontextmanager
from app.schemas.fasta import (
    SampleFastaResponse, FastaRecordDTO, 
    PredictionRequestDTO, PredictionResponseDTO, PredictionResultDTO
)
import pandas as pd
try:
    import xgboost as xgb
except ImportError:
    xgb = None
from app.utils.fasta_parser import parse_fasta_bytes
from app.utils.model_loader import load_model
from app.utils.feature_extraction import extract_3mers, KMER_KEYS

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Handles application startup and shutdown events."""
    base_dir = Path(__file__).resolve().parent
    model_dir = base_dir / "app" / "models"
    candidates = list(model_dir.glob("*.pkl")) + list(model_dir.glob("*.joblib"))
    model_path = str(candidates[0]) if candidates else str(model_dir / "rna_classifier.joblib")
    app.state.model = load_model(model_path)
    yield
    if hasattr(app.state, "model"):
        del app.state.model

app = FastAPI(lifespan=lifespan)

@app.get("/api/v1/models")
def get_models():
    """Scans the models directory and returns available model names."""
    base_dir = Path(__file__).resolve().parent
    model_dir = base_dir / "app" / "models"
    if not model_dir.exists():
        return {"models": []}
    return {"models": sorted([p.stem for p in model_dir.glob("*.pkl")])}

@app.get("/api/v1/fasta/sample", response_model=SampleFastaResponse)
def get_sample_fasta():
    """
    Returns a predefined sample FASTA file content for exploration.
    """
    base_dir = Path(__file__).resolve().parent
    sample_path = base_dir / "app" / "samples" / "sample.fasta"
    content = sample_path.read_text()
    
    records = []
    lines = content.splitlines()
    for i in range(0, len(lines), 2):
        header = lines[i].replace(">", "")
        seq = lines[i+1]
        records.append(FastaRecordDTO(
            header=header, 
            sequence=seq, 
            length=len(seq)
        ))
    
    return SampleFastaResponse(filename="sample.fasta", records=records)

@app.post("/api/v1/fasta/upload", response_model=List[FastaRecordDTO])
async def upload_fasta(file: UploadFile = File(...)):
    """
    Receives a .fasta file, parses it, and returns structured DTOs.
    """
    if not file.filename.lower().endswith((".fasta", ".fa")):
        raise HTTPException(status_code=400, detail="Invalid file extension")
    
    content = await file.read()
    return parse_fasta_bytes(content)

@app.post("/api/v1/fasta/predict", response_model=PredictionResponseDTO)
async def predict_fasta(request: PredictionRequestDTO):
    """
    Executes ML inference on a list of FASTA records.
    """
    if not getattr(app.state, "model", None):
        raise HTTPException(status_code=503, detail="Model not loaded")
    if xgb is None:
        raise HTTPException(status_code=503, detail="XGBoost not installed")

    results = []
    for record in request.records:
        # Feature extraction: trinucleotide matrices
        features = extract_3mers(record.sequence)
        dmatrix = xgb.DMatrix(pd.DataFrame([features], columns=KMER_KEYS))
        prob = float(app.state.model.predict(dmatrix)[0])
        pred = 1 if prob > 0.4629 else 0
        classification = "coding" if pred == 1 else "non-coding"
        
        results.append(PredictionResultDTO(
            header=record.header,
            sequence=record.sequence,
            prediction=pred,
            probability=round(prob, 4),
            classification=classification
        ))
    
    return PredictionResponseDTO(results=results, model_version="v1.0.0")

@app.post("/api/inference")
async def run_inference(
    file: UploadFile = File(...),
    organism: str = Form(default="")
):
    base_dir = Path(__file__).resolve().parent
    model_dir = base_dir / "app" / "models"
    selected = None
    if organism:
        for ext in ("", ".pkl", ".joblib"):
            cand = model_dir / f"{organism}{ext}"
            if cand.is_file():
                selected = cand
                break
    if selected:
        app.state.model = load_model(str(selected))
    elif not getattr(app.state, "model", None):
        candidates = list(model_dir.glob("*.pkl")) + list(model_dir.glob("*.joblib"))
        if candidates:
            app.state.model = load_model(str(candidates[0]))
        if not getattr(app.state, "model", None):
            raise HTTPException(status_code=503, detail="Model not loaded")
    if xgb is None:
        raise HTTPException(status_code=503, detail="XGBoost not installed")

    content = await file.read()
    records = parse_fasta_bytes(content)
    predictions = []
    if records:
        feature_rows = [extract_3mers(r.sequence) for r in records]
        df = pd.DataFrame(feature_rows, columns=KMER_KEYS)
        dmatrix = xgb.DMatrix(df)
        probs = app.state.model.predict(dmatrix)
        for r, prob in zip(records, probs):
            p_val = float(prob)
            label = "coding_protein" if p_val > 0.4629 else "ncRNA"
            predictions.append({
                "id": r.header,
                "sequence": r.sequence,
                "prediction": label,
                "classification": label,
                "probability": round(p_val, 4)
            })

    return {
        "status": "success",
        "jobId": f"crab_{len(records)}",
        "organism": organism,
        "predictions": predictions
    }

@app.get("/api/requirements")
def get_requirements():
    return {
        "python_version": sys.version.split()[0],
        "framework": "FastAPI 0.110.0",
        "database": "SQLITE (Versión: N/A)",
        "proxy": "Nginx (Puerto 80)" if True else "Directo (Puerto 5173/8000)",
        "status": "¡Entorno moderno con pyproject.toml listo! 🚀"
    }
