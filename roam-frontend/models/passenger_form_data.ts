import { Passenger } from "@/models"

export interface PassengerFormData {
    name: string;
    middle?: string;
    last?: string;
    prefix?: string;
    dob?: Date;
    passportNumber?: string;
    email?: string;
    phone?: string;
    streetAddress?: string;
    aptNumber?: string;
    province?: string;
    zipCode?: string;
    emergName?: string;
    emergLast?: string;
    emergEmail?: string;
    emergPhone?: string;
    knownTravellerNumber?: string;
    sameAsPassenger?: boolean;
  }
  

  export function transformToPassenger( formData: PassengerFormData, existingPassenger?: Passenger ): Passenger {
    return {
      guid: existingPassenger?.guid ?? "null",
      tripId: existingPassenger?.tripId ?? "null", 
      name: formData.name,
      departingSeatId: existingPassenger?.departingSeatId ?? 0,
      returningSeatId: existingPassenger?.returningSeatId ?? null,
      middle: formData.middle || "",
      last: formData.last,
      prefix: formData.prefix || "",
      dob: formData.dob || new Date(),
      passportNumber: formData.passportNumber || "",
      knownTravellerNumber: formData.knownTravellerNumber || "",
      email: formData.email || "",
      phone: formData.phone || "",
      streetAddress: formData.streetAddress || "",
      aptNumber: formData.aptNumber || "",
      province: formData.province || "",
      zipCode: formData.zipCode || "",
      emergName: formData.emergName || "",
      emergLast: formData.emergLast || "",
      emergEmail: formData.emergEmail || "",
      emergPhone: formData.emergPhone || ""
    };
  }
  
