"use client";

import React, { useState } from "react";
import { BsCart, BsSearch } from "react-icons/bs";
import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";
import CartModal from "../components/ui/CartModal";

function Header() {
  const { cart } = useCart();
  const [searchTerm, setSearchTerm] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-peach px-6 py-4 shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Logo / Brand Name */}
        <a href="/" className="text-2xl font-bold text-white">
          <img
            src="https://glowyskinshop.com/cdn/shop/files/Untitled_design_44_110x.png?v=1704640845"
            className="h-14"
            alt="Logo"
          />
        </a>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="relative hidden md:flex">
          <input
            type="text"
            placeholder="Search products..."
            className="px-4 py-2 rounded-md border text-gray-700 w-80"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="absolute right-2 top-2 text-gray-600">
            <BsSearch />
          </button>
        </form>

        {/* Navigation */}
        <nav className="hidden space-x-6 md:flex md:items-center">
          <a href="/content-editor" className="text-white hover:text-yellow hover:underline">
            Content Editor
          </a>
          <a href="/home" className="text-white hover:text-yellow hover:underline">
            Home
          </a>
          <a href="#" className="text-white hover:text-yellow hover:underline">
            About
          </a>
          <CartModal/>
        </nav>
      </div>
    </header>
  );
}

export default Header;
