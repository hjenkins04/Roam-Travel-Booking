

import React, { FC, ReactNode, useState } from "react";

interface FilterButtonProps {
    rightIcon: ReactNode;
    mainTextRight: string;
    className?: string;
    customTextColour?: string;
    options: string[];
    dataTestId: string;
    onOptionSelect: (option: string | null) => void; // Allow null for reset button 
    selectedOption: string | null;
}

const FilterButton: FC<FilterButtonProps> = ({
    rightIcon,
    mainTextRight,
    className = "",
    customTextColour = 'text-gray-600',
    options,
    onOptionSelect,
    selectedOption,
    dataTestId,

}) => {
    const [isDropdownOpen, setDropdownOpen] = useState(false); // State to control dropdown visibility

    const toggleDropdown = () => {
        setDropdownOpen((prev) => !prev);
    };

    const handleOptionSelect = (option: string | null) => {
        onOptionSelect(option); // Call the parent handler
        setDropdownOpen(false);
    };

    return (
        <div className={`relative ${className}`}>
            <div
                className={`flex items-center justify-between bg-white rounded-md shadow-md p-3 border border-gray-300 cursor-pointer`}
                onClick={toggleDropdown}
                data-testid={dataTestId}
                style={{ minHeight: "40px", maxWidth: "fit-content" }}
            >
                {/* Main Text */}
                <div className="flex flex-col text-left">

                    {/* Display Default Button text or on option select Default Text and selected option */}
                    {!selectedOption ? (
                        <span
                            className={`text-sm font-medium text-left ${customTextColour}`}
                        >
                            {mainTextRight}
                        </span>
                    ) : (
                        <>
                            <span className="text-xs font-medium text-left text-gray-600">
                                {mainTextRight}
                            </span>
                            <span
                                className={`text-xs font-medium text-left ${customTextColour} `}
                            >
                                {selectedOption} 
                            </span>
                        </>
                    )}
                </div>
                <div className="ml-2 cursor-pointer">{rightIcon}</div>
            </div>
            
            {/* Button Dropdown that Displays Arguments Passed to it */}
            {isDropdownOpen && (
                <div className="absolute z-10 mt-2 w-40 bg-white border border-gray-300 rounded-md shadow-lg">
                    <ul data-testid="dropdown-list" className="py-2">
                        {options.map((option, index) => (
                            <li
                                key={index}
                                className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                                onClick={() => handleOptionSelect(option)}
                                data-testid={`dropdown-selection-${index}`}
                            >
                                {option}
                            </li>
                        ))}

                        {/* Reset Option In Dropdown Options*/}
                        <li
                            data-testid="reset-button"
                            className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                            onClick={() => handleOptionSelect(null)} // Reset selection
                        >
                            Reset
                        </li>
                    </ul>
                </div>
            )
            }
        </div >
    );
};

export default FilterButton;