document.addEventListener('DOMContentLoaded', function() {
    const loadingSpinner = document.getElementById('loading-spinner');
    const productContainer = document.getElementById('product-details-container');
    const errorMessage = document.getElementById('error-message');
    
    // Get product ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    if (!productId) {
        errorMessage.textContent = 'Product not found.';
        errorMessage.classList.remove('d-none');
        loadingSpinner.style.display = 'none';
        return;
    }
    
    // Show loading spinner
    loadingSpinner.style.display = 'flex';
    productContainer.classList.add('d-none');
    errorMessage.classList.add('d-none');
    
    // Fetch product details from FakeStoreAPI
    fetch(`https://fakestoreapi.com/products/${productId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Product not found');
            }
            return response.json();
        })
        .then(product => {
           
            loadingSpinner.style.display = 'none';
            productContainer.classList.remove('d-none');
            
      
            document.getElementById('product-image').src = product.image;
            document.getElementById('product-title').textContent = product.title;
            document.getElementById('product-price').textContent = `$${product.price}`;
            document.getElementById('product-description').textContent = product.description;
            
     
            const ratingElement = document.getElementById('product-rating');
            ratingElement.innerHTML = '';
            for (let i = 0; i < 5; i++) {
                const star = document.createElement('i');
                star.className = i < Math.round(product.rating.rate) ? 'fas fa-star text-warning' : 'far fa-star text-warning';
                ratingElement.appendChild(star);
            }
            document.getElementById('product-review-count').textContent = `(${product.rating.count} reviews)`;
            
            // Product details list
            const detailsList = document.getElementById('product-details');
            detailsList.innerHTML = `
                <li><strong>Category:</strong> ${product.category}</li>
                <li><strong>Availability:</strong> In Stock</li>
            `;
            
            // Add to cart button
            document.getElementById('add-to-cart-btn').addEventListener('click', function() {
                const quantity = parseInt(document.getElementById('quantity').value) || 1;
                addToCart(product, quantity);
            });
        })
        .catch(error => {
            console.error('Error fetching product:', error);
            loadingSpinner.style.display = 'none';
            errorMessage.classList.remove('d-none');
        });
    
    function addToCart(product, quantity = 1) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
     
        const existingItem = cart.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity = (existingItem.quantity || 1) + quantity;
        } else {
            product.quantity = quantity;
            cart.push(product);
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        
        alert(`Added ${quantity} ${quantity > 1 ? 'items' : 'item'} to cart:\n${product.title}\nPrice: $${product.price}`);
    }
});

document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
});