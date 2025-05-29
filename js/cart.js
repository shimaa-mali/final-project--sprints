document.addEventListener('DOMContentLoaded', function() {
    
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCountElements = document.querySelectorAll('#cartCount');
    
    cartCountElements.forEach(element => {
        const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
        element.textContent = totalItems;
        element.style.display = totalItems > 0 ? 'block' : 'none';
    });
}
    
    
    updateCartCount();
    
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cartItems');
    const totalPriceElement = document.getElementById('totalPrice');
    
    if (cartItemsContainer) {
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="text-center py-4">Your cart is empty</p>';
            document.getElementById('checkoutBtn').disabled = true;
            return;
        }
        
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="card mb-3" data-id="${item.id}">
                <div class="row g-0">
                    <div class="col-md-2">
                        <img src="${item.image}" class="img-fluid rounded-start p-2" alt="${item.title}" style="max-height: 150px; object-fit: contain;">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${item.title}</h5>
                            <p class="card-text">$${item.price.toFixed(2)}</p>
                            <div class="input-group" style="width: 120px;">
                                <button class="btn btn-outline-secondary change-quantity" data-id="${item.id}" data-change="-1">-</button>
                                <input type="text" class="form-control text-center" value="${item.quantity || 1}" readonly>
                                <button class="btn btn-outline-secondary change-quantity" data-id="${item.id}" data-change="1">+</button>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-2 d-flex align-items-center justify-content-end p-3">
                        <button class="btn btn-danger remove-item" data-id="${item.id}">
                            <i class="fas fa-trash"></i> Remove
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
        
      
        updateTotalPrice();
        
       
        document.querySelectorAll('.change-quantity').forEach(button => {
            button.addEventListener('click', function() {
                const productId = parseInt(this.getAttribute('data-id'));
                const change = parseInt(this.getAttribute('data-change'));
                updateCartItemQuantity(productId, change);
            });
        });
        
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', function() {
                const productId = parseInt(this.getAttribute('data-id'));
                removeFromCart(productId);
            });
        });
    }
    
    // Checkout button
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', checkout);
    }
});

//add login page
const checkoutBtn = document.getElementById('checkoutBtn');
if (checkoutBtn) {
    checkoutBtn.addEventListener('click', function() {
       
        const isLoggedIn = false; 
        
        if (!isLoggedIn) {
            alert("Please log in first!"); 
            window.location.href = 'login.html';
        } else {
           
            checkout(); 
        }
    });
}


function updateTotalPrice() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const total = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
    document.getElementById('totalPrice').textContent = total.toFixed(2);
}

function updateCartItemQuantity(productId, change) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemIndex = cart.findIndex(item => item.id === productId);
    
    if (itemIndex !== -1) {
       
        cart[itemIndex].quantity = cart[itemIndex].quantity || 1;
        cart[itemIndex].quantity += change;
        
        
        if (cart[itemIndex].quantity <= 0) {
            cart.splice(itemIndex, 1);
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        updateTotalPrice();
        location.reload(); 
    }
}

function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    location.reload();
}

function checkout() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        alert('Your cart is empty');
        return;
    }
    
    // Create order
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const order = {
        id: Date.now(),
        date: new Date().toISOString(),
        items: cart,
        total: cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0),
        status: 'pending'
    };
    
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    // Clear cart
    localStorage.removeItem('cart');
    updateCartCount();
    
 
    window.location.href = 'thankyou.html?id=' + order.id;
}


function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCountElements = document.querySelectorAll('#cartCount');
    
    const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    
    cartCountElements.forEach(element => {
        element.textContent = totalItems;
        element.style.display = totalItems > 0 ? 'block' : 'none';
    });
}


document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
});


