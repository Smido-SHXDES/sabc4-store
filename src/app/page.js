import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';

// This function runs on the server every time someone visits the site
//'https://sabc4-api-recs.onrender.com/api/products'
async function getProducts() {
  // 👇 switch
  const res = await fetch('https://sabc4-api-recs.onrender.com/api/products', {
    cache: 'no-store'
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
 
  return res.json();
}

export default async function Home() {
  // Call the function to get data
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* HERO SECTION */}
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
            Summer Collection 2025
          </h2>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tighter mb-8">
            OWN YOUR STYLE
          </h1>
          <button className="bg-white text-black px-10 py-4 text-sm font-bold uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all duration-300">
            Shop Now
          </button>
        </div>
      </section>

      {/* LIVE PRODUCT GRID */}
      <section className="py-20 px-4 md:px-8">
        <h3 className="text-3xl font-extrabold mb-8 uppercase tracking-tight text-brand-red">
          Latest Drops
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {products.map((product) => (
            // We pass the database ID (which is _id in MongoDB)
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}