'use client';
import Link from 'next/link';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useCart } from '../context/CartContext'; 

export default function Navbar() {
  const { cartCount } = useCart();

  return (
    <nav className="fixed w-full bg-white/95 backdrop-blur-md z-50 border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* LOGO & BRAND NAME */}
          <Link href="/" className="flex items-center gap-3 group">
            {/* The Image */}
            <img 
              src="/logo.jpeg" 
              alt="SABC4 Logo" 
              className="h-10 w-auto object-contain transition-transform group-hover:scale-105" 
            />
            
            {/* The Text */}
            <span className="text-2xl font-extrabold tracking-tighter text-brand-red group-hover:opacity-80 transition-opacity">
              SABC4
            </span>
          </Link>
          
          {/* NAVIGATION LINKS */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-sm font-bold text-gray-900 hover:text-brand-red transition-colors uppercase tracking-wide">
              Shop
            </Link>
            <Link href="/about" className="text-sm font-bold text-gray-900 hover:text-brand-red transition-colors uppercase tracking-wide">
              About
            </Link>
          </div>

          {/* CART ICON & BADGE */}
          <div className="flex items-center">
            <Link href="/cart" className="p-2 text-gray-900 hover:text-brand-red transition-colors relative">
              <ShoppingCartIcon className="h-6 w-6" />
              
              {/* Red Badge Logic */}
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-5 h-5 text-[10px] font-bold text-white bg-brand-red rounded-full ring-2 ring-white">
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