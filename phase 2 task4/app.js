// Sample Dunkin' Donuts menu data
const menuItems = [
    { id: 1, name: 'Glazed Donut', price: 1.50, image: 'https://via.placeholder.com/150?text=Glazed+Donut' },
    { id: 2, name: 'Chocolate Frosted Donut', price: 2.00, image: 'https://via.placeholder.com/150?text=Chocolate+Frosted' },
    { id: 3, name: 'Boston Kreme Donut', price: 2.50, image: 'https://via.placeholder.com/150?text=Boston+Kreme' },
    { id: 4, name: 'Iced Coffee', price: 3.00, image: 'https://via.placeholder.com/150?text=Iced+Coffee' },
    { id: 5, name: 'Cappuccino', price: 3.50, image: 'https://via.placeholder.com/150?text=Cappuccino' },
    { id: 6, name: 'Blueberry Muffin', price: 2.75, image: 'https://via.placeholder.com/150?text=Blueberry+Muffin' }
];

// Cart data
let cart = [];
let total = 0;

// Function to render menu items
function renderMenu(items = menuItems) {
    const menuContainer = document.getElementById('menu');
    menuContainer.innerHTML = items.map(item => `
        <div class="col-md-4">
            <div class="card">
                <img src="${item.image}" class="card-img-top" alt="${item.name}">
                <div class="card-body">
                    <h5 class="card-title">${item.name}</h5>
                    <p class="card-text">$${item.price.toFixed(2)}</p>
                    <button onclick="addToCart(${item.id})" class="btn btn-primary">Add to Cart</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Function to filter menu items based on search input
function filterMenu() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const filteredItems = menuItems.filter(item => item.name.toLowerCase().includes(searchTerm));
    renderMenu(filteredItems);
}

// Function to add item to cart
function addToCart(itemId) {
    const item = menuItems.find(menuItem => menuItem.id === itemId);
    cart.push(item);
    total += item.price;
    updateCart();
}

// Function to remove item from cart
function removeFromCart(itemId) {
    const itemIndex = cart.findIndex(item => item.id === itemId);
    if (itemIndex !== -1) {
        total -= cart[itemIndex].price;
        cart.splice(itemIndex, 1);
        updateCart();
    }
}

// Function to update cart UI
function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalContainer = document.getElementById('cart-total');

    cartItemsContainer.innerHTML = cart.map(item => `
        <li>
            ${item.name} - $${item.price.toFixed(2)}
            <button onclick="removeFromCart(${item.id})" class="btn-remove">Remove</button>
        </li>
    `).join('');

    cartTotalContainer.textContent = total.toFixed(2);
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    renderMenu();
});