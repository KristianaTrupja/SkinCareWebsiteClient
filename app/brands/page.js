"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MdDelete } from "react-icons/md";

const brands = [
  "Purito",
  "COSRX",
  "Isntree",
  "Missha",
  "Heimish",
  "Moonshot",
  "Mizon",
  "Etude",
];

const Brands = () => {
    const [selectedBrand, setSelectedBrand] = useState(brands[0]);

  const [products, setProducts] = useState([]);

  // Fetch products when brand is selected
  useEffect(() => {
    if (selectedBrand) {
      fetch(`http://localhost:5001/product/products?search=${selectedBrand}`)
        .then((res) => res.json())
        .then((data) => setProducts(data.products))
        .catch((err) => console.error(err));
    }
  }, [selectedBrand]);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Mobile Filter (Top Navigation) */}
      <div className="lg:hidden w-full bg-lightBlush shadow-lg p-4 flex overflow-x-auto space-x-4">
        {brands.map((brand) => (
          <button
            key={brand}
            onClick={() => setSelectedBrand(brand)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold ${
              selectedBrand === brand ? "bg-softCoral text-white" : "bg-white text-black"
            }`}
          >
            {brand}
          </button>
        ))}
      </div>

      {/* Desktop Sidebar Navigation */}
      <aside className="hidden lg:flex lg:flex-col lg:w-1/5 bg-lightBlush shadow-lg p-5">
        <h2 className="text-xl font-semibold text-softCoral mb-6">Filter by Brand</h2>

        <ul>
          {brands.map((brand) => (
            <li key={brand} className="mb-2">
              <button
                onClick={() => setSelectedBrand(brand)}
                className={`w-full text-left px-3 py-2 rounded-lg ${
                  selectedBrand === brand ? "bg-softCoral text-white" : "bg-white text-black"
                }`}
              >
                {brand}
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-auto">
          <Link href="/home">
            <button className="w-full bg-softCoral text-white py-2 rounded-lg shadow-md transition hover:bg-peach">
              Go Home
            </button>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {selectedBrand && <h2 className="text-lg font-semibold mb-4">Showing results for "{selectedBrand}"</h2>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.length > 0 ? (
            products.map((product) => (
                <div
                key={product._id}
                className="relative h-full p-6 pt-10 rounded-lg shadow-lg bg-white text-center transition-all duration-300 hover:scale-105 hover:shadow-xl transform cursor-pointer"
              >
                {/* Delete Icon */}
                <MdDelete
                  className="absolute top-3 right-3 text-red-600 text-xl cursor-pointer hover:text-red-800"
                  onClick={() => confirmDelete(product)}
                />
  
                {/* Discount Badge */}
                {product.discountPercent > 0 && (
                  <span className="absolute top-3 left-3 bg-[#f59e0b] text-[#1f2937] text-xs font-bold px-3 py-1 rounded-full z-30">
                    -{product.discountPercent}%
                  </span>
                )}
  
                {/* Product Image */}
                <Link href={`/product/${product._id}`}>
                  <div className="relative w-full h-56 mb-4 flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden transition-all duration-300 transform hover:scale-110">
                    <img
                      src={product.imagePath}
                      alt={product.title}
                      className="max-h-full max-w-full object-cover"
                    />
                  </div>
                </Link>
  
                {/* Product Info */}
                <h3 className="text-md font-semibold text-[#333333]">{product.title}</h3>
  
                {/* Price Section */}
                <div className="mt-2">
                  {(product.mrp !== product.sp && product.sp !== null) && (
                    <p className="text-red-700 text-sm line-through">Lek {product.mrp}</p>
                  )}
                  {(product.mrp !== null && product.sp === null) && <p className="text-[#333333] font-bold text-xl">Lek {product.mrp}</p>}
                  {product.sp !== null && <p className="text-[#333333] font-bold text-xl">Lek {product.sp}</p>}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No products found.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Brands;
