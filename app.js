//variables

const cartBtn = document.querySelector(".cart-btn");
const closeCartBtn = document.querySelector(".close-cart");
const clearCartBtn = document.querySelector(".clear-cart");
const cartDOM = document.querySelector(".cart");
const cartOverlay = document.querySelector(".cart-overlay");
const cartItems = document.querySelector(".cart-item");
const cartContent = document.querySelector(".cart-content");
const productsDOM = document.querySelector(".products-center");

let cart = []
//Get products
async function getProducts (term) {
    let url = "https://fakestoreapi.com/products";
    if (term) {
        url += `&q=${term}`
    }

    let result = await fetch(url);
    let products = await result.json();

    let results = "";
    products.forEach(product => {
        results += `
        <a class = "readmore" href="details.html?id=${product.id}">
        <article class="product">
        <div class="img-container">
            <img class="product-img" src=${product.image} alt="">
        </div>
        <h3>${product.title}</h3>
        <h4>$${product.price}</h4>
    </article>
    </a>
        `;
    });
    productsDOM.innerHTML = results;
    // localStorage.setItem("products", JSON.stringify(products))
}






document.addEventListener("DOMContentLoaded", () => {
    getProducts();
});