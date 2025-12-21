"use client";
import { useState } from 'react';
import Navbar from '../../components/Navbar';
import { useCart } from '../../context/CartContext';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const router = useRouter();

  // Form State (Your original logic)
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    phone: ''
  });

  // Loading State
  const [isProcessing, setIsProcessing] = useState(false);

  // Logic: Calculate Shipping
  const shippingCost = cartTotal >= 1000 ? 0 : 150;
  const grandTotal = cartTotal + shippingCost;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // SIMULATE PAYMENT PROCESSING
    setTimeout(() => {
      setIsProcessing(false);
      clearCart();
      alert("Payment Successful! Your order has been placed.");
      router.push('/'); 
    }, 2000);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Your cart is empty</h2>
        <button onClick={() => router.push('/')} className="text-brand-red font-bold underline hover:text-brand-dark">
          Return to Shop
        </button>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white pb-20">
      <Navbar />

      <div className="pt-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* THEME UPDATE: Page Title */}
        <h1 className="text-3xl font-extrabold uppercase tracking-tight text-brand-red mb-8">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* LEFT COLUMN: Shipping Form */}
          <div className="bg-gray-50 p-8 rounded-xl border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold uppercase mb-6 text-gray-900">Shipping Details</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <label className="block text-xs font-bold uppercase text-gray-900 mb-1">Email Address</label>
                <input 
                  required
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  // THEME UPDATE: Focus border is now brand-red
                  className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red"
                  placeholder="john@example.com"
                />
              </div>

              {/* Names */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-900 mb-1">First Name</label>
                  <input 
                    required
                    type="text" 
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-900 mb-1">Last Name</label>
                  <input 
                    required
                    type="text" 
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red"
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-xs font-bold uppercase text-gray-900 mb-1">Address</label>
                <input 
                  required
                  type="text" 
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red"
                  placeholder="123 Vilakazi Street"
                />
              </div>

              {/* City & Code */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-900 mb-1">City</label>
                  <input 
                    required
                    type="text" 
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-900 mb-1">Postal Code</label>
                  <input 
                    required
                    type="text" 
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red"
                  />
                </div>
              </div>

              {/* Fake Payment Selector - UPDATED THEME */}
              <div className="pt-6 border-t border-gray-200 mt-6">
                <h3 className="text-sm font-bold uppercase mb-4 text-gray-900">Payment Method</h3>
                <div className="flex gap-4">
                    <div className="flex-1 border-2 border-brand-red bg-red-50 p-4 text-center font-bold text-sm cursor-pointer text-brand-red rounded-lg">
                        Credit / Debit Card
                    </div>
                    <div className="flex-1 border border-gray-200 p-4 text-center text-gray-400 text-sm cursor-not-allowed rounded-lg">
                        Instant EFT
                    </div>
                </div>
              </div>

              {/* Pay Button - UPDATED THEME */}
              <button 
                type="submit" 
                disabled={isProcessing}
                className="w-full bg-brand-red text-white py-4 uppercase font-bold tracking-widest rounded-full hover:bg-brand-dark transition-all disabled:bg-gray-400 disabled:cursor-not-allowed shadow-lg"
              >
                {isProcessing ? "Processing..." : `Pay R ${grandTotal}`}
              </button>
            </form>
          </div>

          {/* RIGHT COLUMN: Order Summary */}
          <div className="h-fit bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="text-lg font-bold uppercase mb-6 border-b pb-4 text-brand-red">In Your Bag</h3>
            <div className="space-y-4 mb-6">
                {cart.map((item) => (
                    <div key={`${item.id}-${item.selectedSize}`} className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden border border-gray-200">
                                <img src={item.image} className="w-full h-full object-cover"/>
                            </div>
                            <div>
                                <p className="font-bold text-gray-900">{item.name}</p>
                                <p className="text-gray-500 text-xs">Size: {item.selectedSize} | Qty: {item.quantity}</p>
                            </div>
                        </div>
                        <p className="font-bold text-gray-900">R {item.price * item.quantity}</p>
                    </div>
                ))}
            </div>
            
            <div className="border-t pt-4 space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>R {cartTotal}</span>
                </div>
                <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className={shippingCost === 0 ? "text-brand-red font-bold" : ""}>
                        {shippingCost === 0 ? "Free" : `R ${shippingCost}`}
                    </span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-4 border-t mt-4 text-gray-900">
                    <span>Total</span>
                    <span className="text-brand-red">R {grandTotal}</span>
                </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}