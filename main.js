// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  themeToggle.textContent = newTheme === 'light' ? '🌙' : '☀️';
});

// Initialize theme
if (localStorage.getItem('theme')) {
  document.documentElement.setAttribute('data-theme', localStorage.getItem('theme'));
  themeToggle.textContent = localStorage.getItem('theme') === 'light' ? '🌙' : '☀️';
}

// Shopping Cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update cart count
function updateCartCount() {
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  document.querySelectorAll('.cart-count').forEach(el => {
    el.textContent = count;
  });
}

// Add to cart
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', function() {
    const id = this.dataset.id;
    const name = this.dataset.name;
    const price = parseFloat(this.dataset.price);
    
    // Check if item exists in cart
    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.push({
        id,
        name,
        price,
        quantity: 1
      });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    // Button feedback
    const originalText = this.innerHTML;
    this.innerHTML = '<i class="fas fa-check"></i> Added!';
    setTimeout(() => {
      this.innerHTML = originalText;
    }, 1000);
  });
});

// Render cart items
function renderCartItems() {
  const cartItemsContainer = document.getElementById('cart-items');
  if (!cartItemsContainer) return;
  
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p>Your cart is empty. <a href="index.html">Start shopping!</a></p>';
    document.getElementById('subtotal').textContent = 'R0.00';
    document.getElementById('total').textContent = 'R99.00';
    return;
  }
  
  cartItemsContainer.innerHTML = cart.map(item => `
    <div class="cart-item" data-id="${item.id}">
      <img src="https://images.unsplash.com/photo-${item.id === '1' ? '1591047139829-d91aecb6caea' : item.id === '2' ? '1596464716127-f2a82984de30' : '1598300042247-d088f8ab3a91'}" alt="${item.name}">
      <div class="cart-item-details">
        <h3>${item.name}</h3>
        <div class="cart-item-price">R${item.price.toFixed(2)}</div>
        <div class="quantity-controls">
          <button class="quantity-btn minus">-</button>
          <span class="quantity">${item.quantity}</span>
          <button class="quantity-btn plus">+</button>
        </div>
        <button class="remove-item">Remove</button>
      </div>
    </div>
  `).join('');
  
  // Update totals
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const total = subtotal + 99; // R99 shipping
  
  document.getElementById('subtotal').textContent = `R${subtotal.toFixed(2)}`;
  document.getElementById('total').textContent = `R${total.toFixed(2)}`;
  
  // Add event listeners
  document.querySelectorAll('.quantity-btn.minus').forEach(btn => {
    btn.addEventListener('click', function() {
      const id = this.closest('.cart-item').dataset.id;
      const item = cart.find(item => item.id === id);
      
      if (item.quantity > 1) {
        item.quantity--;
      } else {
        cart = cart.filter(item => item.id !== id);
      }
      
      localStorage.setItem('cart', JSON.stringify(cart));
      renderCartItems();
      updateCartCount();
    });
  });
  
  document.querySelectorAll('.quantity-btn.plus').forEach(btn => {
    btn.addEventListener('click', function() {
      const id = this.closest('.cart-item').dataset.id;
      const item = cart.find(item => item.id === id);
      item.quantity++;
      localStorage.setItem('cart', JSON.stringify(cart));
      renderCartItems();
      updateCartCount();
    });
  });
  
  document.querySelectorAll('.remove-item').forEach(btn => {
    btn.addEventListener('click', function() {
      const id = this.closest('.cart-item').dataset.id;
      cart = cart.filter(item => item.id !== id);
      localStorage.setItem('cart', JSON.stringify(cart));
      renderCartItems();
      updateCartCount();
    });
  });
}

// Checkout button
const checkoutBtn = document.getElementById('checkout-btn');
if (checkoutBtn) {
  checkoutBtn.addEventListener('click', () => {
    alert('Thank you for your purchase! This is a demo store.');
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCartItems();
    updateCartCount();
  });
}

// Initialize
updateCartCount();
renderCartItems();