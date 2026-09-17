import argparse
import sys
from pathlib import Path


def setup_argparse() -> argparse.Namespace:
    """
    Configures CLI arguments for the standalone inference script.
    """
    parser = argparse.ArgumentParser(description="CRAB Standalone Researcher CLI")
    parser.add_argument(
        "-p",
        "--path",
        required=True,
        help="Input FASTA file path",
    )
    parser.add_argument(
        "-o",
        "--output",
        required=True,
        help="Output directory path",
    )
    parser.add_argument(
        "-m",
        "--model",
        default="Bacteria.pkl",
        help="Model file path (default: Bacteria.pkl)",
    )
    return parser.parse_args()


def parse_fasta_file(filepath: str):
    """
    Yields (header, sequence) tuples from a FASTA file.
    Automatically standardizes sequences to uppercase DNA (U -> T).
    Concatenates multi-line sequences safely.
    """
    path = Path(filepath)
    if not path.is_file():
        raise FileNotFoundError(f"FASTA file not found: {filepath}")

    header = None
    seq_lines = []

    with open(path, "r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line:
                continue

            if line.startswith(">"):
                if header is not None:
                    # Normalization: Upper case and RNA(U) to DNA(T) conversion
                    seq = "".join(seq_lines).upper().replace("U", "T")
                    yield header, seq
                header = line[1:].strip()
                seq_lines = []
            else:
                seq_lines.append(line)

        # Yield the final sequence record
        if header is not None:
            seq = "".join(seq_lines).upper().replace("U", "T")
            yield header, seq


def main():
    try:
        args = setup_argparse()
        print(f"[*] Starting standalone processing for: {args.path}")

        records = list(parse_fasta_file(args.path))
        print(f"[*] Parsed {len(records)} sequences successfully.")

        # Pending: Embedded Extraction (Story 11.2)
        # Pending: Embedded Inference (Story 11.2)
        # Pending: CSV Export (Story 11.3)

    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()