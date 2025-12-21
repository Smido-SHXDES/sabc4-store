'use client';
import { useState } from 'react';

export function ProductGallery({ images }) {
  const [activeImage, setActiveImage] = useState(images[0]);

  return (
    <div className="flex flex-col gap-4">
      {/* Main Big Image */}
      <div className="bg-gray-100 aspect-[3/4] rounded-lg overflow-hidden">
        <img 
          src={activeImage} 
          className="w-full h-full object-cover" 
          alt="Product Detail" 
        />
      </div>

      {/* Thumbnails Row */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {images.map((img, index) => (
          <button 
            key={index}
            onClick={() => setActiveImage(img)}
            className={`w-20 h-20 flex-shrink-0 rounded-md overflow-hidden border-2 transition-all ${
              activeImage === img ? 'border-black opacity-100' : 'border-transparent opacity-60 hover:opacity-100'
            }`}
          >
            <img src={img} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}