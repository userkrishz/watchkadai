let cart = JSON.parse(localStorage.getItem("cart")) || [];


function getPrice(price) {
    return Number(
        String(price).replace(/[^\d]/g, "")
    );
}


function displayCheckout() {

    const checkoutItems =
        document.getElementById("checkoutItems");

    checkoutItems.innerHTML = "";


    let total = 0;


    if (cart.length === 0) {

        checkoutItems.innerHTML = `
            <p>Your cart is empty 🛒</p>
        `;

        document.getElementById("checkoutTotal").innerText =
            "₹0";

        return;
    }


    cart.forEach(product => {

        const price = getPrice(product.price);

        const quantity =
            Number(product.quantity) || 1;

        const productTotal =
            price * quantity;

        total += productTotal;


        checkoutItems.innerHTML += `

            <div class="checkout-item">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                >

                <div class="checkout-item-details">

                    <h3>${product.name}</h3>

                    <p>
                        ₹${price.toLocaleString("en-IN")}
                        × ${quantity}
                    </p>

                </div>

                <strong>
                    ₹${productTotal.toLocaleString("en-IN")}
                </strong>

            </div>

        `;

    });


    document.getElementById("checkoutTotal").innerText =
        "₹" + total.toLocaleString("en-IN");

}


function placeOrder() {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;
    }

    alert("🎉 Your order has been placed successfully!");

    localStorage.removeItem("cart");

    cart = [];

    window.location.href = "products.html";

}


displayCheckout();