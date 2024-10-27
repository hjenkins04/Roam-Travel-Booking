import React, { useState, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface ResetPasswordCardProps {
    onSubmit: (newpassword: string) => void;
}

const ResetPasswordCard: React.FC<ResetPasswordCardProps> = ({ onSubmit }) => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
    const [hasMounted, setHasMounted] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    if (!hasMounted) {
        return null; // Prevent rendering on server
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return; // Prevent submission
        }
        setError(null);
        onSubmit(newPassword);
    };

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
        setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
    };

    {/* Reset Password Form with Toggle Input Visibility*/ }
    return (
        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md border border-gray-300" data-testid="reset-password-form">
            <div className="mb-6 relative">
                {/* New Password Input */}
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
                {/* Confirm Password Input */}
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
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg">
                Submit
            </button>
        </form>
    );
};

export default ResetPasswordCard;
