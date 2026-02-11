import React from "react";
import { useWishlist } from "../context/WishlistContext";
import { Link } from "react-router-dom";

const WishlistDropdown: React.FC = () => {
  const { wishlist, removeFromWishlist } = useWishlist();

  if (wishlist.length === 0) {
    return (
      <div className="p-4 text-gray-500 text-center">
        Your wishlist is empty
      </div>
    );
  }

  return (
    <div className="w-80 bg-white border rounded shadow-lg overflow-hidden">
      <h3 className="text-lg font-semibold p-4 border-b">Wishlist</h3>
      <div className="max-h-64 overflow-y-auto">
        {wishlist.map((product) => (
          <div
            key={product.id}
            className="flex items-center justify-between p-3 border-b hover:bg-gray-50 transition"
          >
            <Link to={`/products/${product.id}`} className="flex-1 flex items-center gap-3">
              <img
                src={product.image}
                alt={product.title}
                className="h-12 w-12 object-contain rounded"
              />
              <span className="text-gray-800 line-clamp-1">{product.title}</span>
            </Link>
            <button
              onClick={() => removeFromWishlist(product.id)}
              className="text-red-500 hover:text-red-700 font-bold"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
      <div className="p-3 text-center">
        <Link
          to="/wishlist"
          className="text-blue-600 hover:underline font-medium"
        >
          View Full Wishlist
        </Link>
      </div>
    </div>
  );
};

export default WishlistDropdown;
