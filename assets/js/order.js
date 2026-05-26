// ─────────────────────────────────────────
// order.js — Logika halaman order & cart
//            (pages/client/order.html,
//             pages/client/cart.html)
// ─────────────────────────────────────────

// ═══════════════════════════════════════
// STATE
// ═══════════════════════════════════════
let allProducts  = [];   // data produk dari API
let currentKat   = 'semua';
let currentView  = 'grid';
let searchQuery  = '';

// ═══════════════════════════════════════
// INIT — HALAMAN ORDER (catalog produk)
// ═══════════════════════════════════════

async function initOrderPage() {
  requireAuth('pembeli'); // route guard

  try {
    // Ambil produk dari backend
    const data = await ProductAPI.getAll();
    allProducts = data.products || data; // sesuaikan struktur API

    // Ambil kategori
    const catData = await ProductAPI.getCategories();
    renderKategori(catData.categories || catData);

    renderProducts();

  } catch (err) {
    console.error('Gagal load produk:', err.message);
    showToast('Gagal memuat produk. Coba lagi.', 'error');
  }
}

// ─── Render filter kategori
function renderKategori(categories) {
  const strip = document.getElementById('kat-strip');
  if (!strip) return;
  strip.innerHTML = '';

  const all = document.createElement('button');
  all.className = 'kat-pill active';
  all.textContent = '🌾 Semua';
  all.onclick = () => filterKat('semua', all);
  strip.appendChild(all);

  categories.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'kat-pill';
    btn.textContent = `${cat.emoji || ''} ${cat.name}`;
    btn.onclick = () => filterKat(cat.slug, btn);
    strip.appendChild(btn);
  });
}

// ─── Filter kategori
function filterKat(slug, btn) {
  currentKat = slug;
  document.querySelectorAll('.kat-pill').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderProducts();
}

// ─── Toggle view grid/list
function setView(v) {
  currentView = v;
  renderProducts();
}

// ─── Render produk sesuai filter & search
function renderProducts() {
  const q = searchQuery.toLowerCase();
  let filtered = allProducts.filter(p => {
    const katOk = currentKat === 'semua' || p.category_slug === currentKat || p.category?.slug === currentKat;
    const qOk   = p.name.toLowerCase().includes(q);
    return katOk && qOk && p.is_available;
  });

  // Sort
  const sort = document.getElementById('sort-sel')?.value;
  if (sort === 'price-asc')  filtered.sort((a, b) => a.price - b.price);
  if (sort === 'price-desc') filtered.sort((a, b) => b.price - a.price);
  if (sort === 'name')       filtered.sort((a, b) => a.name.localeCompare(b.name));

  const count = document.getElementById('result-count');
  if (count) count.textContent = `${filtered.length} produk ditemukan`;

  const container = document.getElementById('prod-container');
  if (!container) return;

  if (filtered.length === 0) {
    container.innerHTML = `<div class="empty-state"><div class="es-icon">🌾</div><p>Produk tidak ditemukan</p></div>`;
    return;
  }

  container.className = currentView === 'grid' ? 'prod-grid' : '';
  container.innerHTML = filtered.map(p => renderProductCard(p)).join('');

  // Re-init reveal
  document.querySelectorAll('#prod-container .reveal').forEach(el => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
    }, { threshold: 0.1 });
    obs.observe(el);
  });
}

// ─── Template card produk (grid)
function renderProductCard(p) {
  const qty = Cart.getAll().find(c => c.id === p.id)?.qty || 0;
  const priceStr = formatRupiah(p.price);

  return `<div class="prod-card reveal">
    <div class="prod-thumb" style="background:${p.bg_color || '#FFF8E8'}">
      ${p.image_url ? `<img src="${p.image_url}" style="height:100%;object-fit:cover;width:100%"/>` : p.emoji || '🌾'}
    </div>
    <div class="prod-body">
      <div class="prod-cat">${p.category?.name || ''}</div>
      <div class="prod-name">${p.name}</div>
      <div class="prod-var">${p.description || ''}</div>
      <div class="prod-mitra">🤝 ${p.mitra?.store_name || 'Mitra Terpercaya'}</div>
      <div class="prod-footer">
        <div>
          <div class="prod-price">${priceStr}</div>
          <div class="prod-unit">/${p.unit}</div>
        </div>
        ${qty === 0
          ? `<button class="prod-btn" onclick="addToCartFromPage(${p.id},'${p.name}',${p.price})">+</button>`
          : `<div class="qty-ctrl">
              <button class="qty-btn" onclick="Cart.remove(${p.id},1);renderProducts()">−</button>
              <span class="qty-val">${qty}</span>
              <button class="qty-btn" onclick="Cart.add({id:${p.id},name:'${p.name}',price:${p.price}});renderProducts()">+</button>
            </div>`
        }
      </div>
    </div>
  </div>`;
}

function addToCartFromPage(id, name, price) {
  Cart.add({ id, name, price });
  renderProducts();
  showToast(`${name} ditambahkan ke keranjang!`);
}

// ═══════════════════════════════════════
// INIT — HALAMAN CART
// ═══════════════════════════════════════

async function initCartPage() {
  requireAuth('pembeli');
  renderCartItems();
  renderCartSummary();
}

// ─── Render item keranjang
function renderCartItems() {
  const cartList  = document.getElementById('cart-list');
  const emptyCart = document.getElementById('empty-cart');
  const items = Cart.getAll();

  if (!cartList) return;

  if (items.length === 0) {
    cartList.style.display = 'none';
    if (emptyCart) emptyCart.style.display = 'block';
    return;
  }
  cartList.style.display = 'block';
  if (emptyCart) emptyCart.style.display = 'none';

  cartList.innerHTML = items.map(item => `
    <div class="cart-item" id="cart-item-${item.id}">
      <div class="cart-thumb" style="background:#FFF8E8">${item.emoji || '🌾'}</div>
      <div style="flex:1">
        <div class="cart-name">${item.name}</div>
        <div class="cart-mitra">🤝 Mitra Terpercaya</div>
        <div class="cart-qty">
          <button class="qty-btn" onclick="updateCartQty(${item.id},-1)">−</button>
          <span style="font-weight:600;min-width:24px;text-align:center">${item.qty}</span>
          <button class="qty-btn" onclick="updateCartQty(${item.id},1)">+</button>
        </div>
      </div>
      <div style="text-align:right">
        <div class="cart-price">${formatRupiah(item.price * item.qty)}</div>
        <button class="btn btn-red btn-sm" style="margin-top:.35rem" onclick="removeCartItem(${item.id})">Hapus</button>
      </div>
    </div>`).join('');
}

// ─── Update qty item keranjang
function updateCartQty(id, delta) {
  const item = Cart.getAll().find(c => c.id === id);
  if (!item) return;
  Cart.setQty(id, item.qty + delta);
  renderCartItems();
  renderCartSummary();
}

// ─── Hapus item dari keranjang
function removeCartItem(id) {
  Cart.remove(id);
  renderCartItems();
  renderCartSummary();
}

// ─── Kosongkan keranjang
async function clearCartConfirm() {
  const ok = await confirmDialog('Kosongkan semua item di keranjang?', '🗑 Kosongkan');
  if (ok) {
    Cart.clear();
    renderCartItems();
    renderCartSummary();
  }
}

// ─── Render ringkasan bayar
function renderCartSummary() {
  const wrap = document.getElementById('summary-rows');
  if (!wrap) return;

  const items    = Cart.getAll();
  const subtotal = items.reduce((s, i) => s + (i.price || 0) * i.qty, 0);
  const ongkir   = subtotal > 0 ? 15000 : 0;
  const total    = subtotal + ongkir;

  wrap.innerHTML = `
    <div class="summary-row"><span>Subtotal (${Cart.count()} item)</span><span>${formatRupiah(subtotal)}</span></div>
    <div class="summary-row"><span>Ongkos Kirim</span><span>${formatRupiah(ongkir)}</span></div>
    <div class="summary-row total"><span>Total Bayar</span><span>${formatRupiah(total)}</span></div>`;
}

// ─── Checkout: generate QR QRIS
async function checkout() {
  if (Cart.count() === 0) {
    showToast('Keranjang masih kosong!', 'error');
    return;
  }
  const alamat = document.getElementById('alamat')?.value.trim();
  if (!alamat) {
    showToast('Mohon isi alamat pengiriman!', 'error');
    return;
  }

  const checkoutBtn = document.getElementById('checkout-btn');
  setLoading(checkoutBtn, true, 'Memproses...');

  try {
    // 1. Buat order dulu
    const items  = Cart.getAll();
    const ongkir = 15000;
    const total  = items.reduce((s, i) => s + (i.price || 0) * i.qty, 0) + ongkir;

    const orderData = {
      items: items.map(i => ({ product_id: i.id, quantity: i.qty, price_at_order: i.price })),
      delivery_address: alamat,
      total_price: total,
    };

    const order = await OrderAPI.create(orderData);

    // 2. Generate transaksi / QR
    const trx = await TransactionAPI.create(order.id);

    // 3. Tampilkan QR
    showQrisBox(trx, total);

  } catch (err) {
    console.error(err);
    showToast('Checkout gagal: ' + err.message, 'error');
  } finally {
    setLoading(checkoutBtn, false);
  }
}

// ─── Tampilkan QR box
function showQrisBox(trx, total) {
  const qrisBox = document.getElementById('qris-box');
  const checkoutBtn = document.getElementById('checkout-btn');
  if (!qrisBox) return;

  qrisBox.style.display = 'block';

  // Timer 15 menit
  let sec = 900;
  const timerEl = document.getElementById('qris-timer');
  const timerInt = setInterval(() => {
    sec--;
    if (timerEl) timerEl.textContent = `${String(Math.floor(sec/60)).padStart(2,'0')}:${String(sec%60).padStart(2,'0')}`;
    if (sec <= 0) {
      clearInterval(timerInt);
      showToast('QR kedaluwarsa! Silakan ulangi checkout.', 'error');
      qrisBox.style.display = 'none';
    }
  }, 1000);

  // Ganti tombol jadi konfirmasi
  if (checkoutBtn) {
    checkoutBtn.textContent = '✅ Sudah Bayar';
    checkoutBtn.onclick = async () => {
      clearInterval(timerInt);
      Cart.clear();
      showToast('Pembayaran berhasil! Pesanan sedang diproses.', 'success');
      setTimeout(() => window.location.href = 'history.html', 1500);
    };
  }
}

// ─── Debounced search
const debouncedSearch = debounce((q) => {
  searchQuery = q;
  renderProducts();
}, 300);