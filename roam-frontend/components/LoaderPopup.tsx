import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

interface PopupProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const LoaderPopup: React.FC<PopupProps> = ({ isOpen = false, onClose }) => {
  const [isVisible, setIsVisible] = useState(isOpen);

  useEffect(() => {
    setIsVisible(isOpen);
  }, [isOpen]);

  // const handleClose = () => {
  //   setIsVisible(false);
  //   onClose && onClose();
  // };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className="bg-white rounded-lg w-64 h-64 p-8 flex flex-col items-center justify-center space-y-6 animate-in fade-in zoom-in duration-300"
        role="dialog"
        aria-modal="true"
        aria-labelledby="loading-popup-title"
      >
        <h2 id="loading-popup-title" className="text-xl font-semibold">
          Loading
        </h2>
        <Loader2 className="w-16 h-16 text-orange-500 animate-spin" />
      </div>
    </div>
  );
};

export default LoaderPopup;
