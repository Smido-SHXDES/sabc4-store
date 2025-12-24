import { Toaster } from 'react-hot-toast'; 
import { CartProvider } from '../context/CartContext';
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Toaster position="bottom-right" reverseOrder={false} />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}