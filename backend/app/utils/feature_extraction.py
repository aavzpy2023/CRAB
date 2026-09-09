import itertools
from typing import List, Optional
BASES = ['A', 'C', 'G', 'T']
KMER_KEYS = [''.join(p) for p in itertools.product(BASES, repeat=3)]

def extract_3mers(
    sequence: str, 
    kmer_keys: Optional[List[str]] = None
) -> List[float]:
    """
    Extracts and normalizes trinucleotide frequencies into a 64-element list.
    Bug-for-bug legacy compatibility: does NOT convert U to T.
    """
    keys = kmer_keys or KMER_KEYS
    seq = sequence.upper()
    counts = {k: 0.0 for k in keys}
    trinucs = [seq[i:i + 3] for i in range(0, len(seq) - 2, 3)]
    total = len(trinucs)
    if total == 0:
        return [0.0] * len(keys)
    for kmer in trinucs:
        if kmer in counts:
            counts[kmer] += 1.0
    return [counts[k] / total for k in keys]
    return [counts[k] / total for k in KMER_KEYS]