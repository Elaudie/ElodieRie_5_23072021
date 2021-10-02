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

localStorage.clear();