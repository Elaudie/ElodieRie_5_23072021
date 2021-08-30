
//getPanierQuantity();

//On stock le prix total dans cette variable
let total = 0;

//Création du panier utilisateur si besoin
if (localStorage.getItem("monPanier")) {
  console.log("Panier OK");
} else {
  console.log("Création du panier");
  let init = [];
  localStorage.setItem("monPanier", JSON.stringify(init));
}

//On stock le panier dans cette variable
let panier = JSON.parse(localStorage.getItem("monPanier"));
//console.log(panier);

// ----- SUPPRESSION DU PRODUIT DANS LE PANIER
function suppressionArticle(i) {
  console.log("suppression article i :", i);
  panier.splice(i, 1); //suppression --> 1 de l'element i du tableau;
  localStorage.clear(); //on vide le storage avant de le mettre à jour;
  localStorage.setItem("monPanier", JSON.stringify(panier)); //maj du panier sans l'élément i;
  window.location.reload();
}

// ----- AFFICHAGE DU PANIER UTILISATEUR 
function affichagePanier() {
  if (panier.length > 0) {
    document.getElementById("panierVide").remove();

    /*Nous allons présenter le panier à l'utilisateur sous forme de tableau que nous plaçons dans la div "Sectionpanier"*/
    let tableauSection = document.getElementById("basket-resume");

    let listOfBag = "";
    /*On crée l'affichage de la liste des produits proposés qui sera présente sur l'index*/
    panier.map((article, index) => {
      listOfBag += `
<tr>
<div class="contenantArticle">
<td><img id="articleImage" src="${article.imageUrl}"></td>
<div class="contenantDescription">
<td><div class="articleName">${article.name}</div></td>
<td><div class="articleColor">${article.personnalisation}</div></td>
<td><div class="articlePrice">${article.price / 100}€</div></td>
</div></div>
<td class="fas fa-trash-alt" onclick="suppressionArticle(${index})"></td>
</tr>`;
    });
    tableauSection.innerHTML = listOfBag;

    /*Création de la ligne du bas du tableau affichant le prix total de la commande*/
    JSON.parse(localStorage.getItem("monPanier")).forEach((specArticle) => {
      total += specArticle.price / 100;
    });

    sessionStorage.setItem("totalPanier", total);
    tableauFooterPrixTotal = document.getElementById("tableautotal");

    tableauFooterPrixTotal.textContent = "Prix total: " + total + " euros";
  }
}
affichagePanier();


// ----- FORMULAIRE

//Création de l'objet à envoyer, regroupant le formulaire et les articles. Sera utile pour la page confirmation.
const commandeUser = {
  contact: {},
  products: [],
};

// ----- FORMULAIRE ENTIEREMENT VALIDE
function sendCommand(event) {
  const prenomForm = document.getElementById('formPrenom')
  const nomForm = document.getElementById('formNom')
  const adresseForm = document.getElementById('formAdress')
  const emailForm = document.getElementById('formMail')
   
    // ----- CREATION DE L'OBJET 'commandeUser' CONTACT + ARRAY PRODUCT
    commandeUser.contact = {
      firstName: prenomForm.value,
      lastName: nomForm.value,
      address: adresseForm.value,
      city: villeForm.value,
      email: emailForm.value,
    };
    console.log(commandeUser);
    //console.log(contact);
    console.log(panier);
    //Création du tableau des articles
    panier.forEach((articlePanier) =>
      commandeUser.products.push(articlePanier._id)
    );

    // ----- POST DE LA COMMANDE AU "BACKEND" DES DONNÉES RÉCUPÉRÉES DEPUIS LE "LOCALSTORAGE" 
       const optionsFetch = {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(commandeUser),
    };

  
    // ----- TRAITEMENT RÉPONSE OK POUR SE DIRIGER VERS LA PAGE CONFIRMATION 
    fetch("http://localhost:3000/api/teddies/order", optionsFetch).then(function (response) {
      response.json().then(function (resOrder) {
        console.log(resOrder);
        localStorage.setItem("resOrder", JSON.stringify(resOrder));
        window.location = "./confirmation.html";
      });
    });
  }
localStorage.clear();