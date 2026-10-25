from pydantic import BaseModel, Field, AfterValidator, field_validator
from typing import List, Annotated
from app.utils.validators import clean_sequence

class FastaRecordDTO(BaseModel):
    """
    DTO for a single FASTA record. 
    Strictly uses primitive types for boundary safety.
    """
    header: str = Field(..., description="The FASTA sequence header")
    sequence: Annotated[str, AfterValidator(clean_sequence)] = Field(
        ..., description="The raw RNA/DNA sequence string"
    )
    length: int = Field(..., description="Length of the sequence")

    @field_validator("sequence", mode="before")
    @classmethod
    def pre_sanitize_sequence(cls, v: str) -> str:
        """Explicitly strip multiline FASTA formatting characters."""
        if isinstance(v, str):
            return v.replace("\n", "").replace("\r", "").replace(" ", "")
        return v

class SampleFastaResponse(BaseModel):
    """
    Response schema for sample sequence listing.
    """
    filename: str
    records: List[FastaRecordDTO]

class PredictionRequestDTO(BaseModel):
    """Input DTO for batch inference."""
    records: List[FastaRecordDTO]

class PredictionResultDTO(BaseModel):
    """Individual prediction outcome."""
    header: str
    sequence: str = Field(..., description="Raw RNA sequence")
    prediction: int
    probability: float
    classification: str = Field(..., description="Coding potential label")

class PredictionResponseDTO(BaseModel):
    """Final batch prediction response."""
    results: List[PredictionResultDTO]
    model_version: str