//On stock le panier dans cette variable
let panier = JSON.parse(localStorage.getItem("monPanier"));

/*Nous allons présenter le panier à l'utilisateur sous forme de tableau que nous plaçons dans la div "Sectionpanier"*/
let tableauSection = document.getElementById("basket-resume");

// ----- AFFICHAGE DU PANIER UTILISATEUR 
function affichagePanier() {
  if (panier.length > 0) {
    document.getElementById("panierVide").remove();

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
    <button type="button" id="supprimer">Supprimer</button>
    </tr>`; 
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
  <p>Total de la commande : ${totalFinal/100}€</p>
                      </div>`
  // insertion HTML du montant total
  tableauSection.insertAdjacentHTML("beforeend", affichage);

  localStorage.setItem("totalFinal", totalFinal);
 }
  affichagePanier();

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
  
  if (
    !prenomForm.value ||
    !nomForm.value ||
    !adresseForm.value ||
    !emailForm.value ||
    !villeForm.value //(mettre ou après avoir mis REGEX)

    //Ajouter REGEX ici
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



