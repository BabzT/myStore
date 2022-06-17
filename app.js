//variables
const details = document.querySelector(".details");
const menuBtn = document.querySelector(".nav-icon1");
const homeBtn = document.querySelector(".nav-icon2");
const title = document.querySelector(".section-title");
const cartBtn = document.querySelector(".cart-btn");
const closeCartBtn = document.querySelector(".close-cart");
const clearCartBtn = document.querySelector(".clear-cart");
const cartDOM = document.querySelector(".cart");
const cartOverlay = document.querySelector(".cart-overlay");
const cartItems = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total");
const cartContent = document.querySelector(".cart-content");
const productsDOM = document.querySelector(".products-center");

// Go back home
homeBtn.addEventListener("click", () => {
    window.location.reload();
})

//Get products
async function renderProducts () {
    try {
        let result = await fetch("https://fakestoreapi.com/products");
        let products = await result.json();

        let results = "";
        products.forEach(product => {
        results += `
        <article class="product reveal">
        <div onclick = "displayDetails(${product.id})" class="img-container" loading = "lazy">
            <img class="product-img" src=${product.image} alt="">
        </div>
        <h3>${product.title}</h3>
        <h4>$${product.price}</h4>
        <button onClick="addToCart(${product.id})" class="bag-btn">
            <i class="fas fa-shopping-cart"></i>
            Add to cart
        </button>
        <span class="inCart"></span>
    </article>
        `;
    });
    productsDOM.innerHTML = results;
    localStorage.setItem("products", JSON.stringify(products));   
    } catch (error) {
       console.log(error) 
    }  
}
renderProducts()


// Cart Array
let cart = JSON.parse(localStorage.getItem("cart")) || [];
updateCart();

//ADD TO CART
function addToCart(id){
    // check if products exist in cart
    if(cart.find((item) => item.id === id)){
        
    }
    else{
        const products = JSON.parse(localStorage.getItem("products"));
        const cartItem = products.find((product) => product.id === id);
        cart.push({
            ...cartItem,
            numberOfUnits: 1
        });
    }
    updateCart();
}

//Update cart
function updateCart(){
    renderCartItems();
    renderSubTotal();

    //save cart to local storage
    localStorage.setItem("cart", JSON.stringify(cart));
}

// calculate and renderTotal
function renderSubTotal(){
    let totalPrice = 0;
    let totalItem = 0;

    cart.forEach((item) => {
        totalPrice += item.price * item.numberOfUnits;
        totalItem += item.numberOfUnits;
    });
    cartTotal.innerHTML = `${totalPrice.toFixed(2)}`;
    cartItems.innerHTML = totalItem;
}

//render cart items
function renderCartItems(){
    cartContent.innerHTML = ""; //clear cart items
    cart.forEach((item) => {
        cartContent.innerHTML += `
            <div class="cart-item">
                    <img src=${item.image} alt="">
                    <div>
                        <h4>${item.title}</h4>
                        <h5>$${item.price}</h5>
                        <span class="remove-item" onclick = "removeItem(${item.id})">remove</span>
                    </div>
                    <div>
                        <i class="fas fa-chevron-up" onclick ="changeNumberOfUnits('plus',${item.id})"></i>
                        <p class="item-amount">${item.numberOfUnits}</p>
                        <i class="fas fa-chevron-down" onclick ="changeNumberOfUnits('minus',${item.id})"></i>
                    </div>
                </div>
        `
    })
}

//clearCart
    clearCartBtn.addEventListener("click", () => {
        cart = [];
        cartContent.innerHTML = "";
        localStorage.removeItem("cart")
        updateCart()
    })


//remove item from cart 
function removeItem(id){
    cart = cart.filter((item) => item.id !== id);

    updateCart()
}

//change number of units for an item

function changeNumberOfUnits(action, id){
   cart = cart.map((item) => {
       let numberOfUnits = item.numberOfUnits;
       if(item.id === id){
            if(action === "plus" && numberOfUnits < 10){
                numberOfUnits++;
            }
            else if(action === "minus" && numberOfUnits > 1){
                numberOfUnits--;
            }
       }

       return {
           ...item,
           numberOfUnits,
        };  
    });
    updateCart();
}

// Cart Btns
    cartBtn.addEventListener("click", ()=>{
        cartOverlay.classList.add("transparentBcg");
        cartDOM.classList.add("showCart");
    })


    closeCartBtn.addEventListener("click", ()=>{
        cartOverlay.classList.remove("transparentBcg");
        cartDOM.classList.remove("showCart");
    });

    function displayDetails(id){
        menuBtn.style.display = "none";
        title.style.display = "none"
        homeBtn.style.display = "block";
        productsDOM.innerHTML = "";
        document.querySelector(".products").style.display = "none"
        document.querySelector(".hero").style.display = "none"
        products = JSON.parse(localStorage.getItem("products"));
        product = products.find((product) => product.id === id);
        details.innerHTML = "";
            details.innerHTML = `
            <article class="product">
                <div class="img-container2">
                    <img class="product-img" src=${product.image} alt="">
                </div>
                <h3>${product.category}</h3>
                <h3>${product.title}</h3>
                <h4>$${product.price}</h4>
                <button onClick="addToCart(${product.id})" class="bag-btn">
                    <i class="fas fa-shopping-cart"></i>
                    Add to cart
                </button>
                <h3>Description:${product.description}</h3>
            </article>
         `;    
    };


    //ANIMATION
    window.addEventListener("scroll", reveal);

    function reveal(){
        let content = document.querySelectorAll(".reveal");
        for(let i = 0; i < content.length; i++){
            var windowheight = window.innerHeight;
            var revealTop = content[i].getBoundingClientRect().top;
            var revealPoint = 60;

            if(revealTop < windowheight - revealPoint){
                content[i].classList.add("active");
            }
            else{
                content[i].classList.remove("active");
            }
        }
    }