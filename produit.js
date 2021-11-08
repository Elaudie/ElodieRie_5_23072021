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
        
        <select id="colors">
        ${data.colors.map(
           (color) => `<option value="${color}">${color}</option>`
       )}
</select><div>
                    <input type="number" name="quantity" id="qty" value="1" />
                    <button id="add-cart" class="border rounded bg-red-500 text-white py-2 px-4">Add to cart</button>
                </div></div></div>`

       document.getElementById("add-cart").addEventListener("click", () => {
           addToCart(data);
       });

    })
}



document.addEventListener("DOMContentLoaded", () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');
     console.log(id);
    getContent(id)
});

async function addToCart(item) {
    const storage = window.localStorage;

    const quantity = parseInt(document.getElementById("qty").value);
    const color = document.getElementById("colors").value;

    if (!color) {
        alert("Veuillez renseigner une couleur");
        return;
    }

    if (quantity <= 0) {
        alert("Veuillez renseigner une quantité supérieure à zéro");
        return;
    }

    item["quantity"] = quantity;
    item["color"] = color;

    let cart = [];

    const storageCart = JSON.parse(storage.getItem("monPanier"));

    if (storageCart && storageCart.length) {
        cart = JSON.parse(storage.getItem("monPanier"));

        const hasColor = cart.filter(
            (x) => x._id === item._id && x.color === color
        );
        console.log(cart);
        if (hasColor && hasColor.length) {
            hasColor[0].quantity += quantity;
        } else {
            cart.push(item);
        }

        storage.setItem("monPanier", JSON.stringify(cart));
    } else {
        cart.push(item);
        storage.setItem("monPanier", JSON.stringify(cart));
    }

    alert("Ajouté au panier");
}


