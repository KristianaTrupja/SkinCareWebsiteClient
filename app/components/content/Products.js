"use client";
import { MdDelete } from "react-icons/md";
import { useState, useEffect } from "react";
import axios from "axios";
import Popup from "../ui/Popup";
import Link from "next/link";
import { useLoading } from "@/app/context/LoadingContext";
import Loader from "../ui/Loader";
import { usePathname } from "next/navigation";
import ProductSorter from "../global/ProductSorter";
const Products = () => {
  const [products, setProducts] = useState([]);
  const [productSorted, setProductSorted] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 12; // Products per page
  const { showLoader, hideLoader } = useLoading();
  const [userType, setUserType] = useState(""); // New state for userType
  const pathname = usePathname();

  useEffect(() => {
    const storedUserType = localStorage.getItem("userType");
    
    if (storedUserType) setUserType(storedUserType);
  }, [pathname]); // Adding pathname will re-run useEffect when route changes
  // Fetch products based on page
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5004/product/?page=${currentPage}&limit=${limit}`);
        setProducts(response.data.products);
        setProductSorted(response.data.products);
        setTotalPages(response.data.totalPages);
      } catch (err) {
        setError("Failed to fetch products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage]); // Fetch when page changes

  // Handle delete confirmation
  const confirmDelete = (product) => {
    setSelectedProduct(product);
    setShowConfirm(true);
  };
  const handleSort = (sortedProducts) =>{
    setProductSorted(sortedProducts)
  }
  // Handle delete
  const handleDelete = async () => {
    if (!selectedProduct) return;

    try {
      await axios.delete(`http://localhost:5004/product/${selectedProduct._id}`);
      setProducts(products.filter((product) => product._id !== selectedProduct._id));
      setProductSorted(products.filter((product) => product._id !== selectedProduct._id))
    } catch (err) {
      console.error("Failed to delete product:", err);
    }

    setShowConfirm(false);
  };

  // Pagination handlers
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const GoToDetailPage = ()=>{
    showLoader()
  }
  if (loading) return <Loader/>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <section className="w-full py-16 px-6 md:px-12 bg-lightBlush mt-10">
      <ProductSorter products={products} onSort={handleSort}/>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1f2937]">
            Produktet tona Bestseller
          </h2>
          <p className="text-[#4b5563] mt-2">
            Eksploroni produktet tona me te shitura.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {productSorted.map((product) => (
            <div
              key={product._id}
              className="relative h-full p-6 pt-10 rounded-lg shadow-lg bg-white text-center transition-all duration-300 hover:scale-105 hover:shadow-xl transform cursor-pointer"
            >
              {/* Delete Icon */}
              {userType === 'admin' && <MdDelete
                className="absolute top-3 right-3 text-red-600 text-xl cursor-pointer hover:text-red-800"
                onClick={() => confirmDelete(product)}
              />
              }
              {/* Discount Badge */}
              {product.discountPercent > 0 && (
                <span className="absolute top-3 left-3 bg-[#f59e0b] text-[#1f2937] text-xs font-bold px-3 py-1 rounded-full z-30">
                  -{product.discountPercent}%
                </span>
              )}

              {/* Product Image */}
              <Link href={`/detailPage/${product._id}`} onClick={GoToDetailPage}>
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

        {/* Pagination Controls */}
        <div className="mt-8 flex justify-center space-x-2">
          <button
            className={`px-4 py-2 rounded-lg ${currentPage === 1 ? "bg-gray-300" : "bg-goldenYellow text-white hover:bg-peach"}`}
            disabled={currentPage === 1}
            onClick={() => goToPage(currentPage - 1)}
          >
            Previous
          </button>

          {[...Array(totalPages).keys()].map((_, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded-lg ${currentPage === index + 1 ? "bg-goldenYellow text-white" : "bg-gray-200 hover:bg-gray-300"}`}
              onClick={() => goToPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          <button
            className={`px-4 py-2 rounded-lg ${currentPage === totalPages ? "bg-gray-300" : "bg-goldenYellow text-white hover:bg-peach"}`}
            disabled={currentPage === totalPages}
            onClick={() => goToPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>

      {/* Delete Confirmation Popup */}
      <Popup
        isOpen={showConfirm}
        title="Konfirmo fshirjen"
        message={`A jeni te sigurt qe deshironi te fshini produktin "${selectedProduct?.title}"?`}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleDelete}
        confirmText="Fshij"
        cancelText="Cancel"
      />
    </section>
  );
};

export default Products;
