# RNA Mining: Global Context

## Architecture Overview
- Orchestration: Docker Compose (Nginx + Frontend + Backend).
- Biological Rule: Legacy "bug-for-bug" compatibility explicitly dropped. RNA (U) MUST be converted to DNA (T) before feature extraction to prevent XGBoost zero-vectors.
- Proxy: Nginx Reverse Proxy as Global Entrypoint (Port 80).
- Backend: FastAPI (Hexagonal/Vertical Slice).
- ML Pipeline: Scikit-learn + Joblib for model persistence.
- Data: Biopython for FASTA/FASTQ parsing.

## Directory Standards
- `backend/app/models/`: Production ML models (.pickle/.joblib).
- `backend/app/lifespan`: Model DI managed via FastAPI lifespan context.
- `backend/app/schemas/`: Pydantic DTOs (Primitive-bound).
- `backend/app/utils/`: Business logic and stream parsers.
- `backend/app/utils/validators.py`: Biometric string sanitization SSoT.
- `backend/app/samples/`: Datasets (coding.fasta, noncoding.fasta, edata.fasta).
- `backend/conftest.py`: Configures PYTHONPATH for local test execution.
- `leai_docs/planning/`: Source of truth for roadmap and backlog.

## Frontend Structure & Design System
- `frontend/src/components/`: Pure presentational UI components.
- `frontend/src/hooks/`: Custom state management hooks decoupled from views.
- Layout: Dark theme shell (`#0f172a` wrapper) with sticky footer and containers.
- `useFastaUpload`: Custom hook managing file drag-drop, extension validation, and state.
- `FastaUploadCard`: Pure view dropzone component bound to `useFastaUpload` hook handlers.
- `useOrganismSelect`: Hook for managing selected organism species primitive state.
- `OrganismCard`: Pure view dropdown component bound to `useOrganismSelect` handlers.
- `runInferenceApi`: API client service posting FASTA bytes and organism to `/api/inference`.
- `useAnalysisRunner`: Hook binding upload state, organism selection, and API response.
- `RunButton`: Interactive execution button with loading and disabled states.
- **React Fractality Pattern (Mode D)**: Strict separation enforced. Headless hooks (`useTableLogic`, `useFastaExport`) handle data math, pagination, and Blob serialization. Views (`ResultsTable`, `Results` page) are purely "dumb" consumers accepting primitive states and callbacks.
[DECLARE STATE: STATE_EXECUTION]