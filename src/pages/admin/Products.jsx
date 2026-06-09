import { useEffect, useRef, useState } from "react";
import SidebarAdmin from "../../components/SidebarAdmin";
import api from "../../utils/api";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentKat, setCurrentKat] = useState("semua");
  const [view, setView] = useState("grid");
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("tambah");
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    id_kategori: 0,
    price: "",
    stock: "",
    foto: null,
  });
  const revealRefs = useRef([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [prodRes, catRes] = await Promise.all([
        api.get("/products"),
        api.get("/categories"),
      ]);
      const prodData = Array.isArray(prodRes.data)
        ? prodRes.data
        : prodRes.data.data || [];
      const catData = Array.isArray(catRes.data)
        ? catRes.data
        : catRes.data.data || [];
      setProducts(prodData);
      setCategories(catData);
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = products.filter((p) => {
    const matchesKat =
      currentKat === "semua" || p.kategori?.nama === currentKat;
    const matchesSearch = p.nama.toLowerCase().includes(search.toLowerCase());
    return matchesKat && matchesSearch;
  });

  const openEdit = (p) => {
    setModalType("edit");

    setEditingId(p.id_produk);

    setForm({
      name: p.nama || "",
      id_kategori: String(p.id_kategori || p.kategori?.id_kategori || ""),
      price: p.harga || "",
      stock: p.stok || "",
      foto: null,
    });

    setShowModal(true);
  };

  const handleFileChange = (e) => {
    setForm({ ...form, foto: e.target.files[0] });
  };

  const saveProduct = async () => {
    try {
      if (!form.id_kategori) {
        return alert("Kategori wajib dipilih");
      }

      const formData = new FormData();

      formData.append("nama", form.name);
      formData.append("harga", form.price);
      formData.append("stok", form.stock);

      // pastikan selalu ID kategori
      formData.append("id_kategori", String(form.id_kategori));

      // foto tetap opsional
      if (form.foto instanceof File) {
        formData.append("foto", form.foto);
      }

      if (modalType === "tambah") {
        await api.post("/products", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        alert("Produk berhasil ditambahkan!");
      } else {
        await api.patch(`/products/${editingId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        alert("Produk berhasil diperbarui!");
      }

      setShowModal(false);

      setForm({
        name: "",
        id_kategori: "",
        price: "",
        stock: "",
        foto: null,
      });

      fetchData();
    } catch (err) {
      console.error(err);

      alert(err.response?.data?.message || "Gagal menyimpan produk");
    }
  };

  const deleteProduct = async (id) => {
    if (window.confirm("Hapus produk ini?")) {
      try {
        await api.delete(`/products/${id}`);
        fetchData();
      } catch (err) {
        alert("Gagal menghapus produk");
      }
    }
  };

  const getStatusBadgeClass = (stock) => {
    if (stock > 20) return "badge-green";
    if (stock > 0) return "badge-gold";
    return "badge-red";
  };

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
                  id_kategori: categories[0]?.id_kategori || "",
                  price: "",
                  stock: "",
                  foto: null,
                });
                setShowModal(true);
              }}
            >
              + Tambah Produk
            </button>
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
                  {products.filter((p) => p.stok > 0).length}
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
                  {products.filter((p) => p.stok > 0 && p.stok <= 20).length}
                </div>
                <div className="stat-label">Stok Menipis</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" style={{ background: "#F5EDE0" }}>
                📂
              </div>
              <div>
                <div className="stat-value">{categories.length}</div>
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
              <button
                className={`filter-btn ${currentKat === "semua" ? "active" : ""}`}
                onClick={() => setCurrentKat("semua")}
              >
                Semua
              </button>
              {categories.map((kat) => (
                <button
                  key={kat.id}
                  className={`filter-btn ${currentKat === kat.nama ? "active" : ""}`}
                  onClick={() => setCurrentKat(kat.nama)}
                >
                  {kat.nama}
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
              {filtered.map((p) => {
                const imageUrl = p.foto
                  ? `${import.meta.env.VITE_API_URL || "http://localhost:5500/api"}/products/images/${p.foto}`
                  : null;
                return (
                  <div key={p.id} className="prod-card">
                    <div
                      className="prod-thumb"
                      style={{ background: "#FFF8E8", overflow: "hidden" }}
                    >
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={p.nama}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        "🌾"
                      )}
                      <span
                        className={`prod-stock-badge ${getStatusBadgeClass(p.stok)}`}
                      >
                        {p.stok > 20
                          ? "aktif"
                          : p.stok > 0
                            ? "stok menipis"
                            : "kosong"}
                      </span>
                    </div>
                    <div className="prod-body">
                      <div className="prod-cat">{p.Kategori?.nama}</div>
                      <div className="prod-name">{p.nama}</div>
                      <div className="prod-footer">
                        <div>
                          <div className="prod-price">
                            {formatRupiah(p.harga)}
                          </div>
                          <div className="prod-unit">Stok: {p.stok}</div>
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
                );
              })}
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
                          <span style={{ fontSize: "1.5rem" }}>🌾</span>
                          {p.nama}
                        </div>
                      </td>
                      <td>{p.Kategori?.nama}</td>
                      <td style={{ fontWeight: 600 }}>
                        {formatRupiah(p.harga)}
                      </td>
                      <td>{p.stok}</td>
                      <td>
                        <span
                          className={`badge ${getStatusBadgeClass(p.stok)}`}
                        >
                          {p.stok > 20
                            ? "aktif"
                            : p.stok > 0
                              ? "stok menipis"
                              : "kosong"}
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
                  value={form.id_kategori}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      id_kategori: String(e.target.value),
                    })
                  }
                >
                  <option value="">Pilih Kategori</option>

                  {categories.map((c) => (
                    <option
                      key={c.id_kategori || c.id}
                      value={c.id_kategori || c.id}
                    >
                      {c.nama}
                    </option>
                  ))}
                </select>
              </div>
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
                <label>Stok</label>
                <input
                  type="number"
                  value={form.stock}
                  onChange={(e) => setForm({ ...form, stock: e.target.value })}
                  placeholder="100"
                />
              </div>
            </div>
            <div className="form-field">
              <label>Foto Produk (Opsional)</label>
              <input type="file" onChange={handleFileChange} accept="image/*" />
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
