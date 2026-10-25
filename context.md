# RNA Mining Global Architecture Context

## Static Assets & UI Downloads
- **Isolation Rule**: UI download components (e.g., `Download.jsx`) MUST remain "Dumb Views".
- **Zero-State**: They are isolated pure links pointing strictly to static assets in `frontend/public/` (like `/standalone.zip` and `/samples.zip`). 
- **Probability Ordering Contract**: All inference predictions displayed in the results table and generated in export files (FASTA/CSV for Full, Coding, and Non-Coding) MUST be strictly sorted descending by probability.
- **Generation Constraint**: These zip bundles are generated offline by Python dev scripts (e.g., `_scripts/dev/build_samples_zip.py`), ensuring no backend state or dynamic DTO processing is involved when users request files.

## Deployment
- **Dev vs Prod Split**: `docker-compose.yml` (root) is DEV ONLY — bind-mounts source, runs Vite dev server and Uvicorn `--reload`, uses `npm install`. Production uses a separate stack that builds static assets with `npm ci` and runs without source mounts or `--reload`.
- Files: `docker-compose.prod.yml`, `frontend/Dockerfile.prod`, `backend/Dockerfile.prod`, `nginx/nginx.prod.conf`, `Makefile` (`up-prod`/`down-prod`/`build-prod`/`logs-prod` targets).

## Backend Core Rules & Resilience
- **FASTA Validation Protocol**: The core FASTA parser explicitly supports standard IUPAC ambiguity codes (e.g., `N`) and auto-sanitizes multi-line and whitespace formatting. 
- **API Boundary Marshalling**: All validation failures occurring at the Core Pydantic DTO layer (`ValidationError`) MUST be trapped by the API boundary endpoints (e.g., `upload`, `inference`) and returned as `400 Bad Request` to prevent bubbling up as `500 Internal Server Error`.