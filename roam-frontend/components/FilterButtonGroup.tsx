import { ReactNode, ComponentPropsWithoutRef } from "react";
import React from "react";

interface FilterButtonListProps extends ComponentPropsWithoutRef<"div"> {
    children: ReactNode;
}

const FilterButtonGroup = ({ children, className = "", ...props }: FilterButtonListProps) => {
    return (
        <div
            data-testid="filter-button-group"
            className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-4 w-full justify-between ${className}`}
            {...props}
        >
            {children}
        </div>
    );
};

export default FilterButtonGroup;