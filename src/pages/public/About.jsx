import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

function About() {
  const [scrolled, setScrolled] = useState(false);
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

  const values = [
    { icon: '🌾', title: 'Kualitas Tanpa Kompromi', desc: 'Setiap produk melewati seleksi ketat. Beras, ketan, dan ubi yang masuk katalog kami sudah terverifikasi kualitas dan kesegarannya.' },
    { icon: '🤝', title: 'Ekosistem yang Adil', desc: 'Mitra reseller mendapat komisi transparan. Pembeli mendapat harga jelas. Tidak ada biaya tersembunyi, semua tercatat otomatis di sistem.' },
    { icon: '📱', title: 'Teknologi Memudahkan', desc: 'Dari QRIS hingga tracking real-time - teknologi kami dirancang agar proses jual beli bahan pokok semudah beli kopi online.' }
  ];

  const team = [
    { avatar: '👨‍💼', name: 'Budi Santoso', role: 'CEO & Co-Founder', tag: 'Bandung', bg: '#EAF3DE' },
    { avatar: '👩‍💻', name: 'Dewi Rahayu', role: 'CTO & Co-Founder', tag: 'Jakarta', bg: '#FFF0E8' },
    { avatar: '👨‍🌾', name: 'Hendra Wijaya', role: 'Head of Mitra', tag: 'Bandung', bg: '#E0F0FF' },
    { avatar: '👩‍📊', name: 'Siti Aminah', role: 'Head of Operations', tag: 'Surabaya', bg: '#FFF8E0' }
  ];

  const timeline = [
    { year: '2023', title: 'PanenKu Didirikan', desc: 'Berawal dari keresahan sulitnya mendapat beras berkualitas dengan harga wajar, 3 founder membangun prototype pertama PanenKu.' },
    { year: '2024', title: 'Ekspansi Awal', desc: 'Mulai bermitra dengan petani lokal dan reseller di Jawa Barat.' },
    { year: '2025', title: '5.000 Pembeli', desc: 'Mitra tumbuh ke 80+ reseller di Jawa Barat. Platform mencapai 5.000 pembeli aktif dan Rp 1 miliar nilai transaksi.' }
  ];

  return (
    <div className="about-page">
      <Navbar />

      {/* Hero */}
      <div className="hero-about" style={{ minHeight: '45vh', display: 'flex', alignItems: 'center', padding: '8rem 5% 4rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: '.75rem', fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--green2)', marginBottom: '.6rem' }}>Tentang Kami</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', lineHeight: 1.15, marginBottom: '1.25rem' }}>Platform Bahan Pokok <br /><em style={{ color: 'var(--green)' }}>Terpercaya</em> Indonesia</h1>
          <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.8, maxWidth: '520px' }}>PanenKu lahir dari visi sederhana: mempertemukan pembeli, mitra dan bahan pangan pokok berkualitas dalam satu ekosistem digital yang transparan dan efisien.</p>
        </div>
      </div>

      {/* Stats Banner */}
      <section style={{ padding: '0 5% 4rem' }}>
        <div className="stat-banner reveal" ref={(el) => (revealRefs.current[0] = el)} style={{ background: 'linear-gradient(135deg, var(--brown) 0%, var(--green) 100%)', borderRadius: '28px', padding: '3.5rem 5%', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '2rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div><div className="sb-num" style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.2rem', fontWeight: 700, color: '#fff' }}>5rb+</div><div className="sb-label" style={{ fontSize: '.82rem', color: 'rgba(255,255,255,.7)', marginTop: '.3rem' }}>Pembeli Aktif</div></div>
          <div><div className="sb-num" style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.2rem', fontWeight: 700, color: '#fff' }}>80+</div><div className="sb-label" style={{ fontSize: '.82rem', color: 'rgba(255,255,255,.7)', marginTop: '.3rem' }}>Mitra Reseller</div></div>
          <div><div className="sb-num" style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.2rem', fontWeight: 700, color: '#fff' }}>50+</div><div className="sb-label" style={{ fontSize: '.82rem', color: 'rgba(255,255,255,.7)', marginTop: '.3rem' }}>Jenis Produk</div></div>
          <div><div className="sb-num" style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.2rem', fontWeight: 700, color: '#fff' }}>Rp 1M+</div><div className="sb-label" style={{ fontSize: '.82rem', color: 'rgba(255,255,255,.7)', marginTop: '.3rem' }}>Nilai Transaksi</div></div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section style={{ padding: '3rem 5% 5rem', background: 'var(--cream2)' }}>
        <div style={{ maxWidth: '700px' }}>
          <div className="section-label" style={{ fontSize: '.75rem', fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--green2)', marginBottom: '.6rem' }}>Visi & Misi</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.8rem,3.5vw,2.6rem)', lineHeight: 1.2, color: 'var(--text)', marginBottom: '.85rem' }}>Kenapa <em style={{ color: 'var(--green)' }}>PanenKu</em> Ada?</h2>
        </div>
        <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '2rem' }}>
          <div className="card reveal" ref={(el) => (revealRefs.current[1] = el)} style={{ background: '#fff', borderRadius: '20px', border: '1px solid var(--border)', padding: '2rem' }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🎯</div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.15rem', fontWeight: 700, marginBottom: '.75rem' }}>Visi</div>
            <p style={{ fontSize: '.9rem', color: 'var(--muted)', lineHeight: 1.8 }}>Menjadi platform distribusi bahan pangan pokok terbesar dan terpercaya di Indonesia, dengan ekosistem yang menguntungkan semua pihak - dari petani hingga konsumen akhir.</p>
          </div>
          <div className="card reveal" ref={(el) => (revealRefs.current[2] = el)} style={{ background: '#fff', borderRadius: '20px', border: '1px solid var(--border)', padding: '2rem' }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🚀</div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.15rem', fontWeight: 700, marginBottom: '.75rem' }}>Misi</div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '.6rem' }}>
              <li style={{ fontSize: '.875rem', color: 'var(--muted)', display: 'flex', gap: '.5rem', alignItems: 'flex-start' }}><span style={{ color: 'var(--green)', fontWeight: 700, flexShrink: 0 }}>✓</span> Menyediakan bahan pokok berkualitas dengan harga transparan</li>
              <li style={{ fontSize: '.875rem', color: 'var(--muted)', display: 'flex', gap: '.5rem', alignItems: 'flex-start' }}><span style={{ color: 'var(--green)', fontWeight: 700, flexShrink: 0 }}>✓</span> Memudahkan transaksi via teknologi QRIS terkini</li>
              <li style={{ fontSize: '.875rem', color: 'var(--muted)', display: 'flex', gap: '.5rem', alignItems: 'flex-start' }}><span style={{ color: 'var(--green)', fontWeight: 700, flexShrink: 0 }}>✓</span> Menjaga kualitas produk melalui seleksi ketat</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: '5rem 5%' }}>
        <div className="section-label" style={{ fontSize: '.75rem', fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--green2)', marginBottom: '.6rem' }}>Nilai Kami</div>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.8rem,3.5vw,2.6rem)', lineHeight: 1.2, color: 'var(--text)', marginBottom: '.85rem' }}>Yang Membuat Kami <em style={{ color: 'var(--green)' }}>Berbeda</em></h2>
        <p className="section-desc" style={{ color: 'var(--muted)', maxWidth: '520px', lineHeight: 1.8, marginBottom: '3rem', fontSize: '.95rem' }}>Tiga pilar utama yang menjadi landasan setiap keputusan di PanenKu.</p>
        <div className="value-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.5rem' }}>
          {values.map((val, idx) => (
            <div key={idx} className="value-card reveal" ref={(el) => (revealRefs.current[idx + 3] = el)} style={{ background: '#fff', borderRadius: '20px', padding: '2rem', border: '1px solid var(--border)', transition: 'transform .3s,box-shadow .3s', textAlign: 'center' }}>
              <div className="value-icon" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{val.icon}</div>
              <div className="value-title" style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.15rem', marginBottom: '.6rem', color: 'var(--text)' }}>{val.title}</div>
              <div className="value-desc" style={{ fontSize: '.875rem', color: 'var(--muted)', lineHeight: 1.75 }}>{val.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section style={{ padding: '5rem 5%', background: 'var(--cream2)' }}>
        <div className="section-label" style={{ fontSize: '.75rem', fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--green2)', marginBottom: '.6rem' }}>Perjalanan Kami</div>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.8rem,3.5vw,2.6rem)', lineHeight: 1.2, color: 'var(--text)', marginBottom: '.85rem' }}>Dari <em style={{ color: 'var(--green)' }}>Ide</em> ke Kenyataan</h2>
        <div className="timeline-wrap reveal" ref={(el) => (revealRefs.current[6] = el)} style={{ marginTop: '2rem', maxWidth: '700px' }}>
          {timeline.map((item, idx) => (
            <div key={idx} className="tl-item" style={{ display: 'flex', gap: '2rem', padding: '1.5rem 0' }}>
              <div className="tl-year" style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', fontWeight: 700, color: 'var(--brown)', width: '80px', flexShrink: 0, paddingTop: '.2rem' }}>{item.year}</div>
              <div className="tl-line-wrap" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0, width: '20px', flexShrink: 0 }}>
                <div className="tl-dot2" style={{ width: '16px', height: '16px', borderRadius: '50%', background: 'var(--brown)', border: '3px solid var(--cream)', flexShrink: 0, marginTop: '.35rem' }}></div>
                {idx < timeline.length - 1 && <div className="tl-vline" style={{ flex: 1, width: '2px', background: 'var(--cream2)', margin: '.3rem auto' }}></div>}
              </div>
              <div className="tl-content" style={{ flex: 1, paddingBottom: '.5rem' }}>
                <div className="tl-title2" style={{ fontWeight: 700, fontSize: '.95rem', marginBottom: '.3rem' }}>{item.title}</div>
                <div className="tl-desc2" style={{ fontSize: '.875rem', color: 'var(--muted)', lineHeight: 1.7 }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section style={{ padding: '5rem 5%' }}>
        <div className="section-label" style={{ fontSize: '.75rem', fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--green2)', marginBottom: '.6rem' }}>Tim Kami</div>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.8rem,3.5vw,2.6rem)', lineHeight: 1.2, color: 'var(--text)', marginBottom: '.85rem' }}>Orang-orang di Balik <em style={{ color: 'var(--green)' }}>PanenKu</em></h2>
        <div className="team-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1.5rem', marginTop: '2rem' }}>
          {team.map((member, idx) => (
            <div key={idx} className="team-card reveal" ref={(el) => (revealRefs.current[idx + 7] = el)} style={{ background: '#fff', borderRadius: '20px', padding: '1.75rem 1.25rem', border: '1px solid var(--border)', textAlign: 'center', transition: 'transform .3s' }}>
              <div className="team-avatar" style={{ width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', margin: '0 auto 1rem', background: member.bg }}>{member.avatar}</div>
              <div className="team-name" style={{ fontWeight: 700, fontSize: '.95rem', marginBottom: '.25rem' }}>{member.name}</div>
              <div className="team-role" style={{ fontSize: '.78rem', color: 'var(--muted)', marginBottom: '.5rem' }}>{member.role}</div>
              <div className="team-tag" style={{ fontSize: '.7rem', background: 'var(--green3)', color: 'var(--green)', padding: '.2rem .6rem', borderRadius: '999px' }}>{member.tag}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '5rem 5%', textAlign: 'center' }}>
        <div className="section-label" style={{ fontSize: '.75rem', fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--green2)', marginBottom: '.6rem' }}>Bergabung</div>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.8rem,3.5vw,2.6rem)', lineHeight: 1.2, color: 'var(--text)', marginBottom: '.85rem' }}>Siap Jadi Bagian dari <em style={{ color: 'var(--green)' }}>PanenKu</em>?</h2>
        <p style={{ color: 'var(--muted)', maxWidth: '480px', margin: '0 auto 2rem', lineHeight: 1.8 }}>Daftar sebagai pembeli atau mitra dan mulai nikmati ekosistem bahan pokok yang lebih baik.</p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/register" className="btn btn-primary btn-lg" style={{ padding: '.85rem 2rem', borderRadius: '999px', background: 'var(--brown)', color: '#fff', border: 'none', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontSize: '1rem', fontWeight: 500, textDecoration: 'none' }}>🛒 Daftar Pembeli</Link>
        </div>
      </section>

      <Footer />
      <style>{`
        .reveal { opacity: 0; transform: translateY(28px); transition: opacity .6s ease, transform .6s ease; }
        .reveal.visible { opacity: 1; transform: none; }
        @media (max-width: 768px) {
          .value-grid, .team-grid { grid-template-columns: 1fr 1fr !important; }
          .grid-2 { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

export default About;