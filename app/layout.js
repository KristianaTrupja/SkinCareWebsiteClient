import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import { CartProvider } from "./context/CartContext";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={outfit.className}>
      <CartProvider>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
