"use client";

import React, { useState } from 'react';
import PassResetSucessModal from '@/components/PassResetSuccessModal';
import Header from '@/components/SimpleHeader';
import PasswordChangeHeader from "@/components/Text/PasswordChangeHeading";
import ResetPasswordCard from '@/components/ResetPasswordCard';
import SearchButton from "@/components/SearchButton";

const ResetPasswordPage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSubmit = () => {
        // Handle password reset logic
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <Header />
            <div className="flex flex-col items-center justify-center">
                <PasswordChangeHeader subtitle="Enter a new password below to update your password." />
                <ResetPasswordCard onSubmit={handleSubmit} />
                {isModalOpen && (
                    <PassResetSucessModal onClose={closeModal} />
                )}
                <div className="w-full max-w-xs mt-8 rounded-lg">
                    <SearchButton
                        mainText="Reset Password"
                        className="w-full"
                        onClick={openModal} // Attach the handler here
                    />
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordPage;