import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const FAQs = [
  { q: 'Bagaimana cara mendaftar sebagai pembeli?', a: 'Klik tombol "Daftar Gratis" di pojok kanan atas, pilih role "Pembeli", isi data diri, dan akun kamu langsung aktif. Proses pendaftaran hanya butuh 2 menit.' },
  { q: 'Metode pembayaran apa yang tersedia?', a: 'Saat ini kami mendukung pembayaran via QRIS (bisa dari semua e-wallet dan mobile banking) dan transfer bank manual. Pembayaran QRIS langsung terverifikasi otomatis.' },
  { q: 'Berapa lama waktu pengiriman?', a: 'Tergantung lokasi pengiriman. Rata-rata pengiriman di dalam kota 1 hari, luar kota 2-3 hari kerja. Kamu bisa melacak status pengiriman real-time di halaman Tracking.' },
  { q: 'Apakah ada minimal pembelian?', a: 'Tidak ada minimal pembelian untuk eceran. Untuk pembelian grosir (partai besar) silakan hubungi tim kami via WhatsApp.' }
];

function Contact() {
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    phone: '',
    topic: '',
    message: '',
    agree: false
  });
  const [showAlert, setShowAlert] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const revealRefs = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('visible');
            }, index * 80);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    revealRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Simulate loading
    await new Promise(r => setTimeout(r, 1500));
    setShowAlert(true);
    setFormData({
      fname: '',
      lname: '',
      email: '',
      phone: '',
      topic: '',
      message: '',
      agree: false
    });
    setTimeout(() => setShowAlert(false), 5000);
  };

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <div className="contact-page">
      <Navbar />

      {/* Hero */}
      <div className="hero-contact" style={{ minHeight: '38vh', display: 'flex', alignItems: 'center', padding: '8rem 5% 3rem', background: 'linear-gradient(135deg, var(--green) 0%, var(--brown) 100%)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: '.75rem', fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--gold2)', marginBottom: '.6rem' }}>Hubungi Kami</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 5vw, 3.2rem)', color: '#fff', marginBottom: '.75rem' }}>Ada Pertanyaan? <br />Kami Siap Membantu!</h1>
          <p style={{ color: 'rgba(255,255,255,.75)', fontSize: '1rem', maxWidth: '480px', lineHeight: 1.75 }}>Tim PanenKu siap membantu Anda 7 hari seminggu. Hubungi kami melalui form, WhatsApp, atau email.</p>
        </div>
      </div>

      {/* Main Content */}
      <section style={{ padding: '5rem 5%' }}>
        <div className="contact-grid reveal" ref={(el) => (revealRefs.current[0] = el)} style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '2rem', alignItems: 'start' }}>
          {/* Info Side */}
          <div>
            <div className="info-card" style={{ background: '#fff', borderRadius: '20px', padding: '2rem', border: '1px solid var(--border)', marginBottom: '1.25rem' }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>Informasi Kontak</div>
              <div className="info-item" style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '1rem 0', borderBottom: '1px solid var(--border)' }}>
                <div className="info-icon" style={{ width: '44px', height: '44px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', flexShrink: 0, background: '#EAF3DE' }}>📍</div>
                <div>
                  <div className="info-label" style={{ fontSize: '.75rem', color: 'var(--muted)', marginBottom: '.2rem' }}>Alamat Kantor</div>
                  <div className="info-value" style={{ fontWeight: 600, fontSize: '.9rem', color: 'var(--text)' }}>Jl. Pasteur No. 25, Bandung</div>
                  <div className="info-sub" style={{ fontSize: '.78rem', color: 'var(--muted)', marginTop: '.1rem' }}>Jawa Barat, Indonesia 40161</div>
                </div>
              </div>
              <div className="info-item" style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '1rem 0', borderBottom: '1px solid var(--border)' }}>
                <div className="info-icon" style={{ width: '44px', height: '44px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', flexShrink: 0, background: '#FFF0E8' }}>📱</div>
                <div>
                  <div className="info-label" style={{ fontSize: '.75rem', color: 'var(--muted)', marginBottom: '.2rem' }}>WhatsApp / Telepon</div>
                  <div className="info-value" style={{ fontWeight: 600, fontSize: '.9rem', color: 'var(--text)' }}>+62 812-3456-7890</div>
                  <div className="info-sub" style={{ fontSize: '.78rem', color: 'var(--muted)', marginTop: '.1rem' }}>Senin–Minggu, 08.00–20.00 WIB</div>
                </div>
              </div>
              <div className="info-item" style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '1rem 0', borderBottom: '1px solid var(--border)' }}>
                <div className="info-icon" style={{ width: '44px', height: '44px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', flexShrink: 0, background: '#E0F0FF' }}>✉️</div>
                <div>
                  <div className="info-label" style={{ fontSize: '.75rem', color: 'var(--muted)', marginBottom: '.2rem' }}>Email</div>
                  <div className="info-value" style={{ fontWeight: 600, fontSize: '.9rem', color: 'var(--text)' }}>halo@panenku.com</div>
                  <div className="info-sub" style={{ fontSize: '.78rem', color: 'var(--muted)', marginTop: '.1rem' }}>Balasan dalam 1×24 jam</div>
                </div>
              </div>
              <div className="info-item" style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '1rem 0' }}>
                <div className="info-icon" style={{ width: '44px', height: '44px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', flexShrink: 0, background: '#FFF8E0' }}>🕐</div>
                <div>
                  <div className="info-label" style={{ fontSize: '.75rem', color: 'var(--muted)', marginBottom: '.2rem' }}>Jam Operasional</div>
                  <div className="info-value" style={{ fontWeight: 600, fontSize: '.9rem', color: 'var(--text)' }}>Senin – Minggu</div>
                  <div className="info-sub" style={{ fontSize: '.78rem', color: 'var(--muted)', marginTop: '.1rem' }}>08.00 – 20.00 WIB</div>
                </div>
              </div>
            </div>
            {/* WhatsApp CTA */}
            <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="btn btn-green btn-block btn-lg" style={{ borderRadius: '14px', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '.4rem', padding: '.85rem 2rem', background: 'var(--green)', color: '#fff', border: 'none', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontSize: '1rem', fontWeight: 500, textDecoration: 'none' }}>
              💬 Chat via WhatsApp
            </a>
            {/* Social */}
            <div className="social-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1rem', marginTop: '2rem' }}>
              <div className="social-card" style={{ background: '#fff', borderRadius: '16px', padding: '1.25rem', border: '1px solid var(--border)', textAlign: 'center', transition: 'transform .2s,box-shadow .2s', textDecoration: 'none', color: 'var(--text)' }}>
                <div className="social-icon" style={{ fontSize: '2rem', marginBottom: '.5rem' }}>📘</div>
                <div className="social-name" style={{ fontSize: '.8rem', fontWeight: 600 }}>Facebook</div>
                <div className="social-handle" style={{ fontSize: '.72rem', color: 'var(--muted)' }}>@PanenKu</div>
              </div>
              <div className="social-card" style={{ background: '#fff', borderRadius: '16px', padding: '1.25rem', border: '1px solid var(--border)', textAlign: 'center', transition: 'transform .2s,box-shadow .2s', textDecoration: 'none', color: 'var(--text)' }}>
                <div className="social-icon" style={{ fontSize: '2rem', marginBottom: '.5rem' }}>📸</div>
                <div className="social-name" style={{ fontSize: '.8rem', fontWeight: 600 }}>Instagram</div>
                <div className="social-handle" style={{ fontSize: '.72rem', color: 'var(--muted)' }}>@panenku.id</div>
              </div>
              <div className="social-card" style={{ background: '#fff', borderRadius: '16px', padding: '1.25rem', border: '1px solid var(--border)', textAlign: 'center', transition: 'transform .2s,box-shadow .2s', textDecoration: 'none', color: 'var(--text)' }}>
                <div className="social-icon" style={{ fontSize: '2rem', marginBottom: '.5rem' }}>🐦</div>
                <div className="social-name" style={{ fontSize: '.8rem', fontWeight: 600 }}>Twitter</div>
                <div className="social-handle" style={{ fontSize: '.72rem', color: 'var(--muted)' }}>@PanenKuid</div>
              </div>
              <div className="social-card" style={{ background: '#fff', borderRadius: '16px', padding: '1.25rem', border: '1px solid var(--border)', textAlign: 'center', transition: 'transform .2s,box-shadow .2s', textDecoration: 'none', color: 'var(--text)' }}>
                <div className="social-icon" style={{ fontSize: '2rem', marginBottom: '.5rem' }}>▶️</div>
                <div className="social-name" style={{ fontSize: '.8rem', fontWeight: 600 }}>YouTube</div>
                <div className="social-handle" style={{ fontSize: '.72rem', color: 'var(--muted)' }}>PanenKu TV</div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="form-card" style={{ background: '#fff', borderRadius: '20px', padding: '2rem', border: '1px solid var(--border)' }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', fontWeight: 700, marginBottom: '1.5rem' }}>Kirim Pesan</div>
            {showAlert && (
              <div className="alert success" style={{ padding: '.85rem 1rem', borderRadius: '12px', fontSize: '.875rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '.6rem', background: '#EAF6EA', color: 'var(--green)', border: '1px solid #A8DAA0' }}>
                ✅ Pesan berhasil dikirim! Tim kami akan menghubungi Anda segera.
              </div>
            )}
            <form id="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.85rem' }}>
                <div className="form-field" style={{ marginBottom: '1.1rem' }}>
                  <label style={{ display: 'block', fontSize: '.8rem', fontWeight: 500, color: 'var(--brown)', marginBottom: '.4rem' }}>Nama Depan *</label>
                  <input type="text" value={formData.fname} onChange={(e) => setFormData({ ...formData, fname: e.target.value })} required placeholder="Nama depan" style={{ width: '100%', padding: '.7rem .95rem', border: '1.5px solid var(--border)', borderRadius: '12px', fontFamily: "'DM Sans', sans-serif", fontSize: '.875rem', color: 'var(--text)', background: '#fff', outline: 'none', transition: 'border-color .2s,box-shadow .2s' }} />
                </div>
                <div className="form-field" style={{ marginBottom: '1.1rem' }}>
                  <label style={{ display: 'block', fontSize: '.8rem', fontWeight: 500, color: 'var(--brown)', marginBottom: '.4rem' }}>Nama Belakang</label>
                  <input type="text" value={formData.lname} onChange={(e) => setFormData({ ...formData, lname: e.target.value })} placeholder="Nama belakang" style={{ width: '100%', padding: '.7rem .95rem', border: '1.5px solid var(--border)', borderRadius: '12px', fontFamily: "'DM Sans', sans-serif", fontSize: '.875rem', color: 'var(--text)', background: '#fff', outline: 'none', transition: 'border-color .2s,box-shadow .2s' }} />
                </div>
              </div>
              <div className="form-field" style={{ marginBottom: '1.1rem' }}>
                <label style={{ display: 'block', fontSize: '.8rem', fontWeight: 500, color: 'var(--brown)', marginBottom: '.4rem' }}>Email *</label>
                <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required placeholder="email@contoh.com" style={{ width: '100%', padding: '.7rem .95rem', border: '1.5px solid var(--border)', borderRadius: '12px', fontFamily: "'DM Sans', sans-serif", fontSize: '.875rem', color: 'var(--text)', background: '#fff', outline: 'none', transition: 'border-color .2s,box-shadow .2s' }} />
              </div>
              <div className="form-field" style={{ marginBottom: '1.1rem' }}>
                <label style={{ display: 'block', fontSize: '.8rem', fontWeight: 500, color: 'var(--brown)', marginBottom: '.4rem' }}>No. WhatsApp</label>
                <input type="text" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="08xxxxxxxxxx" style={{ width: '100%', padding: '.7rem .95rem', border: '1.5px solid var(--border)', borderRadius: '12px', fontFamily: "'DM Sans', sans-serif", fontSize: '.875rem', color: 'var(--text)', background: '#fff', outline: 'none', transition: 'border-color .2s,box-shadow .2s' }} />
              </div>
              <div className="form-field" style={{ marginBottom: '1.1rem' }}>
                <label style={{ display: 'block', fontSize: '.8rem', fontWeight: 500, color: 'var(--brown)', marginBottom: '.4rem' }}>Topik *</label>
                <select value={formData.topic} onChange={(e) => setFormData({ ...formData, topic: e.target.value })} required style={{ width: '100%', padding: '.7rem .95rem', border: '1.5px solid var(--border)', borderRadius: '12px', fontFamily: "'DM Sans', sans-serif", fontSize: '.875rem', color: 'var(--text)', background: '#fff', outline: 'none', transition: 'border-color .2s,box-shadow .2s' }}>
                  <option value="">Pilih topik...</option>
                  <option>Pertanyaan produk</option>
                  <option>Kendala pesanan</option>
                  <option>Laporan masalah</option>
                  <option>Saran & masukan</option>
                  <option>Lainnya</option>
                </select>
              </div>
              <div className="form-field" style={{ marginBottom: '1.1rem' }}>
                <label style={{ display: 'block', fontSize: '.8rem', fontWeight: 500, color: 'var(--brown)', marginBottom: '.4rem' }}>Pesan *</label>
                <textarea value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} required placeholder="Ceritakan pertanyaan atau kendala Anda..." rows="4" style={{ width: '100%', padding: '.7rem .95rem', border: '1.5px solid var(--border)', borderRadius: '12px', fontFamily: "'DM Sans', sans-serif", fontSize: '.875rem', color: 'var(--text)', background: '#fff', outline: 'none', transition: 'border-color .2s,box-shadow .2s', resize: 'vertical', minHeight: '120px' }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '.6rem', marginBottom: '1.25rem' }}>
                <input type="checkbox" id="agree" checked={formData.agree} onChange={(e) => setFormData({ ...formData, agree: e.target.checked })} style={{ width: '16px', height: '16px', accentColor: 'var(--green)' }} />
                <label htmlFor="agree" style={{ fontSize: '.8rem', color: 'var(--muted)' }}>Saya menyetujui <a href="#" style={{ color: 'var(--green)' }}>Kebijakan Privasi</a> PanenKu</label>
              </div>
              <button type="submit" className="btn btn-primary btn-block btn-lg" style={{ width: '100%', padding: '.85rem 2rem', borderRadius: '999px', background: 'var(--brown)', color: '#fff', border: 'none', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontSize: '1rem', fontWeight: 500 }}>
                📨 Kirim Pesan
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '5rem 5%', background: 'var(--cream2)' }}>
        <div className="section-label" style={{ fontSize: '.75rem', fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--green2)', marginBottom: '.6rem' }}>FAQ</div>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.8rem,3.5vw,2.6rem)', lineHeight: 1.2, color: 'var(--text)', marginBottom: '.85rem' }}>Pertanyaan yang <em style={{ color: 'var(--green)' }}>Sering Ditanyakan</em></h2>
        <div style={{ maxWidth: '700px', marginTop: '1.5rem' }} id="faq-list">
          {FAQs.map((faq, idx) => (
            <div key={idx} className="faq-item" style={{ borderBottom: '1px solid var(--border)', overflow: 'hidden' }}>
              <div className="faq-q" onClick={() => toggleFaq(idx)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.1rem 0', cursor: 'pointer', fontWeight: 600, fontSize: '.9rem', userSelect: 'none' }}>
                <span>{faq.q}</span>
                <span className={`faq-icon ${openFaq === idx ? 'open' : ''}`} style={{ transition: 'transform .3s', fontSize: '.85rem', transform: openFaq === idx ? 'rotate(180deg)' : 'rotate(0)' }}>▾</span>
              </div>
              <div className={`faq-a ${openFaq === idx ? 'open' : ''}`} style={{ fontSize: '.875rem', color: 'var(--muted)', lineHeight: 1.75, maxHeight: openFaq === idx ? '200px' : '0', overflow: 'hidden', transition: 'max-height .35s ease,padding .35s ease', paddingBottom: openFaq === idx ? '1rem' : '0' }}>
                {faq.a}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Map */}
      <section style={{ padding: '3rem 5%' }}>
        <div style={{ background: 'linear-gradient(135deg, var(--green3) 0%, var(--cream2) 100%)', borderRadius: '24px', height: '280px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem', position: 'relative', overflow: 'hidden' }}>
          <div style={{ fontSize: '4rem' }}>🗺️</div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', fontWeight: 700, color: 'var(--brown)' }}>Kantor PanenKu — Bandung</div>
          <div style={{ fontSize: '.88rem', color: 'var(--muted)' }}>Jl. Pasteur No. 25, Bandung, Jawa Barat</div>
          <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: '.55rem 1.3rem', borderRadius: '999px', background: 'var(--brown)', color: '#fff', border: 'none', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontSize: '.875rem', fontWeight: 500, textDecoration: 'none' }}>
            📍 Buka di Google Maps
          </a>
        </div>
      </section>

      <Footer />
      <style>{`
        .reveal { opacity: 0; transform: translateY(28px); transition: opacity .6s ease, transform .6s ease; }
        .reveal.visible { opacity: 1; transform: none; }
        @media (max-width: 768px) {
          .contact-grid, .social-grid { grid-template-columns: 1fr !important; }
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

export default Contact;