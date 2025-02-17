"use client";
import { useEffect, useState } from "react";
import { useCart } from "@/app/context/CartContext";
import { useParams } from "next/navigation";
import axios from "axios";
import RatingAndReviews from "@/app/components/global/RatingAndReviews";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);


  const { addToCart } = useCart(); // ✅ FIX: use the correct function name

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };
  
  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/product/${id}`);
        setProduct(response.data.product);
      } catch (err) {
        setError("Failed to load product.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p className="text-center text-lg">Loading product...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <section className="max-w-7xl mx-auto ">
      <div className="flex flex-col md:flex-row gap-12 my-20">
        {/* Product Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img src={product.imagePath} alt={product.title} className="rounded-md shadow-md w-full h-fit max-w-lg object-cover" />
        </div>

        {/* Product Details */}
        <div className="p-5 md:px-0 w-full md:w-1/2 flex flex-col justify-between">
          <h1 className="text-3xl font-semibold text-gray-900">{product.title}</h1>
          {(product.mrp && product.sp === null) && <p className="text-xl font-medium text-gray-600 mt-2">Lek {product.mrp}</p>}
          {product.sp !== null && <p className="text-xl font-medium text-gray-600 mt-2">Lek {product.sp}</p>}
          <hr className="border-gray-300 my-4" />
          <p className="text-gray-700 text-lg leading-relaxed">{product.shortdescription}</p>
          {product.ingredients && <p className="text-gray-700 text-lg leading-relaxed mt-5">Perberesit:</p>}
          <p className="text-gray-700 text-lg leading-relaxed mt-5">{product.ingredients}</p>
          {product.benefits && <p className="text-gray-700 text-lg leading-relaxed mt-5">Benefitet:</p>}
          <p className="text-gray-700 text-lg leading-relaxed mt-5">{product.benefits}</p>

          {/* Quantity and Buttons */}
          <div className="flex flex-col items-start gap-5 mt-6">
            {/* Quantity Input */}
            <div className="flex items-center border border-gray-300 rounded-md overflow-hidden bg-gray-100">
              <button
                className="px-4 py-2 text-lg font-semibold text-gray-700"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                −
              </button>
              <input
                type="number"
                className="w-12 text-center text-lg border-0 bg-transparent outline-none"
                value={quantity}
                readOnly
              />
              <button
                className="px-4 py-2 text-lg font-semibold text-gray-700"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>

            {/* Buttons */}
            <button className="px-6 py-3 text-lg font-medium text-white bg-gray-900 rounded-md shadow-md hover:bg-gray-700 transition" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button className="px-6 py-3 text-lg font-medium text-gray-900 border border-gray-300 rounded-md shadow-md hover:bg-gray-100 transition">
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <RatingAndReviews productId={product._id} />
    </section>
  );
};

export default ProductDetail;
