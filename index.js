const keywords = [];

let currentKeywords = [];

const keywordsCategories = [
    {
        name: 'Programmation',
        keywords: ['Javascript', 'Promises', 'React', 'Vue JS', 'Angular', 'ES6']
    },
    {
        name: 'Librairie',
        keywords: ['Lecture', 'Livres', 'Conseils librairie', 'Bibliothèque']
    },
    {
        name: 'Jeu vidéo',
        keywords: ['Switch', 'Game Boy', 'Nintendo', 'PS4', 'Gaming', 'DOOM', 'Animal Crossing']
    },
    {
        name: 'Vidéo',
        keywords: ['Streaming', 'Netflix', 'Twitch', 'Influenceur', 'Film']
    }
];

const allKeywords = keywordsCategories.reduce((prevKeywords, category) => [
    ...prevKeywords,
    ...category.keywords
], []);

// If the keyword is present in keywords to take into account and we toggle the checkbox, it means
// the checkbox is now unchecked, so we remove the keyword from keywords to take in account.
// Otherwise, it means that we added a new keyword, or we re-checked a checkbox. So we add the
// keyword in the keywords list to take in account.
const toggleKeyword = (keyword) => {
    if (currentKeywords.includes(keyword)) {
        currentKeywords = currentKeywords.filter((currentKeyword) => currentKeyword !== keyword);
    } else {
        currentKeywords.push(keyword);
    }

    reloadArticles();
};

// console.log("reload", toggleKeyword())
// The first argument is the keyword's label, what will be visible by the user.
// It needs to handle uppercase, special characters, etc.
// The second argument is the value of the checkbox. To be sure to not have bugs, we generally
// put it in lowercase and without special characters.
const addNewKeyword = (label, keyword) => {
    resetInput();
    // Nettoyer et vérifier les entrées
    const trimmedLabel = label ? label.trim() : '';
    const trimmedKeyword = keyword ? keyword.trim() : '';
    if (!trimmedLabel || !trimmedKeyword) {
        console.error("Le label ou le mot-clé est vide !");
        return;
    }

    if (keywords.includes(trimmedKeyword)) {
        console.warn("You already added this keyword. Nothing happens.");
        return;
    }

    keywords.push(trimmedKeyword);
    currentKeywords.push(trimmedKeyword);

    document.querySelector('.keywordsList').innerHTML += `
        <div>
            <input id="${trimmedLabel}" value="${trimmedKeyword}" type="checkbox" checked onchange="toggleKeyword(this.value)">
            <label for="${trimmedLabel}">${trimmedLabel}</label>
        </div>
    `;

    reloadArticles();
    resetKeywordsUl();
};

// console.log("addnew", addNewKeyword("Programmation", "Javascript"))
// We reload the articles depends of the currentKeywords
// DONE
const reloadArticles = () => {
    document.querySelector('.articlesList').innerHTML = '';
    // On nettoie les mots-clés sélectionnés pour la comparaison
    const cleanedCurrentKeywords = currentKeywords.map(kw => cleanedKeyword(kw));
    // On filtre les articles qui ont au moins un tag correspondant
    const articlesToShow = data.articles.filter(article => {
        // On nettoie les tags de l'article
        const cleanedTags = (article.tags || []).map(tag => cleanedKeyword(tag));
        // On regarde s'il y a une intersection avec les mots-clés sélectionnés
        return cleanedTags.some(tag => cleanedCurrentKeywords.includes(tag));
    });
    articlesToShow.forEach((article) => {
        document.querySelector('.articlesList').innerHTML += `
            <article>
                <h2>${article.titre}</h2>
            </article>
        `;
    });
};

// We empty the content from the <ul> under the text input
const resetKeywordsUl = () => {
    document.querySelector('.inputKeywordsHandle ul').innerHTML = '';
};

// We add a new article. The argument is an object with a title
const addNewArticle = (article) => {
    document.querySelector('.articlesList').innerHTML += `
        <article>
            <h2>${article.titre}</h2>
        </article>
    `;
};

// We empty the text input once the user submits the form
const resetInput = () => {
    document.querySelector("input[type='text']").value = "";
};

// Clean a keyword to lowercase and without special characters
// DONE
const cleanedKeyword = (keyword) => {
    // Remove special characters and convert to lowercase
    return keyword
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // Remove accents
        .replace(/[^a-z0-9]/g, ""); // Remove non-alphanumeric characters
};



// DONE
// into the form (starting autocompletion at 3 letters).
// DONE
// DONE
// DONE
// Recherche et suggestion de mots-clés et catégories
const showKeywordsList = (value) => {
    // Starting at 3 letters inserted in the form, we do something
    if (value.length >= 3) {
        const keyWordUl = document.querySelector(".inputKeywordsHandle ul");
        resetKeywordsUl();

        // Mots-clés qui correspondent à la recherche et ne sont pas déjà ajoutés
        const matchingKeywords = allKeywords.filter(keyword =>
            cleanedKeyword(keyword).includes(cleanedKeyword(value)) &&
            !keywords.includes(cleanedKeyword(keyword))
        );

        // Affiche les mots-clés correspondants
        matchingKeywords.forEach(keyword => {
            const liWord = document.createElement("li");
            liWord.textContent = keyword;
            liWord.onclick = () => addNewKeyword(keyword, cleanedKeyword(keyword));
            keyWordUl.appendChild(liWord);
        });

        // Recherche la catégorie qui correspond à la recherche
        const category = keywordsCategories.find(cat =>
            cleanedKeyword(cat.name).includes(cleanedKeyword(value))
        );
        if (category) {
            category.keywords.forEach(keyword => {
                if (
                    !matchingKeywords.includes(keyword) &&
                    !keywords.includes(cleanedKeyword(keyword))
                ) {
                    const liWord = document.createElement("li");
                    liWord.textContent = keyword;
                    liWord.onclick = () => addNewKeyword(keyword, cleanedKeyword(keyword));
                    keyWordUl.appendChild(liWord);
                }
            });
        }
    }
};

// Once the DOM (you will se what is it next week) is loaded, we get back our form and
// we prevent the initial behavior of the navigator: reload the page when it's submitted.
// Then we call the function addNewKeyword() with 2 arguments: the label value to show,
// and the checkbox value.
window.addEventListener('DOMContentLoaded', () => {
    const inputElement = document.querySelector('input[type="text"]');

    document.querySelector('.addKeywordsForm').addEventListener('submit', (event) => {
        event.preventDefault();
        const keywordInputValue = inputElement.value.trim(); // Enlève les espaces
        const cleanedValue = cleanedKeyword(keywordInputValue);
        // Vérification avant d'appeler addNewKeyword
        if (keywordInputValue && cleanedValue) {
            addNewKeyword(keywordInputValue, cleanedValue);
        } else {
            console.warn("Le mot-clé est vide ou contient seulement des caractères spéciaux !");
        }

    });

    inputElement.addEventListener('input', (event) => {
        const { value } = event.currentTarget;
        showKeywordsList(value);
    });

    data.articles.forEach((article) => {
        addNewArticle(article);
    });
});
