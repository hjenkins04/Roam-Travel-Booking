import {
  transformToPassenger,
  type PassengerFormData,
} from "../../models/passenger_form_data";
import type { Passenger } from "@/models";

/**
 * Test Suite for Passenger Data Transformation
 *
 * This suite tests the `transformToPassenger` utility function, which converts form data
 * into a standardized passenger object format. The function handles both new passenger
 * creation and updates to existing passenger records.
 *
 * The transformation process includes:
 * - Converting form data to the Passenger interface format
 * - Handling optional fields with default values
 * - Preserving existing passenger data when updating
 * - Managing null/undefined values appropriately
 *
 * Test Cases:
 * 1. Minimal Form Data Transformation:
 *    - Tests transformation with only required fields (name)
 *    - Verifies default values are set for optional fields
 *    - Ensures correct handling of null values for new passengers
 *
 * 2. Full Form Data Transformation:
 *    - Validates transformation with all fields populated
 *    - Verifies correct mapping of all passenger information
 *    - Ensures proper handling of dates and complex fields
 *
 * 3. Existing Passenger Data Preservation:
 *    - Confirms retention of important fields (guid, trip_id, seat IDs)
 *    - Verifies non-form fields remain unchanged during transformation
 *    - Ensures system-generated fields are preserved
 *
 * 4. Form Data Override Behavior:
 *    - Tests that new form data correctly overrides existing data
 *    - Verifies partial updates work as expected
 *    - Ensures proper precedence of form data over existing data
 *
 * 5. Optional Fields Handling:
 *    - Tests undefined optional fields are handled correctly
 *    - Verifies empty string vs undefined behavior
 *    - Ensures consistent handling of optional field defaults
 */

describe("transformToPassenger", () => {
  const mockDate = new Date("2024-01-01");

  const minimalFormData: PassengerFormData = {
    name: "John",
  };

  const fullFormData: PassengerFormData = {
    name: "John",
    middle: "Michael",
    last: "Doe",
    prefix: "Mr",
    dob: mockDate,
    passport_number: "AB123456",
    email: "john@example.com",
    phone: "1234567890",
    street_address: "123 Main St",
    apt_number: "4B",
    province: "ON",
    zip_code: "12345",
    emerg_name: "Jane",
    emerg_last: "Doe",
    emerg_email: "jane@example.com",
    emerg_phone: "0987654321",
    known_traveller_number: "TN123456",
    same_as_passenger: true,
  };

  const existingPassenger: Passenger = {
    guid: "existing-guid",
    trip_id: "trip-123",
    name: "Old Name",
    departing_seat_id: 42,
    returning_seat_id: 24,
    middle: "Old Middle",
    last: "Old Last",
    prefix: "Old Prefix",
    dob: new Date("2000-01-01"),
    passport_number: "OLD123",
    known_traveller_number: "OLD456",
    email: "old@example.com",
    phone: "oldphone",
    street_address: "old address",
    apt_number: "old apt",
    province: "old province",
    zip_code: "old zip",
    emerg_name: "old emerg",
    emerg_last: "old emerglast",
    emerg_email: "oldemerg@example.com",
    emerg_phone: "oldemergphone",
  };

  test("should transform minimal form data without existing passenger", () => {
    const result = transformToPassenger(minimalFormData);

    expect(result).toEqual({
      guid: "null",
      trip_id: "null",
      name: "John",
      departing_seat_id: 0,
      returning_seat_id: null,
      middle: "",
      last: undefined,
      prefix: "",
      dob: expect.any(Date),
      passport_number: "",
      known_traveller_number: "",
      email: "",
      phone: "",
      street_address: "",
      apt_number: "",
      province: "",
      zip_code: "",
      emerg_name: "",
      emerg_last: "",
      emerg_email: "",
      emerg_phone: "",
    });
  });

  test("should transform full form data without existing passenger", () => {
    const result = transformToPassenger(fullFormData);

    expect(result).toEqual({
      guid: "null",
      trip_id: "null",
      name: "John",
      departing_seat_id: 0,
      returning_seat_id: null,
      middle: "Michael",
      last: "Doe",
      prefix: "Mr",
      dob: mockDate,
      passport_number: "AB123456",
      known_traveller_number: "TN123456",
      email: "john@example.com",
      phone: "1234567890",
      street_address: "123 Main St",
      apt_number: "4B",
      province: "ON",
      zip_code: "12345",
      emerg_name: "Jane",
      emerg_last: "Doe",
      emerg_email: "jane@example.com",
      emerg_phone: "0987654321",
    });
  });

  test("should preserve existing passenger data for non-form fields", () => {
    const result = transformToPassenger(minimalFormData, existingPassenger);

    expect(result.guid).toBe(existingPassenger.guid);
    expect(result.trip_id).toBe(existingPassenger.trip_id);
    expect(result.departing_seat_id).toBe(existingPassenger.departing_seat_id);
    expect(result.returning_seat_id).toBe(existingPassenger.returning_seat_id);
  });

  test("should override existing passenger data with form data", () => {
    const result = transformToPassenger(fullFormData, existingPassenger);

    expect(result.name).toBe(fullFormData.name);
    expect(result.middle).toBe(fullFormData.middle);
    expect(result.last).toBe(fullFormData.last);
    expect(result.email).toBe(fullFormData.email);
  });

  test("should handle undefined optional fields correctly", () => {
    const partialFormData: PassengerFormData = {
      name: "John",
      middle: undefined,
      last: undefined,
      email: undefined,
    };

    const result = transformToPassenger(partialFormData);

    expect(result.middle).toBe("");
    expect(result.last).toBeUndefined();
    expect(result.email).toBe("");
  });
});
