let cheminImgArticle = "../assets/img/";
let article = document.getElementById("article");
let globalData;
let telData;
let btnTel = document.getElementById("btnTel");
let btnWatch = document.getElementById("btnWatch");
let btnTab = document.getElementById("btnTab");
let telephones = document.getElementById("telephones");
let tablettes = document.getElementById("tablettes");
let objetsconnectes = document.getElementById("objetsconnectes");

fetch("../assets/data/data.json")
  .then((res) => res.json())
  .then((jsonData) => {
    globalData = jsonData;

    for (let i = 0; i < globalData.length; i++) {
      article.innerHTML += `
      <div id="card">

            <img id="photoArticle" src="${cheminImgArticle}${globalData[i].image}" alt="${globalData[i].nom}">
            <h1 id="marque">${globalData[i].marque}</h1>
            <h2 id="nomArticle">${globalData[i].nom}</h2>
            <h3 id="prixArticle">${globalData[i].prix}€</h3>
            <h4 id="description">${globalData[i].description}</h4>
            <div id="panierEtPlus">
            <a class="enSavoirPlus" href="#">Plus</a>
            <button id="ajouterPanier">Ajouter au panier</button>
            </div>
           </div>

`;
    }
  });


btnTel.addEventListener("click", function () {
  fetch("../assets/data/data.json")
    .then((res) => res.json())
    .then((telData) => {
      telephones.innerHTML = ""
      for (let i = 0; i < globalData.length; i++) {

        if (globalData[i].catArticle === 'Téléphones Portables') {
          telephones.innerHTML += `
          <div id="card">

            <img id="photoArticle" src="${cheminImgArticle}${globalData[i].image}" alt="${globalData[i].nom}">
            <h1 id="marque">${globalData[i].marque}</h1>
            <h2 id="nomArticle">${globalData[i].nom}</h2>
            <h3 id="prixArticle">${globalData[i].prix}€</h3>
            <h4 id="description">${globalData[i].description}</h4>
            <div id="panierEtPlus">
            <a class="enSavoirPlus" href="#">Plus</a>
            <button id="ajouterPanier">Ajouter au panier</button>
            </div>
            
           </div>
                `;
        }
        article.innerHTML = ""
        tablettes.innerHTML = ""
        objetsconnectes.innerHTML = ""
      }
    });
});
btnTab.addEventListener("click", function () {
  fetch("../assets/data/data.json")
    .then((res) => res.json())
    .then((tabData) => {
      tablettes.innerHTML = ""
      for (let i = 0; i < globalData.length; i++) {
        if (globalData[i].catArticle === 'Tablettes') {
          tablettes.innerHTML += `
          <div id="card">

            <img id="photoArticle" src="${cheminImgArticle}${globalData[i].image}" alt="${globalData[i].nom}">
            <h1 id="marque">${globalData[i].marque}</h1>
            <h2 id="nomArticle">${globalData[i].nom}</h2>
            <h3 id="prixArticle">${globalData[i].prix}€</h3>
            <h4 id="description">${globalData[i].description}</h4>
            <div id="panierEtPlus">
            <a class="enSavoirPlus" href="#">Plus</a>
            <button id="ajouterPanier">Ajouter au panier</button>
            </div>
            
           </div>
              `;
        }
        article.innerHTML = ""
        telephones.innerHTML = ""
        objetsconnectes.innerHTML = ""
      }
    });
  btnWatch.addEventListener("click", function () {
    objetsconnectes.innerHTML = ""
    fetch("../assets/data/data.json")
      .then((res) => res.json())
      .then((watchData) => {
        for (let i = 0; i < globalData.length; i++) {
          if (globalData[i].catArticle === 'Objets Connecté') {
            objetsconnectes.innerHTML += `
            <div id="card">

            <img id="photoArticle" src="${cheminImgArticle}${globalData[i].image}" alt="${globalData[i].nom}">
            <h1 id="marque">${globalData[i].marque}</h1>
            <h2 id="nomArticle">${globalData[i].nom}</h2>
            <h3 id="prixArticle">${globalData[i].prix}€</h3>
            <h4 id="description">${globalData[i].description}</h4>
            <div id="panierEtPlus">
            <a class="enSavoirPlus" href="#">Plus</a>
            <button id="ajouterPanier">Ajouter au panier</button>
            </div>
            
           </div>
                    `;
          }
          article.innerHTML = ""
          tablettes.innerHTML = ""
          telephones.innerHTML = ""
        }
      });
  });

});


// // AFFICHAGE PANIER

// let panier = document.getElementById("panier");
// let contenuPanier = document.getElementById("contenuPanier");

// panier.addEventListener('click', function (event) {
//   event.stopPropagation();

//   contenuPanier.style.visibility = 'visible';
// });

// document.addEventListener('click', function () {
//   if (contenuPanier.style.visibility === 'visible') {
//     contenuPanier.style.visibility = 'hidden';
//   }
// });

//BOUTTON AJOUTER

document.addEventListener('click', function (event) {
  if (event.target.id === 'ajouterPanier') {
    let articleContainer = event.target.closest('#card');

    // Récupérer le nom de l'article à partir du conteneur
    let articleNom = articleContainer.querySelector('#nomArticle').innerText;
    let articlePhoto = articleContainer.querySelector('#photoArticle').getAttribute('src');
    let articlePrix = articleContainer.querySelector('#prixArticle').innerText;
    // Faites ce que vous voulez avec le nom de l'article (afficher dans contenuPanier, etc.)
    contenuPanier.innerHTML += `<div id="cardPanier">
        <img src="${articlePhoto}" alt="${articleNom}">
           ${articleNom}
          Prix : ${articlePrix}
          </div>
        `;
  }
});


// Tableau pour stocker les articles sélectionnés dans le panier
const panier = [];

// Fonction pour ajouter un article au panier
function ajouterAuPanier(article) {
  panier.push(article);
  mettreAJourAffichagePanier();
  afficherDetailPanier();
  console.log('Article ajouté au panier :', article);
}

// Fonction pour retirer un article du panier
function retirerDuPanier(article) {
  const index = panier.indexOf(article);
  if (index !== -1) {
    panier.splice(index, 1);
    mettreAJourAffichagePanier();
    afficherDetailPanier();
    console.log('Article retiré du panier :', article);
  }
}

// Fonction pour mettre à jour l'affichage du panier
function mettreAJourAffichagePanier() {
  const nombreArticlesPanier = document.getElementById('nombre-articles-panier');
  nombreArticlesPanier.textContent = panier.length; // Met à jour le nombre d'articles dans le panier
}

// Fonction pour afficher le détail du panier
function afficherDetailPanier() {
  const listeArticlesPanier = document.getElementById('liste-articles-panier');
  const totalPanier = document.getElementById('total-panier');
  let total = 0;

  // Efface le contenu actuel du détail du panier
  listeArticlesPanier.innerHTML = '';

  // Boucle à travers les articles du panier et les affiche dans la liste avec leur prix
  panier.forEach(article => {
    const listItem = document.createElement('li');
    listItem.textContent = `${article.nom} - ${article.prix}€`; // Affiche le nom et le prix de l'article
    listeArticlesPanier.appendChild(listItem);
    total += parseFloat(article.prix); // Convertit la chaîne de caractères en nombre et calcule le total du panier
  });

  // Affiche le total du panier
  totalPanier.textContent = `Total : ${total.toFixed(2)}€`;
}

// Ajoutez un écouteur d'événements sur le conteneur de produits pour gérer l'ajout au panier
document.addEventListener('click', function (event) {
  if (event.target.id === 'ajouterPanier') {
    let articleContainer = event.target.closest('#card');

    // Récupérer les détails de l'article à partir du conteneur
    let articleNom = articleContainer.querySelector('#nomArticle').innerText;
    let articlePhoto = articleContainer.querySelector('#photoArticle').getAttribute('src');
    let articlePrix = articleContainer.querySelector('#prixArticle').innerText;

    // Créez un objet représentant l'article sélectionné
    let article = {
      nom: articleNom,
      photo: articlePhoto,
      prix: articlePrix
    };

    // Ajoutez l'article au panier
    ajouterAuPanier(article);
  }
});

// Affichage du panier lorsqu'on clique sur l'icône du panier
let panierIcone = document.getElementById("panier");
let contenuPanier = document.getElementById("contenuPanier");

panierIcone.addEventListener('click', function (event) {
  event.stopPropagation();

  contenuPanier.style.visibility = 'visible';
});

// Masquer le panier lorsque l'utilisateur clique en dehors du panier
document.addEventListener('click', function () {
  if (contenuPanier.style.visibility === 'visible') {
    contenuPanier.style.visibility = 'hidden';
  }
});
