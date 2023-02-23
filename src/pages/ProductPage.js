import React from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard/ProductCard";

// Page to view details of a particular product

const ProductPage = () => {
  const location = useLocation();
  console.log(location.state);
  return (
    <div>
      <ProductCard productId={location.state.productId} />
    </div>
  );
};

export default ProductPage;
