import React from "react";

// Define props interface for the ProfileHeader component
interface ProfileHeaderProps {
  name: string;
  email: string;
  onEditProfile: () => void; // Function to handle Edit Profile button click
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  name,
  email,
  onEditProfile,
}) => {
  return (
    <header
      className="flex justify-between items-center py-6 px-6 bg-orange-400 rounded-xl w-full max-md:px-5"
      data-testid="profile-header"
    >
      {/* User information section */}
      <div className="flex flex-col text-white ml-20">
        {/* Display user's name */}
        <h1 className="text-xl font-medium" data-testid="header-name">
          {name}
        </h1>
        {/* Display user's email */}
        <p className="text-lg" data-testid="header-email">
          {email}
        </p>
      </div>
      {/* Edit Profile button */}
      <button
        className="px-5 py-3 text-base text-orange-400 bg-white rounded-md"
        data-testid="edit-profile-button"
        onClick={onEditProfile} // Call the passed function when the button is clicked
      >
        Edit Profile
      </button>
    </header>
  );
};

export default ProfileHeader;
