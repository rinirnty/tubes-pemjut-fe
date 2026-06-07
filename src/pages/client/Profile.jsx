import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import SidebarClient from "../../components/SidebarClient";
import api from "../../utils/api";

const notifs = [
  { label: "Pesanan baru dikonfirmasi", desc: "Notifikasi saat pesanan kamu berhasil dibuat", on: true },
  { label: "Status pengiriman berubah", desc: "Update real-time posisi paketmu", on: true },
  { label: "Pesanan tiba", desc: "Notif saat kurir sudah di lokasi", on: true },
  { label: "Promo & penawaran", desc: "Diskon dan promo menarik dari mitra", on: false },
  { label: "Pengingat keranjang", desc: "Ingatkan kamu jika ada item di keranjang", on: false },
];

function ClientProfile() {
  const [activeTab, setActiveTab] = useState("info");
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(null);
  const [editForm, setEditForm] = useState({ nama: "", telpon: "", alamat: "" });
  const [pwForm, setPwForm] = useState({ oldPassword: "", newPassword: "", confirmPassword: "" });
  const revealRefs = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get("/auth/me");
      setProfile(res.data);
      setEditForm({
        nama: res.data.nama || "",
        telpon: res.data.telpon || "",
        alamat: res.data.alamat || ""
      });
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) {
        navigate("/login");
      }
    }
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handlePwChange = (e) => {
    setPwForm({ ...pwForm, [e.target.name]: e.target.value });
  };

  const saveProfile = async () => {
    try {
      await api.patch("/auth/profile", editForm);
      alert("Profil berhasil disimpan!");
      fetchProfile();
      setIsEditing(false);
    } catch (err) {
      alert("Gagal menyimpan profil: " + (err.response?.data?.message || err.message));
    }
  };

  const savePassword = async () => {
    if (pwForm.newPassword !== pwForm.confirmPassword) {
      return alert("Konfirmasi password baru tidak cocok!");
    }
    try {
      await api.patch("/auth/change-password", {
        oldPassword: pwForm.oldPassword,
        newPassword: pwForm.newPassword
      });
      alert("Password berhasil diubah!");
      setPwForm({ oldPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      alert("Gagal mengubah password: " + (err.response?.data?.message || err.message));
    }
  };

  const logout = () => {
    if (window.confirm("Keluar dari semua sesi?")) {
      localStorage.removeItem("token");
      navigate("/login");
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
  }, [profile]); // re-run when profile loads to re-observe elements

  if (!profile) return <div style={{ padding: '2rem' }}>Loading...</div>;

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
              <div className="profile-name">{profile.nama}</div>
              <div className="profile-email">{profile.email}</div>
              <div className="profile-role">🛒 {profile.role}</div>
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
                      <span className="info-label">Nama Lengkap</span>
                      <span className="info-value">{profile.nama}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Email</span>
                      <span className="info-value">{profile.email}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">No. HP</span>
                      <span className="info-value">{profile.telpon}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Alamat Utama</span>
                      <span className="info-value">{profile.alamat || '-'}</span>
                    </div>
                  </div>
                ) : (
                  <div id="info-edit">
                    <div className="form-field" style={{ marginBottom: "1rem" }}>
                      <label>Nama Lengkap</label>
                      <input type="text" name="nama" value={editForm.nama} onChange={handleEditChange} />
                    </div>
                    <div className="form-field" style={{ marginBottom: "1rem" }}>
                      <label>No. HP</label>
                      <input type="text" name="telpon" value={editForm.telpon} onChange={handleEditChange} />
                    </div>
                    <div className="form-field" style={{ marginBottom: "1rem" }}>
                      <label>Alamat</label>
                      <input type="text" name="alamat" value={editForm.alamat} onChange={handleEditChange} />
                    </div>
                    <div style={{ display: "flex", gap: ".75rem" }}>
                      <button className="btn btn-primary" onClick={saveProfile}>
                        💾 Simpan
                      </button>
                      <button
                        className="btn btn-outline"
                        onClick={() => {
                          setIsEditing(false);
                          setEditForm({ nama: profile.nama, telpon: profile.telpon, alamat: profile.alamat });
                        }}
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
                      {profile.alamat || "Alamat belum diatur"}
                    </div>
                    <div
                      style={{
                        fontSize: ".78rem",
                        color: "var(--muted)",
                        marginTop: ".2rem",
                      }}
                    >
                      📱 {profile.telpon}
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
                  <input type="password" name="oldPassword" value={pwForm.oldPassword} onChange={handlePwChange} placeholder="Masukkan password lama" />
                </div>
                <div className="form-field" style={{ marginBottom: "1rem" }}>
                  <label>Password Baru</label>
                  <input type="password" name="newPassword" value={pwForm.newPassword} onChange={handlePwChange} placeholder="Minimal 8 karakter" />
                </div>
                <div className="form-field" style={{ marginBottom: "1.25rem" }}>
                  <label>Konfirmasi Password Baru</label>
                  <input type="password" name="confirmPassword" value={pwForm.confirmPassword} onChange={handlePwChange} placeholder="Ulangi password baru" />
                </div>
                <button
                  className="btn btn-primary"
                  onClick={savePassword}
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
                      💻 Sesi Saat Ini
                    </div>
                    <div style={{ fontSize: ".75rem", color: "var(--muted)" }}>
                      Aktif sekarang
                    </div>
                  </div>
                  <span className="badge badge-green">Aktif</span>
                </div>
                <div className="divider"></div>
                <button
                  className="btn btn-red"
                  onClick={logout}
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
