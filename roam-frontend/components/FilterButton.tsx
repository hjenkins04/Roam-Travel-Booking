import React, { FC } from "react";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

interface FilterButtonProps {
  mainTextRight: string;
  options: string[];
  dataTestId: string;
  onOptionSelect: (option: string | null) => void;
  selectedOption: string | null;
}

const FilterButton: FC<FilterButtonProps> = ({
  mainTextRight,
  options,
  onOptionSelect,
  selectedOption,
  dataTestId,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          className="flex items-center justify-between bg-white rounded-md shadow-md p-3 border border-gray-300 cursor-pointer"
          data-testid={dataTestId}
        >
          <div className="flex flex-col text-left">
            {!selectedOption ? (
              <span className="text-sm font-medium text-gray-600">
                {mainTextRight}
              </span>
            ) : (
              <>
                <span className="text-xs font-medium text-gray-600">
                  {mainTextRight}
                </span>
                <span className="text-xs font-medium text-gray-800">
                  {selectedOption}
                </span>
              </>
            )}
          </div>
          <ChevronDown className="text-gray-500 h-4 w-4 ml-2" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        {options.map((option, index) => (
          <DropdownMenuItem
            key={index}
            onClick={() => onOptionSelect(option)}
            data-testid={`dropdown-selection-${index}`}
          >
            {option}
          </DropdownMenuItem>
        ))}
        {/* Reset Option */}
        <DropdownMenuItem
          onClick={() => onOptionSelect(null)}
          data-testid="reset-button"
        >
          Reset
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FilterButton;
