import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

import LandingPage from "./pages/LandingPage"; // <-- your landing page
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Deals from "./pages/Deals";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Login from "./pages/LoginPage";

import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { WishlistProvider } from "./context/WishlistContext";
import { OrdersProvider } from "./context/OrdersContext";
import ProtectedRoute from "./components/ProtectedRoute";
import WishlistDropdown from "./pages/WishlistDropdown";
import CheckoutPage from "./pages/CheckoutPage";
import OrdersPage from "./pages/OrdersPage";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <OrdersProvider>
            <Router>
              <div className="flex flex-col min-h-screen">
                <Header />

                <main className="flex-1">
                  <Routes>
                    {/* Landing page as the first route */}
                    <Route path="/" element={<LandingPage />} />

                    {/* Other routes */}
                    <Route path="/home" element={<Home />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/products/:id" element={<ProductDetail />} />
                    <Route path="/deals" element={<Deals />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/wishlist" element={<ProtectedRoute> <WishlistDropdown /> </ProtectedRoute>} />
                    <Route path="/checkout" element={<ProtectedRoute> <CheckoutPage /> </ProtectedRoute>} />
                    <Route path="/orders" element={<ProtectedRoute> <OrdersPage /> </ProtectedRoute>} />

                    {/* Protected route example */}
                    <Route
                      path="/cart"
                      element={
                        <ProtectedRoute>
                          <Cart />
                        </ProtectedRoute>
                      }
                    />

                    {/* Login route */}
                    <Route path="/login" element={<Login />} />
                  </Routes>
                </main>

                <Footer />
              </div>
            </Router>
          </OrdersProvider>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;