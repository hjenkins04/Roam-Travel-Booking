import React from 'react';
import TextUnderline from '@/components/Effects/TextUnderline';

interface PasswordChangeHeaderProps {
    subtitle: string;
}

const PasswordChangeHeader: React.FC<PasswordChangeHeaderProps> = ({ subtitle }) => (
    <div className="relative text-center mt-12">
        <div className="relative mb-10 font-bold text-4xl">
            <span className="relative z-20">Reset Password</span>
            <TextUnderline width={330} height={34} className="absolute left-1/2 transform translate-y-1/2" />
        </div>
        <div className="relative mb-10 text-gray-400 text-lg">
            <span>{subtitle}</span> {/* Dynamically set the subtitle */}
        </div>
    </div>
);

export default PasswordChangeHeader;

