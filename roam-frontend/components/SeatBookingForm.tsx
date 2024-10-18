import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import SearchResultsOverviewBox from "@/components/SearchResultsOverviewBox";

interface SeatBookingFormProps {
  groupSize: number;
  namePlaceHolder: string;
  seatNumber: number;
  setPassengerName: (name: string) => void; // New prop to update passenger name
  formRef: React.RefObject<HTMLFormElement>; // Ref for form submission
}

const SeatBookingForm: React.FC<SeatBookingFormProps> = ({
  groupSize,
  namePlaceHolder,
  seatNumber,
  setPassengerName,
  formRef,
}) => {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    suffix: "",
    dob: undefined as Date | undefined,
    passportNumber: "",
    email: "",
    phoneNumber: "",
    streetAddress: "",
    aptNumber: "",
    province: "",
    zipCode: "",
    emergencyFirstName: "",
    emergencyLastName: "",
    emergencyEmail: "",
    emergencyPhoneNumber: "",
    knownTravellerNumber: "",
    sameAsPassenger: false,
  });

  // Effect to update passengerName in the parent component when form data changes
  useEffect(() => {
    const fullName = `${formData.firstName} ${formData.lastName}`.trim();
    setPassengerName(fullName);
  }, [formData.firstName, formData.lastName, setPassengerName]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCheckboxChange = (checked: boolean | "indeterminate") => {
    setFormData((prev) => ({
      ...prev,
      sameAsPassenger: checked === true, // Ensure boolean value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <>
      <SearchResultsOverviewBox />
      <div className="flex pt-10">
        <div className="w-1/6">
          <Avatar className="w-4/5 h-fit">
            <AvatarImage src="/images/avatar.png" alt="Passenger Avatar" />
            <AvatarFallback>Avatar</AvatarFallback>
          </Avatar>
        </div>
        <form onSubmit={handleSubmit} ref={formRef} className="space-y-6 w-5/6">
          {/* Passenger Info */}
          <div className="flex items-start space-x-4">
            <div>
              <h2 className="text-xl font-semibold text-slate-500">Passenger 1 (Adult)</h2>
            </div>
          </div>

          {/* Form Grid */}
          <div className="grid grid-cols-3 gap-4">
            <Input
              placeholder="First name*"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
            <Input
              placeholder="Middle"
              name="middleName"
              value={formData.middleName}
              onChange={handleInputChange}
            />
            <Input
              placeholder="Last name*"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
            <Input
              placeholder="Suffix"
              name="suffix"
              value={formData.suffix}
              onChange={handleInputChange}
            />

            {/* Date Picker for Date of Birth */}
            <Popover>
              <PopoverTrigger asChild>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Date of birth*"
                    name="dob"
                    value={formData.dob ? format(formData.dob, "PPP") : ""}
                    onChange={() => {}}
                    required
                    className="w-full h-full p-3 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    readOnly
                  />
                  <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                    <CalendarIcon className="text-gray-500 h-5 w-5" />
                  </div>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formData.dob} // selected now expects Date | undefined
                  onSelect={(date) => setFormData({ ...formData, dob: date })}
                  disabled={(date) =>
                    date > new Date() || date < new Date("1900-01-01")
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Passport and Contact Info */}
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Passport number*"
              name="passportNumber"
              value={formData.passportNumber}
              onChange={handleInputChange}
              required
            />
            <Input
              placeholder="Known traveller number*"
              name="knownTravellerNumber"
              value={formData.knownTravellerNumber}
              onChange={handleInputChange}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              type="email"
              placeholder="Email address*"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <Input
              type="tel"
              placeholder="Phone number*"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Address Info */}
          <Input
            placeholder="Street address*"
            name="streetAddress"
            value={formData.streetAddress}
            onChange={handleInputChange}
            required
          />
          <div className="grid grid-cols-3 gap-4">
            <Input
              placeholder="Apt Number"
              name="aptNumber"
              value={formData.aptNumber}
              onChange={handleInputChange}
            />
            <Input
              placeholder="Province*"
              name="province"
              value={formData.province}
              onChange={handleInputChange}
              required
            />
            <Input
              placeholder="Zip code*"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Emergency Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mt-4 text-slate-500">Emergency contact information</h3>
            <div className="flex items-center space-x-2 mt-3">
              <Checkbox
                id="sameAsPassenger"
                name="sameAsPassenger"
                checked={formData.sameAsPassenger}
                onCheckedChange={handleCheckboxChange}
              />
              <label htmlFor="sameAsPassenger" className="text-slate-400">Same as Passenger 1</label>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="First name*"
              name="emergencyFirstName"
              value={formData.emergencyFirstName}
              onChange={handleInputChange}
              required={!formData.sameAsPassenger}
            />
            <Input
              placeholder="Last name*"
              name="emergencyLastName"
              value={formData.emergencyLastName}
              onChange={handleInputChange}
              required={!formData.sameAsPassenger}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              type="email"
              placeholder="Email address*"
              name="emergencyEmail"
              value={formData.emergencyEmail}
              onChange={handleInputChange}
              required={!formData.sameAsPassenger}
            />
            <Input
              type="tel"
              placeholder="Phone number*"
              name="emergencyPhoneNumber"
              value={formData.emergencyPhoneNumber}
              onChange={handleInputChange}
              required={!formData.sameAsPassenger}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default SeatBookingForm;
