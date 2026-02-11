import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../services/api";
import type { Product } from "../services/api";
import Spinner from "../components/ui/Spinner";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext"; // ✅ import wishlist

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist(); // ✅ wishlist hooks

  useEffect(() => {
    if (id) {
      fetchProductById(id).then((data) => {
        setProduct(data);
        setLoading(false);
      });
    }
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0077C0] via-[#0077C0]/90 to-[#FAFAFA]">
        <Spinner />
      </div>
    );

  if (!product)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0077C0] via-[#0077C0]/90 to-[#FAFAFA]">
        <p className="text-red-500 text-lg">Product not found</p>
      </div>
    );

  const toggleWishlist = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0077C0] via-[#0077C0]/90 to-[#FAFAFA] py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-5 bg-white rounded-xl shadow-lg p-6 md:p-10">
        <div className="flex flex-col md:flex-row gap-8 items-start relative">

          {/* Product Image + Wishlist */}
          <div className="relative w-full md:w-1/2">
            <img
              src={product.image}
              alt={product.title}
              className="w-full object-contain rounded-lg border border-gray-200 p-4 bg-[#FAFAFA]"
            />

            {/* Wishlist Icon */}
            <button
              onClick={toggleWishlist}
              className="absolute top-2 right-2 text-3xl"
            >
              {isInWishlist(product.id) ? "❤️" : "🤍"}
            </button>
          </div>

          {/* Product Details */}
          <div className="flex-1">
            <h1 className="text-5xl font-extrabold text-gray-800 mb-4">
              {product.title}
            </h1>

            <p className="text-4xl font-bold text-[#0077C0] mb-6">
              ${product.price}
            </p>

            <p className="text-gray-700 mb-4 text-2xl">{product.description}</p>

            <p className="text-gray-500 mb-2 text-lg">Category: {product.category}</p>
            <p className="text-gray-500 text-lg">
              Rating: {product.rating.rate} ({product.rating.count} reviews)
            </p>
            <br />

            <div className="flex gap-4">
              <button
                onClick={() => addToCart(product)}
                className="cursor-pointer bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
              >
                Add to Cart
              </button>

              <button className="bg-white text-black px-6 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition">
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
