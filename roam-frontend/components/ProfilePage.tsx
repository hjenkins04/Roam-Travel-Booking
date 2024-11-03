import React, { useState, useEffect } from "react";
// Import necessary components and UI elements
import ProfileHeader from "./ProfileHeader";
import Sidebar from "./ProfileSidebar";
import ProfilePicture from "./Images/ProfilePicture";
import ProfilePreviousPurchases from "@/components/ProfilePreviousPurchases";
import LoaderSuccessFailPopup from "@/components/LoaderSuccessFailPopup";
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
import EditProfile from "@/components/EditProfile";
import { useAuthStore } from "@/context/AuthContext";
import { fetchUpdate } from "@/api/FetchUpdate";
import { fetchUserInfo } from "@/api/FetchUserInfo";
import { DisplayPurchase, Trip, mapTripToPurchase } from "@/models";
import { fetchTrips } from "@/api/FetchTrips";
import { RemoveTripByGuid } from "@/api/RemoveTrip";
import { RemoveTripTicketByGuidAndIndex } from "@/api/RemoveTripTicket";

const ProfilePage: React.FC = () => {
  // State variables for managing profile editing and modals
  const [editProfile, setEditProfile] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  const [refundOpen, setRefundOpen] = useState(false);
  const [refundConfirmAction, setRefundAction] = useState<() => void>(() => {});
  const [refundHeaderText, setRefundHeaderText] = useState("");
  const [refundBodyText, setRefundBodyText] = useState("");
  const [sucessRefundOpen, setSucessRefundOpen] = useState(false);
  const [sucessHeaderText] = useState("");
  const [sucessBodyText] = useState("");

  const [successLoader, setSuccessLoading] = useState(false);
  const [successLoaderState, setSuccessLoaderState] = useState<
    "loading" | "success" | "fail"
  >("loading");
  const [successLoaderShowButton] = useState(false);
  const [successLoaderButtonLabel] = useState("Home");

  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const { authData } = useAuthStore();
  const [firstNameProp, setFirstNameProp] = useState("");
  const [lastNameProp, setLastNameProp] = useState("");
  const [emailProp, setEmailProp] = useState("");

  const [purchases, setPurchases] = useState<DisplayPurchase[]>([]);

  // Event handlers for form submission and cancellation
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await fetchUpdate(authData.guid, firstName, lastName, email, phoneNumber);
      setSuccessModalOpen(true);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const userInfo = await fetchUserInfo(authData.guid);
        setFirstNameProp(userInfo.first_name);
        setLastNameProp(userInfo.last_name);
        setEmailProp(userInfo.email);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };
    getUserInfo();
  }, [authData.guid]);

  useEffect(() => {
    fetchTrips()
      .then((data: Trip[]) => {
        setPurchases(data.map((trip) => mapTripToPurchase(trip)));
      })
      .catch((error: unknown) => {
        console.error("Error fetching trips:", error);
      });
  }, []);

  const handleRefundTicket = async (guid: string, index: number) => {
    setRefundOpen(false);
    setSuccessLoading(true);
    setSuccessLoaderState("loading");

    try {
      await RemoveTripTicketByGuidAndIndex(guid, index);
      setSuccessLoaderState("success");
    } catch (error) {
      console.error("Error deleting trip ticket:", error);
      setSuccessLoaderState("fail");
    } finally {
      setTimeout(() => {
        setSuccessLoading(false);
      }, 2000);
    }
  };

  const handleDeleteTicket = (guid: string, index: number) => {
    setRefundAction(() => () => handleRefundTicket(guid, index));
    setRefundHeaderText("Confirm Ticket Refund");
    setRefundBodyText(
      "By confirming this action, you will proceed with the refund request for your flight ticket. Once confirmed, the ticket will be cancelled, and the refund process will be initiated."
    );
    setRefundOpen(true);
  };

  const handleRefundTrip = async (guid: string) => {
    setRefundOpen(false);
    setSuccessLoading(true);
    setSuccessLoaderState("loading");

    try {
      await RemoveTripByGuid(guid);
      setSuccessLoaderState("success");
    } catch (error) {
      console.error("Error deleting trip:", error);
      setSuccessLoaderState("fail");
    } finally {
      setTimeout(() => {
        setSuccessLoading(false);
      }, 2000);
    }
  };

  const handleDeleteTrip = (guid: string) => {
    setRefundAction(() => () => handleRefundTrip(guid));
    setRefundHeaderText("Confirm Trip Refund");
    setRefundBodyText(
      "By confirming this action, you will proceed with the refund request for the full trip. Once confirmed, all tickets will be cancelled, and the refund process will be initiated."
    );
    setRefundOpen(true);
  };

  return (
    <>
      <LoaderSuccessFailPopup
        isOpen={successLoader}
        status={successLoaderState}
        showButton={successLoaderShowButton}
        buttonLabel={successLoaderButtonLabel}
        onButtonClick={undefined}
      />

      <div className="relative min-h-screen">
        <Header
          headerSize={"tall"}
          backgroundImage={true}
          logoColour={"black"}
          displayProfilePicture={false}
        />
        <main className="pl-16 mt-3 w-full max-md:pl-5 max-md:max-w-full relative">
          <div className="flex flex-row">
            <div className="relative z-20 mt-[3%]">
              <ProfilePicture pictureSize={"200px"} />
            </div>
            <div className="relative mt-[6%] w-[85%] ml-[-3%]">
              <ProfileHeader
                name={`${firstNameProp} ${lastNameProp}`}
                email={emailProp}
                onEditProfile={() => setEditProfile(true)}
              />
            </div>
          </div>

          <div className="flex flex-row w-full mr-28 gap-10">
            <section>
              <h1 className="text-2xl font-semibold text-orange-400 mt-5">
                My Profile
              </h1>
              <div className="mt-6">
                <Sidebar onEditProfile={() => setEditProfile(false)} />
              </div>
            </section>

            <section className="flex-1 h-[calc(100vh-200px)] overflow-y-auto px-4 py-4">
              {" "}
              {/* Adjust 200px as per header and padding */}
              {!editProfile ? (
                <ProfilePreviousPurchases
                  purchases={purchases}
                  onDeleteTicket={handleDeleteTicket}
                  onDeleteTrip={handleDeleteTrip}
                />
              ) : (
                <div className="flex flex-col">
                  <h2 className="text-2xl font-bold text-orange-400">
                    Account Information
                  </h2>
                  <p className="mt-1.5 text-lg text-black">
                    Edit your account information.
                  </p>
                  <div className="bg-white rounded-lg mt-2 px-6 py-4">
                    <EditProfile
                      handleSubmit={handleSubmit}
                      firstName={firstName}
                      setFirstName={setFirstName}
                      lastName={lastName}
                      setLastName={setLastName}
                      email={email}
                      setEmail={setEmail}
                      phoneNumber={phoneNumber}
                      setPhoneNumber={setPhoneNumber}
                    />
                  </div>
                </div>
              )}
            </section>
          </div>
        </main>
      </div>

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

      <Dialog open={refundOpen} onOpenChange={setRefundOpen}>
        <DialogContent>
          <DialogTitle>{refundHeaderText}</DialogTitle>
          <DialogDescription>{refundBodyText}</DialogDescription>
          <DialogFooter>
            <Button
              className="mt-4 px-4 py-2 bg-white hover:bg-orange-400 text-orange-500 hover:text-white"
              onClick={refundConfirmAction}
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

      <Dialog open={sucessRefundOpen} onOpenChange={setSucessRefundOpen}>
        <DialogContent>
          <DialogTitle>{sucessHeaderText}</DialogTitle>
          <DialogDescription>{sucessBodyText}</DialogDescription>
          <DialogFooter>
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
