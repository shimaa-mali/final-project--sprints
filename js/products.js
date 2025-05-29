document.addEventListener('DOMContentLoaded', function() {
    const productsContainer = document.getElementById('products-container');
    const loadingSpinner = document.getElementById('loading-spinner');
    
  
    loadingSpinner.style.display = 'block';
    
    // Fetch products from FakeStoreAPI
    fetch('https://fakestoreapi.com/products?limit=8')
        .then(response => response.json())
        .then(products => {
         
            loadingSpinner.style.display = 'none';
            
            // Display products
            displayProducts(products);
        })
        .catch(error => {
            console.error('Error fetching products:', error);
            loadingSpinner.style.display = 'none';
            productsContainer.innerHTML = `
                <div class="col-12 text-center text-danger">
                    <p>Failed to load products. Please try again later.</p>
                </div>
            `;
        });

    function displayProducts(products) {
        productsContainer.innerHTML = '';
        
        const productsWithBadges = products.map(product => {
            const isHot = Math.random() > 0.5;
            let percent = null;
            
            if (isHot) {
                const percentages = ['10%', '20%', '30%', '40%', '50%'];
                percent = percentages[Math.floor(Math.random() * percentages.length)];
            }
            
            return {
                ...product,
                hot: isHot,
                percent: percent
            };
        });

        productsWithBadges.forEach(product => {
            const col = document.createElement('div');
            col.className = 'col-md-3 col-sm-6 mb-4';
            
            const card = document.createElement('div');
            card.className = 'card product-card p-3 h-100';
            card.style.cursor = 'pointer'; 
            
        
            card.addEventListener('click', function() {
            
                window.location.href = `product-details.html?id=${product.id}`;
            });
            
            if (product.hot) {
                const hotBadge = document.createElement('div');
                hotBadge.className = 'hot-badge';
                hotBadge.textContent = 'HOT';
                card.appendChild(hotBadge);
                
                if (product.percent) {
                    const percentBadge = document.createElement('div');
                    percentBadge.className = 'hot-percent';
                    percentBadge.textContent = product.percent;
                    card.appendChild(percentBadge);
                }
            }
            
            const img = document.createElement('img');
            img.className = 'product-img img-fluid mb-3';
            img.src = product.image;
            img.alt = product.title;
            card.appendChild(img);
            
            const title = document.createElement('div');
            title.className = 'product-title';
            title.textContent = product.title;
            card.appendChild(title);
            
            const brand = document.createElement('div');
            brand.className = 'product-brand';
            brand.textContent = product.category.toUpperCase();
            card.appendChild(brand);
            
            const price = document.createElement('div');
            price.className = 'product-price';
            price.textContent = `$${product.price}`;
            card.appendChild(price);
            
            const rating = document.createElement('div');
            rating.className = 'small text-muted mb-2';
            rating.innerHTML = `⭐ ${product.rating.rate} (${product.rating.count} reviews)`;
            card.appendChild(rating);
            
            const addToCartBtn = document.createElement('button');
            addToCartBtn.className = 'btn btn-primary btn-sm mt-auto';
            addToCartBtn.innerHTML = '<i class="fas fa-shopping-cart me-2"></i> Add to Cart';
       
            addToCartBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                addToCart(product);
            });
            card.appendChild(addToCartBtn);
            
            col.appendChild(card);
            productsContainer.appendChild(col);
        });
    }

    function addToCart(product) {
        console.log('Added to cart:', product);
        alert(`Added to cart:\n${product.title}\nPrice: $${product.price}`);
        
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
    }
});


document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
});