import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import EditProfile from "../EditProfile";

/**
 * Test File: Profile EditProfile Component
 *
 * Purpose:
 * - Validates the `EditProfile` component's rendering, form handling, and state management.
 * - The `EditProfile` component provides:
 *      - Required form fields for first name, last name, email, phone number, and address.
 *      - Optional form fields for middle name, suffix, and apartment number.
 *      - A submit button that calls the provided `handleSubmit` function.
 *      - Controlled inputs that update component state through `onChange` functions.
 *
 * Test Cases:
 * 1. Render the required form fields.
 *    - Expectation: The required fields (first name, last name, email, phone number, address, province, and postal code) should be visible and marked as required.
 *
 * 2. Submit the form and call the handleSubmit function.
 *    - Expectation: When the form is submitted, the `handleSubmit` function should be called once.
 *
 * 3. Render the optional form fields.
 *    - Expectation: The optional fields (middle name, suffix, and apartment number) should be visible and not required.
 *
 * 4. Verify onChange event handlers for required fields.
 *    - Expectation: Typing in each required field should trigger the corresponding `onChange` handler and update the respective mock state function with the entered value.
 */

describe("EditProfile Component", () => {
  const mockHandleSubmit = jest.fn();
  const mockSetFirstName = jest.fn();
  const mockSetLastName = jest.fn();
  const mockSetEmail = jest.fn();
  const mockSetPhoneNumber = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Render the required form fields", () => {
    render(
      <EditProfile
        handleSubmit={mockHandleSubmit}
        firstName=""
        setFirstName={mockSetFirstName}
        lastName=""
        setLastName={mockSetLastName}
        email=""
        setEmail={mockSetEmail}
        phoneNumber=""
        setPhoneNumber={mockSetPhoneNumber}
      />
    );

    const placeholders = [
      "First Name*",
      "Last Name*",
      "Email Address*",
      "Phone Number*",
      "Street Address*",
      "Province*",
      "Postal Code*",
    ];
    for (const s of placeholders) {
      const element = screen.getByPlaceholderText(s);
      expect(element).toBeInTheDocument();
      expect(element).toBeRequired();
    }
  });

  test("Submit the form and call the handleSubmit function", () => {
    render(
      <EditProfile
        handleSubmit={mockHandleSubmit}
        firstName=""
        setFirstName={mockSetFirstName}
        lastName=""
        setLastName={mockSetLastName}
        email=""
        setEmail={mockSetEmail}
        phoneNumber=""
        setPhoneNumber={mockSetPhoneNumber}
      />
    );

    const form = screen.getByTestId("form");
    fireEvent.submit(form);

    expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
  });

  test("Render the optional form fields", () => {
    render(
      <EditProfile
        handleSubmit={mockHandleSubmit}
        firstName=""
        setFirstName={mockSetFirstName}
        lastName=""
        setLastName={mockSetLastName}
        email=""
        setEmail={mockSetEmail}
        phoneNumber=""
        setPhoneNumber={mockSetPhoneNumber}
      />
    );

    const placeholders = ["Middle", "Apt Number", "Suffix"];
    for (const s of placeholders) {
      const element = screen.getByPlaceholderText(s);
      expect(element).toBeInTheDocument();
      expect(element).not.toBeRequired();
    }
  });

  test("Update firstName onChange event", () => {
    render(
      <EditProfile
        handleSubmit={mockHandleSubmit}
        firstName=""
        setFirstName={mockSetFirstName}
        lastName=""
        setLastName={mockSetLastName}
        email=""
        setEmail={mockSetEmail}
        phoneNumber=""
        setPhoneNumber={mockSetPhoneNumber}
      />
    );

    const firstNameInput = screen.getByPlaceholderText("First Name*");
    fireEvent.change(firstNameInput, { target: { value: "John" } });
    expect(mockSetFirstName).toHaveBeenCalledWith("John");
  });

  test("Update lastName onChange event", () => {
    render(
      <EditProfile
        handleSubmit={mockHandleSubmit}
        firstName=""
        setFirstName={mockSetFirstName}
        lastName=""
        setLastName={mockSetLastName}
        email=""
        setEmail={mockSetEmail}
        phoneNumber=""
        setPhoneNumber={mockSetPhoneNumber}
      />
    );

    const lastNameInput = screen.getByPlaceholderText("Last Name*");
    fireEvent.change(lastNameInput, { target: { value: "Doe" } });
    expect(mockSetLastName).toHaveBeenCalledWith("Doe");
  });

  test("Update email onChange event", () => {
    render(
      <EditProfile
        handleSubmit={mockHandleSubmit}
        firstName=""
        setFirstName={mockSetFirstName}
        lastName=""
        setLastName={mockSetLastName}
        email=""
        setEmail={mockSetEmail}
        phoneNumber=""
        setPhoneNumber={mockSetPhoneNumber}
      />
    );

    const emailInput = screen.getByPlaceholderText("Email Address*");
    fireEvent.change(emailInput, { target: { value: "john.doe@example.com" } });
    expect(mockSetEmail).toHaveBeenCalledWith("john.doe@example.com");
  });

  test("Update phoneNumber onChange event", () => {
    render(
      <EditProfile
        handleSubmit={mockHandleSubmit}
        firstName=""
        setFirstName={mockSetFirstName}
        lastName=""
        setLastName={mockSetLastName}
        email=""
        setEmail={mockSetEmail}
        phoneNumber=""
        setPhoneNumber={mockSetPhoneNumber}
      />
    );

    const phoneInput = screen.getByPlaceholderText("Phone Number*");
    fireEvent.change(phoneInput, { target: { value: "1234567890" } });
    expect(mockSetPhoneNumber).toHaveBeenCalledWith("1234567890");
  });
});
