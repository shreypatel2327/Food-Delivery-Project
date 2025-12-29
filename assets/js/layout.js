// function renderHeaderFooter(active = '') {
//   const user = JSON.parse(localStorage.getItem('fg_user') || 'null');
//   const cart = JSON.parse(localStorage.getItem('fg_cart') || '[]');
//   const cartCount = cart.reduce((n, i) => n + i.quantity, 0);

//   const header = document.getElementById('app-header');
//   header.innerHTML = `
//   <nav class="navbar navbar-expand-lg navbar-light bg-white border-bottom sticky-top">
//     <div class="container">
//       <a class="navbar-brand fw-bold" href="index.html">All Ahmedabad <span>Food Delivery</span></a>
//       <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
//         <span class="navbar-toggler-icon"></span>
//       </button>
//       <div class="collapse navbar-collapse" id="navbarNav">
//         <ul class="navbar-nav me-auto mb-2 mb-lg-0">
//           <li class="nav-item"><a class="nav-link ${active==='home'?'active':''}" href="index.html">Home</a></li>
//           <li class="nav-item"><a class="nav-link ${active==='restaurants'?'active':''}" href="restaurants.html">Restaurants</a></li>
//         </ul>
//         <ul class="navbar-nav ms-auto align-items-lg-center">
//           <li class="nav-item me-lg-2"><a class="nav-link ${active==='cart'?'active':''}" href="cart.html">Cart <span class="badge bg-primary ms-1">${cartCount}</span></a></li>
//           <li class="nav-item">
//             ${user ? `<a class="btn btn-outline-secondary" id="btn-logout" href="#">Logout</a>` : `<a class="btn btn-primary" href="auth.html">Login / Signup</a>`}
//           </li>
//         </ul>
//       </div>
//     </div>
//   </nav>`;

//   const footer = document.getElementById('app-footer');
//   footer.innerHTML = `
//   <div class="">
//     <div class="container d-flex flex-column flex-md-row justify-content-between align-items-start gap-3">
//       <div>
//         <div class="h5">All Ahmedabad <span>Food Delivery</span></div>
//         <div class="small text-secondary">Delicious food delivered fast across Ahmedabad</div>
//       </div>
//       <div class="small">
//         <div>Contact: hello@foodgo.example</div>
//         <div>Follow: <a href="#">Instagram</a> · <a href="#">Twitter</a> · <a href="#">Facebook</a></div>
//       </div>
//     </div>
//   </div>`;

//   const logoutBtn = document.getElementById('btn-logout');
//   if (logoutBtn) {
//     logoutBtn.addEventListener('click', function (e) {
//       e.preventDefault();
//       localStorage.removeItem('fg_user');
//       window.location.href = 'index.html';
//     });
//   }
// }

function renderHeaderFooter(active = '') {
  const user = JSON.parse(localStorage.getItem('fg_user') || 'null');
  
  // Cart count nikalne ke liye getCart() function ka use karein (Email safe)
  const cart = typeof getCart === 'function' ? getCart() : JSON.parse(localStorage.getItem('fg_cart') || '[]');
  const cartCount = cart.reduce((n, i) => n + i.quantity, 0);

  // --- HEADER (Old Position & Theme) ---
  const header = document.getElementById('app-header');
  if (header) {
    header.innerHTML = `
    <nav class="navbar navbar-expand-lg navbar-light bg-white border-bottom sticky-top">
      <div class="container">
        <a class="navbar-brand fw-bold" href="index.html">All Ahmedabad <span>Food Delivery</span></a>
        
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item"><a class="nav-link ${active === 'home' ? 'active' : ''}" href="index.html">Home</a></li>
            <li class="nav-item"><a class="nav-link ${active === 'restaurants' ? 'active' : ''}" href="restaurants.html">Restaurants</a></li>
            <li class="nav-item"><a class="nav-link ${active === 'contact' ? 'active' : ''}" href="contact.html">Contact Us</a></li>
          </ul>

          <ul class="navbar-nav ms-auto align-items-lg-center">
            <li class="nav-item me-lg-2">
              <a class="nav-link ${active === 'cart' ? 'active' : ''}" href="cart.html">
                Cart <span class="badge bg-primary ms-1">${cartCount}</span>
              </a>
            </li>
            
            ${user ? `
              <li class="nav-item me-lg-2">
                <a class="nav-link ${active === 'profile' ? 'active' : ''}" href="profile.html">My Profile</a>
              </li>
              <li class="nav-item">
                <a class="btn btn-outline-secondary" id="btn-logout" href="#">Logout</a>
              </li>
            ` : `
              <li class="nav-item">
                <a class="btn btn-primary" href="auth.html">Login / Signup</a>
              </li>
            `}
          </ul>
        </div>
      </div>
    </nav>`;

    // Logout Event Listener
    const logoutBtn = document.getElementById('btn-logout');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', function (e) {
        e.preventDefault();
        logoutUser(); // Global logout function call karein
      });
    }
  }

  // --- FOOTER (Old Simple Design) ---
  const footer = document.getElementById('app-footer');
  if (footer) {
    footer.innerHTML = `
    <div class="py-5 border-top mt-5"> <div class="container d-flex flex-column flex-md-row justify-content-between align-items-start gap-3">
        <div>
          <div class="h5">All Ahmedabad <span>Food Delivery</span></div>
          <div class="small text-secondary">Delicious food delivered fast across Ahmedabad</div>
        </div>
        <div class="small text-secondary">
          <div>Contact: hello@foodgo.example</div>
          <div><a href="contact.html" class="text-decoration-none text-secondary">Support / Contact Us</a></div>
          <div>Follow: <a href="#" class="text-secondary">Instagram</a> · <a href="#" class="text-secondary">Twitter</a></div>
        </div>
      </div>
    </div>`;
  }

  // Symbol update karein
  if (typeof updateCartBadge === 'function') {
    updateCartBadge();
  }
}

// Global Logout Function
function logoutUser() {
  localStorage.removeItem('fg_user');
  localStorage.removeItem('fg_address');
  alert("Logged out successfully!");
  window.location.href = 'index.html';
}

// Cart badge refresh logic
function updateCartBadge() {
  const cart = typeof getCart === 'function' ? getCart() : [];
  const cartCount = cart.reduce((n, i) => n + i.quantity, 0);
  
  const badge = document.querySelector('.navbar .badge');
  if (badge) {
    badge.innerText = cartCount;
    badge.style.display = cartCount > 0 ? 'inline-block' : 'none';
  }
}