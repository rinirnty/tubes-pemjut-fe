import { useEffect, useRef, useState } from 'react'
import './styles.css'

function App() {
  const [navbarScrolled, setNavbarScrolled] = useState(false)
  const [activeKatIndex, setActiveKatIndex] = useState(0)
  const revealRefs = useRef([])

  const kategori = [
    {emoji:'🍚',name:'Beras Putih',count:'12 produk',bg:'#FFF8E8'},
    {emoji:'🌾',name:'Beras Ketan',count:'8 produk',bg:'#F0F8E8'},
    {emoji:'🍠',name:'Ubi Jalar',count:'6 produk',bg:'#FFF0E8'},
    {emoji:'🟤',name:'Ubi Kayu',count:'5 produk',bg:'#F5EDE0'},
    {emoji:'🌿',name:'Beras Merah',count:'4 produk',bg:'#F0F5E8'},
  ]

  const products = [
    {emoji:'🍚',badge:'Terlaris',cat:'Beras Putih',name:'Beras Pandan Wangi',var:'Premium • Pulen & Wangi',mitra:'Pak Hendra',price:'Rp 65.000',unit:'/5 kg',bg:'#FFF8E8'},
    {emoji:'🌾',badge:'Baru',cat:'Beras Ketan',name:'Beras Ketan Putih',var:'Super • Lengket Sempurna',mitra:'Bu Siti',price:'Rp 28.000',unit:'/kg',bg:'#F0F8E8'},
    {emoji:'🍠',badge:'',cat:'Ubi Jalar',name:'Ubi Jalar Merah',var:'Manis • Segar dari Kebun',mitra:'Pak Darto',price:'Rp 8.000',unit:'/kg',bg:'#FFF0E8'},
    {emoji:'🌿',badge:'',cat:'Beras Merah',name:'Beras Merah Organik',var:'Organik • Bebas Pestisida',mitra:'CV Agri',price:'Rp 22.000',unit:'/kg',bg:'#F0F5E8'},
    {emoji:'🟤',badge:'Promo',cat:'Ubi Kayu',name:'Singkong Segar',var:'Lokal • Manis & Empuk',mitra:'Pak Budi',price:'Rp 5.000',unit:'/kg',bg:'#F5EDE0'},
    {emoji:'🍚',badge:'',cat:'Beras Ketan',name:'Beras Ketan Hitam',var:'Spesial • Untuk Kue & Bubur',mitra:'Bu Dewi',price:'Rp 32.000',unit:'/kg',bg:'#F0EEF8'},
  ]

  const testis = [
    {stars:5,text:'Beras Pandan Wangi dari PanenKu emang beda! Nasi pulen, wangi, dan harganya wajar. Udah langganan tiap bulan sekarang.',name:'Ibu Ratna W.',role:'Pembeli — Bandung',emoji:'👩'},
    {stars:5,text:'Ubi jalarnya segar banget sampai, nggak ada yang rusak. Bayar QRIS cepat banget, langsung dapat konfirmasi otomatis.',name:'Bu Siti Aminah',role:'Pembeli — Surabaya',emoji:'👩‍💼'},
  ]

  const steps = [
    {num:'01', icon:'📝', title:'Daftar Akun', desc:'Buat akun pembeli gratis dalam hitungan menit.'},
    {num:'02', icon:'🔍', title:'Pilih Produk', desc:'Temukan beras, beras ketan, ubi, dan komoditas pokok dari mitra terpercaya.'},
    {num:'03', icon:'📱', title:'Bayar via QRIS', desc:'Scan QRIS, bayar mudah. Transaksi tercatat otomatis di sistem.'},
    {num:'04', icon:'🚚', title:'Terima Pesanan', desc:'Lacak pengiriman real-time. Bahan pokok tiba segar dan terjamin kualitasnya.'},
  ]

  const keunggulan = [
    {icon:'🌾', bg:'#EAF3DE', title:'Kualitas Terseleksi', desc:'Setiap beras, ketan, dan ubi melewati seleksi ketat sebelum masuk katalog. Mitra kami adalah penjual terpercaya dengan rekam jejak jelas.'},
    {icon:'📱', bg:'#FFF0E0', title:'Bayar QRIS, Komisi Otomatis', desc:'Pembayaran via QRIS langsung tercatat dan terverifikasi otomatis — aman, cepat, dan transparan.'},
    {icon:'📦', bg:'#F5EDE0', title:'Harga Grosir & Eceran', desc:'Tersedia pilihan eceran maupun partai besar dalam karung, kwintal, atau ton. Cocok untuk rumah tangga hingga usaha kuliner.'},
    {icon:'📊', bg:'#FFF8E0', title:'Dashboard per Role', desc:'Pembeli punya riwayat & lacak pesanan. Admin punya kendali penuh atas semua produk dan transaksi.'},
  ]

  useEffect(() => {
    const handleScroll = () => {
      setNavbarScrolled(window.scrollY > 30)
    }

    const obs = new IntersectionObserver(entries => {
      entries.forEach((e, i) => {
        if(e.isIntersecting){ 
          setTimeout(()=>e.target.classList.add('visible'),i*90)
          obs.unobserve(e.target)
        }
      })
    }, {threshold:0.1})

    revealRefs.current.forEach(el => {
      if (el) obs.observe(el)
    })

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      obs.disconnect()
    }
  }, [])

  const addRevealRef = (el) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el)
    }
  }

  return (
    <div>
      <nav id="navbar" className={navbarScrolled ? 'scrolled' : ''}>
        <a href="#" className="logo">🌾 Panen<span>Ku</span></a>
        <ul className="nav-links">
          <li><a href="#produk">Produk</a></li>
          <li><a href="#cara-kerja">Cara Kerja</a></li>
          <li><a href="#peran">Bergabung</a></li>
          <li><a href="#testimoni">Testimoni</a></li>
          <li><a href="#">Tentang</a></li>
          <li><a href="#">Kontak</a></li>
        </ul>
        <div className="nav-cta">
          <a href="#" className="btn btn-outline">Masuk</a>
          <a href="#" className="btn btn-primary">Daftar Gratis</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-text">
          <div className="hero-badge">🌾 Pusat Bahan Pokok Berkualitas</div>
          <h1>Beras, Ketan & Ubi <em>Terbaik</em> Langsung dari <strong>Sumbernya</strong></h1>
          <p className="hero-desc">PanenKu menghadirkan beras putih, beras ketan, ubi jalar, dan komoditas pokok pilihan berkualitas tinggi langsung ke tangan Anda.</p>
          <div className="hero-actions">
            <a href="#" className="btn btn-primary btn-lg">🛒 Belanja Sekarang</a>
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
          <div style={{position:'relative'}}>
            <div className="hero-bowl">🌾</div>
            <div className="orbit-item o1">🍚 Beras Pandan Wangi</div>
            <div className="orbit-item o2">🍠 Ubi Jalar Merah</div>
            <div className="orbit-item o3">✅ Kualitas Terverifikasi</div>
            <div className="orbit-item o4">📦 Kirim ke Seluruh Kota</div>
          </div>
        </div>
      </section>

      {/* KATEGORI */}
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
              style={{background: k.bg}}
              onClick={() => setActiveKatIndex(i)}
            >
              <span className="kat-emoji">{k.emoji}</span>
              <div className="kat-name">{k.name}</div>
              <div className="kat-count">{k.count}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUK */}
      <section id="produk">
        <div className="prod-header">
          <div>
            <div className="section-label">Produk Unggulan</div>
            <h2>Pilihan <em>Terbaik</em> Hari Ini</h2>
          </div>
          <a href="#" className="btn btn-outline">Lihat Semua →</a>
        </div>
        <div className="products-grid">
          {products.map((p, i) => (
            <div key={i} ref={addRevealRef} className="prod-card reveal">
              <div className="prod-img" style={{background:p.bg}}>
                {p.emoji}
                {p.badge && <span className="prod-badge">{p.badge}</span>}
              </div>
              <div className="prod-body">
                <div className="prod-cat">{p.cat}</div>
                <div className="prod-name">{p.name}</div>
                <div className="prod-var">{p.var}</div>
                <div className="prod-mitra">🏪 {p.mitra}</div>
                <div className="prod-footer">
                  <div>
                    <div className="prod-price">{p.price}</div>
                    <div className="prod-unit">{p.unit}</div>
                  </div>
                  <button className="prod-btn">+</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
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

      {/* KEUNGGULAN */}
      <section>
        <div className="section-label">Mengapa PanenKu</div>
        <h2>Lebih dari Sekadar <em>Toko Online</em></h2>
        <p className="section-desc">Platform yang dirancang khusus untuk ekosistem bahan pangan pokok Indonesia.</p>
        <div className="keunggulan-grid">
          {keunggulan.map((k, i) => (
            <div key={i} ref={addRevealRef} className="keung-card reveal">
              <div className="keung-icon" style={{background: k.bg}}>{k.icon}</div>
              <div>
                <div className="keung-title">{k.title}</div>
                <div className="keung-desc">{k.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ROLES */}
      <section className="roles" id="peran">
        <div className="section-label">Bergabung</div>
        <h2>Belanja Produk Pokok Jadi Lebih Mudah, <em>Mari Berbelanja</em></h2>
        <p className="section-desc">Temukan beras, ketan, dan ubi dari mitra terpercaya dengan harga transparan.</p>
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
            <a href="#" className="btn btn-primary">Daftar Pembeli</a>
          </div>
        </div>
      </section>

      {/* TESTIMONI */}
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

      {/* CTA */}
      <div className="cta-wrap">
        <div ref={addRevealRef} className="cta-banner reveal">
          <div className="cta-text">
            <h2>Siap Pesan Bahan Pokok?</h2>
            <p>Daftar gratis dan dapatkan akses ke ratusan produk beras, ketan, ubi pilihan dari mitra terpercaya.</p>
          </div>
          <div className="cta-actions">
            <a href="#" className="btn btn-white btn-lg">🛒 Mulai Belanja</a>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer>
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="#" className="footer-logo">🌾 Panen<span>Ku</span></a>
            <p>Platform penyedia bahan pangan pokok — beras putih, beras ketan, ubi jalar, ubi kayu — yang menghubungkan pembeli dan admin dalam satu ekosistem digital.</p>
          </div>
          <div className="footer-col">
            <h4>Produk</h4>
            <ul>
              <li><a href="#">Beras Putih</a></li>
              <li><a href="#">Beras Ketan</a></li>
              <li><a href="#">Ubi Jalar</a></li>
              <li><a href="#">Ubi Kayu / Singkong</a></li>
              <li><a href="#">Beras Merah</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Platform</h4>
            <ul>
              <li><a href="#cara-kerja">Cara Kerja</a></li>
              <li><a href="#">Tentang Kami</a></li>
              <li><a href="#">Kontak</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Bantuan</h4>
            <ul>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Syarat & Ketentuan</a></li>
              <li><a href="#">Kebijakan Privasi</a></li>
              <li><a href="#">Hubungi Kami</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2025 PanenKu. Semua hak dilindungi.</span>
          <span>🌾 Bahan pokok berkualitas untuk Indonesia</span>
        </div>
      </footer>
    </div>
  )
}

export default App
