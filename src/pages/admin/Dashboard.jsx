import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import SidebarAdmin from "../../components/SidebarAdmin";

const days = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];
const vals = [3200000, 4100000, 2800000, 5600000, 4900000, 7200000, 6100000];
const max = Math.max(...vals);

const orders = [
  {
    inv: "#INV-0284",
    buyer: "Ibu Ratna",
    total: "Rp 65.000",
    status: "selesai",
  },
  {
    inv: "#INV-0283",
    buyer: "Pak Darto",
    total: "Rp 128.000",
    status: "dikirim",
  },
  {
    inv: "#INV-0282",
    buyer: "Bu Siti",
    total: "Rp 45.000",
    status: "diproses",
  },
  {
    inv: "#INV-0281",
    buyer: "Pak Budi",
    total: "Rp 210.000",
    status: "pending",
  },
  {
    inv: "#INV-0280",
    buyer: "CV Maju",
    total: "Rp 540.000",
    status: "selesai",
  },
];

const acts = [
  {
    icon: "🛒",
    bg: "#EAF3DE",
    title: "Pesanan baru dari Ibu Ratna",
    time: "2 menit lalu",
    amount: "+Rp 65.000",
  },
  {
    icon: "🤝",
    bg: "#FFF0E0",
    title: "Mitra baru mendaftar: Toko Makmur",
    time: "15 menit lalu",
    amount: "",
  },
  {
    icon: "💰",
    bg: "#EAF6EA",
    title: "Pembayaran QRIS berhasil #INV-0283",
    time: "32 menit lalu",
    amount: "+Rp 128.000",
  },
  {
    icon: "📦",
    bg: "#E0F0FF",
    title: "Pesanan #INV-0281 dikirim",
    time: "1 jam lalu",
    amount: "",
  },
  {
    icon: "⚠️",
    bg: "#FDECEA",
    title: "Stok Beras Ketan hampir habis",
    time: "2 jam lalu",
    amount: "",
  },
];

const pendingMitra = [
  { nama: "Toko Sumber Rejeki", toko: "Toko Sumber Rejeki", tgl: "18 Mei" },
  { nama: "Warung Nasi Ibu Ani", toko: "Warung Nasi Ibu Ani", tgl: "17 Mei" },
];

const statusBadge = {
  selesai: "badge-green",
  dikirim: "badge-blue",
  diproses: "badge-gold",
  pending: "badge-gray",
  dibatalkan: "badge-red",
};

function AdminDashboard() {
  const [mitra, setMitra] = useState(pendingMitra);
  const revealRefs = useRef([]);

  const verif = (index) => {
    const newMitra = [...mitra];
    newMitra[index].status = "verified";
    setMitra(newMitra);
    setTimeout(() => {
      setMitra((m) => m.filter((_, i) => i !== index));
    }, 1200);
  };

  const tolak = (index) => {
    const newMitra = [...mitra];
    newMitra[index].status = "rejected";
    setMitra(newMitra);
    setTimeout(() => {
      setMitra((m) => m.filter((_, i) => i !== index));
    }, 1200);
  };

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e, i) => {
          if (e.isIntersecting) {
            setTimeout(() => e.target.classList.add("visible"), i * 100);
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
          <div
            className="stat-grid reveal"
            ref={(el) => (revealRefs.current[0] = el)}
          >
            <div className="stat-card">
              <div className="stat-icon" style={{ background: "#EAF3DE" }}>
                💰
              </div>
              <div>
                <div className="stat-value">Rp 48,2jt</div>
                <div className="stat-label">Total Pendapatan</div>
                <div className="stat-change up">▲ 12% dari bulan lalu</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" style={{ background: "#FFF0E0" }}>
                📦
              </div>
              <div>
                <div className="stat-value">284</div>
                <div className="stat-label">Total Pesanan</div>
                <div className="stat-change up">▲ 8% dari bulan lalu</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" style={{ background: "#E0F0FF" }}>
                👥
              </div>
              <div>
                <div className="stat-value">1.240</div>
                <div className="stat-label">Total Pengguna</div>
                <div className="stat-change up">▲ 24 baru minggu ini</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" style={{ background: "#FFF8E0" }}>
                🤝
              </div>
              <div>
                <div className="stat-value">83</div>
                <div className="stat-label">Mitra Aktif</div>
                <div className="stat-change down">▼ 2 nonaktif bulan ini</div>
              </div>
            </div>
          </div>

          <div
            className="grid-2 reveal"
            ref={(el) => (revealRefs.current[1] = el)}
            style={{ marginBottom: "1.25rem" }}
          >
            <div className="chart-wrap">
              <div className="chart-header">
                <div className="section-title" style={{ margin: 0 }}>
                  Penjualan 7 Hari
                </div>
                <span className="badge badge-green">↑ Naik</span>
              </div>
              <div className="chart-bars">
                {days.map((d, i) => {
                  const pct = ((vals[i] / max) * 100).toFixed(0);
                  return (
                    <div key={i} className="bar-col">
                      <div className="bar-val">
                        Rp{(vals[i] / 1000000).toFixed(1)}jt
                      </div>
                      <div
                        className="bar"
                        style={{
                          height: `${pct}%`,
                          background: i === 5 ? "var(--green)" : "var(--brown)",
                        }}
                      ></div>
                      <div className="bar-label">{d}</div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="chart-wrap">
              <div className="chart-header">
                <div className="section-title" style={{ margin: 0 }}>
                  Produk Terlaris
                </div>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "2rem" }}
              >
                <div className="donut-wrap">
                  <svg width="120" height="120" viewBox="0 0 120 120">
                    <circle
                      cx="60"
                      cy="60"
                      r="45"
                      fill="none"
                      stroke="var(--cream2)"
                      strokeWidth="18"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="45"
                      fill="none"
                      stroke="var(--brown)"
                      strokeWidth="18"
                      strokeDasharray="113 170"
                      strokeDashoffset="0"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="45"
                      fill="none"
                      stroke="var(--green)"
                      strokeWidth="18"
                      strokeDasharray="68 215"
                      strokeDashoffset="-113"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="45"
                      fill="none"
                      stroke="var(--gold)"
                      strokeWidth="18"
                      strokeDasharray="45 238"
                      strokeDashoffset="-181"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="45"
                      fill="none"
                      stroke="var(--brown3)"
                      strokeWidth="18"
                      strokeDasharray="57 226"
                      strokeDashoffset="-226"
                    />
                  </svg>
                  <div className="donut-center">
                    <span className="donut-pct">50+</span>
                    <span className="donut-sub">Produk</span>
                  </div>
                </div>
                <div>
                  <div className="legend-item">
                    <div
                      className="legend-dot"
                      style={{ background: "var(--brown)" }}
                    ></div>{" "}
                    Beras Putih — 40%
                  </div>
                  <div className="legend-item">
                    <div
                      className="legend-dot"
                      style={{ background: "var(--green)" }}
                    ></div>{" "}
                    Beras Ketan — 24%
                  </div>
                  <div className="legend-item">
                    <div
                      className="legend-dot"
                      style={{ background: "var(--gold)" }}
                    ></div>{" "}
                    Ubi Jalar — 16%
                  </div>
                  <div className="legend-item">
                    <div
                      className="legend-dot"
                      style={{ background: "var(--brown3)" }}
                    ></div>{" "}
                    Lainnya — 20%
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="grid-2 reveal"
            ref={(el) => (revealRefs.current[2] = el)}
          >
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
                  {orders.map((o, i) => (
                    <tr key={i}>
                      <td>
                        <span
                          style={{
                            fontFamily: "DM Mono, monospace",
                            fontSize: ".8rem",
                          }}
                        >
                          {o.inv}
                        </span>
                      </td>
                      <td>{o.buyer}</td>
                      <td style={{ fontWeight: 600 }}>{o.total}</td>
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
              <div className="section-title">Aktivitas Terkini</div>
              {acts.map((a, i) => (
                <div key={i} className="activity-item">
                  <div className="act-icon" style={{ background: a.bg }}>
                    {a.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div className="act-title">{a.title}</div>
                    <div className="act-time">{a.time}</div>
                  </div>
                  {a.amount ? (
                    <div className="act-amount">{a.amount}</div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          {mitra.length > 0 && (
            <div
              className="table-wrap reveal"
              ref={(el) => (revealRefs.current[3] = el)}
              style={{ marginTop: "1.25rem" }}
            >
              <div className="table-header">
                <div className="table-title">⏳ Mitra Menunggu Verifikasi</div>
                <Link to="/admin/clients" className="btn btn-outline btn-sm">
                  Kelola Semua
                </Link>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Nama</th>
                    <th>Toko</th>
                    <th>Daftar</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {mitra.map((m, i) => (
                    <tr key={i} style={{ opacity: m.status ? 0 : 1 }}>
                      <td>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: ".6rem",
                          }}
                        >
                          <div
                            className="avatar"
                            style={{ background: "var(--cream2)" }}
                          >
                            🤝
                          </div>
                          {m.nama}
                        </div>
                      </td>
                      <td>{m.toko}</td>
                      <td style={{ fontSize: ".8rem", color: "var(--muted)" }}>
                        {m.tgl}
                      </td>
                      <td>
                        {m.status ? (
                          <span
                            className={`badge ${m.status === "verified" ? "badge-green" : "badge-red"}`}
                          >
                            {m.status === "verified"
                              ? "✓ Terverifikasi"
                              : "✕ Ditolak"}
                          </span>
                        ) : (
                          <div style={{ display: "flex", gap: ".4rem" }}>
                            <button
                              className="btn btn-green btn-sm"
                              onClick={() => verif(i)}
                            >
                              ✓ Verifikasi
                            </button>
                            <button
                              className="btn btn-red btn-sm"
                              onClick={() => tolak(i)}
                            >
                              ✕ Tolak
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
