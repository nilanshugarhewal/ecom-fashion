import ProductCard from "./ProductCard";

// Product Grid
const ProductGrid = ({ subtitle, title, products, onAddToCart }) => (
  <section className="bg-white py-16 lg:py-24">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase">{subtitle}</h3>
        <h2 className="mt-2 text-3xl font-bold text-gray-900">{title}</h2>
      </div>
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
        {products.map((product) => (
          // Use product._id from MongoDB as the key
          <ProductCard key={product._id} product={product} onAddToCart={onAddToCart} />
        ))}
      </div>
    </div>
  </section>
);

export default ProductGrid;
