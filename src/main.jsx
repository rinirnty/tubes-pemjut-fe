import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "./styles.css";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Catalog from "./pages/public/Catalog";
import About from "./pages/public/About";
import Contact from "./pages/public/Contact";
import ClientDashboard from "./pages/client/Dashboard";
import ClientOrder from "./pages/client/Order";
import ClientCart from "./pages/client/Cart";
import ClientHistory from "./pages/client/History";
import ClientTracking from "./pages/client/Tracking";
import ClientProfile from "./pages/client/Profile";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminProducts from "./pages/admin/Products";
import AdminOrders from "./pages/admin/Orders";
import AdminClients from "./pages/admin/Clients";
import AdminReports from "./pages/admin/Reports";

function PageBodyClassManager() {
  const location = useLocation();

  useEffect(() => {
    const isAdminOrClient =
      location.pathname.startsWith("/admin/") ||
      location.pathname.startsWith("/client/");
    if (isAdminOrClient) {
      document.body.classList.add("has-sidebar");
      document.body.classList.remove("no-sidebar");
    } else {
      document.body.classList.add("no-sidebar");
      document.body.classList.remove("has-sidebar");
    }
  }, [location.pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <PageBodyClassManager />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/client/dashboard" element={<ClientDashboard />} />
        <Route path="/client/order" element={<ClientOrder />} />
        <Route path="/client/cart" element={<ClientCart />} />
        <Route path="/client/history" element={<ClientHistory />} />
        <Route path="/client/tracking" element={<ClientTracking />} />
        <Route path="/client/profile" element={<ClientProfile />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/admin/clients" element={<AdminClients />} />
        <Route path="/admin/reports" element={<AdminReports />} />
      </Routes>
    </Router>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
