'use client';
import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';

export default function AdminPage() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  // Fetch products so we can list/delete them
  async function fetchProducts() {
    // ⚠️ Replace with Render URL for Production
    // Use localhost:5000 if testing locally, or https://sabc4-api-recs.onrender.com/api/products for live
    const res = await fetch('https://sabc4-api-recs.onrender.com/api/products');
    const data = await res.json();
    setProducts(data);
  }

  // Load products on page load
  useEffect(() => {
    fetchProducts();
  }, []);

  async function handleDelete(id) {
    if(!confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`https://sabc4-api-recs.onrender.com/api/products/${id}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        alert("✅ Deleted!");
        fetchProducts(); 
      } else {
        const errorText = await res.text();
        alert(`❌ Server Error: ${res.status} - ${errorText}`);
      }
    } catch (err) {
      alert(`❌ Network Error: ${err.message}`);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const formData = new FormData(form);

    try {
      const res = await fetch('https://sabc4-api-recs.onrender.com/api/products', {
        method: 'POST',
        body: formData, 
      });

      if (res.ok) {
        alert('✅ Product Created Successfully!');
        form.reset();
        fetchProducts(); 
      } else {
        const errorData = await res.json();
        alert('❌ Error: ' + errorData.message);
      }
    } catch (error) {
      alert('❌ Network Error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      <Navbar />
      
      <div className="pt-32 max-w-4xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* LEFT: CREATE FORM */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-extrabold mb-6 text-brand-red uppercase tracking-tight">Add New Product</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-xs font-bold uppercase text-gray-900 mb-1">Product Name</label>
                <input name="name" required placeholder="e.g. Vintage Arcade Tee" className="w-full p-2 border border-gray-300 rounded focus:border-brand-red focus:ring-1 focus:ring-brand-red outline-none" />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-900 mb-1">Price (R)</label>
                <input name="price" required type="number" placeholder="450" className="w-full p-2 border border-gray-300 rounded focus:border-brand-red outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-900 mb-1">Category</label>
                <select name="category" className="w-full p-2 border border-gray-300 rounded bg-white focus:border-brand-red outline-none">
                  <option>T-Shirts</option>
                  <option>Hoodies</option>
                  <option>Pants</option>
                  <option>Accessories</option>
                </select>
              </div>
            </div>

            <div>
                <label className="block text-xs font-bold uppercase text-gray-900 mb-1">Description</label>
                <textarea name="description" required rows="3" placeholder="Describe the fit and fabric..." className="w-full p-2 border border-gray-300 rounded focus:border-brand-red outline-none"></textarea>
            </div>

            <div>
                <label className="block text-xs font-bold uppercase text-gray-900 mb-1">Sizes</label>
                <input name="sizes" defaultValue="S,M,L,XL" className="w-full p-2 border border-gray-300 rounded focus:border-brand-red outline-none" />
            </div>
            
            {/* MULTI IMAGE INPUT */}
            <div>
              <label className="block text-xs font-bold uppercase text-brand-red mb-1">Upload Images (Max 5)</label>
              <input 
                name="images" 
                required 
                type="file" 
                multiple 
                accept="image/*" 
                className="w-full p-2 border border-dashed border-gray-300 rounded bg-gray-50 text-sm" 
              />
            </div>

            <button disabled={loading} className="w-full bg-brand-red text-white font-bold py-3 rounded hover:bg-brand-dark transition-colors disabled:opacity-50 uppercase tracking-wider">
              {loading ? 'Uploading...' : 'Launch Product'}
            </button>
          </form>
        </div>

        {/* RIGHT: INVENTORY LIST */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit">
          <h2 className="text-xl font-extrabold mb-6 text-brand-red uppercase tracking-tight">Current Inventory</h2>
          
          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-brand-red scrollbar-track-gray-100">
            {products.map((p) => (
              <div key={p._id} className="flex items-center gap-4 p-3 border border-gray-100 rounded hover:bg-gray-50 transition-colors">
                {/* Image Preview */}
                <div className="w-12 h-12 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                   <img 
                     src={p.images && p.images.length > 0 ? p.images[0] : p.image} 
                     className="w-full h-full object-cover" 
                   />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-sm text-gray-900 truncate">{p.name}</h3>
                  <p className="text-xs text-brand-red font-bold">R {p.price}</p>
                </div>
                
                <button 
                  onClick={() => handleDelete(p._id)}
                  className="text-gray-400 hover:text-red-600 transition-colors p-2"
                  title="Delete Product"
                >
                  {/* Trash Icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}