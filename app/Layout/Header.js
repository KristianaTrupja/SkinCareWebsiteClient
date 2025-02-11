"use client"
 
import React from "react";
import { BsCart } from "react-icons/bs";
import { useCart  } from "../context/CartContext";
import CartModal from "../components/ui/CartModal";
function Header() {
  const { cart } = useCart();
console.log(cart,"cartHeader");

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

        </nav>
 <CartModal />
        {/* Mobile Menu Button */}
        <button className="block text-white md:hidden">
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}

export default Header;
