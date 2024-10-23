import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ResetPasswordCard from '@/components/ResetPasswordCard';

/**
 * Test File: Reset Password Form 
 *
 * Purpose:
 * - Ensures the functionality and rendering behavior of the Reset Password Form Component. 
 * - The Reset Password Form Component includes:
 *      - Two input sections: New Password and Confirm Password 
 *
 * Test Cases:
 * 1. Render the form correctly. 
 *    - Expectation: The two input sections new password and confirm password are visible. 
 * 
 * 2. Can toggle visibility of New Password Input 
 *    - Expectation: Clicking the toggle button should switch the new password type between 
 *      password and text. 
 * 
 * 3. Can toggle visibility of Confirm Password Input 
 *    - Expectation: Clicking the toggle button should switch the confirm password type between 
 *      password and text. 
 * 
 * 4. Form submits if passwords match
 *    - Expectation: If password inputs match, the onSubmit function will be called once. 
 * 
 * 5. Form does not submit if passwords do not match
 *    - Expectation:If password inputs do not match, the onSubmit function will not be called. 
*/

describe('ResetPasswordCard Component', () => {
    const mockOnSubmit = jest.fn();

    beforeEach(() => {
        mockOnSubmit.mockClear();
    });

    test('renders the component correctly', () => {
        render(<ResetPasswordCard onSubmit={mockOnSubmit} />);

        expect(screen.getByLabelText(/New Password/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Confirm Password/i)).toBeInTheDocument();
    });

    test('toggles new password visibility', () => {
        render(<ResetPasswordCard onSubmit={mockOnSubmit} />);

        const passwordInput = screen.getByLabelText(/New Password/i);
        const toggleButton = screen.getAllByRole('button')[0];

        // Initially should be of type "password"
        expect(passwordInput).toHaveAttribute('type', 'password');

        // Click to show password
        fireEvent.click(toggleButton);
        expect(passwordInput).toHaveAttribute('type', 'text');

        // Click to hide password again
        fireEvent.click(toggleButton);
        expect(passwordInput).toHaveAttribute('type', 'password');
    });

    test('toggles confirm password visibility', () => {
        render(<ResetPasswordCard onSubmit={mockOnSubmit} />);

        const confirmPasswordInput = screen.getByLabelText(/Confirm Password/i);
        const toggleButton = screen.getAllByRole('button')[1];

        // Initially should be of type "password"
        expect(confirmPasswordInput).toHaveAttribute('type', 'password');

        // Click to show password
        fireEvent.click(toggleButton);
        expect(confirmPasswordInput).toHaveAttribute('type', 'text');

        // Click to hide password again
        fireEvent.click(toggleButton);
        expect(confirmPasswordInput).toHaveAttribute('type', 'password');
    });

    test('submits the form when passwords match', () => {
        render(<ResetPasswordCard onSubmit={mockOnSubmit} />);

        const newPasswordInput = screen.getByLabelText(/New Password/i);
        const confirmPasswordInput = screen.getByLabelText(/Confirm Password/i);
        const form = screen.getByTestId('reset-password-form');

        fireEvent.change(newPasswordInput, { target: { value: 'newpassword123' } });
        fireEvent.change(confirmPasswordInput, { target: { value: 'newpassword123' } });

        fireEvent.submit(form);

        expect(mockOnSubmit).toHaveBeenCalledWith('newpassword123');
    });

    test('does not submit the form if passwords do not match', () => {
        render(<ResetPasswordCard onSubmit={mockOnSubmit} />);

        const newPasswordInput = screen.getByLabelText(/New Password/i);
        const confirmPasswordInput = screen.getByLabelText(/Confirm Password/i);
        const form = screen.getByTestId('reset-password-form');

        fireEvent.change(newPasswordInput, { target: { value: 'newpassword123' } });
        fireEvent.change(confirmPasswordInput, { target: { value: 'differentpassword' } });

        fireEvent.submit(form);

        expect(mockOnSubmit).not.toHaveBeenCalled();
        expect(screen.getByText('Passwords do not match')).toBeInTheDocument();
    });
});