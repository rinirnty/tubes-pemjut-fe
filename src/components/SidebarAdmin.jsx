import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "../utils/api";

function SidebarAdmin() {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [orderCount, setOrderCount] = useState(0);

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const loadData = async () => {
      try {
        const [userRes, orderRes] = await Promise.all([
          api.get("/auth/me"),
          api.get("/orders"),
        ]);

        setUser(userRes.data.data);

        const pendingOrders = orderRes.data.filter(
          (o) => o.status !== "dibatalkan" && o.status !== "selesai",
        );

        setOrderCount(pendingOrders.length);
      } catch (err) {
        console.error(err);
      }
    };

    loadData();
  }, []);

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
          to="/admin/kategori"
          className={`nav-item ${isActive("/admin/kategori") ? "active" : ""}`}
        >
          <span className="nav-icon">📂</span> Kategori
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
          {orderCount > 0 && <span className="nav-badge">{orderCount}</span>}
        </Link>
        <Link
          to="/admin/clients"
          className={`nav-item ${isActive("/admin/clients") ? "active" : ""}`}
        >
          <span className="nav-icon">👥</span> Pengguna
        </Link>
        {/* <Link
          to="/admin/reports"
          className={`nav-item ${isActive("/admin/reports") ? "active" : ""}`}
        >
          <span className="nav-icon">📈</span> Laporan
        </Link> */}
      </nav>
      <div className="sidebar-footer">
        <div className="admin-profile">
          <div>
            <div className="admin-name">{user?.nama}</div>
            <div className="admin-email">{user?.email}</div>
          </div>
          <button
            className="btn-logout"
            title="Logout"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
          >
            🚪
          </button>
        </div>
      </div>
    </aside>
  );
}

export default SidebarAdmin;
