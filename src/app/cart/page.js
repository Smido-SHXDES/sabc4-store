"use client";
import Navbar from '../../components/Navbar';
import { useCart } from '../../context/CartContext';
import Link from 'next/link';
import { TrashIcon } from '@heroicons/react/24/outline'; // Added for better UI

export default function CartPage() {
  // We keep your exact logic here
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

  // SHIPPING LOGIC: Free if over R1000, otherwise R150
  const shippingCost = cartTotal >= 1000 ? 0 : 150;
  
  // Final Grand Total
  const grandTotal = cartTotal + shippingCost;

  return (
    <main className="min-h-screen bg-white pb-20">
      <Navbar />

      <div className="pt-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* THEME UPDATE: Header is now Brand Red */}
        <h1 className="text-4xl font-extrabold uppercase tracking-tight text-brand-red mb-10">
          Your Bag
        </h1>

        {cart.length === 0 ? (
          // EMPTY STATE - UPDATED THEME
          <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-300">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Your bag is empty</h2>
            <Link href="/" className="inline-block bg-brand-red text-white px-8 py-3 uppercase font-bold text-sm rounded-full hover:bg-brand-dark transition-colors">
              Start Shopping
            </Link>
          </div>
        ) : (
          // CART GRID
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* LEFT COLUMN: Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cart.map((item) => (
                <div key={`${item.id}-${item.selectedSize}`} className="flex gap-6 border-b border-gray-100 pb-6 hover:bg-gray-50 transition-colors p-4 rounded-lg">
                  {/* Image */}
                  <div className="w-24 h-32 bg-gray-100 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        {/* THEME UPDATE: Title is Dark, Price is Red */}
                        <h3 className="text-lg font-bold uppercase text-gray-900">{item.name}</h3>
                        <p className="font-bold text-brand-red">R {item.price * item.quantity}</p>
                      </div>
                      <p className="text-sm text-gray-600 font-medium mt-1">Size: {item.selectedSize}</p>
                    </div>

                    {/* Quantity & Remove */}
                    <div className="flex justify-between items-end mt-4">
                      <div className="flex items-center border border-gray-300 rounded bg-white">
                        <button 
                          onClick={() => updateQuantity(item.id, item.selectedSize, -1)}
                          className="px-3 py-1 hover:bg-gray-100 text-gray-600 font-bold"
                        >-</button>
                        <span className="px-3 text-sm font-bold text-gray-900">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.selectedSize, 1)}
                          className="px-3 py-1 hover:bg-gray-100 text-gray-600 font-bold"
                        >+</button>
                      </div>

                      <button 
                        onClick={() => removeFromCart(item.id, item.selectedSize)}
                        className="text-xs text-gray-400 hover:text-brand-red transition-colors uppercase font-bold flex items-center gap-1"
                      >
                        <TrashIcon className="w-4 h-4" /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* RIGHT COLUMN: Summary - UPDATED THEME */}
            <div className="bg-gray-50 p-8 h-fit rounded-xl border border-gray-100">
              <h2 className="text-xl font-extrabold uppercase mb-6 text-brand-red">Order Summary</h2>
              
              <div className="space-y-4 text-sm mb-6 border-b border-gray-200 pb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600 font-medium">Subtotal</span>
                  <span className="font-bold text-gray-900">R {cartTotal}</span>
                </div>
                
                {/* DYNAMIC SHIPPING DISPLAY */}
                <div className="flex justify-between">
                  <span className="text-gray-600 font-medium">Shipping</span>
                  <span className={shippingCost === 0 ? "text-brand-red font-bold" : "font-bold text-gray-900"}>
                    {shippingCost === 0 ? "Free" : `R ${shippingCost}`}
                  </span>
                </div>

                {/* Free shipping nudge */}
                {shippingCost > 0 && (
                  <div className="text-xs text-brand-red italic font-medium bg-red-50 p-2 rounded">
                    Spend R {1000 - cartTotal} more for free shipping!
                  </div>
                )}
              </div>

              <div className="flex justify-between text-lg font-extrabold mb-8 text-gray-900">
                <span>Total</span>
                <span>R {grandTotal}</span>
              </div>

              <Link href="/checkout" className="block w-full">
                <button className="w-full bg-brand-red text-white py-4 uppercase font-bold tracking-widest rounded-full hover:bg-brand-dark transition-transform active:scale-95 shadow-lg shadow-red-900/20">
                  Checkout
                </button>
              </Link>
            </div>

          </div>
        )}
      </div>
    </main>
  );
}