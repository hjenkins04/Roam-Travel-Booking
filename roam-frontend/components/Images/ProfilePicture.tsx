import React from "react";
import Image from "next/image";

interface ProfilePictureProps {
  pictureSize: string;
}

const ProfilePicture: React.FC<ProfilePictureProps> = ({ pictureSize }) => (
  <div
    style={{ position: "relative", width: pictureSize, height: pictureSize, overflow: "hidden" }}
  >
    <Image
      src="/images/avatar.png"
      alt="Profile Picture"
      fill
      style={{ position: "absolute", objectFit: "cover",  bottom: 0}}
    />
  </div>
);

export default ProfilePicture;
