fetch('http://localhost:3000/api/teddies')
  .then(response => response.json())
  .then(data => {
    const articlesContainer = document.getElementById('articles');
    for (let articles of data) {
      articlesContainer.innerHTML += `${articles.imageURL}<br> ${articles.name} ${articles.price}<br> ${articles.description}<br>`;
    }
  });