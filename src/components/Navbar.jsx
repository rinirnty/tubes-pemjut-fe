import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../utils/api";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);

    const token = localStorage.getItem("token");

    if (token) {
      api
        .get("/auth/me")
        .then((res) => {
          setUser(res.data.data);
        })
        .catch(() => {
          localStorage.removeItem("token");
          setUser(null);
        });
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (id) => {
    if (window.location.pathname !== "/") {
      navigate("/", { state: { scrollTo: id } });
      return;
    }

    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav id="navbar" className={scrolled ? "scrolled" : ""}>
      <Link to="/" className="logo">
        🌾 Panen<span>Ku</span>
      </Link>

      <ul className="nav-links">
        <li>
          <button onClick={() => handleScrollTo("produk")}>Produk</button>
        </li>
        <li>
          <Link to="/catalog">Katalog</Link>
        </li>
        <li>
          <button onClick={() => handleScrollTo("cara-kerja")}>
            Cara Kerja
          </button>
        </li>
        <li>
          <Link to="/about">Tentang</Link>
        </li>
        <li>
          <Link to="/contact">Kontak</Link>
        </li>
      </ul>

      <div className="nav-cta">
        {user ? (
          <>
            <span>Halo, {user.nama}</span>

            <Link
              to={
                user.role === "admin" ? "/admin/dashboard" : "/client/dashboard"
              }
              className="btn btn-primary"
            >
              Dashboard
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-outline">
              Masuk
            </Link>

            <Link to="/register" className="btn btn-primary">
              Daftar Gratis
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
