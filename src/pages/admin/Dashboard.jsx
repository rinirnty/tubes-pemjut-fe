import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import SidebarAdmin from "../../components/SidebarAdmin";
import api from "../../utils/api";

const statusBadge = {
  selesai: "badge-green",
  dikirim: "badge-blue",
  diproses: "badge-gold",
  pending: "badge-gray",
  dibatalkan: "badge-red",
};

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const revealRefs = useRef([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, productsRes, ordersRes] = await Promise.all([
          api.get("/users"),
          api.get("/products"),
          api.get("/orders"),
        ]);

        setUsers(usersRes.data.data || []);
        setProducts(productsRes.data.data || []);
        setOrders(ordersRes.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalPendapatan = orders
    .filter((o) => o.status === "dibayar")
    .reduce((sum, o) => sum + Number(o.total_harga || 0), 0);

  const totalPesanan = orders.length;

  const totalUser = users.length;

  const stokMenipis = products
    .filter((p) => p.stok <= 10)
    .sort((a, b) => a.stok - b.stok)
    .slice(0, 5);

  const produkTerlaris = {};

  orders.forEach((order) => {
    order.order_items?.forEach((item) => {
      const nama = item.produk?.nama;

      if (!nama) return;

      produkTerlaris[nama] = (produkTerlaris[nama] || 0) + Number(item.jumlah);
    });
  });

  const topProducts = Object.entries(produkTerlaris)
    .map(([nama, total]) => ({
      nama,
      total,
    }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 5);

  return (
    <>
      <SidebarAdmin />
      <div className="main">
        <div className="topbar">
          <div>
            <div className="page-title">Dashboard</div>
            <div className="breadcrumb">Selamat datang kembali, Admin 👋</div>
          </div>
          <div className="topbar-right">
            <div className="topbar-btn" title="Notifikasi">
              🔔<div className="notif-dot"></div>
            </div>
            <div className="topbar-btn" title="Profil">
              👨‍💼
            </div>
          </div>
        </div>

        <div className="page-content">
          <div className="stat-grid" ref={(el) => (revealRefs.current[0] = el)}>
            <div className="stat-card">
              <div className="stat-icon" style={{ background: "#EAF3DE" }}>
                💰
              </div>
              <div>
                <div className="stat-value">
                  Rp {(totalPendapatan || 0).toLocaleString("id-ID")}
                </div>
                <div className="stat-label">Total Pendapatan</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" style={{ background: "#FFF0E0" }}>
                📦
              </div>
              <div>
                <div className="stat-value">{totalPesanan}</div>
                <div className="stat-label">Total Pesanan</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" style={{ background: "#E0F0FF" }}>
                👥
              </div>
              <div>
                <div className="stat-value">{totalUser}</div>
                <div className="stat-label">Total Pengguna</div>
              </div>
            </div>
          </div>

          <div
            className="grid-2"
            ref={(el) => (revealRefs.current[1] = el)}
            style={{ marginBottom: "1.25rem" }}
          >
            <div className="chart-wrap">
              <div className="section-title">Ringkasan Pesanan</div>

              <div className="stat-grid">
                <div className="stat-card">
                  <div className="stat-value">
                    {orders.filter((o) => o.status === "belum_bayar").length}
                  </div>
                  <div className="stat-label">Belum Bayar</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">
                    {orders.filter((o) => o.status === "dibayar").length}
                  </div>
                  <div className="stat-label">Dibayar</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">
                    {orders.filter((o) => o.status === "diproses").length}
                  </div>
                  <div className="stat-label">Diproses</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">
                    {orders.filter((o) => o.status === "dikirim").length}
                  </div>
                  <div className="stat-label">Dikirim</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">
                    {orders.filter((o) => o.status === "selesai").length}
                  </div>
                  <div className="stat-label">Selesai</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">
                    {orders.filter((o) => o.status === "dibatalkan").length}
                  </div>
                  <div className="stat-label">Dibatalkan</div>
                </div>
              </div>
            </div>
            <div className="chart-wrap">
              <div className="chart-header">
                <div className="section-title" style={{ margin: 0 }}>
                  Produk Terlaris
                </div>
              </div>
              <div style={{ width: "100%" }}>
                {topProducts.length === 0 ? (
                  <p>Belum ada data penjualan</p>
                ) : (
                  topProducts.map((p, index) => {
                    const maxSold = topProducts[0]?.total || 1;
                    const percent = (p.total / maxSold) * 100;

                    return (
                      <div key={index} style={{ marginBottom: "1rem" }}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: ".25rem",
                          }}
                        >
                          <span>{p.nama}</span>
                          <span>{p.total} terjual</span>
                        </div>

                        <div
                          style={{
                            width: "100%",
                            height: "10px",
                            background: "#eee",
                            borderRadius: "10px",
                          }}
                        >
                          <div
                            style={{
                              width: `${percent}%`,
                              height: "100%",
                              background: "var(--green)",
                              borderRadius: "10px",
                            }}
                          />
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          <div className="grid-2" ref={(el) => (revealRefs.current[2] = el)}>
            <div className="table-wrap">
              <div className="table-header">
                <div className="table-title">Pesanan Terbaru</div>
                <Link to="/admin/orders" className="btn btn-outline btn-sm">
                  Lihat Semua
                </Link>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Invoice</th>
                    <th>Pembeli</th>
                    <th>Total</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders
                    .slice()
                    .reverse()
                    .slice(0, 5)
                    .map((o) => (
                      <tr key={o.id_order}>
                        <td>
                          <span
                            style={{
                              fontFamily: "DM Mono, monospace",
                              fontSize: ".8rem",
                            }}
                          >
                            #{o.id_order}
                          </span>
                        </td>
                        <td>{o.user?.nama}</td>
                        <td style={{ fontWeight: 600 }}>
                          Rp {Number(o.total_harga).toLocaleString("id-ID")}
                        </td>
                        <td>
                          <span className={`badge ${statusBadge[o.status]}`}>
                            {o.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div className="card">
              <div className="section-title">Stok Menipis</div>

              {stokMenipis.map((p) => (
                <div key={p.id_produk} className="activity-item">
                  <div
                    className="act-icon"
                    style={{
                      background: "#FDECEA",
                    }}
                  >
                    📦
                  </div>

                  <div style={{ flex: 1 }}>
                    <div className="act-title">{p.nama}</div>

                    <div className="act-time">Stok tersisa {p.stok}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
