import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import { useLoaderStore } from "@/context/LoaderContext";
import LoaderPopup from "@/components/LoaderPopup";

/**
 * Test File: LoaderContext
 *
 * Purpose:
 * - Ensures the functionality and state management of the LoaderContext.
 * - The LoaderContext includes:
 *      - Functions for showing and hiding the loading popup.
 *      - Functions for controlling children visibility.
 *
 * Test Cases:
 * 1. Displays LoaderPopup when showLoader is called.
 *    - Expectation: Calling showLoader should display the LoaderPopup component.
 *
 * 2. Hides LoaderPopup when hideLoader is called.
 *    - Expectation: After showLoader is called, calling hideLoader should hide the LoaderPopup component.
 *
 * 3. Children visibility updates when showChildren is called.
 *    - Expectation: Setting showChildren after hiding should make children visible again.
 *
 * 4. Children visibility updates when hideChildren is called.
 *    - Expectation: Setting hideChildren should hide the children.
 */

// Parent component to observe changes in isLoading
const Parent = () => {
  const isLoading = useLoaderStore((state) => state.isLoading);
  return <LoaderPopup isOpen={isLoading} />;
};

const ParentDefault = () => {
  return <LoaderPopup />;
};

describe("LoaderPopup visibility based on LoaderContext", () => {

  afterEach(() => {
    // Suppress specific console errors for clean output
    const originalConsoleError = console.error;
    jest.spyOn(console, "error").mockImplementation((msg) => {
      if (msg.includes("Function components cannot be given refs")) {
        return; // Ignore specific warning
      }
      originalConsoleError(msg); // Allow other warnings to be logged
    });
  });

  // Render Parent component
  const renderComponent = () => render(<Parent />);

  const renderComponentDefault = () => render(<ParentDefault />);

  test("Displays LoaderPopup when showLoader is called", async () => {
    // Arrange: Render component
    renderComponent();

    // Act: Trigger showLoader to update isLoading state
    act(() => {
      useLoaderStore.getState().showLoader();
    });

    // Assert: LoaderPopup should be visible
    await waitFor(() => {
      const loaderPopup = screen.getByTestId("loader-popup");
      expect(loaderPopup).toBeInTheDocument();
    });
  });

  test("Hides LoaderPopup when hideLoader is called", async () => {
    // Arrange: Render component and trigger showLoader to show LoaderPopup
    renderComponent();
    act(() => {
      useLoaderStore.getState().showLoader();
    });

    // Act: Trigger hideLoader to update isLoading state
    act(() => {
      useLoaderStore.getState().hideLoader();
    });

    // Assert: LoaderPopup should not be visible
    await waitFor(() => {
      const loaderPopup = screen.queryByTestId("loader-popup");
      expect(loaderPopup).not.toBeInTheDocument();
    });
  });

  test("Loader visibility updates when showChildren is called", () => {
    // Arrange: Set children visibility to hidden first
    act(() => {
      useLoaderStore.getState().hideChildren();
    });

    // Act: Trigger showChildren to make children visible
    act(() => {
      useLoaderStore.getState().showChildren();
    });

    // Assert: Check that children are now visible
    const { childrenHidden } = useLoaderStore.getState();
    expect(childrenHidden).toBe(false);
  });

  test("Children visibility updates when hideChildren is called", () => {
    // Arrange: Render component with children visible

    // Act: Trigger hideChildren to make children hidden
    act(() => {
      useLoaderStore.getState().hideChildren();
    });

    // Assert: Check that children are now hidden
    const { childrenHidden } = useLoaderStore.getState();
    expect(childrenHidden).toBe(true);
  });


  test("Does not displays LoaderPopup when isOpen is not provided", async () => {
    // Arrange: Render component
    renderComponentDefault();

    // Act: Trigger showLoader to update isLoading state
    act(() => {
      useLoaderStore.getState().showLoader();
    });

    // Assert: LoaderPopup should be visible
    await waitFor(() => {
      const loaderPopup = screen.queryByTestId("loader-popup");
      expect(loaderPopup).not.toBeInTheDocument();
    });
  });
});
