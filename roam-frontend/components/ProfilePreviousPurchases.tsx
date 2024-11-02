import React, { FC } from "react";
import PurchaseItem from "./PurchaseItem";
import { DisplayPurchase } from "@/models"
import { Ban } from "lucide-react";

interface ProfilePreviousPurchasesProps {
    purchases: DisplayPurchase[];
    onDeleteTicket: (guid: string, index: number) => void;
    onDeleteTrip: (guid: string) => void;
}

const ProfilePreviousPurchases: FC<ProfilePreviousPurchasesProps> = ({ purchases, onDeleteTicket, onDeleteTrip }) => {
    return (
        <div className="flex flex-col overflow-hidden hide-scrollbar">
            <h2 className="text-2xl font-bold text-orange-400">Previous Purchases</h2>
            <p className="mt-1.5 text-lg text-black">View all of your previous ticket purchases.</p>
            <div className="flex flex-col overflow-y-auto h-full mt-2 bg-white hide-scrollbar px-4 py-4 gap-6">
                {purchases.map((purchase, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md p-6 mb-4 w-full max-w-4xl border border-gray-200 relative">
                        <div className="flex flex-col gap-4">
                            <div className="flex justify-between items-center">
                                <h2 className="text-2xl font-semibold text-gray-700">{purchase.title}</h2>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-500 pr-4">Total Tickets: {purchase.passengers.length}</span>
                                    <Ban
                                        data-testid="cancel-icon"
                                        className="text-gray-400 hover:text-red-500 cursor-pointer"
                                        onClick={() => onDeleteTrip(purchase.guid)}
                                    />
                                </div>
                            </div>
                        </div>

                        
                        <div className={`overflow-y-auto ${purchase.passengers.length > 2 ? "max-h-96" : ""} hide-scrollbar`}>
                            {purchase.passengers.map((passenger, i) => (
                                <div key={i} className="mb-4">
                                    <h3 className="text-lg font-medium text-gray-600 mb-2">Ticket {i + 1}: {passenger.name}</h3>
                                    <PurchaseItem 
                                        ban={purchase.passengers.length > 1} 
                                        purchasePassenger={passenger} 
                                        onCancelClick={() => onDeleteTicket(purchase.guid, i)} 
                                    />
                                </div>
                            ))}
                        </div>
                    
                        {/* Add a divider if this is not the last trip */}
                        {index < purchases.length - 1 && (
                            <div className="border-t border-gray-300 mt-4"></div>
                        )}
                    </div>                
                ))}
            </div>
        </div>
    )

};

export default ProfilePreviousPurchases;