"use client";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { MdDelete } from "react-icons/md";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import Link from "next/link";
const Transaction = () => {
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const { cart, totalPrice, clearCart, deleteItem,removeQuantity } = useCart(); // ✅ Import clearCart

  const handleOrder = async () => {
    if (!email || !address) {
      alert("Please enter your email and address.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5004/sendEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, address, cartItems: cart, totalPrice }),
      });

      if (response.ok) {
        alert("Order placed! Check your email.");

        // ✅ Reset form fields
        setEmail("");
        setAddress("");

        // ✅ Clear cart after successful order
        clearCart();
      } else {
        alert("Failed to send email. Please try again.");
      }
    } catch (error) {
      console.error("Email error:", error);
    }
  };

  return (
    <div className="relative min-h-screen bg-[url(https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjQzOC10YW5nLTEyYS1jaGVycnlibG9zc29tXzMuanBn.jpg)] flex justify-center items-center p-6 object-cover bg-bg-no-repeat">
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-8 flex flex-col md:flex-row relative overflow-hidden">
        {/* Left Section */}
        <div className="w-full md:w-1/2 p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Transaction Details
          </h2>

          <div className="mb-4">
            <label className="block text-gray-600 mb-1">Account (Email)</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 mb-1">
              Ship To (Address)
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter shipping address"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 mb-1">Shipping Method</label>
            <p className="p-2 bg-gray-200 rounded-lg">Transport 100L</p>
          </div>

          <div className="mb-6">
            <label className="block text-gray-600 mb-1">Payment Method</label>
            <p className="p-2 bg-gray-200 rounded-lg">Cash on Delivery</p>
          </div>

          <button
            className="w-full bg-peach text-white py-2 rounded-lg hover:bg-rosy transition-all"
            onClick={handleOrder}
          >
            Perfundo porosine
          </button>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 p-6 border-l">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Your Cart</h2>

          <div className="space-y-4">
            {cart.map((item, index) => (
             
                <div className="flex items-center gap-4 border-b pb-2 relative"  key={item.productId.id || index}>
                   <Link href={`/detailPage/${item.productId._id}`} className="w-full flex gap-5 items-center">
                   <img
                    src={item.productId.imagePath}
                    alt={item.productId.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="text-md font-semibold">{item.title}</h3>
                    {item.sp !== null ? (
                      <p className="text-gray-600">
                        Lek{item.productId.sp} x {item.quantity}
                      </p>
                    ) : (
                      <p className="text-gray-600">
                        Lek{item.productId.mrp} x {item.quantity}
                      </p>
                    )}
                  </div>
                  </Link>
                 
                  <div className="flex flex-col items-center gap-2 cursor-pointer">
                    <MdDelete
                      className="text-red-600 text-xl  hover:text-red-800"
                      onClick={() => deleteItem(item.productId._id)}
                    />
                    <IoMdRemoveCircleOutline  className="text-red-600 text-xl  hover:text-red-800" onClick={()=>{removeQuantity(item.productId._id)}}/>
                  </div>
                </div>
            ))}
          </div>

          {/* Total Price */}
          <div className="mt-6 p-4 bg-gray-200 rounded-lg text-lg font-semibold text-gray-800">
            Cmimi Total: <span className="text-peach">Lek {totalPrice}</span>
          </div>
        </div>
      </div>

      {/* Background Image */}
      <div
        className="absolute bottom-0 left-0 w-full h-32 bg-cover bg-center opacity-10"
        style={{ backgroundImage: "url('/images/bg-pattern.jpg')" }}
      ></div>
    </div>
  );
};

export default Transaction;
