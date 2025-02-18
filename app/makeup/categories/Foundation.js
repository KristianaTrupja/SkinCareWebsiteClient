"use client";
import { MdDelete } from "react-icons/md";
import { useState, useEffect } from "react";
import axios from "axios";
import Popup from "@/app/components/ui/Popup";
import Link from "next/link";
import Loader from "@/app/components/ui/Loader";

const Foundation = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  // Fetch product data
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5001/foundation");
        setProducts(response.data.productData);
      } catch (err) {
        setError("Failed to fetch products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Handle delete confirmation
  const confirmDelete = (product) => {
    setSelectedProduct(product);
    setShowConfirm(true);
  };

  // Handle delete
  const handleDelete = async () => {
    if (!selectedProduct) return;

    try {
      await axios.delete(`http://localhost:5001/product/${selectedProduct._id}`);
      setProducts(products.filter((product) => product._id !== selectedProduct._id));
    } catch (err) {
      console.error("Failed to delete product:", err);
    }

    setShowConfirm(false);
  };

  if (loading) return <Loader/>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <section className="w-full py-16 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
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

export default Foundation;
