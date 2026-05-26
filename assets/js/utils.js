// ─────────────────────────────────────────
// utils.js — Fungsi helper reusable
// ─────────────────────────────────────────

// ═══════════════════════════════════════
// FORMAT ANGKA & TANGGAL
// ═══════════════════════════════════════

// Format angka ke Rupiah
// formatRupiah(65000) → "Rp 65.000"
function formatRupiah(angka, prefix = 'Rp ') {
  const number = parseFloat(angka);
  if (isNaN(number)) return prefix + '0';
  return prefix + number.toLocaleString('id-ID');
}

// Format tanggal ke bahasa Indonesia
// formatTanggal('2025-05-19') → "19 Mei 2025"
function formatTanggal(dateStr, withTime = false) {
  if (!dateStr) return '-';
  const d = new Date(dateStr);
  const months = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Ags','Sep','Okt','Nov','Des'];
  const base = `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  if (!withTime) return base;
  const h = String(d.getHours()).padStart(2,'0');
  const m = String(d.getMinutes()).padStart(2,'0');
  return `${base}, ${h}.${m}`;
}

// Format waktu relatif
// timeAgo('2025-05-19T10:00:00') → "2 jam lalu"
function timeAgo(dateStr) {
  const now   = new Date();
  const past  = new Date(dateStr);
  const diff  = Math.floor((now - past) / 1000); // detik
  if (diff < 60)   return `${diff} detik lalu`;
  if (diff < 3600) return `${Math.floor(diff/60)} menit lalu`;
  if (diff < 86400) return `${Math.floor(diff/3600)} jam lalu`;
  if (diff < 604800) return `${Math.floor(diff/86400)} hari lalu`;
  return formatTanggal(dateStr);
}

// Singkat angka besar
// shortNumber(1200000) → "1,2jt"
function shortNumber(n) {
  if (n >= 1_000_000_000) return (n / 1_000_000_000).toFixed(1) + 'M';
  if (n >= 1_000_000)     return (n / 1_000_000).toFixed(1) + 'jt';
  if (n >= 1_000)         return (n / 1_000).toFixed(0) + 'rb';
  return String(n);
}

// ═══════════════════════════════════════
// VALIDASI FORM
// ═══════════════════════════════════════

const Validate = {
  // Email valid
  email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),

  // Nomor HP Indonesia (08xx)
  phone: (v) => /^08[0-9]{8,11}$/.test(v.trim()),

  // Minimal karakter
  minLen: (v, n) => v.trim().length >= n,

  // Tidak kosong
  required: (v) => v.trim().length > 0,

  // Angka positif
  positiveNum: (v) => !isNaN(v) && Number(v) > 0,

  // Password minimal 8 karakter
  password: (v) => v.length >= 8,

  // Konfirmasi password sama
  passwordMatch: (a, b) => a === b,

  // Nomor rekening (minimal 5 digit angka)
  rekening: (v) => /^[0-9]{5,20}$/.test(v.trim()),
};

// Tampilkan error di field
// showFieldError('email', 'Email tidak valid')
function showFieldError(fieldId, msg, errId = null) {
  const input = document.getElementById(fieldId);
  const err   = document.getElementById(errId || `err-${fieldId}`);
  if (input) input.classList.add('error-field');
  if (err)   { err.textContent = '⚠ ' + msg; err.classList.add('show'); }
}

// Hapus error di field
function clearFieldError(fieldId, errId = null) {
  const input = document.getElementById(fieldId);
  const err   = document.getElementById(errId || `err-${fieldId}`);
  if (input) input.classList.remove('error-field');
  if (err)   err.classList.remove('show');
}

// Hapus semua error di form
function clearAllErrors() {
  document.querySelectorAll('.error-field').forEach(el => el.classList.remove('error-field'));
  document.querySelectorAll('.error-msg').forEach(el => el.classList.remove('show'));
  document.querySelectorAll('.alert').forEach(el => el.classList.remove('show'));
}

// ═══════════════════════════════════════
// CART (localStorage)
// ═══════════════════════════════════════

const Cart = {
  CART_KEY: 'panenku_cart',

  // Ambil semua item
  getAll() {
    return JSON.parse(localStorage.getItem(this.CART_KEY) || '[]');
  },

  // Total jumlah item
  count() {
    return this.getAll().reduce((s, i) => s + i.qty, 0);
  },

  // Total harga (perlu price per item)
  total(priceMap = {}) {
    return this.getAll().reduce((s, i) => s + (priceMap[i.id] || 0) * i.qty, 0);
  },

  // Tambah item
  add(item) { // item = { id, name, price?, qty? }
    const cart = this.getAll();
    const idx  = cart.findIndex(c => c.id === item.id);
    if (idx !== -1) cart[idx].qty += (item.qty || 1);
    else cart.push({ ...item, qty: item.qty || 1 });
    localStorage.setItem(this.CART_KEY, JSON.stringify(cart));
    this._updateBadge();
  },

  // Kurangi / hapus item
  remove(id, qty = null) {
    let cart = this.getAll();
    const idx = cart.findIndex(c => c.id === id);
    if (idx === -1) return;
    if (qty === null || cart[idx].qty <= qty) {
      cart.splice(idx, 1);
    } else {
      cart[idx].qty -= qty;
    }
    localStorage.setItem(this.CART_KEY, JSON.stringify(cart));
    this._updateBadge();
  },

  // Set qty langsung
  setQty(id, qty) {
    const cart = this.getAll();
    const idx  = cart.findIndex(c => c.id === id);
    if (idx === -1) return;
    if (qty <= 0) cart.splice(idx, 1);
    else cart[idx].qty = qty;
    localStorage.setItem(this.CART_KEY, JSON.stringify(cart));
    this._updateBadge();
  },

  // Kosongkan keranjang
  clear() {
    localStorage.removeItem(this.CART_KEY);
    this._updateBadge();
  },

  // Update badge counter di navbar
  _updateBadge() {
    const badges = document.querySelectorAll('#cart-count, #cart-badge, #float-count');
    badges.forEach(el => el.textContent = this.count());
  },
};

// ═══════════════════════════════════════
// UI HELPERS
// ═══════════════════════════════════════

// Loading state tombol
// setLoading(btn, true) → disable + spinner
function setLoading(btnOrId, loading, loadingText = 'Memproses...') {
  const btn = typeof btnOrId === 'string' ? document.getElementById(btnOrId) : btnOrId;
  if (!btn) return;
  if (loading) {
    btn._origText = btn.innerHTML;
    btn.disabled  = true;
    btn.innerHTML = `<span style="display:inline-block;width:16px;height:16px;border:2px solid rgba(255,255,255,.3);border-top-color:#fff;border-radius:50%;animation:spin .7s linear infinite;vertical-align:middle;margin-right:.35rem"></span>${loadingText}`;
  } else {
    btn.disabled  = false;
    btn.innerHTML = btn._origText || btn.innerHTML;
  }
}

// Toast notification
// showToast('Berhasil disimpan!', 'success')
function showToast(msg, type = 'success', duration = 3000) {
  const colors = { success: '#4A7C3F', error: '#C0392B', info: '#2471A3', warning: '#C8962A' };
  const toast = document.createElement('div');
  toast.style.cssText = `
    position:fixed;bottom:1.5rem;right:1.5rem;z-index:9000;
    background:${colors[type]||colors.success};color:#fff;
    padding:.75rem 1.25rem;border-radius:12px;font-family:DM Sans,sans-serif;
    font-size:.875rem;font-weight:500;
    box-shadow:0 8px 24px rgba(0,0,0,.2);
    transform:translateY(20px);opacity:0;transition:all .3s;
    display:flex;align-items:center;gap:.5rem;max-width:320px;
  `;
  toast.innerHTML = `<span>${type==='success'?'✅':type==='error'?'❌':type==='warning'?'⚠️':'ℹ️'}</span><span>${msg}</span>`;
  document.body.appendChild(toast);
  requestAnimationFrame(() => {
    toast.style.transform = 'translateY(0)';
    toast.style.opacity   = '1';
  });
  setTimeout(() => {
    toast.style.transform = 'translateY(20px)';
    toast.style.opacity   = '0';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// Konfirmasi dialog yang lebih cantik
// confirmDialog('Hapus produk ini?').then(ok => { if(ok) ... })
function confirmDialog(msg, confirmText = 'Ya, Lanjutkan', cancelText = 'Batal') {
  return new Promise((resolve) => {
    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(44,31,14,.5);z-index:9999;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(4px)';
    overlay.innerHTML = `
      <div style="background:#fff;border-radius:20px;padding:2rem;max-width:380px;width:90%;text-align:center;box-shadow:0 20px 60px rgba(0,0,0,.2)">
        <div style="font-size:2.5rem;margin-bottom:1rem">⚠️</div>
        <div style="font-family:Playfair Display,serif;font-size:1.1rem;font-weight:700;margin-bottom:.75rem;color:#2C1F0E">${msg}</div>
        <div style="display:flex;gap:.75rem;justify-content:center;margin-top:1.5rem">
          <button id="dlg-cancel" style="padding:.6rem 1.4rem;border-radius:10px;border:1.5px solid rgba(92,61,30,.2);background:#fff;font-family:DM Sans,sans-serif;cursor:pointer;font-size:.9rem">${cancelText}</button>
          <button id="dlg-ok" style="padding:.6rem 1.4rem;border-radius:10px;border:none;background:#5C3D1E;color:#fff;font-family:DM Sans,sans-serif;cursor:pointer;font-size:.9rem;font-weight:600">${confirmText}</button>
        </div>
      </div>`;
    document.body.appendChild(overlay);
    overlay.querySelector('#dlg-ok').onclick     = () => { overlay.remove(); resolve(true);  };
    overlay.querySelector('#dlg-cancel').onclick = () => { overlay.remove(); resolve(false); };
  });
}

// Scroll reveal observer
function initReveal() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 80);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

// Debounce — untuk search input
// const debouncedSearch = debounce(renderProds, 300);
function debounce(fn, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

// Truncate teks
// truncate('Beras Pandan Wangi Premium', 15) → "Beras Pandan Wa..."
function truncate(str, maxLen = 30) {
  return str.length <= maxLen ? str : str.slice(0, maxLen) + '...';
}

// Ambil query param dari URL
// getParam('role') → 'mitra'
function getParam(key) {
  return new URLSearchParams(window.location.search).get(key);
}

// ═══════════════════════════════════════
// AUTO-INIT
// ═══════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  initReveal();
  Cart._updateBadge();

  // Tambahkan keyframe spin jika belum ada
  if (!document.querySelector('#spin-style')) {
    const s = document.createElement('style');
    s.id = 'spin-style';
    s.textContent = '@keyframes spin{to{transform:rotate(360deg)}}';
    document.head.appendChild(s);
  }
});