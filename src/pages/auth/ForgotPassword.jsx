import { useState } from 'react';
import { Link } from 'react-router-dom';

function ForgotPassword() {
  const [currentStep, setCurrentStep] = useState(1); // 1: email, 2: otp, 3: new password
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [success, setSuccess] = useState(false);

  // Countdown timer
  useState(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const validateEmail = () => {
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    setErrors({ email: !emailValid });
    return emailValid;
  };

  const validateOtp = () => {
    const otpValid = otp.every(digit => digit !== '');
    setErrors({ otp: !otpValid });
    return otpValid;
  };

  const validatePassword = () => {
    const newErrors = {};
    if (password.length < 8) newErrors.password = true;
    if (confirmPassword !== password) newErrors.confirm = true;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleStep1Submit = async (e) => {
    e.preventDefault();
    if (!validateEmail()) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    setCurrentStep(2);
    setCountdown(60);
  };

  const handleStep2Submit = async (e) => {
    e.preventDefault();
    if (!validateOtp()) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    if (otp.join('') === '000000') {
      setErrors({ otp: true });
      return;
    }
    setCurrentStep(3);
  };

  const handleStep3Submit = async (e) => {
    e.preventDefault();
    if (!validatePassword()) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    setSuccess(true);
  };

  const handleOtpChange = (idx, value) => {
    if (/^[0-9]$/.test(value) || value === '') {
      const newOtp = [...otp];
      newOtp[idx] = value;
      setOtp(newOtp);
      // Auto focus next
      if (value && idx < 5) {
        document.getElementById(`otp-${idx + 1}`).focus();
      }
    }
  };

  const handleOtpKeyDown = (idx, e) => {
    if (e.key === 'Backspace' && !otp[idx] && idx > 0) {
      document.getElementById(`otp-${idx - 1}`).focus();
    }
  };

  const resendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    setCountdown(60);
  };

  const checkStrength = (val) => {
    let score = 0;
    if (val.length >= 8) score++;
    if (/[A-Z]/.test(val)) score++;
    if (/[0-9]/.test(val)) score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;
    return score;
  };

  const strengthScore = checkStrength(password);
  const strengthWidths = ['0%', '25%', '50%', '75%', '100%'];
  const strengthColors = ['transparent', '#E74C3C', '#E67E22', '#F1C40F', '#27AE60'];
  const strengthLabels = ['', 'Lemah', 'Cukup', 'Baik', 'Kuat 💪'];

  return (
    <div className="forgot-password-page" style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
      {/* Left Side */}
      <div className="side-left" style={{ background: 'linear-gradient(160deg, var(--green) 0%, var(--brown) 100%)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', padding: '3rem 4rem', position: 'relative', overflow: 'hidden' }}>
        <div className="deco d1" style={{ position: 'absolute', borderRadius: '50%', background: 'rgba(255,255,255,.06)', width: '350px', height: '350px', top: '-80px', right: '-80px' }}></div>
        <div className="deco d2" style={{ position: 'absolute', borderRadius: '50%', background: 'rgba(255,255,255,.06)', width: '220px', height: '220px', bottom: '40px', left: '-60px' }}></div>
        <div className="deco d3" style={{ position: 'absolute', borderRadius: '50%', background: 'rgba(255,255,255,.06)', width: '140px', height: '140px', bottom: '180px', right: '40px' }}></div>
        <Link to="/" className="left-logo" style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.6rem', fontWeight: 700, color: '#fff', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '.5rem', marginBottom: '3.5rem', position: 'relative', zIndex: 1 }}>🌾 Panen<span style={{ color: '#F0C55A' }}>Ku</span></Link>
        <div className="left-visual" style={{ fontSize: '6rem', marginBottom: '2rem', position: 'relative', zIndex: 1, animation: 'float 5s ease-in-out infinite' }}>🔑</div>
        <h2 className="left-title" style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', color: '#fff', lineHeight: 1.25, marginBottom: '1rem', position: 'relative', zIndex: 1 }}>Reset Password <em style={{ color: '#F0C55A' }}>Mudah</em></h2>
        <p className="left-desc" style={{ color: 'rgba(255,255,255,.72)', fontSize: '.95rem', lineHeight: 1.8, maxWidth: '380px', position: 'relative', zIndex: 1, marginBottom: '2rem' }}>Ikuti 3 langkah sederhana untuk mengatur ulang password akun PanenKu Anda.</p>
        <div className="steps-left" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative', zIndex: 1 }}>
          <div className="step-l" style={{ display: 'flex', alignItems: 'flex-start', gap: '.75rem' }}>
            <div className="step-l-num" style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(255,255,255,.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.75rem', fontWeight: 700, color: '#fff', flexShrink: 0 }}>1</div>
            <div className="step-l-text" style={{ fontSize: '.85rem', color: 'rgba(255,255,255,.8)', lineHeight: 1.6 }}><strong style={{ color: '#fff' }}>Masukkan Email</strong><br />Kami kirim kode OTP ke email kamu</div>
          </div>
          <div className="step-l" style={{ display: 'flex', alignItems: 'flex-start', gap: '.75rem' }}>
            <div className="step-l-num" style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(255,255,255,.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.75rem', fontWeight: 700, color: '#fff', flexShrink: 0 }}>2</div>
            <div className="step-l-text" style={{ fontSize: '.85rem', color: 'rgba(255,255,255,.8)', lineHeight: 1.6 }}><strong style={{ color: '#fff' }}>Verifikasi OTP</strong><br />Masukkan kode 6 digit dari email</div>
          </div>
          <div className="step-l" style={{ display: 'flex', alignItems: 'flex-start', gap: '.75rem' }}>
            <div className="step-l-num" style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(255,255,255,.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.75rem', fontWeight: 700, color: '#fff', flexShrink: 0 }}>3</div>
            <div className="step-l-text" style={{ fontSize: '.85rem', color: 'rgba(255,255,255,.8)', lineHeight: 1.6 }}><strong style={{ color: '#fff' }}>Buat Password Baru</strong><br />Atur password yang kuat dan aman</div>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="side-right" style={{ background: 'var(--cream)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '3rem 4rem', overflowY: 'auto' }}>
        <div className="form-wrap" style={{ width: '100%', maxWidth: '400px' }}>
          <Link to="/login" className="back-link" style={{ display: 'flex', alignItems: 'center', gap: '.4rem', color: 'var(--muted)', fontSize: '.82rem', textDecoration: 'none', marginBottom: '2rem', transition: 'color .2s' }}>← Kembali ke Login</Link>

          {/* Step Indicator */}
          {!success && (
            <div className="step-indicator" style={{ display: 'flex', alignItems: 'center', gap: '.5rem', marginBottom: '2rem' }}>
              <div className="si-item" style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                <div className={`si-dot ${currentStep > 1 ? 'done' : ''} ${currentStep === 1 ? 'active' : ''}`} style={{ width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.75rem', fontWeight: 700, background: currentStep > 1 ? 'var(--green)' : currentStep === 1 ? 'var(--brown)' : 'var(--cream2)', color: currentStep > 1 || currentStep === 1 ? '#fff' : 'var(--muted)' }}>
                  {currentStep > 1 ? '✓' : '1'}
                </div>
                <span className={`si-label ${currentStep === 1 ? 'active' : ''}`} style={{ fontSize: '.75rem', color: currentStep === 1 ? 'var(--brown)' : 'var(--muted)', fontWeight: currentStep === 1 ? 600 : 400 }}>Email</span>
              </div>
              <div className={`si-line ${currentStep > 1 ? 'done' : ''}`} style={{ flex: 1, height: '2px', background: currentStep > 1 ? 'var(--green)' : 'var(--cream2)', borderRadius: '99px' }}></div>
              <div className="si-item" style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                <div className={`si-dot ${currentStep > 2 ? 'done' : ''} ${currentStep === 2 ? 'active' : ''}`} style={{ width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.75rem', fontWeight: 700, background: currentStep > 2 ? 'var(--green)' : currentStep === 2 ? 'var(--brown)' : 'var(--cream2)', color: currentStep > 2 || currentStep === 2 ? '#fff' : 'var(--muted)' }}>
                  {currentStep > 2 ? '✓' : '2'}
                </div>
                <span className={`si-label ${currentStep === 2 ? 'active' : ''}`} style={{ fontSize: '.75rem', color: currentStep === 2 ? 'var(--brown)' : 'var(--muted)', fontWeight: currentStep === 2 ? 600 : 400 }}>OTP</span>
              </div>
              <div className={`si-line ${currentStep > 2 ? 'done' : ''}`} style={{ flex: 1, height: '2px', background: currentStep > 2 ? 'var(--green)' : 'var(--cream2)', borderRadius: '99px' }}></div>
              <div className="si-item" style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                <div className={`si-dot ${currentStep === 3 ? 'active' : ''}`} style={{ width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.75rem', fontWeight: 700, background: currentStep === 3 ? 'var(--brown)' : 'var(--cream2)', color: currentStep === 3 ? '#fff' : 'var(--muted)' }}>3</div>
                <span className={`si-label ${currentStep === 3 ? 'active' : ''}`} style={{ fontSize: '.75rem', color: currentStep === 3 ? 'var(--brown)' : 'var(--muted)', fontWeight: currentStep === 3 ? 600 : 400 }}>Password Baru</span>
              </div>
            </div>
          )}

          {success ? (
            // Success State
            <div className="success-state" style={{ textAlign: 'center', display: 'block' }}>
              <div className="s-icon" style={{ fontSize: '4rem', marginBottom: '1rem', animation: 'pop .5s ease' }}>🎉</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.6rem', color: 'var(--text)', marginBottom: '.5rem' }}>Password Berhasil Diubah!</h2>
              <p style={{ color: 'var(--muted)', fontSize: '.9rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>Password akun PanenKu Anda berhasil diperbarui. Silakan masuk dengan password baru.</p>
              <Link to="/login" className="btn-submit" style={{ width: '100%', padding: '.9rem', background: 'var(--brown)', color: '#fff', border: 'none', borderRadius: '12px', fontFamily: "'DM Sans', sans-serif", fontSize: '1rem', fontWeight: 600, cursor: 'pointer', transition: 'all .25s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '.5rem', textDecoration: 'none' }}>
                🌾 Masuk Sekarang
              </Link>
            </div>
          ) : (
            <>
              {/* Step 1: Email */}
              {currentStep === 1 && (
                <div className="step-panel active" style={{ display: 'block' }}>
                  <div className="form-header" style={{ marginBottom: '2rem' }}>
                    <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', color: 'var(--text)', marginBottom: '.4rem' }}>Lupa Password?</h1>
                    <p style={{ color: 'var(--muted)', fontSize: '.9rem', lineHeight: 1.6 }}>Masukkan email yang terdaftar. Kami akan kirim kode OTP untuk verifikasi.</p>
                  </div>
                  <form onSubmit={handleStep1Submit} noValidate>
                    <div className="field" style={{ marginBottom: '1.25rem' }}>
                      <label style={{ display: 'block', fontSize: '.82rem', fontWeight: 500, color: 'var(--brown)', marginBottom: '.45rem' }}>Email Terdaftar</label>
                      <div className="input-wrap" style={{ position: 'relative' }}>
                        <span className="icon" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', fontSize: '1rem', pointerEvents: 'none', color: 'var(--brown3)' }}>✉️</span>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@contoh.com" style={{ width: '100%', padding: '.75rem 1rem .75rem 2.75rem', border: `1.5px solid ${errors.email ? 'var(--error)' : 'var(--border)'}`, borderRadius: '12px', fontFamily: "'DM Sans', sans-serif", fontSize: '.9rem', color: 'var(--text)', background: '#fff', outline: 'none', transition: 'border-color .2s,box-shadow .2s' }} />
                      </div>
                      {errors.email && (
                        <div className="error-msg" style={{ fontSize: '.75rem', color: 'var(--error)', marginTop: '.35rem', display: 'flex', alignItems: 'center', gap: '.3rem' }}>⚠ Masukkan email yang valid</div>
                      )}
                    </div>
                    <button type="submit" className={`btn-submit ${loading ? 'loading' : ''}`} disabled={loading} style={{ width: '100%', padding: '.9rem', background: 'var(--brown)', color: '#fff', border: 'none', borderRadius: '12px', fontFamily: "'DM Sans', sans-serif", fontSize: '1rem', fontWeight: 600, cursor: 'pointer', transition: 'all .25s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '.5rem' }}>
                      <span className="btn-text" style={{ display: loading ? 'none' : 'inline' }}>📨 Kirim Kode OTP</span>
                      <div className="spinner" style={{ width: '18px', height: '18px', border: '2.5px solid rgba(255,255,255,.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin .7s linear infinite', display: loading ? 'block' : 'none' }}></div>
                    </button>
                  </form>
                </div>
              )}

              {/* Step 2: OTP */}
              {currentStep === 2 && (
                <div className="step-panel active" style={{ display: 'block' }}>
                  <div className="form-header" style={{ marginBottom: '2rem' }}>
                    <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', color: 'var(--text)', marginBottom: '.4rem' }}>Masukkan OTP</h1>
                    <p style={{ color: 'var(--muted)', fontSize: '.9rem', lineHeight: 1.6 }}>Kode 6 digit telah dikirim ke <strong>{email}</strong>. Berlaku 5 menit.</p>
                  </div>
                  <form onSubmit={handleStep2Submit} noValidate>
                    <div className="otp-wrap" style={{ display: 'flex', gap: '.75rem', justifyContent: 'center', marginBottom: '.5rem' }}>
                      {otp.map((digit, idx) => (
                        <input
                          key={idx}
                          id={`otp-${idx}`}
                          type="text"
                          maxLength="1"
                          value={digit}
                          onChange={(e) => handleOtpChange(idx, e.target.value)}
                          onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                          className={`otp-input ${errors.otp ? 'error-field' : ''}`}
                          style={{ width: '52px', height: '56px', textAlign: 'center', fontSize: '1.4rem', fontWeight: 700, border: `1.5px solid ${errors.otp ? 'var(--error)' : 'var(--border)'}`, borderRadius: '12px', fontFamily: "'DM Sans', sans-serif", color: 'var(--text)', background: '#fff', outline: 'none', transition: 'border-color .2s,box-shadow .2s' }}
                        />
                      ))}
                    </div>
                    {errors.otp && (
                      <div className="error-msg" style={{ fontSize: '.75rem', color: 'var(--error)', marginTop: '.35rem', display: 'flex', alignItems: 'center', gap: '.3rem', justifyContent: 'center', marginBottom: '.75rem' }}>⚠ Kode OTP tidak valid</div>
                    )}
                    <div className="resend-wrap" style={{ textAlign: 'center', fontSize: '.82rem', color: 'var(--muted)', marginBottom: '1.25rem' }}>
                      Tidak dapat kode?{' '}
                      {countdown > 0 ? (
                        <span>Kirim ulang dalam <span id="countdown" style={{ fontWeight: 600, color: 'var(--brown)' }}>{countdown}</span>s</span>
                      ) : (
                        <a href="#" onClick={resendOtp} style={{ color: 'var(--green)', textDecoration: 'none', fontWeight: 500 }}>Kirim ulang</a>
                      )}
                    </div>
                    <button type="submit" className={`btn-submit ${loading ? 'loading' : ''}`} disabled={loading} style={{ width: '100%', padding: '.9rem', background: 'var(--brown)', color: '#fff', border: 'none', borderRadius: '12px', fontFamily: "'DM Sans', sans-serif", fontSize: '1rem', fontWeight: 600, cursor: 'pointer', transition: 'all .25s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '.5rem', marginBottom: '1rem' }}>
                      <span className="btn-text" style={{ display: loading ? 'none' : 'inline' }}>✅ Verifikasi OTP</span>
                      <div className="spinner" style={{ width: '18px', height: '18px', border: '2.5px solid rgba(255,255,255,.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin .7s linear infinite', display: loading ? 'block' : 'none' }}></div>
                    </button>
                    <button type="button" onClick={() => setCurrentStep(1)} style={{ width: '100%', padding: '.75rem', background: 'transparent', border: '1.5px solid var(--border)', borderRadius: '12px', fontFamily: "'DM Sans', sans-serif", fontSize: '.875rem', color: 'var(--muted)', cursor: 'pointer' }}>← Ganti Email</button>
                  </form>
                </div>
              )}

              {/* Step 3: New Password */}
              {currentStep === 3 && (
                <div className="step-panel active" style={{ display: 'block' }}>
                  <div className="form-header" style={{ marginBottom: '2rem' }}>
                    <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', color: 'var(--text)', marginBottom: '.4rem' }}>Password Baru</h1>
                    <p style={{ color: 'var(--muted)', fontSize: '.9rem', lineHeight: 1.6 }}>Buat password baru yang kuat untuk akun PanenKu Anda.</p>
                  </div>
                  <form onSubmit={handleStep3Submit} noValidate>
                    <div className="field" style={{ marginBottom: '1.25rem' }}>
                      <label style={{ display: 'block', fontSize: '.82rem', fontWeight: 500, color: 'var(--brown)', marginBottom: '.45rem' }}>Password Baru</label>
                      <div className="input-wrap" style={{ position: 'relative' }}>
                        <span className="icon" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', fontSize: '1rem', pointerEvents: 'none', color: 'var(--brown3)' }}>🔒</span>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Minimal 8 karakter"
                          style={{ width: '100%', padding: '.75rem 1rem .75rem 2.75rem', border: `1.5px solid ${errors.password ? 'var(--error)' : 'var(--border)'}`, borderRadius: '12px', fontFamily: "'DM Sans', sans-serif", fontSize: '.9rem', color: 'var(--text)', background: '#fff', outline: 'none', transition: 'border-color .2s,box-shadow .2s' }}
                        />
                        <button type="button" className="toggle-pw" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '.9rem', color: 'var(--muted)', padding: 0 }}>
                          {showPassword ? '🙈' : '👁'}
                        </button>
                      </div>
                      {errors.password && (
                        <div className="error-msg" style={{ fontSize: '.75rem', color: 'var(--error)', marginTop: '.35rem', display: 'flex', alignItems: 'center', gap: '.3rem' }}>⚠ Password minimal 8 karakter</div>
                      )}
                      <div className="pw-strength" style={{ marginTop: '.5rem' }}>
                        <div className="pw-bar" style={{ height: '4px', borderRadius: '99px', background: 'var(--cream2)', overflow: 'hidden', marginBottom: '.3rem' }}>
                          <div className="pw-fill" id="pw-fill" style={{ height: '100%', borderRadius: '99px', width: strengthWidths[strengthScore], background: strengthColors[strengthScore], transition: 'width .3s,background .3s' }}></div>
                        </div>
                        <div className="pw-label" id="pw-label" style={{ fontSize: '.72rem', color: 'var(--muted)' }}>{password ? `Kekuatan: ${strengthLabels[strengthScore]}` : 'Masukkan password'}</div>
                      </div>
                    </div>
                    <div className="field" style={{ marginBottom: '1.25rem' }}>
                      <label style={{ display: 'block', fontSize: '.82rem', fontWeight: 500, color: 'var(--brown)', marginBottom: '.45rem' }}>Konfirmasi Password</label>
                      <div className="input-wrap" style={{ position: 'relative' }}>
                        <span className="icon" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', fontSize: '1rem', pointerEvents: 'none', color: 'var(--brown3)' }}>🔒</span>
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Ulangi password baru"
                          style={{ width: '100%', padding: '.75rem 1rem .75rem 2.75rem', border: `1.5px solid ${errors.confirm ? 'var(--error)' : 'var(--border)'}`, borderRadius: '12px', fontFamily: "'DM Sans', sans-serif", fontSize: '.9rem', color: 'var(--text)', background: '#fff', outline: 'none', transition: 'border-color .2s,box-shadow .2s' }}
                        />
                        <button type="button" className="toggle-pw" onClick={() => setShowConfirmPassword(!showConfirmPassword)} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '.9rem', color: 'var(--muted)', padding: 0 }}>
                          {showConfirmPassword ? '🙈' : '👁'}
                        </button>
                      </div>
                      {errors.confirm && (
                        <div className="error-msg" style={{ fontSize: '.75rem', color: 'var(--error)', marginTop: '.35rem', display: 'flex', alignItems: 'center', gap: '.3rem' }}>⚠ Password tidak cocok</div>
                      )}
                    </div>
                    <button type="submit" className={`btn-submit ${loading ? 'loading' : ''}`} disabled={loading} style={{ width: '100%', padding: '.9rem', background: 'var(--brown)', color: '#fff', border: 'none', borderRadius: '12px', fontFamily: "'DM Sans', sans-serif", fontSize: '1rem', fontWeight: 600, cursor: 'pointer', transition: 'all .25s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '.5rem' }}>
                      <span className="btn-text" style={{ display: loading ? 'none' : 'inline' }}>🔐 Simpan Password Baru</span>
                      <div className="spinner" style={{ width: '18px', height: '18px', border: '2.5px solid rgba(255,255,255,.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin .7s linear infinite', display: loading ? 'block' : 'none' }}></div>
                    </button>
                  </form>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <style>{`
        @keyframes float {
          0%,100% { transform: translateY(0) }
          50% { transform: translateY(-12px) }
        }
        @keyframes spin {
          to { transform: rotate(360deg) }
        }
        @keyframes pop {
          0% { transform: scale(0) }
          80% { transform: scale(1.1) }
          100% { transform: scale(1) }
        }
        @media (max-width: 768px) {
          .forgot-password-page {
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

export default ForgotPassword;