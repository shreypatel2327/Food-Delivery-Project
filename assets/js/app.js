// Currency formatting (INR)
function formatINR(value) {
  try {
    return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(Math.round(value));
  } catch (e) {
    return String(Math.round(value));
  }
}
// Cart helpers
function getCart() {
  return JSON.parse(localStorage.getItem('fg_cart') || '[]');
}

function saveCart(cart) {
  localStorage.setItem('fg_cart', JSON.stringify(cart));
}

function addToCart(item) {
  const cart = getCart();
  const index = cart.findIndex((i) => i.id === item.id);
  if (index >= 0) {
    cart[index].quantity += item.quantity || 1;
  } else {
    cart.push({ ...item, quantity: item.quantity || 1 });
  }
  saveCart(cart);
}

function removeFromCart(itemId) {
  const cart = getCart().filter((i) => i.id !== itemId);
  saveCart(cart);
}

function updateQuantity(itemId, quantity) {
  const cart = getCart().map((i) => (i.id === itemId ? { ...i, quantity: Math.max(1, quantity) } : i));
  saveCart(cart);
}

function calcCartTotals(cart) {
  const subtotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  return { subtotal, total: subtotal };
}

// Image fallback helpers to avoid repeats and keep cuisine relevance
function restaurantIdToCuisine(restaurantId) {
  const r = (typeof RESTAURANTS !== 'undefined' ? RESTAURANTS : []).find((x) => x.id === restaurantId);
  return r ? r.cuisine : 'General';
}

function fallbackForCuisine(cuisine) {
  const map = {
    Indian: 'https://images.unsplash.com/photo-1625944527949-929f4bc1b8a6?q=80&w=1200&auto=format&fit=crop',
    Italian: 'https://images.unsplash.com/photo-1523986371872-9d3ba2e2f642?q=80&w=1200&auto=format&fit=crop',
    Japanese: 'https://images.unsplash.com/photo-1544025162-16ecafe06b2e?q=80&w=1200&auto=format&fit=crop',
    American: 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1200&auto=format&fit=crop',
    Healthy: 'https://images.unsplash.com/photo-1543352634-8730f16cf9a6?q=80&w=1200&auto=format&fit=crop',
    Mexican: 'https://images.unsplash.com/photo-1548940740-204726a19be3?q=80&w=1200&auto=format&fit=crop',
    General: 'https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?q=80&w=1200&auto=format&fit=crop'
  };
  return map[cuisine] || map.General;
}

// Rendering components
function restaurantCard(r) {
  return `
  <div class="col-12 col-sm-6 col-lg-4">
    <div class="card h-100 card-restaurant shadow-sm">
      <img src="${r.image}" class="card-img-top" alt="${r.name}" loading="lazy" onerror="this.onerror=null;this.src='${fallbackForCuisine(r.cuisine)}';">
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-start">
          <h5 class="card-title mb-1">${r.name}</h5>
          <span class="badge">${r.rating} ★</span>
        </div>
        <div class="text-secondary small mb-2">${r.cuisine} • ${r.eta}</div>
        <a href="menu.html?id=${r.id}" class="stretched-link"></a>
      </div>
    </div>
  </div>`;
}

function dishCard(d, restaurantId) {
  return `
  <div class="col-12 col-sm-6 col-lg-4">
    <div class="card h-100 card-dish shadow-sm">
      <img src="${d.image}" class="card-img-top" alt="${d.name}" loading="lazy" onerror="this.onerror=null;this.src='${fallbackForCuisine(restaurantIdToCuisine(restaurantId))}';">
      <div class="card-body d-flex flex-column">
        <h5 class="card-title mb-1">${d.name}</h5>
        <div class="text-secondary small mb-2">${d.desc}</div>
        <div class="d-flex justify-content-between align-items-center mt-auto">
          <span class="price">₹${formatINR(d.price)}</span>
          <button class="btn btn-primary btn-sm" data-add="${d.id}" data-restaurant="${restaurantId}">Add to Cart</button>
        </div>
      </div>
    </div>
  </div>`;
}

// Home
function renderFeaturedRestaurants(containerId, count = 6) {
  const el = document.getElementById(containerId);
  el.innerHTML = RESTAURANTS.slice(0, count).map(restaurantCard).join('');
}

function renderPopularDishes(containerId, count = 6) {
  const dishes = Object.values(MENUS).flat().slice(0, count);
  const el = document.getElementById(containerId);
  el.innerHTML = dishes
    .map((d) => {
      // find restaurant owning dish
      const restId = Object.keys(MENUS).find((rid) => MENUS[rid].some((x) => x.id === d.id));
      return dishCard(d, restId);
    })
    .join('');
  el.addEventListener('click', onAddToCartClick);
}

// Restaurants list
function renderRestaurantList(containerId) {
  const el = document.getElementById(containerId);
  el.innerHTML = RESTAURANTS.map(restaurantCard).join('');
}

function filterRestaurants(containerId, query) {
  const q = (query || '').toLowerCase();
  const filtered = RESTAURANTS.filter((r) => r.name.toLowerCase().includes(q) || r.cuisine.toLowerCase().includes(q));
  const el = document.getElementById(containerId);
  el.innerHTML = filtered.map(restaurantCard).join('');
}

// Menu page
function renderMenuPage() {
  const params = new URLSearchParams(location.search);
  const id = params.get('id') || RESTAURANTS[0].id;
  const rest = RESTAURANTS.find((r) => r.id === id) || RESTAURANTS[0];
  const hero = document.getElementById('restaurant-hero');
  hero.innerHTML = `
  <div class="rounded-4 overflow-hidden shadow-sm">
    <img src="${rest.banner}" alt="${rest.name}" class="w-100" style="max-height: 260px; object-fit: cover;" loading="lazy" onerror="this.onerror=null;this.src='${fallbackForCuisine(rest.cuisine)}';">
    <div class="p-3 border bg-white d-flex justify-content-between align-items-center">
      <div>
        <div class="h4 mb-0">${rest.name}</div>
        <div class="text-secondary">${rest.cuisine} • <span class="rating">${rest.rating} ★</span> • ${rest.eta}</div>
      </div>
      <a href="restaurants.html" class="btn btn-outline-secondary">Back to Restaurants</a>
    </div>
  </div>`;

  const menu = MENUS[id] || [];
  const container = document.getElementById('menu-items');
  container.innerHTML = menu.map((d) => dishCard(d, id)).join('');
  container.addEventListener('click', onAddToCartClick);
}

function onAddToCartClick(e) {
  const btn = e.target.closest('[data-add]');
  if (!btn) return;
  const dishId = btn.getAttribute('data-add');
  const restId = btn.getAttribute('data-restaurant');
  const dish = (MENUS[restId] || []).find((d) => d.id === dishId);
  if (!dish) return;
  addToCart({ id: dish.id, name: dish.name, price: dish.price, image: dish.image, restaurantId: restId, quantity: 1 });
  // update header cart count immediately
  if (typeof renderHeaderFooter === 'function') {
    renderHeaderFooter();
  }
  // update mini-cart on menu page if it exists
  const miniCartList = document.getElementById('cart-items');
  const miniCartTotal = document.getElementById('cart-total');
  const miniCartCount = document.getElementById('cart-count');
  if (miniCartList && miniCartTotal && miniCartCount) {
    renderMiniCart('cart-items', 'cart-total', 'cart-count');
  }
  // give quick feedback
  btn.disabled = true;
  btn.innerText = 'Added';
  setTimeout(() => { btn.disabled = false; btn.innerText = 'Add to Cart'; }, 800);
}

// Mini-cart render (menu page)
function renderMiniCart(listId, totalId, countId) {
  const cart = getCart();
  const list = document.getElementById(listId);
  if (!list) return;
  list.innerHTML = cart
    .map(
      (i) => `
    <div class="d-flex align-items-center">
      <img src="${i.image}" class="rounded me-3" style="width:56px;height:56px;object-fit:cover" alt="${i.name}">
      <div class="flex-grow-1">
        <div class="fw-semibold">${i.name}</div>
        <div class="small text-secondary">₹${formatINR(i.price)} × ${i.quantity}</div>
      </div>
      <button class="btn btn-sm btn-outline-danger" data-remove="${i.id}">Remove</button>
    </div>`
    )
    .join('');

  const { subtotal } = calcCartTotals(cart);
  const totalEl = document.getElementById(totalId);
  if (totalEl) totalEl.textContent = `₹${formatINR(subtotal)}`;
  const countEl = document.getElementById(countId);
  if (countEl) countEl.textContent = cart.reduce((n, i) => n + i.quantity, 0);

  list.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-remove]');
    if (!btn) return;
    removeFromCart(btn.getAttribute('data-remove'));
    renderMiniCart(listId, totalId, countId);
    renderHeaderFooter();
  });
}

// Cart page
function renderCartPage(listId, subtotalId, deliveryId, totalId) {
  const delivery = 25; // INR
  const list = document.getElementById(listId);
  const subtotalEl = document.getElementById(subtotalId);
  const deliveryEl = document.getElementById(deliveryId);
  const totalEl = document.getElementById(totalId);

  function rerender() {
    const cart = getCart();
    if (cart.length === 0) {
      list.innerHTML = '<div class="alert alert-info">Your cart is empty. Browse restaurants to add items.</div>';
    } else {
      list.innerHTML = cart
        .map(
          (i) => `
        <div class="card p-3">
          <div class="d-flex align-items-center">
            <img src="${i.image}" class="rounded me-3" style="width:80px;height:80px;object-fit:cover" alt="${i.name}">
            <div class="flex-grow-1">
              <div class="fw-semibold">${i.name}</div>
              <div class="small text-secondary">₹${formatINR(i.price)}</div>
            </div>
            <div class="input-group" style="width: 140px;">
              <button class="btn btn-outline-secondary" data-dec="${i.id}">−</button>
              <input type="number" class="form-control text-center" value="${i.quantity}" min="1" data-qty="${i.id}">
              <button class="btn btn-outline-secondary" data-inc="${i.id}">+</button>
            </div>
            <button class="btn btn-outline-danger ms-3" data-remove="${i.id}">Remove</button>
          </div>
        </div>`
        )
        .join('');
    }
    const cartNow = getCart();
    const { subtotal } = calcCartTotals(cartNow);
    subtotalEl.textContent = `₹${formatINR(subtotal)}`;
    deliveryEl.textContent = `₹${formatINR(cartNow.length ? delivery : 0)}`;
    totalEl.textContent = `₹${formatINR(subtotal + (cartNow.length ? delivery : 0))}`;
  }

  rerender();
  list.addEventListener('click', (e) => {
    const dec = e.target.closest('[data-dec]');
    const inc = e.target.closest('[data-inc]');
    const rem = e.target.closest('[data-remove]');
    if (dec) {
      const id = dec.getAttribute('data-dec');
      const item = getCart().find((x) => x.id === id);
      if (item) updateQuantity(id, Math.max(1, item.quantity - 1));
      rerender();
    }
    if (inc) {
      const id = inc.getAttribute('data-inc');
      const item = getCart().find((x) => x.id === id);
      if (item) updateQuantity(id, item.quantity + 1);
      rerender();
    }
    if (rem) {
      removeFromCart(rem.getAttribute('data-remove'));
      rerender();
      renderHeaderFooter('cart');
    }
  });

  list.addEventListener('change', (e) => {
    const input = e.target.closest('[data-qty]');
    if (!input) return;
    const id = input.getAttribute('data-qty');
    const val = parseInt(input.value, 10) || 1;
    updateQuantity(id, Math.max(1, val));
    rerender();
  });
}

function checkout() {
  const user = JSON.parse(localStorage.getItem('fg_user') || 'null');
  if (!user) {
    alert('Please login to complete checkout.');
    window.location.href = 'auth.html';
    return;
  }
  const cart = getCart();
  if (!cart.length) {
    alert('Your cart is empty.');
    return;
  }
  if (location.protocol === 'file:') {
    alert('Please run the server first (npm start) and open http://localhost:3000 to pay online.');
    return;
  }
  // Create Checkout Session on backend
  fetch('/api/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      items: cart.map((i) => ({ name: i.name, price: i.price, quantity: i.quantity })),
      successUrl: `${window.location.origin}/success.html`,
      cancelUrl: `${window.location.origin}/cancel.html`
    })
  })
    .then((r) => r.json())
    .then((res) => {
      if (res && res.url) {
        window.location.href = res.url;
      } else {
        const msg = res && res.error ? res.error : 'Failed to start checkout';
        if (String(msg).toLowerCase().includes('stripe not configured')) {
          alert('Payment is not configured. Set STRIPE_SECRET_KEY in .env and restart the server.');
        } else {
          alert(msg);
        }
      }
    })
    .catch((e) => {
      console.error(e);
      alert('Checkout failed. Please ensure the server is running (npm start) and try again.');
    });
}

// Razorpay checkout (India)
function checkoutRazorpay() {
  const user = JSON.parse(localStorage.getItem('fg_user') || 'null');
  if (!user) {
    alert('Please login to complete checkout.');
    window.location.href = 'auth.html';
    return;
  }
  const cart = getCart();
  if (!cart.length) {
    alert('Your cart is empty.');
    return;
  }
  if (location.protocol === 'file:') {
    alert('Please run the server first (npm start) and open http://localhost:3000 to pay online.');
    return;
  }

  // Get Razorpay key
  fetch('/api/razorpay/key')
    .then((r) => r.json())
    .then((k) => {
      if (!k || !k.keyId) throw new Error(k.error || 'Razorpay not configured');
      // Create backend order (amount in paise)
      return fetch('/api/razorpay/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cart.map((i) => ({ name: i.name, price: i.price, quantity: i.quantity })), receipt: `rcp_${Date.now()}` })
      }).then((r) => r.json()).then((order) => ({ keyId: k.keyId, order }));
    })
    .then(({ keyId, order }) => {
      if (!order || !order.id) throw new Error(order.error || 'Failed to create order');
      const rzp = new window.Razorpay({
        key: keyId,
        amount: order.amount,
        currency: order.currency,
        name: 'All Ahmedabad Food Delivery',
        description: 'Order payment',
        order_id: order.id,
        prefill: { name: user.name || 'Customer', email: user.email || '' },
        handler: function () {
          // Payment captured
          localStorage.removeItem('fg_cart');
          renderHeaderFooter('cart');
          window.location.href = 'success.html';
        }
      });
      rzp.open();
    })
    .catch((e) => {
      console.error(e);
      alert('Razorpay checkout failed: ' + (e.message || e));
    });
}

function checkoutRazorpayWithAddress(address) {
  const user = JSON.parse(localStorage.getItem('fg_user') || 'null');
  const cart = getCart();
  if (!user || !cart.length) return;
  fetch('/api/razorpay/key')
    .then((r) => r.json())
    .then((k) => {
      if (!k || !k.keyId) throw new Error(k.error || 'Razorpay not configured');
      return fetch('/api/razorpay/order', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cart.map((i) => ({ name: i.name, price: i.price, quantity: i.quantity })), receipt: `rcp_${Date.now()}`, address })
      }).then((r) => r.json()).then((order) => ({ keyId: k.keyId, order }));
    })
    .then(({ keyId, order }) => {
      if (!order || !order.id) throw new Error(order.error || 'Failed to create order');
      const rzp = new window.Razorpay({
        key: keyId,
        amount: order.amount,
        currency: order.currency,
        name: 'All Ahmedabad Food Delivery',
        description: 'Order payment',
        order_id: order.id,
        notes: address,
        prefill: { name: user.name || 'Customer', email: user.email || '' },
        handler: function () {
          localStorage.removeItem('fg_cart');
          renderHeaderFooter('cart');
          localStorage.setItem('fg_last_order_address', JSON.stringify(address));
          window.location.href = 'success.html';
        }
      });
      rzp.open();
    })
    .catch((e) => { console.error(e); alert('Razorpay checkout failed: ' + (e.message || e)); });
}

// Auth
function bindAuthForms() {
  const login = document.getElementById('login-form');
  const signup = document.getElementById('signup-form');
  if (login) {
    login.addEventListener('submit', (e) => {
      e.preventDefault();
      const [emailEl, passEl] = login.querySelectorAll('input');
      const email = emailEl.value.trim();
      const password = passEl.value;
      const users = JSON.parse(localStorage.getItem('fg_users') || '{}');
      if (!users[email] || users[email].password !== password) {
        alert('Invalid credentials');
        return;
      }
      localStorage.setItem('fg_user', JSON.stringify({ email, name: users[email].name }));
      window.location.href = 'index.html';
    });
  }
  if (signup) {
    signup.addEventListener('submit', (e) => {
      e.preventDefault();
      const [nameEl, emailEl, passEl] = signup.querySelectorAll('input');
      const name = nameEl.value.trim();
      const email = emailEl.value.trim();
      const password = passEl.value;
      const users = JSON.parse(localStorage.getItem('fg_users') || '{}');
      if (users[email]) {
        alert('Account already exists. Please login.');
        return;
      }
      users[email] = { name, password };
      localStorage.setItem('fg_users', JSON.stringify(users));
      localStorage.setItem('fg_user', JSON.stringify({ email, name }));
      window.location.href = 'index.html';
    });
  }
}


