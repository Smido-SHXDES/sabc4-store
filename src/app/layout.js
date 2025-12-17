import { Inter } from "next/font/google"; // Keep your existing font import
import "./globals.css";
import { CartProvider } from "../context/CartContext"; // <--- IMPORT THIS

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SABC4 Store",
  description: "Authentic South African Apparel",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Wrap everything inside CartProvider */}
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}