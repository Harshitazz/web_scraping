// src/ProductForm.js
import React, { useState } from 'react';

function ProductForm({ setProductData }) {
  const [url, setUrl] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/fetch-product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });
      const data = await response.json();
      if (data.error) {
        setProductData(null, data.error);
      } else {
        setProductData(data, '');
      }
    } catch (error) {
      setProductData(null, 'Failed to fetch product data');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex items-center">
        <input
          type="url"
          className="flex-grow p-2 border border-gray-300 rounded-md"
          placeholder="Enter product URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
        <button type="submit" className="ml-4 p-2 bg-blue-500 text-white rounded-md">
          Fetch Data
        </button>
      </div>
    </form>
  );
}

export default ProductForm;
