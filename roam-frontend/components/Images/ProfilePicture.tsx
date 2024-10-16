import React from "react";

interface ProfilePictureProps {
  pictureSize: string;
}

const ProfilePicture: React.FC<ProfilePictureProps> = ({ pictureSize }) => (
  <div
    style={{
      position: "relative",
      width: pictureSize,
      height: pictureSize,
      overflow: "hidden",
    }}
  >
    <img
      src="images/avatar.png"
      alt="Profile Picture"
      style={{
        position: "relative",
        bottom: "0",
        width: "100%",
        height: "auto",
        minHeight: "100%",
        objectFit: "cover",
      }}
    />
  </div>
);

export default ProfilePicture;
