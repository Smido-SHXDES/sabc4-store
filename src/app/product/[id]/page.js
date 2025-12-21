import Navbar from '../../../components/Navbar';
import { ProductGallery } from '../../../components/ProductGallery';
import ProductInfo from '../../../components/ProductInfo'; 
import Link from 'next/link';

async function getProduct(id) {
  // Switch to https://sabc4-api-recs.onrender.com/api/products/${id} when ready for live
  const res = await fetch(`https://sabc4-api-recs.onrender.com/api/products/${id}`, {
    cache: 'no-store'
  });

  if (!res.ok) return null;
  return res.json();
}

export default async function ProductPage({ params }) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) return <div>Product Not Found</div>;

  return (
    <main className="min-h-screen bg-white pb-20">
      <Navbar />
      
      <div className="pt-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-xs font-bold uppercase text-gray-400 hover:text-brand-red mb-8 inline-block">
          ← Back to Shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* LEFT: Images */}
          <ProductGallery images={product.images || [product.image]} />

          {/* RIGHT: Info, Price, Sizes, & Cart Button */}
          {/* This component now handles EVERYTHING on the right side */}
          <ProductInfo product={product} />

        </div>
      </div>
    </main>
  );
}