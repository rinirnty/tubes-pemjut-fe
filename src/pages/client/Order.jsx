import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import SidebarClient from "../../components/SidebarClient";
import api from "../../utils/api";

function ClientOrder() {
  const [cart, setCart] = useState(() =>
    JSON.parse(localStorage.getItem("panenku_cart") || "[]"),
  );
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentKat, setCurrentKat] = useState("Semua");
  const [search, setSearch] = useState("");
  const revealRefs = useRef([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [prodRes, catRes] = await Promise.all([
        api.get("/products"),
        api.get("/categories"),
      ]);
      const prodData = Array.isArray(prodRes.data)
        ? prodRes.data
        : prodRes.data.data || [];
      const catData = Array.isArray(catRes.data)
        ? catRes.data
        : catRes.data.data || [];
      setProducts(prodData);
      setCategories([{ id: "all", nama: "Semua" }, ...catData]);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const saveCart = (newCart) => {
    localStorage.setItem("panenku_cart", JSON.stringify(newCart));
    setCart(newCart);
    window.dispatchEvent(new CustomEvent("panenku-cart-updated"));
  };

  const getQty = (id) => {
    const item = cart.find((i) => i.id === id);
    return item ? item.qty : 0;
  };

  const updateCart = (product, delta) => {
    let newCart = [...cart];
    const index = newCart.findIndex((i) => i.id === product.id);
    if (index === -1 && delta > 0) {
      newCart.push({
        id: product.id_produk,
        name: product.nama,
        harga: product.harga,
        foto: product.foto,
        qty: delta,
      });
    } else if (index !== -1) {
      newCart[index].qty += delta;
      if (newCart[index].qty <= 0) {
        newCart.splice(index, 1);
      }
    }
    saveCart(newCart);
  };

  const filtered = products.filter((p) => {
    const matchesKat =
      currentKat === "Semua" || p.Kategori?.nama === currentKat;
    const matchesSearch = p.nama.toLowerCase().includes(search.toLowerCase());
    return matchesKat && matchesSearch;
  });

  const formatRupiah = (n) => "Rp " + Number(n).toLocaleString("id-ID");

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
  }, [filtered]);

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
                  className={`filter-btn ${currentKat === cat.nama ? "active" : ""}`}
                  onClick={() => setCurrentKat(cat.nama)}
                >
                  {cat.nama}
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
              const imageUrl = p.foto
                ? `${import.meta.env.VITE_API_URL || "http://localhost:5500/api"}/products/images/${p.foto}`
                : null;

              return (
                <div key={p.id} className="prod-card">
                  <div
                    className="prod-thumb"
                    style={{ background: "#FFF8E8", overflow: "hidden" }}
                  >
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={p.nama}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      "🌾"
                    )}
                  </div>
                  <div className="prod-body">
                    <div className="prod-cat">{p.kategori?.nama}</div>
                    <div className="prod-name">{p.nama}</div>
                    <div className="prod-footer">
                      <div>
                        <div className="prod-price">
                          {formatRupiah(p.harga)}
                        </div>
                        <div className="prod-unit">Stok: {p.stok}</div>
                      </div>
                      {qty === 0 ? (
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => updateCart(p, 1)}
                        >
                          + Tambah
                        </button>
                      ) : (
                        <div className="qty-ctrl">
                          <button
                            className="qty-btn"
                            onClick={() => updateCart(p, -1)}
                          >
                            −
                          </button>
                          <span className="qty-val">{qty}</span>
                          <button
                            className="qty-btn"
                            onClick={() => updateCart(p, 1)}
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
