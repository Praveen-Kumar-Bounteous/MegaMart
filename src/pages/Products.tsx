import { useEffect, useState } from "react";
import { fetchProducts } from "../services/api";
import type { Product } from "../services/api";
import Card from "../components/ui/Card";
import Spinner from "../components/ui/Spinner";

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0077C0] via-[#0077C0]/90 to-[#FAFAFA] py-12">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white drop-shadow-lg">
          All Products
        </h1>
        <p className="mt-2 text-white/90">
          Browse our full collection of quality products.
        </p>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 bg-white rounded-xl shadow-lg">
        {loading ? (
          <Spinner />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Card key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
