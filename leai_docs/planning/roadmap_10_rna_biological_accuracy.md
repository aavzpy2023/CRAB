---
type: "roadmap"
epic_name: "RNA Biological Accuracy & Legacy Bias Correction"
domain: "Backend Core"
complexity_aggregate: "EASY"
---

EPIC 10: RNA Biological Accuracy & Legacy Bias Correction | BACKEND CORE

- [x] Story 10.0: Roadmap & Planning Initialization | [MoSCoW: MUST] | [Complexity: TRIVIAL]
  Business Requirement: Initialize sequential agentic memory state trackers ensuring DAG dependencies.
  Story Context Radius: {"leai_docs/planning/global_backlog.md": ["*"]}
  Layered Technical Breakdown:
  [ID-10.0.1] [PLANNING/INIT]: [1. Create leai_docs/planning/ directory if missing. 2. Append the new EPIC 10, its [REQ-030] list, and the Roadmap link to leai_docs/planning/global_backlog.md. 3. Write THIS ENTIRE raw markdown response (INCLUDING the YAML Frontmatter block above) into leai_docs/planning/roadmap_10_rna_biological_accuracy.md]. Type: Task.

- [x] Story 10.1: Feature Extraction Biological Normalization | [MoSCoW: MUST] | [Complexity: EASY]
  Business Requirement: Normalize RNA sequences to DNA (U -> T) to prevent zero-vectors and ensure accurate XGBoost predictions. (<-- REQ-030)
  Story Context Radius: {"context.md": [""], "backend/app/utils/feature_extraction.py": [""], "backend/tests/test_inference.py": [""], "leai_docs/planning/roadmap_10_rna_biological_accuracy.md": [""], "leai_docs/planning/global_backlog.md": ["*"]}
  Layered Technical Breakdown (FLASH-COMPATIBLE ALGORITHMS):
  [ID-10.1.1] [TESTING/TDE]: [1. Arrange: In backend/tests/test_inference.py, define a pure in-memory test sequence containing Uracil, e.g., "GUGAUU". 2. Act: Invoke extract_3mers(sequence). 3. Assert: Verify the returned vector is not all zeros and that the indices corresponding to the normalized kmers "GTG" and "ATT" have positive frequencies]. Type: Task.
  [ID-10.1.2] [CORE/LOGIC]: [1. Open backend/app/utils/feature_extraction.py. 2. Locate the line seq = sequence.upper(). 3. Apply micro-surgical mutation: change it to seq = sequence.upper().replace("U", "T"). 4. Update the docstring to explicitly state that biological accuracy (U->T) is prioritized over legacy bug-for-bug compatibility]. Type: Task.
  [ID-10.1.3] [DOCUMENTATION/SYNC]: [1. Open context.md at root. 2. Document explicitly the architectural decision to drop legacy bug-for-bug compatibility in favor of biological accuracy for RNA sequences]. Type: Task.
  [ID-10.1.4] [PLANNING/SYNC]: [1. Open leai_docs/planning/roadmap_10_rna_biological_accuracy.md and check - [x] for Story 10.1. 2. Append > Files touched: [list of modified/read files] under the story. 3. Open leai_docs/planning/global_backlog.md and check - [x] for the corresponding [REQ-030]]. Type: Task.