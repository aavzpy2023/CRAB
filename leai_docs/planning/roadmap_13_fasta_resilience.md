---
type: "roadmap"
epic_name: "EPIC 63: FASTA Parser Resilience & IUPAC Support"
domain: "Backend/API"
complexity_aggregate: "MEDIUM"
---

EPIC 63: FASTA Parser Resilience & IUPAC Support | BACKEND ISOLATED
- [ ] Story 63.0: Roadmap & Planning Initialization | [MoSCoW: MUST] | [Complexity: TRIVIAL]
Business Requirement: Initialize sequential agentic memory state trackers ensuring DAG dependencies.
Story Context Radius: {"leai_docs/planning/global_backlog.md": ["*"]}
Layered Technical Breakdown:

[ID-63.0.1] [PLANNING/INIT]: [1. Create `leai_docs/planning/` directory if missing. 2. Append EPIC 63, its [REQ-001] to [REQ-004] list, and the Roadmap link to `leai_docs/planning/global_backlog.md`. 3. Write THIS ENTIRE raw markdown response (INCLUDING the YAML Frontmatter block above) into `leai_docs/planning/roadmap_63_fasta_resilience.md`]. Type: Task.

- [x] Story 63.1: [TDE] FASTA Parser & DTO Sanitization Tests | [MoSCoW: MUST] | [Complexity: EASY] (<-- REQ-001)
> Files touched: `backend/tests/test_fasta_iupac.py`, `leai_docs/planning/roadmap_63_fasta_resilience.md`, `leai_docs/planning/global_backlog.md`
Story Context Radius: {"tests/test_fasta_parser.py": ["*"], "leai_docs/planning/roadmap_63_fasta_resilience.md": ["*"], "leai_docs/planning/global_backlog.md": ["*"]}
Layered Technical Breakdown (FLASH-COMPATIBLE ALGORITHMS):

[ID-63.1.1] [TESTING/TDE]: [1. Arrange: Create a raw FASTA byte string containing `\n`, `\r`, and the `N` character in the sequence. 2. Act: Invoke `parse_fasta_bytes(content)`. 3. Assert: Verify the returned list has length 1, and the `sequence` string is perfectly concatenated without whitespace and retains the `N`]. Type: Task.
[ID-63.1.2] [PLANNING/SYNC]: [1. Open leai_docs/planning/roadmap_63_fasta_resilience.md and check - [x] for Story 63.1. 2. Append `> Files touched: [list of modified/read files]` under the story. 3. Open leai_docs/planning/global_backlog.md and check - [x] for the corresponding [REQ-XXX]]. Type: Task.

- [x] Story 63.2: [CORE] FASTA DTO & Parser Implementation | [MoSCoW: MUST] | [Complexity: MEDIUM] (<-- REQ-002)
> Files touched: `backend/app/utils/validators.py`, `backend/app/schemas/fasta.py`, `leai_docs/planning/roadmap_63_fasta_resilience.md`, `leai_docs/planning/global_backlog.md`
Story Context Radius: {"src/utils/fasta_parser.py": ["*"], "leai_docs/planning/roadmap_63_fasta_resilience.md": ["*"], "leai_docs/planning/global_backlog.md": ["*"]}
Layered Technical Breakdown (FLASH-COMPATIBLE ALGORITHMS):

[ID-63.2.1] [CORE/LOGIC]: [1. Open `src/utils/fasta_parser.py`. 2. Locate `FastaRecordDTO` and update its sequence validator (e.g., using `@field_validator('sequence', mode='before')`) to explicitly `.replace('\n', '').replace('\r', '').replace(' ', '')`. 3. Update the regex/character validation to explicitly allow the `N` character (IUPAC ambiguity). Add English comments explaining the IUPAC 'N' inclusion]. Type: Task.
[ID-63.2.2] [PLANNING/SYNC]: [1. Open leai_docs/planning/roadmap_63_fasta_resilience.md and check - [x] for Story 63.2. 2. Append `> Files touched: [list of modified/read files]` under the story. 3. Open leai_docs/planning/global_backlog.md and check - [x] for the corresponding [REQ-XXX]]. Type: Task.

- [x] Story 63.3: [TDE] API Endpoint Resilience Tests | [MoSCoW: MUST] | [Complexity: EASY] (<-- REQ-003)
> Files touched: `backend/tests/test_api_resilience.py`, `leai_docs/planning/roadmap_63_fasta_resilience.md`, `leai_docs/planning/global_backlog.md`
Story Context Radius: {"tests/test_main.py": ["*"], "main.py": ["*"], "leai_docs/planning/roadmap_63_fasta_resilience.md": ["*"], "leai_docs/planning/global_backlog.md": ["*"]}
Layered Technical Breakdown (FLASH-COMPATIBLE ALGORITHMS):

[ID-63.3.1] [TESTING/TDE]: [1. Arrange: Mock `parse_fasta_bytes` in `main.py` to raise `pydantic.ValidationError`. 2. Act: Execute `client.post("/api/v1/fasta/upload", files=...)` using `fastapi.testclient`. 3. Assert: Verify response status code is exactly 400 and JSON contains error details]. Type: Task.
[ID-63.3.2] [TESTING/TDE]: [1. Arrange: Mock `parse_fasta_bytes` to raise `pydantic.ValidationError`. 2. Act: Execute `client.post("/api/inference", files=...)`. 3. Assert: Verify response status code is exactly 400]. Type: Task.
[ID-63.3.3] [PLANNING/SYNC]: [1. Open leai_docs/planning/roadmap_63_fasta_resilience.md and check - [x] for Story 63.3. 2. Append `> Files touched: [list of modified/read files]` under the story. 3. Open leai_docs/planning/global_backlog.md and check - [x] for the corresponding [REQ-XXX]]. Type: Task.

- [x] Story 63.4: [API] Endpoint Exception Handling | [MoSCoW: MUST] | [Complexity: MEDIUM] (<-- REQ-004)
> Files touched: `backend/main.py`, `context.md`, `leai_docs/planning/roadmap_63_fasta_resilience.md`, `leai_docs/planning/global_backlog.md`
Story Context Radius: {"main.py": ["*"], "context.md": ["*"], "leai_docs/planning/roadmap_63_fasta_resilience.md": ["*"], "leai_docs/planning/global_backlog.md": ["*"]}
Layered Technical Breakdown (FLASH-COMPATIBLE ALGORITHMS):

[ID-63.4.1] [API/IO]: [1. Open `main.py`. 2. Locate `upload_fasta` endpoint. 3. Wrap the `parse_fasta_bytes(content)` call in a `try...except ValidationError` block, raising `HTTPException(status_code=400, detail=str(e))` on failure]. Type: Task.
[ID-63.4.2] [API/IO]: [1. Open `main.py`. 2. Locate `run_inference` endpoint. 3. Wrap the `parse_fasta_bytes(content)` call in a `try...except ValidationError` block, raising `HTTPException(status_code=400, detail=str(e))` on failure]. Type: Task.
[ID-63.4.3] [DOCUMENTATION/SYNC]: [1. Open `context.md` at root. 2. Document explicitly the new FASTA validation rules (IUPAC 'N' support and 400 Bad Request behavior on validation failure)]. Type: Task.
[ID-63.4.4] [PLANNING/SYNC]: [1. Open leai_docs/planning/roadmap_63_fasta_resilience.md and check - [x] for Story 63.4. 2. Append `> Files touched: [list of modified/read files]` under the story. 3. Open leai_docs/planning/global_backlog.md and check - [x] for the corresponding [REQ-XXX]]. Type: Task.