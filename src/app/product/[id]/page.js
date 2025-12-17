import Navbar from '../../../components/Navbar';
import AddToCartButton from '../../../components/AddToCartButton';
import Link from 'next/link';

// Fetch the specific product from the API
async function getProduct(id) {
  
  const res = await fetch(`https://sabc4-api-recs.onrender.com/api/products/${id}`, {
    cache: 'no-store'
  });

  if (!res.ok) {
    return null;
  }

  return res.json();
}

export default async function ProductPage({ params }) {
  // Unwrap params (Next.js 15 requirement)
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
        <h1 className="text-4xl font-bold mb-4">PRODUCT NOT FOUND</h1>
        <Link href="/" className="underline hover:text-red-500">Back to Store</Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white pb-20">
      <Navbar />
      
      <div className="pt-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-xs font-bold uppercase text-gray-400 hover:text-black mb-8 inline-block">
          ← Back to Shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Product Image */}
          <div className="bg-gray-100 aspect-[3/4] relative overflow-hidden rounded-lg">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-center">
            <span className="text-red-600 font-bold uppercase tracking-widest text-xs mb-2">
              {product.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold uppercase tracking-tight mb-4">
              {product.name}
            </h1>
            <p className="text-2xl font-bold mb-8">R {product.price}</p>
            
            <p className="text-gray-600 leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Smart Add Button */}
            <AddToCartButton product={product} />

            {/* Delivery Info */}
            <div className="mt-8 text-xs text-gray-500 space-y-2 border-t pt-8">
                <p>• Free delivery for orders over R1000</p>
                <p>• 14-day returns policy for South Africa</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}