import "./globals.css";

import { CartProvider } from "../context/CartContext";

export const metadata = {
  title: "Food Delivery App",
  description: "Modern Food Ordering Platform",
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}