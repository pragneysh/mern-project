import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./pages/MainLayout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Orders from "./pages/Orders";
import RoleProtectedRoute from "./middleware/RoleProtectedRoute";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminMenu from "./pages/admin/AdminMenu";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Routes WITH Navbar */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/menu" element={<Menu />} />
          </Route>

          {/* Admin Protected Route */}
          <Route element={<RoleProtectedRoute requireAdmin={true} />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route path="/admin/menu-items" element={<AdminMenu />} />
              <Route path="/admin/orders" element={<h1>Orders</h1>} />
              <Route path="/admin/users" element={<h1>Users</h1>} />
            </Route>
          </Route>
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;