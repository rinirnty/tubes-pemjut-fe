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
import AdminRoute from "./route/AdminRoute";
import ClientRoute from "./route/ClientRoute";
import GuestRoute from "./route/GuestRoute";

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
        <Route path="/login" element={
          <GuestRoute>
            <Login />
          </GuestRoute>
        } />
        <Route path="/register" element={
          <GuestRoute>
            <Register />
          </GuestRoute>
        } />
        <Route path="/forgot-password" element={
          <GuestRoute>
            <ForgotPassword />
          </GuestRoute>
        } />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/client/dashboard" element={
          <ClientRoute>
            <ClientDashboard />
          </ClientRoute>
        } />
        <Route path="/client/order" element={
          <ClientRoute>
            <ClientOrder />
          </ClientRoute>
        } />
        <Route path="/client/cart" element={
          <ClientRoute>
            <ClientCart />
          </ClientRoute>
        } />
        <Route path="/client/history" element={
          <ClientRoute>
            <ClientHistory />
          </ClientRoute>
        } />
        <Route path="/client/tracking" element={
          <ClientRoute>
            <ClientTracking />
          </ClientRoute>
        } />
        <Route path="/client/profile" element={
          <ClientRoute>
            <ClientProfile />
          </ClientRoute>
        } />
        <Route path="/admin/dashboard" element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        } />
        <Route path="/admin/products" element={
          <AdminRoute>
            <AdminProducts />
          </AdminRoute>
        } />
        <Route path="/admin/orders" element={
          <AdminRoute>
            <AdminOrders />
          </AdminRoute>
        } />
        <Route path="/admin/clients" element={
          <AdminRoute>
            <AdminClients />
          </AdminRoute>
        } />
        <Route path="/admin/reports" element={
          <AdminRoute>
            <AdminReports />
          </AdminRoute>
        } />
      </Routes>
    </Router>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
