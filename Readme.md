# Video searcher

Petit projet pour la formation THP Next, pour la semaine sur JS.

## ---

Les articles / vidéos / formations se trouvent dans le fichier `data.js`.

Dans le fichier `index.html` se trouve le template HTML initial à utiliser.

Quelques fonctions sont déjà présentes dans le fichier `index.js`, il ne reste plus qu'à terminer certaines fonctions contenant des TODOs&nbsp;!


## vocabulary

### reduce

```js
tableau.reduce((accumulateur, élément) => {
    // Fais quelque chose avec l'accumulateur et l'élément
    return nouvelAccumulateur;
}, valeurDeDépart);
```

 - accumulateur = ce que tu accumules (le sac qui grandit)
 - élément = l'élément actuel du tableau
 - valeurDeDépart = par quoi tu commences

### some/includes

some = "Est-ce qu'AU MOINS UN des mots-clés de cet article correspond ?"
includes = "Est-ce que ma liste contient ce mot-clé ?"

```js
// Imagine ces données :
const currentKeywords = ['Javascript', 'Gaming']; // Ce que tu as sélectionné

const data = {
    articles: [
        { 
            titre: "Apprendre React", 
            keywords: ['Javascript', 'React'] 
        },
        { 
            titre: "Jouer à Mario", 
            keywords: ['Gaming', 'Nintendo'] 
        },
        { 
            titre: "Cuisiner des pâtes", 
            keywords: ['Cuisine', 'Recette'] 
        },
        { 
            titre: "Article sans mots-clés", 
            keywords: null 
        }
    ]
};

const articlesToShow = data.articles.filter(article =>
    article.keywords && article.keywords.some(kw => currentKeywords.includes(kw))
);

//resultats
articlesToShow = [
    { titre: "Apprendre React", keywords: ['Javascript', 'React'] },
    { titre: "Jouer à Mario", keywords: ['Gaming', 'Nintendo'] }
];
```

### .normalize("NFD")

```js
// Exemple de normalisation pour enlever les accents
const texte = "café";
const texteNormalise = texte.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
console.log(texteNormalise); // "cafe"
```

 - Sépare les lettres de leurs accents
 - NFD = "Normalization Form Decomposed"
 - L'accent devient un caractère séparé invisible
 - \u0300-\u036f = codes Unicode pour tous les accents possibles

### regex

```js
// remplace tous les accents par "" (vide) = supprime les accents
.replace(/[\u0300-\u036f]/g, "")

// remplace tous sauf ca: ^... = "tout sauf" 
// remplace tous sauf les lettres en minuscules et les chiffres
.replace(/[^a-z0-9]+/g, "")
```
