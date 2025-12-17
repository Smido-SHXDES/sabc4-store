"use client";
import { useState } from 'react';
import Navbar from '../../components/Navbar';
import { useCart } from '../../context/CartContext';
import { useRouter } from 'next/navigation'; // To redirect after purchase

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const router = useRouter();

  // Form State
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    phone: ''
  });

  // Loading State for the "Payment"
  const [isProcessing, setIsProcessing] = useState(false);

  // Calculate Shipping again here to be safe
  const shippingCost = cartTotal >= 1000 ? 0 : 150;
  const grandTotal = cartTotal + shippingCost;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // SIMULATE PAYMENT PROCESSING (Wait 2 seconds)
    setTimeout(() => {
      setIsProcessing(false);
      clearCart(); // Empty the bag
      alert("Payment Successful! Your order has been placed.");
      router.push('/'); // Send them back to Home
    }, 2000);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <button onClick={() => router.push('/')} className="text-red-600 font-bold underline">
          Return to Shop
        </button>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      <Navbar />

      <div className="pt-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* LEFT COLUMN: Shipping Form */}
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold uppercase mb-6">Shipping Details</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Email Address</label>
                <input 
                  required
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:border-black"
                  placeholder="john@example.com"
                />
              </div>

              {/* Names */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 mb-1">First Name</label>
                  <input 
                    required
                    type="text" 
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Last Name</label>
                  <input 
                    required
                    type="text" 
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Address</label>
                <input 
                  required
                  type="text" 
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:border-black"
                  placeholder="123 Vilakazi Street"
                />
              </div>

              {/* City & Code */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 mb-1">City</label>
                  <input 
                    required
                    type="text" 
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Postal Code</label>
                  <input 
                    required
                    type="text" 
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              {/* Fake Payment Selector */}
              <div className="pt-6 border-t border-gray-200 mt-6">
                <h3 className="text-sm font-bold uppercase mb-4">Payment Method</h3>
                <div className="flex gap-4">
                    <div className="flex-1 border border-black bg-gray-50 p-4 text-center font-bold text-sm cursor-pointer">
                        Credit / Debit Card
                    </div>
                    <div className="flex-1 border border-gray-200 p-4 text-center text-gray-400 text-sm cursor-not-allowed">
                        Instant EFT
                    </div>
                </div>
              </div>

              {/* Pay Button */}
              <button 
                type="submit" 
                disabled={isProcessing}
                className="w-full bg-black text-white py-4 uppercase font-bold tracking-widest hover:bg-green-600 transition-colors disabled:bg-gray-400"
              >
                {isProcessing ? "Processing..." : `Pay R ${grandTotal}`}
              </button>
            </form>
          </div>

          {/* RIGHT COLUMN: Order Summary */}
          <div className="h-fit bg-white p-8 rounded-lg shadow-sm">
            <h3 className="text-lg font-bold uppercase mb-6 border-b pb-4">In Your Bag</h3>
            <div className="space-y-4 mb-6">
                {cart.map((item) => (
                    <div key={`${item.id}-${item.selectedSize}`} className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden">
                                <img src={item.image} className="w-full h-full object-cover"/>
                            </div>
                            <div>
                                <p className="font-bold">{item.name}</p>
                                <p className="text-gray-500 text-xs">Size: {item.selectedSize} | Qty: {item.quantity}</p>
                            </div>
                        </div>
                        <p className="font-medium">R {item.price * item.quantity}</p>
                    </div>
                ))}
            </div>
            
            <div className="border-t pt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>R {cartTotal}</span>
                </div>
                <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className={shippingCost === 0 ? "text-green-600" : ""}>
                        {shippingCost === 0 ? "Free" : `R ${shippingCost}`}
                    </span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t mt-2">
                    <span>Total</span>
                    <span>R {grandTotal}</span>
                </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}