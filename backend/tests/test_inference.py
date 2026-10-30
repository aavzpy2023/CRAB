import pytest
from fastapi.testclient import TestClient
from unittest.mock import MagicMock, patch, ANY
from main import app
client = TestClient(app)

def test_extract_3mers_rna_biological_normalization():
    from app.utils.feature_extraction import extract_3mers, KMER_KEYS
    # Arrange: RNA sequence with Uracil
    sequence = "GUGAUU"
    # Act
    features = extract_3mers(sequence)
    # Assert: Should dynamically normalize and match DNA keys 'GTG' and 'ATT'
    idx_gtg = KMER_KEYS.index("GTG")
    idx_att = KMER_KEYS.index("ATT")
    assert features[idx_gtg] == 0.5
    assert features[idx_att] == 0.5
    assert sum(features) == 1.0

@pytest.fixture
def mock_model():
    """Creates a mock model mimicking xgboost interface."""
    model = MagicMock()
    model.predict.return_value = [0.53]  # P(ncRNA) below the 0.546569 cutoff -> coding
    return model

def test_predict_endpoint_no_model():
    """Validates 503 error if the model is missing from app state."""
    app.state.model = None
    payload = {
        "records": [{"header": "seq1", "sequence": "ACGU", "length": 4}]
    }
    response = client.post("/api/v1/fasta/predict", json=payload)
    assert response.status_code == 503
    assert "Model not loaded" in response.json()["detail"]

def test_predict_endpoint_success(mock_model):
    """Validates successful prediction workflow with a mock model."""
    app.state.model = mock_model
    payload = {
        "records": [{"header": "seq1", "sequence": "ACGU", "length": 4}]
    }
    with patch("main.extract_3mers", return_value=[0.0] * 64) as mock_extract, \
         patch("main.xgb") as mock_xgb:
        mock_xgb.DMatrix.return_value = MagicMock()
        response = client.post("/api/v1/fasta/predict", json=payload)
        
        assert response.status_code == 200
        data = response.json()
        assert data["model_version"] == "v1.0.0"
        assert data["results"][0]["prediction"] == 1
        assert data["results"][0]["probability"] == 0.53
        assert data["results"][0]["sequence"] == "ACGU"
        assert data["results"][0]["classification"] == "coding"
        mock_extract.assert_called_once_with("ACGU", ANY)