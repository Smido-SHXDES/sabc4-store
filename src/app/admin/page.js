'use client';
import { useState } from 'react';
import Navbar from '../../components/Navbar';

export default function AdminPage() {
  const [loading, setLoading] = useState(false);
  
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const formData = new FormData(form);

    try {
      const res = await fetch('https://sabc4-api-recs.onrender.com/api/products', {
        method: 'POST',
        body: formData, // We send the raw form data (including the file)
      });

      if (res.ok) {
        alert('✅ Product Created Successfully!');
        form.reset(); // Clear the form
      } else {
        const errorData = await res.json();
        alert('❌ Error: ' + errorData.message);
      }
    } catch (error) {
      alert('❌ Network Error: Is the backend running?');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      <Navbar />
      
      <div className="pt-32 max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard 🛠️</h1>
        
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
          <h2 className="text-xl font-semibold mb-6">Add New Product</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Product Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
              <input name="name" required type="text" className="w-full p-3 border rounded-lg" placeholder="e.g. SABC4 Heritage Tee" />
            </div>

            {/* Price & Category Row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price (R)</label>
                <input name="price" required type="number" className="w-full p-3 border rounded-lg" placeholder="450" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select name="category" className="w-full p-3 border rounded-lg bg-white">
                  <option>T-Shirts</option>
                  <option>Hoodies</option>
                  <option>Pants</option>
                  <option>Accessories</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea name="description" required rows="3" className="w-full p-3 border rounded-lg" placeholder="Describe the fit and fabric..."></textarea>
            </div>

            {/* Sizes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sizes (comma separated)</label>
              <input name="sizes" type="text" className="w-full p-3 border rounded-lg" defaultValue="S,M,L,XL" />
            </div>

            {/* IMAGE UPLOAD */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
              <input name="image" required type="file" accept="image/*" className="w-full p-3 border border-dashed rounded-lg bg-gray-50" />
            </div>

            {/* Submit Button */}
            <button 
              disabled={loading}
              type="submit" 
              className="w-full bg-black text-white font-bold py-4 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
            >
              {loading ? 'Uploading to Cloud...' : '🚀 Launch Product'}
            </button>

          </form>
        </div>
      </div>
    </main>
  );
}