import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import SidebarClient from "../../components/SidebarClient";

function ClientDashboard() {
  const revealRefs = useRef([]);

  const favs = [
    { emoji: "🍚", name: "Beras Pandan Wangi", harga: "Rp 65.000/5kg" },
    { emoji: "🌾", name: "Beras Ketan Putih", harga: "Rp 28.000/kg" },
    { emoji: "🍠", name: "Ubi Jalar Merah", harga: "Rp 8.000/kg" },
  ];

  const activeOrders = [
    {
      inv: "#INV-0283",
      prod: "Ubi Jalar Merah 10kg",
      status: "dikirim",
      tgl: "19 Mei",
    },
    {
      inv: "#INV-0282",
      prod: "Beras Ketan Putih 3kg",
      status: "diproses",
      tgl: "18 Mei",
    },
  ];

  const recs = [
    {
      emoji: "🍚",
      name: "Beras IR 64",
      cat: "Beras Putih",
      harga: "Rp 55.000",
      unit: "/5kg",
      bg: "#FFF8E8",
    },
    {
      emoji: "🟤",
      name: "Singkong Segar",
      cat: "Ubi Kayu",
      harga: "Rp 5.000",
      unit: "/kg",
      bg: "#F5EDE0",
    },
    {
      emoji: "🌿",
      name: "Beras Merah Organik",
      cat: "Beras Merah",
      harga: "Rp 22.000",
      unit: "/kg",
      bg: "#F0F5E8",
    },
  ];

  const addToCart = (name) => {
    let cart = JSON.parse(localStorage.getItem("panenku_cart") || "[]");
    const existing = cart.find((i) => i.name === name);
    if (existing) existing.qty++;
    else cart.push({ name, qty: 1 });
    localStorage.setItem("panenku_cart", JSON.stringify(cart));
    window.dispatchEvent(new CustomEvent("panenku-cart-updated"));
    alert(name + " ditambahkan ke keranjang!");
  };

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e, i) => {
          if (e.isIntersecting) {
            setTimeout(() => e.target.classList.add("visible"), i * 80);
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    revealRefs.current.forEach((el) => {
      if (el) obs.observe(el);
    });

    return () => obs.disconnect();
  }, []);

  return (
    <div style={{ minHeight: "100vh", display: "flex", overflow: "hidden" }}>
      <SidebarClient />
      <div className="main">
        <div className="topbar">
          <div>
            <div className="page-title">Dashboard</div>
            <div className="breadcrumb">Halo, Ibu Ratna 👋</div>
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
            className="stat-grid reveal"
            ref={(el) => (revealRefs.current[0] = el)}
          >
            <div className="stat-card">
              <div className="stat-icon" style={{ background: "#EAF3DE" }}>
                📦
              </div>
              <div>
                <div className="stat-value">24</div>
                <div className="stat-label">Total Pesanan</div>
                <div className="stat-change up">▲ 3 bulan ini</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" style={{ background: "#EAF6EA" }}>
                ✅
              </div>
              <div>
                <div className="stat-value">21</div>
                <div className="stat-label">Pesanan Selesai</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" style={{ background: "#E0F0FF" }}>
                🚚
              </div>
              <div>
                <div className="stat-value">2</div>
                <div className="stat-label">Sedang Dikirim</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" style={{ background: "#FFF8E0" }}>
                💰
              </div>
              <div>
                <div className="stat-value">Rp 1,2jt</div>
                <div className="stat-label">Total Belanja</div>
              </div>
            </div>
          </div>

          <div
            className="grid-2 reveal"
            ref={(el) => (revealRefs.current[1] = el)}
            style={{ marginBottom: "1.25rem" }}
          >
            <div className="card">
              <div className="section-title">⚡ Pesan Cepat (Favorit)</div>
              {favs.map((f, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: ".75rem 0",
                    borderBottom: "1px solid var(--border)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: ".75rem",
                    }}
                  >
                    <span style={{ fontSize: "1.6rem" }}>{f.emoji}</span>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: ".88rem" }}>
                        {f.name}
                      </div>
                      <div
                        style={{ fontSize: ".75rem", color: "var(--muted)" }}
                      >
                        {f.harga}
                      </div>
                    </div>
                  </div>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => addToCart(f.name)}
                  >
                    + Keranjang
                  </button>
                </div>
              ))}
              <Link
                to="/client/order"
                className="btn btn-outline btn-block"
                style={{ marginTop: "1rem" }}
              >
                🌾 Lihat Semua Produk
              </Link>
            </div>

            <div className="card">
              <div className="section-title">📦 Pesanan Aktif</div>
              {activeOrders.map((o, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: ".75rem 0",
                    borderBottom: "1px solid var(--border)",
                  }}
                >
                  <div>
                    <div style={{ fontSize: ".82rem", fontWeight: 600 }}>
                      {o.inv}
                    </div>
                    <div style={{ fontSize: ".78rem", color: "var(--muted)" }}>
                      {o.prod}
                    </div>
                    <div style={{ fontSize: ".72rem", color: "var(--muted)" }}>
                      {o.tgl}
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                      gap: ".35rem",
                    }}
                  >
                    <span
                      className={`badge ${o.status === "dikirim" ? "badge-blue" : "badge-gold"}`}
                    >
                      {o.status}
                    </span>
                    <Link
                      to="/client/tracking"
                      className="btn btn-outline btn-sm"
                    >
                      Lacak
                    </Link>
                  </div>
                </div>
              ))}
              <Link
                to="/client/history"
                className="btn btn-outline btn-block"
                style={{ marginTop: "1rem" }}
              >
                Lihat Semua Riwayat
              </Link>
            </div>
          </div>

          <div
            className="card reveal"
            ref={(el) => (revealRefs.current[2] = el)}
          >
            <div className="section-title">🌾 Produk yang Sering Dipesan</div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3,1fr)",
                gap: "1rem",
                marginTop: ".5rem",
              }}
            >
              {recs.map((r, i) => (
                <div
                  key={i}
                  style={{
                    background: r.bg,
                    borderRadius: "14px",
                    overflow: "hidden",
                    border: "1px solid var(--border)",
                  }}
                >
                  <div
                    style={{
                      height: "100px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "3.5rem",
                    }}
                  >
                    {r.emoji}
                  </div>
                  <div style={{ padding: ".85rem" }}>
                    <div
                      style={{
                        fontSize: ".7rem",
                        color: "var(--green2)",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: ".06em",
                      }}
                    >
                      {r.cat}
                    </div>
                    <div
                      style={{
                        fontWeight: 600,
                        fontSize: ".88rem",
                        margin: ".2rem 0",
                      }}
                    >
                      {r.name}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginTop: ".6rem",
                      }}
                    >
                      <div>
                        <span
                          style={{
                            fontFamily: "Playfair Display, serif",
                            fontWeight: 700,
                            color: "var(--brown)",
                          }}
                        >
                          {r.harga}
                        </span>
                        <span
                          style={{ fontSize: ".7rem", color: "var(--muted)" }}
                        >
                          {r.unit}
                        </span>
                      </div>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => addToCart(r.name)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientDashboard;
