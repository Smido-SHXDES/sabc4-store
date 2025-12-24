"use client";
import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast'; // Added toast

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const savedCart = localStorage.getItem('sabc4-cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('sabc4-cart', JSON.stringify(cart));
    const total = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    setCartCount(total);
  }, [cart]);

  const addToCart = (product, size) => {

    toast.success(`${product.name} (${size}) ADDED TO BAG`, {
      duration: 5000,
        style: {
          border: '2px solid #CC0000',
          padding: '16px',
          color: '#000000',
          background: '#FFFFFF',
          fontSize: '10px',
          fontWeight: '900',
          borderRadius: '0px',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        },
        iconTheme: {
          primary: '#CC0000',
          secondary: '#fff',
        },
      });
    setCart((prevCart) => {
      const existingItem = prevCart.find(item => item._id === product._id && item.selectedSize === size);
      if (existingItem) {
        return prevCart.map(item => 
          (item._id === product._id && item.selectedSize === size)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, selectedSize: size, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId, size) => {
    setCart(prevCart => prevCart.filter(item => !(item._id === productId && item.selectedSize === size)));
  };

  const clearCart = () => setCart([]);

  const updateQuantity = (productId, size, amount) => {
    setCart(prevCart => prevCart.map(item => {
      if (item._id === productId && item.selectedSize === size) {
        const newQuantity = Math.max(1, (item.quantity || 1) + amount);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}