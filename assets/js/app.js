// // Currency formatting (INR)
// function formatINR(value) {
//   try {
//     return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(Math.round(value));
//   } catch (e) {
//     return String(Math.round(value));
//   }
// }
// // Cart helpers
// function getCart() {
//   return JSON.parse(localStorage.getItem('fg_cart') || '[]');
// }

// function saveCart(cart) {
//   localStorage.setItem('fg_cart', JSON.stringify(cart));
// }

// function addToCart(item) {
//   const cart = getCart();
//   const index = cart.findIndex((i) => i.id === item.id);
//   if (index >= 0) {
//     cart[index].quantity += item.quantity || 1;
//   } else {
//     cart.push({ ...item, quantity: item.quantity || 1 });
//   }
//   saveCart(cart);
// }

// function removeFromCart(itemId) {
//   const cart = getCart().filter((i) => i.id !== itemId);
//   saveCart(cart);
// }

// function updateQuantity(itemId, quantity) {
//   const cart = getCart().map((i) => (i.id === itemId ? { ...i, quantity: Math.max(1, quantity) } : i));
//   saveCart(cart);
// }

// function calcCartTotals(cart) {
//   const subtotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
//   return { subtotal, total: subtotal };
// }

// // Image fallback helpers to avoid repeats and keep cuisine relevance
// function restaurantIdToCuisine(restaurantId) {
//   const r = (typeof RESTAURANTS !== 'undefined' ? RESTAURANTS : []).find((x) => x.id === restaurantId);
//   return r ? r.cuisine : 'General';
// }

// function fallbackForCuisine(cuisine) {
//   const map = {
//     Indian: 'https://images.unsplash.com/photo-1625944527949-929f4bc1b8a6?q=80&w=1200&auto=format&fit=crop',
//     Italian: 'https://images.unsplash.com/photo-1523986371872-9d3ba2e2f642?q=80&w=1200&auto=format&fit=crop',
//     Japanese: 'https://images.unsplash.com/photo-1544025162-16ecafe06b2e?q=80&w=1200&auto=format&fit=crop',
//     American: 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1200&auto=format&fit=crop',
//     Healthy: 'https://images.unsplash.com/photo-1543352634-8730f16cf9a6?q=80&w=1200&auto=format&fit=crop',
//     Mexican: 'https://images.unsplash.com/photo-1548940740-204726a19be3?q=80&w=1200&auto=format&fit=crop',
//     General: 'https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?q=80&w=1200&auto=format&fit=crop'
//   };
//   return map[cuisine] || map.General;
// }

// // Rendering components
// function restaurantCard(r) {
//   return `
//   <div class="col-12 col-sm-6 col-lg-4">
//     <div class="card h-100 card-restaurant shadow-sm">
//       <img src="${r.image}" class="card-img-top" alt="${r.name}" loading="lazy" onerror="this.onerror=null;this.src='${fallbackForCuisine(r.cuisine)}';">
//       <div class="card-body">
//         <div class="d-flex justify-content-between align-items-start">
//           <h5 class="card-title mb-1">${r.name}</h5>
//           <span class="badge">${r.rating} ★</span>
//         </div>
//         <div class="text-secondary small mb-2">${r.cuisine} • ${r.eta}</div>
//         <a href="menu.html?id=${r.id}" class="stretched-link"></a>
//       </div>
//     </div>
//   </div>`;
// }

// function dishCard(d, restaurantId) {
//   return `
//   <div class="col-12 col-sm-6 col-lg-4">
//     <div class="card h-100 card-dish shadow-sm">
//       <img src="${d.image}" class="card-img-top" alt="${d.name}" loading="lazy" onerror="this.onerror=null;this.src='${fallbackForCuisine(restaurantIdToCuisine(restaurantId))}';">
//       <div class="card-body d-flex flex-column">
//         <h5 class="card-title mb-1">${d.name}</h5>
//         <div class="text-secondary small mb-2">${d.desc}</div>
//         <div class="d-flex justify-content-between align-items-center mt-auto">
//           <span class="price">₹${formatINR(d.price)}</span>
//           <button class="btn btn-primary btn-sm" data-add="${d.id}" data-restaurant="${restaurantId}">Add to Cart</button>
//         </div>
//       </div>
//     </div>
//   </div>`;
// }

// // Home
// function renderFeaturedRestaurants(containerId, count = 6) {
//   const el = document.getElementById(containerId);
//   el.innerHTML = RESTAURANTS.slice(0, count).map(restaurantCard).join('');
// }

// function renderPopularDishes(containerId, count = 6) {
//   const dishes = Object.values(MENUS).flat().slice(0, count);
//   const el = document.getElementById(containerId);
//   el.innerHTML = dishes
//     .map((d) => {
//       // find restaurant owning dish
//       const restId = Object.keys(MENUS).find((rid) => MENUS[rid].some((x) => x.id === d.id));
//       return dishCard(d, restId);
//     })
//     .join('');
//   el.addEventListener('click', onAddToCartClick);
// }

// // Restaurants list
// function renderRestaurantList(containerId) {
//   const el = document.getElementById(containerId);
//   el.innerHTML = RESTAURANTS.map(restaurantCard).join('');
// }

// function filterRestaurants(containerId, query) {
//   const q = (query || '').toLowerCase();
//   const filtered = RESTAURANTS.filter((r) => r.name.toLowerCase().includes(q) || r.cuisine.toLowerCase().includes(q));
//   const el = document.getElementById(containerId);
//   el.innerHTML = filtered.map(restaurantCard).join('');
// }

// // Menu page
// function renderMenuPage() {
//   const params = new URLSearchParams(location.search);
//   const id = params.get('id') || RESTAURANTS[0].id;
//   const rest = RESTAURANTS.find((r) => r.id === id) || RESTAURANTS[0];
//   const hero = document.getElementById('restaurant-hero');
//   hero.innerHTML = `
//   <div class="rounded-4 overflow-hidden shadow-sm">
//     <img src="${rest.banner}" alt="${rest.name}" class="w-100" style="max-height: 260px; object-fit: cover;" loading="lazy" onerror="this.onerror=null;this.src='${fallbackForCuisine(rest.cuisine)}';">
//     <div class="p-3 border bg-white d-flex justify-content-between align-items-center">
//       <div>
//         <div class="h4 mb-0">${rest.name}</div>
//         <div class="text-secondary">${rest.cuisine} • <span class="rating">${rest.rating} ★</span> • ${rest.eta}</div>
//       </div>
//       <a href="restaurants.html" class="btn btn-outline-secondary">Back to Restaurants</a>
//     </div>
//   </div>`;

//   const menu = MENUS[id] || [];
//   const container = document.getElementById('menu-items');
//   container.innerHTML = menu.map((d) => dishCard(d, id)).join('');
//   container.addEventListener('click', onAddToCartClick);
// }

// function onAddToCartClick(e) {
//   const btn = e.target.closest('[data-add]');
//   if (!btn) return;
//   const dishId = btn.getAttribute('data-add');
//   const restId = btn.getAttribute('data-restaurant');
//   const dish = (MENUS[restId] || []).find((d) => d.id === dishId);
//   if (!dish) return;
//   addToCart({ id: dish.id, name: dish.name, price: dish.price, image: dish.image, restaurantId: restId, quantity: 1 });
//   // update header cart count immediately
//   if (typeof renderHeaderFooter === 'function') {
//     renderHeaderFooter();
//   }
//   // update mini-cart on menu page if it exists
//   const miniCartList = document.getElementById('cart-items');
//   const miniCartTotal = document.getElementById('cart-total');
//   const miniCartCount = document.getElementById('cart-count');
//   if (miniCartList && miniCartTotal && miniCartCount) {
//     renderMiniCart('cart-items', 'cart-total', 'cart-count');
//   }
//   // give quick feedback
//   btn.disabled = true;
//   btn.innerText = 'Added';
//   setTimeout(() => { btn.disabled = false; btn.innerText = 'Add to Cart'; }, 800);
// }

// // Mini-cart render (menu page)
// function renderMiniCart(listId, totalId, countId) {
//   const cart = getCart();
//   const list = document.getElementById(listId);
//   if (!list) return;
//   list.innerHTML = cart
//     .map(
//       (i) => `
//     <div class="d-flex align-items-center">
//       <img src="${i.image}" class="rounded me-3" style="width:56px;height:56px;object-fit:cover" alt="${i.name}">
//       <div class="flex-grow-1">
//         <div class="fw-semibold">${i.name}</div>
//         <div class="small text-secondary">₹${formatINR(i.price)} × ${i.quantity}</div>
//       </div>
//       <button class="btn btn-sm btn-outline-danger" data-remove="${i.id}">Remove</button>
//     </div>`
//     )
//     .join('');

//   const { subtotal } = calcCartTotals(cart);
//   const totalEl = document.getElementById(totalId);
//   if (totalEl) totalEl.textContent = `₹${formatINR(subtotal)}`;
//   const countEl = document.getElementById(countId);
//   if (countEl) countEl.textContent = cart.reduce((n, i) => n + i.quantity, 0);

//   list.addEventListener('click', (e) => {
//     const btn = e.target.closest('[data-remove]');
//     if (!btn) return;
//     removeFromCart(btn.getAttribute('data-remove'));
//     renderMiniCart(listId, totalId, countId);
//     renderHeaderFooter();
//   });
// }

// // Cart page
// function renderCartPage(listId, subtotalId, deliveryId, totalId) {
//   const delivery = 25; // INR
//   const list = document.getElementById(listId);
//   const subtotalEl = document.getElementById(subtotalId);
//   const deliveryEl = document.getElementById(deliveryId);
//   const totalEl = document.getElementById(totalId);

//   function rerender() {
//     const cart = getCart();
//     if (cart.length === 0) {
//       list.innerHTML = '<div class="alert alert-info">Your cart is empty. Browse restaurants to add items.</div>';
//     } else {
//       list.innerHTML = cart
//         .map(
//           (i) => `
//         <div class="card p-3">
//           <div class="d-flex align-items-center">
//             <img src="${i.image}" class="rounded me-3" style="width:80px;height:80px;object-fit:cover" alt="${i.name}">
//             <div class="flex-grow-1">
//               <div class="fw-semibold">${i.name}</div>
//               <div class="small text-secondary">₹${formatINR(i.price)}</div>
//             </div>
//             <div class="input-group" style="width: 140px;">
//               <button class="btn btn-outline-secondary" data-dec="${i.id}">−</button>
//               <input type="number" class="form-control text-center" value="${i.quantity}" min="1" data-qty="${i.id}">
//               <button class="btn btn-outline-secondary" data-inc="${i.id}">+</button>
//             </div>
//             <button class="btn btn-outline-danger ms-3" data-remove="${i.id}">Remove</button>
//           </div>
//         </div>`
//         )
//         .join('');
//     }
//     const cartNow = getCart();
//     const { subtotal } = calcCartTotals(cartNow);
//     subtotalEl.textContent = `₹${formatINR(subtotal)}`;
//     deliveryEl.textContent = `₹${formatINR(cartNow.length ? delivery : 0)}`;
//     totalEl.textContent = `₹${formatINR(subtotal + (cartNow.length ? delivery : 0))}`;
//   }

//   rerender();
//   list.addEventListener('click', (e) => {
//     const dec = e.target.closest('[data-dec]');
//     const inc = e.target.closest('[data-inc]');
//     const rem = e.target.closest('[data-remove]');
//     if (dec) {
//       const id = dec.getAttribute('data-dec');
//       const item = getCart().find((x) => x.id === id);
//       if (item) updateQuantity(id, Math.max(1, item.quantity - 1));
//       rerender();
//     }
//     if (inc) {
//       const id = inc.getAttribute('data-inc');
//       const item = getCart().find((x) => x.id === id);
//       if (item) updateQuantity(id, item.quantity + 1);
//       rerender();
//     }
//     if (rem) {
//       removeFromCart(rem.getAttribute('data-remove'));
//       rerender();
//       renderHeaderFooter('cart');
//     }
//   });

//   list.addEventListener('change', (e) => {
//     const input = e.target.closest('[data-qty]');
//     if (!input) return;
//     const id = input.getAttribute('data-qty');
//     const val = parseInt(input.value, 10) || 1;
//     updateQuantity(id, Math.max(1, val));
//     rerender();
//   });
// }

// function checkout() {
//   const user = JSON.parse(localStorage.getItem('fg_user') || 'null');
//   if (!user) {
//     alert('Please login to complete checkout.');
//     window.location.href = 'auth.html';
//     return;
//   }
//   const cart = getCart();
//   if (!cart.length) {
//     alert('Your cart is empty.');
//     return;
//   }
//   if (location.protocol === 'file:') {
//     alert('Please run the server first (npm start) and open http://localhost:3000 to pay online.');
//     return;
//   }
//   // Create Checkout Session on backend
//   fetch('/api/checkout', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({
//       items: cart.map((i) => ({ name: i.name, price: i.price, quantity: i.quantity })),
//       successUrl: `${window.location.origin}/success.html`,
//       cancelUrl: `${window.location.origin}/cancel.html`
//     })
//   })
//     .then((r) => r.json())
//     .then((res) => {
//       if (res && res.url) {
//         window.location.href = res.url;
//       } else {
//         const msg = res && res.error ? res.error : 'Failed to start checkout';
//         if (String(msg).toLowerCase().includes('stripe not configured')) {
//           alert('Payment is not configured. Set STRIPE_SECRET_KEY in .env and restart the server.');
//         } else {
//           alert(msg);
//         }
//       }
//     })
//     .catch((e) => {
//       console.error(e);
//       alert('Checkout failed. Please ensure the server is running (npm start) and try again.');
//     });
// }

// // Razorpay checkout (India)
// function checkoutRazorpay() {
//   const user = JSON.parse(localStorage.getItem('fg_user') || 'null');
//   if (!user) {
//     alert('Please login to complete checkout.');
//     window.location.href = 'auth.html';
//     return;
//   }
//   const cart = getCart();
//   if (!cart.length) {
//     alert('Your cart is empty.');
//     return;
//   }
//   if (location.protocol === 'file:') {
//     alert('Please run the server first (npm start) and open http://localhost:3000 to pay online.');
//     return;
//   }

//   // Get Razorpay key
//   fetch('/api/razorpay/key')
//     .then((r) => r.json())
//     .then((k) => {
//       if (!k || !k.keyId) throw new Error(k.error || 'Razorpay not configured');
//       // Create backend order (amount in paise)
//       return fetch('/api/razorpay/order', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ items: cart.map((i) => ({ name: i.name, price: i.price, quantity: i.quantity })), receipt: `rcp_${Date.now()}` })
//       }).then((r) => r.json()).then((order) => ({ keyId: k.keyId, order }));
//     })
//     .then(({ keyId, order }) => {
//       if (!order || !order.id) throw new Error(order.error || 'Failed to create order');
//       const rzp = new window.Razorpay({
//         key: keyId,
//         amount: order.amount,
//         currency: order.currency,
//         name: 'All Ahmedabad Food Delivery',
//         description: 'Order payment',
//         order_id: order.id,
//         prefill: { name: user.name || 'Customer', email: user.email || '' },
//         handler: function () {
//           // Payment captured
//           localStorage.removeItem('fg_cart');
//           renderHeaderFooter('cart');
//           window.location.href = 'success.html';
//         }
//       });
//       rzp.open();
//     })
//     .catch((e) => {
//       console.error(e);
//       alert('Razorpay checkout failed: ' + (e.message || e));
//     });
// }

// function checkoutRazorpayWithAddress(address) {
//   const user = JSON.parse(localStorage.getItem('fg_user') || 'null');
//   const cart = getCart();
//   if (!user || !cart.length) return;
//   fetch('/api/razorpay/key')
//     .then((r) => r.json())
//     .then((k) => {
//       if (!k || !k.keyId) throw new Error(k.error || 'Razorpay not configured');
//       return fetch('/api/razorpay/order', {
//         method: 'POST', headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ items: cart.map((i) => ({ name: i.name, price: i.price, quantity: i.quantity })), receipt: `rcp_${Date.now()}`, address })
//       }).then((r) => r.json()).then((order) => ({ keyId: k.keyId, order }));
//     })
//     .then(({ keyId, order }) => {
//       if (!order || !order.id) throw new Error(order.error || 'Failed to create order');
//       const rzp = new window.Razorpay({
//         key: keyId,
//         amount: order.amount,
//         currency: order.currency,
//         name: 'All Ahmedabad Food Delivery',
//         description: 'Order payment',
//         order_id: order.id,
//         notes: address,
//         prefill: { name: user.name || 'Customer', email: user.email || '' },
//         handler: function () {
//           localStorage.removeItem('fg_cart');
//           renderHeaderFooter('cart');
//           localStorage.setItem('fg_last_order_address', JSON.stringify(address));
//           window.location.href = 'success.html';
//         }
//       });
//       rzp.open();
//     })
//     .catch((e) => { console.error(e); alert('Razorpay checkout failed: ' + (e.message || e)); });
// }

// // Auth
// // assets/js/app.js mein purane functions ko isse replace karein

// async function bindAuthForms() {
//   const login = document.getElementById('login-form');
//   const signup = document.getElementById('signup-form');

//   if (login) {
//     login.addEventListener('submit', async (e) => {
//       e.preventDefault();
//       const [emailEl, passEl] = login.querySelectorAll('input');
//       const res = await fetch('/api/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email: emailEl.value, password: passEl.value })
//       });
//       const data = await res.json();
//       if (data.error) return alert(data.error);
//       localStorage.setItem('fg_user', JSON.stringify(data));
//       window.location.href = 'index.html';
//     });
//   }

//   if (signup) {
//     signup.addEventListener('submit', async (e) => {
//       e.preventDefault();
//       const [nameEl, emailEl, passEl] = signup.querySelectorAll('input');
//       const res = await fetch('/api/signup', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ name: nameEl.value, email: emailEl.value, password: passEl.value })
//       });
//       const data = await res.json();
//       if (data.error) return alert(data.error);
//       localStorage.setItem('fg_user', JSON.stringify(data));
//       window.location.href = 'index.html';
//     });
//   }
// }

// async function bindForgotForm() {
//   const form = document.getElementById('forgot-form');
//   if (!form) return;
  
//   form.addEventListener('submit', async (e) => {
//     e.preventDefault();
//     const email = document.getElementById('forgot-email').value;
//     const newPassword = document.getElementById('new-password').value;
    
//     const res = await fetch('/api/reset-password', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email, newPassword })
//     });
//     const data = await res.json();
//     if (data.error) return alert(data.error);
//     alert("Password updated! Please login.");
//     window.location.href = 'auth.html';
//   });
// }



// Professional message dikhane ke liye function
function showUIStatus(formId, message, type = 'danger') {
  const form = document.getElementById(formId);
  if (!form) return;

  // Purana message delete karein agar koi ho
  const existingMsg = form.querySelector('.status-msg');
  if (existingMsg) existingMsg.remove();

  // Naya alert create karein
  const msgDiv = document.createElement('div');
  msgDiv.className = `status-msg alert alert-${type} alert-dismissible fade show mt-3`;
  msgDiv.innerHTML = `
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  `;
  
  // Form ke sabse upar message insert karein
  form.prepend(msgDiv);
}

// ==========================================
// 1. UTILITY & FORMATTING
// ==========================================

function formatINR(value) {
  try {
    return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(Math.round(value));
  } catch (e) {
    return String(Math.round(value));
  }
}

// ==========================================
// 2. CART LOGIC (LocalStorage based)
// ==========================================

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

// ==========================================
// 3. IMAGE & UI HELPERS
// ==========================================

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

function restaurantCard(r) {
  return `
  <div class="col-12 col-sm-6 col-lg-4">
    <div class="card h-100 card-restaurant shadow-sm">
      <img src="${r.image}" class="card-img-top" alt="${r.name}" loading="lazy" onerror="this.onerror=null;this.src='${fallbackForCuisine(r.cuisine)}';">
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-start">
          <h5 class="card-title mb-1">${r.name}</h5>
          <span class="badge bg-success text-white">${r.rating} ★</span>
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
          <span class="price fw-bold text-dark">₹${formatINR(d.price)}</span>
          <button class="btn btn-primary btn-sm" data-add="${d.id}" data-restaurant="${restaurantId}">Add to Cart</button>
        </div>
      </div>
    </div>
  </div>`;
}

// ==========================================
// 4. RENDERING FUNCTIONS
// ==========================================

function renderFeaturedRestaurants(containerId, count = 6) {
  const el = document.getElementById(containerId);
  if (el) el.innerHTML = RESTAURANTS.slice(0, count).map(restaurantCard).join('');
}

function renderPopularDishes(containerId, count = 6) {
  const dishes = Object.values(MENUS).flat().slice(0, count);
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = dishes
    .map((d) => {
      const restId = Object.keys(MENUS).find((rid) => MENUS[rid].some((x) => x.id === d.id));
      return dishCard(d, restId);
    })
    .join('');
  el.addEventListener('click', onAddToCartClick);
}

function renderRestaurantList(containerId) {
  const el = document.getElementById(containerId);
  if (el) el.innerHTML = RESTAURANTS.map(restaurantCard).join('');
}

function filterRestaurants(containerId, query) {
  const q = (query || '').toLowerCase();
  const filtered = RESTAURANTS.filter((r) => r.name.toLowerCase().includes(q) || r.cuisine.toLowerCase().includes(q));
  const el = document.getElementById(containerId);
  if (el) el.innerHTML = filtered.map(restaurantCard).join('');
}

function renderMenuPage() {
  const params = new URLSearchParams(location.search);
  const id = params.get('id') || RESTAURANTS[0].id;
  const rest = RESTAURANTS.find((r) => r.id === id) || RESTAURANTS[0];
  const hero = document.getElementById('restaurant-hero');
  if (hero) {
    hero.innerHTML = `
    <div class="rounded-4 overflow-hidden shadow-sm">
      <img src="${rest.banner}" alt="${rest.name}" class="w-100" style="max-height: 260px; object-fit: cover;" loading="lazy" onerror="this.onerror=null;this.src='${fallbackForCuisine(rest.cuisine)}';">
      <div class="p-3 border bg-white d-flex justify-content-between align-items-center">
        <div>
          <div class="h4 mb-0">${rest.name}</div>
          <div class="text-secondary">${rest.cuisine} • <span class="text-warning">${rest.rating} ★</span> • ${rest.eta}</div>
        </div>
        <a href="restaurants.html" class="btn btn-outline-secondary">Back</a>
      </div>
    </div>`;
  }

  const menu = MENUS[id] || [];
  const container = document.getElementById('menu-items');
  if (container) {
    container.innerHTML = menu.map((d) => dishCard(d, id)).join('');
    container.addEventListener('click', onAddToCartClick);
  }
}

function onAddToCartClick(e) {
  const btn = e.target.closest('[data-add]');
  if (!btn) return;
  const dishId = btn.getAttribute('data-add');
  const restId = btn.getAttribute('data-restaurant');
  const dish = (MENUS[restId] || []).find((d) => d.id === dishId);
  if (!dish) return;
  addToCart({ id: dish.id, name: dish.name, price: dish.price, image: dish.image, restaurantId: restId, quantity: 1 });
  
  if (typeof renderHeaderFooter === 'function') renderHeaderFooter();
  renderMiniCart('cart-items', 'cart-total', 'cart-count');

  btn.disabled = true;
  btn.innerText = 'Added';
  setTimeout(() => { btn.disabled = false; btn.innerText = 'Add to Cart'; }, 800);
}

function renderMiniCart(listId, totalId, countId) {
  const cart = getCart();
  const list = document.getElementById(listId);
  if (!list) return;
  list.innerHTML = cart
    .map((i) => `
    <div class="d-flex align-items-center">
      <img src="${i.image}" class="rounded me-3" style="width:48px;height:48px;object-fit:cover" alt="${i.name}">
      <div class="flex-grow-1">
        <div class="fw-semibold small">${i.name}</div>
        <div class="small text-secondary">₹${formatINR(i.price)} × ${i.quantity}</div>
      </div>
      <button class="btn btn-sm btn-link text-danger p-0" data-remove="${i.id}"><i class="bi bi-trash"></i></button>
    </div>`).join('');

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
    if (typeof renderHeaderFooter === 'function') renderHeaderFooter();
  });
}

function renderCartPage(listId, subtotalId, deliveryId, totalId) {
  const deliveryFee = 25;
  const list = document.getElementById(listId);
  const subtotalEl = document.getElementById(subtotalId);
  const deliveryEl = document.getElementById(deliveryId);
  const totalEl = document.getElementById(totalId);

  function rerender() {
    const cart = getCart();
    if (cart.length === 0) {
      list.innerHTML = '<div class="alert alert-info">Cart is empty.</div>';
    } else {
      list.innerHTML = cart.map((i) => `
        <div class="card p-3 mb-3 shadow-sm border-0">
          <div class="d-flex align-items-center">
            <img src="${i.image}" class="rounded me-3" style="width:70px;height:70px;object-fit:cover">
            <div class="flex-grow-1">
              <div class="fw-bold">${i.name}</div>
              <div class="text-primary fw-semibold">₹${formatINR(i.price)}</div>
            </div>
            <div class="input-group input-group-sm" style="width: 110px;">
              <button class="btn btn-outline-secondary" data-dec="${i.id}">−</button>
              <input type="text" class="form-control text-center bg-white" value="${i.quantity}" readonly>
              <button class="btn btn-outline-secondary" data-inc="${i.id}">+</button>
            </div>
            <button class="btn btn-link text-danger ms-2" data-remove="${i.id}"><i class="bi bi-trash3 h5"></i></button>
          </div>
        </div>`).join('');
    }
    const cartNow = getCart();
    const { subtotal } = calcCartTotals(cartNow);
    if (subtotalEl) subtotalEl.textContent = `₹${formatINR(subtotal)}`;
    if (deliveryEl) deliveryEl.textContent = `₹${formatINR(cartNow.length ? deliveryFee : 0)}`;
    if (totalEl) totalEl.textContent = `₹${formatINR(subtotal + (cartNow.length ? deliveryFee : 0))}`;
  }

  rerender();
  if (list) {
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
        if (typeof renderHeaderFooter === 'function') renderHeaderFooter('cart');
      }
    });
  }
}

// ==========================================
// 5. CHECKOUT (STRIPE / RAZORPAY)
// ==========================================

async function checkoutRazorpayWithAddress(address) {
  const user = JSON.parse(localStorage.getItem('fg_user') || 'null');
  const cart = getCart();
  if (!user || !cart.length) return;

  try {
    const keyRes = await fetch('/api/razorpay/key');
    const k = await keyRes.json();
    if (!k.keyId) throw new Error(k.error || 'Razorpay not configured');

    const orderRes = await fetch('/api/razorpay/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: cart, address })
    });
    const order = await orderRes.json();
    if (!order.id) throw new Error(order.error || 'Failed to create order');

    const rzp = new window.Razorpay({
      key: k.keyId,
      amount: order.amount,
      currency: order.currency,
      name: 'All Ahmedabad Food Delivery',
      order_id: order.id,
      notes: address,
      prefill: { name: user.name, email: user.email },
      handler: function () {
        localStorage.removeItem('fg_cart');
        localStorage.setItem('fg_last_order_address', JSON.stringify(address));
        window.location.href = 'success.html';
      }
    });
    rzp.open();
  } catch (e) {
    alert('Razorpay failed: ' + e.message);
  }
}

// ==========================================
// 6. AUTHENTICATION (BACKEND API CONNECTED)
// ==========================================

async function bindAuthForms() {
  const login = document.getElementById('login-form');
  const signup = document.getElementById('signup-form');

  if (login) {
    login.addEventListener('submit', async (e) => {
      e.preventDefault();
      const [emailEl, passEl] = login.querySelectorAll('input');
      const emailValue = emailEl.value.trim().toLowerCase(); // Normalize input
      
      const btn = login.querySelector('button');
      btn.innerText = "Checking...";
      btn.disabled = true;

      try {
        const res = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: emailValue, password: passEl.value })
        });
        const data = await res.json();
        if (data.error) return alert(data.error);

        // Save profile and address if available from DB
        localStorage.setItem('fg_user', JSON.stringify({ name: data.name, email: data.email }));
        if (data.address) {
          localStorage.setItem('fg_address', JSON.stringify({
            mobile: data.mobile,
            line1: data.address.line1,
            city: data.address.city,
            pin: data.address.pin,
            landmark: data.address.landmark
          }));
        }
        window.location.href = 'index.html';
      } catch (err) {
        showUIStatus("Server error. Check connection.");
      } finally {
        btn.innerText = "Login";
        btn.disabled = false;
      }
    });
  }

  if (signup) {
    signup.addEventListener('submit', async (e) => {
      e.preventDefault();
      const [nameEl, emailEl, passEl] = signup.querySelectorAll('input');
      const emailValue = emailEl.value.trim().toLowerCase(); // Normalize input
      
      try {
        const res = await fetch('/api/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: nameEl.value.trim(), email: emailValue, password: passEl.value })
        });
        const data = await res.json();
        if (data.error) return alert(data.error);
        
        localStorage.setItem('fg_user', JSON.stringify(data));
        window.location.href = 'index.html';
      } catch (err) {
        showUIStatus("Signup failed. Check server.");
      }
    });
  }
}

async function bindForgotForm() {
  const form = document.getElementById('forgot-form');
  const verifyBtn = document.getElementById('btn-verify-email');
  const emailInput = document.getElementById('forgot-email');
  const emailStep = document.getElementById('email-step');
  const passwordStep = document.getElementById('password-step');

  if (!verifyBtn || !form) return;

  // STEP 1: Email Verify karna
  verifyBtn.addEventListener('click', async () => {
    const email = emailInput.value.trim().toLowerCase();
    if (!email) return showUIStatus('forgot-form', "Please email enter karein.");

    verifyBtn.innerText = "Checking...";
    verifyBtn.disabled = true;

    try {
      const res = await fetch('/api/check-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();

      if (!res.ok) {
        showUIStatus('forgot-form', data.error);
        verifyBtn.innerText = "Verify Email";
        verifyBtn.disabled = false;
      } else {
        // SUCCESS: Email mil gaya, ab step badlein
        emailStep.style.display = 'none';
        passwordStep.style.display = 'block';
        showUIStatus('forgot-form', "Email verified! Ab naya password set karein.", "success");
      }
    } catch (err) {
      showUIStatus('forgot-form', "Connection error.");
      verifyBtn.disabled = false;
    }
  });

  // STEP 2: Naya Password Submit karna
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = emailInput.value.trim().toLowerCase();
    const newPassword = document.getElementById('new-password').value;

    try {
      const res = await fetch('/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, newPassword })
      });
      const data = await res.json();

      if (!res.ok) {
        showUIStatus('forgot-form', data.error);
      } else {
        showUIStatus('forgot-form', "✅ Password updated! Redirecting to login...", "success");
        setTimeout(() => { window.location.href = 'auth.html'; }, 2000);
      }
    } catch (err) {
      showUIStatus('forgot-form', "Reset failed.");
    }
  });
}


async function loadProfileData() {
  const user = JSON.parse(localStorage.getItem('fg_user') || '{}');
  const addr = JSON.parse(localStorage.getItem('fg_address') || '{}');

  if (!user.email) return; // User login nahi hai toh kuch na karein

  // Profile fields bharein
  const nameEl = document.getElementById('prof-name');
  const mobileEl = document.getElementById('prof-mobile'); // ID check karein: prof-mobile
  const line1El = document.getElementById('prof-line1');
  const cityEl = document.getElementById('prof-city');
  const pinEl = document.getElementById('prof-pin');

  if (nameEl) nameEl.value = user.name || '';
  if (mobileEl) mobileEl.value = user.mobile || ''; // Yahan se phone number wapas aayega
  if (line1El) line1El.value = addr.line1 || '';
  if (cityEl) cityEl.value = addr.city || '';
  if (pinEl) pinEl.value = addr.pin || '';
}

async function bindProfileForm() {
  const form = document.getElementById('profile-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('fg_user'));
    
    const payload = {
      email: user.email,
      name: document.getElementById('prof-name').value,
      mobile: document.getElementById('prof-mobile').value,
      address: {
        line1: document.getElementById('prof-line1').value,
        city: document.getElementById('prof-city').value,
        pin: document.getElementById('prof-pin').value
      }
    };

    const res = await fetch('/api/profile/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const updatedUser = await res.json();

    // bindProfileForm ke andar 'res.ok' wala hissa check karein:
if (res.ok) {
  const updatedUser = await res.json(); // Database se updated data lein
  alert("✅ Profile details save ho gayi hain!");

  // LocalStorage ko update karein taaki refresh par data na jaye
  localStorage.setItem('fg_user', JSON.stringify({ 
    name: updatedUser.name, 
    email: updatedUser.email,
    mobile: updatedUser.mobile  // Mobile number save ho raha hai
  }));
  
  localStorage.setItem('fg_address', JSON.stringify(updatedUser.address));
}
  });
}



function checkLoginBeforeOrder() {
  const user = JSON.parse(localStorage.getItem('fg_user') || 'null');
  
  if (!user) {
    alert("Order karne ke liye pehle Login karein!");
    // User ko login page par bhej dein aur bataein ki wapas kahan aana hai
    window.location.href = 'auth.html';
    return false;
  }
  return true;
}

// 1. User ki email nikalne ke liye helper
function getUserSuffix() {
  const user = JSON.parse(localStorage.getItem('fg_user') || 'null');
  return user ? `_${user.email}` : '_guest';
}

// 2. Updated getCart
function getCart() {
  const cartKey = `fg_cart${getUserSuffix()}`;
  return JSON.parse(localStorage.getItem(cartKey) || '[]');
}

// 3. Updated saveCart
function saveCart(cart) {
  const cartKey = `fg_cart${getUserSuffix()}`;
  localStorage.setItem(cartKey, JSON.stringify(cart));
}

function addToCart(item) {
  const cart = getCart();
  const index = cart.findIndex((i) => i.id === item.id);
  if (index >= 0) {
    cart[index].quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }
  saveCart(cart);
  
  // NAYA: Item add hote hi badge update karein
  if (typeof updateCartBadge === 'function') {
    updateCartBadge();
  }
}