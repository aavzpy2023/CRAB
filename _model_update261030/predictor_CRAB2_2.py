#!/usr/bin/env python3

import os
import argparse
import pickle
import pandas as pd

from itertools import product
from Bio import SeqIO
import xgboost as xgb

# =========================
# CONFIGURACIÓN
# =========================

THRESHOLD = 0.546569037437439

LABEL_MAP = {
    0: "coding_protein",
    1: "ncRNA"
}

# =========================
# FUNCIONES
# =========================

def contar_trinucleotidos(sequence):
    return [
        sequence[i:i+3]
        for i in range(0, len(sequence) - 2, 3)
    ]


def generar_features_fasta(fasta_file):

    letras = ["A", "C", "G", "T"]
    combinaciones = [
        ''.join(t)
        for t in product(letras, repeat=3)
    ]

    data = []

    total_seq = 0

    for record in SeqIO.parse(fasta_file, "fasta"):

        total_seq += 1

        seq_id = record.description.split()[0]

        seq = str(record.seq).upper()

        # Convertir RNA -> DNA
        if "U" in seq:
            print(
                f"Advertencia: {seq_id} contiene U. "
                "Convirtiendo RNA -> DNA."
            )
            seq = seq.replace("U", "T")

        # Ignorar secuencias demasiado cortas
        if len(seq) < 3:
            continue

        trinucs = contar_trinucleotidos(seq)

        conteo = dict.fromkeys(combinaciones, 0)
        validos = 0

        for codon in trinucs:

            if (
                len(codon) == 3 and
                set(codon).issubset({"A", "C", "G", "T"})
            ):
                conteo[codon] += 1
                validos += 1

        total = len(trinucs)

        freqs = [
            conteo[c] / total
            for c in combinaciones
        ]

        fraccion_validos = validos / total

        row = {"seq_id": seq_id}

        row.update(
            {
                c: v
                for c, v in zip(combinaciones, freqs)
            }
        )

        data.append(row)

        if total_seq % 1000 == 0:
            print(
                f"{total_seq} secuencias procesadas..."
            )

    df = pd.DataFrame(data)

    if len(df) == 0:
        raise ValueError(
            "No se encontraron secuencias válidas "
            "(longitud >= 3 nt)."
        )

    df.set_index("seq_id", inplace=True)

    print(
        f"\nTotal secuencias procesadas: {total_seq}"
    )
    print(
        f"Secuencias válidas: {len(df)}"
    )

    return df


# =========================
# ARGUMENTOS
# =========================

parser = argparse.ArgumentParser(
    description="Predicción de ncRNA/coding usando XGBoost"
)

parser.add_argument(
    "-m",
    "--model",
    required=True,
    help="Modelo XGBoost en formato PKL"
)

parser.add_argument(
    "-i",
    "--input",
    required=True,
    help="Archivo FASTA de entrada"
)

parser.add_argument(
    "-o",
    "--output",
    required=True,
    help="Directorio de salida"
)

args = parser.parse_args()

MODEL_FILE = args.model
FASTA_FILE = args.input
OUTPUT_DIR = args.output


# =========================
# CREAR DIRECTORIO
# =========================

os.makedirs(
    OUTPUT_DIR,
    exist_ok=True
)

OUTPUT_TABLE = os.path.join(
    OUTPUT_DIR,
    "predictions.csv"
)

CODING_FASTA = os.path.join(
    OUTPUT_DIR,
    "coding_protein.fasta"
)

NCRNA_FASTA = os.path.join(
    OUTPUT_DIR,
    "ncRNA.fasta"
)


# =========================
# 1. FEATURES
# =========================

X = generar_features_fasta(
    FASTA_FILE
)


# =========================
# 2. CARGAR MODELO
# =========================

with open(
    MODEL_FILE,
    "rb"
) as f:

    modelo = pickle.load(f)


# =========================
# 3. PREDICCIÓN
# =========================

dmatrix = xgb.DMatrix(X)

# El modelo devuelve:
# P(ncRNA)
probs_ncRNA = modelo.predict(dmatrix)

# Para mantener la salida del código 1,
# "probabilidad_coding" debe representar:
# P(coding_protein)
probs_coding = 1 - probs_ncRNA


# =========================
# CLASIFICACIÓN
# =========================

# Mantener las clases invertidas:
#
# 0 = coding_protein
# 1 = ncRNA
#
# El umbral se aplica sobre P(ncRNA).

preds_bin = [
    1 if p > THRESHOLD else 0
    for p in probs_ncRNA
]

preds_label = [
    LABEL_MAP[p]
    for p in preds_bin
]


# =========================
# 4. TABLA DE RESULTADOS
# =========================

resultados = pd.DataFrame(
    {
        "probabilidad_coding": probs_coding,
        "prediccion_label": preds_label
    },
    index=X.index
)

resultados.to_csv(
    OUTPUT_TABLE
)


# =========================
# 5. FASTA CLASIFICADOS
# =========================

pred_dict = resultados.to_dict(
    "index"
)

coding_records = []
ncrna_records = []


for record in SeqIO.parse(
    FASTA_FILE,
    "fasta"
):

    if len(record.seq) < 3:
        continue

    seq_id = record.description.split()[0]

    if seq_id not in pred_dict:
        continue

    info = pred_dict[seq_id]

    record.description = (
        f"{seq_id} "
        f"prediction={info['prediccion_label']} "
        f"prob={info['probabilidad_coding']:.4f}"
    )

    if (
        info["prediccion_label"]
        == "coding_protein"
    ):
        coding_records.append(record)

    else:
        ncrna_records.append(record)


SeqIO.write(
    coding_records,
    CODING_FASTA,
    "fasta"
)

SeqIO.write(
    ncrna_records,
    NCRNA_FASTA,
    "fasta"
)


# =========================
# RESUMEN
# =========================

print("\nArchivos generados:")

print(
    f" - {OUTPUT_TABLE}"
)

print(
    f" - {CODING_FASTA}"
)

print(
    f" - {NCRNA_FASTA}"
)
