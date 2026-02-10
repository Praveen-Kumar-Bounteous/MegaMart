import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../services/api";
import type { Product } from "../services/api";
import Spinner from "../components/ui/Spinner";

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0077C0] via-[#0077C0]/90 to-[#FAFAFA] py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 bg-white rounded-xl shadow-lg p-6 md:p-10">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Product Image */}
          <img
            src={product.image}
            alt={product.title}
            className="w-full md:w-1/2 object-contain rounded-lg border border-gray-200 p-4 bg-[#FAFAFA]"
          />

          {/* Product Details */}
          <div className="flex-1">
            <h1 className="text-3xl font-extrabold text-gray-800 mb-4">
              {product.title}
            </h1>

            <p className="text-2xl font-bold text-[#0077C0] mb-6">
              ${product.price}
            </p>

            <p className="text-gray-700 mb-4">{product.description}</p>

            <p className="text-gray-500 mb-2">Category: {product.category}</p>
            <p className="text-gray-500">
              Rating: {product.rating.rate} ({product.rating.count} reviews)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
