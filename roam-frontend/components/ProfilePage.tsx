import React, { useState } from "react";
// Import necessary components and UI elements
import ProfileHeader from "./ProfileHeader";
import PurchaseItem from "./PurchaseItem";
import Sidebar from "./ProfileSidebar";
import ProfilePicture from "./Images/ProfilePicture";
import Header from "./Header";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogFooter,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import EditProfile from "./EditProfile";

const ProfilePage: React.FC = () => {
  // State variables for managing profile editing and modals
  const [editProfile, setEditProfile] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);

  // Event handlers for form submission and cancellation
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuccessModalOpen(true);
  };

  const handleCancel = () => {
    setCancelModalOpen(true);
  };

  const handleCancelConfirm = () => {
    console.log("Flight cancelled!");
    setCancelModalOpen(false);
  };

  // Mock data for previous purchases
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
    <>
      <div className="relative min-h-screen">
        {/* Header component */}
        <Header
          headerSize={"tall"}
          backgroundImage={true}
          logoColour={"black"}
          displayProfilePicture={false}
        />
        <main className="pl-16 mt-3 w-full max-md:pl-5 max-md:max-w-full relative">
          {/* Profile picture and header section */}
          <div className="flex flex-row">
            <div className="relative z-20 mt-[3%]">
              <ProfilePicture pictureSize={"200px"} />
            </div>
            <div className="relative mt-[6%] w-[85%] ml-[-3%]">
              {/* Pass setEditProfile as a prop to ProfileHeader */}
              <ProfileHeader
                name="User Fake"
                email="user@email.com"
                onEditProfile={() => setEditProfile(true)} // Set editProfile to true on click
              />
            </div>
          </div>

          <div className="flex flex-row w-full mr-28 gap-10">
            {/* Sidebar section */}
            <section className="">
              <h1 className="text-2xl font-semibold text-orange-400 mt-5">
                My Profile
              </h1>
              <div className="mt-6">
                <Sidebar onEditProfile={() => setEditProfile(false)} />
              </div>
            </section>

            {/* Main content section - toggles between purchases and edit profile */}
            {!editProfile ? (
              <section className="flex flex-col items-start mt-2.5 mr-40">
                <h2 className="text-2xl font-bold text-orange-400">
                  Previous Purchases
                </h2>
                <p className="mt-1.5 text-lg text-black">
                  View all of your previous ticket purchases.
                </p>

                <div className="flex flex-col self-stretch pt-2 mt-2 bg-white rounded-lg max-md:pt-24 max-md:max-w-full">
                  <div className="flex flex-col px-4 bg-white rounded-lg max-md:max-w-full">
                    {purchases.map((purchase, index) => (
                      <>
                        <h2 className="text-xl mt-5 font-semibold text-gray-700">
                          {purchase.title}
                        </h2>
                        <PurchaseItem
                          key={index}
                          {...purchase}
                          onCancelClick={handleCancel}
                        />
                      </>
                    ))}
                  </div>
                </div>
              </section>
            ) : (
              <section className="flex flex-col items-start mt-2.5 mr-40">
                <h2 className="text-2xl font-bold text-orange-400">
                  Account Information
                </h2>
                <p className="mt-1.5 text-lg text-black">
                  Edit your account information.
                </p>

                <div className="flex flex-col self-stretch pt-2 mt-2 bg-white rounded-lg max-md:pt-24 max-md:max-w-full">
                  <EditProfile handleSubmit={handleSubmit} />
                </div>
              </section>
            )}
          </div>
        </main>
      </div>

      {/* Success modal for profile update */}
      <Dialog open={successModalOpen} onOpenChange={setSuccessModalOpen}>
        <DialogContent>
          <DialogTitle>Account Updated</DialogTitle>
          <DialogDescription>
            Your profile information has been successfully updated.
          </DialogDescription>
          <DialogFooter>
            <DialogClose asChild>
              <Button className="mt-4 px-4 py-2 bg-orange-500 hover:bg-orange-400 text-white">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirmation modal for ticket cancellation */}
      <Dialog open={cancelModalOpen} onOpenChange={setCancelModalOpen}>
        <DialogContent>
          <DialogTitle>Confirm Ticket Refund</DialogTitle>
          <DialogDescription>
            By confirming this action, you will proceed with the refund request
            for your flight ticket. Once confirmed, the ticket will be
            cancelled,a nd the refund process will be initiated.
          </DialogDescription>
          <DialogFooter>
            <Button
              className="mt-4 px-4 py-2 bg-white hover:bg-orange-400 text-orange-500 hover:text-white"
              onClick={handleCancelConfirm}
            >
              Confirm
            </Button>
            <DialogClose asChild>
              <Button className="mt-4 px-4 py-2 bg-orange-500 hover:bg-orange-400 text-white">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProfilePage;
