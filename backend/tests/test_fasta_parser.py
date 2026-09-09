import io
import pytest
from fastapi.testclient import TestClient
from main import app
from app.utils.fasta_parser import parse_fasta_bytes

client = TestClient(app)

from app.utils.validators import strict_fasta_check
from app.utils.feature_extraction import extract_3mers

def test_strict_fasta_check_missing_header():
    """Assert manual validation fails on missing >."""
    bad_fasta = "AUGCGA\nUAGC"
    with pytest.raises(ValueError, match="Missing '>'"):
        strict_fasta_check(bad_fasta)
        
    good_fasta = ">seq1\nAUGCGA"
    strict_fasta_check(good_fasta)  # Should not raise

def test_extract_3mers_normalized_list():
    """Assert extract_3mers returns exactly a 64-element normalized list."""
    seq = "ATCGCT"  # DNA codons: ATC, GCT
    features = extract_3mers(seq)
    
    assert len(features) == 64
    assert sum(features) == pytest.approx(1.0)
    
    # Check that empty or short sequences return an empty normalized array of 64
    empty_features = extract_3mers("A")
    assert len(empty_features) == 64
    assert sum(empty_features) == 0.0

def test_parse_fasta_bytes_logic():
    """Validates the core parser utility with complex real-world headers."""
    fasta_data = (
        b">at3g03625 ncrna chromosome:TAIR10:3:6217476:6217600:1\n"
        b"TCTGGTATTTTGCTCAAGTATGGTTTTCTTGGCCCATCCACTTCTAATGTG\n"
    )
    results = parse_fasta_bytes(fasta_data)
    assert len(results) == 1
    assert results[0].header == "at3g03625"
    assert results[0].sequence == (
        "TCTGGTATTTTGCTCAAGTATGGTTTTCTTGGCCCATCCACTTCTAATGTG"
    )
    assert results[0].length == 51

def test_upload_fasta_endpoint_success():
    """Validates the multipart upload endpoint."""
    fasta_content = b">User_Seq\nAAUUCCGG"
    file = {"file": ("test.fasta", fasta_content, "application/octet-stream")}
    response = client.post("/api/v1/fasta/upload", files=file)
    assert response.status_code == 200
    assert response.json()[0]["header"] == "User_Seq"

def test_upload_fasta_endpoint_invalid_extension():
    """Asserts 400 error on non-fasta file extensions."""
    file = {"file": ("test.txt", b"not fasta", "text/plain")}
    response = client.post("/api/v1/fasta/upload", files=file)
    assert response.status_code == 400
    assert "extension" in response.json()["detail"].lower()