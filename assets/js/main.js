// ─────────────────────────────────────────
// main.js — Global init yang dijalankan
//           di semua halaman publik
// ─────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {

  // ── Navbar scroll shadow
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 30);
    });
  }

  // ── Update cart badge di navbar
  Cart._updateBadge();

  // ── Smooth scroll untuk anchor link
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ── Jika user sudah login, ubah tombol nav
  if (isLoggedIn()) {
    const loginBtn = document.querySelector('a[href*="login"]');
    const regBtn   = document.querySelector('a[href*="register"]');
    if (loginBtn) { loginBtn.textContent = 'Dashboard'; loginBtn.href = getDashboardUrl(getRole()); }
    if (regBtn)   regBtn.style.display = 'none';
  }

  // ── Scroll reveal
  initReveal();
});