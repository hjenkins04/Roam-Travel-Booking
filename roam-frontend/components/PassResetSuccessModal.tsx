import React from 'react';

interface ResetPasswordModalProps {
    onClose: () => void;
}

const SuccessModal: React.FC<ResetPasswordModalProps> = ({ onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                <h2 className="text-xl font-semibold mb-4">Success!</h2>
                <p className="mb-4">
                    Your password has been successfully updated!
                </p>
                <div className="flex mb-4 justify-center "> {/* Parent container with flex and justify-end */}
                    <button
                        onClick={onClose}
                        className="flex shadow-lg items-center bg-[#FF9A2A] text-white rounded-md px-9 py-1"
                    >
                        <span className="mr-1">Sign In</span> {/* Text for the button */}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SuccessModal;