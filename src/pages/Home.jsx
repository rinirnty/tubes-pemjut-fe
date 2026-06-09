import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import api from "../utils/api";

const categoryThemes = [
  { match: ["beras putih"], emoji: "🍚", bg: "#FFF8E8" },
  { match: ["beras ketan", "ketan"], emoji: "🌾", bg: "#F0F8E8" },
  { match: ["ubi jalar"], emoji: "🍠", bg: "#FFF0E8" },
  { match: ["ubi kayu", "singkong"], emoji: "🟤", bg: "#F5EDE0" },
  { match: ["beras merah"], emoji: "🌿", bg: "#F0F5E8" },
];

const fallbackKategori = [
  { emoji: "🍚", name: "Beras Putih", count: "12 produk", bg: "#FFF8E8" },
  { emoji: "🌾", name: "Beras Ketan", count: "8 produk", bg: "#F0F8E8" },
  { emoji: "🍠", name: "Ubi Jalar", count: "6 produk", bg: "#FFF0E8" },
  { emoji: "🟤", name: "Ubi Kayu", count: "5 produk", bg: "#F5EDE0" },
  { emoji: "🌿", name: "Beras Merah", count: "4 produk", bg: "#F0F5E8" },
];

const fallbackProducts = [
  {
    emoji: "🍚",
    badge: "terlaris",
    cat: "Beras Putih",
    name: "Beras Pandan Wangi",
    var: "Premium • Pulen & Wangi",
    mitra: "Pak Hendra",
    price: "Rp 65.000",
    unit: "/5 kg",
    bg: "#FFF8E8",
  },
  {
    emoji: "🌾",
    badge: "baru",
    cat: "Beras Ketan",
    name: "Beras Ketan Putih",
    var: "Super • Lengket Sempurna",
    mitra: "Bu Siti",
    price: "Rp 28.000",
    unit: "/kg",
    bg: "#F0F8E8",
  },
  {
    emoji: "🍠",
    badge: "",
    cat: "Ubi Jalar",
    name: "Ubi Jalar Merah",
    var: "Manis • Segar dari Kebun",
    mitra: "Pak Darto",
    price: "Rp 8.000",
    unit: "/kg",
    bg: "#FFF0E8",
  },
  {
    emoji: "🌿",
    badge: "",
    cat: "Beras Merah",
    name: "Beras Merah Organik",
    var: "Organik • Bebas Pestisida",
    mitra: "CV Agri",
    price: "Rp 22.000",
    unit: "/kg",
    bg: "#F0F5E8",
  },
  {
    emoji: "🟤",
    badge: "promo",
    cat: "Ubi Kayu",
    name: "Singkong Segar",
    var: "Lokal • Manis & Empuk",
    mitra: "Pak Budi",
    price: "Rp 5.000",
    unit: "/kg",
    bg: "#F5EDE0",
  },
  {
    emoji: "🍚",
    badge: "",
    cat: "Beras Ketan",
    name: "Beras Ketan Hitam",
    var: "Spesial • Untuk Kue & Bubur",
    mitra: "Bu Dewi",
    price: "Rp 32.000",
    unit: "/kg",
    bg: "#F0EEF8",
  },
];

const normalizeText = (value) =>
  String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const normalizeApiList = (data) => {
  if (Array.isArray(data)) return data;
  return data?.data || [];
};

const formatRupiah = (value) => {
  const numericValue = Number(value);

  if (Number.isFinite(numericValue) && numericValue > 0) {
    return `Rp ${numericValue.toLocaleString("id-ID")}`;
  }

  if (typeof value === "string" && value.trim()) {
    return value;
  }

  return "Rp -";
};

const getCategoryTheme = (categoryName, index = 0) => {
  const normalizedName = normalizeText(categoryName);
  const matchedTheme = categoryThemes.find((theme) =>
    theme.match.some((keyword) => normalizedName.includes(keyword)),
  );

  if (matchedTheme) {
    return matchedTheme;
  }

  return categoryThemes[index % categoryThemes.length];
};

const resolveProductCard = (product, index = 0) => {
  const categoryName =
    product?.Kategori?.nama ||
    product?.kategori?.nama ||
    product?.nama_kategori ||
    product?.category ||
    product?.kategori ||
    "";

  const theme = getCategoryTheme(categoryName, index);

  const imageUrl = product?.foto
    ? `${
        import.meta.env.VITE_API_URL || "http://localhost:5500/api"
      }/products/images/${product.foto}`
    : null;

  return {
    emoji: product?.emoji || theme.emoji,
    imageUrl,
    badge: product?.badge || "",
    cat: categoryName || "Kategori Produk",
    name:
      product?.nama || product?.name || product?.title || `Produk ${index + 1}`,
    var:
      product?.varian ||
      product?.variant ||
      product?.deskripsi ||
      product?.keterangan ||
      "Kualitas terverifikasi",
    mitra:
      product?.mitra?.nama ||
      product?.mitra ||
      product?.penjual?.nama ||
      product?.seller?.nama ||
      product?.user?.nama ||
      product?.User?.nama ||
      "Mitra terpercaya",
    price: formatRupiah(
      product?.harga ?? product?.price ?? product?.harga_jual,
    ),
    unit: product?.unit || product?.satuan || product?.kemasan || "/kg",
    bg: product?.bg || theme.bg,
  };
};

const Home = () => {
  const [activeKatIndex, setActiveKatIndex] = useState(0);
  const [apiProducts, setApiProducts] = useState([]);
  const [apiCategories, setApiCategories] = useState([]);
  const [buyerCount, setBuyerCount] = useState(null);
  const revealRefs = useRef([]);
  const location = useLocation();

  const testis = [
    {
      stars: 5,
      text: "Beras Pandan Wangi dari PanenKu emang beda! Nasi pulen, wangi, dan harganya wajar. Udah langganan tiap bulan sekarang.",
      name: "Ibu Ratna W.",
      role: "Pembeli — Bandung",
      emoji: "👩",
    },
    {
      stars: 5,
      text: "Ubi jalarnya segar banget sampai, nggak ada yang rusak. Bayar QRIS cepat banget, langsung dapat konfirmasi otomatis.",
      name: "Bu Siti Aminah",
      role: "Pembeli — Surabaya",
      emoji: "👩‍💼",
    },
  ];

  const steps = [
    {
      num: "01",
      icon: "📝",
      title: "Daftar Akun",
      desc: "Buat akun pembeli gratis dalam hitungan menit.",
    },
    {
      num: "02",
      icon: "🔍",
      title: "Pilih Produk",
      desc: "Temukan beras, beras ketan, ubi, dan komoditas pokok dari mitra terpercaya.",
    },
    {
      num: "03",
      icon: "📱",
      title: "Bayar via QRIS",
      desc: "Scan QRIS, bayar mudah. Transaksi tercatat otomatis di sistem.",
    },
    {
      num: "04",
      icon: "🚚",
      title: "Terima Pesanan",
      desc: "Lacak pengiriman real-time. Bahan pokok tiba segar dan terjamin kualitasnya.",
    },
  ];

  const keunggulan = [
    {
      icon: "🌾",
      bg: "#EAF6EA",
      title: "Kualitas Terseleksi",
      desc: "Setiap beras, ketan, dan ubi melewati seleksi ketat sebelum masuk katalog. Mitra kami adalah penjual terpercaya dengan rekam jejak jelas.",
    },
    {
      icon: "📱",
      bg: "#FFF0E0",
      title: "Bayar QRIS, Komisi Otomatis",
      desc: "Pembayaran via QRIS langsung tercatat dan terverifikasi otomatis — aman, cepat, dan transparan.",
    },
    {
      icon: "📦",
      bg: "#F5EDE0",
      title: "Harga Grosir & Eceran",
      desc: "Tersedia pilihan eceran maupun partai besar dalam karung, kwintal, atau ton. Cocok untuk rumah tangga hingga usaha kuliner.",
    },
    {
      icon: "📊",
      bg: "#FFF8E0",
      title: "Dashboard per Role",
      desc: "Pembeli punya riwayat & lacak pesanan. Admin punya kendali penuh atas semua produk dan transaksi.",
    },
  ];

  useEffect(() => {
    if (location.state?.scrollTo) {
      const el = document.getElementById(location.state.scrollTo);

      setTimeout(() => {
        el?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
    const fetchHomeData = async () => {
      try {
        const [productRes, categoryRes, userRes] = await Promise.all([
          api.get("/products"),
          api.get("/categories"),
          api.get("/users").catch(() => null),
        ]);

        const productData = normalizeApiList(productRes.data);
        const categoryData = normalizeApiList(categoryRes.data);
        const userData = userRes ? normalizeApiList(userRes.data) : [];

        setApiProducts(productData);
        setApiCategories(categoryData);
        setBuyerCount(
          userData.filter((user) => normalizeText(user?.role) === "pembeli")
            .length,
        );
      } catch (error) {
        console.error(error);
      }
    };

    fetchHomeData();
  }, [location]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e, i) => {
          if (e.isIntersecting) {
            setTimeout(() => e.target.classList.add("visible"), i * 90);
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 },
    );
    revealRefs.current.forEach((el) => {
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [apiProducts, apiCategories]);

  const addRevealRef = (el) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  const kategori = (
    apiCategories.length ? apiCategories : fallbackKategori
  ).map((category, index) => {
    const categoryName = category.nama || category.name;

    const matchedCount = apiProducts.filter((product) => {
      const productCategory =
        product?.Kategori?.nama ||
        product?.kategori?.nama ||
        product?.nama_kategori ||
        product?.category ||
        product?.kategori ||
        "";

      return normalizeText(productCategory) === normalizeText(categoryName);
    }).length;

    const theme = getCategoryTheme(categoryName, index);

    return {
      id: category.id_kategori || category.id || index,
      emoji: category.emoji || theme.emoji,
      name: categoryName,
      count: `${matchedCount} produk`,
      bg: theme.bg,
    };
  });

  const products = (apiProducts.length ? apiProducts : fallbackProducts)
    .slice(0, 6)
    .map((product, index) => resolveProductCard(product, index));

  const totalProducts = apiProducts.length || fallbackProducts.length;
  const totalCategories = apiCategories.length || fallbackKategori.length;
  const buyerStat = buyerCount !== null ? buyerCount : totalCategories;

  const orbitProducts = apiProducts.slice(0, 4).map((product, index) => {
    const categoryName =
      product?.Kategori?.nama ||
      product?.kategori?.nama ||
      product?.nama_kategori ||
      "";

    const theme = getCategoryTheme(categoryName, index);

    return {
      emoji: theme.emoji,
      name: product.nama,
    };
  });

  return (
    <>
      <Navbar />

      <section className="hero">
        <div className="hero-text">
          <div className="hero-badge">🌾 Pusat Bahan Pokok Berkualitas</div>
          <h1>
            Beras, Ketan & Ubi <em>Terbaik</em> Langsung dari{" "}
            <strong>Sumbernya</strong>
          </h1>
          <p className="hero-desc">
            PanenKu menghadirkan beras putih, beras ketan, ubi jalar, dan
            komoditas pokok pilihan berkualitas tinggi langsung ke tangan Anda.
          </p>
          <div className="hero-actions">
            <Link to="/catalog" className="btn btn-primary btn-lg">
              🛒 Belanja Sekarang
            </Link>
          </div>
          <div className="hero-chips">
            {(apiCategories.length ? apiCategories : fallbackKategori)
              .slice(0, 5)
              .map((kategori, index) => {
                const theme = getCategoryTheme(
                  kategori.nama || kategori.name,
                  index,
                );

                return (
                  <div
                    key={kategori.id_kategori || kategori.id || index}
                    className="chip"
                  >
                    {theme.emoji} {kategori.nama || kategori.name}
                  </div>
                );
              })}
          </div>
          <div className="hero-stats">
            <div>
              <span className="stat-num">{totalProducts}</span>
              <span className="stat-label">Jenis Produk Pokok</span>
            </div>
            <div>
              <span className="stat-num">{buyerStat}</span>
              <span className="stat-label">Pembeli Aktif</span>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div style={{ position: "relative" }}>
            <div className="hero-bowl">🌾</div>

            {orbitProducts[0] && (
              <div className="orbit-item o1">
                {orbitProducts[0].emoji} {orbitProducts[0].name}
              </div>
            )}

            {orbitProducts[1] && (
              <div className="orbit-item o2">
                {orbitProducts[1].emoji} {orbitProducts[1].name}
              </div>
            )}

            <div className="orbit-item o3">✅ Kualitas Terverifikasi</div>

            {orbitProducts[2] && (
              <div className="orbit-item o4">
                {orbitProducts[2].emoji} {orbitProducts[2].name}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="kategori" id="kategori">
        <div className="section-label">Kategori Produk</div>
        <h2>
          Komoditas <em>Pokok</em> Pilihan
        </h2>
        <p className="section-desc">
          Fokus pada bahan pangan pokok berkualitas tinggi yang dipilih dari
          sumber terpercaya.
        </p>
        <div className="kat-grid">
          {kategori.map((k, i) => (
            <div
              key={k.id}
              ref={addRevealRef}
              className={`kat-card ${i === activeKatIndex ? "active" : ""}`}
              style={{ background: k.bg }}
              onClick={() => setActiveKatIndex(i)}
            >
              <span className="kat-emoji">{k.emoji}</span>
              <div className="kat-name">{k.name}</div>
              <div className="kat-count">{k.count}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="produk">
        <div className="prod-header">
          <div>
            <div className="section-label">Produk Unggulan</div>
            <h2>
              Pilihan <em>Terbaik</em> Hari Ini
            </h2>
          </div>
          <Link to="/catalog" className="btn btn-outline">
            Lihat Semua →
          </Link>
        </div>
        <div
          className="prod-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: "1.5rem",
          }}
        >
          {products.map((produk, idx) => {
            const imageUrl = produk.imageUrl;

            return (
              <div
                key={idx}
                ref={(el) => (revealRefs.current[idx] = el)}
                className="prod-card reveal"
                style={{
                  background: "#fff",
                  borderRadius: "20px",
                  overflow: "hidden",
                  border: "1px solid var(--border)",
                  transition: "transform .3s,box-shadow .3s",
                  cursor: "pointer",
                }}
              >
                {/* THUMB */}
                <div
                  className="prod-thumb"
                  style={{
                    height: "160px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "5rem",
                    position: "relative",
                    background: "#FFF8E8",
                    overflow: "hidden",
                  }}
                >
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={produk.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    produk.emoji
                  )}

                  {produk.badge && (
                    <span
                      style={{
                        position: "absolute",
                        top: "12px",
                        left: "12px",
                        fontSize: ".68rem",
                        fontWeight: 700,
                        padding: ".25rem .65rem",
                        borderRadius: "999px",
                        background: "var(--gold)",
                        color: "#fff",
                      }}
                    >
                      {produk.badge}
                    </span>
                  )}
                </div>

                {/* BODY */}
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
                    className="prod-footer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: "1rem",
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
                        {produk.price}
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
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="how" id="cara-kerja">
        <div className="section-label">Cara Kerja</div>
        <h2>
          Mudah, Cepat, <em>Terpercaya</em>
        </h2>
        <p className="section-desc">
          Dari daftar hingga bahan pokok tiba, prosesnya transparan dan mudah
          dipantau.
        </p>
        <div className="steps">
          {steps.map((s, i) => (
            <div key={i} ref={addRevealRef} className="step-card reveal">
              <div className="step-num">{s.num}</div>
              <div className="step-icon">{s.icon}</div>
              <div className="step-title">{s.title}</div>
              <div className="step-desc">{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="section-label">Mengapa PanenKu</div>
        <h2>
          Lebih dari Sekadar <em>Toko Online</em>
        </h2>
        <p className="section-desc">
          Platform yang dirancang khusus untuk ekosistem bahan pangan pokok
          Indonesia.
        </p>
        <div className="keunggulan-grid">
          {keunggulan.map((k, i) => (
            <div key={i} ref={addRevealRef} className="keung-card reveal">
              <div className="keung-icon" style={{ background: k.bg }}>
                {k.icon}
              </div>
              <div>
                <div className="keung-title">{k.title}</div>
                <div className="keung-desc">{k.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="roles" id="peran">
        <div className="section-label">Bergabung</div>
        <h2>
          Belanja Produk Pokok Jadi Lebih Mudah, <em>Mari Berbelanja</em>
        </h2>
        <p className="section-desc">
          Temukan beras, ketan, dan ubi dari mitra terpercaya dengan harga transparan.
        </p>
        <div className="roles-grid">
          <div ref={addRevealRef} className="role-card pembeli reveal">
            <div className="role-icon">🛒</div>
            <div className="role-title">Pembeli</div>
            <div className="role-desc">
              Beli beras, ketan, dan ubi langsung dari mitra terpercaya dengan
              harga transparan.
            </div>
            <ul className="role-features">
              <li>Katalog produk pokok lengkap</li>
              <li>Bayar via QRIS cepat & aman</li>
              <li>Lacak pengiriman real-time</li>
              <li>Riwayat & invoice otomatis</li>
              <li>Pesan ulang 1 klik</li>
            </ul>
            <Link to="/register" className="btn btn-primary">
              Daftar Pembeli
            </Link>
          </div>
        </div>
      </section>

      <section className="testi" id="testimoni">
        <div className="section-label">Testimoni</div>
        <h2>
          Dipercaya Ribuan <em>Pengguna</em>
        </h2>
        <p className="section-desc">
          Apa kata mereka yang sudah bertransaksi di PanenKu.
        </p>
        <div className="testi-grid">
          {testis.map((t, i) => (
            <div key={i} ref={addRevealRef} className="testi-card reveal">
              <div className="stars">{"★".repeat(t.stars)}</div>
              <p className="testi-text">"{t.text}"</p>
              <div className="testi-author">
                <div className="testi-avatar">{t.emoji}</div>
                <div>
                  <div className="testi-name">{t.name}</div>
                  <div className="testi-role-text">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="cta-wrap">
        <div ref={addRevealRef} className="cta-banner reveal">
          <div className="cta-text">
            <h2>Siap Pesan Bahan Pokok?</h2>
            <p>
              Daftar gratis dan dapatkan akses ke ratusan produk beras, ketan,
              ubi pilihan dari mitra terpercaya.
            </p>
          </div>
          <div className="cta-actions">
            <Link to="/register" className="btn btn-white btn-lg">
              🛒 Mulai Belanja
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Home;
