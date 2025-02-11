import React from "react";

function Footer() {
  return (
    <footer className="bg-softCoral py-6 text-white">
      <div className="mx-auto max-w-7xl px-6 text-center md:flex md:items-center md:justify-between">
        {/* Copyright */}
        <p className="text-sm">&copy; {new Date().getFullYear()} MyApp. All rights reserved.</p>

        {/* Navigation Links */}
        <nav className="mt-4 space-x-6 md:mt-0">
          <a href="#" className="text-sm hover:underline">
            Privacy Policy
          </a>
          <a href="#" className="text-sm hover:underline">
            Terms of Service
          </a>
          <a href="#" className="text-sm hover:underline">
            Contact Us
          </a>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
