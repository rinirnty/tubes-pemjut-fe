import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import SidebarClient from "../../components/SidebarClient";
import api from "../../utils/api";

const sbadge = {
  selesai: "badge-green",
  dikirim: "badge-blue",
  diproses: "badge-gold",
  dibayar: "badge-gray",
  dibatalkan: "badge-red",
};
const pbadge = { lunas: "badge-green", "belum bayar": "badge-red" };
const statuses = [
  "Semua",
  "dibayar",
  "diproses",
  "dikirim",
  "selesai",
  "dibatalkan",
];

function ClientHistory() {
  const [orders, setOrders] = useState([]);
  const [filterStatus, setFilterStatus] = useState("Semua");
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderDetail, setOrderDetail] = useState(null);
  const [buktiBayar, setBuktiBayar] = useState(null);
  const [uploading, setUploading] = useState(false);
  const revealRefs = useRef([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const profileRes = await api.get("/auth/me");
      const userId = profileRes.data.data.id_user;
      const res = await api.get(`/orders/${userId}`);
      const ordersData = Array.isArray(res.data)
        ? res.data
        : res.data.data || [];
      setOrders(ordersData);
    } catch (err) {
      console.error(err);
    }
  };

  const showDetail = async (o) => {
    setSelectedOrder(o);
    setShowModal(true);
    try {
      const res = await api.get(`/orders/detail/${o.id_order}`);
      const detailData = res.data;
      setOrderDetail(detailData);
    } catch (err) {
      console.error(err);
    }
  };

  const reorder = () => {
    alert("Fitur pesan ulang akan datang!");
    setShowModal(false);
    // You could map over orderDetail.items and update cart in localStorage here
  };

  const filtered = orders.filter((o) => {
    const matchesStatus = filterStatus === "Semua" || o.status === filterStatus;
    const invStr = `#INV-${o.id_order}`;
    const matchesSearch = invStr.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const formatRupiah = (n) => "Rp " + Number(n).toLocaleString("id-ID");

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
  }, [filtered]);

  const uploadBuktiPembayaran = async () => {
    if (!buktiBayar) {
      alert("Silakan pilih file bukti pembayaran");
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("bukti_bayar", buktiBayar);

      await api.patch(`/orders/${selectedOrder.id_order}/status`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Bukti pembayaran berhasil dikirim");

      setShowModal(false);
      setBuktiBayar(null);

      fetchOrders();
    } catch (error) {
      console.error(error);
      alert(
        error?.response?.data?.message || "Gagal mengunggah bukti pembayaran",
      );
    } finally {
      setUploading(false);
    }
  };

  const updateStatus = async (newStatus, id_order) => {
    try {
      await api.patch(`/orders/${id_order}/update`, {
        status: newStatus,
      });
      fetchOrders();
      setShowDetail(false);
    } catch (err) {
      console.error(err);
    }
  };

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
                  <th>Total</th>
                  <th>Status</th>
                  {/* <th>Tanggal</th> */}
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
                        #INV-{o.id_order}
                      </span>
                    </td>
                    <td style={{ fontWeight: 600 }}>
                      {formatRupiah(o.total_harga || 0)}
                    </td>
                    <td>
                      <span
                        className={`badge ${sbadge[o.status] || "badge-gray"}`}
                      >
                        {o.status || "dibayar"}
                      </span>
                    </td>
                    {/* <td style={{ fontSize: ".78rem", color: "var(--muted)" }}>
                      {new Date(o.createdAt || o.tanggal).toLocaleDateString(
                        "id-ID",
                      )}
                    </td> */}
                    <td>
                      <div style={{ display: "flex", gap: ".35rem" }}>
                        <button
                          className="btn btn-outline btn-sm"
                          onClick={() => showDetail(o)}
                        >
                          Detail
                        </button>
                        {o.status === "dikirim" && (
                          <button
                            className="btn btn-outline btn-sm"
                            onClick={() => updateStatus("selesai", o.id_order)}
                          >
                            Selesai
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
              <div className="modal-title">
                Detail #INV-{selectedOrder.id_order}
              </div>
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
                {!orderDetail ? (
                  <div>Loading details...</div>
                ) : (
                  (orderDetail.order_items || []).map((item, i) => {
                    {
                      // console.log(item);
                    }
                    const prodName =
                      item.produk?.nama || `Produk ID ${item.id_produk}`;
                    const qty = item.jumlah;
                    const hrg = item.produk?.harga || 0;
                    return (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: ".75rem",
                          padding: ".5rem 0",
                        }}
                      >
                        <span style={{ fontSize: "2rem" }}>🌾</span>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 600, fontSize: ".88rem" }}>
                            {prodName}
                          </div>
                          <div
                            style={{
                              fontSize: ".75rem",
                              color: "var(--muted)",
                            }}
                          >
                            {formatRupiah(hrg)} × {qty}
                          </div>
                        </div>
                        <div style={{ fontWeight: 700, color: "var(--brown)" }}>
                          {formatRupiah(hrg * qty)}
                        </div>
                      </div>
                    );
                  })
                )}
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
                    {formatRupiah(selectedOrder.total_harga || 0)}
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
                    Status
                  </div>
                  <span
                    className={`badge ${sbadge[selectedOrder.status] || "badge-gray"}`}
                  >
                    {selectedOrder.status || "dibayar"}
                  </span>
                </div>
              </div>
            </div>
            {selectedOrder.status === "belum_bayar" && (
              <div
                style={{
                  marginTop: "1rem",
                  background: "var(--cream)",
                  padding: "1rem",
                  borderRadius: "12px",
                }}
              >
                <div
                  style={{
                    fontWeight: 600,
                    marginBottom: ".5rem",
                  }}
                >
                  Upload Bukti Pembayaran
                </div>

                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => setBuktiBayar(e.target.files[0])}
                  style={{ marginBottom: ".75rem" }}
                />

                <button
                  className="btn btn-primary"
                  onClick={uploadBuktiPembayaran}
                  disabled={uploading}
                >
                  {uploading ? "Mengirim..." : "Kirim Bukti Pembayaran"}
                </button>
              </div>
            )}
            <div className="modal-footer">
              <button
                className="btn btn-outline"
                onClick={() => setShowModal(false)}
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ClientHistory;
