'use client';
import Navbar from '../../components/Navbar';
import { useCart } from '../../context/CartContext';
import Link from 'next/link';
import { TrashIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

  // SHIPPING LOGIC: Restored and maintained
  const shippingCost = cartTotal >= 1000 ? 0 : 150;
  const grandTotal = cartTotal + shippingCost;

  return (
    <main className="min-h-screen bg-white pb-20 flex flex-col">
      <Navbar />

      <div className="pt-32 flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* RESTORED: Back to Store Button */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/shop" className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-brand-red transition-colors uppercase tracking-wide">
            <ArrowLeftIcon className="w-4 h-4" />
            Back to Catalog
          </Link>
        </div>

        <h1 className="text-4xl font-extrabold uppercase tracking-tight text-brand-red mb-10">
          Your Bag
        </h1>

        {cart.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-300">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Your bag is empty</h2>
            <Link href="/" className="inline-block bg-brand-red text-white px-8 py-3 uppercase font-bold text-sm rounded-full hover:bg-brand-dark transition-colors">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* LEFT: Items */}
            <div className="lg:col-span-2 space-y-6">
              {cart.map((item) => (
                <div key={`${item._id}-${item.selectedSize}`} className="flex gap-6 border-b border-gray-100 pb-6 hover:bg-gray-50 transition-colors p-4 rounded-lg">
                  {/* Image Container with Fallback Logic */}
                  <div className="w-24 h-32 bg-gray-100 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img 
                      src={item.images && item.images.length > 0 ? item.images[0] : (item.image || "https://via.placeholder.com/300")} 
                      alt={item.name} 
                      className="w-full h-full object-cover" 
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-bold uppercase text-gray-900">{item.name}</h3>
                        <p className="font-bold text-brand-red">R {item.price * item.quantity}</p>
                      </div>
                      <p className="text-sm text-gray-600 font-medium mt-1">Size: {item.selectedSize}</p>
                    </div>

                    <div className="flex justify-between items-end mt-4">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-gray-300 rounded bg-white">
                        <button 
                          onClick={() => updateQuantity(item._id, item.selectedSize, -1)}
                          className="px-3 py-1 hover:bg-gray-100 text-gray-600 font-bold"
                        >-</button>
                        <span className="px-3 text-sm font-bold text-gray-900">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item._id, item.selectedSize, 1)}
                          className="px-3 py-1 hover:bg-gray-100 text-gray-600 font-bold"
                        >+</button>
                      </div>

                      {/* Remove Button functionality maintained using item._id */}
                      <button 
                        onClick={() => removeFromCart(item._id, item.selectedSize)}
                        className="text-xs text-gray-400 hover:text-red-600 transition-colors uppercase font-bold flex items-center gap-1"
                      >
                        <TrashIcon className="w-4 h-4" /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* RIGHT: Summary */}
            <div className="bg-gray-50 p-8 h-fit rounded-xl border border-gray-100">
              <h2 className="text-xl font-extrabold uppercase mb-6 text-brand-red">Order Summary</h2>
              
              <div className="space-y-4 text-sm mb-6 border-b border-gray-200 pb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600 font-medium">Subtotal</span>
                  <span className="font-bold text-gray-900">R {cartTotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 font-medium">Shipping</span>
                  <span className={shippingCost === 0 ? "text-brand-red font-bold" : "font-bold text-gray-900"}>
                    {shippingCost === 0 ? "Free" : `R ${shippingCost}`}
                  </span>
                </div>
              </div>

              <div className="flex justify-between text-lg font-extrabold mb-8 text-gray-900">
                <span>Total</span>
                <span>R {grandTotal}</span>
              </div>

              <Link href="/checkout">
                <button className="w-full bg-brand-red text-white py-4 uppercase font-bold tracking-widest rounded-full hover:bg-brand-dark transition-transform active:scale-95 shadow-lg">
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