---
type: "roadmap"
epic: 1
epic_name: "EPIC 1: FIXES"
req: "REQ-1-001"
---

# EPIC 1: FIXES | [ISOLATED VERTICAL]

Problems reported with /task that no existing epic covers.

- [ ] Story 1.1: Fix: [Pasted text #1 +64 lines] me da este error cuando intento procesar u… (fix) | [MoSCoW: MUST] | [Complexity: EASY]

  - Business Requirement: [Pasted text #1 +64 lines] me da este error cuando intento procesar un fasta
  - Added: 2026-10-25 by /task (problem)
  - Gherkin AC: Given the behaviour described above When the cause is fixed Then a regression test that failed before passes and the suite stays green.
  - Story Context Radius (SYMBOL-LEVEL): {"backend/app/schemas/fasta.py": ["*"], "backend/app/utils/fasta_parser.py": ["*"], "frontend/src/hooks/useAnalysisRunner.js": ["*"], "frontend/src/hooks/useOrganismSelect.js": ["*"], "frontend/src/services/api.js": ["*"]}

  Layered Technical Breakdown:

  - [ ] [ID-1.1.1] [TESTING/TDE]: [1. Write a test that reproduces the problem and fails for the reported reason. 2. Find the cause with the smallest context that explains it]. Type: Task.
  - [ ] [ID-1.1.2] [CODE/IMPLEMENTATION]: [1. Make the minimal change. 2. Run the whole suite]. Type: Task.
  - [ ] [ID-1.1.3] [PLANNING/SYNC]: [Handled by leai after verification, no SKDEV action: marks Story 1.1 and the requirement once the roadmap has no pending story]. Type: Task.

