import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import SidebarClient from "../../components/SidebarClient";

const activeOrders = [
  { inv: "#INV-0283", prod: "Ubi Jalar Merah 10kg", status: "dikirim" },
  { inv: "#INV-0282", prod: "Beras Ketan Putih 3kg", status: "diproses" },
];

const timeline = [
  {
    icon: "✅",
    label: "Pesanan Diterima",
    desc: "Pesanan kamu sudah diterima oleh sistem",
    time: "18 Mei 2025, 14.30",
    done: true,
  },
  {
    icon: "📦",
    label: "Pesanan Diproses",
    desc: "Mitra sedang menyiapkan barang pesananmu",
    time: "18 Mei 2025, 16.00",
    done: true,
  },
  {
    icon: "🚚",
    label: "Pesanan Dikirim",
    desc: "Barang sudah diserahkan ke kurir JNE",
    time: "19 Mei 2025, 08.15",
    current: true,
  },
  {
    icon: "🏠",
    label: "Pesanan Tiba",
    desc: "Barang akan segera tiba di alamatmu",
    time: "Estimasi: 19 Mei 2025, 17.00",
    pending: true,
  },
];

function ClientTracking() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const revealRefs = useRef([]);

  const showTracking = (order) => {
    setSelected(order);
  };

  const searchInvoice = () => {
    const q = search.trim();
    const found = activeOrders.find(
      (o) => o.inv.toLowerCase() === q.toLowerCase(),
    );
    if (found) {
      showTracking(found);
    } else if (q) {
      alert("Invoice tidak ditemukan atau pesanan sudah selesai.");
    }
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
    revealRefs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div style={{ minHeight: "100vh", display: "flex", overflow: "hidden" }}>
      <SidebarClient />
      <div className="main">
        <div className="topbar">
          <div>
            <div className="page-title">Lacak Pengiriman</div>
            <div className="breadcrumb">Pantau status pengiriman pesananmu</div>
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
            className="card reveal"
            ref={(el) => (revealRefs.current[0] = el)}
            style={{ marginBottom: "1.25rem" }}
          >
            <div className="section-title">🔍 Cari / Pilih Pesanan</div>
            <div style={{ display: "flex", gap: ".75rem", flexWrap: "wrap" }}>
              <div className="search-box" style={{ flex: 1 }}>
                <span>📦</span>
                <input
                  id="search-inv"
                  placeholder="Masukkan nomor invoice..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{ flex: 1, width: "auto" }}
                />
              </div>
              <button className="btn btn-primary" onClick={searchInvoice}>
                Lacak
              </button>
            </div>
            <div
              style={{
                marginTop: "1rem",
                display: "flex",
                gap: ".6rem",
                flexWrap: "wrap",
              }}
            >
              {activeOrders.map((o, i) => (
                <button
                  key={i}
                  className="btn btn-outline btn-sm"
                  onClick={() => showTracking(o)}
                >
                  📦 {o.inv}
                </button>
              ))}
            </div>
          </div>

          {selected ? (
            <div id="tracking-detail" style={{ display: "block" }}>
              <div
                className="grid-2 reveal"
                ref={(el) => (revealRefs.current[1] = el)}
                style={{ alignItems: "start" }}
              >
                <div className="track-card">
                  <div className="track-header">
                    <div>
                      <div style={{ fontWeight: 600 }} id="t-inv">
                        {selected.inv}
                      </div>
                      <div
                        style={{ fontSize: ".78rem", color: "var(--muted)" }}
                        id="t-prod"
                      >
                        {selected.prod}
                      </div>
                    </div>
                    <span className="badge badge-blue" id="t-status">
                      {selected.status}
                    </span>
                  </div>
                  <div className="timeline">
                    {timeline.map((t, i) => (
                      <div key={i} className="tl-item">
                        <div className="tl-left">
                          <div
                            className={`tl-dot ${t.done ? "done" : t.current ? "current" : "pending"}`}
                          >
                            {t.done ? "✓" : t.current ? "⟳" : t.icon}
                          </div>
                          {i < timeline.length - 1 && (
                            <div
                              className={`tl-line ${t.done ? "done" : ""}`}
                            ></div>
                          )}
                        </div>
                        <div style={{ paddingTop: ".4rem" }}>
                          <div
                            className="tl-title"
                            style={{
                              color: t.pending ? "var(--muted)" : "var(--text)",
                            }}
                          >
                            {t.label}
                          </div>
                          <div className="tl-desc">{t.desc}</div>
                          <div className="tl-time">{t.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div
                    className="map-placeholder reveal"
                    ref={(el) => (revealRefs.current[2] = el)}
                  >
                    🗺️
                    <div
                      className="map-pin"
                      style={{ top: "40%", left: "55%" }}
                    >
                      📍
                    </div>
                  </div>
                  <div
                    className="card reveal"
                    ref={(el) => (revealRefs.current[3] = el)}
                  >
                    <div className="section-title">🚚 Info Kurir</div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: ".75rem",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <span
                          style={{ fontSize: ".82rem", color: "var(--muted)" }}
                        >
                          Kurir
                        </span>
                        <span style={{ fontWeight: 600, fontSize: ".88rem" }}>
                          JNE Regular
                        </span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <span
                          style={{ fontSize: ".82rem", color: "var(--muted)" }}
                        >
                          No. Resi
                        </span>
                        <span
                          style={{
                            fontFamily: "DM Mono, monospace",
                            fontSize: ".82rem",
                            color: "var(--brown)",
                          }}
                        >
                          JNE0001234567890
                        </span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <span
                          style={{ fontSize: ".82rem", color: "var(--muted)" }}
                        >
                          Estimasi Tiba
                        </span>
                        <span
                          style={{
                            fontWeight: 600,
                            fontSize: ".88rem",
                            color: "var(--green)",
                          }}
                        >
                          Hari ini, 17.00
                        </span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <span
                          style={{ fontSize: ".82rem", color: "var(--muted)" }}
                        >
                          Alamat Tujuan
                        </span>
                        <span
                          style={{
                            fontSize: ".82rem",
                            textAlign: "right",
                            maxWidth: "200px",
                          }}
                        >
                          Jl. Merdeka No.5, Bandung
                        </span>
                      </div>
                    </div>
                    <div className="divider"></div>
                    <button className="btn btn-outline btn-block">
                      📞 Hubungi Kurir
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div
              id="no-tracking"
              className="empty-state reveal"
              ref={(el) => (revealRefs.current[4] = el)}
            >
              <div className="es-icon">🚚</div>
              <p>Pilih pesanan yang ingin dilacak</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ClientTracking;
