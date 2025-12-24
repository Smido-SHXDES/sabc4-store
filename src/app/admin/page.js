'use client';
import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import { toast } from 'react-hot-toast';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [customCategory, setCustomCategory] = useState('T-Shirts');

  // --- 1. THE GATEKEEPER LOGIC ---
  const handleLogin = (e) => {
    e.preventDefault();
    const securePass = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;
    console.log("System Key:", securePass);

    if (passwordInput === securePass) {
      setIsAuthenticated(true);
      toast.success('ACCESS GRANTED: ADMIN MODE ACTIVE', {
        style: { background: '#000', color: '#fff', fontSize: '10px', fontWeight: '900' }
      });
    } else {
      toast.error('ACCESS DENIED: INVALID KEY', {
        style: { background: '#CC0000', color: '#fff', fontSize: '10px', fontWeight: '900' }
      });
    }
  };

  // --- 2. EXISTING INVENTORY LOGIC ---
  async function fetchProducts() {
    const res = await fetch('https://sabc4-api-recs.onrender.com/api/products');
    const data = await res.json();
    setProducts(data);
  }

  useEffect(() => {
    if (isAuthenticated) {
      fetchProducts();
    }
  }, [isAuthenticated]);

  async function handleDelete(id) {
    if(!window.confirm("ARE YOU SURE?")) return;
    try {
      const res = await fetch(`https://sabc4-api-recs.onrender.com/api/products/${id}`, { method: 'DELETE' });
      if (res.ok) {
        toast.error('ITEM REMOVED');
        fetchProducts(); 
      }
    } catch (err) { toast.error('ERROR'); }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const formData = new FormData(form);
    try {
      const res = await fetch('https://sabc4-api-recs.onrender.com/api/products', { method: 'POST', body: formData });
      if (res.ok) {
        toast.success('PRODUCT LAUNCHED');
        form.reset();
        fetchProducts(); 
      }
    } catch (error) { toast.error('NETWORK ERROR'); } finally { setLoading(false); }
  }

  // --- 3. THE LOGIN UI ---
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="max-w-md w-full border-2 border-brand-red p-8 bg-black shadow-[0_0_20px_rgba(204,0,0,0.3)]">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-black text-brand-red uppercase tracking-widest mb-2">Admin Terminal</h2>
            <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.3em]">Identity Verification Required</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <input 
              type="password" 
              placeholder="ENTER PASSCODE..." 
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              className="w-full bg-gray-900 border border-gray-800 p-4 text-white font-mono text-center focus:border-brand-red outline-none transition-all placeholder:text-gray-700"
            />
            <button className="w-full bg-brand-red text-white py-4 font-black uppercase tracking-[0.4em] text-xs hover:bg-white hover:text-black transition-all">
              Login
            </button>
          </form>
        </div>
      </main>
    );
  }

  // --- 4. THE PROTECTED ADMIN UI (Your original code) ---
  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      <Navbar />
      <div className="pt-32 max-w-4xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* ... Your existing Add Product Form and Inventory List ... */}
        {/* (All the code for adding and listing products goes here) */}
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-extrabold mb-6 text-brand-red uppercase tracking-tight">Add New Product</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-black uppercase text-gray-900 mb-1 tracking-widest">Product Name</label>
              <input name="name" required placeholder="e.g. Vintage Arcade Tee" className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 font-medium placeholder-gray-400 focus:border-brand-red outline-none transition-all" />
            </div>
            {/* ... keep the rest of your form fields from your previous working code ... */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-black uppercase text-gray-900 mb-1 tracking-widest">Price (R)</label>
                <input name="price" required type="number" placeholder="450" className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 font-bold placeholder-gray-400 focus:border-brand-red outline-none transition-all" />
              </div>
              <div>
                <label className="block text-xs font-black uppercase text-gray-900 mb-1 tracking-widest">Category</label>
                <input name="category" list="category-suggestions" value={customCategory} onChange={(e) => setCustomCategory(e.target.value)} placeholder="Type/Select..." className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 font-bold placeholder-gray-400 focus:border-brand-red outline-none transition-all" required />
                <datalist id="category-suggestions">
                  <option value="T-Shirts" /><option value="Hoodies" /><option value="Pants" /><option value="Caps" /><option value="Accessories" />
                </datalist>
              </div>
            </div>
            <div>
              <label className="block text-xs font-black uppercase text-gray-900 mb-1 tracking-widest">Description</label>
              <textarea name="description" required rows="3" placeholder="Describe the fit..." className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 font-medium placeholder-gray-400 focus:border-brand-red outline-none transition-all"></textarea>
            </div>
            <div>
              <label className="block text-xs font-black uppercase text-gray-900 mb-1 tracking-widest">Available Sizes</label>
              <input name="sizes" defaultValue="S,M,L,XL" className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 font-bold focus:border-brand-red outline-none transition-all" />
            </div>
            <div>
              <label className="block text-xs font-black uppercase text-brand-red mb-1 tracking-widest">Launch Media (Max 5)</label>
              <input name="images" required type="file" multiple accept="image/*" className="w-full p-3 border-2 border-dashed border-gray-200 rounded-lg bg-gray-50 text-xs font-bold text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-brand-red file:text-white" />
            </div>
            <button disabled={loading} className="w-full bg-brand-red text-white font-black py-4 rounded-xl hover:bg-brand-dark transition-all disabled:opacity-50 uppercase tracking-[0.2em] text-xs shadow-xl shadow-red-900/20 active:scale-95">
              {loading ? 'Processing Drop...' : 'Launch Product'}
            </button>
          </form>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit">
          <h2 className="text-xl font-extrabold mb-6 text-brand-red uppercase tracking-tight">Current Inventory</h2>
          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-brand-red scrollbar-track-gray-100">
            {products.map((p) => (
              <div key={p._id} className="flex items-center gap-4 p-3 border border-gray-100 rounded hover:bg-gray-50 transition-colors">
                <div className="w-12 h-12 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                  <img src={p.images && p.images.length > 0 ? p.images[0] : (p.image || "https://via.placeholder.com/300")} className="w-full h-full object-cover" alt="" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-sm text-gray-900 truncate">{p.name}</h3>
                  <div className="flex gap-2">
                    <p className="text-xs text-brand-red font-bold tracking-tight">R {p.price}</p>
                    <p className="text-[9px] text-gray-400 font-black uppercase px-2 py-0.5 border border-gray-200 rounded-full tracking-widest">{p.category}</p>
                  </div>
                </div>
                <button onClick={() => handleDelete(p._id)} className="text-gray-300 hover:text-brand-red transition-colors p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" /></svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}