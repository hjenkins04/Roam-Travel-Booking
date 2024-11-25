import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import ProfilePage from "../ProfilePage";
import { useAuthStore } from "@/context/AuthContext";
import { fetchUserInfo } from "@/api/FetchUserInfo";
import { fetchTrips } from "@/api/FetchTrips";
import { fetchUpdate } from "@/api/FetchUpdate";
import { RemoveTripByGuid } from "@/api/RemoveTrip";
import { RemoveTripTicketByGuidAndIndex } from "@/api/RemoveTripTicket";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  usePathname: () => "/profile",
}));

jest.mock("@/context/AuthContext", () => ({
  useAuthStore: jest.fn(),
}));

jest.mock("@/api/FetchUserInfo", () => ({
  fetchUserInfo: jest.fn(),
}));

jest.mock("@/api/FetchTrips", () => ({
  fetchTrips: jest.fn(),
}));

jest.mock("@/api/FetchUpdate", () => ({
  fetchUpdate: jest.fn(),
}));

jest.mock("@/api/RemoveTrip", () => ({
  RemoveTripByGuid: jest.fn(),
}));

jest.mock("@/api/RemoveTripTicket", () => ({
  RemoveTripTicketByGuidAndIndex: jest.fn(),
}));

const customRender = (ui: React.ReactElement) => {
  return render(ui);
};

describe("ProfilePage Integration Tests", () => {
  const mockUserInfo = {
    first_name: "John",
    last_name: "Doe",
    email: "john.doe@example.com",
    guid: "user123",
  };

  const mockTrips = [
    {
      guid: "trip123",
      passengers: [
        {
          name: "John Doe",
          departing_flight_number: "FL123",
          returning_flight_number: "FL124",
        },
      ],
      total_cost: 500,
    },
  ];

  const originalConsoleError = console.error;

  beforeEach(() => {
    jest.clearAllMocks();
    console.error = jest.fn();
    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      authData: { guid: "user123" },
    });
    (fetchUserInfo as jest.Mock).mockResolvedValue(mockUserInfo);
    (fetchTrips as jest.Mock).mockResolvedValue(mockTrips);
  });

  afterEach(() => {
    console.error = originalConsoleError;
  });

  test("renders profile page with user information", async () => {
    render(<ProfilePage />);

    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("john.doe@example.com")).toBeInTheDocument();
    });

    expect(fetchUserInfo).toHaveBeenCalledWith("user123");
  });

  test("handles profile editing flow successfully", async () => {
    (fetchUpdate as jest.Mock).mockResolvedValueOnce({});

    render(<ProfilePage />);

    // Click edit profile button
    const editButton = screen.getByText("Edit Profile");
    fireEvent.click(editButton);

    // Fill in the form
    const firstNameInput = screen.getByPlaceholderText("First Name*");
    const lastNameInput = screen.getByPlaceholderText("Last Name*");
    const emailInput = screen.getByPlaceholderText("Email Address*");
    const phoneInput = screen.getByPlaceholderText("Phone Number*");
    const dobInput = screen.getByPlaceholderText("Date of Birth*");
    const addressInput = screen.getByPlaceholderText("Street Address*");
    const provinceInput = screen.getByPlaceholderText("Province*");
    const postalCodeInput = screen.getByPlaceholderText("Postal Code*");

    fireEvent.change(firstNameInput, { target: { value: "Jane" } });
    fireEvent.change(lastNameInput, { target: { value: "Smith" } });
    fireEvent.change(emailInput, {
      target: { value: "jane.smith@example.com" },
    });
    fireEvent.change(phoneInput, { target: { value: "1234567890" } });
    fireEvent.change(dobInput, { target: { value: "1990/01/01" } });
    fireEvent.change(addressInput, { target: { value: "123 Main St" } });
    fireEvent.change(provinceInput, { target: { value: "Ontario" } });
    fireEvent.change(postalCodeInput, { target: { value: "A1A 1A1" } });

    // Submit form
    const submitButton = screen.getByText("Save");
    fireEvent.click(submitButton);

    // Verify success modal
    await waitFor(() => {
      expect(screen.getByText("Account Updated")).toBeInTheDocument();
    });

    expect(fetchUpdate).toHaveBeenCalledWith(
      "user123",
      "Jane",
      "Smith",
      "jane.smith@example.com",
      "1234567890"
    );
  });

  test("handles trip refund flow", async () => {
    (RemoveTripByGuid as jest.Mock).mockResolvedValueOnce({});

    render(<ProfilePage />);

    // Wait for trips to load
    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
    });

    // Click refund trip button
    const refundButton = screen.getByTestId("cancel-icon");
    fireEvent.click(refundButton);

    // Confirm refund
    const confirmButton = screen.getByText("Confirm");
    fireEvent.click(confirmButton);

    // Verify loader appears
    await waitFor(() => {
      expect(screen.getByText("Success")).toBeInTheDocument();
    });

    // Verify API call
    expect(RemoveTripByGuid).toHaveBeenCalledWith("trip123");
  });

  test("handles API errors gracefully", async () => {
    const error = new Error("API Error");
    (fetchTrips as jest.Mock).mockRejectedValueOnce(error);

    customRender(<ProfilePage />);

    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith(
        "Error fetching trips:",
        error
      );
    });
  });
});
