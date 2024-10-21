import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface ResetPasswordCardProps {
    onSubmit: (newpassword: string) => void;
}

const ResetPasswordCard: React.FC<ResetPasswordCardProps> = ({ onSubmit }) => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(newPassword);
    };

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
        setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md border border-gray-300">
            <div className="mb-6 relative">
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-500 mb-5">
                    New Password
                </label>
                <input
                    type={isPasswordVisible ? 'text' : 'password'}
                    id="newPassword"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="mt-2 block w-full rounded-lg shadow-md py-2 px-4 border border-gray-200"
                    placeholder=" "
                />
                <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-12 text-gray-500"
                >
                    {isPasswordVisible ? <EyeOff /> : <Eye />}
                </button>
            </div>
            <div className="mb-6 relative">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-500 mb-5">
                    Confirm Password
                </label>
                <input
                    type={isConfirmPasswordVisible ? 'text' : 'password'}
                    id="confirmPassword"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="mt-2 block w-full rounded-lg shadow-md py-2 px-4 border border-gray-200"
                    placeholder=" "
                />
                <button
                    type="button"
                    onClick={toggleConfirmPasswordVisibility}
                    className="absolute right-3 top-12 text-gray-500"
                >
                    {isConfirmPasswordVisible ? <EyeOff /> : <Eye />}
                </button>
            </div>
        </form>
    );
};

export default ResetPasswordCard;
