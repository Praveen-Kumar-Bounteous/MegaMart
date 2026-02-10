import { useState } from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-blue-600">
            MegaMart
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="text-gray-600 hover:text-blue-600 transition">
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
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-600 focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <nav className="md:hidden bg-white border-t border-gray-200">
          <div className="flex flex-col px-4 py-3 space-y-3">
            <Link to="/" className="text-gray-600 hover:text-blue-600">
              Home
            </Link>
            <Link to="/products" className="text-gray-600 hover:text-blue-600">
              Products
            </Link>
            <Link to="/deals" className="text-gray-600 hover:text-blue-600">
              Deals
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-blue-600">
              Contact
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
