"use client";

import React, { useState } from "react";
import { BsCart, BsSearch, BsList, BsX } from "react-icons/bs";
import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";
import CartModal from "../components/ui/CartModal";

function Header() {
  const { cart } = useCart();
  const [searchTerm, setSearchTerm] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
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
        {/* Logo */}
        <a href="/" className="text-2xl font-bold text-white">
          <img
            src="https://glowyskinshop.com/cdn/shop/files/Untitled_design_44_110x.png?v=1704640845"
            className="h-14"
            alt="Logo"
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          <a href="/content-editor" className="text-white hover:text-yellow hover:underline">
            Content Editor
          </a>
          <a href="/home" className="text-white hover:text-yellow hover:underline">
            Home
          </a>
          <a href="#" className="text-white hover:text-yellow hover:underline">
            About
          </a>
        </nav>

        {/* Search & Cart (Visible on all screens) */}
        <div className="flex items-center gap-4">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="px-4 py-2 rounded-md border text-gray-700 w-48 md:w-80"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="absolute right-2 top-3 text-gray-600">
              <BsSearch />
            </button>
          </form>

          {/* Cart */}
          <CartModal />

          {/* Burger Menu Button (Only on Mobile) */}
          <button
            className="md:hidden text-white text-2xl"
            onClick={() => setMenuOpen(true)}
          >
            <BsList />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setMenuOpen(false)}
          ></div>

          {/* Sidebar */}
          <div className="fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out translate-x-0">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-gray-600 text-2xl"
              onClick={() => setMenuOpen(false)}
            >
              <BsX />
            </button>

            {/* Navigation Links */}
            <nav className="flex flex-col items-start p-6 space-y-4 mt-10">
              <a href="/content-editor" className="text-gray-800 text-lg hover:text-peach">
                Content Editor
              </a>
              <a href="/home" className="text-gray-800 text-lg hover:text-peach">
                Home
              </a>
              <a href="#" className="text-gray-800 text-lg hover:text-peach">
                About
              </a>
            </nav>
          </div>
        </>
      )}
    </header>
  );
}

export default Header;
