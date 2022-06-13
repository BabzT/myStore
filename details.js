const id = new URLSearchParams(window.location.search).get("id");
const myProducts = document.querySelector(".details");

//Get products
async function getProduct() {
    const result = await fetch("https://fakestoreapi.com/products/" + id);
    if (!result.ok){
        window.location.replace("/");
    }

    let product = await result.json();

     const results = `
        <article class="product">
        <div class="img-container2">
            <img class="product-img" src=${product.image} alt="">
        </div>
        <h2>${product.category}</h2>
        <h3>${product.title}</h3>
        <h4>$${product.price}</h4>
        <button class="bag-btn" data-id="${product.id}">
            <i class="fas fa-shopping-cart"></i>
            add to cart
        </button>
        <h5>Desciption: ${product.description}</h5>
        
    </article>
        `;
  
    myProducts.innerHTML = results;
    localStorage.setItem("products", JSON.stringify(product))
}

document.addEventListener("DOMContentLoaded", () => {
    getProduct()
});