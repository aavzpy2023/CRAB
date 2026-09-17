# RNA Mining Global Architecture Context

## Static Assets & UI Downloads
- **Isolation Rule**: UI download components (e.g., `Download.jsx`) MUST remain "Dumb Views".
- **Zero-State**: They are isolated pure links pointing strictly to static assets in `frontend/public/` (like `/standalone.zip` and `/samples.zip`). 
- **Generation Constraint**: These zip bundles are generated offline by Python dev scripts (e.g., `_scripts/dev/build_samples_zip.py`), ensuring no backend state or dynamic DTO processing is involved when users request files.