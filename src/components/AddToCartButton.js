"use client";
import { useState } from 'react';
import { useCart } from '../context/CartContext';

export default function AddToCartButton({ product }) {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(null);

  const handleAdd = () => {
    if (!selectedSize) {
      alert("Please select a size first!");
      return;
    }
    addToCart(product, selectedSize);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Size Selector */}
      <div className="mb-4">
        <h3 className="text-sm font-bold uppercase mb-4">Select Size</h3>
        <div className="flex space-x-4">
          {product.sizes.map((size) => (
            <button 
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`w-12 h-12 border flex items-center justify-center transition-all text-sm font-medium ${
                selectedSize === size 
                  ? 'bg-black text-white border-black' 
                  : 'border-gray-300 hover:border-black'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Button */}
      <button 
        onClick={handleAdd}
        className="w-full bg-black text-white py-4 uppercase font-bold tracking-widest hover:bg-red-600 transition-colors"
      >
        Add to Cart
      </button>
    </div>
  );
}