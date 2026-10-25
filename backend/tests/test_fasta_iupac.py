from app.utils.fasta_parser import parse_fasta_bytes

def test_parse_fasta_bytes_handles_newlines_and_iupac_n():
    """
    TDE for Story 63.1: Ensures that parsing raw FASTA bytes correctly
    concatenates sequences across multiple lines and retains the IUPAC 'N'.
    This test is explicitly expected to fail (ValidationError) until 
    Story 63.2 is implemented.
    """
    # Arrange: Raw FASTA with IUPAC 'N' and mixed newlines
    raw_fasta = b">seq1\nATGC\nN\r\nATGC\n"
    
    # Act
    records = parse_fasta_bytes(raw_fasta)
    
    # Assert
    assert len(records) == 1, "Should parse exactly one FASTA record"
    assert records[0].header == "seq1", "Header must be correctly extracted"
    assert records[0].sequence == "ATGCNATGC", (
        "Sequence must be concatenated, stripping whitespace/newlines, "
        "and retaining 'N'"
    )