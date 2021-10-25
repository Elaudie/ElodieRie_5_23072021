//Récupération de l'id de la commande et du montant total dans localStorage
let receivedOrderId = localStorage.getItem('orderId');
let totalPriceInCart = localStorage.getItem('totalFinal');

/* Afficher l'orderId */
function displayOrderId() {
    document.getElementById('orderid').innerText = receivedOrderId;
}
displayOrderId();

/* Afficher le prix total */
function displayTotalPrice() {
  document.getElementById('totalprice').innerText = (totalPriceInCart /100) +'€';
}
displayTotalPrice();

//Suppression de toutes les clés du localStorage
localStorage.clear();