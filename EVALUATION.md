# Évaluation

Un outil documentaire ne se juge pas sur sa démo réussie, mais sur ce qu'il fait quand la question est mal posée. Voici le jeu de test utilisé et les résultats réels.

## Méthode

16 questions écrites comme les poserait un opérateur ou un commercial, pas comme les poserait un ingénieur. Pour chacune, on note si le passage attendu arrive en première position, en deuxième, ou pas du tout.

## Résultats

| Type de question | Test | Position |
|---|---|---|
| Terme précis présent au corpus | *Quels produits contiennent du gluten ?* | 1 |
| | *Quel produit contient du sésame ?* | 1 |
| | *Quelle est la DDM du prémix brioche ?* | 1 |
| | *Le prémix pain de mie contient-il du lait ?* | 1 |
| | *Combien de sacs par palette ?* | 1 |
| Procédure / conduite à tenir | *Que faire si la température dépasse 25 °C ?* | 1 |
| | *Comment nettoyer entre deux lots d'allergènes différents ?* | 1 |
| | *Qui décide d'un rappel produit ?* | 1 |
| Délai contractuel | *Sous combien de temps répondre à une réclamation ?* | 1 |
| Exigence client | *Le client accepte-t-il l'huile de palme ?* | 1 |
| Distinction réglementaire | *Quelle différence entre DDM et DLC ?* | 1 |
| Reformulation métier | *Quel produit pour un client allergique au lait ?* | 2 |
| | *Combien de temps garde-t-on les enregistrements ?* | 2 |
| Vocabulaire absent du corpus | *À quelle hauteur ranger les allergènes ?* | échec |
| Comparaison entre documents | *Quel produit se garde le moins longtemps ?* | échec |
| Hors périmètre | *Recette du gâteau au chocolat* | rejet correct |

**11 réponses justes en première position sur 15 questions légitimes, 2 en deuxième, 2 échecs.** Les questions hors périmètre sont correctement refusées.

## Les deux échecs, et pourquoi ils sont instructifs

**« À quelle hauteur ranger les allergènes ? »** — La procédure dit *« stockés en bas de rack »*. La question dit *hauteur*, le document dit *bas de rack* : aucun mot commun. Une recherche lexicale ne peut pas franchir cet écart. C'est le cas typique où une recherche vectorielle apporte un vrai gain, et la raison pour laquelle un déploiement réel se fait en hybride.

**« Quel produit se garde le moins longtemps ? »** — La réponse existe (le Mélange Multicéréales, 6 mois) mais suppose de comparer cinq fiches techniques entre elles. Aucun passage unique ne la contient. Ce type de question relève d'une base structurée, pas d'une recherche documentaire : dans un déploiement réel, les données comparables (DDM, allergènes, dosages) sont extraites dans un tableau, et la comparaison se fait dessus.

Ces deux limites sont utiles à connaître avant de promettre quoi que ce soit à un client. Le périmètre honnête de cet outil : **retrouver une information écrite quelque part**, pas raisonner sur l'ensemble du corpus.

## Reproduire les tests

Les questions ci-dessus sont exécutables directement dans la console du navigateur sur la page de démonstration :

```js
chercher("quel produit contient du sésame ?", 3)
```
