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

<img src="${cheminImgArticle}${globalData[i].image}" alt="${globalData[i].nom}">

`;
    }
  });


btnTel.addEventListener("click", function () {
    fetch("../assets/data/data.json")
      .then((res) => res.json())
      .then((telData) => {telephones.innerHTML = ""
          for (let i = 0; i < globalData.length; i++) {
            
              if (globalData[i].catArticle === 'Téléphones Portables') {
                  telephones.innerHTML  += `
                  <img src="${cheminImgArticle}${globalData[i].image}" alt="${globalData[i].nom}">
                `;
              }
              article.innerHTML =""
              tablettes.innerHTML = ""
              objetsconnectes.innerHTML = ""
            }
      });
  });
  btnTab.addEventListener("click", function () {
  fetch("../assets/data/data.json")
    .then((res) => res.json())
    .then((tabData) => {tablettes.innerHTML = ""
        for (let i = 0; i < globalData.length; i++) {
            if (globalData[i].catArticle === 'Tablettes') {
                tablettes.innerHTML  += `
                <img src="${cheminImgArticle}${globalData[i].image}" alt="${globalData[i].nom}">
              `;
            }
            article.innerHTML =""
            telephones.innerHTML = ""
            objetsconnectes.innerHTML = ""
          }
    });
    btnWatch.addEventListener("click", function () {objetsconnectes.innerHTML = ""
        fetch("../assets/data/data.json")
          .then((res) => res.json())
          .then((watchData) => {
              for (let i = 0; i < globalData.length; i++) {
                  if (globalData[i].catArticle === 'Objets Connecté') {
                      objetsconnectes.innerHTML  += `
                      <img src="${cheminImgArticle}${globalData[i].image}" alt="${globalData[i].nom}">
                    `;
                  }
                  article.innerHTML =""
                  tablettes.innerHTML = ""
                  telephones.innerHTML = ""
                }
          });
      });

});