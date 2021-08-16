 function getContent(id) {fetch('http://localhost:3000/api/teddies/' + id)
   .then(response => response.json())
   .then(data => {
     const articlesContainer = document.getElementById('product');
     
// const articles = data; (remplacer articles par data dans la suite du code)
       articlesContainer.innerHTML += 
       `<a href="${articles._id}" class="productCard">
       <img class="productImage" src="${articles.imageUrl}"> 
       <div class="productStory">
       <div class="namePrice">
         <h1 class="productName">
           ${articles.name}
         </h1> 
         <div class="productPrice">
           ${articles.price * 0.01}€
         </div>
        </div>
        <div class="productDescription">
       <br> ${articles.description}<br></div></div></a>;
       <button id="button" onClick=${clickHandler(data)}></button>`;
  })
};

document.addEventListener("DOMcontentLoaded", () => {
    const queryString = window.location.search;
     const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');
     console.log(id);
    getContent(id)
});

function clickHandler(data) {
    //Ajouter data au local localStorage
const array = localStorage.getItem('monPanier')

array.push(data)

localStorage.setItem("monPanier", JSON.stringify(init));
};
