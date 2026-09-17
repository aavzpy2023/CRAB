---
type: "roadmap"
epic_name: "STANDALONE RESEARCHER CLI"
domain: "CLI/Portability"
complexity_aggregate: "MEDIUM"
---

# EPIC 11: STANDALONE RESEARCHER CLI | ISOLATED VERTICAL

- [x] Story 11.0: Roadmap & Planning Initialization | [MoSCoW: MUST] | [Complexity: TRIVIAL]
  Business Requirement: Initialize sequential agentic memory state trackers ensuring DAG dependencies.
  Story Context Radius: {"leai_docs/planning/global_backlog.md": ["*"]}
  Layered Technical Breakdown:
  - [ID-11.0.1] [PLANNING/INIT]: [1. Create leai_docs/planning/ directory if missing. 2. Append EPIC 11, REQ-031, REQ-032, and the Roadmap link to leai_docs/planning/global_backlog.md. 3. Write THIS ENTIRE raw markdown response (INCLUDING the YAML Frontmatter block above) into leai_docs/planning/roadmap_11_standalone_cli.md]. Type: Task.

- [x] Story 11.1: Standalone Script Scaffolding & Parsing Logic | [MoSCoW: MUST] | [Complexity: MEDIUM]
  > Files touched: crab_standalone.py
  Business Requirement: Create the self-contained script with argparse and embedded sequence parsing (including U->T normalization).
  Story Context Radius: {"crab_standalone.py": ["*"], "leai_docs/planning/roadmap_11_standalone_cli.md": ["*"]}
  Layered Technical Breakdown:
  - [ID-11.1.1] [CORE/SCAFFOLD]: [1. Create crab_standalone.py at project root. 2. Implement setup_argparse() returning parsed args (-p required, -o required, -m default "Bacteria.pkl"). 3. Scaffold def main(): block that parses arguments and sets up try/except for top-level error handling]. Type: Task.
  - [ID-11.1.2] [CORE/LOGIC]: [1. In crab_standalone.py, implement parse_fasta_file(filepath) that yields (header, seq). 2. Implement U->T substitution within the parser (replace 'U' with 'T'). 3. Filter out invalid lines and ensure multi-line sequences are concatenated]. Type: Task.
  - [ID-11.1.3] [PLANNING/SYNC]: [1. Open leai_docs/planning/roadmap_11_standalone_cli.md and check - [x] for Story 11.1. 2. Append > Files touched: crab_standalone.py under the story]. Type: Task.

- [x] Story 11.2: Embedded Feature Extraction & XGBoost Inference | [MoSCoW: MUST] | [Complexity: HARD]
  > Files touched: crab_standalone.py
  Business Requirement: Embed the 3-mer extraction algorithm and XGBoost loading/prediction logic locally inside the script.
  Story Context Radius: {"crab_standalone.py": ["*"], "leai_docs/planning/roadmap_11_standalone_cli.md": ["*"]}
  Layered Technical Breakdown:
  - [ID-11.2.1] [CORE/EXTRACTION]: [1. In crab_standalone.py, implement generate_kmers() returning the 64 3-mer DNA combinations statically. 2. Implement extract_features(sequence, kmers) that counts overlapping 3-mers. 3. Normalize the counts strictly by dividing by len(sequence) - 2]. Type: Task.
  - [ID-11.2.2] [CORE/INFERENCE]: [1. In crab_standalone.py, implement run_inference(records, model_path). 2. Load model via joblib.load(model_path). 3. Construct pd.DataFrame and xgb.DMatrix, run .predict(), and return a list of dictionaries with prob and classification (threshold 0.4629 -> "coding_protein" / "ncRNA")]. Type: Task.
  - [ID-11.2.3] [PLANNING/SYNC]: [1. Open leai_docs/planning/roadmap_11_standalone_cli.md and check - [x] for Story 11.2. 2. Append > Files touched: crab_standalone.py under the story]. Type: Task.

- [x] Story 11.3: CSV Export & Script Integration Testing | [MoSCoW: MUST] | [Complexity: MEDIUM]
  > Files touched: crab_standalone.py, backend/tests/test_standalone.py
  Business Requirement: Write the predictions to a CSV in the specified output directory and ensure the script operates deterministically.
  Story Context Radius: {"crab_standalone.py": ["*"], "backend/tests/test_standalone.py": ["*"], "leai_docs/planning/roadmap_11_standalone_cli.md": ["*"]}
  Layered Technical Breakdown:
  - [ID-11.3.1] [IO/FILESYSTEM]: [1. In crab_standalone.py, implement export_csv(results, output_dir). 2. Ensure output_dir is created if it does not exist using Path(output_dir).mkdir(parents=True, exist_ok=True). 3. Write results to predictions.csv using pandas to_csv(index=False)]. Type: Task.
  - [ID-11.3.2] [TESTING/TDE]: [1. Arrange: In backend/tests/test_standalone.py, mock sys.argv to pass fake paths, mock joblib.load to return a dummy model with a predict method, and create a temporary FASTA file. 2. Act: Call crab_standalone.main(). 3. Assert: Verify predictions.csv is created in the temp output directory and contains expected columns (id,sequence,prediction,classification,probability)]. Type: Task.
  - [ID-11.3.3] [PLANNING/SYNC]: [1. Open leai_docs/planning/roadmap_11_standalone_cli.md and check - [x] for Story 11.3. 2. Append > Files touched: crab_standalone.py, backend/tests/test_standalone.py under the story]. Type: Task.

- [x] Story 11.4: Researcher Documentation | [MoSCoW: MUST] | [Complexity: TRIVIAL]

Files touched: README_STANDALONE.md
Business Requirement: Provide clear instructions on how a researcher can use crab_standalone.py without the web platform.
  Story Context Radius: {"README_STANDALONE.md": ["*"], "leai_docs/planning/roadmap_11_standalone_cli.md": ["*"], "leai_docs/planning/global_backlog.md": ["*"]}
  Layered Technical Breakdown:
  - [ID-11.4.1] [DOCUMENTATION/SYNC]: [1. Create README_STANDALONE.md at project root. 2. Document python package requirements (pip install pandas xgboost joblib). 3. Document command usage explicitly: python crab_standalone.py -p input.fasta -o ./output/ -m Bacteria.pkl]. Type: Task.
  - [ID-11.4.2] [PLANNING/SYNC]: [1. Open leai_docs/planning/roadmap_11_standalone_cli.md and check - [x] for Story 11.4. 2. Append > Files touched: README_STANDALONE.md. 3. Open leai_docs/planning/global_backlog.md and check - [x] for REQ-031 and REQ-032]. Type: Task.