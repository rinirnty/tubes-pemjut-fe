// ─────────────────────────────────────────
// auth.js — Handle login, logout, session,
//           route guard, dan redirect role
// ─────────────────────────────────────────

// ── Storage keys
const TOKEN_KEY = 'panenku_token';
const ROLE_KEY  = 'panenku_role';
const USER_KEY  = 'panenku_user';

// ═══════════════════════════════════════
// SIMPAN & AMBIL SESSION
// ═══════════════════════════════════════

// Simpan session setelah login berhasil
function saveSession(token, role, user) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(ROLE_KEY, role);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

// Ambil token
function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

// Ambil role: 'admin' | 'mitra' | 'pembeli' | null
function getRole() {
  return localStorage.getItem(ROLE_KEY);
}

// Ambil data user
function getUser() {
  const u = localStorage.getItem(USER_KEY);
  return u ? JSON.parse(u) : null;
}

// Cek apakah sudah login
function isLoggedIn() {
  return !!getToken();
}

// Hapus semua session (logout)
function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(ROLE_KEY);
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem('panenku_cart');
}

// ═══════════════════════════════════════
// ROUTE GUARD
// ═══════════════════════════════════════

// Panggil di awal setiap halaman client/admin/mitra
// Contoh: requireAuth('pembeli');
function requireAuth(requiredRole = null) {
  if (!isLoggedIn()) {
    // Simpan halaman asal supaya bisa redirect balik setelah login
    sessionStorage.setItem('panenku_redirect', window.location.href);
    window.location.href = '/pages/auth/login.html';
    return false;
  }
  if (requiredRole && getRole() !== requiredRole) {
    // Role tidak sesuai → redirect ke dashboard role yang benar
    redirectToDashboard();
    return false;
  }
  return true;
}

// Redirect ke dashboard sesuai role
function redirectToDashboard() {
  const role = getRole();
  const routes = {
    pembeli: '/pages/client/dashboard.html',
    admin:   '/pages/admin/dashboard.html',
  };
  window.location.href = routes[role] || '/pages/auth/login.html';
}

// Jika halaman login/register diakses oleh user yang sudah login
// panggil ini di atas halaman auth
function redirectIfLoggedIn() {
  if (isLoggedIn()) redirectToDashboard();
}

// ═══════════════════════════════════════
// LOGIN
// ═══════════════════════════════════════

async function handleLogin(email, password, role) {
  try {
    // Panggil API
    const data = await AuthAPI.login(email, password, role);

    // Simpan session
    saveSession(data.token, data.user.role, data.user);

    // Redirect ke halaman yang dituju (jika ada) atau dashboard
    const redirect = sessionStorage.getItem('panenku_redirect');
    sessionStorage.removeItem('panenku_redirect');
    window.location.href = redirect || getDashboardUrl(data.user.role);

  } catch (err) {
    throw err; // lempar ke pemanggil untuk ditampilkan di UI
  }
}

function getDashboardUrl(role) {
  const routes = {
    pembeli: '/pages/client/dashboard.html',
    admin:   '/pages/admin/dashboard.html',
  };
  return routes[role] || '/pages/auth/login.html';
}

// ═══════════════════════════════════════
// REGISTER
// ═══════════════════════════════════════

async function handleRegister(formData, role) {
  try {
    if (role === 'mitra') {
      await AuthAPI.registerMitra(formData);
    } else {
      await AuthAPI.register(formData);
    }
    // Arahkan ke login setelah register berhasil
    return true;
  } catch (err) {
    throw err;
  }
}

// ═══════════════════════════════════════
// LOGOUT
// ═══════════════════════════════════════

function logout() {
  clearSession();
  window.location.href = '/pages/auth/login.html';
}

// ═══════════════════════════════════════
// GOOGLE OAUTH
// ═══════════════════════════════════════

// Callback dari Google Identity Services
async function handleGoogleCallback(googleResponse) {
  try {
    const data = await AuthAPI.googleLogin(googleResponse.credential);
    saveSession(data.token, data.user.role, data.user);
    window.location.href = getDashboardUrl(data.user.role);
  } catch (err) {
    console.error('Google login gagal:', err.message);
    showAuthError('Login Google gagal. Silakan coba lagi.');
  }
}

// ═══════════════════════════════════════
// TAMPILKAN INFO USER DI UI
// ═══════════════════════════════════════

// Isi nama & email di sidebar setelah load
function populateUserInfo() {
  const user = getUser();
  if (!user) return;

  const nameEls  = document.querySelectorAll('.user-name, .admin-name');
  const emailEls = document.querySelectorAll('.user-email, .admin-email');

  nameEls.forEach(el  => el.textContent = user.name  || 'Pengguna');
  emailEls.forEach(el => el.textContent = user.email || '');
}

// ═══════════════════════════════════════
// HELPER UI
// ═══════════════════════════════════════

function showAuthError(msg) {
  const el = document.getElementById('alert-error');
  const msgEl = document.getElementById('alert-msg');
  if (el && msgEl) {
    msgEl.textContent = msg;
    el.classList.add('show');
    setTimeout(() => el.classList.remove('show'), 4000);
  }
}

function showAuthSuccess(msg) {
  const el = document.getElementById('alert-success');
  const msgEl = document.getElementById('alert-ok');
  if (el && msgEl) {
    msgEl.textContent = msg;
    el.classList.add('show');
  }
}

// ═══════════════════════════════════════
// AUTO-INIT saat halaman load
// ═══════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
  // Isi info user di UI
  populateUserInfo();

  // Bind semua tombol logout
  document.querySelectorAll('.btn-logout, [data-logout]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (confirm('Yakin ingin keluar?')) logout();
    });
  });
});