import { useEffect, useRef, useState } from "react";
import SidebarAdmin from "../../components/SidebarAdmin";

const initialOrders = [
  {
    id: 1,
    inv: "#INV-0284",
    buyer: "Ibu Ratna",
    phone: "081234567890",
    product: "Beras Pandan Wangi 5kg x2",
    mitra: "Pak Hendra",
    total: "Rp 130.000",
    pay: "lunas",
    status: "selesai",
    tgl: "19 Mei 2025",
    addr: "Jl. Merdeka No.5 Bandung",
  },
  {
    id: 2,
    inv: "#INV-0283",
    buyer: "Pak Darto",
    phone: "081234567891",
    product: "Ubi Jalar Merah 10kg",
    mitra: "Pak Darto",
    total: "Rp 80.000",
    pay: "lunas",
    status: "dikirim",
    tgl: "19 Mei 2025",
    addr: "Jl. Asia Afrika No.10 Bandung",
  },
  {
    id: 3,
    inv: "#INV-0282",
    buyer: "Bu Siti",
    phone: "081234567892",
    product: "Beras Ketan Putih 3kg",
    mitra: "Bu Siti",
    total: "Rp 84.000",
    pay: "lunas",
    status: "diproses",
    tgl: "18 Mei 2025",
    addr: "Jl. Kebon Kawung No.12 Bandung",
  },
  {
    id: 4,
    inv: "#INV-0281",
    buyer: "Pak Budi",
    phone: "081234567893",
    product: "Singkong Segar 20kg",
    mitra: "Pak Budi",
    total: "Rp 100.000",
    pay: "belum bayar",
    status: "pending",
    tgl: "18 Mei 2025",
    addr: "Jl. Cihampelas No.8 Bandung",
  },
  {
    id: 5,
    inv: "#INV-0280",
    buyer: "CV Maju",
    phone: "081234567894",
    product: "Beras IR 64 5kg x4",
    mitra: "Pak Hendra",
    total: "Rp 220.000",
    pay: "lunas",
    status: "selesai",
    tgl: "15 Mei 2025",
    addr: "Jl. Gagak No.5 Bandung",
  },
];

const statusFlow = ["pending", "diproses", "dikirim", "selesai"];
const statusBadgeMap = {
  selesai: "badge-green",
  dikirim: "badge-blue",
  diproses: "badge-gold",
  pending: "badge-gray",
  dibatalkan: "badge-red",
};
const payBadgeMap = { lunas: "badge-green", "belum bayar": "badge-red" };

function AdminOrders() {
  const [orders, setOrders] = useState(initialOrders);
  const [filterStatus, setFilterStatus] = useState("semua");
  const [search, setSearch] = useState("");
  const [showDetail, setShowDetail] = useState(false);
  const [selected, setSelected] = useState(null);
  const revealRefs = useRef([]);

  const filtered = orders.filter((o) => {
    const matchesStatus = filterStatus === "semua" || o.status === filterStatus;
    const matchesSearch =
      o.inv.toLowerCase().includes(search.toLowerCase()) ||
      o.buyer.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const openDetail = (order) => {
    setSelected(order);
    setShowDetail(true);
  };

  const nextStatus = () => {
    const curIdx = statusFlow.indexOf(selected.status);
    if (curIdx < statusFlow.length - 1) {
      const updatedOrder = { ...selected, status: statusFlow[curIdx + 1] };
      setOrders(orders.map((o) => (o.id === selected.id ? updatedOrder : o)));
      setSelected(updatedOrder);
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
      <SidebarAdmin />
      <div className="main">
        <div className="topbar">
          <div>
            <div className="page-title">Kelola Pesanan</div>
            <div className="breadcrumb">Admin / Pesanan</div>
          </div>
          <div className="topbar-right">
            <button className="btn btn-outline btn-sm">📥 Export CSV</button>
            <div className="topbar-btn">
              🔔<div className="notif-dot"></div>
            </div>
          </div>
        </div>

        <div className="page-content">
          <div
            className="stat-grid reveal"
            ref={(el) => (revealRefs.current[0] = el)}
          >
            <div className="stat-card">
              <div className="stat-icon" style={{ background: "#FFF8E0" }}>
                ⏳
              </div>
              <div>
                <div className="stat-value">
                  {orders.filter((o) => o.status === "pending").length}
                </div>
                <div className="stat-label">Pending</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" style={{ background: "#E0F0FF" }}>
                🔄
              </div>
              <div>
                <div className="stat-value">
                  {orders.filter((o) => o.status === "diproses").length}
                </div>
                <div className="stat-label">Diproses</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" style={{ background: "#EAF3DE" }}>
                🚚
              </div>
              <div>
                <div className="stat-value">
                  {orders.filter((o) => o.status === "dikirim").length}
                </div>
                <div className="stat-label">Dikirim</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" style={{ background: "#EAF6EA" }}>
                ✅
              </div>
              <div>
                <div className="stat-value">
                  {orders.filter((o) => o.status === "selesai").length}
                </div>
                <div className="stat-label">Selesai</div>
              </div>
            </div>
          </div>

          <div
            className="filter-bar reveal"
            ref={(el) => (revealRefs.current[1] = el)}
          >
            <button
              className={`filter-btn ${filterStatus === "semua" ? "active" : ""}`}
              onClick={() => setFilterStatus("semua")}
            >
              Semua ({orders.length})
            </button>
            <button
              className={`filter-btn ${filterStatus === "pending" ? "active" : ""}`}
              onClick={() => setFilterStatus("pending")}
            >
              ⏳ Pending ({orders.filter((o) => o.status === "pending").length})
            </button>
            <button
              className={`filter-btn ${filterStatus === "diproses" ? "active" : ""}`}
              onClick={() => setFilterStatus("diproses")}
            >
              🔄 Diproses (
              {orders.filter((o) => o.status === "diproses").length})
            </button>
            <button
              className={`filter-btn ${filterStatus === "dikirim" ? "active" : ""}`}
              onClick={() => setFilterStatus("dikirim")}
            >
              🚚 Dikirim ({orders.filter((o) => o.status === "dikirim").length})
            </button>
            <button
              className={`filter-btn ${filterStatus === "selesai" ? "active" : ""}`}
              onClick={() => setFilterStatus("selesai")}
            >
              ✅ Selesai ({orders.filter((o) => o.status === "selesai").length})
            </button>
            <button
              className={`filter-btn ${filterStatus === "dibatalkan" ? "active" : ""}`}
              onClick={() => setFilterStatus("dibatalkan")}
            >
              ✕ Dibatalkan (
              {orders.filter((o) => o.status === "dibatalkan").length})
            </button>
          </div>

          <div
            className="table-wrap reveal"
            ref={(el) => (revealRefs.current[2] = el)}
          >
            <div className="table-header">
              <div className="table-title">Daftar Pesanan</div>
              <div className="table-actions">
                <div className="search-box">
                  <span>🔍</span>
                  <input
                    placeholder="Cari invoice/pembeli..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Invoice</th>
                  <th>Pembeli</th>
                  <th>Produk</th>
                  <th>Mitra</th>
                  <th>Total</th>
                  <th>Bayar</th>
                  <th>Status</th>
                  <th>Tgl</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td
                      colSpan="9"
                      style={{
                        textAlign: "center",
                        padding: "2rem",
                        color: "var(--muted)",
                      }}
                    >
                      Tidak ada pesanan
                    </td>
                  </tr>
                ) : (
                  filtered.map((o) => (
                    <tr key={o.id}>
                      <td>
                        <span
                          style={{
                            fontFamily: "DM Mono,monospace",
                            fontSize: ".8rem",
                            color: "var(--brown)",
                          }}
                        >
                          {o.inv}
                        </span>
                      </td>
                      <td>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: ".5rem",
                          }}
                        >
                          <div
                            className="avatar"
                            style={{
                              background: "var(--cream2)",
                              fontSize: ".75rem",
                            }}
                          >
                            {o.buyer[0]}
                          </div>
                          {o.buyer}
                        </div>
                      </td>
                      <td
                        style={{
                          fontSize: ".8rem",
                          maxWidth: "140px",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {o.product}
                      </td>
                      <td>{o.mitra}</td>
                      <td style={{ fontWeight: 600 }}>{o.total}</td>
                      <td>
                        <span className={`badge ${payBadgeMap[o.pay]}`}>
                          {o.pay}
                        </span>
                      </td>
                      <td>
                        <span className={`badge ${statusBadgeMap[o.status]}`}>
                          {o.status}
                        </span>
                      </td>
                      <td style={{ fontSize: ".78rem", color: "var(--muted)" }}>
                        {o.tgl}
                      </td>
                      <td>
                        <button
                          className="btn btn-outline btn-sm"
                          onClick={() => openDetail(o)}
                        >
                          Detail
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            <div className="pagination">
              <button className="pg-btn">←</button>
              <button className="pg-btn active">1</button>
              <button className="pg-btn">2</button>
              <button className="pg-btn">3</button>
              <button className="pg-btn">→</button>
              <span className="pg-info">
                Menampilkan {filtered.length} dari {orders.length} pesanan
              </span>
            </div>
          </div>
        </div>
      </div>

      {showDetail && selected && (
        <div
          className="modal-overlay show"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowDetail(false);
          }}
        >
          <div className="modal" style={{ maxWidth: "600px" }}>
            <div className="modal-header">
              <div className="modal-title">Detail {selected.inv}</div>
              <button
                className="modal-close"
                onClick={() => setShowDetail(false)}
              >
                ✕
              </button>
            </div>
            <div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1rem",
                  marginBottom: "1.25rem",
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: ".75rem",
                      color: "var(--muted)",
                      marginBottom: ".25rem",
                    }}
                  >
                    Pembeli
                  </div>
                  <div style={{ fontWeight: 600 }}>{selected.buyer}</div>
                  <div style={{ fontSize: ".8rem", color: "var(--muted)" }}>
                    {selected.phone}
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      fontSize: ".75rem",
                      color: "var(--muted)",
                      marginBottom: ".25rem",
                    }}
                  >
                    Alamat
                  </div>
                  <div style={{ fontSize: ".85rem" }}>{selected.addr}</div>
                </div>
                <div>
                  <div
                    style={{
                      fontSize: ".75rem",
                      color: "var(--muted)",
                      marginBottom: ".25rem",
                    }}
                  >
                    Total
                  </div>
                  <div
                    style={{
                      fontFamily: "Playfair Display,serif",
                      fontSize: "1.1rem",
                      fontWeight: 700,
                      color: "var(--brown)",
                    }}
                  >
                    {selected.total}
                  </div>
                </div>
              </div>
              <div
                style={{
                  background: "var(--cream)",
                  borderRadius: "12px",
                  padding: "1rem",
                  marginBottom: "1.25rem",
                }}
              >
                <div
                  style={{
                    fontSize: ".75rem",
                    color: "var(--muted)",
                    marginBottom: ".4rem",
                  }}
                >
                  Produk
                </div>
                <div style={{ fontWeight: 500 }}>{selected.product}</div>
              </div>
              <div
                style={{
                  fontWeight: 600,
                  fontSize: ".88rem",
                  marginBottom: ".75rem",
                  color: "var(--text)",
                }}
              >
                Status Pengiriman
              </div>
              <div className="timeline">
                {statusFlow.map((s, si) => {
                  const curIdx = statusFlow.indexOf(selected.status);
                  return (
                    <div key={si} className="tl-item">
                      <div
                        className={`tl-dot ${si < curIdx ? "done" : si === curIdx ? "current" : "pending"}`}
                      ></div>
                      <div>
                        <div
                          className="tl-title"
                          style={{
                            color:
                              si <= curIdx ? "var(--text)" : "var(--muted)",
                          }}
                        >
                          {
                            [
                              "Pesanan Diterima",
                              "Sedang Diproses",
                              "Sedang Dikirim",
                              "Pesanan Selesai",
                            ][si]
                          }
                        </div>
                        <div className="tl-time">
                          {si <= curIdx ? selected.tgl : "Menunggu"}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-outline"
                onClick={() => setShowDetail(false)}
              >
                Tutup
              </button>
              {selected.status !== "selesai" &&
                selected.status !== "dibatalkan" && (
                  <button className="btn btn-primary" onClick={nextStatus}>
                    → Tandai{" "}
                    {statusFlow[statusFlow.indexOf(selected.status) + 1]}
                  </button>
                )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminOrders;
