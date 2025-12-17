"use client"; // This tells Next.js this component needs interactivity
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';

export default function Navbar() {
    const { totalItems } = useCart();
  const [scrolled, setScrolled] = useState(false);

  // Detect scroll to change background from transparent to white
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-md text-black' : 'bg-transparent text-black'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-extrabold tracking-widest uppercase cursor-pointer">
              SABC4
            </h1>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-sm font-bold uppercase tracking-wide hover:text-red-600 transition-colors">
              New Arrivals
            </Link>
            <Link href="/" className="text-sm font-bold uppercase tracking-wide hover:text-red-600 transition-colors">
              Apparel
            </Link>
            <Link href="/" className="text-sm font-bold uppercase tracking-wide hover:text-red-600 transition-colors">
              Accessories
            </Link>
          </div>

          {/* Icons (Placeholder for Cart) */}
          <div className="flex items-center space-x-4">
            <Link href="/cart">
            <button className="text-sm font-bold uppercase hover:text-red-600">
              Cart ({totalItems})
            </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}