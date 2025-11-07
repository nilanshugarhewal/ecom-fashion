import CartItemRow from "./CartItemRow";

// Helper function to format prices
const formatPrice = (price) => {
  return price.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

const CartPage = ({ cart, onUpdateQuantity, onRemoveFromCart, navigateTo }) => {
  const { items, total } = cart;

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-3xl font-bold text-gray-900">Your Cart is Empty</h2>
        <button
          onClick={() => navigateTo("home")}
          className="mt-6 bg-black text-white py-3 px-8 rounded-md font-semibold text-sm hover:bg-gray-800 transition-colors"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          Your Cart
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => (
              <CartItemRow
                key={item._id} // Use cart item's _id as key
                item={item}
                onUpdateQuantity={onUpdateQuantity}
                onRemoveFromCart={onRemoveFromCart}
              />
            ))}
          </div>
          <div className="lg:col-span-1 bg-gray-50 rounded-lg p-6 h-fit sticky top-32">
            <h3 className="text-xl font-semibold mb-6">Order Summary</h3>
            <div className="space-y-4">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>FREE</span>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between font-bold text-lg text-gray-900">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
              <button
                onClick={() => navigateTo("checkout")}
                className="w-full bg-black text-white py-3 rounded-md font-semibold mt-4 hover:bg-gray-800 transition-colors"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
