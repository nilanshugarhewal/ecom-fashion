// Helper function to format prices
const formatPrice = (price) => {
  return price.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="group text-center border border-gray-200 rounded-lg p-4 flex flex-col">
      <div className="w-full h-auto aspect-3/4 bg-gray-200 rounded-md flex items-center justify-center">
        {" "}
        <span className="text-gray-500 text-sm">
          {" "}
          <img src={product.img} alt="image" />{" "}
        </span>{" "}
      </div>
      <div className="grow mt-4">
        <h3 className="text-lg font-medium text-gray-800">{product.name}</h3>
        {/* Use formatPrice helper */}
        <p className="mt-1 text-base font-semibold text-gray-900">
          {formatPrice(product.price)}
        </p>
      </div>
      <button
        onClick={() => onAddToCart(product)}
        className="mt-4 bg-black text-white py-2 px-6 rounded-md font-semibold text-sm hover:bg-gray-800 transition-colors w-full"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
