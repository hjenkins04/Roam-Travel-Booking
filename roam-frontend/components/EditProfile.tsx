import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Define props interface for the EditProfile component
interface EditProfileProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const EditProfile: React.FC<EditProfileProps> = ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} data-testid="form">
      {/* Name input section */}
      <section className="flex flex-row gap-6 self-stretch mt-5 text-lg">
        <Input name="firstName" placeholder="First Name*" required />
        <Input name="middleName" placeholder="Middle" />
        <Input name="lastName" placeholder="Last Name*" required />
      </section>

      {/* Suffix and Date of Birth section */}
      <section className="flex flex-row gap-6 mt-6">
        <Input name="suffix" placeholder="Suffix" className="max-w-48" />
        <div className="flex flex-col grow max-w-48">
          <Input name="dateOfBirth" placeholder="Date of Birth*" required />
          <p className="self-stretch px-1 py-0.5 mt-1 w-full text-xs whitespace-nowrap rounded">
            MM/DD/YY
          </p>
        </div>
      </section>

      {/* Contact information section */}
      <section className="flex flex-row gap-5 self-stretch mt-6 text-lg">
        <Input
          name="email"
          placeholder="Email Address*"
          type="email"
          required
        />
        <Input name="phone" placeholder="Phone Number*" type="tel" required />
      </section>

      {/* Address section */}
      <section className="flex flex-col self-stretch mt-6 w-full text-lg max-md:max-w-full">
        <Input name="streetAddress" placeholder="Street Address*" required />
      </section>
      <section className="flex gap-5 justify-between items-start mt-6 w-full text-lg max-w-[524px] max-md:max-w-full">
        <Input
          name="aptNumber"
          placeholder="Apt Number"
          className="w-[115px]"
        />
        <Input
          name="province"
          placeholder="Province*"
          required
          className="w-40"
        />
        <Input
          name="zipCode"
          placeholder="Postal Code*"
          required
          className="w-40"
        />
      </section>

      {/* Submit button */}
      <Button
        data-testid="submit-button"
        type="submit"
        className="mt-20 px-5 py-3 text-lg text-orange-500 border bg-white border-orange-500 hover:bg-orange-500 hover:text-white rounded max-md:mt-10"
      >
        Save
      </Button>
    </form>
  );
};

export default EditProfile;
