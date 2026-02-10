import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* About Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">MegaMart</h3>
          <p className="text-gray-600 text-sm">
            Your one-stop shop for all your needs. Quality products, great prices, and fast delivery.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Quick Links</h3>
          <ul className="space-y-1">
            <li>
              <Link to="/" className="hover:text-blue-600 transition">Home</Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-blue-600 transition">Products</Link>
            </li>
            <li>
              <Link to="/deals" className="hover:text-blue-600 transition">Deals</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-blue-600 transition">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Contact Us</h3>
          <p className="text-gray-600 text-sm">123 MegaMart Street</p>
          <p className="text-gray-600 text-sm">City, Country</p>
          <p className="text-gray-600 text-sm">Email: support@megamart.com</p>
          <p className="text-gray-600 text-sm">Phone: +123 456 7890</p>
        </div>
      </div>

      <div className="border-t border-gray-200 mt-6 py-4 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} MegaMart. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
