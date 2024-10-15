import React from 'react';
import ProfileHeader from './ProfileHeader';
import PurchaseItem from './PurchaseItem';
import Sidebar from './ProfileSidebar';

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
        layover: "2h 45m in LAX"
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
        layover: "2h 45m in LAX"
      }
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
        layover: "2h 45m in LAX"
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
        layover: "2h 45m in LAX"
      }
    }
  ];

  return (
<div className="flex overflow-hidden flex-col pb-8 bg-white">
  <header className="flex overflow-hidden flex-col justify-center px-16 py-4 w-full min-h-[101px] max-md:px-5 max-md:max-w-full">
    <div className="flex overflow-hidden flex-col justify-center py-4 w-full max-md:max-w-full">
      <div className="flex flex-wrap gap-10 justify-between items-center w-full max-md:max-w-full">
        <div className="flex flex-col self-stretch my-auto w-[98px]">
          <img 
            loading="lazy" 
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/9d92c86d22c1ad1e3d0c0beb35110c8e053c7c143b4b184a5313e0546dffc215?placeholderIfAbsent=true&apiKey=7a7173da98bb425ca4236bb2160d9309" 
            className="object-contain aspect-[3.16] w-[98px]" 
            alt="Company Logo" 
          />
        </div>
        <div className="flex gap-4 items-center self-stretch my-auto">
          <div className="flex gap-3 self-stretch my-auto min-h-[35px]" />
        </div>
      </div>
    </div>
  </header>

  <main className="flex flex-row pl-16 mt-3 w-full max-md:pl-5 max-md:max-w-full relative">
    {/* Left column: Profile image and sidebar */}
    <div className="flex flex-col w-[165px]">
      {/* Profile image */}
      <div className="relative mt-0">
        <img 
          loading="lazy" 
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/ff026c23ee27e9e5cf19f5ea5b1128a4b6845243b9b1119c3034ec72c8ba43c8?placeholderIfAbsent=true&apiKey=7a7173da98bb425ca4236bb2160d9309" 
          className="object-contain w-full aspect-square rounded-[999px] z-20 relative" 
          alt="Profile Picture" 
        />
      </div>

        {/* "My Profile" text */}
        <h1 className="text-2xl font-semibold text-orange-400 mt-5">My Profile</h1>

      {/* Sidebar */}
      <div className="mt-4">
        <Sidebar />
      </div>
    </div>

    {/* Right column: ProfileHeader and Purchases */}
    <div className="flex flex-col w-full mr-28">
      {/* ProfileHeader with overlap */}
      <div className="">
        <ProfileHeader name="John Smith" email="place@holder.com" />
        {/* Adjusting overlap so the image goes on top */}
      </div>

      {/* Purchases Section */}
      <section className="flex flex-col items-start mt-2.5 mr-40">
        <h2 className="text-2xl font-bold text-orange-400">Previous purchases</h2>
        <p className="mt-1.5 text-lg text-black">View all of your previous ticket purchases.</p>

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
</div>



  );
};

export default ProfilePage;