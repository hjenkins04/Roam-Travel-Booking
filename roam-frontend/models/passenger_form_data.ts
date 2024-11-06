import { Passenger } from "@/models"

export interface PassengerFormData {
    name: string;
    middle?: string;
    last?: string;
    prefix?: string;
    dob?: Date;
    passport_number?: string;
    email?: string;
    phone?: string;
    street_address?: string;
    apt_number?: string;
    province?: string;
    zip_code?: string;
    emerg_name?: string;
    emerg_last?: string;
    emerg_email?: string;
    emerg_phone?: string;
    known_traveller_number?: string;
    same_as_passenger?: boolean;
  }
  

  export function transformToPassenger( formData: PassengerFormData, existingPassenger?: Passenger ): Passenger {
    return {
      guid: existingPassenger?.guid ?? "null",
      trip_id: existingPassenger?.trip_id ?? "null", 
      name: formData.name,
      departing_seat_id: existingPassenger?.departing_seat_id ?? 0,
      returning_seat_id: existingPassenger?.returning_seat_id ?? null,
      middle: formData.middle || "",
      last: formData.last,
      prefix: formData.prefix || "",
      dob: formData.dob || new Date(),
      passport_number: formData.passport_number || "",
      known_traveller_number: formData.known_traveller_number || "",
      email: formData.email || "",
      phone: formData.phone || "",
      street_address: formData.street_address || "",
      apt_number: formData.apt_number || "",
      province: formData.province || "",
      zip_code: formData.zip_code || "",
      emerg_name: formData.emerg_name || "",
      emerg_last: formData.emerg_last || "",
      emerg_email: formData.emerg_email || "",
      emerg_phone: formData.emerg_phone || ""
    };
  }
  
