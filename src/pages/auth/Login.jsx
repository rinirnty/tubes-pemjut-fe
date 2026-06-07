import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [currentRole, setCurrentRole] = useState("pembeli");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [alertError, setAlertError] = useState(false);
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  const visuals = { pembeli: "🍚", admin: "⚙️" };
  const titles = {
    pembeli: "Selamat Datang <em>Kembali</em>",
    admin: "Panel <em>Admin</em>",
  };
  const descs = {
    pembeli:
      "Masuk ke akun Anda dan nikmati kemudahan memesan beras, ketan, ubi, dan komoditas pokok pilihan.",
    admin:
      "Masuk ke panel admin untuk mengelola produk, pesanan, dan pengguna platform.",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlertError(false);
    setAlertSuccess(false);

    // Simple validation
    if (!email.includes("@")) {
      setErrorMsg("Masukkan email yang valid");
      setAlertError(true);
      return;
    }
    if (password.length < 8) {
      setErrorMsg("Password minimal 8 karakter");
      setAlertError(true);
      return;
    }

    setLoading(true);

    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500));

    setLoading(false);

    if (email === "salah@test.com") {
      setErrorMsg("Email atau password salah. Coba lagi.");
      setAlertError(true);
      return;
    }

    setSuccessMsg(`Login sebagai ${currentRole} berhasil! Mengarahkan...`);
    setAlertSuccess(true);

    setTimeout(() => {
      const routes = {
        pembeli: "/client/dashboard",
        admin: "/admin/dashboard",
      };
      navigate(routes[currentRole] || "/");
    }, 1200);
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        minHeight: "100vh",
      }}
    >
      {/* KIRI */}
      <div
        style={{
          background:
            "linear-gradient(160deg,var(--brown) 0%,var(--green) 100%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "3rem 4rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          className="deco d1"
          style={{
            position: "absolute",
            borderRadius: "50%",
            background: "rgba(255,255,255,.06)",
            pointerEvents: "none",
            width: "350px",
            height: "350px",
            top: "-80px",
            right: "-80px",
          }}
        ></div>
        <div
          className="deco d2"
          style={{
            position: "absolute",
            borderRadius: "50%",
            background: "rgba(255,255,255,.06)",
            pointerEvents: "none",
            width: "220px",
            height: "220px",
            bottom: "40px",
            left: "-60px",
          }}
        ></div>
        <div
          className="deco d3"
          style={{
            position: "absolute",
            borderRadius: "50%",
            background: "rgba(255,255,255,.06)",
            pointerEvents: "none",
            width: "140px",
            height: "140px",
            bottom: "180px",
            right: "40px",
          }}
        ></div>
        <Link
          to="/"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "1.6rem",
            fontWeight: "700",
            color: "#fff",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: ".5rem",
            marginBottom: "3.5rem",
            position: "relative",
            zIndex: "1",
          }}
        >
          🌾 Panen<span style={{ color: "#F0C55A" }}>Ku</span>
        </Link>
        <div
          style={{
            fontSize: "6rem",
            marginBottom: "2rem",
            position: "relative",
            zIndex: "1",
            animation: "float 5s ease-in-out infinite",
          }}
        >
          {visuals[currentRole]}
        </div>
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "2.2rem",
            color: "#fff",
            lineHeight: "1.25",
            marginBottom: "1rem",
            position: "relative",
            zIndex: "1",
          }}
          dangerouslySetInnerHTML={{ __html: titles[currentRole] }}
        />
        <p
          style={{
            color: "rgba(255,255,255,.72)",
            fontSize: ".95rem",
            lineHeight: "1.8",
            maxWidth: "380px",
            position: "relative",
            zIndex: "1",
            marginBottom: "2.5rem",
          }}
        >
          {descs[currentRole]}
        </p>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: ".6rem",
            position: "relative",
            zIndex: "1",
          }}
        >
          <div
            style={{
              background: "rgba(255,255,255,.12)",
              border: "1px solid rgba(255,255,255,.2)",
              borderRadius: "999px",
              padding: ".35rem .9rem",
              fontSize: ".78rem",
              color: "rgba(255,255,255,.85)",
              backdropFilter: "blur(6px)",
            }}
          >
            🍚 Beras Premium
          </div>
          <div
            style={{
              background: "rgba(255,255,255,.12)",
              border: "1px solid rgba(255,255,255,.2)",
              borderRadius: "999px",
              padding: ".35rem .9rem",
              fontSize: ".78rem",
              color: "rgba(255,255,255,.85)",
              backdropFilter: "blur(6px)",
            }}
          >
            🌾 Beras Ketan
          </div>
          <div
            style={{
              background: "rgba(255,255,255,.12)",
              border: "1px solid rgba(255,255,255,.2)",
              borderRadius: "999px",
              padding: ".35rem .9rem",
              fontSize: ".78rem",
              color: "rgba(255,255,255,.85)",
              backdropFilter: "blur(6px)",
            }}
          >
            🍠 Ubi Jalar
          </div>
          <div
            style={{
              background: "rgba(255,255,255,.12)",
              border: "1px solid rgba(255,255,255,.2)",
              borderRadius: "999px",
              padding: ".35rem .9rem",
              fontSize: ".78rem",
              color: "rgba(255,255,255,.85)",
              backdropFilter: "blur(6px)",
            }}
          >
            📱 Bayar QRIS
          </div>
          <div
            style={{
              background: "rgba(255,255,255,.12)",
              border: "1px solid rgba(255,255,255,.2)",
              borderRadius: "999px",
              padding: ".35rem .9rem",
              fontSize: ".78rem",
              color: "rgba(255,255,255,.85)",
              backdropFilter: "blur(6px)",
            }}
          >
            🚚 Kirim Cepat
          </div>
        </div>
      </div>

      {/* KANAN */}
      <div
        style={{
          background: "var(--cream)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "3rem 4rem",
          overflowY: "auto",
        }}
      >
        <div style={{ width: "100%", maxWidth: "400px" }}>
          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: ".4rem",
              color: "var(--muted)",
              fontSize: ".82rem",
              textDecoration: "none",
              marginBottom: "2rem",
              transition: "color .2s",
            }}
            onMouseEnter={(e) => (e.target.style.color = "var(--brown)")}
            onMouseLeave={(e) => (e.target.style.color = "var(--muted)")}
          >
            ← Kembali ke Beranda
          </Link>

          <div style={{ marginBottom: "2rem" }}>
            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "2rem",
                color: "var(--text)",
                marginBottom: ".4rem",
              }}
            >
              Masuk
            </h1>
            <p style={{ color: "var(--muted)", fontSize: ".9rem" }}>
              Belum punya akun?{" "}
              <Link
                to="/register"
                style={{
                  color: "var(--green)",
                  fontWeight: "500",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.textDecoration = "underline")
                }
                onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
              >
                Daftar sekarang
              </Link>
            </p>
          </div>

          {/* Role Tabs */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: ".5rem",
              marginBottom: "2rem",
              background: "var(--cream2)",
              borderRadius: "14px",
              padding: ".4rem",
            }}
          >
            <button
              style={{
                padding: ".6rem .5rem",
                borderRadius: "10px",
                border: "none",
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: ".82rem",
                fontWeight: "500",
                color:
                  currentRole === "pembeli" ? "var(--brown)" : "var(--muted)",
                background: currentRole === "pembeli" ? "#fff" : "transparent",
                transition: "all .2s",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: ".35rem",
                boxShadow:
                  currentRole === "pembeli"
                    ? "0 2px 10px rgba(92,61,30,.12)"
                    : "none",
              }}
              onClick={() => setCurrentRole("pembeli")}
            >
              🛒 Pembeli
            </button>
            <button
              style={{
                padding: ".6rem .5rem",
                borderRadius: "10px",
                border: "none",
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: ".82rem",
                fontWeight: "500",
                color:
                  currentRole === "admin" ? "var(--brown)" : "var(--muted)",
                background: currentRole === "admin" ? "#fff" : "transparent",
                transition: "all .2s",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: ".35rem",
                boxShadow:
                  currentRole === "admin"
                    ? "0 2px 10px rgba(92,61,30,.12)"
                    : "none",
              }}
              onClick={() => setCurrentRole("admin")}
            >
              ⚙️ Admin
            </button>
          </div>

          {/* Alert */}
          {alertError && (
            <div
              style={{
                padding: ".85rem 1rem",
                borderRadius: "12px",
                fontSize: ".85rem",
                marginBottom: "1.25rem",
                display: "flex",
                alignItems: "center",
                gap: ".6rem",
                background: "#FDECEA",
                color: "var(--error)",
                border: "1px solid #FBBDBD",
              }}
            >
              ⚠️ {errorMsg}
            </div>
          )}
          {alertSuccess && (
            <div
              style={{
                padding: ".85rem 1rem",
                borderRadius: "12px",
                fontSize: ".85rem",
                marginBottom: "1.25rem",
                display: "flex",
                alignItems: "center",
                gap: ".6rem",
                background: "#EAF6EA",
                color: "var(--green)",
                border: "1px solid #A8DAA0",
              }}
            >
              ✅ {successMsg}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div style={{ marginBottom: "1.25rem" }}>
              <label
                htmlFor="email"
                style={{
                  display: "block",
                  fontSize: ".82rem",
                  fontWeight: "500",
                  color: "var(--brown)",
                  marginBottom: ".45rem",
                }}
              >
                Email
              </label>
              <div style={{ position: "relative" }}>
                <span
                  style={{
                    position: "absolute",
                    left: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    fontSize: "1rem",
                    pointerEvents: "none",
                    color: "var(--brown3)",
                  }}
                >
                  ✉️
                </span>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@contoh.com"
                  style={{
                    width: "100%",
                    padding: ".75rem 1rem .75rem 2.75rem",
                    border: "1.5px solid var(--border)",
                    borderRadius: "12px",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: ".9rem",
                    color: "var(--text)",
                    background: "#fff",
                    outline: "none",
                    transition: "border-color .2s,box-shadow .2s",
                  }}
                />
              </div>
            </div>

            {/* Password */}
            <div style={{ marginBottom: "1.25rem" }}>
              <label
                htmlFor="password"
                style={{
                  display: "block",
                  fontSize: ".82rem",
                  fontWeight: "500",
                  color: "var(--brown)",
                  marginBottom: ".45rem",
                }}
              >
                Password
              </label>
              <div style={{ position: "relative" }}>
                <span
                  style={{
                    position: "absolute",
                    left: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    fontSize: "1rem",
                    pointerEvents: "none",
                    color: "var(--brown3)",
                  }}
                >
                  🔒
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimal 8 karakter"
                  style={{
                    width: "100%",
                    padding: ".75rem 2.75rem .75rem 2.75rem",
                    border: "1.5px solid var(--border)",
                    borderRadius: "12px",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: ".9rem",
                    color: "var(--text)",
                    background: "#fff",
                    outline: "none",
                    transition: "border-color .2s,box-shadow .2s",
                  }}
                />
                <button
                  type="button"
                  style={{
                    position: "absolute",
                    right: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: ".9rem",
                    color: "var(--muted)",
                    padding: "0",
                  }}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "🙈" : "👁"}
                </button>
              </div>
            </div>

            {/* Forgot password */}
            <div
              style={{
                textAlign: "right",
                marginTop: "-.5rem",
                marginBottom: "1.25rem",
              }}
            >
              <Link
                to="/forgot-password"
                style={{
                  fontSize: ".8rem",
                  color: "var(--green)",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.textDecoration = "underline")
                }
                onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
              >
                Lupa password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: ".9rem",
                background: "var(--brown)",
                color: "#fff",
                border: "none",
                borderRadius: "12px",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "1rem",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all .25s",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: ".5rem",
                marginBottom: "1rem",
                opacity: loading ? "0.7" : "1",
                pointerEvents: loading ? "none" : "auto",
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.target.style.background = "var(--green)";
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow = "0 8px 24px rgba(74,124,63,.3)";
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.target.style.background = "var(--brown)";
                  e.target.style.transform = "none";
                  e.target.style.boxShadow = "none";
                }
              }}
            >
              {loading ? (
                <div
                  style={{
                    width: "18px",
                    height: "18px",
                    border: "2.5px solid rgba(255,255,255,.3)",
                    borderTopColor: "#fff",
                    borderRadius: "50%",
                    animation: "spin .7s linear infinite",
                  }}
                ></div>
              ) : (
                "🌾 Masuk"
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Keyframes for float animation */}
      <style>{`
        @keyframes float {0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
        @keyframes spin {to{transform:rotate(360deg)}}
        @media (max-width: 768px) {
          div[style*="grid-template-columns"] { grid-template-columns: 1fr !important; }
          div[style*="padding: 3rem 4rem"]:first-child { display: none; }
        }
      `}</style>
    </div>
  );
};

export default Login;
