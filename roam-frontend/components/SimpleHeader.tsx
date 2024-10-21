import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Import useRouter if you want to handle routing

const BrandingHeader: React.FC = () => {
    const router = useRouter(); // Initialize the router

    const handleLogoClick = () => {
        router.push("/"); // Redirect to home when logo is clicked
    };

    return (
        <header className="flex justify-between items-center px-16 py-6">
            {/* Logo with click handler for redirect */}
            <div className="relative w-32 h-[76px] z-10">
                <Image
                    src="/images/logos/roam-high-resolution-logo-transparent-dark-letters.png"
                    alt="ROAM Logo"
                    fill
                    style={{ objectFit: "contain" }}
                    className="w-auto h-auto cursor-pointer"
                    onClick={handleLogoClick} // Add the click handler here
                    data-testid="logo"
                />
            </div>
        </header> // Close the header element here
    );
};

export default BrandingHeader;