---
type: "roadmap"
epic_name: "CRAB Branding & Legacy ML Logic Synchronization"
domain: "Full-Stack"
complexity_aggregate: "HARD"
---

EPIC 0: BASE INFRASTRUCTURE & DEPENDENCIES | [ISOLATED VERTICAL]

- [x] Story 0.0: Roadmap & Planning Initialization | [MoSCoW: MUST] | [Complexity: TRIVIAL] 
  Business Requirement: Initialize sequential agentic memory state trackers ensuring DAG dependencies. 
  Story Context Radius: {"leai_docs/planning/global_backlog.md": ["*"]} 
  Layered Technical Breakdown: 
  [ID-0.0.1] [PLANNING/INIT]: [1. Create leai_docs/planning/ directory if missing. 2. Append EPIC 9 and [REQ-026] to [REQ-029] to leai_docs/planning/global_backlog.md. 3. Write THIS ENTIRE raw markdown response (INCLUDING the YAML Frontmatter block above) into leai_docs/planning/roadmap_9_crab_ml_sync.md]. Type: Task.

- [x] Story 0.1: ML Dependency Provisioning | [MoSCoW: MUST] | [Complexity: EASY] (<-- REQ-026) 
  Business Requirement: Provision native XGBoost and Pandas dependencies required for legacy model execution. 
  > Files touched: backend/pyproject.toml, backend/rna_mining_backend.egg-info/requires.txt
  Story Context Radius: {"backend/pyproject.toml": [""], "backend/rna_mining_backend.egg-info/requires.txt": [""], "leai_docs/planning/roadmap_9_crab_ml_sync.md": [""], "leai_docs/planning/global_backlog.md": [""]} 
  Layered Technical Breakdown (FLASH-COMPATIBLE ALGORITHMS): 
  [ID-0.1.1] [ENVIRONMENT/DEPS]: [1. Open backend/pyproject.toml. 2. Add xgboost>=2.0.0 and pandas>=2.0.0 to dependencies. 3. Mirror these additions in backend/rna_mining_backend.egg-info/requires.txt]. Type: Task. 
  [ID-0.1.2] [PLANNING/SYNC]: [1. Open roadmap_9_crab_ml_sync.md and check - [x] for Story 0.1. 2. Append > Files touched: [files] under the story]. Type: Task.

EPIC 1: ML LOGIC SYNCHRONIZATION (BACKEND) | [ISOLATED VERTICAL]

- [ ] Story 1.0: DNA Codon Feature Extraction | [MoSCoW: MUST] | [Complexity: HARD] (<-- REQ-026) 
  Business Requirement: Align feature extraction mathematically with the legacy script (DNA bases, non-overlapping codons, relative frequencies). 
  Story Context Radius: {"backend/app/utils/feature_extraction.py": [""], "backend/tests/test_fasta_parser.py": [""], "leai_docs/planning/roadmap_9_crab_ml_sync.md": [""], "leai_docs/planning/global_backlog.md": [""]} 
  Layered Technical Breakdown (FLASH-COMPATIBLE ALGORITHMS): 
  [ID-1.0.1] [TESTING/TDE]: [1. Open test_fasta_parser.py. 2. Update test_extract_3mers_normalized_list to pass a DNA sequence (e.g., 'ATCGCT'). 3. Assert the resulting array has length 64 and correctly calculates non-overlapping frequencies]. Type: Task. 
  [ID-1.0.2] [LOGIC/CONSTANTS]: [1. Open feature_extraction.py. 2. Change BASES to ['A', 'C', 'G', 'T']. 3. Ensure KMER_KEYS generates the 64 combinations correctly]. Type: Task. 
  [ID-1.0.3] [LOGIC/MATH]: [1. In extract_3mers, rewrite the loop to iterate using range(0, len(sequence) - 2, 3) to extract non-overlapping codons. 2. Calculate frequencies by dividing by the total number of valid codons, exactly as the legacy script does]. Type: Task. 
  [ID-1.0.4] [PLANNING/SYNC]: [1. Open roadmap_9_crab_ml_sync.md and check - [x] for Story 1.0. 2. Append > Files touched: [files] under the story]. Type: Task.

- [x] Story 1.1: XGBoost DMatrix & Threshold Inference | [MoSCoW: MUST] | [Complexity: HARD] (<-- REQ-026) 
  Business Requirement: Ensure the backend constructs the correct matrix and applies the 0.4629 threshold. 
  > Files touched: backend/main.py, backend/tests/test_inference.py
  Story Context Radius: {"backend/main.py": [""], "backend/tests/test_inference.py": [""], "backend/app/utils/feature_extraction.py": ["READ-ONLY"], "leai_docs/planning/roadmap_9_crab_ml_sync.md": [""], "leai_docs/planning/global_backlog.md": [""]} 
  Layered Technical Breakdown (FLASH-COMPATIBLE ALGORITHMS): 
  [ID-1.1.1] [TESTING/TDE]: [1. Open test_inference.py. 2. Mock the model prediction to return a probability of 0.47. 3. Assert the classification returned is coding (since 0.47 > 0.4629)]. Type: Task. 
  [ID-1.1.2] [LOGIC/IMPORTS]: [1. Open main.py. 2. Import xgboost as xgb and pandas as pd at the top of the file]. Type: Task. 
  [ID-1.1.3] [LOGIC/MATRIX]: [1. In predict_fasta, convert the extracted features into a DataFrame with the 64 combinations as columns (matching KMER_KEYS). 2. Create an xgb.DMatrix from the DataFrame]. Type: Task. 
  [ID-1.1.4] [LOGIC/THRESHOLD]: [1. Call app.state.model.predict(dmatrix). 2. Apply logic: if prob > 0.4629, classification is 'coding', else 'non-coding'. 3. Map to PredictionResultDTO]. Type: Task. 
  [ID-1.1.5] [PLANNING/SYNC]: [1. Open roadmap_9_crab_ml_sync.md and check - [x] for Story 1.1. 2. Append > Files touched: [files] under the story. 3. Open global_backlog.md and check - [x] for [REQ-026]]. Type: Task.

EPIC 2: CRAB BRANDING & UI REFINEMENT (FRONTEND) | [ISOLATED VERTICAL]

- [x] Story 2.0: Asset Injection & Dumb View Branding | [MoSCoW: MUST] | [Complexity: EASY] (<-- REQ-027) 
  Business Requirement: Apply CRAB branding assets to the HTML shell and React views. 
  > Files touched: frontend/index.html, frontend/src/components/Navbar.jsx, frontend/src/App.jsx
  Story Context Radius: {"frontend/index.html": [""], "frontend/src/components/Navbar.jsx": [""], "frontend/src/App.jsx": [""], "leai_docs/planning/roadmap_9_crab_ml_sync.md": [""], "leai_docs/planning/global_backlog.md": ["*"]} 
  Layered Technical Breakdown (FLASH-COMPATIBLE ALGORITHMS): 
  [ID-2.0.1] [VIEW/HTML]: [1. Open frontend/index.html. 2. Change <title> to CRAB. 3. Add <link rel="icon" href="/src/assets/logo.ico" />]. Type: Task. 
  [ID-2.0.2] [VIEW/NAVBAR]: [1. Open frontend/src/components/Navbar.jsx. 2. Replace "RNA Mining Dashboard" with "CRAB". 3. Insert <img src="/src/assets/logo.ico" alt="CRAB Icon" style={{ height: '24px', marginRight: '8px' }} /> next to the title]. Type: Task. 
  [ID-2.0.3] [VIEW/HERO]: [1. Open frontend/src/App.jsx. 2. Locate <h1 style={styles.heroH1}>Run Analysis</h1>. 3. Replace it with <img src="/src/assets/logo.jpeg" alt="CRAB Logo" style={{ maxWidth: '200px', margin: '0 auto 16px auto', display: 'block', borderRadius: '12px' }} />]. Type: Task. 
  [ID-2.0.4] [PLANNING/SYNC]: [1. Open roadmap_9_crab_ml_sync.md and check - [x] for Story 2.0. 2. Append > Files touched: [files] under the story. 3. Open global_backlog.md and check - [x] for [REQ-027]]. Type: Task.

- [x] Story 2.1: UI Cleanup (Dumb View) | [MoSCoW: MUST] | [Complexity: TRIVIAL] (<-- REQ-028) 
  Business Requirement: Remove the unnecessary examples link from the upload card. 
  > Files touched: frontend/src/components/FastaUploadCard.jsx
  Story Context Radius: {"frontend/src/components/FastaUploadCard.jsx": [""], "leai_docs/planning/roadmap_9_crab_ml_sync.md": [""], "leai_docs/planning/global_backlog.md": ["*"]} 
  Layered Technical Breakdown (FLASH-COMPATIBLE ALGORITHMS): 
  [ID-2.1.1] [VIEW/CLEANUP]: [1. Open frontend/src/components/FastaUploadCard.jsx. 2. Locate and surgically delete the <button> containing the text '.fasta - examples' and its associated icon]. Type: Task. 
  [ID-2.1.2] [PLANNING/SYNC]: [1. Open roadmap_9_crab_ml_sync.md and check - [x] for Story 2.1. 2. Append > Files touched: [files] under the story. 3. Open global_backlog.md and check - [x] for [REQ-028]]. Type: Task.

- [x] Story 2.2: Results Navigation (State Fractality) | [MoSCoW: MUST] | [Complexity: EASY] (<-- REQ-029) 
  Business Requirement: Allow users to return to the upload screen after viewing results, strictly separating hook logic from view injection. 
  > Files touched: frontend/src/pages/Results.jsx
  Story Context Radius: {"frontend/src/pages/Results.jsx": [""], "leai_docs/planning/roadmap_9_crab_ml_sync.md": [""], "leai_docs/planning/global_backlog.md": ["*"]} 
  Layered Technical Breakdown (FLASH-COMPATIBLE ALGORITHMS): 
  [ID-2.2.1] [TESTING/TDE]: [1. Mount Results page with mock data. 2. Assert a "New Analysis" button exists and triggers navigate('/')]. Type: Task. 
  [ID-2.2.2] [LOGIC/HOOK]: [1. Open frontend/src/pages/Results.jsx. 2. Import useNavigate from react-router-dom. 3. Initialize const navigate = useNavigate(); at the top of the component]. Type: Task. 
  [ID-2.2.3] [VIEW/INJECTION]: [1. In Results.jsx, add a <button> labeled "New Analysis" next to the Export buttons. 2. Wire onClick={() => navigate('/')} to the button]. Type: Task. 
  [ID-2.2.4] [PLANNING/SYNC]: [1. Open roadmap_9_crab_ml_sync.md and check - [x] for Story 2.2. 2. Append > Files touched: [files] under the story. 3. Open global_backlog.md and check - [x] for [REQ-029]]. Type: Task.