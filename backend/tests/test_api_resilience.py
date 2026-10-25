import pytest
from fastapi.testclient import TestClient
from unittest.mock import patch
from pydantic import BaseModel, ValidationError

# Importing the app instance from main
from main import app

client = TestClient(app)

class DummyValidationModel(BaseModel):
    """Utility model purely to generate a realistic ValidationError."""
    val: int

def generate_validation_error() -> ValidationError:
    """Helper to instantiate a Pydantic ValidationError for mocking."""
    try:
        DummyValidationModel(val="invalid_type")
    except ValidationError as e:
        return e

@patch("main.parse_fasta_bytes", side_effect=generate_validation_error())
def test_fasta_upload_returns_400_on_validation_error(mock_parse):
    """
    TDE [ID-63.3.1]: Ensures that a ValidationError raised by the FASTA 
    parser bubbles up as a 400 Bad Request in the /api/v1/fasta/upload endpoint.
    """
    response = client.post(
        "/api/v1/fasta/upload", 
        files={"file": ("test.fasta", b"invalid_data")}
    )
    assert response.status_code == 400, (
        f"Expected 400 Bad Request, got {response.status_code}. "
        "Exception handling is likely missing in main.py."
    )
    assert "detail" in response.json()

@patch("main.parse_fasta_bytes", side_effect=generate_validation_error())
def test_inference_returns_400_on_validation_error(mock_parse):
    """
    TDE [ID-63.3.2]: Ensures that a ValidationError raised by the FASTA 
    parser bubbles up as a 400 Bad Request in the /api/inference endpoint.
    """
    response = client.post(
        "/api/inference", 
        files={"file": ("test.fasta", b"invalid_data")}
    )
    assert response.status_code == 400, (
        f"Expected 400 Bad Request, got {response.status_code}. "
        "Exception handling is likely missing in main.py."
    )
    assert "detail" in response.json()