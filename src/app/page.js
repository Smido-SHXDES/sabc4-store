import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';
import Link from 'next/link';

async function getProducts() {
  try {
    const res = await fetch('https://sabc4-api-recs.onrender.com/api/products', {
      cache: 'no-store',
      next: { revalidate: 0 } 
    });

    if (!res.ok) return []; 
    return res.json();
  } catch (error) {
    console.error("Backend is waking up or unreachable:", error);
    return []; 
  }
}

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* HERO SECTION - Only place with Shop Now button */}
      <section className="relative h-screen w-full">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2070&auto=format&fit=crop" 
            alt="SABC4 Hero" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <h2 className="text-xl md:text-2xl font-bold text-white uppercase tracking-[0.2em] mb-4">
            Latest Drops 2025
          </h2>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tighter mb-8">
            OWN YOUR STYLE
          </h1>
          
          <Link href="/shop" className="bg-white text-black px-10 py-4 text-sm font-bold uppercase tracking-widest hover:bg-brand-red hover:text-white transition-all duration-300 rounded-full shadow-lg">
            Shop Now
          </Link>
        </div>
      </section>

   

      <Footer />
    </main>
  );
}