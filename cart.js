let cart = JSON.parse(localStorage.getItem('watchkadai_cart')) || [];

function saveCart() {
  localStorage.setItem('watchkadai_cart', JSON.stringify(cart));
  updateCartUI();
}

function addToCart(id, name, price, img) {
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ id, name, price, img, quantity: 1 });
  }
  saveCart();
  openCartDrawer();
}

function buyNow(id, name, price, img) {
  addToCart(id, name, price, img);
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
}

function updateCartUI() {
  const badge = document.getElementById('cart-count');
  const cartList = document.getElementById('cart-items-list');
  const cartTotal = document.getElementById('cart-total-price');

  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (badge) badge.textContent = totalCount;
  if (cartTotal) cartTotal.textContent = `₹${totalPrice.toLocaleString('en-IN')}`;

  if (cartList) {
    if (cart.length === 0) {
      cartList.innerHTML = `<p class="empty-msg">Your collection is empty.</p>`;
    } else {
      cartList.innerHTML = cart.map(item => `
        <div class="cart-item">
          <img src="${item.img}" alt="${item.name}">
          <div class="cart-item-details">
            <h4>${item.name}</h4>
            <p>₹${item.price.toLocaleString('en-IN')} × ${item.quantity}</p>
          </div>
          <button class="remove-btn" onclick="removeFromCart('${item.id}')">✕</button>
        </div>
      `).join('');
    }
  }
}

function openCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  if (drawer) drawer.classList.add('open');
}

function closeCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  if (drawer) drawer.classList.remove('open');
}

document.addEventListener('DOMContentLoaded', () => {
  updateCartUI();
});