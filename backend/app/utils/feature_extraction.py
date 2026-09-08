import itertools
from typing import List

BASES = ['A', 'C', 'G', 'U']
KMER_KEYS = ["".join(p) for p in itertools.product(BASES, repeat=3)]

def extract_3mers(sequence: str) -> List[float]:
    """
    Extracts and normalizes trinucleotide frequencies into a 64-element list.
    Standardizes sequence to uppercase RNA (T -> U).
    """
    seq = sequence.upper().replace('T', 'U')
    counts = {k: 0.0 for k in KMER_KEYS}
    trinucs = [seq[i:i + 3] for i in range(0, len(seq) - 2, 3)]
    total = len(trinucs)
    if total == 0:
        return [0.0] * 64
    for kmer in trinucs:
        if kmer in counts:
            counts[kmer] += 1.0
    return [counts[k] / total for k in KMER_KEYS]
    return [counts[k] / total for k in KMER_KEYS]