import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import ForgotPasswordCard from '@/components/ForgotPasswordCard';

/**
 * Test File: Forgot Password Form 
 *
 * Purpose:
 * - Ensures the functionality and rendering behavior of the Forgot Password Form Component. 
 * - The Forgot Password Form Component includes:
 *      - Text indicating functionality of the input bar, an email input section, and two buttons 
 *        (a cancel button and reset password button). 
 *
 * Test Cases:
 * 1. Render the form correctly. 
 *    - Expectation: Render the text "enter your email", an email input section, a reset password button and a cancel button. 
 * 
 * 2. Can submit the form if there is an email input. 
 *    - Expectation: if there is an email entered in the email input OnSubmit will be called once. 
 * 
 * 3. Cannot submit the form if there is NOT an email input.  
 *    - Expectation: if there is not an email entered in the email input OnSubmit will not be called.
 * 
 * 4. The cancel button routes to the previous page. 
 *    - Expectation: If the cancel button is pressed, router.back() will be called once.

 */

// Mock the useRouter hook
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

describe('ForgotPasswordCard', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('Renders the form correctly', () => {
        render(<ForgotPasswordCard onSubmit={() => { }} />);

        // Check if the email label and input are present
        expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/enter your email/i)).toBeInTheDocument();

        // Check if the buttons are present
        expect(screen.getByText(/cancel/i)).toBeInTheDocument();
        expect(screen.getByText(/reset password/i)).toBeInTheDocument();
    });

    it('Calls onSubmit with the entered email when the form is submitted', () => {
        const mockOnSubmit = jest.fn();
        render(<ForgotPasswordCard onSubmit={mockOnSubmit} />);

        const emailInput = screen.getByPlaceholderText(/enter your email/i);
        const submitButton = screen.getByText(/reset password/i);

        // Simulate user typing in the email input
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

        // Simulate form submission
        fireEvent.click(submitButton);

        // Check that onSubmit was called with the correct email
        expect(mockOnSubmit).toHaveBeenCalledWith('test@example.com');
    });

    it('Does not call onSubmit if the email input is empty', () => {
        const mockOnSubmit = jest.fn();
        render(<ForgotPasswordCard onSubmit={mockOnSubmit} />);

        const submitButton = screen.getByText(/reset password/i);

        // Simulate form submission without entering an email
        fireEvent.click(submitButton);

        // Check that onSubmit was not called
        expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    it('Calls router.back() when the cancel button is clicked', () => {
        const mockRouterBack = jest.fn();
        (useRouter as jest.Mock).mockReturnValue({ back: mockRouterBack });

        render(<ForgotPasswordCard onSubmit={() => { }} />);

        const cancelButton = screen.getByText(/cancel/i);

        // Simulate cancel button click
        fireEvent.click(cancelButton);

        // Check that router.back() was called
        expect(mockRouterBack).toHaveBeenCalled();
    });
});