"use client";
import { useCart } from "@/app/context/CartContext";
import { useState } from "react";
import { BsCart } from "react-icons/bs";

const CartModal = () => {
  const { cart, totalPrice } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Button to open cart modal */}
      <button
        onClick={() => setIsOpen(true)}
        className="relative flex items-center text-white"
      >
        <BsCart className="text-xl"/>
        {cart.length > 0 && (
          <span className="bg-red-500 text-white text-sm rounded-full px-2 absolute -top-2 -right-2">
            {cart.length}
          </span>
        )}
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end items-center z-50">
          {/* Modal Content */}
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg relative h-full">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 text-gray-600 text-xl"
            >
              ✖
            </button>
            <h2 className="text-xl font-bold mb-4">Your Cart</h2>

            {/* Cart Items */}
            {cart.length > 0 ? (
              <div className="space-y-4">
              {cart.map((item, index) => (
                <div key={item.id || index} className="flex items-center gap-4 border-b pb-2">
                  <img
                    src={item.imagePath}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="text-md font-semibold">{item.title}</h3>
                    <p className="text-gray-600">Lek{item.sp} x {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
            
            ) : (
              <p className="text-gray-500">Your cart is empty.</p>
            )}

            {/* Total Price */}
            <div className="mt-4">
              <p className="text-lg font-bold">Total: ₹{totalPrice}</p>
            </div>

            {/* Checkout Button */}
            <button className="w-full mt-4 bg-black text-white py-2 rounded-md">
              Checkout
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CartModal;
