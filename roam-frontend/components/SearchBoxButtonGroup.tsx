import { ReactNode, ComponentPropsWithoutRef } from "react";

interface SearchBoxButtonListProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
}

const SearchBoxButtonList = ({ children, className = "", ...props }: SearchBoxButtonListProps) => {
  return (
    <div
      className={`flex flex-wrap justify-center items-center space-x-4 space-y-2 w-full ${className}`} // Flexbox setup for inline buttons with spacing
      {...props}
    >
      {children}
    </div>
  );
};

export default SearchBoxButtonList;
