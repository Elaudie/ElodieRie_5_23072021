//On stock le panier dans cette variable
let panier = JSON.parse(localStorage.getItem("monPanier"));

/*Nous allons présenter le panier à l'utilisateur sous forme de tableau que nous plaçons dans la div "basket-resume"*/
let tableauSection = document.getElementById("basket-resume");

// ----- AFFICHAGE DU PANIER UTILISATEUR 
function affichagePanier() {
  let totalPrice = 0;
  let totalQuantity = 0;
  if (panier.length > 0) {



    document.getElementById("panierVide").remove();

    let listOfBag = "";
    /*On crée l'affichage de la liste des produits proposés qui sera présente sur l'index*/
    panier.map((article, index) => {
      listOfBag += `
    <tr>
    <div class="contenantArticle">
    <button type="button" id="supprimer">x</button>
    <td><img id="articleImage" src="${article.imageUrl}"></td>
    <div class="contenantDescription">
    <td><div class="articleName">${article.name}</div></td>
    <td><div class="articleColor">${article.color}</div></td>
    <td><div class="articlePrice">${(article.price / 100) * article.quantity}€</div></td>
    <td><div>
    <p>Qté : </p>
    <input type="number" id="qty" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${article.quantity}" onChange="changeQuantity(event, '${article._id}', '${article.color}')">
    </div></td>
    </div></div>
    </tr>`;
      totalPrice += article.price * article.quantity;
      totalQuantity += parseInt(article.quantity);
        });

        tableauSection.innerHTML = listOfBag;


  }
    // Boutton effacer
    let btnDelete = document.querySelectorAll("#supprimer");
    
    // boucle pour supprimer le produit choisi
    for (let i = 0; i < btnDelete.length; i++) {
      btnDelete[i].addEventListener("click", (event) => {
        event.preventDefault();
        //Déclaration de la variable selectID afin de selectionner l'ID du produit
        let selectID = panier[i]._id;

        //création d'un nouveau tableau avec la méthode filter
        panier = panier.filter( elementId => elementId._id !== selectID);
        localStorage.setItem("monPanier", JSON.stringify(panier));
        
        //actualisation de la page après suppression
        alert("Article supprimé du panier")
        window.location.reload();
      })
    }

    //On stock le prix total dans cette variable
  let total = [];
  //Création d'une boucle for afin de regrouper les montants
  for (let i = 0; i < panier.length; i++) {
    let totalPrix = panier[i].price;
    total.push(totalPrix);}

  //Addition des montants 
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const totalFinal = total.reduce(reducer, 0);

  // affichage Prix
  const affichage = `<div class="affichage">
  <p>Total de la commande : ${totalPrice/100}€</p>
                      </div>`
  // insertion HTML du montant total
  tableauSection.insertAdjacentHTML("beforeend", affichage);

  localStorage.setItem("totalFinal", totalFinal);
 }
  affichagePanier();

function changeQuantity(e, productId, color) {

  const qty = document.getElementById('qty').value;

  if(qty < 1) {
    alert('Wrong value');
    window.location.reload();
    return;
  }
  const storage = window.localStorage;
  const cart = JSON.parse(storage.getItem("monPanier"));
  const products = cart.map((x) =>
      x._id === productId && x.color === color ? { ...x, quantity: e.target.value } : x
  );

  storage.setItem("monPanier", JSON.stringify(products));
  window.location.reload();
}

// ----- FORMULAIRE

// ----- FORMULAIRE ENTIEREMENT VALIDE
const prenomForm = document.getElementById('formPrenom');
const nomForm = document.getElementById('formNom');
const adresseForm = document.getElementById('formAdresse');
const emailForm = document.getElementById('formMail');
const villeForm = document.getElementById('formVille');
const erreur = document.getElementById('erreur');

const btn = document.querySelector('.btn');

btn.addEventListener("click", (event) => {
  event.preventDefault();

  /* validation de l'input email par l'utilisation d'une expression régulière */
  const email = emailForm.value;

  function validateFirstName(value) {
    if (value.match(/^([^0-9]*)$/)) {
      return true;
    }

    return false;
  }

  function validateLastName(value) {
    if (value.match(/^([^0-9]*)$/)) {
      return true;
    }

    return false;
  }

  function validateAddress(value) {
    if (value) {
      return true;
    }
    return false;
  }

  function validateCity(value) {
    if (value.match(/^([^0-9]*)$/)) {
      return true;
    }

    return false;
  }

  function validateEmail(value) {
    if (value.match(/\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi)) {
      return true;
    }

    return false;
  }



  if (
    !validateFirstName(prenomForm.value) ||
    !validateLastName(nomForm.value) ||
    !validateAddress(adresseForm.value) ||
    !validateCity(villeForm.value) ||
    !validateEmail(email)

  ) {
    erreur.innerHTML = "Les champs ne sont pas correctement remplis";
  } else {
    let productsOnorico = [];
    
      //Création du tableau des articles
    panier.forEach(articlePanier =>
      {productsOnorico.push(articlePanier._id)}
    );

    let contactForm = {
      firstName : prenomForm.value,
      lastName : nomForm.value,
      address : adresseForm.value,
      city : villeForm.value,
      email : emailForm.value
      
    }
 
    localStorage.setItem("contactForm", JSON.stringify(contactForm));
    //Création de l'objet à envoyer, regroupant le formulaire et les articles. Sera utile pour la page confirmation.
    let commandeUser = {
      contact: contactForm,
      products: productsOnorico
    };
  

    // ----- POST DE LA COMMANDE AU "BACKEND" DES DONNÉES RÉCUPÉRÉES DEPUIS LE "LOCALSTORAGE" 
        const optionsFetch = {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(commandeUser),
      };
  
    
      // ----- TRAITEMENT RÉPONSE OK POUR SE DIRIGER VERS LA PAGE CONFIRMATION 
      fetch("http://localhost:3000/api/teddies/order", optionsFetch)
      .then((response) => {return response.json();})
      .then((r) => {
        localStorage.setItem("orderId", r.orderId);
        window.location = "./confirmation.html";
      })
      .catch((error) => {
        alert("Veuillez nous excuser pour cette erreur: " + error)
      })
    }

  })



