'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ProductCard({ product }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Use the new array, or fallback to the old single image string
  // This ensures it works even if the data is messy
  const images = product.images?.length > 0 ? product.images : [product.image];

  useEffect(() => {
    let interval;
    // Only slide if we have more than 1 image AND we are hovering
    if (isHovered && images.length > 1) {
      interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }, 800);
    } else {
      setCurrentImageIndex(0);
    }
    return () => clearInterval(interval);
  }, [isHovered, images.length]);

  return (
    <Link href={`/product/${product._id}`} className="group block">
      <div 
        className="relative bg-gray-100 aspect-[3/4] overflow-hidden mb-4 rounded-lg shadow-sm"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img 
          src={images[currentImageIndex] || "https://via.placeholder.com/300"} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Debug/Counter Badge - Shows how many images exist */}
        {images.length > 1 && (
           <div className="absolute top-2 right-2 bg-brand-red text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-md">
             {images.length} ANGLES
           </div>
        )}
      </div>

      <div>
        {/* UPDATED TEXT COLORS FOR VISIBILITY */}
        <h3 className="text-sm font-extrabold uppercase tracking-wide text-gray-900 group-hover:text-brand-red transition-colors">
          {product.name}
        </h3>
        <p className="text-sm font-bold text-brand-red mt-1">R {product.price}</p>
      </div>
    </Link>
  );
}