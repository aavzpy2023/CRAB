import sys
from pathlib import Path
from unittest.mock import MagicMock, patch

import pandas as pd
import pytest

# Inject project root dynamically to allow importing crab_standalone for testing
project_root = Path(__file__).resolve().parent.parent.parent
sys.path.insert(0, str(project_root))

import crab_standalone


@patch("crab_standalone.joblib.load")
def test_standalone_main(mock_joblib_load, tmp_path):
    # Arrange
    mock_model = MagicMock()
    # Provide synthetic probabilities bypassing real XGBoost inference
    mock_model.predict.return_value = [0.85, 0.15]
    mock_joblib_load.return_value = mock_model

    fasta_file = tmp_path / "test.fasta"
    fasta_file.write_text(">seq1\nACGU\n>seq2\nGCUA")

    out_dir = tmp_path / "output"

    test_args = [
        "crab_standalone.py",
        "-p", str(fasta_file),
        "-o", str(out_dir),
        "-m", "dummy_model.pkl"
    ]

    # Act
    with patch.object(sys, "argv", test_args):
        crab_standalone.main()

    # Assert
    csv_file = out_dir / "predictions.csv"
    assert csv_file.exists()

    df = pd.read_csv(csv_file)
    expected_columns = [
        "seq_id",
        "probabilidad_coding",
        "prediccion_label",
    ]
    assert list(df.columns) == expected_columns
    assert len(df) == 2

    # Verify inference mapping rules and ID extraction
    assert df.iloc[0]["seq_id"] == "seq1"
    assert df.iloc[1]["seq_id"] == "seq2"
    
    assert df.iloc[0]["prediccion_label"] == "coding_protein"
    assert df.iloc[1]["prediccion_label"] == "ncRNA"