import argparse
import itertools
import sys
from pathlib import Path

import joblib
import pandas as pd
import xgboost as xgb


def generate_kmers() -> list[str]:
    """Generates all 64 static 3-mer DNA combinations."""
    nucleotides = ["A", "C", "G", "T"]
    return ["".join(p) for p in itertools.product(nucleotides, repeat=3)]


def extract_features(sequence: str, kmers: list[str]) -> dict[str, float]:
    """Counts overlapping 3-mers in sequence and strictly normalizes them."""
    counts = {k: 0.0 for k in kmers}
    seq_len = len(sequence)
    if seq_len < 3:
        return counts

    for i in range(seq_len - 2):
        kmer = sequence[i : i + 3]
        if kmer in counts:
            counts[kmer] += 1.0

    denominator = seq_len - 2
    for k in counts:
        counts[k] /= denominator

    return counts


def run_inference(records: list[tuple[str, str]], model_path: str) -> list[dict]:
    """Loads XGBoost model, runs prediction and applies classification threshold."""
    if not Path(model_path).is_file():
        raise FileNotFoundError(f"Model file not found: {model_path}")

    kmers = generate_kmers()
    features_list = [extract_features(seq, kmers) for _, seq in records]
    df = pd.DataFrame(features_list, columns=kmers)

    print(f"[*] Loading model from {model_path}...")
    model = joblib.load(model_path)
    dmatrix = xgb.DMatrix(df)
    
    print("[*] Running inference...")
    probs = model.predict(dmatrix)

    results = []
    for (header, seq), prob in zip(records, probs):
        float_prob = float(prob)
        classification = "coding_protein" if float_prob > 0.4629 else "ncRNA"
        results.append(
            {
                "id": header,
                "sequence": seq,
                "prediction": float_prob,
                "classification": classification,
                "probability": float_prob,
            }
        )
    return results


def setup_argparse() -> argparse.Namespace:
    """
    Configures CLI arguments for the standalone inference script.
    """
    parser = argparse.ArgumentParser(description="CRAB Standalone Researcher CLI")
    parser.add_argument(
        "-p",
        "--path",
        required=True,
        help="Input FASTA file path",
    )
    parser.add_argument(
        "-o",
        "--output",
        required=True,
        help="Output directory path",
    )
    parser.add_argument(
        "-m",
        "--model",
        default="Bacteria.pkl",
        help="Model file path (default: Bacteria.pkl)",
    )
    return parser.parse_args()


def parse_fasta_file(filepath: str):
    """
    Yields (header, sequence) tuples from a FASTA file.
    Automatically standardizes sequences to uppercase DNA (U -> T).
    Concatenates multi-line sequences safely.
    """
    path = Path(filepath)
    if not path.is_file():
        raise FileNotFoundError(f"FASTA file not found: {filepath}")

    header = None
    seq_lines = []

    with open(path, "r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line:
                continue

            if line.startswith(">"):
                if header is not None:
                    # Normalization: Upper case and RNA(U) to DNA(T) conversion
                    seq = "".join(seq_lines).upper().replace("U", "T")
                    yield header, seq
                header = line[1:].strip()
                seq_lines = []
            else:
                seq_lines.append(line)

        # Yield the final sequence record
        if header is not None:
            seq = "".join(seq_lines).upper().replace("U", "T")
            yield header, seq


def main():
    try:
        args = setup_argparse()
        print(f"[*] Starting standalone processing for: {args.path}")

        records = list(parse_fasta_file(args.path))
        print(f"[*] Parsed {len(records)} sequences successfully.")

        results = run_inference(records, args.model)
        print(f"[*] Inference completed for {len(results)} sequences.")

        # Pending: CSV Export (Story 11.3)

    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()