"use client";
import { useCart } from "@/app/context/CartContext";
import Link from "next/link";
import { useState } from "react";
import { BsCart } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { IoMdRemoveCircleOutline } from "react-icons/io";

const CartModal = () => {
  const { cart, totalPrice, deleteItem, removeQuantity } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Button to open cart modal */}
      <button
        onClick={() => setIsOpen(true)}
        className="relative flex items-center text-white"
      >
        <BsCart className="text-xl" />
        {cart.length > 0 && (
          <span className="bg-red-500 text-white text-sm rounded-full px-2 absolute -top-2 -right-2">
            {cart.length}
          </span>
        )}
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-end items-center z-50"
          onClick={() => setIsOpen(false)}
        >
          {/* Modal Content */}
          <div
            className="bg-white p-6 rounded-lg w-full md:w-1/3 shadow-lg relative h-full"
            onClick={(e) => e.stopPropagation()}
          >
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
                  <div
                    className="flex items-center gap-4 border-b pb-2 relative"
                    key={item.productId.id || index}
                  >
                    <Link
                      href={`/detailPage/${item.productId.id}`}
                      className="w-full flex gap-5 items-center"
                    >
                      <img
                        src={item.productId.imagePath}
                        alt={item.productId.title}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="text-md font-semibold">
                          {item.productId.title}
                        </h3>
                        {item.productId.sp !== null ? (
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
                      <IoMdRemoveCircleOutline
                        className="text-red-600 text-xl  hover:text-red-800"
                        onClick={() => {
                          removeQuantity(item.productId._id);
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">Your cart is empty.</p>
            )}

            {/* Total Price */}
            <div className="mt-4">
              <p className="text-lg font-bold">Total: Lek {totalPrice}</p>
            </div>

            {/* Checkout Button */}
            <Link href={"/transaction"}>
              <button
                className="w-full mt-4 bg-black text-white py-2 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                Blij tani
              </button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default CartModal;
