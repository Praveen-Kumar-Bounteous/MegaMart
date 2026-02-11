import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../../context/CartContext";
import { AuthContext } from "../../../context/AuthContext";
import { useWishlist } from "../../../context/WishlistContext";
import Button from "../../ui/Button";
import toast from "react-hot-toast";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cartCount } = useCart();
  const { wishlist } = useWishlist();
  const navigate = useNavigate();

  const auth = useContext(AuthContext);
  if (!auth) throw new Error("AuthContext not found");

  const { user, logout } = auth;

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-blue-600">
            MegaMart
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/home" className="text-gray-600 hover:text-blue-600 transition">
              Home
            </Link>
            <Link to="/products" className="text-gray-600 hover:text-blue-600 transition">
              Products
            </Link>
            <Link to="/deals" className="text-gray-600 hover:text-blue-600 transition">
              Deals
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-blue-600 transition">
              Contact
            </Link>

            {/* My Orders */}
            {user && (
              <Link to="/orders" className="text-gray-600 hover:text-blue-600 transition">
                My Orders
              </Link>
            )}

            {/* Cart */}
            <Link
              to="/cart"
              className="relative text-gray-600 hover:text-blue-600 transition"
            >
              Cart
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="relative text-gray-600 hover:text-blue-600 transition"
            >
              ❤️
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Auth */}
            {user ? (
              <>
                <span className="text-sm text-gray-500">
                  Hi, <span className="font-semibold">{user.name}</span>
                </span>
                <Button variant="secondary" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <Button
                variant="primary"
                size="sm"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-600 focus:outline-none"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <nav className="md:hidden bg-white border-t border-gray-200">
          <div className="flex flex-col px-4 py-3 space-y-3">
            <Link to="/home" className="text-gray-600 hover:text-blue-600">Home</Link>
            <Link to="/products" className="text-gray-600 hover:text-blue-600">Products</Link>
            <Link to="/deals" className="text-gray-600 hover:text-blue-600">Deals</Link>
            <Link to="/contact" className="text-gray-600 hover:text-blue-600">Contact</Link>

            {/* My Orders */}
            {user && (
              <Link to="/orders" className="text-gray-600 hover:text-blue-600">My Orders</Link>
            )}

            <Link to="/cart" className="text-gray-600 hover:text-blue-600">Cart ({cartCount})</Link>
            <Link to="/wishlist" className="text-gray-600 hover:text-blue-600">Wishlist ({wishlist.length})</Link>

            {user ? (
              <button onClick={handleLogout} className="text-left text-red-600 font-medium">Logout</button>
            ) : (
              <button onClick={() => navigate("/login")} className="text-left text-blue-600 font-medium">Login</button>
            )}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
