"use client";

import React, { FC, ReactNode, useState } from "react";

interface FilterButtonProps {
    rightIcon: ReactNode;
    mainTextRight: string;
    className?: string;
    customTextColour?: string;
    options: string[];
    dataTestId: string;
    onOptionSelect: (option: string | null) => void; // Allow null for reset
    selectedOption: string | null;
}

const FilterButton: FC<FilterButtonProps> = ({
    rightIcon,
    mainTextRight,
    className = "",
    customTextColour = 'text-gray-600',
    options,
    dataTestId,
    onOptionSelect,
    selectedOption,
}) => {
    const [isDropdownOpen, setDropdownOpen] = useState(false); // State to control dropdown visibility

    const toggleDropdown = () => {
        setDropdownOpen((prev) => !prev);
    };

    const handleOptionSelect = (option: string | null) => {
        onOptionSelect(option); // Call the parent handler
        setDropdownOpen(false); // Close dropdown after selection
    };

    // Close dropdown if clicked outside
    const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (!target.closest(`[data-testid="${dataTestId}"]`)) {
            setDropdownOpen(false);
        }
    };

    // Attach and clean up event listener for clicks outside the dropdown
    React.useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className={`relative ${className}`}>
            <div
                className={`flex items-center justify-between bg-white rounded-md shadow-md p-3 border border-gray-300 cursor-pointer`}
                onClick={toggleDropdown}
                style={{ minHeight: "40px", maxWidth: "fit-content" }}
                data-testid={dataTestId}
            >
                {/* Main Text */}
                <div className="flex flex-col text-left">
                    {/* Default text or selected option */}
                    {!selectedOption ? (
                        <span className={`text-sm font-medium text-left ${customTextColour}`}>
                            {mainTextRight}
                        </span>
                    ) : (
                        <>
                            <span className="text-xs font-medium text-left text-gray-600">
                                {mainTextRight}
                            </span>
                            <span className={`text-xs font-medium text-left ${customTextColour}`}>
                                {selectedOption}
                            </span>
                        </>
                    )}
                </div>
                <div className="ml-2 cursor-pointer">{rightIcon}</div>
            </div>
            {isDropdownOpen && (
                <div className="absolute z-10 mt-2 w-40 bg-white border border-gray-300 rounded-md shadow-lg">
                    <ul data-testid="dropdown-list" className="py-2 ">
                        {options.map((option, index) => (
                            <li
                                key={index}
                                className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                                onClick={() => handleOptionSelect(option)} // Handle option selection
                                data-testid={`dropdown-selection-${index}`}
                            >
                                {option}
                            </li>
                        ))}
                        {/* Add Reset Option */}
                        <li
                            data-testid="reset-button"
                            className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                            onClick={() => handleOptionSelect(null)} // Reset selection
                        >
                            Reset
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default FilterButton;
