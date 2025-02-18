"use client"
import { useLoading } from "@/app/context/LoadingContext";

const Loader = () => {
  const { isLoading } = useLoading();

  return (
    <div
      className={`fixed inset-x-0 top-14 bottom-16 bg-white flex items-center justify-center transition-opacity duration-300 h-screen
        ${isLoading ? "opacity-100 pointer-events-auto z-20" : "opacity-0 pointer-events-none"}`}
    >
      <div className="w-10 h-10 border-4 border-gray-200 border-t-peach rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
