"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import axios from "axios";
import Link from "next/link";
import Loader from "../components/ui/Loader";

const SearchPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!query) return;

    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/product/products?search=${query}`);
        setProducts(response.data.products);
      } catch (err) {
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [query]);

  if (loading) return <Loader/>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Search results for "{query}"</h2>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link href={`/product/${product._id}`} key={product._id} className="block border p-4 rounded-md shadow-md">
              <img src={product.imagePath} alt={product.title} className="w-full h-48 object-cover rounded-md" />
              <h3 className="text-lg font-semibold mt-2">{product.title}</h3>
              {product.sp !== null ?  <p className="text-gray-700 mt-1">Leke{product.sp}</p>:  <p className="text-gray-700 mt-1">Leke{product.mrp}</p>}
               
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No products found.</p>
      )}
    </div>
  );
};

// Wrap SearchPage with Suspense
export default function SearchPageWithSuspense() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <SearchPage />
    </Suspense>
  );
}
