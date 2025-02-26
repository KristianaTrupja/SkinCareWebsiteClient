"use client";

import React, { useState, useEffect } from "react";
import { BsSearch, BsList, BsX, BsPencilSquare, BsPerson, BsBoxArrowRight } from "react-icons/bs";
import { useCart } from "../../context/CartContext";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import CartModal from "../ui/CartModal";
import { useLoading } from "@/app/context/LoadingContext";

function Header() {
  const { cart } = useCart();
  const [username, setUsername] = useState("");
  const [userType, setUserType] = useState(""); // New state for userType
  const [searchTerm, setSearchTerm] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { showLoader, hideLoader } = useLoading();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedUserType = localStorage.getItem("userType");
    
    if (storedUsername) setUsername(storedUsername);
    if (storedUserType) setUserType(storedUserType);
  }, [pathname]); // Adding pathname will re-run useEffect when route changes
  

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("userType"); // Remove userType on logout
    localStorage.removeItem("userId")
    setUsername("");
    setUserType(""); // Reset state
    window.location.reload();
  };

  const handleSearch = (e) => {
    e.preventDefault();
    showLoader();
    setTimeout(hideLoader, 2000);
    if (searchTerm.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleNavigation = (path) => {
    showLoader();
    router.push(path);
  };

  useEffect(() => {
    hideLoader();
  }, [pathname]);

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
        <Link href="/home" className="text-2xl font-bold text-white hidden md:block">
          <img
            src="https://glowyskinshop.com/cdn/shop/files/Untitled_design_44_110x.png?v=1704640845"
            className="h-14"
            alt="Logo"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex space-x-6 items-center">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              className={`relative px-3 py-2 text-white transition hover:text-yellow ${
                pathname === item.path
                  ? "text-yellow font-semibold after:absolute after:left-1/2 after:-bottom-2 after:-translate-x-1/2 after:border-t-[6px] after:border-x-[5px] after:border-x-transparent after:border-t-yellow"
                  : ""
              }`}
            >
              {item.name}
            </button>
          ))}
        </nav>

        {/* Search, Cart, Content Editor, and Login Icon */}
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

          {/* Content Editor Icon (Only for Admins) */}
          {userType === "admin" && (
            <button
              onClick={() => handleNavigation("/content-editor")}
              className="text-white text-2xl transition hover:text-yellow active:scale-90"
              aria-label="Content Editor"
            >
              <BsPencilSquare />
            </button>
          )}

          {/* Shopping Cart */}
          <CartModal />

          {/* Right Side: User Info & Logout */}
          <div className="flex items-center gap-4">
            {username ? (
              <div className="flex items-center gap-3 relative">
                <button
                  onClick={handleLogout}
                  className="text-white text-2xl transition hover:text-yellow active:scale-90"
                  aria-label="Logout"
                >
                  <BsBoxArrowRight />
                  <span className="bg-red-500 text-white text-sm rounded-full px-2 absolute top-6 -right-2 lg:-right-14">
                    {username}
                  </span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => router.push("/login")}
                className="text-white text-2xl transition hover:text-yellow active:scale-90"
                aria-label="Login"
              >
                <BsPerson />
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="lg:hidden text-white text-2xl" onClick={() => setMenuOpen(true)}>
            <BsList />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
