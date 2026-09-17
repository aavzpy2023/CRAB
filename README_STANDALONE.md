# CRAB Standalone CLI: Offline RNA/DNA Classification

The `crab_standalone.py` module is a fully isolated, portable Python tool designed for bioinformatics researchers. It enables the execution of the CRAB (Classification of RNA/DNA) machine learning models offline, facilitating bulk sequence processing and ensuring reproducible research without the need to deploy the full web-based infrastructure.

## Prerequisites & Installation

Ensure you have Python 3.9+ installed. To guarantee algorithmic reproducibility, the following scientific packages must be installed:

```bash
pip install pandas xgboost joblib
## Usage

The Command-Line Interface (CLI) is invoked via the terminal. It requires an input FASTA file and an output directory.

### Command-Line Arguments

* `-p` / `--path`: **(Required)** Absolute or relative path to the input sequence file in FASTA format.

* `-o` / `--output`: **(Required)** Target directory where the analytical results will be saved.
* `-m` / `--model`: **(Optional)** Path to the pre-trained XGBoost model artifact (`.pkl`). Defaults to `Bacteria.pkl`.

Example Command
```
Bash
```
python crab_standalone.py -p input.fasta -o ./output/ -m Bacteria.pkl
## Methodology & Features

* **Zero-Dependency Architecture**: Designed for computational clusters and air-gapped laboratory environments. It operates independently of web server dependencies (e.g., FastAPI, Pydantic).
* **Algorithmic Sequence Normalization**: Automatically standardizes nucleotide sequences, converting RNA Uracil (`U`) to DNA Thymine (`T`). This ensures vector compatibility with models strictly trained on DNA representations.
* **Non-Overlapping Codon Extraction**: Strictly parses sequences using a non-overlapping codon sliding window (`step=3`), preserving the exact mathematical trinucleotide distribution required by the legacy XGBoost pipeline.

    * **Multi-line FASTA Handling**: Safely parses and concatenates multi-line biological sequences per standard bioinformatics conventions.

## Output Specification

The script deterministically exports an analytical CSV file (`predictions.csv`) into the designated output directory. The output contains the following structural columns:

* `seq_id`: The primary identifier extracted from the FASTA header.
* `probabilidad_coding`: The probabilistic confidence score (0.0 to 1.0) calculated by the XGBoost algorithm, rounded to 4 decimal places.
* `prediccion_label`: The binary classification assignment (`coding_protein` or `ncRNA`) based on the statistically optimal threshold (`0.4629`).
