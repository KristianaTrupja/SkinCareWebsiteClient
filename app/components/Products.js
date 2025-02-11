"use client";
import { MdDelete } from "react-icons/md";
import { useState, useEffect } from "react";
import axios from "axios";
import Popup from "./ui/Popup";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  // Fetch product data
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/product");
        setProducts(response.data.productData);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch products.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Handle delete
  const handleDelete = async () => {
    if (!selectedProduct) return;

    try {
      await axios.delete(`http://localhost:5000/product/${selectedProduct._id}`);
      setProducts(products.filter((product) => product._id !== selectedProduct._id));
    } catch (err) {
      console.error("Failed to delete product:", err);
    }

    setShowConfirm(false);
  };

  if (loading) return <p className="text-center text-lg">Loading products...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <section className="w-full py-16 px-6 md:px-12 bg-lightBlush mt-10">
      <div className="max-w-6xl  mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-[#1f2937]">
          Our Bestselling Products
        </h2>
        <p className="text-[#4b5563] mt-2">
          Explore our top-rated Korean skincare essentials.
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product._id}
            className="relative p-6 pt-10 rounded-lg shadow-lg bg-white text-center transition-all duration-300 hover:scale-105 hover:shadow-xl transform"
          >
            {/* Discount Badge */}
            {product.discountPercent > 0 && (
              <span className="absolute top-3 left-3 bg-[#f59e0b] text-[#1f2937] text-xs font-bold px-3 py-1 rounded-full z-30">
                -{product.discountPercent}%
              </span>
            )}

            {/* Delete Icon */}
            <button
              className="absolute top-3 right-3 text-[#ef4444] hover:text-black transition duration-200 z-30"
              onClick={() => {
                setSelectedProduct(product);
                setShowConfirm(true);
              }}
            >
              <MdDelete className="w-6 h-6 cursor-pointer" />
            </button>

            {/* Product Image */}
            <div className="relative w-full h-56 mb-4 flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden transition-all duration-300 transform hover:scale-110">
              <img
                src={product.imagePath}
                alt={product.title}
                className="max-h-full max-w-full object-cover"
              />
            </div>

            {/* Product Info */}
            <h3 className="text-md font-semibold text-[#333333]">{product.title}</h3>
            <p className="text-[#6b7280] text-sm">{product.description}</p>

            {/* Price Section */}
            <div className="mt-2">
              <p className="text-red-700 text-sm line-through">₹{product.mrp}</p>
              <p className="text-[#10b981] font-bold text-xl">₹{product.sp}</p>
            </div>
          </div>
        ))}
      </div>
</div>
      {/* Delete Confirmation Popup */}
      <Popup
        isOpen={showConfirm}
        title="Confirm Deletion"
        message={`Are you sure you want to delete "${selectedProduct?.title}"?`}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleDelete}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </section>
  );
};

export default Products;
