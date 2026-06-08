import { useEffect, useRef, useState } from "react";
import SidebarAdmin from "../../components/SidebarAdmin";
import api from "../../utils/api";

function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("tambah");
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    nama: "",
  });

  const revealRefs = useRef([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await api.get("/categories");

      const data = Array.isArray(res.data) ? res.data : res.data.data || [];

      setCategories(data);
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = categories.filter((c) =>
    c.nama.toLowerCase().includes(search.toLowerCase()),
  );

  const openEdit = (category) => {
    setModalType("edit");
    setEditingId(category.id_kategori);

    setForm({
      nama: category.nama,
    });

    setShowModal(true);
  };

  const saveCategory = async () => {
    try {
      if (!form.nama.trim()) {
        return alert("Nama kategori wajib diisi");
      }

      if (modalType === "tambah") {
        await api.post("/categories", {
          nama: form.nama,
        });

        alert("Kategori berhasil ditambahkan");
      } else {
        await api.patch(`/categories/${editingId}`, {
          nama: form.nama,
        });

        alert("Kategori berhasil diperbarui");
      }

      setShowModal(false);
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || "Gagal menyimpan kategori");
    }
  };

  const deleteCategory = async (id) => {
    if (!window.confirm("Hapus kategori ini?")) return;

    try {
      await api.delete(`/categories/${id}`);
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || "Gagal menghapus kategori");
    }
  };

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("visible");
            }, i * 80);

            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    revealRefs.current.forEach((el) => {
      if (el) obs.observe(el);
    });

    return () => obs.disconnect();
  }, [filtered]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        overflow: "hidden",
      }}
    >
      <SidebarAdmin />

      <div className="main">
        <div className="topbar">
          <div>
            <div className="page-title">Kelola Kategori</div>
            <div className="breadcrumb">Admin / Kategori</div>
          </div>

          <div className="topbar-right">
            <button
              className="btn btn-primary"
              onClick={() => {
                setModalType("tambah");
                setEditingId(null);

                setForm({
                  nama: "",
                });

                setShowModal(true);
              }}
            >
              + Tambah Kategori
            </button>
          </div>
        </div>

        <div className="page-content">
          <div
            className="stat-grid reveal"
            ref={(el) => (revealRefs.current[0] = el)}
            style={{
              gridTemplateColumns: "repeat(1,1fr)",
            }}
          >
            <div className="stat-card">
              <div
                className="stat-icon"
                style={{
                  background: "#F5EDE0",
                }}
              >
                📂
              </div>

              <div>
                <div className="stat-value">{categories.length}</div>

                <div className="stat-label">Total Kategori</div>
              </div>
            </div>
          </div>

          <div
            className="reveal"
            ref={(el) => (revealRefs.current[1] = el)}
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "1rem",
            }}
          >
            <div className="search-box">
              <span>🔍</span>

              <input
                type="text"
                placeholder="Cari kategori..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div
            className="table-wrap reveal"
            ref={(el) => (revealRefs.current[2] = el)}
          >
            <div className="table-header">
              <div className="table-title">Daftar Kategori</div>
            </div>

            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nama Kategori</th>
                  <th>Aksi</th>
                </tr>
              </thead>

              <tbody>
                {filtered.map((category) => (
                  <tr key={category.id_kategori}>
                    <td>{category.id_kategori}</td>

                    <td>{category.nama}</td>

                    <td>
                      <div
                        style={{
                          display: "flex",
                          gap: ".5rem",
                        }}
                      >
                        <button
                          className="btn btn-outline btn-sm"
                          onClick={() => openEdit(category)}
                        >
                          ✏️ Edit
                        </button>

                        <button
                          className="btn btn-red btn-sm"
                          onClick={() => deleteCategory(category.id_kategori)}
                        >
                          🗑️ Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showModal && (
        <div
          className="modal-overlay show"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowModal(false);
            }
          }}
        >
          <div className="modal">
            <div className="modal-header">
              <div className="modal-title">
                {modalType === "tambah" ? "Tambah Kategori" : "Edit Kategori"}
              </div>

              <button
                className="modal-close"
                onClick={() => setShowModal(false)}
              >
                ✕
              </button>
            </div>

            <div className="form-field">
              <label>Nama Kategori</label>

              <input
                type="text"
                value={form.nama}
                onChange={(e) =>
                  setForm({
                    ...form,
                    nama: e.target.value,
                  })
                }
                placeholder="Masukkan nama kategori"
              />
            </div>

            <div className="modal-footer">
              <button
                className="btn btn-outline"
                onClick={() => setShowModal(false)}
              >
                Batal
              </button>

              <button className="btn btn-primary" onClick={saveCategory}>
                💾 Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminCategories;
