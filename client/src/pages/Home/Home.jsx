import React from "react";
import ProductGrid from "../../components/ProductGrid";

// Home Page
const Home = ({ products, onAddToCart }) => {
  return (
    <ProductGrid
      subtitle="Top Picks"
      title="Our Top Products"
      products={products}
      onAddToCart={onAddToCart}
    />
  );
};

export default Home;
