import React from "react";


const Popup = ({
  isOpen,
  title,
  message,
  onClose,
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",
}) => {
  if (!isOpen) return null; // Hide if not open

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
        <h2 className="text-lg font-bold text-gray-900 mb-4">{title}</h2>
        <p className="text-gray-600">{message}</p>

        <div className="mt-6 flex justify-center space-x-4">
          <button
            className="bg-gray-300 px-4 py-2 rounded-md text-gray-800 hover:bg-gray-400 transition"
            onClick={onClose}
          >
            {cancelText}
          </button>
          {onConfirm && (
            <button
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
              onClick={onConfirm}
            >
              {confirmText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Popup;
