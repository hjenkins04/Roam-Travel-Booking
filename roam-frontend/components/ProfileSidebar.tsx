import React from "react";
import { useAuthStore } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

// Define props interface for the Sidebar component
interface ProfileSidebarProps {
  onEditProfile: () => void;
}

const Sidebar: React.FC<ProfileSidebarProps> = ({ onEditProfile }) => {
  const { signOut } = useAuthStore();
  const router = useRouter();

  // Handler for Home button click
  const handleHomeClick = () => {
    router.push("/");
  };

  // Handler for Log Out button click
  const handleLogOut = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <nav
      className="flex flex-col h-full z-10 max-w-full text-s leading-none text-amber-500 w-[218px] max-md:h-auto"
      data-testid="profile-sidebar"
    >
      {/* Top section: Home and Purchases buttons */}
      <div className="flex flex-col gap-6 flex-grow">
        {/* Home button */}
        <a
          data-testid="home-button"
          href="#"
          className="gap-2.5 self-stretch px-2 py-2.5 whitespace-nowrap bg-white rounded-lg min-h-[33px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)]"
          onClick={handleHomeClick}
        >
          Home
        </a>
        {/* Purchases button (triggers edit profile) */}
        <a
          data-testid="purchases-button"
          href="#"
          className="gap-2.5 self-stretch px-2 py-2.5 whitespace-nowrap bg-white rounded-lg min-h-[33px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)]"
          onClick={onEditProfile}
        >
          Purchases
        </a>
      </div>
      {/* Log Out button pinned at the bottom */}
      <div className="fixed bottom-5 w-[218px]">
        <button
          data-testid="sidebar-logout-button"
          onClick={handleLogOut}
          className="gap-2.5 self-stretch px-2 py-2.5 bg-white rounded-lg min-h-[33px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] w-full"
        >
          Log Out
        </button>
      </div>
    </nav>
  );
};

export default Sidebar;
