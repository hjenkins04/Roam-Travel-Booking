import Underline from '@/components/Effects/TextUnderline';
interface PasswordChangeHeaderProps {
    subtitle: string;
}

const PasswordChangeHeader: React.FC<PasswordChangeHeaderProps> = ({ subtitle }) => (
    <div className="relative text-center mt-12">
        <div className="relative mb-10 font-bold text-4xl">
            <span className="relative z-20">Reset Password</span>
            <img
                src="/images/ThinTextUnderline.png"
                alt="Underline"
                className="absolute left-1/2 transform -translate-x-1/2 -bottom-6"
            />
        </div>
        <div className="relative mb-10 text-gray-400 text-lg">
            <span>{subtitle}</span> {/* Dynamically set the subtitle */}
        </div>
    </div>
);

export default PasswordChangeHeader;

