// DOM Ready
document.addEventListener('DOMContentLoaded', function () {
    // Initialize all components
    initHeroSlider();
    initSearchAutocomplete();
    initProductGrid();
    initProductTabs();
    initQuantitySelectors();
    initColorOptions();
    initWishlistButtons();
    initAddToCartButtons();
    initViewOptions();
    initCheckoutSteps();
    initMobileMenu();
    initImageZoom();
    init360View();
    initToastNotifications();
    updateCartCount();

    // Initialize animations
    initAnimations();

    // Initialize theme toggle
    initThemeToggle();

    // Initialize dynamic content
    initDynamicContent();
});

// Hero Slider
function initHeroSlider() {
    const slider = document.querySelector('.hero-slider');
    if (!slider) return;

    const slides = slider.querySelectorAll('.slide');
    const dotsContainer = slider.parentElement.querySelector('.slider-dots');
    const prevBtn = slider.parentElement.querySelector('.prev-slide');
    const nextBtn = slider.parentElement.querySelector('.next-slide');

    let currentSlide = 0;
    const totalSlides = slides.length;

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    // Show initial slide
    slides[0].classList.add('active');

    // Next slide function
    function nextSlide() {
        goToSlide((currentSlide + 1) % totalSlides);
    }

    // Previous slide function
    function prevSlide() {
        goToSlide((currentSlide - 1 + totalSlides) % totalSlides);
    }

    // Go to specific slide
    function goToSlide(index) {
        slides[currentSlide].classList.remove('active');
        dotsContainer.children[currentSlide].classList.remove('active');

        currentSlide = index;

        slides[currentSlide].classList.add('active');
        dotsContainer.children[currentSlide].classList.add('active');
    }

    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Auto slide change
    let slideInterval = setInterval(nextSlide, 5000);

    // Pause on hover
    slider.parentElement.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });

    slider.parentElement.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 5000);
    });
}

// Animations
function initAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-up, .bounce, .pulse');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach((el) => observer.observe(el));
}

// Theme Toggle
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.add(savedTheme);
    }

    // Toggle theme on button click
    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('dark-mode')) {
            body.classList.remove('dark-mode');
            localStorage.setItem('theme', ''); // Save light mode
        } else {
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark-mode'); // Save dark mode
        }
    });
}

// Dynamic Content
function initDynamicContent() {
    function showContent(section) {
        const dynamicContent = document.getElementById('dynamic-content');

        let content = '';
        switch (section) {
            case 'new-arrivals':
                content = `
                    <h2>New Arrivals</h2>
                    <p>Discover the latest trends and products in our New Arrivals section.</p>
                    <ul>
                        <li>Stylish Summer Dress</li>
                        <li>Wireless Earbuds</li>
                        <li>Modern Sofa Set</li>
                    </ul>
                `;
                break;
            case 'deals':
                content = `
                    <h2>Deals</h2>
                    <p>Check out the hottest deals and discounts available right now.</p>
                    <ul>
                        <li>50% off on Smartphones</li>
                        <li>Buy 1 Get 1 Free on Shoes</li>
                        <li>20% off on Kitchen Appliances</li>
                    </ul>
                `;
                break;
            case 'brands':
                content = `
                    <h2>Brands</h2>
                    <p>Explore products from your favorite brands.</p>
                    <ul>
                        <li>Apple</li>
                        <li>Samsung</li>
                        <li>Nike</li>
                        <li>Adidas</li>
                    </ul>
                `;
                break;
            default:
                content = `
                    <h2>Welcome to ShopEase</h2>
                    <p>Select a section to view its content.</p>
                `;
        }

        // Update the dynamic content section
        dynamicContent.innerHTML = content;
        dynamicContent.style.display = 'block'; // Ensure the section is visible

        // Adjust colors based on the current theme
        const isDarkMode = document.body.classList.contains('dark-mode');
        dynamicContent.style.backgroundColor = isDarkMode ? '#1e1e1e' : '#ffffff'; // Dark or light background
        dynamicContent.style.color = isDarkMode ? '#e5e7eb' : '#333333'; // Light or dark text
    }

    // Example usage: showContent('new-arrivals');
}

// Modal Management
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

// Close modal when clicking outside of it
window.onclick = function (event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach((modal) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
};

// Initialize modals for Returns and Refunds and Terms and Conditions
document.addEventListener('DOMContentLoaded', () => {
    const returnsBtn = document.getElementById('returns-btn');
    const termsBtn = document.getElementById('terms-btn');

    if (returnsBtn) {
        returnsBtn.addEventListener('click', () => openModal('returns-modal'));
    }

    if (termsBtn) {
        termsBtn.addEventListener('click', () => openModal('terms-modal'));
    }

    const closeButtons = document.querySelectorAll('.close-btn');
    closeButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
            }
        });
    });

    const shippingInfoBtn = document.querySelector('a[href="javascript:void(0);"][onclick*="shipping-modal"]');
    if (shippingInfoBtn) {
        shippingInfoBtn.addEventListener('click', () => openModal('shipping-modal'));
    }
});

// Other functions (e.g., initSearchAutocomplete, initProductGrid, etc.) remain unchanged

function initSearchAutocomplete() {
    const searchInput = document.getElementById('search-input');
    const suggestionsContainer = document.getElementById('suggestions-container');

    if (!searchInput || !suggestionsContainer) return;

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        if (query.length > 0) {
            // Fetch suggestions from a predefined list or API
            const suggestions = getSuggestions(query);
            displaySuggestions(suggestions, suggestionsContainer);
        } else {
            suggestionsContainer.innerHTML = ''; // Clear suggestions
        }
    });
}
function getSuggestions(query) {
    // Example static suggestions (replace with API call if needed)
    const products = [
        'Apple iPhone 13',
        'Samsung Galaxy S21',
        'Sony WH-1000XM4',
        'Dell XPS 13',
        'Nike Air Max 270',
        'Adidas Ultraboost 21'
    ];
    return products.filter(product => product.toLowerCase().includes(query));
}

function displaySuggestions(suggestions, container) {
    container.innerHTML = ''; // Clear previous suggestions
    suggestions.forEach(suggestion => {
        const suggestionItem = document.createElement('div');
        suggestionItem.classList.add('suggestion-item');
        suggestionItem.textContent = suggestion;
        suggestionItem.addEventListener('click', () => {
            document.getElementById('search-input').value = suggestion; // Set input value to clicked suggestion
            container.innerHTML = ''; // Clear suggestions after selection
        });
        container.appendChild(suggestionItem);
    });
}

function initProductGrid() {
    const productGrid = document.querySelector('.product-grid');
    if (!productGrid) return;

    const products = productGrid.querySelectorAll('.product-item');
    products.forEach(product => {
        product.addEventListener('click', () => {
            const productId = product.getAttribute('data-product-id');
            window.location.href = `product-details.html?id=${productId}`; // Redirect to product details page
        });
    });
}
function initProductTabs() {
    const tabs = document.querySelectorAll('.product-tab');
    const tabContents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetContent = document.querySelector(`#${tab.getAttribute('data-target')}`);

            // Hide all tab contents
            tabContents.forEach(content => content.classList.remove('active'));

            // Show the selected tab content
            targetContent.classList.add('active');

            // Remove active class from all tabs and add to the clicked one
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
        });
    });
}

function initQuantitySelectors() {
    const quantityInputs = document.querySelectorAll('.quantity-selector input[type="number"]');
    quantityInputs.forEach(input => {
        input.addEventListener('change', () => {
            if (input.value < 1) input.value = 1; // Ensure minimum value is 1
        });
    });
}
function initColorOptions() {
    const colorOptions = document.querySelectorAll('.color-option');
    colorOptions.forEach(option => {
        option.addEventListener('click', () => {
            // Remove active class from all options and add to the clicked one
            colorOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
        });
    });
}
function initWishlistButtons() {
    const wishlistButtons = document.querySelectorAll('.wishlist-button');
    wishlistButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.classList.toggle('added'); // Toggle added class for animation
            const message = button.classList.contains('added') ? 'Added to Wishlist' : 'Removed from Wishlist';
            showToast(message); // Show toast notification
        });
    });
}

function initAddToCartButtons() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart-button');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.classList.add('added'); // Add class for animation
            const message = 'Added to Cart';
            showToast(message); // Show toast notification
            updateCartCount(); // Update cart count
        });
    });
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        const currentCount = parseInt(cartCount.textContent) || 0;
        cartCount.textContent = currentCount + 1; // Increment cart count
    }
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('fade-out');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 500); // Wait for fade-out animation to finish
    }, 2000); // Show toast for 2 seconds
}

function initViewOptions() {
    const gridViewBtn = document.getElementById('grid-view-btn');
    const listViewBtn = document.getElementById('list-view-btn');
    const productGrid = document.querySelector('.product-grid');

    if (gridViewBtn) {
        gridViewBtn.addEventListener('click', () => {
            productGrid.classList.remove('list-view');
            productGrid.classList.add('grid-view');
        });
    }

    if (listViewBtn) {
        listViewBtn.addEventListener('click', () => {
            productGrid.classList.remove('grid-view');
            productGrid.classList.add('list-view');
        });
    }
}
function initCheckoutSteps() {
    const checkoutSteps = document.querySelectorAll('.checkout-step');
    const nextButtons = document.querySelectorAll('.next-button');
    const prevButtons = document.querySelectorAll('.prev-button');

    let currentStep = 0;

    function showStep(step) {
        checkoutSteps.forEach((s, index) => {
            s.classList.toggle('active', index === step);
        });
    }

    nextButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            if (currentStep < checkoutSteps.length - 1) {
                currentStep++;
                showStep(currentStep);
            }
        });
    });

    prevButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            if (currentStep > 0) {
                currentStep--;
                showStep(currentStep);
            }
        });
    });

    showStep(currentStep); // Show the first step initially
}

function initMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('active'); // Toggle mobile menu visibility
        });
    }
}

function initImageZoom() {
    const zoomableImages = document.querySelectorAll('.zoomable-image');
    zoomableImages.forEach(image => {
        image.addEventListener('mouseover', () => {
            image.classList.add('zoomed'); // Add zoom effect on hover
        });
        image.addEventListener('mouseout', () => {
            image.classList.remove('zoomed'); // Remove zoom effect on mouse out
        });
    });
}

function init360View() {
    const image360 = document.querySelector('.image-360-view');
    if (image360) {
        let currentFrame = 0;
        const totalFrames = 36; // Total number of frames for the 360 view

        function updateImage() {
            image360.src = `images/360-view/frame-${currentFrame}.jpg`; // Update image source
            currentFrame = (currentFrame + 1) % totalFrames; // Loop through frames
        }

        setInterval(updateImage, 100); // Change frame every 100ms
    }
}
function initToastNotifications() {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) return;

    // Example of showing a toast notification
    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('fade-out');
            setTimeout(() => {
                toastContainer.removeChild(toast);
            }, 500); // Wait for fade-out animation to finish
        }, 2000); // Show toast for 2 seconds
    }
}

function initCart() {
    const cartItems = document.querySelectorAll('.cart-item');
    const subtotalElement = document.getElementById('cart-subtotal');
    const shippingElement = document.getElementById('cart-shipping');
    const totalElement = document.getElementById('cart-total');
    const clearCartButton = document.querySelector('.clear-cart');

    const SHIPPING_COST = 2600.0; // Updated to KSH

    function updateCartTotals() {
        let subtotal = 0;

        cartItems.forEach((item) => {
            const price = parseFloat(item.querySelector('.cart-item-price').textContent.replace('KSH ', '').replace(',', ''));
            const quantity = parseInt(item.querySelector('.cart-item-quantity input').value);
            const total = price * quantity;

            item.querySelector('.cart-item-total').textContent = `KSH ${total.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
            subtotal += total;
        });

        subtotalElement.textContent = `KSH ${subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
        shippingElement.textContent = `KSH ${SHIPPING_COST.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
        const total = subtotal + SHIPPING_COST;
        totalElement.textContent = `KSH ${total.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
    }
    function attachEventListeners(item) {
        const quantityInput = item.querySelector('.cart-item-quantity input');
        const minusButton = item.querySelector('.quantity-btn.minus');
        const plusButton = item.querySelector('.quantity-btn.plus');
        const removeButton = item.querySelector('.remove-btn');

        // Update totals when quantity changes
        quantityInput.addEventListener('change', () => {
            if (quantityInput.value < 1) quantityInput.value = 1;
            updateCartTotals();
        });

        minusButton.addEventListener('click', () => {
            if (quantityInput.value > 1) {
                quantityInput.value--;
                updateCartTotals();
            }
        });

        plusButton.addEventListener('click', () => {
            quantityInput.value++;
            updateCartTotals();
        });

        removeButton.addEventListener('click', () => {
            item.remove();
            updateCartTotals();
            checkIfCartIsEmpty();
        });
    }
    function checkIfCartIsEmpty() {
        const cartItems = document.querySelectorAll('.cart-item');
        if (cartItems.length === 0) {
            // Show empty cart message or hide cart section
            document.getElementById('empty-cart-message').style.display = 'block';
        } else {
            document.getElementById('empty-cart-message').style.display = 'none';
        }
    }
    function clearCart() {
        cartItems.forEach(item => item.remove());
        updateCartTotals();
        checkIfCartIsEmpty();
    }
    // Attach event listeners to each cart item
    cartItems.forEach(item => attachEventListeners(item));
    // Attach event listener to clear cart button
    if (clearCartButton) {
        clearCartButton.addEventListener('click', clearCart);
    }
    // Initial check for empty cart
    checkIfCartIsEmpty();
    updateCartTotals(); // Initial calculation of totals
}


