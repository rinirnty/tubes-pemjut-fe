import { useState } from 'react';
import { Link } from 'react-router-dom';

function Register() {
  const [role, setRole] = useState('pembeli');
  const [form, setForm] = useState({
    fname: '', lname: '', email: '', phone: '', address: '',
    rekening: '', password: '', confirm: '', terms: false
  });
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [pwStrength, setPwStrength] = useState({ width: '0%', bg: 'transparent', label: 'Masukkan password' });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (name === 'password') {
      checkStrength(value);
    }
  };

  const checkStrength = (val) => {
    let score = 0;
    if (val.length >= 8) score++;
    if (/[A-Z]/.test(val)) score++;
    if (/[0-9]/.test(val)) score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;
    
    const levels = [
      { width: '0%', bg: 'transparent', label: '' },
      { width: '25%', bg: '#E74C3C', label: 'Lemah' },
      { width: '50%', bg: '#E67E22', label: 'Cukup' },
      { width: '75%', bg: '#F1C40F', label: 'Baik' },
      { width: '100%', bg: '#27AE60', label: 'Kuat 💪' }
    ];
    setPwStrength({
      ...levels[score],
      label: val ? `Kekuatan: ${levels[score].label}` : 'Masukkan password'
    });
  };

  const validate = () => {
    const newErrors = {};
    if (form.fname.length < 2) newErrors.fname = true;
    if (form.lname.length < 2) newErrors.lname = true;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = true;
    if (!/^08[0-9]{8,11}$/.test(form.phone)) newErrors.phone = true;
    if (form.address.length < 5) newErrors.address = true;
    if (role === 'mitra' && form.rekening.length < 5) newErrors.rekening = true;
    if (form.password.length < 8) newErrors.password = true;
    if (form.confirm !== form.password) newErrors.confirm = true;
    if (!form.terms) newErrors.terms = true;
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setErrors({});
    
    if (!validate()) return;
    
    setLoading(true);
    await new Promise(r => setTimeout(r, 1800));
    setLoading(false);
    setSuccess(true);
    
    setTimeout(() => {
      window.location.href = '/login';
    }, 2500);
  };

  const getVisual = () => role === 'pembeli' ? '🛒' : '🤝';
  const getTitle = () => role === 'pembeli' ? 'Bergabung sebagai <em>Pembeli</em>' : 'Bergabung sebagai <em>Mitra</em>';
  const getDesc = () => role === 'pembeli' 
    ? 'Nikmati kemudahan memesan beras, ketan, ubi, dan komoditas pokok langsung dari mitra terpercaya.'
    : 'Daftarkan toko kamu dan dapatkan komisi otomatis untuk setiap transaksi yang berhasil.';

  return (
    <div className="register-page" style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
      {/* Left Side */}
      <div className="side-left" style={{
        background: 'linear-gradient(160deg, var(--brown) 0%, var(--green) 100%)',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        alignItems: 'flex-start', padding: '3rem 4rem', position: 'relative', overflow: 'hidden'
      }}>
        <div className="deco d1" style={{ position: 'absolute', borderRadius: '50%', background: 'rgba(255,255,255,.06)', width: '350px', height: '350px', top: '-80px', right: '-80px' }}></div>
        <div className="deco d2" style={{ position: 'absolute', borderRadius: '50%', background: 'rgba(255,255,255,.06)', width: '220px', height: '220px', bottom: '40px', left: '-60px' }}></div>
        <Link to="/" className="left-logo" style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.6rem', fontWeight: 700, color: '#fff', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '.5rem', marginBottom: '2.5rem', position: 'relative', zIndex: 1 }}>🌾 Panen<span style={{ color: '#F0C55A' }}>Ku</span></Link>
        <div className="left-visual" style={{ fontSize: '5rem', marginBottom: '1.5rem', position: 'relative', zIndex: 1, animation: 'float 5s ease-in-out infinite' }}>{getVisual()}</div>
        <h2 className="left-title" dangerouslySetInnerHTML={{ __html: getTitle() }} style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.9rem', color: '#fff', lineHeight: 1.25, marginBottom: '.75rem', position: 'relative', zIndex: 1 }}></h2>
        <p className="left-desc" style={{ color: 'rgba(255,255,255,.72)', fontSize: '.9rem', lineHeight: 1.8, maxWidth: '360px', position: 'relative', zIndex: 1, marginBottom: '2rem' }}>{getDesc()}</p>

        <div className="role-benefits" style={{ position: 'relative', zIndex: 1, width: '100%' }}>
          {role === 'pembeli' ? (
            <div id="rb-pembeli">
              <div className="rb-item" style={{ display: 'flex', alignItems: 'center', gap: '.6rem', marginBottom: '.65rem' }}><span className="rb-check" style={{ color: '#F0C55A', fontSize: '.9rem', flexShrink: 0 }}>✓</span><span style={{ fontSize: '.83rem', color: 'rgba(255,255,255,.82)', lineHeight: 1.5 }}>Akses katalog 50+ produk bahan pokok</span></div>
              <div className="rb-item" style={{ display: 'flex', alignItems: 'center', gap: '.6rem', marginBottom: '.65rem' }}><span className="rb-check" style={{ color: '#F0C55A', fontSize: '.9rem', flexShrink: 0 }}>✓</span><span style={{ fontSize: '.83rem', color: 'rgba(255,255,255,.82)', lineHeight: 1.5 }}>Bayar mudah via QRIS</span></div>
              <div className="rb-item" style={{ display: 'flex', alignItems: 'center', gap: '.6rem', marginBottom: '.65rem' }}><span className="rb-check" style={{ color: '#F0C55A', fontSize: '.9rem', flexShrink: 0 }}>✓</span><span style={{ fontSize: '.83rem', color: 'rgba(255,255,255,.82)', lineHeight: 1.5 }}>Lacak pengiriman real-time</span></div>
              <div className="rb-item" style={{ display: 'flex', alignItems: 'center', gap: '.6rem', marginBottom: '.65rem' }}><span className="rb-check" style={{ color: '#F0C55A', fontSize: '.9rem', flexShrink: 0 }}>✓</span><span style={{ fontSize: '.83rem', color: 'rgba(255,255,255,.82)', lineHeight: 1.5 }}>Riwayat & invoice otomatis</span></div>
              <div className="rb-item" style={{ display: 'flex', alignItems: 'center', gap: '.6rem', marginBottom: '.65rem' }}><span className="rb-check" style={{ color: '#F0C55A', fontSize: '.9rem', flexShrink: 0 }}>✓</span><span style={{ fontSize: '.83rem', color: 'rgba(255,255,255,.82)', lineHeight: 1.5 }}>Pesan ulang 1 klik</span></div>
            </div>
          ) : (
            <div className="rb-content" id="rb-mitra">
              <div className="rb-item" style={{ display: 'flex', alignItems: 'center', gap: '.6rem', marginBottom: '.65rem' }}><span className="rb-check" style={{ color: '#F0C55A', fontSize: '.9rem', flexShrink: 0 }}>✓</span><span style={{ fontSize: '.83rem', color: 'rgba(255,255,255,.82)', lineHeight: 1.5 }}>Komisi otomatis per transaksi</span></div>
              <div className="rb-item" style={{ display: 'flex', alignItems: 'center', gap: '.6rem', marginBottom: '.65rem' }}><span className="rb-check" style={{ color: '#F0C55A', fontSize: '.9rem', flexShrink: 0 }}>✓</span><span style={{ fontSize: '.83rem', color: 'rgba(255,255,255,.82)', lineHeight: 1.5 }}>Dashboard penjualan pribadi</span></div>
              <div className="rb-item" style={{ display: 'flex', alignItems: 'center', gap: '.6rem', marginBottom: '.65rem' }}><span className="rb-check" style={{ color: '#F0C55A', fontSize: '.9rem', flexShrink: 0 }}>✓</span><span style={{ fontSize: '.83rem', color: 'rgba(255,255,255,.82)', lineHeight: 1.5 }}>QR pembayaran milik sendiri</span></div>
              <div className="rb-item" style={{ display: 'flex', alignItems: 'center', gap: '.6rem', marginBottom: '.65rem' }}><span className="rb-check" style={{ color: '#F0C55A', fontSize: '.9rem', flexShrink: 0 }}>✓</span><span style={{ fontSize: '.83rem', color: 'rgba(255,255,255,.82)', lineHeight: 1.5 }}>Kelola produk sendiri</span></div>
              <div className="rb-item" style={{ display: 'flex', alignItems: 'center', gap: '.6rem', marginBottom: '.65rem' }}><span className="rb-check" style={{ color: '#F0C55A', fontSize: '.9rem', flexShrink: 0 }}>✓</span><span style={{ fontSize: '.83rem', color: 'rgba(255,255,255,.82)', lineHeight: 1.5 }}>Laporan pendapatan bulanan</span></div>
            </div>
          )}
        </div>
      </div>

      {/* Right Side */}
      <div className="side-right" style={{ background: 'var(--cream)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '2.5rem 3.5rem', overflowY: 'auto' }}>
        <div className="form-wrap" style={{ width: '100%', maxWidth: '420px' }}>
          <Link to="/login" className="back-link" style={{ display: 'flex', alignItems: 'center', gap: '.4rem', color: 'var(--muted)', fontSize: '.82rem', textDecoration: 'none', marginBottom: '1.5rem', transition: 'color .2s' }}>← Sudah punya akun? Masuk</Link>

          <div className="form-header" style={{ marginBottom: '1.5rem' }}>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', color: 'var(--text)', marginBottom: '.3rem' }}>Buat Akun</h1>
            <p style={{ color: 'var(--muted)', fontSize: '.88rem' }}>Daftar gratis sebagai <strong>{role === 'pembeli' ? 'Pembeli' : 'Mitra'}</strong> atau <Link to="/login" style={{ color: 'var(--green)', fontWeight: 500, textDecoration: 'none' }}>masuk</Link> jika sudah punya akun.</p>
          </div>

          {/* Role Tabs */}
          <div className="role-tabs" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '.5rem', marginBottom: '1.5rem', background: 'var(--cream2)', borderRadius: '14px', padding: '.4rem' }}>
            <button className={`rtab ${role === 'pembeli' ? 'active' : ''}`} onClick={() => setRole('pembeli')} style={{ padding: '.6rem .5rem', borderRadius: '10px', border: 'none', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontSize: '.82rem', fontWeight: 500, color: role === 'pembeli' ? 'var(--brown)' : 'var(--muted)', background: role === 'pembeli' ? '#fff' : 'transparent', transition: 'all .2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '.35rem' }}>🛒 Pembeli</button>
            <button className={`rtab ${role === 'mitra' ? 'active' : ''}`} onClick={() => setRole('mitra')} style={{ padding: '.6rem .5rem', borderRadius: '10px', border: 'none', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontSize: '.82rem', fontWeight: 500, color: role === 'mitra' ? 'var(--brown)' : 'var(--muted)', background: role === 'mitra' ? '#fff' : 'transparent', transition: 'all .2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '.35rem' }}>🤝 Mitra</button>
          </div>

          {/* Role Info */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem', padding: '.75rem 1rem', background: 'var(--cream2)', borderRadius: '12px', marginBottom: '1.5rem' }}>
            <span style={{ fontSize: '1.5rem' }}>{getVisual()}</span>
            <div>
              <div style={{ fontWeight: 600, fontSize: '.88rem', color: 'var(--brown)' }}>Daftar sebagai {role === 'pembeli' ? 'Pembeli' : 'Mitra'}</div>
              <div style={{ fontSize: '.75rem', color: 'var(--muted)' }}>{role === 'pembeli' ? 'Beli beras, ketan, dan ubi dari mitra terpercaya' : 'Jual produk kamu dan dapatkan komisi'}</div>
            </div>
          </div>

          {/* Alerts */}
          {success && (
            <div className="alert success" style={{ padding: '.8rem 1rem', borderRadius: '12px', fontSize: '.83rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '.6rem', background: '#EAF6EA', color: 'var(--green)', border: '1px solid #A8DAA0' }}>
              ✅ <span>Akun berhasil dibuat! Silakan masuk dengan akun baru Anda.</span>
            </div>
          )}

          <form id="reg-form" onSubmit={handleSubmit} noValidate>
            {/* Name */}
            <div className="field-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.75rem' }}>
              <div className="field" style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '.8rem', fontWeight: 500, color: 'var(--brown)', marginBottom: '.4rem' }}>Nama Depan</label>
                <div className="input-wrap" style={{ position: 'relative' }}>
                  <span className="icon" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '.95rem', pointerEvents: 'none', color: 'var(--brown3)' }}>👤</span>
                  <input type="text" name="fname" value={form.fname} onChange={handleChange} placeholder="Nama depan" style={{ width: '100%', padding: '.7rem .9rem .7rem 2.5rem', border: `1.5px solid ${errors.fname ? 'var(--error)' : 'var(--border)'}`, borderRadius: '12px', fontFamily: "'DM Sans', sans-serif", fontSize: '.88rem', color: 'var(--text)', background: '#fff', outline: 'none', transition: 'border-color .2s,box-shadow .2s' }} />
                </div>
                <div className={`error-msg ${errors.fname ? 'show' : ''}`} style={{ fontSize: '.72rem', color: 'var(--error)', marginTop: '.3rem', display: errors.fname ? 'flex' : 'none', alignItems: 'center', gap: '.25rem' }}>⚠ Wajib diisi</div>
              </div>
              <div className="field" style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '.8rem', fontWeight: 500, color: 'var(--brown)', marginBottom: '.4rem' }}>Nama Belakang</label>
                <div className="input-wrap" style={{ position: 'relative' }}>
                  <span className="icon" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '.95rem', pointerEvents: 'none', color: 'var(--brown3)' }}>👤</span>
                  <input type="text" name="lname" value={form.lname} onChange={handleChange} placeholder="Nama belakang" style={{ width: '100%', padding: '.7rem .9rem .7rem 2.5rem', border: `1.5px solid ${errors.lname ? 'var(--error)' : 'var(--border)'}`, borderRadius: '12px', fontFamily: "'DM Sans', sans-serif", fontSize: '.88rem', color: 'var(--text)', background: '#fff', outline: 'none', transition: 'border-color .2s,box-shadow .2s' }} />
                </div>
                <div className={`error-msg ${errors.lname ? 'show' : ''}`} style={{ fontSize: '.72rem', color: 'var(--error)', marginTop: '.3rem', display: errors.lname ? 'flex' : 'none', alignItems: 'center', gap: '.25rem' }}>⚠ Wajib diisi</div>
              </div>
            </div>

            {/* Email */}
            <div className="field" style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '.8rem', fontWeight: 500, color: 'var(--brown)', marginBottom: '.4rem' }}>Email</label>
              <div className="input-wrap" style={{ position: 'relative' }}>
                <span className="icon" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '.95rem', pointerEvents: 'none', color: 'var(--brown3)' }}>✉️</span>
                <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="email@contoh.com" style={{ width: '100%', padding: '.7rem .9rem .7rem 2.5rem', border: `1.5px solid ${errors.email ? 'var(--error)' : 'var(--border)'}`, borderRadius: '12px', fontFamily: "'DM Sans', sans-serif", fontSize: '.88rem', color: 'var(--text)', background: '#fff', outline: 'none', transition: 'border-color .2s,box-shadow .2s' }} />
              </div>
              <div className={`error-msg ${errors.email ? 'show' : ''}`} style={{ fontSize: '.72rem', color: 'var(--error)', marginTop: '.3rem', display: errors.email ? 'flex' : 'none', alignItems: 'center', gap: '.25rem' }}>⚠ Masukkan email yang valid</div>
            </div>

            {/* Phone */}
            <div className="field" style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '.8rem', fontWeight: 500, color: 'var(--brown)', marginBottom: '.4rem' }}>Nomor HP</label>
              <div className="input-wrap" style={{ position: 'relative' }}>
                <span className="icon" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '.95rem', pointerEvents: 'none', color: 'var(--brown3)' }}>📱</span>
                <input type="text" name="phone" value={form.phone} onChange={handleChange} placeholder="08xxxxxxxxxx" style={{ width: '100%', padding: '.7rem .9rem .7rem 2.5rem', border: `1.5px solid ${errors.phone ? 'var(--error)' : 'var(--border)'}`, borderRadius: '12px', fontFamily: "'DM Sans', sans-serif", fontSize: '.88rem', color: 'var(--text)', background: '#fff', outline: 'none', transition: 'border-color .2s,box-shadow .2s' }} />
              </div>
              <div className={`error-msg ${errors.phone ? 'show' : ''}`} style={{ fontSize: '.72rem', color: 'var(--error)', marginTop: '.3rem', display: errors.phone ? 'flex' : 'none', alignItems: 'center', gap: '.25rem' }}>⚠ Format: 08xxxxxxxxxx</div>
            </div>

            {/* Address */}
            <div className="field" style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '.8rem', fontWeight: 500, color: 'var(--brown)', marginBottom: '.4rem' }}>Alamat Pengiriman</label>
              <div className="input-wrap" style={{ position: 'relative' }}>
                <span className="icon" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '.95rem', pointerEvents: 'none', color: 'var(--brown3)' }}>📍</span>
                <input type="text" name="address" value={form.address} onChange={handleChange} placeholder="Jl. Contoh No. 1, Kota" style={{ width: '100%', padding: '.7rem .9rem .7rem 2.5rem', border: `1.5px solid ${errors.address ? 'var(--error)' : 'var(--border)'}`, borderRadius: '12px', fontFamily: "'DM Sans', sans-serif", fontSize: '.88rem', color: 'var(--text)', background: '#fff', outline: 'none', transition: 'border-color .2s,box-shadow .2s' }} />
              </div>
              <div className={`error-msg ${errors.address ? 'show' : ''}`} style={{ fontSize: '.72rem', color: 'var(--error)', marginTop: '.3rem', display: errors.address ? 'flex' : 'none', alignItems: 'center', gap: '.25rem' }}>⚠ Alamat wajib diisi</div>
            </div>

            {/* Rekening (only for mitra) */}
            {role === 'mitra' && (
              <div className="field" style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '.8rem', fontWeight: 500, color: 'var(--brown)', marginBottom: '.4rem' }}>No. Rekening</label>
                <div className="input-wrap" style={{ position: 'relative' }}>
                  <span className="icon" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '.95rem', pointerEvents: 'none', color: 'var(--brown3)' }}>💳</span>
                  <input type="text" name="rekening" value={form.rekening} onChange={handleChange} placeholder="No. rekening" style={{ width: '100%', padding: '.7rem .9rem .7rem 2.5rem', border: `1.5px solid ${errors.rekening ? 'var(--error)' : 'var(--border)'}`, borderRadius: '12px', fontFamily: "'DM Sans', sans-serif", fontSize: '.88rem', color: 'var(--text)', background: '#fff', outline: 'none', transition: 'border-color .2s,box-shadow .2s' }} />
                </div>
                <div className={`error-msg ${errors.rekening ? 'show' : ''}`} style={{ fontSize: '.72rem', color: 'var(--error)', marginTop: '.3rem', display: errors.rekening ? 'flex' : 'none', alignItems: 'center', gap: '.25rem' }}>⚠ Wajib diisi</div>
              </div>
            )}

            {/* Password */}
            <div className="field" style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '.8rem', fontWeight: 500, color: 'var(--brown)', marginBottom: '.4rem' }}>Password</label>
              <div className="input-wrap" style={{ position: 'relative' }}>
                <span className="icon" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '.95rem', pointerEvents: 'none', color: 'var(--brown3)' }}>🔒</span>
                <input type={showPw ? 'text' : 'password'} name="password" value={form.password} onChange={handleChange} placeholder="Minimal 8 karakter" style={{ width: '100%', padding: '.7rem .9rem .7rem 2.5rem', border: `1.5px solid ${errors.password ? 'var(--error)' : 'var(--border)'}`, borderRadius: '12px', fontFamily: "'DM Sans', sans-serif", fontSize: '.88rem', color: 'var(--text)', background: '#fff', outline: 'none', transition: 'border-color .2s,box-shadow .2s' }} />
                <button type="button" className="toggle-pw" onClick={() => setShowPw(!showPw)} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '.88rem', color: 'var(--muted)', padding: 0 }}>{showPw ? '🙈' : '👁'}</button>
              </div>
              <div className={`error-msg ${errors.password ? 'show' : ''}`} style={{ fontSize: '.72rem', color: 'var(--error)', marginTop: '.3rem', display: errors.password ? 'flex' : 'none', alignItems: 'center', gap: '.25rem' }}>⚠ Password minimal 8 karakter</div>
              <div className="pw-strength" style={{ marginTop: '.4rem' }}>
                <div className="pw-bar" style={{ height: '3px', borderRadius: '99px', background: 'var(--cream2)', overflow: 'hidden', marginBottom: '.25rem' }}>
                  <div className="pw-fill" style={{ height: '100%', borderRadius: '99px', width: pwStrength.width, background: pwStrength.bg, transition: 'width .3s,background .3s' }}></div>
                </div>
                <div className="pw-label" style={{ fontSize: '.7rem', color: 'var(--muted)' }}>{pwStrength.label}</div>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="field" style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '.8rem', fontWeight: 500, color: 'var(--brown)', marginBottom: '.4rem' }}>Konfirmasi Password</label>
              <div className="input-wrap" style={{ position: 'relative' }}>
                <span className="icon" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '.95rem', pointerEvents: 'none', color: 'var(--brown3)' }}>🔒</span>
                <input type={showConfirm ? 'text' : 'password'} name="confirm" value={form.confirm} onChange={handleChange} placeholder="Ulangi password" style={{ width: '100%', padding: '.7rem .9rem .7rem 2.5rem', border: `1.5px solid ${errors.confirm ? 'var(--error)' : 'var(--border)'}`, borderRadius: '12px', fontFamily: "'DM Sans', sans-serif", fontSize: '.88rem', color: 'var(--text)', background: '#fff', outline: 'none', transition: 'border-color .2s,box-shadow .2s' }} />
                <button type="button" className="toggle-pw" onClick={() => setShowConfirm(!showConfirm)} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '.88rem', color: 'var(--muted)', padding: 0 }}>{showConfirm ? '🙈' : '👁'}</button>
              </div>
              <div className={`error-msg ${errors.confirm ? 'show' : ''}`} style={{ fontSize: '.72rem', color: 'var(--error)', marginTop: '.3rem', display: errors.confirm ? 'flex' : 'none', alignItems: 'center', gap: '.25rem' }}>⚠ Password tidak cocok</div>
            </div>

            {/* Terms */}
            <div className="terms-wrap" style={{ display: 'flex', alignItems: 'flex-start', gap: '.6rem', marginBottom: '1.25rem' }}>
              <input type="checkbox" name="terms" checked={form.terms} onChange={handleChange} id="terms" style={{ width: '16px', height: '16px', marginTop: '2px', accentColor: 'var(--green)', flexShrink: 0, padding: 0 }} />
              <label htmlFor="terms" style={{ fontSize: '.8rem', color: 'var(--muted)', margin: 0, fontWeight: 400 }}>Saya menyetujui <a href="#" style={{ color: 'var(--green)', textDecoration: 'none' }}>Syarat & Ketentuan</a> dan <a href="#" style={{ color: 'var(--green)', textDecoration: 'none' }}>Kebijakan Privasi</a> PanenKu</label>
            </div>
            <div className={`error-msg terms-err ${errors.terms ? 'show' : ''}`} style={{ fontSize: '.72rem', color: 'var(--error)', marginBottom: '.75rem', display: errors.terms ? 'flex' : 'none', alignItems: 'center', gap: '.25rem' }}>⚠ Harap setujui syarat & ketentuan</div>

            <button type="submit" className={`btn-submit ${loading ? 'loading' : ''}`} style={{ width: '100%', padding: '.85rem', background: 'var(--brown)', color: '#fff', border: 'none', borderRadius: '12px', fontFamily: "'DM Sans', sans-serif", fontSize: '.95rem', fontWeight: 600, cursor: 'pointer', transition: 'all .25s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '.5rem', marginBottom: '1rem' }}>
              <span className="btn-text" style={{ display: loading ? 'none' : 'inline' }}>✅ Buat Akun</span>
              <div className="spinner" style={{ width: '17px', height: '17px', border: '2.5px solid rgba(255,255,255,.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin .7s linear infinite', display: loading ? 'block' : 'none' }}></div>
            </button>

            {/* Divider */}
            <div className="divider" style={{ display: 'flex', alignItems: 'center', gap: '.75rem', marginBottom: '1rem' }}>
              <div style={{ flex: 1, height: '1px', background: 'var(--border)' }}></div>
              <span style={{ fontSize: '.72rem', color: 'var(--muted)', whiteSpace: 'nowrap' }}>atau daftar dengan</span>
              <div style={{ flex: 1, height: '1px', background: 'var(--border)' }}></div>
            </div>

            <button type="button" className="btn-oauth" style={{ width: '100%', padding: '.7rem', background: '#fff', border: '1.5px solid var(--border)', borderRadius: '12px', fontFamily: "'DM Sans', sans-serif", fontSize: '.88rem', fontWeight: 500, color: 'var(--text)', cursor: 'pointer', transition: 'all .2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '.6rem' }}>🌐 Daftar dengan Google</button>
          </form>
        </div>
      </div>
      
      <style>{`
        @keyframes float {
          0%,100% { transform: translateY(0) }
          50% { transform: translateY(-10px) }
        }
        @keyframes spin {
          to { transform: rotate(360deg) }
        }
        @media (max-width: 768px) {
          .register-page {
            grid-template-columns: 1fr !important;
          }
          .side-left {
            display: none !important;
          }
          .side-right {
            padding: 2rem 1.5rem !important;
          }
        }
      `}</style>
    </div>
  );
}

export default Register;