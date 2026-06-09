import { useEffect, useRef, useState } from "react";
import SidebarAdmin from "../../components/SidebarAdmin";
import api from "../../utils/api";

const statusFlow = ["dibayar", "diproses", "dikirim", "selesai"];
const statusBadgeMap = {
  belum_bayar: "badge-red",
  dibayar: "badge-green",
  diproses: "badge-gold",
  dikirim: "badge-blue",
  selesai: "badge-green",
  dibatalkan: "badge-red",
};
const payBadgeMap = { lunas: "badge-green", "belum bayar": "badge-red" };

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("semua");
  const [search, setSearch] = useState("");
  const [showDetail, setShowDetail] = useState(false);
  const [selected, setSelected] = useState(null);
  const revealRefs = useRef([]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const orderRes = await api.get(`/orders`);
      // console.log(orderRes.data);

      setOrders(orderRes.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filtered = orders.filter((o) => {
    const matchesStatus = filterStatus === "semua" || o.status === filterStatus;

    const keyword = search.toLowerCase();

    const matchesSearch =
      String(o.id_order).toLowerCase().includes(keyword) ||
      (o.user?.nama || "").toLowerCase().includes(keyword);

    return matchesStatus && matchesSearch;
  });

  const openDetail = (order) => {
    setSelected(order);
    setShowDetail(true);
  };

  const updateStatus = async (newStatus, id_order = null) => {
    try {
      await api.patch(`/orders/${id_order || selected.id_order}/update`, {
        status: newStatus,
      });
      fetchOrders();
      setShowDetail(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOrders();
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

  const exportCSV = () => {
    const headers = [
      "Invoice",
      "Pembeli",
      "Email",
      "Total",
      "Status",
      "Produk",
      // "Tanggal Pesanan",
    ];

    const rows = filtered.map((o) => [
      `INV-${String(o.id_order).padStart(4, "0")}`,
      o.user?.nama || "",
      o.user?.email || "",
      o.total_harga,
      o.status,
      o.order_items
        ?.map((item) => `${item.produk?.nama} (${item.jumlah})`)
        .join(" | ") || "",
      // new Date(o.createdAt).toLocaleDateString("id-ID"),
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) =>
        row.map((field) => `"${String(field).replace(/"/g, '""')}"`).join(","),
      ),
    ].join("\n");

    const blob = new Blob(["\uFEFF" + csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `laporan-pesanan-${new Date().toISOString().split("T")[0]}.csv`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.URL.revokeObjectURL(url);
  };

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
            <button className="btn btn-outline btn-sm" onClick={exportCSV}>
              📥 Export CSV
            </button>
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
                  {orders.filter((o) => o.status === "dibayar").length}
                </div>
                <div className="stat-label">Dibayar</div>
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
              className={`filter-btn ${filterStatus === "dibayar" ? "active" : ""}`}
              onClick={() => setFilterStatus("dibayar")}
            >
              ⏳ Dibayar ({orders.filter((o) => o.status === "dibayar").length})
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
                  <th>Total</th>
                  <th>Status</th>
                  {/* <th>Tgl</th> */}
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      style={{ textAlign: "center", padding: "2rem" }}
                    >
                      Tidak ada pesanan
                    </td>
                  </tr>
                ) : (
                  filtered.map((o) => (
                    <tr key={o.id_order}>
                      <td>#INV-{String(o.id_order).padStart(4, "0")}</td>

                      <td>{o.user?.nama}</td>

                      <td>
                        Rp {Number(o.total_harga).toLocaleString("id-ID")}
                      </td>

                      <td>
                        <span className={`badge ${statusBadgeMap[o.status]}`}>
                          {o.status}
                        </span>
                      </td>

                      {/* <td>
                        {new Date(o.createdAt).toLocaleDateString("id-ID")}
                      </td> */}

                      <td style={{ display: "flex", gap: ".5rem" }}>
                        <button
                          className="btn btn-outline btn-sm"
                          onClick={() => openDetail(o)}
                        >
                          Detail
                        </button>
                        {o.status !== "dibatalkan" &&
                          o.status !== "selesai" &&
                          o.status !== "dikirim" && (
                            <button
                              className="btn btn-outline btn-sm"
                              onClick={updateStatus.bind(
                                null,
                                "dibatalkan",
                                o.id_order,
                              )}
                            >
                              Batalkan
                            </button>
                          )}
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
                  marginBottom: "1rem",
                }}
              >
                <div>
                  <div className="text-muted">Pembeli</div>
                  <div style={{ fontWeight: 600 }}>{selected.user?.nama}</div>
                  <div style={{ fontSize: ".8rem" }}>
                    {selected.user?.email}
                  </div>
                </div>

                <div>
                  <div className="text-muted">Invoice</div>
                  <div style={{ fontWeight: 600 }}>
                    #INV-{String(selected.id_order).padStart(4, "0")}
                  </div>
                </div>

                <div>
                  <div className="text-muted">Status</div>
                  <span className={`badge ${statusBadgeMap[selected.status]}`}>
                    {selected.status}
                  </span>
                </div>

                <div>
                  <div className="text-muted">Total</div>
                  <div
                    style={{
                      fontWeight: 700,
                      color: "var(--brown)",
                    }}
                  >
                    Rp {Number(selected.total_harga).toLocaleString("id-ID")}
                  </div>
                </div>
              </div>
              <div
                style={{
                  background: "var(--cream)",
                  padding: "1rem",
                  borderRadius: "12px",
                  marginBottom: "1rem",
                }}
              >
                <h4>Daftar Produk</h4>

                {selected.order_items?.map((item) => (
                  <div
                    key={item.id_order_item}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: ".5rem 0",
                      borderBottom: "1px solid #eee",
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 600 }}>{item.produk?.nama}</div>

                      <div
                        style={{
                          fontSize: ".8rem",
                          color: "var(--muted)",
                        }}
                      >
                        {item.jumlah} x Rp{" "}
                        {Number(item.harga).toLocaleString("id-ID")}
                      </div>
                    </div>

                    <div>
                      Rp{" "}
                      {Number(item.harga * item.jumlah).toLocaleString("id-ID")}
                    </div>
                  </div>
                ))}
              </div>
              {selected.bukti_bayar && (
                <div style={{ marginBottom: "1rem" }}>
                  <h4>Bukti Pembayaran</h4>

                  <img
                    src={`${api.defaults.baseURL}/orders/bukti/${selected.id_order}`}
                    alt="Bukti Pembayaran"
                    style={{
                      width: "100%",
                      maxHeight: "350px",
                      objectFit: "contain",
                      borderRadius: "12px",
                      border: "1px solid #ddd",
                    }}
                  />
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-outline"
                onClick={() => setShowDetail(false)}
              >
                Tutup
              </button>
              {selected.status == "dibayar" ? (
                <button
                  className="btn btn-primary"
                  onClick={updateStatus.bind(
                    null,
                    "diproses",
                    selected.id_order,
                  )}
                >
                  Proses Pesanan
                </button>
              ) : selected.status == "diproses" ? (
                <button
                  className="btn btn-primary"
                  onClick={updateStatus.bind(
                    null,
                    "dikirim",
                    selected.id_order,
                  )}
                >
                  Kirim Pesanan
                </button>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminOrders;
