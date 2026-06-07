import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import SidebarClient from "../../components/SidebarClient";
import api from "../../utils/api";

function ClientCart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState(() =>
    JSON.parse(localStorage.getItem("panenku_cart") || "[]"),
  );
  const [showQr, setShowQr] = useState(false);
  const [countdown, setCountdown] = useState(900);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    api.get("/auth/me").then(res => setProfile(res.data)).catch(console.error);
  }, []);

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
    if (window.confirm("Kosongkan keranjang?")) {
      saveCart([]);
    }
  };

  const total = cart.reduce(
    (sum, item) => sum + (item.harga || 0) * item.qty,
    0,
  );
  const ongkir = 15000;
  const finalTotal = total + ongkir;

  const formatRupiah = (n) => "Rp " + Number(n).toLocaleString("id-ID");

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
    if (!profile) {
      alert("Memuat data profil, mohon tunggu...");
      return;
    }
    setShowQr(true);
  };

  const confirmPayment = async () => {
    try {
      const payload = {
        id_user: profile.id,
        items: cart.map(item => ({
          id_produk: item.id,
          jumlah: item.qty
        }))
      };

      await api.post("/orders", payload);
      alert("Pembayaran berhasil! Pesanan sedang diproses.");
      saveCart([]);
      navigate("/client/history");
    } catch (err) {
      alert("Gagal membuat pesanan: " + (err.response?.data?.message || err.message));
    }
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
                  cart.map((item) => {
                    const imageUrl = item.foto ? `${import.meta.env.VITE_API_URL || 'http://localhost:5500/api'}/products/images/${item.foto}` : null;
                    return (
                    <div key={item.id} className="cart-item">
                      <div
                        className="cart-thumb"
                        style={{ background: "#FFF8E8", overflow: 'hidden' }}
                      >
                        {imageUrl ? (
                          <img src={imageUrl} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                          "🌾"
                        )}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div className="cart-name">
                          {item.name}
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
                          {formatRupiah((item.harga || 0) * item.qty)}
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
                  )})
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
                    defaultValue={profile?.alamat || ""}
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
                  disabled={cart.length === 0}
                >
                  {showQr ? "✅ Selesai Bayar & Buat Pesanan" : "💳 Bayar via QRIS"}
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
