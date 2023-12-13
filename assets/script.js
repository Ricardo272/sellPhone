let cheminImgArticle = ('../assets/img/')
let article = document.getElementById('article')
let globalData


fetch('../assets/data/data.json')
.then((res) => res.json())
  .then((jsonData) => {
    globalData = jsonData; 

    for (let i = 0; i < globalData.length; i++) {
article.innerHTML += `

<img src="${cheminImgArticle}${globalData[i].Image}" alt="${globalData[i].Nom}">

`

  }

})