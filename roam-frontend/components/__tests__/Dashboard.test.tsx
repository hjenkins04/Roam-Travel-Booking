import react from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
  cleanup,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import ProfilePage from "../ProfilePage";

jest.mock("@/context/AuthContext", () => ({
  useAuth: jest.fn(),
}));
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

/**
 * Test File: Dashboard Page
 *
 * Purpose:
 * - Ensures the functionality and rendering behavior of the Dashboard page.
 * - The Dashboard page includes:
 *      -
 */
