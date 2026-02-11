// src/pages/CartPage.tsx
import React from "react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { Link, useNavigate } from "react-router-dom";

const Cart: React.FC = () => {
  const { cart, increaseQty, decreaseQty, removeFromCart, cartCount } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate(); // <-- Add this

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
        <img
          src="https://img.freepik.com/free-vector/shopping-cart-realistic_1284-6011.jpg?semt=ais_hybrid&w=740&q=80"
          alt="Empty Cart"
          className="w-40 h-40 mb-6 opacity-50"
        />
        <p className="text-gray-700 text-2xl mb-4">Your cart is empty</p>
        <Link
          to="/products"
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Browse Products
        </Link>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-6">Your Cart ({cartCount} items)</h1>

        <div className="space-y-6">
          {cart.map((item) => {
            const inWishlist = isInWishlist(item.id);

            return (
              <div
                key={item.id}
                className="flex items-center bg-white rounded-lg shadow p-4 gap-4 relative"
              >
                {/* Wishlist Icon */}
                <button
                  className="absolute top-2 right-2 text-red-500 text-xl"
                  onClick={() =>
                    inWishlist
                      ? removeFromWishlist(item.id)
                      : addToWishlist(item)
                  }
                >
                  {inWishlist ? "❤️" : "🤍"}
                </button>

                <img
                  src={item.image}
                  alt={item.title}
                  className="w-24 h-24 object-contain rounded"
                />

                <div className="flex-1">
                  <h2 className="font-semibold text-lg">{item.title}</h2>
                  <p className="text-[#0077C0] font-bold mt-1">${item.price}</p>

                  {/* Quantity Controls */}
                  <div className="flex items-center mt-2 gap-2">
                    <button
                      onClick={() => decreaseQty(item.id)}
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => increaseQty(item.id)}
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      +
                    </button>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="ml-4 text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <p className="font-bold text-lg">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            );
          })}
        </div>

        {/* Cart Summary & Checkout */}
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-lg shadow">
          <p className="text-xl font-bold">
            Total: <span className="text-[#0077C0]">${totalPrice.toFixed(2)}</span>
          </p>
          <button
            onClick={() => navigate("/checkout")} // <-- Navigate to checkout page
            className="mt-4 md:mt-0 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
