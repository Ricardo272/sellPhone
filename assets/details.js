document.addEventListener('DOMContentLoaded', function () {
    // Récupérer les paramètres d'URL
    const urlParams = new URLSearchParams(window.location.search);
    const nom = urlParams.get('nom');
    const prix = urlParams.get('prix');
    const image = urlParams.get('image');
    const description = urlParams.get('description');
  
    // Utilisez les valeurs récupérées pour afficher les détails sur la page
    document.getElementById('nomDetail').innerText = nom;
    document.getElementById('prixDetail').innerText = prix +  ' €';
    document.getElementById('imageDetail').src = decodeURIComponent('assets/img/' + image);
    document.getElementById('descriptionDetail').innerText = decodeURIComponent(description);
  });
  