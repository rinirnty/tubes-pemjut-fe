import { useEffect, useRef, useState } from "react";
import SidebarAdmin from "../../components/SidebarAdmin";
import api from "../../utils/api";

const roleBadgeMap = { pembeli: "badge-blue", admin: "badge-brown", mitra: "badge-brown" };
const statusBadgeMap = {
  aktif: "badge-green",
  pending: "badge-gold",
  blokir: "badge-red",
};

function AdminClients() {
  const [users, setUsers] = useState([]);
  const [currentTab, setCurrentTab] = useState("semua");
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState(null);
  const revealRefs = useRef([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/users");
      const usersData = Array.isArray(res.data) ? res.data : (res.data.data || []);
      setUsers(usersData);
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = users.filter((u) => {
    let tabOk = false;
    if (currentTab === "semua") tabOk = true;
    else tabOk = u.role === currentTab;
    const qOk =
      u.nama?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase());
    return tabOk && qOk;
  });

  const openModal = (user) => {
    setSelected(user);
    setShowModal(true);
  };

  const deleteUser = async (user) => {
    if (window.confirm(`Yakin ingin menghapus ${user.nama}?`)) {
      try {
        await api.delete(`/users/${user.id}`);
        alert("Pengguna berhasil dihapus");
        fetchUsers();
        setShowModal(false);
      } catch (err) {
        alert("Gagal menghapus pengguna");
      }
    }
  };

  const tabTitles = {
    semua: "Semua Pengguna",
    pembeli: "Pembeli",
    admin: "Admin",
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
  }, [filtered]);

  return (
    <div style={{ minHeight: "100vh", display: "flex", overflow: "hidden" }}>
      <SidebarAdmin />
      <div className="main">
        <div className="topbar">
          <div>
            <div className="page-title">Kelola Pengguna</div>
            <div className="breadcrumb">Admin / Pengguna</div>
          </div>
          <div className="topbar-right">
            <button className="btn btn-outline btn-sm">📥 Export</button>
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
              <div className="stat-icon" style={{ background: "#E0F0FF" }}>
                👥
              </div>
              <div>
                <div className="stat-value">{users.length}</div>
                <div className="stat-label">Total Pengguna</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" style={{ background: "#EAF3DE" }}>
                🛒
              </div>
              <div>
                <div className="stat-value">
                  {users.filter((u) => u.role === "pembeli").length}
                </div>
                <div className="stat-label">Pembeli</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" style={{ background: "#FFF8E0" }}>
                ⚙️
              </div>
              <div>
                <div className="stat-value">
                  {users.filter((u) => u.role === "admin").length}
                </div>
                <div className="stat-label">Admin</div>
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: ".5rem",
              marginBottom: "1.25rem",
              flexWrap: "wrap",
            }}
            className="reveal"
            ref={(el) => (revealRefs.current[1] = el)}
          >
            {[
              { id: "semua", label: "Semua Pengguna" },
              { id: "pembeli", label: "🛒 Pembeli" },
              { id: "admin", label: "⚙️ Admin" },
            ].map((t) => (
              <button
                key={t.id}
                className={`filter-btn ${currentTab === t.id ? "active" : ""}`}
                onClick={() => setCurrentTab(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div
            className="table-wrap reveal"
            ref={(el) => (revealRefs.current[2] = el)}
          >
            <div className="table-header">
              <div className="table-title">{tabTitles[currentTab]}</div>
              <div className="table-actions">
                <div className="search-box">
                  <span>🔍</span>
                  <input
                    placeholder="Cari nama/email..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Pengguna</th>
                  <th>Role</th>
                  <th>No HP</th>
                  <th>Bergabung</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      style={{
                        textAlign: "center",
                        padding: "2rem",
                        color: "var(--muted)",
                      }}
                    >
                      Tidak ada pengguna
                    </td>
                  </tr>
                ) : (
                  filtered.map((u) => (
                    <tr key={u.id}>
                      <td>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: ".65rem",
                          }}
                        >
                          <div
                            className="avatar"
                            style={{ background: "var(--cream2)" }}
                          >
                            👤
                          </div>
                          <div>
                            <div
                              style={{ fontWeight: 600, fontSize: ".88rem" }}
                            >
                              {u.nama}
                            </div>
                            <div
                              style={{
                                fontSize: ".75rem",
                                color: "var(--muted)",
                              }}
                            >
                              {u.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className={`badge ${roleBadgeMap[u.role] || 'badge-blue'}`}>
                          {u.role}
                        </span>
                      </td>
                      <td style={{ fontSize: ".82rem" }}>{u.telpon || '-'}</td>
                      <td style={{ fontSize: ".78rem", color: "var(--muted)" }}>
                        {new Date(u.createdAt).toLocaleDateString('id-ID')}
                      </td>
                      <td>
                        <div style={{ display: "flex", gap: ".35rem" }}>
                          <button
                            className="btn btn-outline btn-sm"
                            onClick={() => openModal(u)}
                          >
                            Detail
                          </button>
                          <button
                            className="btn btn-red btn-sm"
                            onClick={() => deleteUser(u)}
                          >
                            🗑
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            <div className="pagination">
              <button className="pg-btn">←</button>
              <button className="pg-btn active">1</button>
              <button className="pg-btn">→</button>
              <span className="pg-info">
                Menampilkan {filtered.length} pengguna
              </span>
            </div>
          </div>
        </div>
      </div>

      {showModal && selected && (
        <div
          className="modal-overlay show"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowModal(false);
          }}
        >
          <div className="modal" style={{ maxWidth: "520px" }}>
            <div className="modal-header">
              <div className="modal-title">{selected.nama}</div>
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
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  marginBottom: "1.5rem",
                  padding: "1rem",
                  background: "var(--cream)",
                  borderRadius: "12px",
                }}
              >
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "50%",
                    background: "var(--cream2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "2rem",
                  }}
                >
                  👤
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "1rem" }}>
                    {selected.nama}
                  </div>
                  <div style={{ fontSize: ".82rem", color: "var(--muted)" }}>
                    {selected.email}
                  </div>
                  <div style={{ marginTop: ".3rem" }}>
                    <span className={`badge ${roleBadgeMap[selected.role] || 'badge-blue'}`}>
                      {selected.role}
                    </span>
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: ".85rem",
                }}
              >
                <div
                  style={{
                    padding: ".85rem",
                    background: "var(--cream)",
                    borderRadius: "10px",
                  }}
                >
                  <div
                    style={{
                      fontSize: ".72rem",
                      color: "var(--muted)",
                      marginBottom: ".25rem",
                    }}
                  >
                    No HP
                  </div>
                  <div style={{ fontWeight: 600, fontSize: ".88rem" }}>
                    {selected.telpon || '-'}
                  </div>
                </div>
                <div
                  style={{
                    padding: ".85rem",
                    background: "var(--cream)",
                    borderRadius: "10px",
                  }}
                >
                  <div
                    style={{
                      fontSize: ".72rem",
                      color: "var(--muted)",
                      marginBottom: ".25rem",
                    }}
                  >
                    Bergabung
                  </div>
                  <div style={{ fontWeight: 600, fontSize: ".88rem" }}>
                    {new Date(selected.createdAt).toLocaleDateString('id-ID')}
                  </div>
                </div>
              </div>
              <div style={{
                padding: ".85rem",
                background: "var(--cream)",
                borderRadius: "10px",
                marginTop: ".85rem"
              }}>
                <div style={{ fontSize: ".72rem", color: "var(--muted)", marginBottom: ".25rem" }}>Alamat</div>
                <div style={{ fontWeight: 600, fontSize: ".88rem" }}>{selected.alamat || '-'}</div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-outline"
                onClick={() => setShowModal(false)}
              >
                Tutup
              </button>
              <button
                className="btn btn-red"
                onClick={() => deleteUser(selected)}
              >
                🗑 Hapus Akun
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminClients;
