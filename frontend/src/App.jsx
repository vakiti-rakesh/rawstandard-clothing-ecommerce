import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import AdminDashboard from "./pages/admin/AdminDashboard";
import OrderSuccess from "./pages/OrderSuccess";
import AdminLogin from "./pages/admin/AdminLogin";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import AdminProducts from "./pages/admin/AdminProducts";
import AddProduct from "./pages/admin/AddProduct";
import AdminOrders from "./pages/admin/AdminOrders";




function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/admin-login" element={<AdminLogin />} />
       <Route
  path="/admin/products"
  element={
    <ProtectedAdminRoute>
      <AdminProducts />
    </ProtectedAdminRoute>
  }
/>

<Route
  path="/admin/add-product"
  element={
    <ProtectedAdminRoute>
      <AddProduct />
    </ProtectedAdminRoute>
  }
/>

<Route
  path="/admin/orders"
  element={
    <ProtectedAdminRoute>
      <AdminOrders />
    </ProtectedAdminRoute>
  }
/>
<Route
  path="/admin"
  element={
    <ProtectedAdminRoute>
      <AdminDashboard />
    </ProtectedAdminRoute>
  }
/>
      </Routes>
    </Router>
  );
}

export default App;