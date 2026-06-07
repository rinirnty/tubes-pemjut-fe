import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import SidebarClient from "../../components/SidebarClient";

const orders = [
  {
    inv: "#INV-0284",
    prod: "Beras Pandan Wangi 5kg x2",
    total: "Rp 130.000",
    pay: "lunas",
    status: "selesai",
    tgl: "19 Mei 2025",
    items: [
      { emoji: "🍚", name: "Beras Pandan Wangi", qty: 2, harga: "Rp 65.000" },
    ],
  },
  {
    inv: "#INV-0283",
    prod: "Ubi Jalar Merah 10kg",
    total: "Rp 80.000",
    pay: "lunas",
    status: "dikirim",
    tgl: "19 Mei 2025",
    items: [
      { emoji: "🍠", name: "Ubi Jalar Merah", qty: 10, harga: "Rp 8.000" },
    ],
  },
  {
    inv: "#INV-0282",
    prod: "Beras Ketan Putih 3kg",
    total: "Rp 84.000",
    pay: "lunas",
    status: "diproses",
    tgl: "18 Mei 2025",
    items: [
      { emoji: "🌾", name: "Beras Ketan Putih", qty: 3, harga: "Rp 28.000" },
    ],
  },
  {
    inv: "#INV-0281",
    prod: "Singkong Segar 20kg",
    total: "Rp 100.000",
    pay: "belum bayar",
    status: "pending",
    tgl: "18 Mei 2025",
    items: [
      { emoji: "🟤", name: "Singkong Segar", qty: 20, harga: "Rp 5.000" },
    ],
  },
  {
    inv: "#INV-0280",
    prod: "Beras IR 64 5kg x4",
    total: "Rp 220.000",
    pay: "lunas",
    status: "selesai",
    tgl: "15 Mei 2025",
    items: [{ emoji: "🍚", name: "Beras IR 64", qty: 4, harga: "Rp 55.000" }],
  },
  {
    inv: "#INV-0275",
    prod: "Beras Ketan Hitam 2kg",
    total: "Rp 64.000",
    pay: "lunas",
    status: "selesai",
    tgl: "10 Mei 2025",
    items: [
      { emoji: "🍚", name: "Beras Ketan Hitam", qty: 2, harga: "Rp 32.000" },
    ],
  },
  {
    inv: "#INV-0260",
    prod: "Ubi Jalar Ungu 5kg",
    total: "Rp 45.000",
    pay: "lunas",
    status: "dibatalkan",
    tgl: "2 Mei 2025",
    items: [{ emoji: "🍠", name: "Ubi Jalar Ungu", qty: 5, harga: "Rp 9.000" }],
  },
];

const sbadge = {
  selesai: "badge-green",
  dikirim: "badge-blue",
  diproses: "badge-gold",
  pending: "badge-gray",
  dibatalkan: "badge-red",
};
const pbadge = { lunas: "badge-green", "belum bayar": "badge-red" };
const statuses = [
  "Semua",
  "pending",
  "diproses",
  "dikirim",
  "selesai",
  "dibatalkan",
];

function ClientHistory() {
  const [filterStatus, setFilterStatus] = useState("Semua");
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const revealRefs = useRef([]);

  const showDetail = (o) => {
    setSelectedOrder(o);
    setShowModal(true);
  };

  const reorder = () => {
    alert("Produk ditambahkan ke keranjang!");
    setShowModal(false);
    window.location.href = "/client/cart";
  };

  const filtered = orders.filter((o) => {
    const matchesStatus = filterStatus === "Semua" || o.status === filterStatus;
    const matchesSearch =
      o.inv.toLowerCase().includes(search.toLowerCase()) ||
      o.prod.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

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
            <div className="page-title">Riwayat Pesanan</div>
            <div className="breadcrumb">Semua pesananmu ada di sini</div>
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
            className="filter-bar reveal"
            ref={(el) => (revealRefs.current[0] = el)}
          >
            {statuses.map((status, i) => (
              <button
                key={i}
                className={`filter-btn ${filterStatus === status ? "active" : ""}`}
                onClick={() => setFilterStatus(status)}
              >
                {status === "Semua" ? "Semua" : status}
              </button>
            ))}
          </div>

          <div
            className="table-wrap reveal"
            ref={(el) => (revealRefs.current[1] = el)}
          >
            <div className="table-header">
              <div className="table-title">Riwayat Pesanan</div>
              <div className="search-box">
                <span>🔍</span>
                <input
                  id="search-hist"
                  placeholder="Cari invoice..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Invoice</th>
                  <th>Produk</th>
                  <th>Total</th>
                  <th>Bayar</th>
                  <th>Status</th>
                  <th>Tanggal</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((o, i) => (
                  <tr key={i}>
                    <td>
                      <span
                        style={{
                          fontFamily: "DM Mono, monospace",
                          fontSize: ".8rem",
                          color: "var(--brown)",
                        }}
                      >
                        {o.inv}
                      </span>
                    </td>
                    <td
                      style={{
                        maxWidth: "160px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        fontSize: ".85rem",
                      }}
                    >
                      {o.prod}
                    </td>
                    <td style={{ fontWeight: 600 }}>{o.total}</td>
                    <td>
                      <span className={`badge ${pbadge[o.pay]}`}>{o.pay}</span>
                    </td>
                    <td>
                      <span className={`badge ${sbadge[o.status]}`}>
                        {o.status}
                      </span>
                    </td>
                    <td style={{ fontSize: ".78rem", color: "var(--muted)" }}>
                      {o.tgl}
                    </td>
                    <td>
                      <div style={{ display: "flex", gap: ".35rem" }}>
                        <button
                          className="btn btn-outline btn-sm"
                          onClick={() => showDetail(o)}
                        >
                          Detail
                        </button>
                        {o.status === "dikirim" && (
                          <Link
                            to="/client/tracking"
                            className="btn btn-blue btn-sm"
                            style={{
                              background: "var(--blue2)",
                              color: "var(--blue)",
                            }}
                          >
                            🚚 Lacak
                          </Link>
                        )}
                        {o.status === "selesai" && (
                          <button
                            className="btn btn-primary btn-sm"
                            onClick={reorder}
                          >
                            🔄 Ulang
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="pagination">
              <button className="pg-btn">←</button>
              <button className="pg-btn active">1</button>
              <button className="pg-btn">2</button>
              <button className="pg-btn">→</button>
              <span className="pg-info">
                {filtered.length} pesanan ditemukan
              </span>
            </div>
          </div>
        </div>
      </div>

      {showModal && selectedOrder && (
        <div
          className="modal-overlay show"
          onClick={(e) => e.target === e.currentTarget && setShowModal(false)}
        >
          <div className="modal">
            <div className="modal-header">
              <div className="modal-title">Detail {selectedOrder.inv}</div>
              <button
                className="modal-close"
                onClick={() => setShowModal(false)}
              >
                ✕
              </button>
            </div>
            <div>
              <div
                style={{
                  background: "var(--cream)",
                  borderRadius: "12px",
                  padding: "1rem",
                  marginBottom: "1rem",
                }}
              >
                <div
                  style={{
                    fontSize: ".75rem",
                    color: "var(--muted)",
                    marginBottom: ".5rem",
                    fontWeight: 600,
                  }}
                >
                  Item Pesanan
                </div>
                {selectedOrder.items.map((item, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: ".75rem",
                      padding: ".5rem 0",
                    }}
                  >
                    <span style={{ fontSize: "2rem" }}>{item.emoji}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: ".88rem" }}>
                        {item.name}
                      </div>
                      <div
                        style={{ fontSize: ".75rem", color: "var(--muted)" }}
                      >
                        {item.harga} × {item.qty}
                      </div>
                    </div>
                    <div style={{ fontWeight: 700, color: "var(--brown)" }}>
                      {item.harga}
                    </div>
                  </div>
                ))}
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: ".75rem",
                }}
              >
                <div
                  style={{
                    background: "var(--cream)",
                    borderRadius: "10px",
                    padding: ".85rem",
                  }}
                >
                  <div
                    style={{
                      fontSize: ".72rem",
                      color: "var(--muted)",
                      marginBottom: ".25rem",
                    }}
                  >
                    Total
                  </div>
                  <div
                    style={{
                      fontWeight: 700,
                      fontFamily: "Playfair Display, serif",
                    }}
                  >
                    {selectedOrder.total}
                  </div>
                </div>
                <div
                  style={{
                    background: "var(--cream)",
                    borderRadius: "10px",
                    padding: ".85rem",
                  }}
                >
                  <div
                    style={{
                      fontSize: ".72rem",
                      color: "var(--muted)",
                      marginBottom: ".25rem",
                    }}
                  >
                    Pembayaran
                  </div>
                  <span className={`badge ${pbadge[selectedOrder.pay]}`}>
                    {selectedOrder.pay}
                  </span>
                </div>
                <div
                  style={{
                    background: "var(--cream)",
                    borderRadius: "10px",
                    padding: ".85rem",
                  }}
                >
                  <div
                    style={{
                      fontSize: ".72rem",
                      color: "var(--muted)",
                      marginBottom: ".25rem",
                    }}
                  >
                    Status
                  </div>
                  <span className={`badge ${sbadge[selectedOrder.status]}`}>
                    {selectedOrder.status}
                  </span>
                </div>
                <div
                  style={{
                    background: "var(--cream)",
                    borderRadius: "10px",
                    padding: ".85rem",
                  }}
                >
                  <div
                    style={{
                      fontSize: ".72rem",
                      color: "var(--muted)",
                      marginBottom: ".25rem",
                    }}
                  >
                    Tanggal
                  </div>
                  <div style={{ fontSize: ".82rem", fontWeight: 600 }}>
                    {selectedOrder.tgl}
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-outline"
                onClick={() => setShowModal(false)}
              >
                Tutup
              </button>
              {selectedOrder.status === "selesai" && (
                <button className="btn btn-primary" onClick={reorder}>
                  🔄 Pesan Ulang
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ClientHistory;
