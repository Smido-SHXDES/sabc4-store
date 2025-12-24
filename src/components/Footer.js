import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12 border-t border-gray-900 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Brand */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-extrabold tracking-tighter text-brand-red">SABC4</h2>
          <p className="text-xs text-gray-500 mt-1">Impahla yase Jupiter.</p>
        </div>

        {/* Links - Only About Us remains */}
        <div className="flex gap-8 text-sm font-bold uppercase tracking-widest">
          <Link href="/about" className="hover:text-brand-red transition-colors">About Us</Link>
        </div>

        {/* Copyright */}
        <div className="text-xs text-gray-600">
          © {new Date().getFullYear()} SABC4 Store©. All rights reserved.
        </div>
      </div>
    </footer>
  );
}