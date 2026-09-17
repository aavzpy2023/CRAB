# CRAB Standalone CLI

The `crab_standalone.py` script is a fully isolated, portable Python tool designed for researchers who wish to run the RNA/DNA classification model offline without deploying the full web application.

## Prerequisites

Ensure you have Python 3.9+ installed. You will need to install the required data science packages. 

Run the following command in your terminal:
```bash
pip install pandas xgboost joblib
Usage

The script takes three main arguments:

-p or --path: (Required) Path to your input FASTA file.

-o or --output: (Required) Directory where the predictions.csv will be saved.

-m or --model: (Optional) Path to the pre-trained XGBoost model. Defaults to Bacteria.pkl.

Example Command
```
Bash
```
python crab_standalone.py -p input.fasta -o ./output/ -m Bacteria.pkl
Features

Zero-Dependencies on Web Core: This script does not require FastAPI, Pydantic, or any of the backend web server libraries.

Auto-Normalization: Automatically converts RNA sequences (U) to DNA (T) to ensure compatibility with the legacy XGBoost models.

Multi-line Sequence Handling: Automatically parses and merges multi-line sequences found in standard biological FASTA formats.

CSV Export: Deterministically exports an easy-to-read CSV with headers id, sequence, prediction, classification, and probability.
