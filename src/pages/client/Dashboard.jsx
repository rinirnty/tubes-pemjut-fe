import { useState, useEffect, useRef } from "react";
import api from "../../utils/api";
import { Link } from "react-router-dom";
import SidebarClient from "../../components/SidebarClient";

function ClientDashboard() {
  const revealRefs = useRef([]);

  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [recs, setRecs] = useState([]);
  const [stats, setStats] = useState({
    totalPesanan: 0,
    selesai: 0,
    dikirim: 0,
    totalBelanja: 0,
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const userRes = await api.get("/auth/me");
      const currentUser = userRes.data.data;

      setUser(currentUser);

      const productRes = await api.get("/products");

      setRecs(productRes.data.data.slice(0, 6));

      const orderRes = await api.get(`/orders/${currentUser.id_user}`);

      const orderData = orderRes.data;

      setOrders(orderData);

      const totalPesanan = orderData.length;

      const selesai = orderData.filter((o) => o.status === "selesai").length;

      const dikirim = orderData.filter((o) => o.status === "dikirim").length;

      const totalBelanja = orderData.reduce(
        (sum, o) => sum + Number(o.total_harga || 0),
        0,
      );

      setStats({
        totalPesanan,
        selesai,
        dikirim,
        totalBelanja,
      });
    } catch (err) {
      console.error(err);
    }
  };

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
            <div className="breadcrumb">Halo, {user?.nama} 👋</div>
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
                <div className="stat-value">{stats.totalPesanan}</div>
                <div className="stat-label">Total Pesanan</div>
                {/* <div className="stat-change up">▲ 3 bulan ini</div> */}
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" style={{ background: "#EAF6EA" }}>
                ✅
              </div>
              <div>
                <div className="stat-value">{stats.selesai}</div>
                <div className="stat-label">Pesanan Selesai</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" style={{ background: "#E0F0FF" }}>
                🚚
              </div>
              <div>
                <div className="stat-value">{stats.dikirim}</div>
                <div className="stat-label">Sedang Dikirim</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" style={{ background: "#FFF8E0" }}>
                💰
              </div>
              <div>
                <div className="stat-value">
                  Rp {stats.totalBelanja.toLocaleString("id-ID")}
                </div>
                <div className="stat-label">Total Belanja</div>
              </div>
            </div>
          </div>

          <div className="card" ref={(el) => (revealRefs.current[2] = el)}>
            <div className="section-title">🌾 Produk yang Sering Dipesan</div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3,1fr)",
                gap: "1rem",
                marginTop: ".5rem",
              }}
            >
              {recs.map((r, i) => {
                const imageUrl = r.foto
                  ? `http://localhost:5500/api/products/images/${r.foto}`
                  : null;
                return (
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
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={r.nama}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        <div
                          style={{
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "3rem",
                          }}
                        >
                          🌾
                        </div>
                      )}
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
                        {r.kategori.nama}
                      </div>
                      <div
                        style={{
                          fontWeight: 600,
                          fontSize: ".88rem",
                          margin: ".2rem 0",
                        }}
                      >
                        {r.nama}
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
                          onClick={() => addToCart(r.nama)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientDashboard;
