import React from "react";

interface ProfileHeaderProps {
  name: string;
  email: string;
  onEditProfile: () => void; // Prop for handling the Edit Profile button click
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  name,
  email,
  onEditProfile,
}) => {
  return (
    <header className="flex justify-between items-center py-6 px-6 bg-orange-400 rounded-xl w-full max-md:px-5">
      <div className="flex flex-col text-white ml-20">
        <h1 className="text-xl font-medium">{name}</h1>
        <p className="text-lg">{email}</p>
      </div>
      <button
        className="px-5 py-3 text-base text-orange-400 bg-white rounded-md"
        onClick={onEditProfile} // Call the passed function when the button is clicked
      >
        Edit Profile
      </button>
    </header>
  );
};

export default ProfileHeader;
