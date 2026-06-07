import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [activeKatIndex, setActiveKatIndex] = useState(0);
  const revealRefs = useRef([]);

  const kategori = [
    { emoji: '🍚', name: 'Beras Putih', count: '12 produk', bg: '#FFF8E8' },
    { emoji: '🌾', name: 'Beras Ketan', count: '8 produk', bg: '#F0F8E8' },
    { emoji: '🍠', name: 'Ubi Jalar', count: '6 produk', bg: '#FFF0E8' },
    { emoji: '🟤', name: 'Ubi Kayu', count: '5 produk', bg: '#F5EDE0' },
    { emoji: '🌿', name: 'Beras Merah', count: '4 produk', bg: '#F0F5E8' },
  ];

  const products = [
    { emoji: '🍚', badge: 'terlaris', cat: 'Beras Putih', name: 'Beras Pandan Wangi', var: 'Premium • Pulen & Wangi', mitra: 'Pak Hendra', price: 'Rp 65.000', unit: '/5 kg', bg: '#FFF8E8' },
    { emoji: '🌾', badge: 'baru', cat: 'Beras Ketan', name: 'Beras Ketan Putih', var: 'Super • Lengket Sempurna', mitra: 'Bu Siti', price: 'Rp 28.000', unit: '/kg', bg: '#F0F8E8' },
    { emoji: '🍠', badge: '', cat: 'Ubi Jalar', name: 'Ubi Jalar Merah', var: 'Manis • Segar dari Kebun', mitra: 'Pak Darto', price: 'Rp 8.000', unit: '/kg', bg: '#FFF0E8' },
    { emoji: '🌿', badge: '', cat: 'Beras Merah', name: 'Beras Merah Organik', var: 'Organik • Bebas Pestisida', mitra: 'CV Agri', price: 'Rp 22.000', unit: '/kg', bg: '#F0F5E8' },
    { emoji: '🟤', badge: 'promo', cat: 'Ubi Kayu', name: 'Singkong Segar', var: 'Lokal • Manis & Empuk', mitra: 'Pak Budi', price: 'Rp 5.000', unit: '/kg', bg: '#F5EDE0' },
    { emoji: '🍚', badge: '', cat: 'Beras Ketan', name: 'Beras Ketan Hitam', var: 'Spesial • Untuk Kue & Bubur', mitra: 'Bu Dewi', price: 'Rp 32.000', unit: '/kg', bg: '#F0EEF8' },
  ];

  const testis = [
    { stars: 5, text: 'Beras Pandan Wangi dari PanenKu emang beda! Nasi pulen, wangi, dan harganya wajar. Udah langganan tiap bulan sekarang.', name: 'Ibu Ratna W.', role: 'Pembeli — Bandung', emoji: '👩' },
    { stars: 5, text: 'Ubi jalarnya segar banget sampai, nggak ada yang rusak. Bayar QRIS cepat banget, langsung dapat konfirmasi otomatis.', name: 'Bu Siti Aminah', role: 'Pembeli — Surabaya', emoji: '👩‍💼' },
  ];

  const steps = [
    { num: '01', icon: '📝', title: 'Daftar Akun', desc: 'Buat akun pembeli gratis dalam hitungan menit.' },
    { num: '02', icon: '🔍', title: 'Pilih Produk', desc: 'Temukan beras, beras ketan, ubi, dan komoditas pokok dari mitra terpercaya.' },
    { num: '03', icon: '📱', title: 'Bayar via QRIS', desc: 'Scan QRIS, bayar mudah. Transaksi tercatat otomatis di sistem.' },
    { num: '04', icon: '🚚', title: 'Terima Pesanan', desc: 'Lacak pengiriman real-time. Bahan pokok tiba segar dan terjamin kualitasnya.' },
  ];

  const keunggulan = [
    { icon: '🌾', bg: '#EAF6EA', title: 'Kualitas Terseleksi', desc: 'Setiap beras, ketan, dan ubi melewati seleksi ketat sebelum masuk katalog. Mitra kami adalah penjual terpercaya dengan rekam jejak jelas.' },
    { icon: '📱', bg: '#FFF0E0', title: 'Bayar QRIS, Komisi Otomatis', desc: 'Pembayaran via QRIS langsung tercatat dan terverifikasi otomatis — aman, cepat, dan transparan.' },
    { icon: '📦', bg: '#F5EDE0', title: 'Harga Grosir & Eceran', desc: 'Tersedia pilihan eceran maupun partai besar dalam karung, kwintal, atau ton. Cocok untuk rumah tangga hingga usaha kuliner.' },
    { icon: '📊', bg: '#FFF8E0', title: 'Dashboard per Role', desc: 'Pembeli punya riwayat & lacak pesanan. Admin punya kendali penuh atas semua produk dan transaksi.' },
  ];

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e, i) => {
          if (e.isIntersecting) {
            setTimeout(() => e.target.classList.add('visible'), i * 90);
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    revealRefs.current.forEach((el) => {
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const addRevealRef = (el) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  return (
    <>
      <Navbar />
      
      <section className="hero">
        <div className="hero-text">
          <div className="hero-badge">🌾 Pusat Bahan Pokok Berkualitas</div>
          <h1>Beras, Ketan & Ubi <em>Terbaik</em> Langsung dari <strong>Sumbernya</strong></h1>
          <p className="hero-desc">PanenKu menghadirkan beras putih, beras ketan, ubi jalar, dan komoditas pokok pilihan berkualitas tinggi langsung ke tangan Anda.</p>
          <div className="hero-actions">
            <Link to="/catalog" className="btn btn-primary btn-lg">🛒 Belanja Sekarang</Link>
          </div>
          <div className="hero-chips">
            <div className="chip">🍚 Beras Putih</div>
            <div className="chip">🌾 Beras Ketan</div>
            <div className="chip">🍠 Ubi Jalar</div>
            <div className="chip">🟤 Ubi Kayu</div>
            <div className="chip">🌿 Beras Merah</div>
          </div>
          <div className="hero-stats">
            <div><span className="stat-num">50+</span><span className="stat-label">Jenis Produk Pokok</span></div>
            <div><span className="stat-num">5rb+</span><span className="stat-label">Pembeli Aktif</span></div>
          </div>
        </div>
        <div className="hero-visual">
          <div style={{ position: 'relative' }}>
            <div className="hero-bowl">🌾</div>
            <div className="orbit-item o1">🍚 Beras Pandan Wangi</div>
            <div className="orbit-item o2">🍠 Ubi Jalar Merah</div>
            <div className="orbit-item o3">✅ Kualitas Terverifikasi</div>
            <div className="orbit-item o4">📦 Kirim ke Seluruh Kota</div>
          </div>
        </div>
      </section>

      <section className="kategori" id="kategori">
        <div className="section-label">Kategori Produk</div>
        <h2>Komoditas <em>Pokok</em> Pilihan</h2>
        <p className="section-desc">Fokus pada bahan pangan pokok berkualitas tinggi yang dipilih dari sumber terpercaya.</p>
        <div className="kat-grid">
          {kategori.map((k, i) => (
            <div
              key={i}
              ref={addRevealRef}
              className={`kat-card reveal ${i === activeKatIndex ? 'active' : ''}`}
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
            <h2>Pilihan <em>Terbaik</em> Hari Ini</h2>
          </div>
          <Link to="/catalog" className="btn btn-outline">Lihat Semua →</Link>
        </div>
        <div className="products-grid">
          {products.map((p, i) => (
            <div key={i} ref={addRevealRef} className="reveal">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </section>

      <section className="how" id="cara-kerja">
        <div className="section-label">Cara Kerja</div>
        <h2>Mudah, Cepat, <em>Terpercaya</em></h2>
        <p className="section-desc">Dari daftar hingga bahan pokok tiba, prosesnya transparan dan mudah dipantau.</p>
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
        <h2>Lebih dari Sekadar <em>Toko Online</em></h2>
        <p className="section-desc">Platform yang dirancang khusus untuk ekosistem bahan pangan pokok Indonesia.</p>
        <div className="keunggulan-grid">
          {keunggulan.map((k, i) => (
            <div key={i} ref={addRevealRef} className="keung-card reveal">
              <div className="keung-icon" style={{ background: k.bg }}>{k.icon}</div>
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
        <h2>Satu Platform, <em>Dua Peran</em></h2>
        <p className="section-desc">Dua peran yang dirancang dengan fitur dan akses berbeda sesuai kebutuhan.</p>
        <div className="roles-grid">
          <div ref={addRevealRef} className="role-card pembeli reveal">
            <div className="role-icon">🛒</div>
            <div className="role-title">Pembeli</div>
            <div className="role-desc">Beli beras, ketan, dan ubi langsung dari mitra terpercaya dengan harga transparan.</div>
            <ul className="role-features">
              <li>Katalog produk pokok lengkap</li>
              <li>Bayar via QRIS cepat & aman</li>
              <li>Lacak pengiriman real-time</li>
              <li>Riwayat & invoice otomatis</li>
              <li>Pesan ulang 1 klik</li>
            </ul>
            <Link to="/register" className="btn btn-primary">Daftar Pembeli</Link>
          </div>
        </div>
      </section>

      <section className="testi" id="testimoni">
        <div className="section-label">Testimoni</div>
        <h2>Dipercaya Ribuan <em>Pengguna</em></h2>
        <p className="section-desc">Apa kata mereka yang sudah bertransaksi di PanenKu.</p>
        <div className="testi-grid">
          {testis.map((t, i) => (
            <div key={i} ref={addRevealRef} className="testi-card reveal">
              <div className="stars">{'★'.repeat(t.stars)}</div>
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
            <p>Daftar gratis dan dapatkan akses ke ratusan produk beras, ketan, ubi pilihan dari mitra terpercaya.</p>
          </div>
          <div className="cta-actions">
            <Link to="/register" className="btn btn-white btn-lg">🛒 Mulai Belanja</Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Home;
