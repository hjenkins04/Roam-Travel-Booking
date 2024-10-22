"use client";

import React, { useState } from 'react';
import EmailSentModal from '@/components/EmailSentModal';
import ForgotPasswordCard from '@/components/ForgotPasswordCard';
import Header from '@/components/SimpleHeader';
import PasswordChangeHeader from "@/components/Text/PasswordChangeHeading";

const ResetPasswordPage: React.FC = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [email, setEmail] = useState(''); // Keep track of email for the modal

    const handleSubmit = (email: string) => {
        setEmail(email); // Store the email for the modal
        setModalOpen(true); // Open the modal
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <div>
            <Header />
            <div className="flex flex-col items-center justify-center">
                <PasswordChangeHeader subtitle="Please enter your email to be sent a recovery link." />
                <ForgotPasswordCard onSubmit={handleSubmit} />
                {isModalOpen && (
                    <EmailSentModal email={email} onClose={closeModal} />
                )}
            </div>
        </div>
    );
};

export default ResetPasswordPage;