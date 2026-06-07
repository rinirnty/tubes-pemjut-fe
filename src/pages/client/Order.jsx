import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import SidebarClient from "../../components/SidebarClient";

const products = [
  {
    emoji: "🍚",
    badge: "Terlaris",
    cat: "Beras Putih",
    name: "Beras Pandan Wangi",
    price: "Rp 65.000",
    unit: "/5 kg",
    bg: "#FFF8E8",
    id: 1,
  },
  {
    emoji: "🌾",
    badge: "Baru",
    cat: "Beras Ketan",
    name: "Beras Ketan Putih",
    price: "Rp 28.000",
    unit: "/kg",
    bg: "#F0F8E8",
    id: 2,
  },
  {
    emoji: "🍠",
    badge: "",
    cat: "Ubi Jalar",
    name: "Ubi Jalar Merah",
    price: "Rp 8.000",
    unit: "/kg",
    bg: "#FFF0E8",
    id: 3,
  },
  {
    emoji: "🌿",
    badge: "",
    cat: "Beras Merah",
    name: "Beras Merah Organik",
    price: "Rp 22.000",
    unit: "/kg",
    bg: "#F0F5E8",
    id: 4,
  },
  {
    emoji: "🟤",
    badge: "Promo",
    cat: "Ubi Kayu",
    name: "Singkong Segar",
    price: "Rp 5.000",
    unit: "/kg",
    bg: "#F5EDE0",
    id: 5,
  },
  {
    emoji: "🍚",
    badge: "",
    cat: "Beras Ketan",
    name: "Beras Ketan Hitam",
    price: "Rp 32.000",
    unit: "/kg",
    bg: "#F0EEF8",
    id: 6,
  },
  {
    emoji: "🍚",
    badge: "",
    cat: "Beras Putih",
    name: "Beras IR 64",
    price: "Rp 55.000",
    unit: "/5 kg",
    bg: "#FFF8E8",
    id: 7,
  },
  {
    emoji: "🍠",
    badge: "",
    cat: "Ubi Jalar",
    name: "Ubi Jalar Ungu",
    price: "Rp 9.000",
    unit: "/kg",
    bg: "#F5E8FF",
    id: 8,
  },
  {
    emoji: "🌾",
    badge: "",
    cat: "Beras Putih",
    name: "Beras Pera Lokal",
    price: "Rp 48.000",
    unit: "/5 kg",
    bg: "#FFF8E8",
    id: 9,
  },
];

const categories = [
  "Semua",
  "Beras Putih",
  "Beras Ketan",
  "Ubi Jalar",
  "Ubi Kayu",
  "Beras Merah",
];

function ClientOrder() {
  const [cart, setCart] = useState(() =>
    JSON.parse(localStorage.getItem("panenku_cart") || "[]"),
  );
  const [currentKat, setCurrentKat] = useState("Semua");
  const [search, setSearch] = useState("");
  const revealRefs = useRef([]);

  const saveCart = (newCart) => {
    localStorage.setItem("panenku_cart", JSON.stringify(newCart));
    setCart(newCart);
    window.dispatchEvent(new CustomEvent("panenku-cart-updated"));
  };

  const getQty = (id) => {
    const item = cart.find((i) => i.id === id);
    return item ? item.qty : 0;
  };

  const updateCart = (id, name, delta) => {
    let newCart = [...cart];
    const index = newCart.findIndex((i) => i.id === id);
    if (index === -1 && delta > 0) {
      newCart.push({ id, name, qty: delta });
    } else if (index !== -1) {
      newCart[index].qty += delta;
      if (newCart[index].qty <= 0) {
        newCart.splice(index, 1);
      }
    }
    saveCart(newCart);
  };

  const filtered = products.filter((p) => {
    const matchesKat = currentKat === "Semua" || p.cat === currentKat;
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchesKat && matchesSearch;
  });

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e, i) => {
          if (e.isIntersecting) {
            setTimeout(() => e.target.classList.add("visible"), i * 60);
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 },
    );
    revealRefs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div style={{ minHeight: "100vh", display: "flex", overflow: "hidden" }}>
      <SidebarClient />
      <div className="main">
        <div className="topbar">
          <div>
            <div className="page-title">Pesan Produk</div>
            <div className="breadcrumb">Pilih bahan pokok favoritmu</div>
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: ".75rem",
              marginBottom: "1.25rem",
            }}
            className="reveal"
            ref={(el) => (revealRefs.current[0] = el)}
          >
            <div className="filter-bar" style={{ margin: 0 }}>
              {categories.map((cat, i) => (
                <button
                  key={i}
                  className={`filter-btn ${currentKat === cat ? "active" : ""}`}
                  onClick={() => setCurrentKat(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="search-box">
              <span>🔍</span>
              <input
                placeholder="Cari produk..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div
            className="prod-grid reveal"
            ref={(el) => (revealRefs.current[1] = el)}
          >
            {filtered.map((p) => {
              const qty = getQty(p.id);
              return (
                <div key={p.id} className="prod-card">
                  <div className="prod-thumb" style={{ background: p.bg }}>
                    {p.emoji}
                    {p.badge && (
                      <span className="prod-badge-abs badge-gold">
                        {p.badge}
                      </span>
                    )}
                  </div>
                  <div className="prod-body">
                    <div className="prod-cat">{p.cat}</div>
                    <div className="prod-name">{p.name}</div>
                    <div className="prod-footer">
                      <div>
                        <div className="prod-price">{p.price}</div>
                        <div className="prod-unit">{p.unit}</div>
                      </div>
                      {qty === 0 ? (
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => updateCart(p.id, p.name, 1)}
                        >
                          + Tambah
                        </button>
                      ) : (
                        <div className="qty-ctrl">
                          <button
                            className="qty-btn"
                            onClick={() => updateCart(p.id, p.name, -1)}
                          >
                            −
                          </button>
                          <span className="qty-val">{qty}</span>
                          <button
                            className="qty-btn"
                            onClick={() => updateCart(p.id, p.name, 1)}
                          >
                            +
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <Link
            to="/client/cart"
            id="float-cart"
            style={{
              position: "fixed",
              bottom: "2rem",
              right: "2rem",
              background: "var(--brown)",
              color: "#fff",
              borderRadius: "999px",
              padding: ".75rem 1.5rem",
              display: "flex",
              alignItems: "center",
              gap: ".6rem",
              fontWeight: 600,
              textDecoration: "none",
              boxShadow: "0 8px 24px rgba(92,61,30,.3)",
              transition: "all .2s",
              zIndex: 50,
            }}
          >
            🛒 Keranjang (<span>{cart.reduce((sum, i) => sum + i.qty, 0)}</span>
            )
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ClientOrder;
