
getPanierQuantity();

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
    let tableauSection = document.querySelector(".Rowsarticle");

    let listOfBag = "";
    /*On crée l'affichage de la liste des produits proposés qui sera présente sur l'index*/
    panier.map((article, index) => {
      listOfBag += `
<tr>
<td ><img id="articleImage" src="${article.imgUrl}"></td>
<td>${article.name}</td>
<td>${article.lense}</td>
<td>${article.quantity}</td>
<td>${article.price / 100}&#8364;</td>
<td class="fas fa-trash-alt" onclick="suppressionArticle(${index})"></td>
</tr>`;
    });
    tableauSection.innerHTML = listOfBag;

    /*Création de la ligne du bas du tableau affichant le prix total de la commande*/
    JSON.parse(localStorage.getItem("monPanier")).forEach((specArticle) => {
      total += specArticle.price / 100;
    });

    sessionStorage.setItem("totalPanier", total);
    tableauFooterPrixTotal = document.querySelector(".tableauFooterLigne");

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

// ----- TEST INPUT DE VALIDATION DU FORMULAIRE
function testRegex() {
  //input prénom
  console.log(inputRegex(prenomForm.value));
  if (!inputRegex(prenomForm.value)) {
    messageError =
      "💡️ Votre PRENOM doit contenir au moins 1 lettre sans caractères spéciaux et sans chiffres.";
    inputError = true;
  }

  //input nom
  console.log(inputRegex(nomForm.value));
  if (!inputRegex(nomForm.value)) {
    messageError =
      "💡️ Votre NOM doit contenir au moins 1 lettre sans caractères spéciaux et sans chiffres.";
    inputError = true;
  }

  //input ville
  console.log(inputRegex(villeForm.value));
  if (!inputRegex(villeForm.value)) {
    messageError =
      "💡️ Votre VILLE ne doit pas contenir de caractères spéciaux.";
    inputError = true;
  }

  //input mail
  console.log(inputRegexMail(emailForm.value));
  if (!inputRegexMail(emailForm.value)) {
    messageError =
      "💡️ Votre MAIL ne doit pas contenir de caractères spéciaux et doit contenir @ et un .";
    inputError = true;
  }

  //input adresse
  console.log(inputRegexAdresse(adresseForm.value));
  if (!inputRegexAdresse(adresseForm.value)) {
    messageError =
      "💡️ Votre ADRESSE POSTALE ne doit pas contenir dde  caractères spéciaux.";
    inputError = true;
  }
}

// ----- FORMULAIRE ENTIEREMENT VALIDE
function sendCommand(event) {
  event.preventDefault();

  //Avant d'envoyer un formulaire, vérification que le panier n'est pas vide et que le formulaire est true.
  if (panier.length == 0) {
    divAlert.style.display = "block";
    alertErrors.textContent = "💡️ Votre panier est vide";
  } else if (inputError) {
    divAlert.style.display = "block";
    alertErrors.textContent = messageError;
  } else {
   
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
    fetch(getUrl() + "/order", optionsFetch).then(function (response) {
      response.json().then(function (resOrder) {
        console.log(resOrder);
        localStorage.setItem("resOrder", JSON.stringify(resOrder));
        window.location = "./confirmation.html";
      });
    });
  }
}
localStorage.clear();