import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import type { Product } from "../../services/api";

interface CardProps {
  product: Product;
}

const Card: React.FC<CardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const toggleWishlist = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition bg-white relative">
      {/* Wishlist Icon */}
      <button
        onClick={toggleWishlist}
        className="absolute top-2 right-2 text-xl"
      >
        {isInWishlist(product.id) ? "❤️" : "🤍"}
      </button>

      {/* Product Image */}
      <img
        src={product.image}
        alt={product.title}
        className="h-40 mx-auto object-contain mb-4"
      />

      {/* Product Info */}
      <h2 className="font-semibold text-gray-800 line-clamp-2">
        {product.title}
      </h2>

      <p className="text-[#0077C0] font-bold mt-2">${product.price}</p>

      {/* Buttons */}
      <div className="flex gap-2 mt-4">
        <Link
          to={`/products/${product.id}`}
          className="flex-1 text-center py-2 rounded hover:bg-blue-200 transition"
        >
          Shop Now
        </Link>

        <button
          onClick={() => addToCart(product)}
          className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Card;
