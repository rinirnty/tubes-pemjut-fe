import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import SidebarClient from "../../components/SidebarClient";

const notifs = [
  {
    label: "Pesanan baru dikonfirmasi",
    desc: "Notifikasi saat pesanan kamu berhasil dibuat",
    on: true,
  },
  {
    label: "Status pengiriman berubah",
    desc: "Update real-time posisi paketmu",
    on: true,
  },
  { label: "Pesanan tiba", desc: "Notif saat kurir sudah di lokasi", on: true },
  {
    label: "Promo & penawaran",
    desc: "Diskon dan promo menarik dari mitra",
    on: false,
  },
  {
    label: "Pengingat keranjang",
    desc: "Ingatkan kamu jika ada item di keranjang",
    on: false,
  },
];

function ClientProfile() {
  const [activeTab, setActiveTab] = useState("info");
  const [isEditing, setIsEditing] = useState(false);
  const revealRefs = useRef([]);

  const saveProfile = () => {
    alert("Profil berhasil disimpan!");
    setIsEditing(false);
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
            <div className="page-title">Profil Saya</div>
            <div className="breadcrumb">Kelola informasi akun kamu</div>
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
            className="profile-header reveal"
            ref={(el) => (revealRefs.current[0] = el)}
          >
            <div className="profile-avatar-big">👩</div>
            <div>
              <div className="profile-name">Ibu Ratna Wulandari</div>
              <div className="profile-email">ratna@email.com</div>
              <div className="profile-role">🛒 Pembeli</div>
            </div>
          </div>

          <div
            className="tab-nav reveal"
            ref={(el) => (revealRefs.current[1] = el)}
          >
            <button
              className={`tab-btn ${activeTab === "info" ? "active" : ""}`}
              onClick={() => setActiveTab("info")}
            >
              👤 Info Akun
            </button>
            <button
              className={`tab-btn ${activeTab === "alamat" ? "active" : ""}`}
              onClick={() => setActiveTab("alamat")}
            >
              📍 Alamat
            </button>
            <button
              className={`tab-btn ${activeTab === "keamanan" ? "active" : ""}`}
              onClick={() => setActiveTab("keamanan")}
            >
              🔒 Keamanan
            </button>
            <button
              className={`tab-btn ${activeTab === "notif" ? "active" : ""}`}
              onClick={() => setActiveTab("notif")}
            >
              🔔 Notifikasi
            </button>
          </div>

          {activeTab === "info" && (
            <div
              className="tab-panel active reveal"
              ref={(el) => (revealRefs.current[2] = el)}
            >
              <div className="card">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "1.25rem",
                  }}
                >
                  <div className="section-title" style={{ margin: 0 }}>
                    Informasi Pribadi
                  </div>
                  <button
                    className="btn btn-outline btn-sm"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    ✏️ Edit
                  </button>
                </div>
                {!isEditing ? (
                  <div id="info-view">
                    <div className="info-row">
                      <span className="info-label">Nama Depan</span>
                      <span className="info-value">Ratna</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Nama Belakang</span>
                      <span className="info-value">Wulandari</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Email</span>
                      <span className="info-value">ratna@email.com</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">No. HP</span>
                      <span className="info-value">081234567890</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Bergabung</span>
                      <span className="info-value">10 Januari 2025</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Total Pesanan</span>
                      <span
                        className="info-value"
                        style={{ color: "var(--green)", fontWeight: 700 }}
                      >
                        24 pesanan
                      </span>
                    </div>
                  </div>
                ) : (
                  <div id="info-edit">
                    <div className="form-row" style={{ marginBottom: "1rem" }}>
                      <div className="form-field">
                        <label>Nama Depan</label>
                        <input type="text" defaultValue="Ratna" />
                      </div>
                      <div className="form-field">
                        <label>Nama Belakang</label>
                        <input type="text" defaultValue="Wulandari" />
                      </div>
                    </div>
                    <div
                      className="form-field"
                      style={{ marginBottom: "1rem" }}
                    >
                      <label>No. HP</label>
                      <input type="text" defaultValue="081234567890" />
                    </div>
                    <div style={{ display: "flex", gap: ".75rem" }}>
                      <button className="btn btn-primary" onClick={saveProfile}>
                        💾 Simpan
                      </button>
                      <button
                        className="btn btn-outline"
                        onClick={() => setIsEditing(false)}
                      >
                        Batal
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "alamat" && (
            <div
              className="tab-panel reveal"
              ref={(el) => (revealRefs.current[3] = el)}
            >
              <div className="card">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "1.25rem",
                  }}
                >
                  <div className="section-title" style={{ margin: 0 }}>
                    Alamat Tersimpan
                  </div>
                  <button className="btn btn-primary btn-sm">
                    + Tambah Alamat
                  </button>
                </div>
                <div className="addr-card default selected">
                  <div>
                    <div style={{ fontWeight: 600, fontSize: ".9rem" }}>
                      Rumah <span className="addr-tag">Utama</span>
                    </div>
                    <div
                      style={{
                        fontSize: ".82rem",
                        color: "var(--muted)",
                        marginTop: ".25rem",
                      }}
                    >
                      Jl. Merdeka No.5, RT 03/04, Kel. Sukajadi, Kec. Sukajadi,
                      Bandung 40163
                    </div>
                    <div
                      style={{
                        fontSize: ".78rem",
                        color: "var(--muted)",
                        marginTop: ".2rem",
                      }}
                    >
                      📱 081234567890
                    </div>
                  </div>
                  <div
                    style={{ display: "flex", gap: ".35rem", flexShrink: 0 }}
                  >
                    <button className="btn btn-outline btn-sm">✏️</button>
                    <button className="btn btn-red btn-sm">🗑</button>
                  </div>
                </div>
                <div className="addr-card">
                  <div>
                    <div style={{ fontWeight: 600, fontSize: ".9rem" }}>
                      Kantor
                    </div>
                    <div
                      style={{
                        fontSize: ".82rem",
                        color: "var(--muted)",
                        marginTop: ".25rem",
                      }}
                    >
                      Jl. Asia Afrika No.10, Kel. Braga, Kec. Sumur Bandung,
                      Bandung 40111
                    </div>
                    <div
                      style={{
                        fontSize: ".78rem",
                        color: "var(--muted)",
                        marginTop: ".2rem",
                      }}
                    >
                      📱 081234567890
                    </div>
                  </div>
                  <div
                    style={{ display: "flex", gap: ".35rem", flexShrink: 0 }}
                  >
                    <button className="btn btn-outline btn-sm">✏️</button>
                    <button className="btn btn-red btn-sm">🗑</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "keamanan" && (
            <div
              className="tab-panel reveal"
              ref={(el) => (revealRefs.current[4] = el)}
            >
              <div className="card">
                <div className="section-title">Ubah Password</div>
                <div className="form-field" style={{ marginBottom: "1rem" }}>
                  <label>Password Lama</label>
                  <input type="password" placeholder="Masukkan password lama" />
                </div>
                <div className="form-field" style={{ marginBottom: "1rem" }}>
                  <label>Password Baru</label>
                  <input type="password" placeholder="Minimal 8 karakter" />
                </div>
                <div className="form-field" style={{ marginBottom: "1.25rem" }}>
                  <label>Konfirmasi Password Baru</label>
                  <input type="password" placeholder="Ulangi password baru" />
                </div>
                <button
                  className="btn btn-primary"
                  onClick={() => alert("Password berhasil diubah!")}
                >
                  🔒 Simpan Password
                </button>
                <div className="divider"></div>
                <div className="section-title">Sesi Aktif</div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: ".85rem",
                    background: "var(--cream)",
                    borderRadius: "12px",
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 600, fontSize: ".88rem" }}>
                      💻 Chrome — Windows
                    </div>
                    <div style={{ fontSize: ".75rem", color: "var(--muted)" }}>
                      Bandung, Indonesia — Aktif sekarang
                    </div>
                  </div>
                  <span className="badge badge-green">Aktif</span>
                </div>
                <div className="divider"></div>
                <button
                  className="btn btn-red"
                  onClick={() =>
                    confirm("Keluar dari semua sesi?") &&
                    (window.location.href = "/login")
                  }
                >
                  🚪 Keluar dari Semua Sesi
                </button>
              </div>
            </div>
          )}

          {activeTab === "notif" && (
            <div
              className="tab-panel reveal"
              ref={(el) => (revealRefs.current[5] = el)}
            >
              <div className="card">
                <div className="section-title">Preferensi Notifikasi</div>
                {notifs.map((n, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: ".9rem 0",
                      borderBottom: "1px solid var(--border)",
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 600, fontSize: ".88rem" }}>
                        {n.label}
                      </div>
                      <div
                        style={{ fontSize: ".75rem", color: "var(--muted)" }}
                      >
                        {n.desc}
                      </div>
                    </div>
                    <label
                      style={{
                        position: "relative",
                        width: "42px",
                        height: "24px",
                        cursor: "pointer",
                        flexShrink: 0,
                      }}
                    >
                      <input
                        type="checkbox"
                        defaultChecked={n.on}
                        style={{ opacity: 0, width: 0, height: 0 }}
                      />
                      <span
                        style={{
                          position: "absolute",
                          inset: 0,
                          background: n.on ? "var(--green)" : "var(--cream2)",
                          borderRadius: "999px",
                          transition: ".3s",
                        }}
                      ></span>
                      <span
                        style={{
                          position: "absolute",
                          width: "18px",
                          height: "18px",
                          background: "#fff",
                          borderRadius: "50%",
                          top: "3px",
                          transition: ".3s",
                          left: n.on ? "21px" : "3px",
                        }}
                      ></span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ClientProfile;
