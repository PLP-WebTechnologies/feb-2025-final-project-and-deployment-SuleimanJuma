document.addEventListener('DOMContentLoaded', function () {
    // Load cart items
    loadCartItems();

    // Initialize quantity selectors
    initCartQuantitySelectors();

    // Initialize remove buttons
    initRemoveButtons();

    // Initialize continue shopping button
    initContinueShoppingButton();

    // Initialize checkout button
    initCheckoutButton();

    // Initialize totals
    updateCartSummary();

    // Display shipping information
    displayShippingInfo();
});

// Load Cart Items
function loadCartItems() {
    const cartItemsContainer = document.querySelector('.cart-items');
    if (!cartItemsContainer) return;

    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        checkIfCartIsEmpty();
        return;
    }

    // In a real app, you would fetch product details from an API
    const products = {
        '1': {
            name: "Premium Wireless Headphones",
            price: 25999.87, // Converted to KSH
            image: "images/product1-thumb1.jpg",
            options: {
                color: "Black",
                size: "Medium"
            }
        },
        '2': {
            name: "Smart Watch Pro",
            price: 32499.87, // Converted to KSH
            image: "images/product2-thumb1.jpg",
            options: {
                color: "Silver"
            }
        }
    };

    // Clear existing items (except header)
    const header = cartItemsContainer.querySelector('.cart-header');
    cartItemsContainer.innerHTML = '';
    if (header) cartItemsContainer.appendChild(header);

    // Add cart items
    cart.forEach(item => {
        const product = products[item.productId];
        if (!product) return;

        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <div class="cart-item-product">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-details">
                    <h3><a href="product-detail.html">${product.name}</a></h3>
                    <div class="product-attributes">
                        ${product.options.color ? `<span>Color: ${product.options.color}</span>` : ''}
                        ${product.options.size ? `<span>Size: ${product.options.size}</span>` : ''}
                    </div>
                </div>
            </div>
            <div class="cart-item-price">KSH ${product.price.toLocaleString()}</div>
            <div class="cart-item-quantity">
                <div class="quantity-selector">
                    <button class="quantity-btn minus"><i class="fas fa-minus"></i></button>
                    <input type="number" value="${item.quantity}" min="1">
                    <button class="quantity-btn plus"><i class="fas fa-plus"></i></button>
                </div>
            </div>
            <div class="cart-item-total">KSH ${(product.price * item.quantity).toLocaleString()}</div>
            <div class="cart-item-remove">
                <button class="remove-btn" data-product-id="${item.productId}"><i class="fas fa-times"></i></button>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);
    });
}

// Quantity Selectors
function initCartQuantitySelectors() {
    document.addEventListener('click', function (e) {
        if (e.target.closest('.quantity-btn.minus')) {
            const input = e.target.closest('.quantity-selector').querySelector('input');
            let value = parseInt(input.value);
            if (value > parseInt(input.min)) {
                input.value = value - 1;
                updateCartItem(e.target.closest('.cart-item'));
            }
        }

        if (e.target.closest('.quantity-btn.plus')) {
            const input = e.target.closest('.quantity-selector').querySelector('input');
            let value = parseInt(input.value);
            if (value < parseInt(input.max || 10)) {
                input.value = value + 1;
                updateCartItem(e.target.closest('.cart-item'));
            }
        }
    });

    document.addEventListener('change', function (e) {
        if (e.target.matches('.cart-item-quantity input')) {
            let value = parseInt(e.target.value);
            const min = parseInt(e.target.min || 1);
            const max = parseInt(e.target.max || 10);

            if (isNaN(value) || value < min) {
                e.target.value = min;
            } else if (value > max) {
                e.target.value = max;
            }

            updateCartItem(e.target.closest('.cart-item'));
        }
    });
}

// Update Cart Item
function updateCartItem(cartItem) {
    const productId = cartItem.querySelector('.remove-btn').getAttribute('data-product-id');
    const quantity = parseInt(cartItem.querySelector('input').value);
    const price = parseFloat(cartItem.querySelector('.cart-item-price').textContent.replace('KSH', '').replace(/,/g, ''));

    cartItem.querySelector('.cart-item-total').textContent = `KSH ${(price * quantity).toLocaleString()}`;

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemIndex = cart.findIndex(item => item.productId === productId);

    if (itemIndex !== -1) {
        if (quantity > 0) {
            cart[itemIndex].quantity = quantity;
        } else {
            cart.splice(itemIndex, 1);
        }
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartSummary();
    checkIfCartIsEmpty();
}

// Check If Cart Is Empty
function checkIfCartIsEmpty() {
    const cartItemsContainer = document.querySelector('.cart-items');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <h3>Your cart is empty</h3>
                <p>Looks like you haven't added anything to your cart yet</p>
                <a href="products.html" class="btn btn-primary">Continue Shopping</a>
            </div>
        `;
    }
}

// Shipping Information
function displayShippingInfo() {
    const shippingInfoContainer = document.querySelector('.shipping-info');
    if (shippingInfoContainer) {
        shippingInfoContainer.innerHTML = `
            <h3>Shipping Information</h3>
            <p>Standard delivery: 3-5 business days (KSH 5000)</p>
            <p>Express delivery: 1-2 business days (KSH 8000)</p>
            <p>Free shipping on orders over KSH 50,000</p>
        `;
    }
}

// Other functions (e.g., initRemoveButtons, initContinueShoppingButton, etc.) remain unchanged.

function initRemoveButtons() {
    const removeButtons = document.querySelectorAll('.remove-btn');
    removeButtons.forEach(button => {
        button.addEventListener('click', function () {
            const productId = this.getAttribute('data-product-id');
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart = cart.filter(item => item.productId !== productId);
            localStorage.setItem('cart', JSON.stringify(cart));
            loadCartItems();
            updateCartSummary();
        });
    });
}

function initContinueShoppingButton() {
    const continueShoppingButton = document.querySelector('.continue-shopping-btn');
    if (continueShoppingButton) {
        continueShoppingButton.addEventListener('click', function () {
            window.location.href = 'products.html';
        });
    }
}

function initCheckoutButton() {
    const checkoutButton = document.querySelector('.checkout-btn');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', function () {
            window.location.href = 'checkout.html';
        });
    }
}

function updateCartSummary() {
    const subtotalElement = document.querySelector('.cart-summary-subtotal');
    const shippingElement = document.querySelector('.cart-summary-shipping');
    const totalElement = document.querySelector('.cart-summary-total');
    const cartItemsContainer = document.querySelector('.cart-items');

    if (subtotalElement && shippingElement && totalElement && cartItemsContainer) {
        const SHIPPING_COST = 5000; // Example shipping cost
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        let subtotal = 0;
        cart.forEach(item => {
            const product = JSON.parse(localStorage.getItem('products')).find(p => p.id === item.productId);
            if (product) {
                subtotal += product.price * item.quantity;
            }
        });
        subtotalElement.textContent = `KSH ${subtotal.toLocaleString()}`;
        shippingElement.textContent = `KSH ${SHIPPING_COST.toLocaleString()}`;
        totalElement.textContent = `KSH ${(subtotal + SHIPPING_COST).toLocaleString()}`;
    }

    const clearCartButton = document.querySelector('.clear-cart');
    if (clearCartButton) {
        clearCartButton.addEventListener('click', function () {
            localStorage.removeItem('cart');
            loadCartItems();
            updateCartSummary();
        });
    }
    }

function initClearCartButton() {
    const clearCartButton = document.querySelector('.clear-cart');
    if (clearCartButton) {
        clearCartButton.addEventListener('click', function () {
            localStorage.removeItem('cart');
            loadCartItems();
            updateCartSummary();
        });
    }
}
initClearCartButton();
function initCheckoutButton() {
    const checkoutButton = document.querySelector('.checkout-btn');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', function () {
            window.location.href = 'checkout.html';
        });
    }
}
initCheckoutButton();
function initContinueShoppingButton() {
    const continueShoppingButton = document.querySelector('.continue-shopping-btn');
    if (continueShoppingButton) {
        continueShoppingButton.addEventListener('click', function () {
            window.location.href = 'products.html';
        });
    }
}
initContinueShoppingButton();
function initRemoveButtons() {
    const removeButtons = document.querySelectorAll('.remove-btn');
    removeButtons.forEach(button => {
        button.addEventListener('click', function () {
            const productId = this.getAttribute('data-product-id');
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart = cart.filter(item => item.productId !== productId);
            localStorage.setItem('cart', JSON.stringify(cart));
            loadCartItems();
            updateCartSummary();
        });
    });
}
initRemoveButtons();
function initCartQuantitySelectors() {
    document.addEventListener('click', function (e) {
        if (e.target.closest('.quantity-btn.minus')) {
            const input = e.target.closest('.quantity-selector').querySelector('input');
            let value = parseInt(input.value);
            if (value > parseInt(input.min)) {
                input.value = value - 1;
                updateCartItem(e.target.closest('.cart-item'));
            }
        }

        if (e.target.closest('.quantity-btn.plus')) {
            const input = e.target.closest('.quantity-selector').querySelector('input');
            let value = parseInt(input.value);
            if (value < parseInt(input.max || 10)) {
                input.value = value + 1;
                updateCartItem(e.target.closest('.cart-item'));
            }
        }
    });

    document.addEventListener('change', function (e) {
        if (e.target.matches('.cart-item-quantity input')) {
            let value = parseInt(e.target.value);
            const min = parseInt(e.target.min || 1);
            const max = parseInt(e.target.max || 10);

            if (isNaN(value) || value < min) {
                e.target.value = min;
            } else if (value > max) {
                e.target.value = max;
            }

            updateCartItem(e.target.closest('.cart-item'));
        }
    });
}
initCartQuantitySelectors();
function updateCartItem(cartItem) {
    const productId = cartItem.querySelector('.remove-btn').getAttribute('data-product-id');
    const quantity = parseInt(cartItem.querySelector('input').value);
    const price = parseFloat(cartItem.querySelector('.cart-item-price').textContent.replace('KSH', '').replace(/,/g, ''));

    cartItem.querySelector('.cart-item-total').textContent = `KSH ${(price * quantity).toLocaleString()}`;

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemIndex = cart.findIndex(item => item.productId === productId);

    if (itemIndex !== -1) {
        if (quantity > 0) {
            cart[itemIndex].quantity = quantity;
        } else {
            cart.splice(itemIndex, 1);
        }
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartSummary();
    checkIfCartIsEmpty();
}
function checkIfCartIsEmpty() {
    const cartItemsContainer = document.querySelector('.cart-items');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <h3>Your cart is empty</h3>
                <p>Looks like you haven't added anything to your cart yet</p>
                <a href="products.html" class="btn btn-primary">Continue Shopping</a>
            </div>
        `;
    }
}

function updateCartSummary() {
    const subtotalElement = document.querySelector('.cart-summary-subtotal');
    const shippingElement = document.querySelector('.cart-summary-shipping');
    const totalElement = document.querySelector('.cart-summary-total');
    const cartItemsContainer = document.querySelector('.cart-items');

    if (subtotalElement && shippingElement && totalElement && cartItemsContainer) {
        const SHIPPING_COST = 5000; // Example shipping cost
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        let subtotal = 0;
        cart.forEach(item => {
            const product = JSON.parse(localStorage.getItem('products')).find(p => p.id === item.productId);
            if (product) {
                subtotal += product.price * item.quantity;
            }
        });
        subtotalElement.textContent = `KSH ${subtotal.toLocaleString()}`;
        shippingElement.textContent = `KSH ${SHIPPING_COST.toLocaleString()}`;
        totalElement.textContent = `KSH ${(subtotal + SHIPPING_COST).toLocaleString()}`;
    }

    const clearCartButton = document.querySelector('.clear-cart');
    if (clearCartButton) {
        clearCartButton.addEventListener('click', function () {
            localStorage.removeItem('cart');
            loadCartItems();
            updateCartSummary();
        });
    }
}
initClearCartButton();


