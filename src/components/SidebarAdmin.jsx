import { Link, useLocation } from "react-router-dom";

function SidebarAdmin() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <Link to="/">
          🌾 Panen<span>Ku</span>
        </Link>
      </div>
      <div className="sidebar-role">Admin Panel</div>
      <nav className="sidebar-nav">
        <Link
          to="/admin/dashboard"
          className={`nav-item ${isActive("/admin/dashboard") ? "active" : ""}`}
        >
          <span className="nav-icon">📊</span> Dashboard
        </Link>
        <Link
          to="/admin/products"
          className={`nav-item ${isActive("/admin/products") ? "active" : ""}`}
        >
          <span className="nav-icon">🌾</span> Produk
        </Link>
        <Link
          to="/admin/orders"
          className={`nav-item ${isActive("/admin/orders") ? "active" : ""}`}
        >
          <span className="nav-icon">📦</span> Pesanan{" "}
          <span className="nav-badge">12</span>
        </Link>
        <Link
          to="/admin/clients"
          className={`nav-item ${isActive("/admin/clients") ? "active" : ""}`}
        >
          <span className="nav-icon">👥</span> Pengguna
        </Link>
        <Link
          to="/admin/reports"
          className={`nav-item ${isActive("/admin/reports") ? "active" : ""}`}
        >
          <span className="nav-icon">📈</span> Laporan
        </Link>
        <div className="sidebar-divider"></div>
        <Link to="#" className="nav-item">
          <span className="nav-icon">⚙️</span> Pengaturan
        </Link>
      </nav>
      <div className="sidebar-footer">
        <div className="admin-profile">
          <div className="admin-avatar">👨‍💼</div>
          <div>
            <div className="admin-name">Admin PanenKu</div>
            <div className="admin-email">admin@panenku.com</div>
          </div>
          <button
            className="btn-logout"
            title="Logout"
            onClick={() => (window.location.href = "/login")}
          >
            🚪
          </button>
        </div>
      </div>
    </aside>
  );
}

export default SidebarAdmin;
