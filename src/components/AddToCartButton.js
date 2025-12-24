'use client';
import { useState } from 'react';

export default function AddToCartButton({ product }) {
  const [loading, setLoading] = useState(false);

  // 👇 This is the function that was missing!
  function handleAddToCart() {
    setLoading(true);

    // TODO: In the future, we will save this to a real Global Cart.
    // For now, we simulate the action to prevent crashing.
    console.log("Adding to cart:", product.name);

    setTimeout(() => {
      // Optional: You can replace this alert with a small toast notification later
      setLoading(false);
    }, 500);
  }

  return (
    <button 
      onClick={handleAddToCart}
      disabled={loading}
      //  SABC4 Brand Red styling
      className="w-full bg-brand-red text-white font-bold uppercase tracking-widest py-4 rounded-full hover:bg-brand-dark transition-transform active:scale-95 disabled:opacity-70"
    >
      {loading ? 'Adding...' : 'Add to Cart'}
    </button>
  );
}