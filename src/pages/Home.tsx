import { useEffect, useState } from "react";
import { fetchProducts } from "../services/api";
import type { Product } from "../services/api";
import Card from "../components/ui/Card";
import Spinner from "../components/ui/Spinner";

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts().then((data) => {
      setProducts(data.slice(0, 6)); // Show 6 featured products
      setLoading(false);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0077C0] via-[#0077C0]/90 to-[#FAFAFA]">
      {/* Hero Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white drop-shadow-lg mb-4">
          Welcome to MegaMart
        </h1>
        <p className="text-white/90 text-lg sm:text-xl mb-8">
          Discover top-quality products at unbeatable prices.
        </p>
      </div>

      {/* Products Grid */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 bg-white rounded-xl shadow-lg">
        {loading ? (
          <Spinner />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
