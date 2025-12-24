'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useCart } from '../context/CartContext'; 

export default function Navbar() {
  const { cartCount } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="fixed w-full bg-white/95 backdrop-blur-md z-50 border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo & Brand Name */}
          <Link href="/" className="flex items-center gap-3 group">
            <img src="/logo.jpeg" alt="Logo" className="h-10 w-auto object-contain" />
            <span className="text-2xl font-extrabold tracking-tighter text-brand-red">SABC4</span>
          </Link>

          {/* Navigation Links Removed as requested */}
          
          <div className="flex items-center">
            <Link href="/cart" className="p-2 text-gray-900 hover:text-brand-red relative group">
              <ShoppingCartIcon className="h-6 w-6" />
              
              {mounted && cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[20px] h-5 px-1 text-[10px] font-black text-white bg-brand-red rounded-full ring-2 ring-white animate-in zoom-in duration-300">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
}