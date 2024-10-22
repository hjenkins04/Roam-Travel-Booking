import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ResetPasswordCard from '@/components/ResetPasswordCard';

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

    test('toggles password visibility', () => {
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
    });
});