import { useState } from "react";

// Helper function to format prices
const formatPrice = (price) => {
  return price.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

const CheckoutPage = ({ cart, onCheckout, navigateTo }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { items, total } = cart;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // We pass the cart total to the checkout API
    await onCheckout({ total });
    // The onCheckout function will handle navigation
  };

  return (
    <div className="bg-white py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          Checkout
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
            <h3 className="text-xl font-semibold mb-6">Shipping Information</h3>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Address
              </label>
              <textarea
                id="address"
                name="address"
                required
                rows="4"
                className="w-full p-2 border border-gray-300 rounded-md"
              ></textarea>
            </div>
            <div className="flex items-center justify-between">
              <a
                href="#"
                onClick={() => navigateTo("cart")}
                className="text-sm font-medium text-gray-700 hover:text-black"
              >
                &larr; Back to Cart
              </a>
              <button
                type="submit"
                disabled={isProcessing}
                className="bg-black text-white py-3 px-8 rounded-md font-semibold hover:bg-gray-800 transition-colors disabled:bg-gray-400"
              >
                {isProcessing ? "Processing..." : `Pay ${formatPrice(total)}`}
              </button>
            </div>
          </form>
          <div className="lg:col-span-1 bg-gray-50 rounded-lg p-6 h-fit sticky top-32">
            <h3 className="text-xl font-semibold mb-6">Order Summary</h3>
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between text-gray-600 text-sm"
                >
                  <span>
                    {item.productId.name} (x{item.quantity})
                  </span>
                  <span>
                    {formatPrice(item.productId.price * item.quantity)}
                  </span>
                </div>
              ))}
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex justify-between font-bold text-lg text-gray-900">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
