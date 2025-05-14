// script.js

const cart = [];

function addToCart(id, name, price) {
    const item = { id, name, price };
    cart.push(item);
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    const totalDisplay = document.getElementById('total');

    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - R${item.price}`;
        cartItems.appendChild(li);
        total += item.price;
    });

    totalDisplay.textContent = total;
}

function submitForm(event) {
    event.preventDefault();
    alert('Thank you for contacting us!');
}
