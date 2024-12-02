import React, { useState, useEffect } from "react";
import { Loader2, CheckCircle, XCircle } from "lucide-react";

interface PopupProps {
  isOpen?: boolean;
  status?: "loading" | "success" | "fail";
  onClose?: () => void;
  showButton?: boolean;
  buttonLabel?: string;
  onButtonClick?: () => void;
}

const LoaderSuccessFailPopup: React.FC<PopupProps> = ({
  isOpen = false,
  status = "loading",
  showButton = false,
  buttonLabel = "Action",
  onButtonClick,
}) => {
  const [isVisible, setIsVisible] = useState(isOpen);

  useEffect(() => {
    setIsVisible(isOpen);
  }, [isOpen]);

  if (!isVisible) return null;

  const getStatusIcon = () => {
    switch (status) {
      case "success":
        return (
          <CheckCircle
            className="w-16 h-16 text-green-500"
            data-testid="success-icon"
          />
        );
      case "fail":
        return (
          <XCircle
            className="w-16 h-16 text-red-500"
            data-testid="error-icon"
          />
        );
      default:
        return <Loader2 className="w-16 h-16 text-orange-500 animate-spin" />;
    }
  };

  const getStatusMessage = () => {
    switch (status) {
      case "success":
        return "Success";
      case "fail":
        return "Failed";
      default:
        return "Loading";
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className="bg-white rounded-lg w-64 h-72 p-8 flex flex-col items-center justify-center space-y-4 animate-in fade-in zoom-in duration-300"
        role="dialog"
        aria-modal="true"
        aria-labelledby="popup-title"
      >
        <h2 id="popup-title" className="text-xl font-semibold">
          {getStatusMessage()}
        </h2>
        {getStatusIcon()}

        {showButton && (
          <button
            onClick={onButtonClick}
            className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
          >
            {buttonLabel}
          </button>
        )}
      </div>
    </div>
  );
};

export default LoaderSuccessFailPopup;
