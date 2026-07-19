/* ------------------------------------------------------------------
   Base documentaire de démonstration — Ingrédients de l'Ouest SAS
   Entreprise fictive : mélangeur de prémix et améliorants boulangerie,
   62 salariés, Loire-Atlantique. Certifiée IFS Food.

   Chaque document est découpé en sections. Une section = un "chunk",
   c'est-à-dire l'unité que le moteur de recherche retrouve et cite.
   ------------------------------------------------------------------ */

const CORPUS = [
  {
    ref: "FT-PRE-001",
    titre: "Prémix Brioche Tradition",
    type: "Fiche technique",
    maj: "12/03/2026",
    sections: [
      {
        titre: "Composition",
        texte: "Farine de blé (T55), sucre, poudre de lait entier, gluten de blé, levure désactivée, émulsifiant E471, sel, arôme naturel de vanille. Le produit est un mélange sec destiné à la fabrication de pâte à brioche après ajout d'eau, d'œufs et de beurre par le boulanger."
      },
      {
        titre: "Allergènes",
        texte: "Contient : gluten (blé), lait. Peut contenir des traces de : œuf, soja, fruits à coque. Les traces proviennent de la polyvalence de la ligne de mélange 2. Aucun allergène de la liste des 14 n'est présent hors ceux déclarés en composition."
      },
      {
        titre: "Caractéristiques physico-chimiques",
        texte: "Humidité : maximum 13 %. Protéines : 11,5 g pour 100 g. Granulométrie : 95 % passant au tamis 500 microns. pH de la pâte reconstituée : 5,8 à 6,2."
      },
      {
        titre: "Conservation et DDM",
        texte: "DDM (date de durabilité minimale) : 9 mois à compter de la date de fabrication. À conserver à l'abri de la lumière, entre 5 et 20 °C, humidité relative inférieure à 65 %. Ne pas stocker à même le sol ni à proximité de produits odorants."
      },
      {
        titre: "Conditionnement",
        texte: "Sac papier kraft de 25 kg, palette de 40 sacs, filmée et étiquetée. Chaque sac porte le numéro de lot au format AAJJJ-L2 et la DDM en clair."
      }
    ]
  },
  {
    ref: "FT-PRE-002",
    titre: "Prémix Pain de Mie Moelleux",
    type: "Fiche technique",
    maj: "04/02/2026",
    sections: [
      {
        titre: "Composition",
        texte: "Farine de blé (T65), sucre, matière grasse végétale de colza, gluten de blé, farine de fève, sel, agent de traitement de la farine acide ascorbique (E300), enzymes (amylases)."
      },
      {
        titre: "Allergènes",
        texte: "Contient : gluten (blé). Ne contient pas de lait ni d'œuf. Peut contenir des traces de lait et de soja par contact sur ligne partagée. Produit adapté aux clients demandant une recette sans produit laitier ajouté."
      },
      {
        titre: "Conservation et DDM",
        texte: "DDM : 12 mois à compter de la fabrication. Stockage au sec entre 5 et 20 °C. La présence d'enzymes impose de ne pas dépasser 25 °C de manière prolongée, sous peine de perte d'activité et de défaut de volume à la cuisson."
      },
      {
        titre: "Mise en œuvre",
        texte: "Dosage recommandé : 100 % du prémix pour 58 à 62 litres d'eau aux 100 kg. Pétrissage spirale 4 minutes en première vitesse puis 8 minutes en deuxième vitesse. Température de pâte visée : 24 °C."
      }
    ]
  },
  {
    ref: "FT-AME-010",
    titre: "Améliorant Croustille",
    type: "Fiche technique",
    maj: "27/01/2026",
    sections: [
      {
        titre: "Composition",
        texte: "Farine de blé, dextrose, agent de traitement acide ascorbique (E300), enzymes (amylases, hémicellulases), support farine de blé malté. Améliorant destiné aux pains de tradition et baguettes de terroir."
      },
      {
        titre: "Allergènes",
        texte: "Contient : gluten (blé). Aucun autre allergène de la liste des 14 n'est présent ni en composition ni en traces : ce produit est fabriqué sur la ligne dédiée 1, non partagée avec les produits laitiers, œuf ou fruits à coque."
      },
      {
        titre: "Conservation et DDM",
        texte: "DDM : 12 mois. Conserver entre 5 et 20 °C au sec. Refermer le sac entamé, l'activité enzymatique se dégrade en atmosphère humide."
      }
    ]
  },
  {
    ref: "FT-MIX-020",
    titre: "Mélange Multicéréales Ouest",
    type: "Fiche technique",
    maj: "18/03/2026",
    sections: [
      {
        titre: "Composition",
        texte: "Farine de blé, graines de tournesol, graines de lin brun, flocons d'avoine, graines de sésame, farine de seigle, sel, gluten de blé, extrait de malt d'orge."
      },
      {
        titre: "Allergènes",
        texte: "Contient : gluten (blé, seigle, avoine, orge), sésame. Peut contenir des traces de fruits à coque et de soja. Le sésame étant présent en composition, une mention en gras est obligatoire sur l'étiquette du produit fini."
      },
      {
        titre: "Conservation et DDM",
        texte: "DDM : 6 mois seulement, en raison de la présence de graines oléagineuses sensibles au rancissement. Stockage impératif entre 5 et 18 °C, à l'abri de la lumière. C'est la DDM la plus courte de la gamme."
      }
    ]
  },
  {
    ref: "FT-PRE-003",
    titre: "Prémix Viennoiserie Beurre",
    type: "Fiche technique",
    maj: "09/03/2026",
    sections: [
      {
        titre: "Composition",
        texte: "Farine de blé (T45), sucre, poudre de lait écrémé, gluten de blé, poudre d'œuf entier, sel, levure désactivée, arôme naturel."
      },
      {
        titre: "Allergènes",
        texte: "Contient : gluten (blé), lait, œuf. Peut contenir des traces de soja et de fruits à coque. Produit fabriqué sur la ligne de mélange 2."
      },
      {
        titre: "Conservation et DDM",
        texte: "DDM : 8 mois. Stockage entre 5 et 20 °C au sec. La poudre d'œuf impose un contrôle microbiologique renforcé à réception : Salmonella absence dans 25 g, Entérobactéries inférieur à 100 UFC par gramme."
      }
    ]
  },
  {
    ref: "TAB-ALL-001",
    titre: "Tableau allergènes de la gamme",
    type: "Synthèse qualité",
    maj: "20/03/2026",
    sections: [
      {
        titre: "Produits contenant du gluten",
        texte: "Tous les produits de la gamme contiennent du gluten : Prémix Brioche Tradition (FT-PRE-001), Prémix Pain de Mie Moelleux (FT-PRE-002), Améliorant Croustille (FT-AME-010), Mélange Multicéréales Ouest (FT-MIX-020) et Prémix Viennoiserie Beurre (FT-PRE-003). Aucune référence sans gluten n'est fabriquée sur le site à ce jour."
      },
      {
        titre: "Produits contenant du lait",
        texte: "Deux références contiennent du lait en composition : Prémix Brioche Tradition (poudre de lait entier) et Prémix Viennoiserie Beurre (poudre de lait écrémé). Le Prémix Pain de Mie, l'Améliorant Croustille et le Mélange Multicéréales n'en contiennent pas, mais les deux premiers peuvent en contenir des traces."
      },
      {
        titre: "Produits contenant de l'œuf",
        texte: "Une seule référence contient de l'œuf en composition : le Prémix Viennoiserie Beurre (poudre d'œuf entier). Les autres références sont concernées uniquement au titre des traces éventuelles."
      },
      {
        titre: "Produits contenant du sésame",
        texte: "Une seule référence contient du sésame : le Mélange Multicéréales Ouest. Le sésame étant un allergène à déclaration obligatoire, il doit apparaître en caractères contrastés dans la liste d'ingrédients du produit fini."
      },
      {
        titre: "Références sans allergène de contact",
        texte: "L'Améliorant Croustille est la seule référence fabriquée sur ligne dédiée, sans risque de contact avec le lait, l'œuf, le soja ou les fruits à coque. C'est la référence à proposer aux clients ayant une exigence forte sur la maîtrise des traces."
      }
    ]
  },
  {
    ref: "PRO-HACCP-04",
    titre: "Maîtrise des températures de stockage",
    type: "Procédure HACCP",
    maj: "15/01/2026",
    sections: [
      {
        titre: "Limites critiques",
        texte: "Les matières premières sensibles (poudre de lait, poudre d'œuf) sont stockées entre 5 et 20 °C. La limite critique est fixée à 25 °C. Au-delà de 25 °C pendant plus de 4 heures cumulées, le lot est considéré comme suspect et bloqué."
      },
      {
        titre: "Conduite à tenir en cas de dépassement",
        texte: "En cas de rupture de la chaîne du froid ou de dépassement de température : 1) isoler physiquement les lots concernés en zone de blocage et poser l'étiquette rouge NON CONFORME ; 2) enregistrer l'incident sur le formulaire ENR-HACCP-04 avec la durée et la température maximale relevée ; 3) alerter le responsable qualité dans l'heure ; 4) ne jamais remettre le lot en production avant décision écrite. La décision de libération, de déclassement ou de destruction appartient au seul responsable qualité, après analyse microbiologique si nécessaire."
      },
      {
        titre: "Surveillance",
        texte: "Enregistreurs de température en continu dans les magasins MP1 et MP2, relevé visuel quotidien à 8h par le magasinier, alarme SMS au-delà de 24 °C. Étalonnage des sondes une fois par an par un prestataire accrédité."
      }
    ]
  },
  {
    ref: "PRO-HACCP-07",
    titre: "Gestion des allergènes et nettoyage inter-lots",
    type: "Procédure HACCP",
    maj: "22/02/2026",
    sections: [
      {
        titre: "Principe d'ordonnancement",
        texte: "La planification de production suit l'ordre du moins allergène vers le plus allergène. Sur la ligne 2, l'ordre imposé est : produits sans lait ni œuf, puis produits contenant du lait, puis produits contenant du lait et de l'œuf. Tout retour en arrière dans cet ordre impose un nettoyage complet."
      },
      {
        titre: "Nettoyage entre deux lots",
        texte: "Changement de produit sans changement de profil allergène : soufflage et aspiration des mélangeurs, 15 minutes. Changement de profil allergène : nettoyage complet à sec avec démontage des vis de transfert, purge de 50 kg de farine sacrifiée, puis contrôle visuel et test de détection rapide des protéines de lait. Le test doit être négatif avant redémarrage. Les résultats sont consignés sur ENR-HACCP-07."
      },
      {
        titre: "Formation du personnel",
        texte: "Tout opérateur de ligne suit une formation allergènes à l'embauche puis un recyclage annuel. L'émargement est archivé 3 ans et présenté lors de l'audit IFS."
      }
    ]
  },
  {
    ref: "PRO-QUA-12",
    titre: "Traitement des non-conformités et réclamations client",
    type: "Procédure qualité",
    maj: "11/12/2025",
    sections: [
      {
        titre: "Enregistrement d'une réclamation",
        texte: "Toute réclamation client est enregistrée le jour même dans le registre REC par le service qualité, quel que soit le canal de réception (téléphone, mail, commercial). L'enregistrement comprend le numéro de lot, la date, la nature du défaut et la quantité concernée."
      },
      {
        titre: "Délais de réponse",
        texte: "Accusé de réception au client sous 48 heures ouvrées. Réponse argumentée avec analyse des causes sous 10 jours ouvrés. En cas de risque sanitaire, l'information du client et la décision de retrait interviennent sous 24 heures maximum."
      },
      {
        titre: "Analyse des causes",
        texte: "Toute réclamation récurrente, définie comme trois occurrences du même défaut sur douze mois glissants, déclenche une analyse 5M et un plan d'action avec pilote et échéance. Le suivi est revu en revue de direction trimestrielle."
      }
    ]
  },
  {
    ref: "PRO-QUA-15",
    titre: "Traçabilité, retrait et rappel",
    type: "Procédure qualité",
    maj: "08/01/2026",
    sections: [
      {
        titre: "Règle de traçabilité",
        texte: "La traçabilité est assurée lot amont vers lot aval en moins de 4 heures. Chaque lot fini est relié à ses lots de matières premières, à la ligne, à l'équipe et au créneau horaire de fabrication. Les enregistrements sont conservés 3 ans, soit la DDM la plus longue augmentée de 24 mois."
      },
      {
        titre: "Déclenchement d'un retrait ou d'un rappel",
        texte: "Le retrait concerne les produits encore chez les clients professionnels, le rappel concerne les produits déjà en main du consommateur final. La décision appartient au directeur de site sur proposition du responsable qualité. La cellule de crise est réunie sous 2 heures. La DDPP est informée sans délai en cas de risque sanitaire avéré."
      },
      {
        titre: "Test de traçabilité",
        texte: "Un exercice de traçabilité complet est réalisé deux fois par an, dont un exercice de rappel à blanc avec chronométrage. Le taux de récupération théorique doit atteindre au minimum 99,5 % des quantités expédiées."
      }
    ]
  },
  {
    ref: "PRO-STO-05",
    titre: "Réception et stockage des matières premières",
    type: "Procédure logistique",
    maj: "05/02/2026",
    sections: [
      {
        titre: "Contrôle à réception",
        texte: "À chaque réception : contrôle du bon de livraison, de la propreté et de l'odeur du camion, de l'intégrité des emballages, de la présence du numéro de lot et de la DDM. Prise de température pour les matières sensibles. Tout écart entraîne un refus ou une acceptation sous réserve avec blocage informatique du lot."
      },
      {
        titre: "Règles d'entreposage",
        texte: "Stockage sur palettes, jamais à même le sol, à 50 cm minimum des murs pour permettre le passage lors des contrôles nuisibles. Rotation FEFO : premier périmé, premier sorti. Les allergènes majeurs sont stockés en bas de rack pour éviter toute chute de poudre sur les autres matières."
      }
    ]
  },
  {
    ref: "REG-INCO-01",
    titre: "Étiquetage — mentions obligatoires",
    type: "Veille réglementaire",
    maj: "30/03/2026",
    sections: [
      {
        titre: "Base réglementaire",
        texte: "Le règlement (UE) n° 1169/2011, dit règlement INCO, fixe les mentions obligatoires sur les denrées alimentaires. Pour nos produits vendus à des professionnels, les mentions restent dues, sous une forme adaptée au B2B."
      },
      {
        titre: "Mentions à faire figurer",
        texte: "Dénomination de la denrée, liste des ingrédients par ordre décroissant, mise en évidence des allergènes, quantité de certains ingrédients, quantité nette, date de durabilité minimale ou date limite de consommation, conditions particulières de conservation et d'utilisation, nom et adresse de l'exploitant, numéro de lot, déclaration nutritionnelle."
      },
      {
        titre: "Mise en évidence des allergènes",
        texte: "Les substances allergènes de l'annexe II du règlement doivent être mises en évidence dans la liste des ingrédients par une typographie qui les distingue clairement du reste, par exemple le gras, la majuscule ou un fond contrasté. Une mention du type peut contenir des traces reste volontaire et ne remplace pas la déclaration en composition."
      }
    ]
  },
  {
    ref: "REG-DDM-02",
    titre: "DDM et DLC — règles d'application",
    type: "Veille réglementaire",
    maj: "30/03/2026",
    sections: [
      {
        titre: "Différence entre DDM et DLC",
        texte: "La DLC, date limite de consommation, s'applique aux denrées microbiologiquement très périssables et se formule à consommer jusqu'au. Son dépassement rend le produit impropre à la consommation. La DDM, date de durabilité minimale, se formule à consommer de préférence avant le, et son dépassement n'entraîne pas d'interdiction de commercialisation dès lors que le produit reste sain."
      },
      {
        titre: "Cas de nos produits",
        texte: "Les prémix et améliorants secs relèvent de la DDM et non de la DLC, du fait de leur faible activité de l'eau. La DDM de chaque référence est fixée par les tests de vieillissement et figure dans la fiche technique correspondante."
      }
    ]
  },
  {
    ref: "CDC-CLI-33",
    titre: "Cahier des charges — Boulangeries Réunies de l'Ouest",
    type: "Cahier des charges client",
    maj: "14/03/2026",
    sections: [
      {
        titre: "Exigences documentaires",
        texte: "Le client exige la fiche technique et la fiche de données de sécurité à jour de chaque référence, une déclaration allergènes annuelle signée, et le certificat IFS Food en cours de validité. Toute modification de recette doit être notifiée 60 jours avant application."
      },
      {
        titre: "Exigences produit",
        texte: "Aucune huile de palme dans les références livrées à ce client. DDM résiduelle à la livraison supérieure ou égale aux deux tiers de la DDM totale. Palettes filmées avec étiquette logistique SSCC. Tolérance de poids sur sac : plus ou moins 0,5 %."
      },
      {
        titre: "Pénalités et audits",
        texte: "Le client se réserve un audit sur site annuel avec préavis de 15 jours. Un retard de livraison supérieur à 24 heures non justifié entraîne une pénalité de 2 % de la valeur de la commande."
      }
    ]
  }
];
