import { ReactNode, ComponentPropsWithoutRef } from "react";

interface FilterButtonListProps extends ComponentPropsWithoutRef<"div"> {
    children: ReactNode;
}

const FilterButtonGroup = ({ children, className = "", ...props }: FilterButtonListProps) => {
    return (
        <div
            className={`flex flex-wrap justify-start items-center space-x-4 space-y-2 w-full ${className}`} // Flexbox setup for inline buttons with spacing
            {...props}
        >
            {children}
        </div>
    );
};

export default FilterButtonGroup;