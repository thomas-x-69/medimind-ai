import React, { useEffect } from "react";
import { X } from "lucide-react";

const Toast = ({ message, onClose, duration = 2000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-black text-white px-4 py-2 rounded-lg shadow-lg animate-fadeIn z-50 flex items-center">
      <span>{message}</span>
      <button
        onClick={onClose}
        className="ml-3 text-white hover:text-gray-300 transition-colors duration-300"
      >
        <X size={14} />
      </button>
    </div>
  );
};

export default Toast;
