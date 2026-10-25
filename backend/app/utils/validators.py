import re

# Includes standard ACGTU and IUPAC 'N' for ambiguity
RNA_DNA_REGEX = r"^[ACGTUNacgtun\s]+$"


def strict_fasta_check(content: str) -> None:
    """Throws ValueError if the first line doesn't start with '>'."""
    lines = content.splitlines()
    if not lines or not lines[0].startswith(">"):
        raise ValueError("Invalid FASTA: Missing '>' in the first line.")

def clean_sequence(v: str) -> str:
    """
    Validates and cleans biometric sequences.

    1. Validates against allowed alphabet (A, C, G, T, U) and whitespace.
    2. Strips all whitespace characters.
    3. Converts to uppercase.
    """
    if not re.match(RNA_DNA_REGEX, v):
        raise ValueError("Invalid characters in biometric sequence")

    return "".join(v.split()).upper()