// src/pages/CheckoutPage.tsx
import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  paymentMode: "Card" | "Cash";
}

interface CardInfo {
  cardNumber: string;
  expiry: string;
  cvv: string;
}

const CheckoutPage: React.FC = () => {
  const { cart, cartCount } = useCart();
  const navigate = useNavigate();

  const [customer, setCustomer] = useState<CustomerInfo>({
    name: "",
    email: "",
    phone: "",
    address: "",
    paymentMode: "Cash",
  });

  const [cardInfo, setCardInfo] = useState<CardInfo>({
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const [showCardModal, setShowCardModal] = useState(false);

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({ ...prev, [name]: value }));
  };

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // If card selected, show modal first
    if (customer.paymentMode === "Card" && !showCardModal) {
      setShowCardModal(true);
      return;
    }

    const order = {
      customer,
      cart,
      total: totalPrice,
      date: new Date().toISOString(),
      cardInfo: customer.paymentMode === "Card" ? cardInfo : null,
    };

    // Save to localStorage for future order history
    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    localStorage.setItem("orders", JSON.stringify([...orders, order]));

    alert("Order placed successfully!");
    navigate("/products"); // redirect to products or home
  };

  if (cart.length === 0)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
        <p className="text-gray-700 text-2xl mb-4">Your cart is empty.</p>
        <button
          onClick={() => navigate("/products")}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Browse Products
        </button>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8">Checkout</h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Customer Form */}
          <form className="bg-white p-6 rounded-xl shadow-lg" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-semibold mb-4">Customer Information</h2>

            <label className="block mb-2 font-medium">Full Name</label>
            <input
              type="text"
              name="name"
              value={customer.name}
              onChange={handleInputChange}
              required
              className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <label className="block mb-2 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={customer.email}
              onChange={handleInputChange}
              required
              className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <label className="block mb-2 font-medium">Phone</label>
            <input
              type="tel"
              name="phone"
              value={customer.phone}
              onChange={handleInputChange}
              required
              className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <label className="block mb-2 font-medium">Delivery Address</label>
            <textarea
              name="address"
              value={customer.address}
              onChange={handleInputChange}
              required
              className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <label className="block mb-2 font-medium">Payment Method</label>
            <select
              name="paymentMode"
              value={customer.paymentMode}
              onChange={handleInputChange}
              className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Cash">Cash on Delivery</option>
              <option value="Card">Card</option>
            </select>

            <button
              type="submit"
              className="w-full mt-4 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition font-semibold"
            >
              Place Order
            </button>
          </form>

          {/* Order Summary */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-4 max-h-[400px] overflow-y-auto">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <img src={item.image} alt={item.title} className="w-16 h-16 object-contain rounded" />
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-gray-600 text-sm">
                        {item.quantity} x ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <p className="font-bold">${(item.quantity * item.price).toFixed(2)}</p>
                </div>
              ))}
            </div>
            <hr className="my-4" />
            <p className="text-xl font-bold text-right">
              Total: <span className="text-[#0077C0]">${totalPrice.toFixed(2)}</span>
            </p>
          </div>
        </div>

        {/* Card Modal */}
        {showCardModal && customer.paymentMode === "Card" && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md relative">
              <h2 className="text-2xl font-semibold mb-4">Enter Card Details</h2>

              <label className="block mb-2 font-medium">Card Number</label>
              <input
                type="text"
                name="cardNumber"
                value={cardInfo.cardNumber}
                onChange={handleCardChange}
                required
                maxLength={16}
                className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <label className="block mb-2 font-medium">Expiry (MM/YY)</label>
              <input
                type="text"
                name="expiry"
                value={cardInfo.expiry}
                onChange={handleCardChange}
                required
                placeholder="MM/YY"
                maxLength={5}
                className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <label className="block mb-2 font-medium">CVV</label>
              <input
                type="text"
                name="cvv"
                value={cardInfo.cvv}
                onChange={handleCardChange}
                required
                maxLength={3}
                className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <div className="flex justify-end gap-4 mt-4">
                <button
                  onClick={() => setShowCardModal(false)}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Pay & Place Order
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
