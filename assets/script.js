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


// AFFICHAGE PANIER

let panier = document.getElementById("panier");
let contenuPanier = document.getElementById("contenuPanier");

panier.addEventListener('click', function (event) {
  event.stopPropagation();

  contenuPanier.style.visibility = 'visible';
});

document.addEventListener('click', function (event) {
  if (contenuPanier.style.visibility === 'visible') {
      // Vérifiez si l'élément cliqué est à l'intérieur de la div contenuPanier
      if (!contenuPanier.contains(event.target)) {
          contenuPanier.style.visibility = 'hidden';
      }
  }
});


//BOUTTON AJOUTER
let total = 0;
let moinsbtn, plusbtn, quantitySpan; // Déclarer les variables à un niveau plus global

document.addEventListener('click', function (event) {
  if (event.target.id === 'ajouterPanier') {
    let articleContainer = event.target.closest('#card');

    // Récupérer le nom de l'article à partir du conteneur
    let articleNom = articleContainer.querySelector('#nomArticle').innerText;
    let articlePhoto = articleContainer.querySelector('#photoArticle').getAttribute('src');
    let articlePrix = articleContainer.querySelector('#prixArticle').innerText;

    // Ajouter le nouvel article au panier
    contenuPanier.innerHTML += `<div id="cardPanier">
        <img src="${articlePhoto}" alt="${articleNom}">
        ${articleNom}
        Prix : ${articlePrix}
        <div class="quantity">
          <button class="moinsbtn" data-action="decrease">-</button>
          <span class="quantitySpan">1</span>
          <button class="plusbtn" data-action="increase">+</button>
        </div>
      </div>`;

    // Sélectionner le dernier élément ajouté au panier
    let cardPanier = contenuPanier.lastElementChild;

    // Sélectionner les boutons et le span spécifiques à l'article ajouté
    let moinsbtn = cardPanier.querySelector('.moinsbtn');
    let plusbtn = cardPanier.querySelector('.plusbtn');
    let quantitySpan = cardPanier.querySelector('.quantitySpan');

    // Ajouter des écouteurs d'événements aux boutons
    moinsbtn.addEventListener('click', function () {
      updateQuantity('decrease', quantitySpan);
    });

    plusbtn.addEventListener('click', function () {
      updateQuantity('increase', quantitySpan);
    });
  }
});

function updateQuantity(action, quantitySpan) {
  let currentQuantity = parseInt(quantitySpan.innerText);

  if (action === 'increase') {
    quantitySpan.innerText = currentQuantity + 1;
  } else if (action === 'decrease' && currentQuantity > 1) {
    quantitySpan.innerText = currentQuantity - 1;
  }

  // Supprimer l'article du panier si la quantité atteint 0
  if (parseInt(quantitySpan.innerText) <= 0) {
    let cardPanier = quantitySpan.closest('#cardPanier');
    cardPanier.remove();
  }
}
