import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function TopbarClient() {
  const location = useLocation();
  const [cartCount, setCartCount] = useState(0);

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("panenku_cart") || "[]");
      const count = cart.reduce((total, item) => total + (item.qty || 0), 0);
      setCartCount(count);
    };

    updateCartCount();
    window.addEventListener("storage", updateCartCount);
    window.addEventListener("panenku-cart-updated", updateCartCount);
    return () => {
      window.removeEventListener("storage", updateCartCount);
      window.removeEventListener("panenku-cart-updated", updateCartCount);
    };
  }, []);

  return (
    <div
      style={{
        height: "64px",
        background: "var(--brown)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 2rem",
        position: "sticky",
        top: 0,
        zIndex: 100,
        boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
        <Link
          to="/"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "1.3rem",
            fontWeight: 700,
            color: "#fff",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: ".4rem",
          }}
        >
          🌾 Panen<span style={{ color: "var(--gold2)" }}>Ku</span>
        </Link>

        <nav style={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
          <Link
            to="/client/dashboard"
            className={
              isActive("/client/dashboard")
                ? "top-nav-item active"
                : "top-nav-item"
            }
          >
            Dashboard
          </Link>
          <Link
            to="/client/order"
            className={
              isActive("/client/order") ? "top-nav-item active" : "top-nav-item"
            }
          >
            Pesan Produk
          </Link>
          <Link
            to="/client/cart"
            className={
              isActive("/client/cart") ? "top-nav-item active" : "top-nav-item"
            }
          >
            Keranjang{" "}
            {cartCount > 0 && (
              <span
                style={{
                  marginLeft: ".5rem",
                  background: "var(--red)",
                  color: "#fff",
                  fontSize: ".65rem",
                  fontWeight: 700,
                  padding: ".15rem .45rem",
                  borderRadius: "999px",
                }}
              >
                {cartCount}
              </span>
            )}
          </Link>
          <Link
            to="/client/history"
            className={
              isActive("/client/history")
                ? "top-nav-item active"
                : "top-nav-item"
            }
          >
            Riwayat Pesanan
          </Link>
          <Link
            to="/client/tracking"
            className={
              isActive("/client/tracking")
                ? "top-nav-item active"
                : "top-nav-item"
            }
          >
            Lacak Pengiriman
          </Link>
          <Link
            to="/client/profile"
            className={
              isActive("/client/profile")
                ? "top-nav-item active"
                : "top-nav-item"
            }
          >
            Profil
          </Link>
        </nav>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: ".75rem" }}>
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: "var(--green)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1rem",
            }}
          >
            👩
          </div>
          <div style={{ color: "#fff" }}>
            <div style={{ fontSize: ".82rem", fontWeight: 600 }}>Ibu Ratna</div>
            <div style={{ fontSize: ".7rem", color: "rgba(255,255,255,.6)" }}>
              ratna@email.com
            </div>
          </div>
        </div>
        <button
          style={{
            background: "none",
            border: "none",
            color: "rgba(255,255,255,.65)",
            cursor: "pointer",
            fontSize: "1rem",
            transition: "color .2s",
          }}
          onClick={() => (window.location.href = "/login")}
        >
          🚪
        </button>
      </div>

      <style jsx>{`
        .top-nav-item {
          padding: ".5rem 1rem",
          textDecoration: none;
          color: rgba(255,255,255,.7);
          font-size: .88rem;
          font-weight: 500;
          border-radius: 8px;
          transition: all .2s;
          display: flex;
          align-items: center;
        }
        .top-nav-item:hover {
          background: rgba(255,255,255,.1);
          color: #fff;
        }
        .top-nav-item.active {
          background: rgba(255,255,255,.15);
          color: #fff;
        }
      `}</style>
    </div>
  );
}

export default TopbarClient;
