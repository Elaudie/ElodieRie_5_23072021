 function getContent(id) {fetch('http://localhost:3000/api/teddies/' + id)
   .then(response => response.json())
   .then(data => {
     const articlesContainer = document.getElementById('product');
     
       articlesContainer.innerHTML += 
       `<div class="cardProduct">
       <img class="imageProduct" src="${data.imageUrl}"> 
       <div class="storyProduct">
       <div class="priceName">
         <h1 class="NameProduct">
           ${data.name}
         </h1> 
         <div class="priceProduct">
           ${data.price * 0.01}€
         </div>
        </div>
        <div class="descriptionProduct">
       <br> ${data.description}<br></div>
        
        <div id="boutons"></div></div></div>`

      const buttonsContainer = document.getElementById("boutons");

      for (let color of data.colors) {
        buttonsContainer.innerHTML += `
             <button onClick='clickHandler(${JSON.stringify(
               data
             )}, "${color}")'>Acheter ${color}</button>
        `;
      }
    })
}

document.addEventListener("DOMContentLoaded", () => {
    const queryString = window.location.search;
     const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');
     console.log(id);
    getContent(id)
});

function clickHandler(data, color) {

  let item = {...data, personnalisation: color};
  //Ajouter data au local localStorage

  // On stocke window.localStorage dans une variable
  // pour l'écrire plus rapidement par la suite
  const localStorage = window.localStorage;

  // On stocke l'élément "monPanier" qui doit se trouver
  // dans localStorage. On décode la chaîne de caractères
  // avec JSON.parse
  let panier = JSON.parse(localStorage.getItem("monPanier"));

  // Si l'élément est nul on initialise un tableau (array) vide
  if (!panier || !panier.length) {
    panier = [];
  }

  // On pousse les données du produit dans le tableau (array)
  panier.push(item);

  // Dernière étape, on remplace l'élément monPanier du localStorage
  // par la nouvelle version qu'on vient de créer.
  // Pour stocker dans localStorage il faut transformer l'objet en chaîne de caractères
  // d'où la fonction JSON.stringify
  localStorage.setItem("monPanier", JSON.stringify(panier));
}


