import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "../services/api";
import type { Product } from "../services/api";
import toast from "react-hot-toast";
import Button from "../components/ui/Button";

const LandingPage: React.FC = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  if (!auth) throw new Error("AuthContext not found");

  // const { user } = auth;

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data.slice(0, 4)); // Featured products
      } catch (error) {
        console.error("Failed to fetch products", error);
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  // const handleAddToCart = (product: Product) => {
  //   if (!user) {
  //     toast.error("Please login to add items to cart");
  //     navigate("/login");
  //     return;
  //   }
  //   navigate("/products");
  //   // Later you can connect this to CartContext
  //   toast.success(`${product.title} added to cart`);
  // };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative">
        <img
          src="https://static.vecteezy.com/system/resources/previews/002/058/986/non_2x/online-shopping-store-on-website-and-mobile-phone-design-smart-business-marketing-concept-horizontal-view-illustration-free-vector.jpg"
          alt="Hero"
          className="w-full h-96 object-cover"
        />

        <div className="absolute inset-0 bg-blue-900 bg-opacity-60 flex flex-col justify-center items-center text-center text-white p-6">
          <h2 className="text-4xl font-bold mb-4">
            Welcome to MegaMart
          </h2>
          <p className="text-lg mb-6">
            Discover amazing deals and trending products
          </p>

          <Button
            variant="primary"
            size="lg"
            onClick={() => navigate("/products")}
          >
            Shop Now
          </Button>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-blue-700 mb-8">
          Featured Products
        </h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading products...</p>
        ) : (
          <div className="cursor-pointer grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-blue-50 p-5 rounded-xl shadow hover:shadow-lg transition flex flex-col"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-48 object-contain mb-4"
                />

                <h3 className="text-md font-semibold text-blue-900 mb-2 line-clamp-2">
                  {product.title}
                </h3>

                <p className="text-blue-700 font-bold mb-4">
                  ${product.price}
                </p>

                {/* <Button
                  variant="primary"
                  size="sm"
                  className="mt-auto"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </Button> */}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default LandingPage;