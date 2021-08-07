/*Afficher les produits*/
(async function() {
    const articles = await getArticles()
    for (article of articles) {
        create(product)
    }
})()

/* Appeler les produits de l'API du serveur */
function getArticles () {
    const URL = "http://localhost:3000/api/teddies"
    return fetch(URL)
        .then(function(response) {
            return response.json()
        })
        .catch(function(error) {
            showErrorMessage()
        })
}

/*Création de tuiles produits*/
function create(product) {
    const template = document.getElementById("templateArticles")
    const cloneArticle = document.importNode(template.contentEditable, true)

    cloneArticle.getElementById("articleImage").src = articles.imageURL
    cloneArticle.getElementById("articleName").textContent = articles.name
    cloneArticle.getElementById("articlePrice").textContent = (article.price/100).toLocaleString("fr-FR", {style:"curency", currency:"EUR"})
    cloneArticle.getElementById("articleLink").href = "produits.html?id=" + product._id

    document.getElementsById("article").appenChild(cloneElement)
}


/*Nombre d'articles dans le panier*/

