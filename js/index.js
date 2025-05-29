document.addEventListener('DOMContentLoaded', async function () {
  const container = document.getElementById('trendingProducts');

  try {
    const response = await fetch('https://fakestoreapi.com/products?limit=8');
    const products = await response.json();

    container.innerHTML = products.map(product => `
      <div class="col-md-3 mb-4">
        <div class="card h-100">
          <img src="${product.image}" class="card-img-top" alt="${product.title}" style="height: 200px; object-fit: contain;">
          <div class="card-body d-flex flex-column">
            <h6 class="card-title">${product.title.substring(0, 50)}...</h6>
            <p class="card-text fw-bold mb-2">$${product.price.toFixed(2)}</p>
            <button class="btn btn-primary mt-auto" onclick="addToCart(${product.id}, '${product.title.replace(/'/g, "\\'")}', ${product.price}, '${product.image}')">Add to Cart</button>
          </div>
        </div>
      </div>
    `).join('');
  } catch (error) {
    console.error('Failed to load products:', error);
    container.innerHTML = `<p class="text-danger">Failed to load products. Try again later.</p>`;
  }
});


function addToCart(id, name, price, image) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ id, name, price: price * 100, image, quantity: 1 });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${name} added to cart!`);
}


document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
});
