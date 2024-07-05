// src/App.js
import React, { useState } from 'react';
import ProductForm from './ProductForm';
import ProductDisplay from './ProductDisplay';

function App() {
  const [productData, setProductData] = useState(null);
  const [error, setError] = useState('');

  const handleProductData = (data, errorMessage) => {
    setProductData(data);
    setError(errorMessage);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Product Summarizer</h1>
      <ProductForm setProductData={handleProductData} />
      {error && <p className="text-red-500 text-center">{error}</p>}
      {productData && <ProductDisplay productData={productData} />}
    </div>
  );
}

export default App;
