// src/ProductDisplay.js
import React from 'react';

function ProductDisplay({ productData }) {
  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-2">{productData.title}</h2>
      <p className="text-gray-700 mb-2">
        <strong>Price:</strong> {productData.price}
      </p>
      <p className="text-gray-700">
        <strong>Description:</strong> {productData.description}
      </p>
    </div>
  );
}

export default ProductDisplay;
