# RNA Mining Global Architecture Context

## Static Assets & UI Downloads
- **Isolation Rule**: UI download components (e.g., `Download.jsx`) MUST remain "Dumb Views".
- **Zero-State**: They are isolated pure links pointing strictly to static assets in `frontend/public/` (like `/standalone.zip` and `/samples.zip`). 
- **Generation Constraint**: These zip bundles are generated offline by Python dev scripts (e.g., `_scripts/dev/build_samples_zip.py`), ensuring no backend state or dynamic DTO processing is involved when users request files.

## Deployment
- **Dev vs Prod Split**: `docker-compose.yml` (root) is DEV ONLY — bind-mounts source, runs Vite dev server and Uvicorn `--reload`, uses `npm install`. Production uses a separate stack that builds static assets with `npm ci` and runs without source mounts or `--reload`.
- Files: `docker-compose.prod.yml`, `frontend/Dockerfile.prod`, `backend/Dockerfile.prod`, `nginx/nginx.prod.conf`, `Makefile` (`up-prod`/`down-prod`/`build-prod`/`logs-prod` targets).