"use client";

import React, { useState } from 'react';
import Header from "@/components/Header";
import { useRouter } from 'next/navigation';

const PasswordResetPage = () => {
    const [email, setEmail] = useState('');
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Add your password reset logic here
        console.log("Password reset email sent to:", email);
    };

    const handleNavigate = () => {
        router.push('/login'); // Navigate to the login page
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Header
                headerSize="regular"
                backgroundImage={false}
                logoColour="black"
                isPasswordReset={true}
            />

            <div className="flex flex-grow items-center justify-center">
                <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
                    <h2 className="text-2xl font-semibold text-center mb-6">Reset Your Password</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-orange-200 focus:border-orange-300"
                                placeholder="Enter your email"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded-md"
                        >
                            Send Reset Link
                        </button>
                    </form>
                    <p className="mt-4 text-center">
                        Remembered your password?
                        <span
                            onClick={handleNavigate}
                            className="text-orange-500 hover:underline cursor-pointer"
                        >
                            Log in here.
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PasswordResetPage;