const products = [
 {
 id: 1,
 name: "Minimal Leather Backpack",
 category: "Fashion",
 price: 79,
 oldPrice: 99,
 rating: 4.8,
 image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=80",
 description: "A stylish everyday backpack with roomy compartments for work, travel, and daily essentials.",
 sale: true
 },
 {
 id: 2,
 name: "Wireless Noise Cancelling Headphones",
 category: "Tech",
 price: 129,
 oldPrice: 159,
 rating: 4.9,
 image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=80",
 description: "Comfortable wireless headphones with rich sound and all-day battery life.",
 sale: true
 },
 {
 id: 3,
 name: "Modern Ceramic Table Lamp",
 category: "Home",
 price: 48,
 oldPrice: 60,
 rating: 4.7,
 image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=700&q=80",
 description: "Bring warm, modern lighting to your desk, bedroom, or living room.",
 sale: false
 },
 {
 id: 4,
 name: "Daily Skincare Essentials Set",
 category: "Beauty",
 price: 42,
 oldPrice: 55,
 rating: 4.6,
 image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=700&q=80",
 description: "A simple skincare collection designed for a fresh and hydrated daily routine.",
 sale: true
 },
 {
 id: 5,
 name: "Premium Smart Watch",
 category: "Tech",
 price: 189,
 oldPrice: 220,
 rating: 4.8,
 image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=700&q=80",
 description: "Track activity, receive notifications, and stay connected with a sleek smart watch.",
 sale: false
 },
 {
 id: 6,
 name: "Classic White Sneakers",
 category: "Fashion",
 price: 68,
 oldPrice: 85,
 rating: 4.7,
 image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80",
 description: "Clean, versatile sneakers designed to pair easily with casual everyday outfits.",
 sale: true
 },
 {
 id: 7,
 name: "Soft Cotton Throw Blanket",
 category: "Home",
 price: 36,
 oldPrice: 45,
 rating: 4.6,
 image: "https://images.unsplash.com/photo-1583845112203-454c6aab3d68?auto=format&fit=crop&w=700&q=80",
 description: "A cozy cotton throw blanket for comfortable evenings at home.",
 sale: false
 },
 {
 id: 8,
 name: "Stainless Steel Water Bottle",
 category: "Fitness",
 price: 24,
 oldPrice: 30,
 rating: 4.8,
 image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=700&q=80",
 description: "A reusable insulated water bottle that keeps drinks cold or warm for hours.",
 sale: false
 },
 {
 id: 9,
 name: "Adjustable Dumbbell Set",
 category: "Fitness",
 price: 145,
 oldPrice: 170,
 rating: 4.9,
 image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=700&q=80",
 description: "Space-saving adjustable dumbbells for strength training at home.",
 sale: true
 },
 {
 id: 10,
 name: "Gold Minimalist Watch",
 category: "Accessories",
 price: 74,
 oldPrice: 90,
 rating: 4.5,
 image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=700&q=80",
 description: "An elegant minimalist watch that adds a polished touch to your outfit.",
 sale: false
 },
 {
 id: 11,
 name: "Portable Bluetooth Speaker",
 category: "Tech",
 price: 59,
 oldPrice: 75,
 rating: 4.7,
 image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=700&q=80",
 description: "Take your favorite music anywhere with this compact wireless speaker.",
 sale: true
 },
 {
 id: 12,
 name: "Canvas Everyday Tote Bag",
 category: "Accessories",
 price: 29,
 oldPrice: 35,
 rating: 4.6,
 image: "https://images.unsplash.com/photo-1559563458-527698bf5295?auto=format&fit=crop&w=700&q=80",
 description: "A durable canvas tote bag for shopping, work, school, and everyday use.",
 sale: false
 }
];

let cart = JSON.parse(localStorage.getItem("shopnest-cart") || "[]");
let activeCategory = "All";
let activePrice = "All";
let searchText = "";
let currentSort = "default";

const productGrid = document.querySelector("#productGrid");
const productResult = document.querySelector("#productResult");
const activeFilterText = document.querySelector("#activeFilterText");
const cartCount = document.querySelector("#cartCount");
const cartItems = document.querySelector("#cartItems");
const cartTotal = document.querySelector("#cartTotal");
const cartPanel = document.querySelector("#cartPanel");
const overlay = document.querySelector("#overlay");
const productModal = document.querySelector("#productModal");
const modalBody = document.querySelector("#modalBody");

function money(value) {
 return `$${value.toFixed(2)}`;
}

function getFilteredProducts() {
 let filtered = [...products];

 if (activeCategory !== "All") {
 filtered = filtered.filter(product => product.category === activeCategory);
 }

 if (activePrice !== "All") {
 filtered = filtered.filter(product => product.price < Number(activePrice));
 }

 if (searchText) {
 filtered = filtered.filter(product => {
 const combinedText = `${product.name} ${product.category} ${product.description}`.toLowerCase();
 return combinedText.includes(searchText.toLowerCase());
 });
 }

 if (currentSort === "low-high") {
 filtered.sort((a, b) => a.price - b.price);
 }

 if (currentSort === "high-low") {
 filtered.sort((a, b) => b.price - a.price);
 }

 if (currentSort === "name") {
 filtered.sort((a, b) => a.name.localeCompare(b.name));
 }

 return filtered;
}

function renderProducts() {
 const filteredProducts = getFilteredProducts();

 productResult.textContent = `${filteredProducts.length} products found`;

 if (activeCategory === "All" && !searchText) {
 activeFilterText.textContent = "Showing all products";
 } else if (searchText) {
 activeFilterText.textContent = `Search results for "${searchText}"`;
 } else {
 activeFilterText.textContent = `Showing ${activeCategory} products`;
 }

 if (filteredProducts.length === 0) {
 productGrid.innerHTML = `
 <div class="no-products">
 <strong>No products found.</strong>
 <p>Try another category or search term.</p>
 </div>
 `;
 return;
 }

 productGrid.innerHTML = filteredProducts
.map(product => {
 return `
 <article class="product-card">
 <div class="product-image-box">
 <img src="${product.image}" alt="${product.name}" />
 ${product.sale ? `<span class="sale-label">SALE</span>` : ""}
 <button class="quick-view" data-view-id="${product.id}">
 Quick View
 </button>
 </div>

 <div class="product-info">
 <span class="product-category">${product.category}</span>

 <h3>${product.name}</h3>

 <div class="rating">
 ★★★★★ <span>${product.rating}</span>
 </div>

 <div class="price-row">
 <span class="price">${money(product.price)}</span>
 <span class="old-price">${money(product.oldPrice)}</span>
 </div>

 <button class="add-button" data-id="${product.id}">
 Add to Cart
 </button>
 </div>
 </article>
 `;
 })
.join("");

 document.querySelectorAll(".add-button").forEach(button => {
 button.addEventListener("click", () => {
 addToCart(Number(button.dataset.id));
 });
 });

 document.querySelectorAll(".quick-view").forEach(button => {
 button.addEventListener("click", () => {
 openProductModal(Number(button.dataset.viewId));
 });
 });
}

function addToCart(productId) {
 const cartItem = cart.find(item => item.id === productId);

 if (cartItem) {
 cartItem.quantity += 1;
 } else {
 cart.push({
 id: productId,
 quantity: 1
 });
 }

 saveCart();
 openCart();
}

function saveCart() {
 localStorage.setItem("shopnest-cart", JSON.stringify(cart));
 renderCart();
}

function renderCart() {
 const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
 cartCount.textContent = totalItems;

 if (cart.length === 0) {
 cartItems.innerHTML = `
 <p class="empty-cart">
 Your cart is empty.<br />
 Start shopping to add products here.
 </p>
 `;
 cartTotal.textContent = "$0.00";
 return;
 }

 let total = 0;

 cartItems.innerHTML = cart
.map(item => {
 const product = products.find(product => product.id === item.id);

 if (!product) return "";

 const subtotal = product.price * item.quantity;
 total += subtotal;

 return `
 <div class="cart-row">
 <img src="${product.image}" alt="${product.name}" />

 <div>
 <h4>${product.name}</h4>
 <p>${money(product.price)} × ${item.quantity}</p>
 </div>

 <button class="remove-item" data-remove-id="${product.id}">
 Remove
 </button>
 </div>
 `;
 })
.join("");

 cartTotal.textContent = money(total);

 document.querySelectorAll(".remove-item").forEach(button => {
 button.addEventListener("click", () => {
 const productId = Number(button.dataset.removeId);
 cart = cart.filter(item => item.id !== productId);
 saveCart();
 });
 });
}

function openCart() {
 cartPanel.classList.add("open");
 overlay.classList.add("open");
 document.body.classList.add("no-scroll");
}

function closeCart() {
 cartPanel.classList.remove("open");
 overlay.classList.remove("open");
 document.body.classList.remove("no-scroll");
}

function openProductModal(productId) {
 const product = products.find(product => product.id === productId);

 modalBody.innerHTML = `
 <div class="modal-product">
 <img src="${product.image}" alt="${product.name}" />

 <div>
 <span class="product-category">${product.category}</span>
 <h2>${product.name}</h2>

 <div class="rating">
 ★★★★★ <span>${product.rating} customer rating</span>
 </div>

 <span class="modal-price">
 ${money(product.price)}
 <span class="old-price">${money(product.oldPrice)}</span>
 </span>

 <p>${product.description}</p>

 <button class="button primary modal-add-button" data-id="${product.id}">
 Add to Cart
 </button>
 </div>
 </div>
 `;

 productModal.classList.add("open");
 document.body.classList.add("no-scroll");

 document.querySelector(".modal-add-button").addEventListener("click", () => {
 addToCart(product.id);
 closeProductModal();
 });
}

function closeProductModal() {
 productModal.classList.remove("open");

 if (!cartPanel.classList.contains("open")) {
 document.body.classList.remove("no-scroll");
 }
}

document.querySelector("#cartButton").addEventListener("click", openCart);
document.querySelector("#closeCart").addEventListener("click", closeCart);
overlay.addEventListener("click", closeCart);

document.querySelector("#closeModal").addEventListener("click", closeProductModal);

productModal.addEventListener("click", event => {
 if (event.target === productModal) {
 closeProductModal();
 }
});

document.querySelectorAll(".filter").forEach(button => {
 button.addEventListener("click", () => {
 activeCategory = button.dataset.category;

 document.querySelectorAll(".filter").forEach(item => {
 item.classList.remove("active");
 });

 button.classList.add("active");
 renderProducts();

 document.querySelector("#shop").scrollIntoView({
 behavior: "smooth"
 });
 });
});

document.querySelectorAll(".category-card").forEach(button => {
 button.addEventListener("click", () => {
 activeCategory = button.dataset.category;

 document.querySelectorAll(".filter").forEach(filter => {
 filter.classList.toggle(
 "active",
 filter.dataset.category === activeCategory
 );
 });

 renderProducts();

 document.querySelector("#shop").scrollIntoView({
 behavior: "smooth"
 });
 });
});

document.querySelectorAll(".price-filter").forEach(button => {
 button.addEventListener("click", () => {
 activePrice = button.dataset.price;

 document.querySelectorAll(".price-filter").forEach(item => {
 item.classList.remove("active-price");
 });

 button.classList.add("active-price");
 renderProducts();
 });
});

document.querySelector("#sortProducts").addEventListener("change", event => {
 currentSort = event.target.value;
 renderProducts();
});

document.querySelector("#searchForm").addEventListener("submit", event => {
 event.preventDefault();

 searchText = document.querySelector("#searchInput").value.trim();
 renderProducts();

 document.querySelector("#shop").scrollIntoView({
 behavior: "smooth"
 });
});

document.querySelector("#checkoutButton").addEventListener("click", () => {
 if (cart.length === 0) {
 alert("Your cart is empty. Please add a product before checkout.");
 return;
 }

 alert(
 "Demo checkout only. To accept real payments, connect Stripe or PayPal with a secure backend."
 );
});

document.querySelector("#contactForm").addEventListener("submit", event => {
 event.preventDefault();

 document.querySelector("#formMessage").textContent =
 "Thank you! Your message has been received.";

 event.target.reset();
});

document.querySelector("#newsletterForm").addEventListener("submit", event => {
 event.preventDefault();

 document.querySelector("#newsletterMessage").textContent =
 "Success! Your 15% discount code is: SHOP15";

 event.target.reset();
});

document.querySelector("#menuToggle").addEventListener("click", () => {
 document.querySelector(".nav-menu").classList.toggle("show");
});

document.querySelectorAll(".nav-menu a").forEach(link => {
 link.addEventListener("click", () => {
 document.querySelector(".nav-menu").classList.remove("show");
 });
});

renderProducts();
renderCart();
