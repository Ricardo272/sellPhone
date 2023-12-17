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

            <img class="photoArticle" src="${cheminImgArticle}${globalData[i].image}" alt="${globalData[i].nom}">
            <h1 class="marque">${globalData[i].marque}</h1>
            <h2 class="nomArticle">${globalData[i].nom}</h2>
            <h3 class="prixArticle">${globalData[i].prix}€</h3>
            <h4 class="description">${globalData[i].description}</h4>
            <div class="panierEtPlus">
            <a class="enSavoirPlus" href="#">Plus</a>
            <button class="ajouterPanier" onclick="ajouterAuPanier(this.parentElement.parentElement)">Ajouter au panier</button>

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

          <img class="photoArticle" src="${cheminImgArticle}${globalData[i].image}" alt="${globalData[i].nom}">
          <h1 class="marque">${globalData[i].marque}</h1>
          <h2 class="nomArticle">${globalData[i].nom}</h2>
          <h3 class="prixArticle">${globalData[i].prix}€</h3>
          <h4 class="description">${globalData[i].description}</h4>
          <div class="panierEtPlus">
          <a class="enSavoirPlus" href="#">Plus</a>
          <button class="ajouterPanier" onclick="ajouterAuPanier(this.parentElement.parentElement)">Ajouter au panier</button>

          </div>
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

          <img class="photoArticle" src="${cheminImgArticle}${globalData[i].image}" alt="${globalData[i].nom}">
          <h1 class="marque">${globalData[i].marque}</h1>
          <h2 class="nomArticle">${globalData[i].nom}</h2>
          <h3 class="prixArticle">${globalData[i].prix}€</h3>
          <h4 class="description">${globalData[i].description}</h4>
          <div class="panierEtPlus">
          <a class="enSavoirPlus" href="#">Plus</a>
          <button class="ajouterPanier" onclick="ajouterAuPanier(this.parentElement.parentElement)">Ajouter au panier</button>

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

            <img class="photoArticle" src="${cheminImgArticle}${globalData[i].image}" alt="${globalData[i].nom}">
            <h1 class="marque">${globalData[i].marque}</h1>
            <h2 class="nomArticle">${globalData[i].nom}</h2>
            <h3 class="prixArticle">${globalData[i].prix}€</h3>
            <h4 class="description">${globalData[i].description}</h4>
            <div class="panierEtPlus">
            <a class="enSavoirPlus" href="#">Plus</a>
            <button class="ajouterPanier" onclick="ajouterAuPanier(this.parentElement.parentElement)">Ajouter au panier</button>

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

let panier = [];

function ajouterAuPanier(articleElement) {
  let nom = articleElement.querySelector('.nomArticle').innerText;
  let prix = parseFloat(articleElement.querySelector('.prixArticle').innerText); // Convertir le prix en nombre

  let articleToAdd = {
    nom: nom,
    prix: prix,
    quantite: 1
  };

  let existingItemIndex = panier.findIndex(item => item.nom === articleToAdd.nom);

  if (existingItemIndex !== -1) {
    panier[existingItemIndex].quantite++;
  } else {
    panier.push(articleToAdd);
  }

  afficherArticlesDansPanier();
}


function afficherArticlesDansPanier() {
  let panierHTML = '';
  let total = 0;

  for (let article of panier) {
    panierHTML += `
    <div class="articlePanier">
    <p class="nomArticlePanier">${article.nom}</p>
    <p class="prixArticlePanier">${article.prix}€</p>
    <div class="quantiteActions">
        <button class="modifierQuantite" onclick="diminuerQuantite('${article.nom}')"><i class="bi bi-dash-circle-fill"></i></button>
        <p class="quantiteArticlePanier">${article.quantite}</p>
        <button class="modifierQuantite" onclick="augmenterQuantite('${article.nom}')"><i class="bi bi-plus-circle-fill"></i></button>
    </div>
    <button class="supprimerDuPanier" type="button" onclick="supprimerArticleDuPanier('${article.nom}')"><i class="bi bi-trash3-fill"></i></button>
</div>
    `;

    total += article.prix * article.quantite;
  }

  let panierContainer = document.querySelector('.listDesArticlePanier');
  panierContainer.innerHTML = panierHTML;

  let totalPanier = document.querySelector('.totalPanier');
  totalPanier.textContent = `Total : ${total}€`;
}
function supprimerArticleDuPanier(nomArticle) {
  // Filtrer l'article à supprimer du panier
  panier = panier.filter(article => article.nom !== nomArticle);
  // Mettre à jour l'affichage du panier après suppression
  afficherArticlesDansPanier();
}

function augmenterQuantite(nomArticle) {
  let article = panier.find(item => item.nom === nomArticle);
  if (article) {
    article.quantite++;
    afficherArticlesDansPanier();
  }
}

function diminuerQuantite(nomArticle) {
  let article = panier.find(item => item.nom === nomArticle);
  if (article && article.quantite > 1) {
    article.quantite--;
    afficherArticlesDansPanier();
  }
}


// Récupération de l'élément du panier
const panierContent = document.getElementById('panierContent');
const panierLink = document.getElementById('panier');

// Écouteur d'événement sur le clic du bouton "Panier"
panierLink.addEventListener('click', function (event) {
  event.stopPropagation(); // Empêche la propagation du clic à la page

  // Vérifie si le panier est actuellement visible ou non
  const isVisible = window.getComputedStyle(panierContent).display !== 'none';

  // Affiche ou cache le panier en fonction de son état actuel
  if (isVisible) {
    panierContent.style.display = 'none';
  } else {
    panierContent.style.display = 'block';
  }
});

// Écouteur d'événement sur le clic sur la page pour cacher le panier
document.addEventListener('click', function () {
  panierContent.style.display = 'none';
});

// Fonction pour afficher les articles en fonction des données fournies
function displayArticles(data) {
  article.innerHTML = ''; // Efface le contenu actuel de la section "article"

  data.forEach(item => {
    article.innerHTML += `
      <div id="card">
        <img class="photoArticle" src="${cheminImgArticle}${item.image}" alt="${item.nom}">
        <h1 class="marque">${item.marque}</h1>
        <h2 class="nomArticle">${item.nom}</h2>
        <h3 class="prixArticle">${item.prix}€</h3>
        <h4 class="description">${item.description}</h4>
        <div class="panierEtPlus">
          <a class="enSavoirPlus" href="#">Plus</a>
          <button class="ajouterPanier" onclick="ajouterAuPanier(this.parentElement.parentElement)">Ajouter au panier</button>
        </div>
      </div>`;
  });
}

// Fonction pour effectuer la recherche dans les données JSON
function searchInData(searchTerm) {
  const filteredData = globalData.filter(item => {
    const lowercaseName = item.nom.toLowerCase();
    const lowercaseDescription = item.description.toLowerCase();
    return lowercaseName.includes(searchTerm) || lowercaseDescription.includes(searchTerm);
  });

  displayArticles(filteredData); // Affiche les résultats de la recherche
}

// Écouteur d'événement pour la soumission du formulaire de recherche
searchForm.addEventListener('submit', function (event) {
  event.preventDefault(); // Empêche la soumission par défaut du formulaire
  const searchTerm = document.getElementById('searchbar').value.trim().toLowerCase();
  searchInData(searchTerm); // Appelle la fonction de recherche avec le terme saisi
});