import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { ProductList } from "./pages/ProductList";
import { SingleProduct } from "./pages/SingleProduct";
import { Cart } from "./pages/Cart";
import { Wishlist } from "./pages/Wishlist";
import { Navbar } from "./navigation/Navbar";
import { Footer } from "./components/Footer";
import { Signup } from "./pages/Auth/Signup";
import { Login } from "./pages/Auth/Login";
import { Logout } from "./pages/Logout";
import { Checkout } from "./pages/Checkout";
import { RequireAuth } from "./utils/Auth/RequireAuth";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:productId" element={<SingleProduct />} />
        <Route
          path="/cart"
          element={
            <RequireAuth>
              <Cart />
            </RequireAuth>
          }
        />
        <Route
          path="/wishlist"
          element={
            <RequireAuth>
              <Wishlist />
            </RequireAuth>
          }
        />
        <Route
          path="/checkout"
          element={
            <RequireAuth>
              <Checkout />
            </RequireAuth>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
