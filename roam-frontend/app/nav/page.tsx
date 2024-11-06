'use client';

import { Button } from "@/components/ui/button"; // Assuming you have shadcn buttons setup here
import { useRouter } from "next/navigation"; // For navigation between pages

const ButtonPage: React.FC = () => {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4 bg-gray-100">
      <Button onClick={() => handleNavigation("/")} className="w-40">
        Home Page
      </Button>
      <Button onClick={() => handleNavigation("/search-results")} className="w-40">
        Search Results
      </Button>
      <Button onClick={() => handleNavigation("/seat-booking")} className="w-40">
        Seat Booking
      </Button>
      <Button onClick={() => handleNavigation("/checkout")} className="w-40">
        Checkout
      </Button>
      <Button onClick={() => handleNavigation("/dashboard")} className="w-40">
        Dashboard
      </Button>
      <Button onClick={() => handleNavigation("/forgot-password")} className="w-40">
        Forgot Password
      </Button>
      <Button onClick={() => handleNavigation("/reset-password")} className="w-40">
        Reset Password
      </Button>
    </div>
  );
};

export default ButtonPage;
