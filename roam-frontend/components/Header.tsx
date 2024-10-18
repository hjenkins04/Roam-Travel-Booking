import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import HeaderBackground from "./Backgrounds/HeaderBackground";
import TallHeaderBackground from "./Backgrounds/TallHeaderBackground";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

// Define the correct prop types for additional props
interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  openLoginDrawer?: () => void;
  openSignupDrawer?: () => void;
  headerSize: string;
  backgroundImage: boolean;
  logoColour: string;
  displayProfilePicture?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  openLoginDrawer,
  openSignupDrawer,
  headerSize,
  backgroundImage,
  logoColour,
  displayProfilePicture = false
}) => {
  const { isSignedIn, signOut } = useAuth();
  const router = useRouter();

  const handleLogoClick = () => {
    router.push("/");
  };

  const handleDashboardClick = () => {
    router.push("/dashboard");
  };

  // Calculate dynamic padding based on backgroundImage and headerSize
  const paddingBottom = backgroundImage
    ? headerSize === 'tall'
      ? 'pb-48 pt-8'  // Large padding for tall headers with background image
      : 'pb-10 pt-8'  // Smaller padding for regular headers with background image
    : 'pb-6';     // Default padding if no background image

  return (
    <>
      {/* Conditionally render the background based on headerSize */}
      <div className="absolute inset-0" data-testid="header-container">
        {backgroundImage && (headerSize === "tall" ? 
          <TallHeaderBackground data-testid="tall-header-background"/> : 
          <HeaderBackground data-testid="header-background"/>
        )}
      </div>


      <header className="flex justify-between items-center px-16 py-6 shadow-sm">
        {/* Logo with click handler for redirect */}
        <div className="relative w-32 h-[76px] z-10">
          <Image
            src={
              logoColour === "black"
                ? "/images/logos/roam-high-resolution-logo-transparent-dark-letters.png"
                : "/images/logos/roam-high-resolution-logo-transparent.png"
            }
            alt="ROAM Logo"
            fill
            style={{ objectFit: "contain" }}
            className="w-auto h-auto cursor-pointer"
            onClick={handleLogoClick}
            data-testid="logo"
          />
        </div>

        {/* Conditionally render login/signup buttons or user avatar with dropdown */}
        <div className="space-x-2 z-10">
          {!isSignedIn && openLoginDrawer && (
            <Button
              variant="outline"
              onClick={openLoginDrawer}
              data-testid="login-button"
            >
              Login
            </Button>
          )}
          {!isSignedIn && openSignupDrawer && (
            <Button
              className="bg-[#ff6b35] hover:bg-[#ff8c5a]"
              onClick={openSignupDrawer}
              data-testid="signup-button"
            >
              Sign Up
            </Button>
          )}
          {isSignedIn && displayProfilePicture && (
            <div className="flex items-center space-x-4">
              {/* User Avatar with Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer" data-testid="user-avatar">
                    <AvatarImage src="/images/avatar.png" alt="User" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    onClick={handleDashboardClick}
                    data-testid="dashboard-button"
                  >
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={signOut}
                    data-testid="logout-button"
                  >
                    Log Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
