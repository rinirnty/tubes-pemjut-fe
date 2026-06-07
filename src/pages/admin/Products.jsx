import { useEffect, useRef, useState } from "react";
import SidebarAdmin from "../../components/SidebarAdmin";

const initialProducts = [
  {
    id: 1,
    emoji: "🍚",
    cat: "Beras Putih",
    name: "Beras Pandan Wangi",
    price: "Rp 65.000",
    unit: "/5 kg",
    stock: 120,
    mitra: "Mitra Pak Hendra",
    status: "aktif",
    bg: "#FFF8E8",
  },
  {
    id: 2,
    emoji: "🌾",
    cat: "Beras Ketan",
    name: "Beras Ketan Putih",
    price: "Rp 28.000",
    unit: "/kg",
    stock: 15,
    mitra: "Mitra Bu Siti",
    status: "stok menipis",
    bg: "#EAF6EA",
  },
  {
    id: 3,
    emoji: "🍠",
    cat: "Ubi Jalar",
    name: "Ubi Jalar Merah",
    price: "Rp 8.000",
    unit: "/kg",
    stock: 50,
    mitra: "Mitra Pak Darto",
    status: "aktif",
    bg: "#FFF0E0",
  },
  {
    id: 4,
    emoji: "🌿",
    cat: "Beras Merah",
    name: "Beras Merah Organik",
    price: "Rp 22.000",
    unit: "/kg",
    stock: 0,
    mitra: "Mitra Pak Budi",
    status: "nonaktif",
    bg: "#F0F5E8",
  },
  {
    id: 5,
    emoji: "🟤",
    cat: "Ubi Kayu",
    name: "Singkong Segar",
    price: "Rp 5.000",
    unit: "/kg",
    stock: 80,
    mitra: "Mitra Ibu Ratna",
    status: "aktif",
    bg: "#F5EDE0",
  },
  {
    id: 6,
    emoji: "🍚",
    cat: "Beras Ketan",
    name: "Beras Ketan Hitam",
    price: "Rp 32.000",
    unit: "/kg",
    stock: 30,
    mitra: "Mitra Pak Hendra",
    status: "aktif",
    bg: "#F0EEF8",
  },
];

const categories = [
  "semua",
  "Beras Putih",
  "Beras Ketan",
  "Ubi Jalar",
  "Ubi Kayu",
  "Beras Merah",
];

function AdminProducts() {
  const [products, setProducts] = useState(initialProducts);
  const [currentKat, setCurrentKat] = useState("semua");
  const [view, setView] = useState("grid");
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("tambah");
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    name: "",
    kat: "Beras Putih",
    desc: "",
    price: "",
    unit: "kg",
    stock: "",
    mitra: "Mitra Pak Hendra",
    status: "Aktif",
  });
  const revealRefs = useRef([]);

  const filtered = products.filter((p) => {
    const matchesKat = currentKat === "semua" || p.cat === currentKat;
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchesKat && matchesSearch;
  });

  const openEdit = (p) => {
    setModalType("edit");
    setEditingId(p.id);
    setForm({
      name: p.name,
      kat: p.cat,
      desc: "",
      price: p.price.replace(/\D/g, ""),
      unit: p.unit.replace("/ ", ""),
      stock: p.stock,
      mitra: p.mitra,
      status: p.status,
    });
    setShowModal(true);
  };

  const saveProduct = () => {
    if (modalType === "tambah") {
      const newProduct = {
        id: Date.now(),
        emoji: "🌾",
        cat: form.kat,
        name: form.name,
        price: `Rp ${parseInt(form.price).toLocaleString("id-ID")}`,
        unit: `/${form.unit}`,
        stock: parseInt(form.stock),
        mitra: form.mitra,
        status:
          form.status === "Aktif"
            ? parseInt(form.stock) < 20
              ? "stok menipis"
              : "aktif"
            : "nonaktif",
        bg: "#FFF8E8",
      };
      setProducts([...products, newProduct]);
    } else {
      setProducts(
        products.map((p) => {
          if (p.id === editingId) {
            return {
              ...p,
              name: form.name,
              cat: form.kat,
              price: `Rp ${parseInt(form.price).toLocaleString("id-ID")}`,
              unit: `/${form.unit}`,
              stock: parseInt(form.stock),
              status:
                form.status === "Aktif"
                  ? parseInt(form.stock) < 20
                    ? "stok menipis"
                    : "aktif"
                  : "nonaktif",
            };
          }
          return p;
        }),
      );
    }
    setShowModal(false);
    alert("Produk berhasil disimpan!");
  };

  const deleteProduct = (id) => {
    if (confirm("Hapus produk ini?")) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  const getStatusBadgeClass = (status) => {
    if (status === "aktif") return "badge-green";
    if (status === "stok menipis") return "badge-gold";
    return "badge-red";
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
            <div className="page-title">Kelola Produk</div>
            <div className="breadcrumb">Admin / Produk</div>
          </div>
          <div className="topbar-right">
            <button
              className="btn btn-primary"
              onClick={() => {
                setModalType("tambah");
                setEditingId(null);
                setForm({
                  name: "",
                  kat: "Beras Putih",
                  desc: "",
                  price: "",
                  unit: "kg",
                  stock: "",
                  mitra: "Mitra Pak Hendra",
                  status: "Aktif",
                });
                setShowModal(true);
              }}
            >
              + Tambah Produk
            </button>
            <div className="topbar-btn">
              🔔<div className="notif-dot"></div>
            </div>
          </div>
        </div>

        <div className="page-content">
          <div
            className="stat-grid reveal"
            ref={(el) => (revealRefs.current[0] = el)}
            style={{ gridTemplateColumns: "repeat(4,1fr)" }}
          >
            <div className="stat-card">
              <div className="stat-icon" style={{ background: "#EAF3DE" }}>
                🌾
              </div>
              <div>
                <div className="stat-value">{products.length}</div>
                <div className="stat-label">Total Produk</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" style={{ background: "#FFF8E0" }}>
                ✅
              </div>
              <div>
                <div className="stat-value">
                  {
                    products.filter(
                      (p) =>
                        p.status === "aktif" || p.status === "stok menipis",
                    ).length
                  }
                </div>
                <div className="stat-label">Aktif</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" style={{ background: "#FDECEA" }}>
                ⚠️
              </div>
              <div>
                <div className="stat-value">
                  {products.filter((p) => p.status === "stok menipis").length}
                </div>
                <div className="stat-label">Stok Menipis</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" style={{ background: "#F5EDE0" }}>
                📂
              </div>
              <div>
                <div className="stat-value">5</div>
                <div className="stat-label">Kategori</div>
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: ".75rem",
              marginBottom: "1.25rem",
            }}
            className="reveal"
            ref={(el) => (revealRefs.current[1] = el)}
          >
            <div className="filter-bar" style={{ margin: 0 }}>
              {categories.map((kat, i) => (
                <button
                  key={i}
                  className={`filter-btn ${currentKat === kat ? "active" : ""}`}
                  onClick={() => setCurrentKat(kat)}
                >
                  {kat === "semua" ? "Semua" : kat}
                </button>
              ))}
            </div>
            <div
              style={{ display: "flex", gap: ".6rem", alignItems: "center" }}
            >
              <div className="search-box">
                <span>🔍</span>
                <input
                  placeholder="Cari produk..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="view-toggle">
                <button
                  className={`vt-btn ${view === "grid" ? "active" : ""}`}
                  onClick={() => setView("grid")}
                >
                  ⊞
                </button>
                <button
                  className={`vt-btn ${view === "list" ? "active" : ""}`}
                  onClick={() => setView("list")}
                >
                  ☰
                </button>
              </div>
            </div>
          </div>

          {view === "grid" ? (
            <div
              className="prod-grid reveal"
              ref={(el) => (revealRefs.current[2] = el)}
            >
              {filtered.map((p) => (
                <div key={p.id} className="prod-card">
                  <div className="prod-thumb" style={{ background: p.bg }}>
                    {p.emoji}
                    <span
                      className={`prod-stock-badge ${getStatusBadgeClass(p.status)}`}
                    >
                      {p.status}
                    </span>
                  </div>
                  <div className="prod-body">
                    <div className="prod-cat">{p.cat}</div>
                    <div className="prod-name">{p.name}</div>
                    <div className="prod-footer">
                      <div>
                        <div className="prod-price">{p.price}</div>
                        <div className="prod-unit">{p.unit}</div>
                      </div>
                      <div className="prod-actions">
                        <button
                          className="btn btn-outline btn-icon btn-sm"
                          onClick={() => openEdit(p)}
                          title="Edit"
                        >
                          ✏️
                        </button>
                        <button
                          className="btn btn-red btn-icon btn-sm"
                          onClick={() => deleteProduct(p.id)}
                          title="Hapus"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div
              className="table-wrap reveal"
              ref={(el) => (revealRefs.current[2] = el)}
            >
              <div className="table-header">
                <div className="table-title">Daftar Produk</div>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Produk</th>
                    <th>Kategori</th>
                    <th>Harga</th>
                    <th>Stok</th>
                    <th>Mitra</th>
                    <th>Status</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((p) => (
                    <tr key={p.id}>
                      <td>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: ".6rem",
                          }}
                        >
                          <span style={{ fontSize: "1.5rem" }}>{p.emoji}</span>
                          {p.name}
                        </div>
                      </td>
                      <td>{p.cat}</td>
                      <td style={{ fontWeight: 600 }}>
                        {p.price}
                        {p.unit}
                      </td>
                      <td>{p.stock}</td>
                      <td>{p.mitra}</td>
                      <td>
                        <span
                          className={`badge ${getStatusBadgeClass(p.status)}`}
                        >
                          {p.status}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: "flex", gap: ".4rem" }}>
                          <button
                            className="btn btn-outline btn-sm"
                            onClick={() => openEdit(p)}
                          >
                            ✏️ Edit
                          </button>
                          <button
                            className="btn btn-red btn-sm"
                            onClick={() => deleteProduct(p.id)}
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div
            className="pagination reveal"
            ref={(el) => (revealRefs.current[3] = el)}
          >
            <button className="pg-btn">←</button>
            <button className="pg-btn active">1</button>
            <button className="pg-btn">2</button>
            <button className="pg-btn">3</button>
            <button className="pg-btn">→</button>
            <span className="pg-info">
              Menampilkan {filtered.length} dari {products.length} produk
            </span>
          </div>
        </div>
      </div>

      {showModal && (
        <div
          className="modal-overlay show"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowModal(false);
          }}
        >
          <div className="modal">
            <div className="modal-header">
              <div className="modal-title">
                {modalType === "tambah" ? "Tambah Produk Baru" : "Edit Produk"}
              </div>
              <button
                className="modal-close"
                onClick={() => setShowModal(false)}
              >
                ✕
              </button>
            </div>
            <div className="form-row">
              <div className="form-field">
                <label>Nama Produk</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Nama produk"
                />
              </div>
              <div className="form-field">
                <label>Kategori</label>
                <select
                  value={form.kat}
                  onChange={(e) => setForm({ ...form, kat: e.target.value })}
                >
                  <option>Beras Putih</option>
                  <option>Beras Ketan</option>
                  <option>Ubi Jalar</option>
                  <option>Ubi Kayu</option>
                  <option>Beras Merah</option>
                </select>
              </div>
            </div>
            <div className="form-field">
              <label>Deskripsi</label>
              <textarea
                value={form.desc}
                onChange={(e) => setForm({ ...form, desc: e.target.value })}
                placeholder="Deskripsi singkat produk..."
              ></textarea>
            </div>
            <div className="form-row">
              <div className="form-field">
                <label>Harga (Rp)</label>
                <input
                  type="number"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  placeholder="65000"
                />
              </div>
              <div className="form-field">
                <label>Satuan</label>
                <select
                  value={form.unit}
                  onChange={(e) => setForm({ ...form, unit: e.target.value })}
                >
                  <option>kg</option>
                  <option>5 kg</option>
                  <option>10 kg</option>
                  <option>25 kg</option>
                  <option>50 kg</option>
                  <option>ikat</option>
                  <option>pcs</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-field">
                <label>Stok</label>
                <input
                  type="number"
                  value={form.stock}
                  onChange={(e) => setForm({ ...form, stock: e.target.value })}
                  placeholder="100"
                />
              </div>
              <div className="form-field">
                <label>Mitra</label>
                <select
                  value={form.mitra}
                  onChange={(e) => setForm({ ...form, mitra: e.target.value })}
                >
                  <option>Mitra Pak Hendra</option>
                  <option>Mitra Bu Siti</option>
                  <option>Mitra Pak Darto</option>
                </select>
              </div>
            </div>
            <div className="form-field">
              <label>Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              >
                <option>Aktif</option>
                <option>Nonaktif</option>
              </select>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-outline"
                onClick={() => setShowModal(false)}
              >
                Batal
              </button>
              <button className="btn btn-primary" onClick={saveProduct}>
                💾 Simpan Produk
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminProducts;
