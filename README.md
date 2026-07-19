# Assistant HACCP

**Retrouver la bonne réponse dans le classeur qualité, en une question.**

👉 **[Voir la démonstration](https://lamarque771.github.io/copilote-qualite/)**

---

## Le problème

Dans une PME agroalimentaire, l'information existe : fiches techniques, procédures HACCP, cahiers des charges clients, veille réglementaire. Elle est simplement introuvable au moment où on en a besoin.

Un commercial au téléphone avec un client qui demande si le prémix contient du lait. Un opérateur devant un écart de température à 22h. Un qualiticien qui prépare son audit IFS. À chaque fois, la même perte de temps, et parfois la mauvaise réponse donnée de mémoire.

## Ce que fait cette démonstration

Une question posée en langage courant, une réponse extraite des documents de l'entreprise, avec la référence du document, la section et sa date de mise à jour.

Le corpus de démonstration simule une PME fictive de 62 salariés, mélangeur de prémix boulangerie : 14 documents, 45 sections indexées.

Essayez par exemple :

- *Quels produits contiennent du gluten ?*
- *Que faire si la température de stockage dépasse 25 °C ?*
- *Sous combien de temps répondre à une réclamation client ?*
- *Le client accepte-t-il l'huile de palme ?*

## Trois partis pris

**L'assistant ne rédige rien.** Il n'invente pas de phrase, il affiche un passage existant, tel quel. Il n'y a donc rien à vérifier derrière lui : c'est la condition pour qu'un outil soit utilisable sur un sujet qualité.

**La source est toujours visible.** Référence, section, date. Un auditeur peut remonter au document d'origine immédiatement.

**Hors sujet, il se tait.** En dessous d'un seuil de pertinence, l'outil répond qu'il ne sait pas plutôt que d'afficher le passage le moins éloigné. C'est le comportement inverse d'un chatbot généraliste, et c'est volontaire.

## Sous le capot

| | |
|---|---|
| Découpage | une section de document = une unité retrouvable |
| Recherche | BM25 (`k1 = 1.4`, `b = 0.72`) sur index inversé |
| Langue | normalisation des accents, radicalisation française prudente, liste de mots vides |
| Vocabulaire métier | table de synonymes reliant le mot du terrain au mot du classeur (*péremption → DDM*, *froid → température*, *gluten → blé, seigle, orge*) |
| Réponse | extraction de la phrase la plus dense en termes de la question, surlignage des correspondances |
| Garde-fou | seuil de pertinence en dessous duquel aucune réponse n'est rendue |
| Exécution | 100 % dans le navigateur, aucun serveur, aucune clé API, aucun coût |

Recherche lexicale plutôt que vectorielle, assumé : sur un corpus qualité, les questions portent sur des termes précis (une référence, un allergène, un seuil), là où le lexical est très solide — et cela permet à la démonstration de tourner sans backend ni abonnement. Un déploiement réel avec un corpus de plusieurs milliers de pages passerait à une recherche hybride, lexicale et vectorielle.

## Brancher vos propres documents

```bash
python outils/ingest.py mes_documents/ > corpus.js
```

Le script découpe les fichiers `.md` et `.txt` sur les titres de niveau 2 et régénère la base. Rien d'autre à modifier.

## Fichiers

```
index.html      interface et logique d'affichage
rag.js          moteur de recherche (aucune dépendance)
corpus.js       base documentaire
outils/ingest.py  génération du corpus depuis un dossier de documents
EVALUATION.md   ce qui marche, ce qui ne marche pas
```

## Limites

Elles sont détaillées dans [EVALUATION.md](EVALUATION.md). En résumé : très bon sur les questions factuelles portant sur un terme précis, plus fragile sur les questions de synthèse transversale et sur les formulations qui n'emploient aucun mot du corpus.

---

*Réalisé par **Benoît Lamarque** — HESTIA Consulting, IA appliquée aux PME agroalimentaires. Entreprise, produits et documents entièrement fictifs.*
