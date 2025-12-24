'use client';
import { useState } from 'react';
import { useCart } from '../context/CartContext'; // 👈 Connects to the Brain

export default function ProductInfo({ product }) {
  // Default to the first size available (Safety check included)
  const defaultSize = product.sizes && product.sizes.length > 0 ? product.sizes[0] : 'M';
  
  const [selectedSize, setSelectedSize] = useState(defaultSize);
  const [loading, setLoading] = useState(false);
  
  // Get the "addToCart" tool from our Global Context
  const { addToCart } = useCart();

  function handleAddToCart() {
    setLoading(true);

    // 1. Actually add the item to the Global Cart memory
    addToCart(product, selectedSize);

    // 2. Show visual feedback
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }

  return (
    <div className="flex flex-col justify-center">
      {/* Category */}
      <span className="text-brand-dark font-bold uppercase tracking-widest text-xs mb-2">
        {product.category}
      </span>
      
      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-extrabold uppercase tracking-tight mb-4 text-brand-red">
        {product.name}
      </h1>
      
      {/* Price */}
      <p className="text-2xl font-bold mb-6 text-black">R {product.price}</p>
      
      {/* Description */}
      <p className="text-gray-900 leading-relaxed mb-8 text-base font-medium">
        {product.description}
      </p>

      {/* 📏 SIZE SELECTOR */}
      <div className="mb-8">
        <span className="text-xs font-bold uppercase text-gray-900 block mb-3">Select Size</span>
        <div className="flex gap-3">
          {product.sizes && product.sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`w-12 h-12 flex items-center justify-center rounded-lg font-bold transition-all border-2 ${
                selectedSize === size
                  ? 'bg-brand-red text-white border-brand-red scale-110' // Active (Red)
                  : 'bg-white text-gray-900 border-gray-200 hover:border-brand-red' // Inactive (White)
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* ADD TO CART BUTTON */}
      <button 
        onClick={handleAddToCart}
        disabled={loading}
        className="w-full bg-brand-red text-white font-bold uppercase tracking-widest py-4 rounded-full hover:bg-brand-dark transition-transform active:scale-95 shadow-lg shadow-red-900/20 disabled:opacity-70"
      >
        {loading ? 'Adding...' : 'Add to Cart'}
      </button>

      {/* Delivery Info */}
      <div className="mt-8 text-xs text-gray-700 space-y-2 border-t border-gray-200 pt-8">
          <p>• Free delivery for orders over R1000</p>
          <p>• 14-day returns policy for South Africa</p>
      </div>
    </div>
  );
}