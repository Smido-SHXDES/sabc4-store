'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import ProductCard from '../../components/ProductCard';
import Footer from '../../components/Footer';
import { MagnifyingGlassIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [categories, setCategories] = useState(['All']);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(8);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('https://sabc4-api-recs.onrender.com/api/products');
        const data = await res.json();
        setProducts(data);
        setFilteredProducts(data);
        const rawCategories = data.map(p => p.category).filter(Boolean);
        const uniqueCategories = ['All', ...new Set(rawCategories)];
        setCategories(uniqueCategories);
        setLoading(false);
      } catch (error) {
        console.error("Fetch error:", error);
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  useEffect(() => {
    let result = products;
    if (activeCategory !== 'All') {
      result = result.filter(p => p.category === activeCategory);
    }
    if (searchQuery) {
      result = result.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    setFilteredProducts(result);
    setVisibleCount(8); 
  }, [activeCategory, searchQuery, products]);

  return (
    <main className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-grow">
        
        {/* NEW: Back to Home Button */}
        <div className="mb-8">
          <Link href="/" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-brand-red transition-colors">
            <ArrowLeftIcon className="w-4 h-4" />
            Back to Home
          </Link>
        </div>

        {/* HEADER & SEARCH BAR */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tighter text-gray-900 mb-2">
              The <span className="text-brand-red">Catalog</span>
            </h1>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Select your level</p>
          </div>

          <div className="relative w-full md:w-80">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input 
              type="text"
              placeholder="SEARCH GEAR..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              /* UPDATED: text-gray-900 and placeholder-gray-500 for high visibility */
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-xs font-black uppercase tracking-widest text-gray-900 placeholder-gray-500 focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all"
            />
          </div>
        </div>

        {/* CATEGORY FILTERS */}
        <div className="flex flex-wrap gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-md text-[10px] font-black uppercase tracking-[0.15em] transition-all border ${
                activeCategory === cat
                  ? 'bg-brand-red border-brand-red text-white shadow-lg'
                  : 'bg-white border-gray-200 text-gray-400 hover:border-brand-red hover:text-brand-red'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* PRODUCT GRID */}
        {loading ? (
          <div className="text-center py-20 text-xs font-black uppercase tracking-widest text-brand-red">
            Loading Arcade Data...
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-32 border-2 border-dashed border-gray-100 rounded-3xl">
            <p className="text-gray-400 text-xs font-black uppercase tracking-[0.2em]">No results found</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
              {filteredProducts.slice(0, visibleCount).map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>

            {/* LOAD MORE BUTTON */}
            {visibleCount < filteredProducts.length && (
              <div className="mt-20 text-center">
                <button 
                  onClick={() => setVisibleCount(prev => prev + 8)}
                  className="px-12 py-4 bg-black text-white text-xs font-black uppercase tracking-[0.3em] hover:bg-brand-red transition-all shadow-2xl active:scale-95 rounded-sm"
                >
                  Load More Gear +
                </button>
                <p className="mt-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  Showing {visibleCount} of {filteredProducts.length} items
                </p>
              </div>
            )}
          </>
        )}
      </div>

      <Footer />
    </main>
  );
}