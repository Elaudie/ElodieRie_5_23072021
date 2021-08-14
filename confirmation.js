let receivedOrderId = localStorage.getItem('orderId');

displayOrderId();
function displayOrderId() {
    document.getElementById('orderid').innerText = receivedOrderId;
}