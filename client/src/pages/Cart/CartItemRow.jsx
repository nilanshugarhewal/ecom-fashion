// Helper function to format prices
const formatPrice = (price) => {
  return price.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

// CartItemRow (Unchanged)
const CartItemRow = ({ item, onUpdateQuantity, onRemoveFromCart }) => {
  // item.productId is now the populated product object
  const { productId, quantity } = item;
  const itemTotal = productId.price * quantity;

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 border border-gray-200 rounded-lg p-4">
      <div className="w-24 h-32 bg-gray-200 rounded-md shrink-0 flex items-center justify-center">
        <span className="text-gray-500 text-sm">Image</span>
      </div>
      <div className="grow">
        <h3 className="font-semibold text-lg">{productId.name}</h3>
        <p className="text-gray-600">{formatPrice(productId.price)}</p>
        <button
          // Use item._id (the cart item's ID) for removal
          onClick={() => onRemoveFromCart(item._id)}
          className="text-red-600 hover:text-red-800 text-sm mt-1 font-medium"
        >
          Remove
        </button>
      </div>
      <div className="flex items-center space-x-2">
        <button
          // Use productId._id for updates
          onClick={() => onUpdateQuantity(productId._id, quantity - 1)}
          className="border rounded-md px-3 py-1 font-medium hover:bg-gray-100"
        >
          -
        </button>
        <span className="w-10 text-center">{quantity}</span>
        <button
          onClick={() => onUpdateQuantity(productId._id, quantity + 1)}
          className="border rounded-md px-3 py-1 font-medium hover:bg-gray-100"
        >
          +
        </button>
      </div>
      <div className="w-24 text-left sm:text-right">
        <span className="font-semibold text-lg">{formatPrice(itemTotal)}</span>
      </div>
    </div>
  );
};
export default CartItemRow;
