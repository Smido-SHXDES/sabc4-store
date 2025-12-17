"use client";
import Navbar from '../../components/Navbar';
import { useCart } from '../../context/CartContext';
import Link from 'next/link';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

  // SHIPPING LOGIC: Free if over R1000, otherwise R150
  const shippingCost = cartTotal >= 1000 ? 0 : 150;
  
  // Final Grand Total
  const grandTotal = cartTotal + shippingCost;

  return (
    <main className="min-h-screen bg-white pb-20">
      <Navbar />

      <div className="pt-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold uppercase tracking-wide mb-10">
          Your Bag
        </h1>

        {cart.length === 0 ? (
          // EMPTY STATE
          <div className="text-center py-20 bg-gray-50 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Your bag is empty</h2>
            <Link href="/" className="inline-block bg-black text-white px-8 py-3 uppercase font-bold text-sm hover:bg-red-600 transition-colors">
              Start Shopping
            </Link>
          </div>
        ) : (
          // CART GRID
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* LEFT COLUMN: Cart Items */}
            <div className="lg:col-span-2 space-y-8">
              {cart.map((item) => (
                <div key={`${item.id}-${item.selectedSize}`} className="flex gap-6 border-b border-gray-200 pb-6">
                  {/* Image */}
                  <div className="w-24 h-32 bg-gray-100 flex-shrink-0 overflow-hidden rounded-md">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between">
                        <h3 className="text-lg font-bold uppercase">{item.name}</h3>
                        <p className="font-bold">R {item.price * item.quantity}</p>
                      </div>
                      <p className="text-sm text-gray-500">Size: {item.selectedSize}</p>
                    </div>

                    {/* Quantity & Remove */}
                    <div className="flex justify-between items-end">
                      <div className="flex items-center border border-gray-300">
                        <button 
                          onClick={() => updateQuantity(item.id, item.selectedSize, -1)}
                          className="px-3 py-1 hover:bg-gray-100"
                        >-</button>
                        <span className="px-3 text-sm font-bold">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.selectedSize, 1)}
                          className="px-3 py-1 hover:bg-gray-100"
                        >+</button>
                      </div>

                      <button 
                        onClick={() => removeFromCart(item.id, item.selectedSize)}
                        className="text-xs text-red-500 hover:text-red-700 underline uppercase font-bold"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* RIGHT COLUMN: Summary */}
<div className="bg-gray-50 p-8 h-fit rounded-lg">
  <h2 className="text-xl font-bold uppercase mb-6">Order Summary</h2>
  
  <div className="space-y-4 text-sm mb-6 border-b border-gray-300 pb-6">
    <div className="flex justify-between">
      <span className="text-gray-600">Subtotal</span>
      <span className="font-bold">R {cartTotal}</span>
    </div>
    
    {/* DYNAMIC SHIPPING DISPLAY */}
    <div className="flex justify-between">
      <span className="text-gray-600">Shipping</span>
      <span className={shippingCost === 0 ? "text-green-600 font-bold" : "font-bold"}>
        {shippingCost === 0 ? "Free" : `R ${shippingCost}`}
      </span>
    </div>

    {/* Message telling them how much more to spend for free shipping */}
    {shippingCost > 0 && (
      <div className="text-xs text-red-500 italic">
        Spend R {1000 - cartTotal} more for free shipping!
      </div>
    )}
  </div>

  <div className="flex justify-between text-lg font-extrabold mb-8">
    <span>Total</span>
    {/* Use grandTotal here instead of cartTotal */}
    <span>R {grandTotal}</span>
  </div>


<Link href="/checkout">
  <button className="w-full bg-black text-white py-4 uppercase font-bold tracking-widest hover:bg-green-600 transition-colors">
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