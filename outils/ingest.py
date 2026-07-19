#!/usr/bin/env python3
"""
Transforme un dossier de documents en base interrogeable (corpus.js).

Usage :
    python outils/ingest.py mes_documents/ > corpus.js

Formats lus : .md et .txt. Le découpage se fait sur les titres de niveau 2
(## en markdown), ce qui correspond à la granularité utile en qualité :
une section = une réponse.

Convention de nommage attendue pour les fichiers :
    FT-PRE-001 — Prémix Brioche Tradition — Fiche technique.md
    ^référence    ^titre                     ^type de document
"""

import json
import re
import sys
from pathlib import Path


def decouper(texte: str):
    """Retourne une liste de (titre_section, contenu)."""
    blocs = re.split(r"^##\s+", texte, flags=re.MULTILINE)
    sections = []
    for bloc in blocs:
        bloc = bloc.strip()
        if not bloc:
            continue
        lignes = bloc.split("\n", 1)
        titre = lignes[0].strip()
        corps = lignes[1].strip() if len(lignes) > 1 else ""
        if not corps:
            continue
        # Une section trop longue se retrouve mal : on la coupe en paquets
        # d'environ 900 caractères, sur des fins de phrase.
        for i, morceau in enumerate(paquets(corps)):
            sections.append({
                "titre": titre if i == 0 else f"{titre} (suite {i + 1})",
                "texte": morceau,
            })
    return sections


def paquets(texte: str, taille: int = 900):
    phrases = re.split(r"(?<=[.!?])\s+", texte)
    courant = ""
    for phrase in phrases:
        if len(courant) + len(phrase) > taille and courant:
            yield courant.strip()
            courant = ""
        courant += phrase + " "
    if courant.strip():
        yield courant.strip()


def lire(chemin: Path):
    morceaux = [m.strip() for m in chemin.stem.split("—")]
    ref = morceaux[0] if morceaux else chemin.stem
    titre = morceaux[1] if len(morceaux) > 1 else chemin.stem
    type_doc = morceaux[2] if len(morceaux) > 2 else "Document"
    return {
        "ref": ref,
        "titre": titre,
        "type": type_doc,
        "maj": "",
        "sections": decouper(chemin.read_text(encoding="utf-8")),
    }


def main():
    if len(sys.argv) < 2:
        sys.exit("Usage : python outils/ingest.py <dossier>")

    dossier = Path(sys.argv[1])
    fichiers = sorted(
        f for f in dossier.rglob("*") if f.suffix.lower() in {".md", ".txt"}
    )
    if not fichiers:
        sys.exit(f"Aucun .md ni .txt trouvé dans {dossier}")

    corpus = [lire(f) for f in fichiers]
    corpus = [d for d in corpus if d["sections"]]

    sortie = json.dumps(corpus, ensure_ascii=False, indent=2)
    print("/* Généré par outils/ingest.py — ne pas éditer à la main. */")
    print(f"const CORPUS = {sortie};")

    total = sum(len(d["sections"]) for d in corpus)
    print(
        f"{len(corpus)} documents, {total} sections indexées.",
        file=sys.stderr,
    )


if __name__ == "__main__":
    main()
