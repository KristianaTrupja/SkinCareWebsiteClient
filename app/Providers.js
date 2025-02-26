"use client";

import { CartProvider } from "./context/CartContext";
import { useEffect, useState } from "react";
import { LoadingProvider } from "./context/LoadingContext";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Loader from "./components/ui/Loader";
import ScrollToTop from "./components/global/ScrollToTop";
export default function Providers({ children}) {
    const [user, setUser] = useState(null);

    useEffect(() => {
      // Retrieve user from localStorage
      const storedUser = localStorage.getItem("userId");
      if (storedUser) {
        try {
          setUser(storedUser);
        } catch (error) {
          console.error("Error parsing user data:", error);
        }
      }
    }, []);
  return (
    <CartProvider  user={user}>
      <LoadingProvider>
        <Header />
        <Loader />
        <ScrollToTop />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </LoadingProvider>
    </CartProvider>
  );
}
