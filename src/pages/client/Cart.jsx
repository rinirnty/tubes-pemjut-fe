import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SidebarClient from "../../components/SidebarClient";

const PRICEDB = {
  1: 13000,
  2: 28000,
  3: 8000,
  4: 22000,
  5: 5000,
  6: 32000,
  7: 11000,
  8: 9000,
  9: 9600,
};
const NAMEDB = {
  1: "Beras Pandan Wangi",
  2: "Beras Ketan Putih",
  3: "Ubi Jalar Merah",
  4: "Beras Merah Organik",
  5: "Singkong Segar",
  6: "Beras Ketan Hitam",
  7: "Beras IR 64",
  8: "Ubi Jalar Ungu",
  9: "Beras Pera Lokal",
};
const EMOJIDB = {
  1: "🍚",
  2: "🌾",
  3: "🍠",
  4: "🌿",
  5: "🟤",
  6: "🍚",
  7: "🍚",
  8: "🍠",
  9: "🍚",
};
const BGDB = {
  1: "#FFF8E8",
  2: "#F0F8E8",
  3: "#FFF0E8",
  4: "#F0F5E8",
  5: "#F5EDE0",
  6: "#F0EEF8",
  7: "#FFF8E8",
  8: "#F5E8FF",
  9: "#FFF8E8",
};

function ClientCart() {
  const [cart, setCart] = useState(() =>
    JSON.parse(localStorage.getItem("panenku_cart") || "[]"),
  );
  const [showQr, setShowQr] = useState(false);
  const [countdown, setCountdown] = useState(900);

  const saveCart = (newCart) => {
    localStorage.setItem("panenku_cart", JSON.stringify(newCart));
    setCart(newCart);
    window.dispatchEvent(new CustomEvent("panenku-cart-updated"));
  };

  const changeQty = (id, delta) => {
    const newCart = [...cart];
    const index = newCart.findIndex((item) => item.id === id);
    if (index !== -1) {
      newCart[index].qty += delta;
      if (newCart[index].qty <= 0) newCart.splice(index, 1);
    }
    saveCart(newCart);
  };

  const removeItem = (id) => {
    const newCart = cart.filter((item) => item.id !== id);
    saveCart(newCart);
  };

  const clearCart = () => {
    if (confirm("Kosongkan keranjang?")) {
      saveCart([]);
    }
  };

  const total = cart.reduce(
    (sum, item) => sum + (PRICEDB[item.id] || 0) * item.qty,
    0,
  );
  const ongkir = 15000;
  const finalTotal = total + ongkir;

  const formatRupiah = (n) => "Rp " + n.toLocaleString("id-ID");

  useEffect(() => {
    let timer;
    if (showQr && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (showQr && countdown === 0) {
      alert("QR kedaluwarsa! Silakan ulangi.");
      setShowQr(false);
      setCountdown(900);
    }
    return () => clearTimeout(timer);
  }, [showQr, countdown]);

  const checkout = () => {
    if (cart.length === 0) {
      alert("Keranjang masih kosong!");
      return;
    }
    setShowQr(true);
  };

  const confirmPayment = () => {
    alert("Pembayaran berhasil! Pesanan sedang diproses.");
    saveCart([]);
    window.location.href = "/client/history";
  };

  const formatCountdown = () => {
    const m = String(Math.floor(countdown / 60)).padStart(2, "0");
    const s = String(countdown % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", overflow: "hidden" }}>
      <SidebarClient />
      <div className="main">
        <div className="topbar">
          <div>
            <div className="page-title">Keranjang Belanja</div>
            <div className="breadcrumb">Periksa pesanan sebelum checkout</div>
          </div>
          <div className="topbar-right">
            <Link to="/client/cart" className="topbar-btn" title="Keranjang">
              🛒<div className="notif-dot"></div>
            </Link>
            <div className="topbar-btn" title="Notifikasi">
              🔔
            </div>
          </div>
        </div>
        <div className="page-content">
          <div className="grid-2 reveal" style={{ alignItems: "start" }}>
            <div>
              <div className="card" style={{ marginBottom: "1.25rem" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "1rem",
                  }}
                >
                  <div className="section-title" style={{ margin: 0 }}>
                    🛒 Keranjang Belanja
                  </div>
                  <button className="btn btn-red btn-sm" onClick={clearCart}>
                    🗑 Kosongkan
                  </button>
                </div>
                {cart.length === 0 ? (
                  <div className="empty-state">
                    <div className="es-icon">🛒</div>
                    <p>Keranjang masih kosong</p>
                    <Link
                      to="/client/order"
                      className="btn btn-primary"
                      style={{ marginTop: ".75rem" }}
                    >
                      🌾 Mulai Belanja
                    </Link>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="cart-item">
                      <div
                        className="cart-thumb"
                        style={{ background: BGDB[item.id] || "#EEE" }}
                      >
                        {EMOJIDB[item.id] || "🌾"}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div className="cart-name">
                          {NAMEDB[item.id] || item.name}
                        </div>
                        <div className="cart-qty">
                          <button
                            className="qty-btn"
                            onClick={() => changeQty(item.id, -1)}
                          >
                            −
                          </button>
                          <span
                            style={{
                              fontWeight: 600,
                              minWidth: "24px",
                              textAlign: "center",
                            }}
                          >
                            {item.qty}
                          </span>
                          <button
                            className="qty-btn"
                            onClick={() => changeQty(item.id, 1)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div className="cart-price">
                          {formatRupiah((PRICEDB[item.id] || 0) * item.qty)}
                        </div>
                        <button
                          className="btn btn-red btn-sm"
                          style={{ marginTop: ".35rem" }}
                          onClick={() => removeItem(item.id)}
                        >
                          Hapus
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="card reveal">
                <div className="section-title">📍 Alamat Pengiriman</div>
                <div className="form-field">
                  <label>Alamat Lengkap</label>
                  <textarea
                    rows="3"
                    style={{
                      border: "1.5px solid var(--border)",
                      borderRadius: "10px",
                      width: "100%",
                      padding: ".65rem .9rem",
                      fontFamily: "DM Sans, sans-serif",
                      fontSize: ".875rem",
                      outline: "none",
                      resize: "none",
                    }}
                    defaultValue="Jl. Merdeka No.5, RT 03/04, Kel. Sukajadi, Kec. Sukajadi, Bandung 40163"
                  />
                </div>
                <div className="form-row">
                  <div className="form-field">
                    <label>Catatan Pesanan</label>
                    <input
                      type="text"
                      placeholder="Contoh: Tolong dibungkus rapat"
                      style={{
                        border: "1.5px solid var(--border)",
                        borderRadius: "10px",
                        width: "100%",
                        padding: ".65rem .9rem",
                        fontFamily: "DM Sans, sans-serif",
                        fontSize: ".875rem",
                        outline: "none",
                      }}
                    />
                  </div>
                  <div className="form-field">
                    <label>Waktu Pengiriman</label>
                    <select
                      style={{
                        border: "1.5px solid var(--border)",
                        borderRadius: "10px",
                        width: "100%",
                        padding: ".65rem .9rem",
                        fontFamily: "DM Sans, sans-serif",
                        fontSize: ".875rem",
                        outline: "none",
                        background: "#fff",
                      }}
                    >
                      <option>Secepatnya</option>
                      <option>Pagi (07.00–12.00)</option>
                      <option>Siang (12.00–17.00)</option>
                      <option>Sore (17.00–20.00)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="summary-card reveal">
                <div className="section-title">💳 Ringkasan Pembayaran</div>
                <div className="summary-row">
                  <span>
                    Subtotal ({cart.reduce((sum, item) => sum + item.qty, 0)}{" "}
                    item)
                  </span>
                  <span>{formatRupiah(total)}</span>
                </div>
                <div className="summary-row">
                  <span>Ongkos Kirim</span>
                  <span>{formatRupiah(ongkir)}</span>
                </div>
                <div className="summary-row total">
                  <span>Total</span>
                  <span>{formatRupiah(finalTotal)}</span>
                </div>
                {showQr && (
                  <div className="qris-box">
                    <div className="qris-img">📱</div>
                    <div
                      style={{
                        fontSize: ".82rem",
                        fontWeight: 600,
                        color: "var(--text)",
                        marginBottom: ".25rem",
                      }}
                    >
                      Scan QRIS untuk Membayar
                    </div>
                    <div style={{ fontSize: ".75rem", color: "var(--muted)" }}>
                      QR berlaku 15 menit
                    </div>
                    <div
                      style={{
                        fontFamily: "DM Mono, monospace",
                        fontSize: "1.2rem",
                        fontWeight: 700,
                        color: "var(--red)",
                        marginTop: ".5rem",
                      }}
                    >
                      {formatCountdown()}
                    </div>
                  </div>
                )}
                <button
                  className="btn btn-primary btn-block btn-lg"
                  id="checkout-btn"
                  onClick={showQr ? confirmPayment : checkout}
                  style={{ marginTop: ".5rem" }}
                >
                  {showQr ? "✅ Sudah Bayar" : "💳 Bayar via QRIS"}
                </button>
                <Link
                  to="/client/order"
                  className="btn btn-outline btn-block"
                  style={{ marginTop: ".6rem" }}
                >
                  ← Tambah Produk
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientCart;
