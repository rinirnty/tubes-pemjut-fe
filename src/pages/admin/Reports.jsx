import { useEffect, useRef, useState } from "react";
import SidebarAdmin from "../../components/SidebarAdmin";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Mei",
  "Jun",
  "Jul",
  "Ags",
  "Sep",
  "Okt",
  "Nov",
  "Des",
];
const monthVals = [28, 32, 35, 41, 48, 0, 0, 0, 0, 0, 0, 0];
const maxM = Math.max(...monthVals.filter((v) => v > 0));

const topProds = [
  { name: "🍚 Beras Pandan Wangi", pct: 40, color: "var(--brown)" },
  { name: "🌾 Beras Ketan Putih", pct: 24, color: "var(--green)" },
  { name: "🍠 Ubi Jalar Merah", pct: 16, color: "var(--gold)" },
  { name: "🟤 Singkong Segar", pct: 12, color: "var(--brown3)" },
  { name: "🌿 Beras Merah", pct: 8, color: "var(--green2)" },
];

const komisis = [
  {
    id: 1,
    nama: "Pak Hendra",
    toko: "UD Hendra Pangan",
    amount: "Rp 4.100.000",
    status: "dibayar",
    avatar: "👨",
  },
  {
    id: 2,
    nama: "Bu Siti",
    toko: "Mitra Bu Siti",
    amount: "Rp 2.800.000",
    status: "dibayar",
    avatar: "👩",
  },
  {
    id: 3,
    nama: "Pak Darmawan",
    toko: "Toko Makmur Jaya",
    amount: "Rp 2.400.000",
    status: "pending",
    avatar: "👨‍💼",
  },
  {
    id: 4,
    nama: "CV Agri",
    toko: "CV Agri Nusantara",
    amount: "Rp 1.800.000",
    status: "dibayar",
    avatar: "🏢",
  },
  {
    id: 5,
    nama: "Pak Budi",
    toko: "Mitra Pak Budi",
    amount: "Rp 900.000",
    status: "pending",
    avatar: "👨",
  },
];

const transaksis = [
  {
    id: 1,
    inv: "#INV-0284",
    tgl: "19 Mei 2025",
    buyer: "Ibu Ratna",
    mitra: "Pak Hendra",
    prod: "Beras Pandan 5kg x2",
    total: "Rp 130.000",
    komisi: "Rp 13.000",
    status: "selesai",
  },
  {
    id: 2,
    inv: "#INV-0283",
    tgl: "19 Mei 2025",
    buyer: "Pak Darto",
    mitra: "Pak Darto",
    prod: "Ubi Jalar 10kg",
    total: "Rp 80.000",
    komisi: "Rp 8.000",
    status: "dikirim",
  },
  {
    id: 3,
    inv: "#INV-0282",
    tgl: "18 Mei 2025",
    buyer: "Bu Siti",
    mitra: "Bu Siti",
    prod: "Beras Ketan 3kg",
    total: "Rp 84.000",
    komisi: "Rp 8.400",
    status: "diproses",
  },
  {
    id: 4,
    inv: "#INV-0281",
    tgl: "18 Mei 2025",
    buyer: "Pak Budi",
    mitra: "Pak Budi",
    prod: "Singkong 20kg",
    total: "Rp 100.000",
    komisi: "Rp 10.000",
    status: "pending",
  },
  {
    id: 5,
    inv: "#INV-0280",
    tgl: "15 Mei 2025",
    buyer: "CV Maju",
    mitra: "Pak Hendra",
    prod: "Beras IR 64 5kg x4",
    total: "Rp 220.000",
    komisi: "Rp 22.000",
    status: "selesai",
  },
];

const statusBadgeMap = {
  selesai: "badge-green",
  dikirim: "badge-blue",
  diproses: "badge-gold",
  pending: "badge-gray",
  dibatalkan: "badge-red",
};

function AdminReports() {
  const [period, setPeriod] = useState("bulan");
  const revealRefs = useRef([]);

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
            <div className="page-title">Laporan</div>
            <div className="breadcrumb">Admin / Laporan</div>
          </div>
          <div className="topbar-right">
            <div className="period-selector">
              {[
                { id: "minggu", label: "Minggu" },
                { id: "bulan", label: "Bulan" },
                { id: "tahun", label: "Tahun" },
              ].map((p) => (
                <button
                  key={p.id}
                  className={`period-btn ${period === p.id ? "active" : ""}`}
                  onClick={() => setPeriod(p.id)}
                >
                  {p.label}
                </button>
              ))}
            </div>
            <button className="btn btn-outline btn-sm">📥 Export PDF</button>
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
              <div className="stat-icon" style={{ background: "#EAF3DE" }}>
                💰
              </div>
              <div>
                <div className="stat-value">Rp 48,2jt</div>
                <div className="stat-label">Pendapatan Bulan Ini</div>
                <div className="stat-change up">▲ 12% vs bulan lalu</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" style={{ background: "#FFF0E0" }}>
                🤝
              </div>
              <div>
                <div className="stat-value">Rp 9,6jt</div>
                <div className="stat-label">Total Komisi Mitra</div>
                <div className="stat-change up">▲ 8% vs bulan lalu</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" style={{ background: "#E0F0FF" }}>
                📦
              </div>
              <div>
                <div className="stat-value">284</div>
                <div className="stat-label">Pesanan Selesai</div>
                <div className="stat-change up">▲ 35 vs bulan lalu</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" style={{ background: "#F5EDE0" }}>
                🌾
              </div>
              <div>
                <div className="stat-value">Rp 38,6jt</div>
                <div className="stat-label">Pendapatan Bersih</div>
                <div className="stat-change up">▲ 14% vs bulan lalu</div>
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
                  Pendapatan per Bulan (2025)
                </div>
              </div>
              <div className="bar-chart-h">
                {months.map((m, i) => {
                  if (monthVals[i] === 0) return null;
                  const pct = ((monthVals[i] / maxM) * 100).toFixed(0);
                  const colors = [
                    "var(--brown2)",
                    "var(--brown2)",
                    "var(--brown2)",
                    "var(--brown2)",
                    "var(--green)",
                  ];
                  return (
                    <div key={i} className="bh-row">
                      <div className="bh-label">{m} 2025</div>
                      <div className="bh-bar-wrap">
                        <div
                          className="bh-bar"
                          style={{
                            width: `${pct}%`,
                            background: colors[i] || "var(--brown2)",
                          }}
                        >
                          <span className="bh-val">Rp {monthVals[i]}jt</span>
                        </div>
                      </div>
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
              <div className="bar-chart-h">
                {topProds.map((p, i) => (
                  <div key={i} className="bh-row">
                    <div className="bh-label" style={{ fontSize: ".75rem" }}>
                      {p.name}
                    </div>
                    <div className="bh-bar-wrap">
                      <div
                        className="bh-bar"
                        style={{ width: `${p.pct}%`, background: p.color }}
                      >
                        <span className="bh-val">{p.pct}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div
            className="grid-2 reveal"
            ref={(el) => (revealRefs.current[2] = el)}
            style={{ marginBottom: "1.25rem" }}
          >
            <div className="chart-wrap">
              <div className="chart-header">
                <div className="section-title" style={{ margin: 0 }}>
                  Komisi Mitra Bulan Ini
                </div>
                <a href="/admin/clients" className="btn btn-outline btn-sm">
                  Lihat Semua
                </a>
              </div>
              {komisis.map((k) => (
                <div key={k.id} className="komisi-item">
                  <div className="komisi-left">
                    <div
                      className="avatar"
                      style={{ background: "var(--cream2)" }}
                    >
                      {k.avatar}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: ".87rem" }}>
                        {k.nama}
                      </div>
                      <div
                        style={{ fontSize: ".75rem", color: "var(--muted)" }}
                      >
                        {k.toko}
                      </div>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div className="komisi-amount">{k.amount}</div>
                    <span
                      className={`badge ${k.status === "dibayar" ? "badge-green" : "badge-gold"}`}
                      style={{ marginTop: ".2rem" }}
                    >
                      {k.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="chart-wrap">
              <div className="chart-header">
                <div className="section-title" style={{ margin: 0 }}>
                  Ringkasan Transaksi
                </div>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1rem",
                  marginBottom: "1.25rem",
                }}
              >
                <div
                  style={{
                    background: "var(--cream)",
                    borderRadius: "12px",
                    padding: "1rem",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: ".75rem",
                      color: "var(--muted)",
                      marginBottom: ".3rem",
                    }}
                  >
                    Total Transaksi
                  </div>
                  <div
                    style={{
                      fontFamily: "Playfair Display,serif",
                      fontSize: "1.5rem",
                      fontWeight: 700,
                      color: "var(--brown)",
                    }}
                  >
                    284
                  </div>
                </div>
                <div
                  style={{
                    background: "var(--cream)",
                    borderRadius: "12px",
                    padding: "1rem",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: ".75rem",
                      color: "var(--muted)",
                      marginBottom: ".3rem",
                    }}
                  >
                    Rata-rata/Transaksi
                  </div>
                  <div
                    style={{
                      fontFamily: "Playfair Display,serif",
                      fontSize: "1.5rem",
                      fontWeight: 700,
                      color: "var(--green)",
                    }}
                  >
                    Rp 170rb
                  </div>
                </div>
                <div
                  style={{
                    background: "var(--cream)",
                    borderRadius: "12px",
                    padding: "1rem",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: ".75rem",
                      color: "var(--muted)",
                      marginBottom: ".3rem",
                    }}
                  >
                    Lunas
                  </div>
                  <div
                    style={{
                      fontFamily: "Playfair Display,serif",
                      fontSize: "1.5rem",
                      fontWeight: 700,
                      color: "var(--green)",
                    }}
                  >
                    271
                  </div>
                </div>
                <div
                  style={{
                    background: "var(--cream)",
                    borderRadius: "12px",
                    padding: "1rem",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: ".75rem",
                      color: "var(--muted)",
                      marginBottom: ".3rem",
                    }}
                  >
                    Dibatalkan
                  </div>
                  <div
                    style={{
                      fontFamily: "Playfair Display,serif",
                      fontSize: "1.5rem",
                      fontWeight: 700,
                      color: "var(--red)",
                    }}
                  >
                    13
                  </div>
                </div>
              </div>
              <div
                style={{
                  background: "var(--cream)",
                  borderRadius: "12px",
                  padding: "1rem",
                }}
              >
                <div
                  style={{
                    fontSize: ".78rem",
                    color: "var(--muted)",
                    marginBottom: ".5rem",
                    fontWeight: 600,
                  }}
                >
                  Metode Pembayaran
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: ".85rem",
                    marginBottom: ".4rem",
                  }}
                >
                  <span>QRIS</span>
                  <span style={{ fontWeight: 600, color: "var(--green)" }}>
                    91%
                  </span>
                </div>
                <div
                  style={{
                    height: "8px",
                    background: "var(--cream2)",
                    borderRadius: "99px",
                    overflow: "hidden",
                    marginBottom: ".6rem",
                  }}
                >
                  <div
                    style={{
                      width: "91%",
                      height: "100%",
                      background: "var(--green)",
                      borderRadius: "99px",
                    }}
                  ></div>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: ".85rem",
                    marginBottom: ".4rem",
                  }}
                >
                  <span>Transfer Bank</span>
                  <span style={{ fontWeight: 600, color: "var(--blue)" }}>
                    9%
                  </span>
                </div>
                <div
                  style={{
                    height: "8px",
                    background: "var(--cream2)",
                    borderRadius: "99px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: "9%",
                      height: "100%",
                      background: "var(--blue)",
                      borderRadius: "99px",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="table-wrap reveal"
            ref={(el) => (revealRefs.current[3] = el)}
          >
            <div className="table-header">
              <div className="table-title">Rincian Transaksi</div>
              <div className="table-actions">
                <div className="search-box">
                  <span>🔍</span>
                  <input placeholder="Cari transaksi..." />
                </div>
                <button className="btn btn-outline btn-sm">
                  📥 Export CSV
                </button>
              </div>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Invoice</th>
                  <th>Tanggal</th>
                  <th>Pembeli</th>
                  <th>Mitra</th>
                  <th>Produk</th>
                  <th>Total</th>
                  <th>Komisi</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {transaksis.map((t) => (
                  <tr key={t.id}>
                    <td>
                      <span
                        style={{
                          fontFamily: "DM Mono,monospace",
                          fontSize: ".78rem",
                          color: "var(--brown)",
                        }}
                      >
                        {t.inv}
                      </span>
                    </td>
                    <td style={{ fontSize: ".78rem", color: "var(--muted)" }}>
                      {t.tgl}
                    </td>
                    <td style={{ fontSize: ".85rem" }}>{t.buyer}</td>
                    <td>{t.mitra}</td>
                    <td
                      style={{
                        fontSize: ".8rem",
                        maxWidth: "120px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {t.prod}
                    </td>
                    <td style={{ fontWeight: 600 }}>{t.total}</td>
                    <td
                      style={{
                        fontFamily: "DM Mono,monospace",
                        fontSize: ".82rem",
                        color: "var(--green)",
                      }}
                    >
                      {t.komisi}
                    </td>
                    <td>
                      <span className={`badge ${statusBadgeMap[t.status]}`}>
                        {t.status}
                      </span>
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
                Menampilkan {transaksis.length} dari 284 transaksi
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminReports;
