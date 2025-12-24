'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [showSizePicker, setShowSizePicker] = useState(false);
  const { addToCart } = useCart();

  const images = product.images?.length > 0 ? product.images : [product.image];

  useEffect(() => {
    let interval;
    if (isHovered && images.length > 1 && !showSizePicker) {
      interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }, 800);
    } else {
      setCurrentImageIndex(0);
    }
    return () => clearInterval(interval);
  }, [isHovered, images.length, showSizePicker]);

  const handleSelectSize = (e, size) => {
    e.preventDefault();
    addToCart(product, size);
    setShowSizePicker(false);
    // Optional: You can replace this alert with a small toast notification later
    
  };

  return (
    <div 
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowSizePicker(false);
      }}
    >
      <Link href={`/product/${product._id}`} className="block">
        <div className="relative bg-gray-100 aspect-[3/4] overflow-hidden mb-4 rounded-lg shadow-sm border border-gray-100">
          <img 
            src={images[currentImageIndex] || "https://via.placeholder.com/300"} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          
          {/* PERSISTENT BOTTOM BAR (No Blur) */}
          <div className={`absolute bottom-0 left-0 right-0 bg-white/90 border-t border-gray-200 transition-all duration-300 transform ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
            {!showSizePicker ? (
              /* Step 1: Initial Quick Add Button */
              <button 
                onClick={(e) => { e.preventDefault(); setShowSizePicker(true); }}
                className="w-full py-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-900 hover:bg-brand-red hover:text-white transition-colors"
              >
                Quick Add +
              </button>
            ) : (
              /* Step 2: Size Selection at the bottom */
              <div className="p-3 animate-in slide-in-from-bottom-2 duration-200">
                <div className="flex justify-between items-center mb-2 px-1">
                  <span className="text-[9px] font-black uppercase tracking-widest text-brand-red">Select Size</span>
                  <button 
                    onClick={(e) => { e.preventDefault(); setShowSizePicker(false); }}
                    className="text-[9px] font-bold uppercase text-gray-400 hover:text-black"
                  >
                    Close
                  </button>
                </div>
                <div className="flex gap-1 justify-between">
                  {product.sizes?.map((size) => (
                    <button
                      key={size}
                      onClick={(e) => handleSelectSize(e, size)}
                      className="flex-1 py-2 bg-white border border-gray-200 text-[10px] font-bold text-gray-900 hover:border-brand-red hover:text-brand-red transition-all rounded"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Original Angles Badge */}
          {images.length > 1 && !showSizePicker && (
             <div className="absolute top-2 right-2 bg-brand-red/90 text-white text-[9px] font-black px-2 py-1 rounded tracking-tighter uppercase shadow-md">
               {images.length} Angles
             </div>
          )}
        </div>

        <div>
          <h3 className="text-sm font-extrabold uppercase tracking-wide text-gray-900 group-hover:text-brand-red transition-colors">
            {product.name}
          </h3>
          <p className="text-sm font-bold text-brand-red mt-1">R {product.price}</p>
        </div>
      </Link>
    </div>
  );
}