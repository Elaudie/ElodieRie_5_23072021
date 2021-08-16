fetch('http://localhost:3000/api/teddies')
  .then(response => response.json())
  .then(data => {
    const articlesContainer = document.getElementById('articles');
    for (let articles of data) {
      articlesContainer.innerHTML += 
      `<a href="produit.html?id=${articles._id}" class="productCard">
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
      <br> ${articles.description}<br></div></div></a>`;
    }
  });