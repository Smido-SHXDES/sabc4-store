"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  
  // State to track if user clicked "Quick Add"
  const [showSizes, setShowSizes] = useState(false);
  
  // State for visual feedback after adding
  const [isAdded, setIsAdded] = useState(false);

  const handleSizeClick = (e, size) => {
    e.preventDefault(); // Stop the card from opening the product page
    e.stopPropagation();
    
    addToCart(product, size);
    
    // Show "Added" feedback
    setIsAdded(true);
    setShowSizes(false);
    
    // Reset the "Added" text after 2 seconds
    setTimeout(() => setIsAdded(false), 2000);
  };

  const toggleSizeSelector = (e) => {
    e.preventDefault(); // Stop navigation
    e.stopPropagation();
    setShowSizes(true);
  };

  return (
    <Link href={`/product/${product._id}`} className="group block">
      <div className="relative overflow-hidden bg-gray-100 aspect-[3/4] mb-4">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* --- (Bottom Overlay) --- */}
        <div 
            className={`absolute bottom-0 left-0 right-0 bg-black text-white py-3 transition-transform duration-300 ${
                // If showing sizes, stay up. If not, only show on hover.
                showSizes ? 'translate-y-0' : 'translate-y-full group-hover:translate-y-0'
            }`}
        >
          {isAdded ? (
             // STATE 3: JUST ADDED
             <div className="text-center font-bold text-green-400 text-xs uppercase tracking-widest">
               Added to Cart!
             </div>
          ) : showSizes ? (
            // STATE 2: SIZE SELECTOR
            <div className="flex justify-center gap-2 px-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={(e) => handleSizeClick(e, size)}
                  className="w-8 h-8 flex items-center justify-center border border-white/30 hover:bg-white hover:text-black text-xs font-bold rounded-full transition-colors"
                >
                  {size}
                </button>
              ))}
            </div>
          ) : (
            // STATE 1: QUICK ADD BUTTON
            <button 
                onClick={toggleSizeSelector}
                className="w-full text-center font-bold uppercase text-xs tracking-widest hover:text-red-500"
            >
              Quick Add
            </button>
          )}
        </div>
      </div>
      
      {/* Product Info */}
      <div className="text-center">
        <h4 className="text-sm font-bold uppercase tracking-wide">{product.name}</h4>
        <p className="text-gray-500 text-sm mt-1">R {product.price}</p>
      </div>
    </Link>
  );
}