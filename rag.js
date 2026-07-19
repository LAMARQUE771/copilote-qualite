/* ------------------------------------------------------------------
   Moteur de recherche extractif — aucune dépendance, aucun appel réseau.

   Pipeline :
     question -> normalisation -> expansion métier -> score BM25 sur les
     sections -> extraction de la phrase la plus dense -> citation source.

   Le moteur ne rédige jamais de phrase : il ne renvoie que du texte
   présent dans les documents. C'est ce qui rend la réponse vérifiable.
   ------------------------------------------------------------------ */

const MOTS_VIDES = new Set(`
au aux avec ce ces dans de des du elle en et eux il je la le les leur lui ma mais me meme mes moi mon ne nos notre nous on ou par pas pour qu que qui sa se ses son sur ta te tes toi ton tu un une vos votre vous c d j l a m n s t y est sont ete etre a ai as avons avez ont quel quelle quels quelles quoi comment combien est-ce quand ou dois doit peut peuvent faire fait y-a-t-il
`.trim().split(/\s+/));

/* Vocabulaire métier : le vocabulaire du dirigeant n'est pas celui du
   classeur qualité. Chaque entrée relie les deux. */
const SYNONYMES = {
  gluten: ["ble", "froment", "seigle", "orge", "avoine"],
  ble: ["gluten", "froment"],
  lait: ["laitier", "laitiere", "lactique", "poudre"],
  oeuf: ["oeufs", "ovoproduit"],
  allergene: ["allergenes", "allergie", "trace", "traces", "annexe"],
  ddm: ["durabilite", "peremption", "conservation", "date", "duree"],
  dlc: ["limite", "consommation", "date"],
  peremption: ["ddm", "durabilite", "date"],
  conservation: ["stockage", "entreposage", "ddm", "temperature"],
  stockage: ["conservation", "entreposage", "magasin", "rack"],
  froid: ["temperature", "refrigere", "chaine", "degres"],
  temperature: ["froid", "degres", "thermique", "chaleur"],
  rupture: ["depassement", "ecart", "incident"],
  reclamation: ["plainte", "litige", "client", "non-conformite"],
  rappel: ["retrait", "crise", "tracabilite"],
  retrait: ["rappel", "crise"],
  tracabilite: ["lot", "amont", "aval", "rappel"],
  etiquette: ["etiquetage", "mention", "inco", "1169"],
  etiquetage: ["etiquette", "mention", "inco", "1169"],
  inco: ["1169", "etiquetage", "reglement"],
  nettoyage: ["nettoyer", "purge", "inter-lots", "changement"],
  audit: ["ifs", "certification", "controle"],
  ifs: ["audit", "certification"],
  fournisseur: ["reception", "matiere", "livraison"],
  reception: ["livraison", "controle", "camion"],
  palme: ["huile", "matiere", "grasse"],
  delai: ["heures", "jours", "ouvres", "sous"],
  penalite: ["retard", "pourcentage", "sanction"],
  enregistrement: ["archive", "conservation", "conserves", "registre", "ans"],
  archive: ["enregistrement", "conservation", "ans"],
  garder: ["conservation", "conserves", "ans"],
  duree: ["ans", "mois", "heures", "delai"]
};

/* Les synonymes sont indexés sur la racine du mot, pour que "enregistrements"
   et "enregistrement" tombent sur la même entrée. */
const SYN_RACINE = new Map();

/* ---------- normalisation ---------- */

function sansAccent(s) {
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function racine(mot) {
  // Radicalisation volontairement prudente : on ne coupe que les
  // terminaisons françaises les plus sûres, sur des mots assez longs.
  if (mot.length <= 5) return mot;
  return mot
    .replace(/(ements|ations|ement|ation|ances|ence|eurs|euse|ives|ive|ees|es|s)$/, "")
    .replace(/(er|ir|ee)$/, "");
}

Object.entries(SYNONYMES).forEach(([cle, valeurs]) => {
  SYN_RACINE.set(cle, valeurs);
  SYN_RACINE.set(racine(cle), valeurs);
});

function tokeniser(texte) {
  return sansAccent(texte.toLowerCase())
    .replace(/[^a-z0-9]+/g, " ")
    .split(" ")
    .filter(m => m.length > 1 && !MOTS_VIDES.has(m));
}

function etendre(tokens) {
  const sortie = new Map(); // token -> poids
  tokens.forEach(t => {
    sortie.set(racine(t), Math.max(sortie.get(racine(t)) || 0, 1));
    (SYN_RACINE.get(t) || SYN_RACINE.get(racine(t)) || []).forEach(s => {
      const r = racine(s);
      // Un synonyme pèse moins qu'un mot réellement tapé.
      if (!sortie.has(r)) sortie.set(r, 0.45);
    });
  });
  return sortie;
}

/* ---------- index ---------- */

const CHUNKS = [];
CORPUS.forEach(doc => {
  doc.sections.forEach((sec, i) => {
    const texteComplet = `${doc.titre} ${sec.titre} ${sec.texte}`;
    CHUNKS.push({
      id: `${doc.ref}#${i + 1}`,
      ref: doc.ref,
      docTitre: doc.titre,
      type: doc.type,
      maj: doc.maj,
      secTitre: sec.titre,
      texte: sec.texte,
      tokens: tokeniser(texteComplet)
    });
  });
});

const N = CHUNKS.length;
const LONGUEUR_MOY = CHUNKS.reduce((a, c) => a + c.tokens.length, 0) / N;

const DF = new Map();
CHUNKS.forEach(c => {
  new Set(c.tokens.map(racine)).forEach(r => DF.set(r, (DF.get(r) || 0) + 1));
});

CHUNKS.forEach(c => {
  const tf = new Map();
  c.tokens.map(racine).forEach(r => tf.set(r, (tf.get(r) || 0) + 1));
  c.tf = tf;
});

/* ---------- scoring BM25 ---------- */

const K1 = 1.4, B = 0.72;

function scorer(chunk, requete) {
  let score = 0;
  const termesTrouves = [];
  requete.forEach((poids, terme) => {
    const f = chunk.tf.get(terme);
    if (!f) return;
    const df = DF.get(terme) || 0;
    const idf = Math.log(1 + (N - df + 0.5) / (df + 0.5));
    const norme = f * (K1 + 1) / (f + K1 * (1 - B + B * chunk.tokens.length / LONGUEUR_MOY));
    score += poids * idf * norme;
    if (poids === 1) termesTrouves.push(terme);
  });
  // Un titre de section qui répond directement pèse davantage.
  const titreTokens = new Set(tokeniser(chunk.secTitre).map(racine));
  requete.forEach((poids, terme) => {
    if (poids === 1 && titreTokens.has(terme)) score *= 1.18;
  });
  return { score, termesTrouves };
}

function chercher(question, limite = 3) {
  const requete = etendre(tokeniser(question));
  if (requete.size === 0) return [];
  const classes = CHUNKS
    .map(c => ({ chunk: c, ...scorer(c, requete) }))
    .sort((a, b) => b.score - a.score);

  // Garde-fou : en dessous de ce seuil, la question sort du périmètre
  // documentaire. Mieux vaut ne rien répondre qu'afficher un passage
  // vaguement ressemblant — c'est la règle du jeu en qualité.
  const SEUIL = 4.5;
  if (!classes.length || classes[0].score < SEUIL) return [];

  return classes
    .filter(r => r.score >= Math.max(SEUIL * 0.55, classes[0].score * 0.28))
    .slice(0, limite)
    .map(r => ({ ...r, phrase: phraseCle(r.chunk.texte, requete), requete }));
}

/* ---------- extraction de la phrase la plus dense ---------- */

function phraseCle(texte, requete) {
  const phrases = texte.match(/[^.;]+[.;]?/g) || [texte];
  let meilleure = phrases[0], meilleurScore = -1;
  phrases.forEach(p => {
    const t = new Set(tokeniser(p).map(racine));
    let s = 0;
    requete.forEach((poids, terme) => { if (t.has(terme)) s += poids; });
    s = s / Math.sqrt(Math.max(tokeniser(p).length, 4));
    if (s > meilleurScore) { meilleurScore = s; meilleure = p; }
  });
  return meilleure.trim();
}

/* ---------- surlignage ---------- */

function surligner(texte, requete) {
  const mots = texte.split(/(\s+)/);
  return mots.map(m => {
    const nu = racine(sansAccent(m.toLowerCase()).replace(/[^a-z0-9]/g, ""));
    if (nu && requete.get(nu) === 1) {
      return `<mark>${echapper(m)}</mark>`;
    }
    return echapper(m);
  }).join("");
}

function echapper(s) {
  return s.replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
}
