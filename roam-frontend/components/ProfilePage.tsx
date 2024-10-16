import React from "react";
import ProfileHeader from "./ProfileHeader";
import PurchaseItem from "./PurchaseItem";
import Sidebar from "./ProfileSidebar";
import ProfilePicture from "./Images/ProfilePicture";

const ProfilePage: React.FC = () => {
  const purchases = [
    {
      title: "Round Trip - Toronto to Honolulu February 2024",
      outboundFlight: {
        date: "February 25th, 2021",
        departure: "YYZ",
        airline: "Hawaiian Airlines",
        flightNumber: "FIG4305",
        seat: "Seat 4F (business, window)",
        duration: "13h 45m (+1d)",
        departureTime: "7:00 AM",
        arrivalTime: "4:15 PM",
        layover: "2h 45m in LAX",
      },
      returnFlight: {
        date: "March 21st, 2021",
        departure: "HNL",
        airline: "Hawaiian Airlines",
        flightNumber: "FIG4312",
        seat: "Seat 9F (economy, window)",
        duration: "13h 45m (+1d)",
        departureTime: "7:00 AM",
        arrivalTime: "4:15 PM",
        layover: "2h 45m in LAX",
      },
    },
    {
      title: "Round Trip 2 - Toronto to Honolulu February 2024",
      outboundFlight: {
        date: "February 25th, 2021",
        departure: "YYZ",
        airline: "Hawaiian Airlines",
        flightNumber: "FIG4305",
        seat: "Seat 4F (business, window)",
        duration: "13h 45m (+1d)",
        departureTime: "7:00 AM",
        arrivalTime: "4:15 PM",
        layover: "2h 45m in LAX",
      },
      returnFlight: {
        date: "March 21st, 2021",
        departure: "HNL",
        airline: "Hawaiian Airlines",
        flightNumber: "FIG4312",
        seat: "Seat 9F (economy, window)",
        duration: "13h 45m (+1d)",
        departureTime: "7:00 AM",
        arrivalTime: "4:15 PM",
        layover: "2h 45m in LAX",
      },
    },
  ];

  return (
    <main className="pl-16 mt-3 w-full max-md:pl-5 max-md:max-w-full relative">
      <div className="flex flex-row">
        {/* Profile image */}
        <div className="relative z-20 mt-[3%]">
          <ProfilePicture pictureSize={"200px"} />
        </div>
        <div className="relative mt-[6%] w-[85%] ml-[-3%]">
          <ProfileHeader name="John Smith" email="place@holder.com" />
        </div>
      </div>

      {/* Right column: ProfileHeader and Purchases */}
      <div className="flex flex-row w-full mr-28 gap-10">
        {/* ProfileHeader with overlap */}
        <section className="">
          {/* "My Profile" text */}
          <h1 className="text-2xl font-semibold text-orange-400 mt-5">
            My Profile
          </h1>
          {/* Sidebar */}
          <div className="mt-6">
            <Sidebar />
          </div>
        </section>
        {/* Purchases Section */}
        <section className="flex flex-col items-start mt-2.5 mr-40">
          <h2 className="text-2xl font-bold text-orange-400">
            Previous purchases
          </h2>
          <p className="mt-1.5 text-lg text-black">
            View all of your previous ticket purchases.
          </p>

          <div className="flex flex-col self-stretch pt-8 mt-8 bg-white rounded-lg max-md:pt-24 max-md:max-w-full">
            <div className="flex flex-col px-4 bg-white rounded-lg max-md:max-w-full">
              {purchases.map((purchase, index) => (
                <PurchaseItem key={index} {...purchase} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ProfilePage;
