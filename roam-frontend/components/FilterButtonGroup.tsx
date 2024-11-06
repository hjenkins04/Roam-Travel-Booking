import { ReactNode, ComponentPropsWithoutRef } from "react";
import React from "react";

interface FilterButtonListProps extends ComponentPropsWithoutRef<"div"> {
    children: ReactNode;
}

const FilterButtonGroup = ({ children, className = "", ...props }: FilterButtonListProps) => {
    return (
        <div
            className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-4 ${className}`}
            {...props}
        >
            {children}
        </div>
    );
};

export default FilterButtonGroup;