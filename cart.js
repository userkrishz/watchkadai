let cart = JSON.parse(localStorage.getItem("cart")) || [];


function getPrice(price) {
    return Number(
        String(price).replace(/[^\d]/g, "")
    );
}


function displayCart() {

    const cartItems =
        document.getElementById("cartItems");

    cartItems.innerHTML = "";


    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div class="empty-cart">
                <h2>Your cart is empty 🛒</h2>
                <p>Add some watches to start shopping!</p>
            </div>

        `;

        document.getElementById("subtotal").innerText = "₹0";

        document.getElementById("grandTotal").innerText = "₹0";

        return;
    }


    cart.forEach((product, index) => {

        const price = getPrice(product.price);

        const quantity = Number(product.quantity) || 1;

        const productTotal = price * quantity;


        cartItems.innerHTML += `

            <div class="cart-product">

                <img 
                    src="${product.image}" 
                    alt="${product.name}"
                >

                <div class="cart-details">

                    <h2>${product.name}</h2>

                    <p>
                        Price: ₹${price.toLocaleString("en-IN")}
                    </p>

                    <div class="quantity">

                        <button onclick="decreaseQuantity(${index})">
                            −
                        </button>

                        <span>${quantity}</span>

                        <button onclick="increaseQuantity(${index})">
                            +
                        </button>

                    </div>

                </div>


                <div class="product-total">

                    <p>Product Total</p>

                    <h3>
                        ₹${productTotal.toLocaleString("en-IN")}
                    </h3>

                </div>


                <button 
                    class="remove-btn"
                    onclick="removeProduct(${index})"
                >
                    Remove
                </button>

            </div>

        `;

    });


    updateTotal();

}


function increaseQuantity(index) {

    cart[index].quantity =
        Number(cart[index].quantity) + 1;

    saveCart();

}


function decreaseQuantity(index) {

    if (Number(cart[index].quantity) > 1) {

        cart[index].quantity =
            Number(cart[index].quantity) - 1;

    }

    saveCart();

}


function removeProduct(index) {

    cart.splice(index, 1);

    saveCart();

}


function saveCart() {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    displayCart();

}


function updateTotal() {

    let total = 0;


    cart.forEach(product => {

        const price = getPrice(product.price);

        const quantity =
            Number(product.quantity) || 1;

        total += price * quantity;

    });


    document.getElementById("subtotal").innerText =
        "₹" + total.toLocaleString("en-IN");


    document.getElementById("grandTotal").innerText =
        "₹" + total.toLocaleString("en-IN");

}


function placeOrder() {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;
    }


    alert("🎉 Order placed successfully!");


    localStorage.removeItem("cart");


    cart = [];


    displayCart();

}


displayCart();
function goToCheckout() {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;

    }

    window.location.href = "checkout.html";

}