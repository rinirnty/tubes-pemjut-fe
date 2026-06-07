import { useEffect, useRef, useState } from "react";
import SidebarAdmin from "../../components/SidebarAdmin";

const initialUsers = [
  {
    id: 1,
    name: "Ibu Ratna Wulandari",
    email: "ratna@email.com",
    phone: "081234567890",
    role: "pembeli",
    joined: "10 Jan 2025",
    orders: 24,
    status: "aktif",
    avatar: "👩",
  },
  {
    id: 2,
    name: "Pak Darto",
    email: "darto@email.com",
    phone: "082345678901",
    role: "mitra",
    toko: "UD Darto Pangan",
    joined: "15 Feb 2025",
    orders: 0,
    status: "aktif",
    komisi: "Rp 3.8jt",
    avatar: "👨",
  },
  {
    id: 3,
    name: "Bu Siti Aminah",
    email: "siti@email.com",
    phone: "083456789012",
    role: "pembeli",
    joined: "20 Feb 2025",
    orders: 8,
    status: "aktif",
    avatar: "👩‍💼",
  },
  {
    id: 4,
    name: "Pak Hendra Wijaya",
    email: "hendra@email.com",
    phone: "084567890123",
    role: "mitra",
    toko: "UD Hendra Pangan",
    joined: "1 Mar 2025",
    orders: 0,
    status: "aktif",
    komisi: "Rp 4.1jt",
    avatar: "👨",
  },
  {
    id: 5,
    name: "Pak Budi Santoso",
    email: "budi@email.com",
    phone: "086789012345",
    role: "pembeli",
    joined: "2 Apr 2025",
    orders: 3,
    status: "aktif",
    avatar: "👨",
  },
  {
    id: 6,
    name: "Akun Spam",
    email: "spam@email.com",
    phone: "-",
    role: "pembeli",
    joined: "10 Mei 2025",
    orders: 0,
    status: "blokir",
    avatar: "🚫",
  },
  {
    id: 7,
    name: "Mitra Baru",
    email: "mitrabaruu@email.com",
    phone: "087654321098",
    role: "mitra",
    toko: "Toko Baru",
    joined: "18 Mei 2025",
    orders: 0,
    status: "pending",
    avatar: "🤝",
  },
];

const roleBadgeMap = { pembeli: "badge-blue", mitra: "badge-brown" };
const statusBadgeMap = {
  aktif: "badge-green",
  pending: "badge-gold",
  blokir: "badge-red",
};

function AdminClients() {
  const [users, setUsers] = useState(initialUsers);
  const [currentTab, setCurrentTab] = useState("semua");
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState(null);
  const revealRefs = useRef([]);

  const filtered = users.filter((u) => {
    let tabOk = false;
    if (currentTab === "semua") tabOk = true;
    else if (currentTab === "pending") tabOk = u.status === "pending";
    else if (currentTab === "blokir") tabOk = u.status === "blokir";
    else tabOk = u.role === currentTab;
    const qOk =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    return tabOk && qOk;
  });

  const openModal = (user) => {
    setSelected(user);
    setShowModal(true);
  };

  const updateStatus = (user, newStatus) => {
    setUsers(
      users.map((u) => (u.id === user.id ? { ...u, status: newStatus } : u)),
    );
    if (selected) setSelected({ ...selected, status: newStatus });
    setShowModal(false);
  };

  const tabTitles = {
    semua: "Semua Pengguna",
    pembeli: "Pembeli",
    mitra: "Mitra",
    pending: "Pending Verifikasi",
    blokir: "Diblokir",
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
                <div className="stat-value">1.240</div>
                <div className="stat-label">Total Pengguna</div>
                <div className="stat-change up">▲ 24 baru minggu ini</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" style={{ background: "#EAF3DE" }}>
                🤝
              </div>
              <div>
                <div className="stat-value">
                  {
                    users.filter(
                      (u) => u.role === "mitra" && u.status === "aktif",
                    ).length
                  }
                </div>
                <div className="stat-label">Mitra Aktif</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" style={{ background: "#FFF8E0" }}>
                ⏳
              </div>
              <div>
                <div className="stat-value">
                  {users.filter((u) => u.status === "pending").length}
                </div>
                <div className="stat-label">Mitra Pending</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" style={{ background: "#FDECEA" }}>
                🚫
              </div>
              <div>
                <div className="stat-value">
                  {users.filter((u) => u.status === "blokir").length}
                </div>
                <div className="stat-label">Akun Diblokir</div>
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
              { id: "mitra", label: "🌾 Mitra" },
              { id: "pending", label: "⏳ Pending Verifikasi" },
              { id: "blokir", label: "🚫 Diblokir" },
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
                  <th>Pesanan</th>
                  <th>Status</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td
                      colSpan="7"
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
                            {u.avatar}
                          </div>
                          <div>
                            <div
                              style={{ fontWeight: 600, fontSize: ".88rem" }}
                            >
                              {u.name}
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
                        <span className={`badge ${roleBadgeMap[u.role]}`}>
                          {u.role}
                          {u.toko ? ": " + u.toko : ""}
                        </span>
                      </td>
                      <td style={{ fontSize: ".82rem" }}>{u.phone}</td>
                      <td style={{ fontSize: ".78rem", color: "var(--muted)" }}>
                        {u.joined}
                      </td>
                      <td style={{ fontSize: ".82rem" }}>{u.orders}</td>
                      <td>
                        <span className={`badge ${statusBadgeMap[u.status]}`}>
                          {u.status}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: "flex", gap: ".35rem" }}>
                          <button
                            className="btn btn-outline btn-sm"
                            onClick={() => openModal(u)}
                          >
                            Detail
                          </button>
                          {u.status === "pending" && (
                            <>
                              <button
                                className="btn btn-green btn-sm"
                                onClick={() => updateStatus(u, "aktif")}
                              >
                                ✓
                              </button>
                              <button
                                className="btn btn-red btn-sm"
                                onClick={() => updateStatus(u, "blokir")}
                              >
                                ✕
                              </button>
                            </>
                          )}
                          {u.status === "aktif" && (
                            <button
                              className="btn btn-red btn-sm"
                              onClick={() => updateStatus(u, "blokir")}
                            >
                              🚫
                            </button>
                          )}
                          {u.status === "blokir" && (
                            <button
                              className="btn btn-outline btn-sm"
                              onClick={() => updateStatus(u, "aktif")}
                            >
                              ✓ Aktifkan
                            </button>
                          )}
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
              <button className="pg-btn">2</button>
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
              <div className="modal-title">{selected.name}</div>
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
                  {selected.avatar}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "1rem" }}>
                    {selected.name}
                  </div>
                  <div style={{ fontSize: ".82rem", color: "var(--muted)" }}>
                    {selected.email}
                  </div>
                  <div style={{ marginTop: ".3rem" }}>
                    <span className={`badge ${roleBadgeMap[selected.role]}`}>
                      {selected.role}
                    </span>
                    <span
                      className={`badge ${statusBadgeMap[selected.status]}`}
                      style={{ marginLeft: ".3rem" }}
                    >
                      {selected.status}
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
                    {selected.phone}
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
                    {selected.joined}
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
              {selected.status === "pending" && (
                <>
                  <button
                    className="btn btn-red"
                    onClick={() => updateStatus(selected, "blokir")}
                  >
                    ✕ Tolak
                  </button>
                  <button
                    className="btn btn-green"
                    onClick={() => updateStatus(selected, "aktif")}
                  >
                    ✓ Verifikasi
                  </button>
                </>
              )}
              {selected.status === "aktif" && (
                <button
                  className="btn btn-red"
                  onClick={() => updateStatus(selected, "blokir")}
                >
                  🚫 Blokir
                </button>
              )}
              {selected.status === "blokir" && (
                <button
                  className="btn btn-primary"
                  onClick={() => updateStatus(selected, "aktif")}
                >
                  ✓ Aktifkan
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminClients;
