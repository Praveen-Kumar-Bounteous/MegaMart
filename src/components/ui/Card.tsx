import type { Product } from "../../services/api";
import { Link } from "react-router-dom";

interface CardProps {
  product: Product;
}

const Card: React.FC<CardProps> = ({ product }) => {
  return (
    <Link to={`/products/${product.id}`} className="block rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-lg transition">
      <img
        src={product.image}
        alt={product.title}
        className="h-48 w-full object-contain p-4"
      />
      <div className="p-4">
        <h2 className="text-gray-800 font-semibold text-lg">{product.title}</h2>
        <p className="mt-2 text-blue-600 font-bold">${product.price}</p>
      </div>
    </Link>
  );
};

export default Card;
