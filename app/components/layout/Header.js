"use client";

import React, { useState } from "react";
import { BsCart, BsSearch, BsList, BsX, BsPencilSquare } from "react-icons/bs";
import { useCart } from "../../context/CartContext";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import CartModal from "../ui/CartModal";

function Header() {
  const { cart } = useCart();
  const [searchTerm, setSearchTerm] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  const navItems = [
    { name: "Home", path: "/home" },
    { name: "Makeup", path: "/makeup" },
    { name: "Aksesore", path: "/accessories" },
    { name: "Markat", path: "/brands" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-peach px-6 py-4 shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Logo */}
        <Link href="/home" className="text-2xl font-bold text-white">
          <img
            src="https://glowyskinshop.com/cdn/shop/files/Untitled_design_44_110x.png?v=1704640845"
            className="h-14"
            alt="Logo"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex space-x-6 items-center">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`relative px-3 py-2 text-white transition hover:text-yellow ${
                pathname === item.path
                  ? "text-yellow font-semibold after:absolute after:left-1/2 after:-bottom-2 after:-translate-x-1/2 after:border-t-[6px] after:border-x-[5px] after:border-x-transparent after:border-t-yellow"
                  : ""
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Search, Cart, and Content Editor Icon */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="px-4 py-2 rounded-md border text-gray-700 w-48 lg:w-80"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="absolute right-2 top-3 text-gray-600">
              <BsSearch />
            </button>
          </form>

          {/* Content Editor Icon (Placed beside Shopping Cart) */}
          <button
            onClick={() => router.push("/content-editor")}
            className="text-white text-2xl transition hover:text-yellow active:scale-90"
            aria-label="Content Editor"
          >
            <BsPencilSquare />
          </button>

          {/* Shopping Cart */}
          <CartModal />

          {/* Mobile Menu Button */}
          <button className="lg:hidden text-white text-2xl" onClick={() => setMenuOpen(true)}>
            <BsList />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <>
          {/* Overlay */}
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setMenuOpen(false)}></div>
          <div className="fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out">
            <button className="absolute top-4 right-4 text-gray-600 text-2xl" onClick={() => setMenuOpen(false)}>
              <BsX />
            </button>
            <nav className="flex flex-col items-start p-6 space-y-4 mt-10">
              {/* Content Editor Icon in Mobile Menu */}
              <button
                onClick={() => {
                  setMenuOpen(false);
                  router.push("/content-editor");
                }}
                className="text-gray-800 text-2xl hover:text-peach transition flex items-center gap-2"
              >
                <BsPencilSquare />
                <span>Content Editor</span>
              </button>

              {/* Other Mobile Nav Items */}
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`relative text-gray-800 text-lg transition hover:text-peach ${
                    pathname === item.path
                      ? "text-peach font-semibold after:absolute after:left-1/2 after:-bottom-2 after:-translate-x-1/2 after:border-t-[6px] after:border-x-[5px] after:border-x-transparent after:border-t-peach"
                      : ""
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </>
      )}
    </header>
  );
}

export default Header;
