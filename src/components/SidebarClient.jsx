import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import api from "../utils/api";

function SidebarClient() {
  const location = useLocation();
  const [cartCount, setCartCount] = useState(0);
  const [user, setUser] = useState();

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("panenku_cart") || "[]");

      const count = cart.reduce((total, item) => total + (item.qty || 0), 0);
      setCartCount(count);
    };

    api.get("/auth/me").then((res) => {
      setUser(res.data.data);
    });

    updateCartCount();
    window.addEventListener("storage", updateCartCount);
    window.addEventListener("panenku-cart-updated", updateCartCount);
    return () => {
      window.removeEventListener("storage", updateCartCount);
      window.removeEventListener("panenku-cart-updated", updateCartCount);
    };
  }, []);

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <Link to="/">
          🌾 Panen<span>Ku</span>
        </Link>
      </div>
      <div className="sidebar-role">Akun Pembeli</div>
      <nav className="sidebar-nav">
        <Link
          to="/client/dashboard"
          className={`nav-item ${isActive("/client/dashboard") ? "active" : ""}`}
        >
          <span className="nav-icon">🏠</span> Dashboard
        </Link>
        <Link
          to="/client/order"
          className={`nav-item ${isActive("/client/order") ? "active" : ""}`}
        >
          <span className="nav-icon">🌾</span> Pesan Produk
        </Link>
        <Link
          to="/client/cart"
          className={`nav-item ${isActive("/client/cart") ? "active" : ""}`}
        >
          <span className="nav-icon">🛒</span> Keranjang{" "}
          {cartCount > 0 && <span className="nav-badge">{cartCount}</span>}
        </Link>
        <Link
          to="/client/history"
          className={`nav-item ${isActive("/client/history") ? "active" : ""}`}
        >
          <span className="nav-icon">📦</span> Riwayat Pesanan
        </Link>
        <Link
          to="/client/tracking"
          className={`nav-item ${isActive("/client/tracking") ? "active" : ""}`}
        >
          <span className="nav-icon">🚚</span> Lacak Pengiriman
        </Link>
        <div className="sidebar-divider"></div>
        <Link
          to="/client/profile"
          className={`nav-item ${isActive("/client/profile") ? "active" : ""}`}
        >
          <span className="nav-icon">👤</span> Profil
        </Link>
      </nav>
      <div className="sidebar-footer">
        <div className="user-profile">
          <div className="user-avatar">👩</div>
          <div>
            <div className="user-name">{user?.nama}</div>
            <div className="user-email">{user?.email}</div>
          </div>
          <button
            className="btn-logout"
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/login";
            }}
          >
            🚪
          </button>
        </div>
      </div>
    </aside>
  );
}

export default SidebarClient;
