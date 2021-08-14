// fetch('http://localhost:3000/api/teddies/' + id)
//   .then(response => response.json())
//   .then(data => {
//     const articlesContainer = document.getElementById('product');
//     for (let articles of data) {
//       articlesContainer.innerHTML += 
//       `<a href="${articles._id}" class="productCard">
//       <img class="productImage" src="${articles.imageUrl}"> 
//       <div class="productStory">
//       <div class="namePrice">
//         <h1 class="productName">
//           ${articles.name}
//         </h1> 
//         <div class="productPrice">
//           ${articles.price * 0.01}€
//         </div>
//        </div>
//        <div class="productDescription">
//       <br> ${articles.description}<br></div></div></a>`;
//     }
//   });

// //récupération de l'ID de l'ours de la page
// const queryString = window.location.search;
// const urlParams = new URLSearchParams(queryString);
// const id = urlParams.get('id');
// console.log(id);

// const getBear = async function() {
//     // récupération des données de l'ours sélectionné par son id
//    try {
//        let response = await fetch('http://localhost:3000/api/teddies/' + id);
//        if (response.ok) {
//            let bear = await response.json();
//            console.log(bear);

