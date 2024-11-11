import React from 'react';
import { render, screen } from '@testing-library/react';
import TextUnderline from '@/components/Effects/TextUnderline';

describe('TextUnderline Component', () => {
    test('Renders with default width and height', () => {
        render(<TextUnderline />);

        const underlineElement = screen.getByTestId('text-underline');
        expect(underlineElement).toBeInTheDocument();
        expect(underlineElement).toHaveAttribute('width', '330');
        expect(underlineElement).toHaveAttribute('height', '34');
    });

    test('Applies custom width and height props', () => {
        render(<TextUnderline width={200} height={20} />);

        const underlineElement = screen.getByTestId('text-underline');
        expect(underlineElement).toHaveAttribute('width', '200');
        expect(underlineElement).toHaveAttribute('height', '20');
    });

    test('Applies custom className', () => {
        const customClass = 'custom-underline';
        render(<TextUnderline className={customClass} />);

        const underlineElement = screen.getByTestId('text-underline');
        expect(underlineElement).toHaveClass(customClass);
    });
});
