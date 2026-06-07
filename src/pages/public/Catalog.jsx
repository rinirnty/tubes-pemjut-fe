import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const KATEGORI = [
  { emoji: "🌾", name: "Semua", key: "semua" },
  { emoji: "🍚", name: "Beras Putih", key: "Beras Putih" },
  { emoji: "🌾", name: "Beras Ketan", key: "Beras Ketan" },
  { emoji: "🍠", name: "Ubi Jalar", key: "Ubi Jalar" },
  { emoji: "🟤", name: "Ubi Kayu", key: "Ubi Kayu" },
  { emoji: "🌿", name: "Beras Merah", key: "Beras Merah" },
];

const PRODUK = [
  {
    id: 1,
    emoji: "🍚",
    badge: "terlaris",
    cat: "Beras Putih",
    name: "Beras Pandan Wangi",
    varian: "Premium • Pulen & Wangi",
    price: 13000,
    priceStr: "Rp 65.000",
    unit: "/5 kg",
    bg: "#FFF8E8",
    desc: "Beras premium pilihan petani lokal. Pulen, wangi, cocok untuk masakan sehari-hari.",
  },
  {
    id: 2,
    emoji: "🌾",
    badge: "baru",
    cat: "Beras Ketan",
    name: "Beras Ketan Putih",
    varian: "Super • Lengket Sempurna",
    price: 28000,
    priceStr: "Rp 28.000",
    unit: "/kg",
    bg: "#F0F8E8",
    desc: "Beras ketan putih berkualitas tinggi. Cocok untuk lemper, bubur, dan kue tradisional.",
  },
  {
    id: 3,
    emoji: "🍠",
    badge: "",
    cat: "Ubi Jalar",
    name: "Ubi Jalar Merah",
    varian: "Manis • Segar dari Kebun",
    price: 8000,
    priceStr: "Rp 8.000",
    unit: "/kg",
    bg: "#FFF0E8",
    desc: "Ubi jalar merah segar langsung dari kebun. Manis alami, cocok untuk kolak dan gorengan.",
  },
  {
    id: 4,
    emoji: "🌿",
    badge: "",
    cat: "Beras Merah",
    name: "Beras Merah Organik",
    varian: "Organik • Bebas Pestisida",
    price: 22000,
    priceStr: "Rp 22.000",
    unit: "/kg",
    bg: "#F0F5E8",
    desc: "Beras merah organik bersertifikat. Kaya serat, cocok untuk diet sehat.",
  },
  {
    id: 5,
    emoji: "🟤",
    badge: "promo",
    cat: "Ubi Kayu",
    name: "Singkong Segar",
    varian: "Lokal • Manis & Empuk",
    price: 5000,
    priceStr: "Rp 5.000",
    unit: "/kg",
    bg: "#F5EDE0",
    desc: "Singkong segar pilihan. Empuk, manis, bisa untuk tape, kolak, atau keripik.",
  },
  {
    id: 6,
    emoji: "🍚",
    badge: "",
    cat: "Beras Ketan",
    name: "Beras Ketan Hitam",
    varian: "Spesial • Kue & Bubur",
    price: 32000,
    priceStr: "Rp 32.000",
    unit: "/kg",
    bg: "#F0EEF8",
    desc: "Beras ketan hitam pilihan untuk bubur ketan hitam dan kue tradisional Jawa.",
  },
  {
    id: 7,
    emoji: "🍚",
    badge: "",
    cat: "Beras Putih",
    name: "Beras IR 64",
    varian: "Medium • Harga Terjangkau",
    price: 11000,
    priceStr: "Rp 55.000",
    unit: "/5 kg",
    bg: "#FFF8E8",
    desc: "Beras IR 64 pilihan keluarga. Harga terjangkau, kualitas terjamin.",
  },
  {
    id: 8,
    emoji: "🍠",
    badge: "",
    cat: "Ubi Jalar",
    name: "Ubi Jalar Ungu",
    varian: "Manis • Kaya Antioksidan",
    price: 9000,
    priceStr: "Rp 9.000",
    unit: "/kg",
    bg: "#F5E8FF",
    desc: "Ubi jalar ungu kaya antioksidan. Warna cantik, rasa manis, cocok untuk es krim dan kue.",
  },
  {
    id: 9,
    emoji: "🌾",
    badge: "",
    cat: "Beras Putih",
    name: "Beras Pera Lokal",
    varian: "Lokal • Tidak Pulen",
    price: 9600,
    priceStr: "Rp 48.000",
    unit: "/5 kg",
    bg: "#FFF8E8",
    desc: "Beras pera lokal, cocok untuk nasi goreng dan nasi uduk karena teksturnya yang padat.",
  },
];

function Catalog() {
  const [currentKat, setCurrentKat] = useState("semua");
  const [currentView, setCurrentView] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [showModal, setShowModal] = useState(false);
  const [selectedProduk, setSelectedProduk] = useState(null);
  const [qty, setQty] = useState(1);
  const [scrolled, setScrolled] = useState(false);
  const revealRefs = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getFilteredProduk = () => {
    let filtered = PRODUK.filter(
      (p) =>
        (currentKat === "semua" || p.cat === currentKat) &&
        (p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.cat.toLowerCase().includes(searchQuery.toLowerCase())),
    );

    if (sortBy === "price-asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === "name") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("visible");
            }, index * 80);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );
    revealRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [getFilteredProduk()]);

  const openModal = (produk) => {
    setSelectedProduk(produk);
    setQty(1);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const changeQty = (delta) => {
    setQty((prev) => Math.max(1, prev + delta));
  };

  const addToCart = () => {
    let cart = JSON.parse(localStorage.getItem("panenku_cart") || "[]");
    const idx = cart.findIndex((x) => x.id === selectedProduk.id);
    if (idx !== -1) {
      cart[idx].qty += qty;
    } else {
      cart.push({ id: selectedProduk.id, name: selectedProduk.name, qty });
    }
    localStorage.setItem("panenku_cart", JSON.stringify(cart));
    window.dispatchEvent(new CustomEvent("panenku-cart-updated"));
    closeModal();
    alert(`${selectedProduk.name} (${qty}) ditambahkan ke keranjang!`);
  };

  const filteredProduk = getFilteredProduk();

  return (
    <div className="catalog-page">
      <Navbar />

      {/* Hero */}
      <div
        className="hero-catalog"
        style={{
          minHeight: "38vh",
          display: "flex",
          alignItems: "center",
          padding: "8rem 5% 3rem",
          background:
            "linear-gradient(135deg, var(--brown) 0%, var(--green) 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "relative", zIndex: 1 }}>
          <div
            style={{
              fontSize: ".75rem",
              fontWeight: 700,
              letterSpacing: ".14em",
              textTransform: "uppercase",
              color: "var(--gold2)",
              marginBottom: ".6rem",
            }}
          >
            Katalog Produk
          </div>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 5vw, 3.2rem)",
              color: "#fff",
              marginBottom: ".75rem",
            }}
          >
            Beras, Ketan & Ubi <br />
            Pilihan Terbaik
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,.75)",
              fontSize: "1rem",
              maxWidth: "480px",
              lineHeight: 1.75,
              marginBottom: "1.75rem",
            }}
          >
            Temukan ratusan produk bahan pokok berkualitas dari mitra
            terpercaya.
          </p>
          <div
            className="search-hero"
            style={{ display: "flex", gap: ".6rem", flexWrap: "wrap" }}
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari beras, ketan, ubi..."
              style={{
                padding: ".8rem 1.25rem",
                borderRadius: "12px",
                border: "none",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: ".9rem",
                width: "320px",
                outline: "none",
                background: "#fff",
                color: "var(--text)",
              }}
            />
            <button
              className="btn btn-gold btn-lg"
              onClick={() => {}}
              style={{
                background: "var(--gold)",
                color: "#fff",
                padding: ".85rem 2rem",
                borderRadius: "999px",
                border: "none",
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "1rem",
                fontWeight: 500,
              }}
            >
              🔍 Cari
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section style={{ padding: "2.5rem 5%" }}>
        {/* Kategori Strip */}
        <div
          className="kat-strip"
          id="kat-strip"
          style={{
            display: "flex",
            gap: ".75rem",
            overflowX: "auto",
            padding: ".5rem 0 1.5rem",
          }}
        >
          {KATEGORI.map((kat, idx) => (
            <button
              key={idx}
              className={`kat-pill ${currentKat === kat.key ? "active" : ""}`}
              onClick={() => setCurrentKat(kat.key)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: ".5rem",
                padding: ".5rem 1.1rem",
                borderRadius: "999px",
                border: "1.5px solid var(--border)",
                background: currentKat === kat.key ? "var(--brown)" : "#fff",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: ".82rem",
                fontWeight: 500,
                color: currentKat === kat.key ? "#fff" : "var(--muted)",
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "all .2s",
                flexShrink: 0,
              }}
            >
              {kat.emoji} {kat.name}
            </button>
          ))}
        </div>

        {/* Sort & Count */}
        <div
          className="sort-bar"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "1.5rem",
            flexWrap: "wrap",
            gap: ".75rem",
          }}
        >
          <div
            className="result-count"
            style={{ fontSize: ".85rem", color: "var(--muted)" }}
          >
            {filteredProduk.length} produk ditemukan
          </div>
          <div style={{ display: "flex", gap: ".6rem", alignItems: "center" }}>
            <div
              style={{
                display: "flex",
                gap: ".4rem",
                background: "var(--cream2)",
                borderRadius: "10px",
                padding: ".3rem",
              }}
            >
              <button
                id="vg"
                onClick={() => setCurrentView("grid")}
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  border: "none",
                  background:
                    currentView === "grid" ? "var(--brown)" : "transparent",
                  color: currentView === "grid" ? "#fff" : "var(--text)",
                  cursor: "pointer",
                }}
              >
                ⊞
              </button>
              <button
                id="vl"
                onClick={() => setCurrentView("list")}
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  border: "none",
                  background:
                    currentView === "list" ? "var(--brown)" : "transparent",
                  color: currentView === "list" ? "#fff" : "var(--text)",
                  cursor: "pointer",
                }}
              >
                ☰
              </button>
            </div>
            <select
              className="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: ".45rem .9rem",
                borderRadius: "10px",
                border: "1.5px solid var(--border)",
                background: "#fff",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: ".83rem",
                color: "var(--text)",
                outline: "none",
                cursor: "pointer",
              }}
            >
              <option value="default">Urutkan: Default</option>
              <option value="price-asc">Harga: Termurah</option>
              <option value="price-desc">Harga: Termahal</option>
              <option value="name">Nama A-Z</option>
            </select>
          </div>
        </div>

        {/* Grid/List */}
        {currentView === "grid" ? (
          <div
            className="prod-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: "1.5rem",
            }}
          >
            {filteredProduk.map((produk, idx) => (
              <div
                key={produk.id}
                className="prod-card reveal"
                ref={(el) => (revealRefs.current[idx] = el)}
                onClick={() => openModal(produk)}
                style={{
                  background: "#fff",
                  borderRadius: "20px",
                  overflow: "hidden",
                  border: "1px solid var(--border)",
                  transition: "transform .3s,box-shadow .3s",
                  cursor: "pointer",
                }}
              >
                <div
                  className="prod-thumb"
                  style={{
                    height: "160px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "5rem",
                    position: "relative",
                    background: produk.bg,
                  }}
                >
                  {produk.badge && (
                    <span
                      className={`prod-badge ${produk.badge}`}
                      style={{
                        position: "absolute",
                        top: "12px",
                        left: "12px",
                        fontSize: ".68rem",
                        fontWeight: 700,
                        padding: ".25rem .65rem",
                        borderRadius: "999px",
                        background:
                          produk.badge === "terlaris"
                            ? "var(--gold)"
                            : produk.badge === "baru"
                              ? "var(--green)"
                              : "var(--red)",
                        color: "#fff",
                      }}
                    >
                      {produk.badge}
                    </span>
                  )}
                  {produk.emoji}
                </div>
                <div className="prod-body" style={{ padding: "1.15rem" }}>
                  <div
                    className="prod-cat"
                    style={{
                      fontSize: ".68rem",
                      fontWeight: 700,
                      letterSpacing: ".08em",
                      textTransform: "uppercase",
                      color: "var(--green2)",
                      marginBottom: ".3rem",
                    }}
                  >
                    {produk.cat}
                  </div>
                  <div
                    className="prod-name"
                    style={{
                      fontWeight: 600,
                      fontSize: ".95rem",
                      marginBottom: ".2rem",
                      color: "var(--text)",
                    }}
                  >
                    {produk.name}
                  </div>
                  <div
                    className="prod-var"
                    style={{
                      fontSize: ".78rem",
                      color: "var(--muted)",
                      marginBottom: ".5rem",
                    }}
                  >
                    {produk.varian}
                  </div>
                  <div
                    className="prod-footer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <div
                        className="prod-price"
                        style={{
                          fontFamily: "'Playfair Display', serif",
                          fontSize: "1.1rem",
                          fontWeight: 700,
                          color: "var(--brown)",
                        }}
                      >
                        {produk.priceStr}
                      </div>
                      <div
                        className="prod-unit"
                        style={{
                          fontSize: ".7rem",
                          color: "var(--muted)",
                          marginTop: ".1rem",
                        }}
                      >
                        {produk.unit}
                      </div>
                    </div>
                    <button
                      className="prod-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        openModal(produk);
                      }}
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "50%",
                        background: "var(--brown)",
                        color: "#fff",
                        border: "none",
                        fontSize: "1.2rem",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all .2s",
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            style={{
              background: "#fff",
              borderRadius: "20px",
              border: "1px solid var(--border)",
              overflow: "hidden",
            }}
          >
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "var(--cream)" }}>
                  <th
                    style={{
                      padding: ".75rem 1.25rem",
                      textAlign: "left",
                      fontSize: ".75rem",
                      color: "var(--muted)",
                      fontWeight: 600,
                      textTransform: "uppercase",
                    }}
                  >
                    Produk
                  </th>
                  <th
                    style={{
                      padding: ".75rem 1.25rem",
                      textAlign: "left",
                      fontSize: ".75rem",
                      color: "var(--muted)",
                      fontWeight: 600,
                      textTransform: "uppercase",
                    }}
                  >
                    Kategori
                  </th>
                  <th
                    style={{
                      padding: ".75rem 1.25rem",
                      textAlign: "left",
                      fontSize: ".75rem",
                      color: "var(--muted)",
                      fontWeight: 600,
                      textTransform: "uppercase",
                    }}
                  >
                    Harga
                  </th>
                  <th
                    style={{
                      padding: ".75rem 1.25rem",
                      textAlign: "left",
                      fontSize: ".75rem",
                      color: "var(--muted)",
                      fontWeight: 600,
                      textTransform: "uppercase",
                    }}
                  >
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredProduk.map((produk) => (
                  <tr
                    key={produk.id}
                    style={{ borderTop: "1px solid var(--border)" }}
                  >
                    <td
                      style={{
                        padding: ".85rem 1.25rem",
                        display: "flex",
                        alignItems: "center",
                        gap: ".75rem",
                      }}
                    >
                      <span style={{ fontSize: "2rem" }}>{produk.emoji}</span>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: ".9rem" }}>
                          {produk.name}
                        </div>
                        <div
                          style={{ fontSize: ".75rem", color: "var(--muted)" }}
                        >
                          {produk.varian}
                        </div>
                      </div>
                    </td>
                    <td
                      style={{ padding: ".85rem 1.25rem", fontSize: ".85rem" }}
                    >
                      {produk.cat}
                    </td>
                    <td
                      style={{
                        padding: ".85rem 1.25rem",
                        fontFamily: "'Playfair Display', serif",
                        fontWeight: 700,
                        color: "var(--brown)",
                      }}
                    >
                      {produk.priceStr}
                      <span
                        style={{
                          fontSize: ".7rem",
                          color: "var(--muted)",
                          fontFamily: "'DM Sans', sans-serif",
                          fontWeight: 400,
                        }}
                      >
                        {produk.unit}
                      </span>
                    </td>
                    <td style={{ padding: ".85rem 1.25rem" }}>
                      <button
                        className="btn btn-primary"
                        onClick={() => openModal(produk)}
                        style={{
                          fontSize: ".8rem",
                          padding: ".4rem .9rem",
                          borderRadius: "8px",
                          background: "var(--brown)",
                          color: "#fff",
                          border: "none",
                          cursor: "pointer",
                        }}
                      >
                        + Tambah
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: ".5rem",
            marginTop: "2rem",
            justifyContent: "center",
          }}
        >
          <button
            style={{
              padding: ".5rem 1rem",
              borderRadius: "10px",
              border: "1.5px solid var(--border)",
              background: "#fff",
              cursor: "pointer",
            }}
          >
            ← Prev
          </button>
          <button
            style={{
              padding: ".5rem 1rem",
              borderRadius: "10px",
              border: "none",
              background: "var(--brown)",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            1
          </button>
          <button
            style={{
              padding: ".5rem 1rem",
              borderRadius: "10px",
              border: "1.5px solid var(--border)",
              background: "#fff",
              cursor: "pointer",
            }}
          >
            2
          </button>
          <button
            style={{
              padding: ".5rem 1rem",
              borderRadius: "10px",
              border: "1.5px solid var(--border)",
              background: "#fff",
              cursor: "pointer",
            }}
          >
            Next →
          </button>
        </div>
      </section>

      {/* Modal */}
      {showModal && selectedProduk && (
        <div
          className="modal-overlay show"
          onClick={(e) => e.target === e.currentTarget && closeModal()}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(44,31,14,.55)",
            backdropFilter: "blur(4px)",
            zIndex: 500,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: 1,
            pointerEvents: "auto",
            transition: "opacity .25s",
          }}
        >
          <div
            className="modal"
            style={{
              background: "#fff",
              borderRadius: "24px",
              width: "90%",
              maxWidth: "560px",
              overflow: "hidden",
              transform: "translateY(0)",
              transition: "transform .25s",
              position: "relative",
            }}
          >
            <button
              className="modal-close"
              onClick={closeModal}
              style={{
                position: "absolute",
                top: "1rem",
                right: "1rem",
                background: "rgba(255,255,255,.8)",
                border: "none",
                borderRadius: "50%",
                width: "36px",
                height: "36px",
                cursor: "pointer",
                fontSize: "1rem",
                backdropFilter: "blur(4px)",
              }}
            >
              ✕
            </button>
            <div
              className="modal-thumb"
              style={{
                height: "200px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "7rem",
                background: selectedProduk.bg,
              }}
            >
              {selectedProduk.emoji}
            </div>
            <div className="modal-body" style={{ padding: "1.75rem" }}>
              <div
                style={{
                  fontSize: ".7rem",
                  fontWeight: 700,
                  letterSpacing: ".08em",
                  textTransform: "uppercase",
                  color: "var(--green2)",
                  marginBottom: ".3rem",
                }}
              >
                {selectedProduk.cat}
              </div>
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.4rem",
                  fontWeight: 700,
                  marginBottom: ".3rem",
                }}
              >
                {selectedProduk.name}
              </div>
              <div
                style={{
                  fontSize: ".82rem",
                  color: "var(--muted)",
                  marginBottom: ".75rem",
                }}
              >
                {selectedProduk.varian}
              </div>
              <div
                style={{
                  fontSize: ".83rem",
                  color: "var(--text)",
                  lineHeight: 1.7,
                  marginBottom: "1rem",
                }}
              >
                {selectedProduk.desc}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: ".5rem",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    color: "var(--brown)",
                  }}
                >
                  {selectedProduk.priceStr}
                </div>
                <span style={{ fontSize: ".78rem", color: "var(--muted)" }}>
                  {selectedProduk.unit}
                </span>
              </div>
              <div
                className="qty-ctrl"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: ".6rem",
                  margin: "1rem 0",
                }}
              >
                <button
                  className="qty-btn"
                  onClick={() => changeQty(-1)}
                  style={{
                    width: "34px",
                    height: "34px",
                    borderRadius: "10px",
                    border: "1.5px solid var(--border)",
                    background: "#fff",
                    cursor: "pointer",
                    fontSize: "1.1rem",
                    transition: "all .2s",
                  }}
                >
                  −
                </button>
                <span
                  className="qty-val"
                  style={{
                    fontWeight: 700,
                    fontSize: "1.1rem",
                    minWidth: "32px",
                    textAlign: "center",
                  }}
                >
                  {qty}
                </span>
                <button
                  className="qty-btn"
                  onClick={() => changeQty(1)}
                  style={{
                    width: "34px",
                    height: "34px",
                    borderRadius: "10px",
                    border: "1.5px solid var(--border)",
                    background: "#fff",
                    cursor: "pointer",
                    fontSize: "1.1rem",
                    transition: "all .2s",
                  }}
                >
                  +
                </button>
                <span
                  style={{
                    fontSize: ".78rem",
                    color: "var(--muted)",
                    marginLeft: ".25rem",
                  }}
                >
                  {selectedProduk.unit}
                </span>
              </div>
              <div
                style={{ display: "flex", gap: ".75rem", marginTop: ".5rem" }}
              >
                <button
                  className="btn btn-primary"
                  onClick={addToCart}
                  style={{
                    flex: 1,
                    padding: ".85rem 2rem",
                    borderRadius: "999px",
                    background: "var(--brown)",
                    color: "#fff",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "1rem",
                    fontWeight: 500,
                  }}
                >
                  🛒 Tambah ke Keranjang
                </button>
                <Link
                  to="/login"
                  className="btn btn-outline"
                  style={{
                    padding: ".85rem 2rem",
                    borderRadius: "999px",
                    border: "1.5px solid var(--brown2)",
                    color: "var(--brown)",
                    background: "transparent",
                    cursor: "pointer",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "1rem",
                    fontWeight: 500,
                    textDecoration: "none",
                  }}
                >
                  Masuk dulu
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
      <style>{`
        .reveal { opacity: 0; transform: translateY(28px); transition: opacity .6s ease, transform .6s ease; }
        .reveal.visible { opacity: 1; transform: none; }
        @media (max-width: 768px) {
          .prod-grid { grid-template-columns: 1fr 1fr !important; }
          .search-hero input { width: 100% !important; }
        }
        @media (max-width: 480px) {
          .prod-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

export default Catalog;
