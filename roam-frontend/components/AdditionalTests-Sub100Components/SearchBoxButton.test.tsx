
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SearchBoxButton from "@/components/SearchBoxButton";

describe("SearchBoxButton", () => {
    it("renders with the correct default size class", () => {
        const { container } = render(<SearchBoxButton headerText="Search" />);

        // Check if the rendered component has the default size class "w-[200px]"
        expect(container.firstChild).toHaveClass("w-[200px]");
    });

    it("renders with a custom size class when provided", () => {
        const { container } = render(
            <SearchBoxButton headerText="Search" size="w-[300px]" />
        );

        // Check if the rendered component has the custom size class "w-[300px]"
        expect(container.firstChild).toHaveClass("w-[300px]");
    });
});

//Search Button List Component 
import SearchBoxButtonList from "@/components/SearchBoxButtonList";

describe("SearchBoxButtonList", () => {
    test("renders children correctly", () => {
        // Render SearchBoxButtonList with some children
        render(
            <SearchBoxButtonList>
                <div>Child Element 1</div>
                <div>Child Element 2</div>
            </SearchBoxButtonList>
        );

        // Assert that the children are rendered in the component
        expect(screen.getByText("Child Element 1")).toBeInTheDocument();
        expect(screen.getByText("Child Element 2")).toBeInTheDocument();
    });
});

//SearchBoxButtonOneSide Component 
import SearchBoxButtonOneSide from "@/components/SearchBoxButtonOneSide"; // Adjust path if necessary

describe("SearchBoxButtonOneSide", () => {
    it("renders with the correct default size class", () => {
        const onClickLeftIcon = jest.fn();
        const onClickRightIcon = jest.fn();
        const { container } = render(<SearchBoxButtonOneSide
            headerText="Header"
            mainText="Main Text"
            subText="Sub Text"
        />);

        // Check if the rendered component has the default size class "w-[200px]"
        expect(container.firstChild).toHaveClass("w-[200px]");
    });

    test("calls onClick handlers when icons are clicked", () => {
        const onClickLeftIcon = jest.fn();
        const onClickRightIcon = jest.fn();

        const leftIcon = <span data-testid="left-icon">Left</span>;
        const rightIcon = <span data-testid="right-icon">Right</span>;

        // Render the component with onClick handlers
        render(
            <SearchBoxButtonOneSide
                headerText="Header"
                mainText="Main Text"
                subText="Sub Text"
                leftIcon={leftIcon}
                rightIcon={rightIcon}
                onClickLeftIcon={onClickLeftIcon}
                onClickRightIcon={onClickRightIcon}
            />
        );

        // Simulate clicks on the icons
        fireEvent.click(screen.getByTestId("left-icon"));
        fireEvent.click(screen.getByTestId("right-icon"));

        // Assert that the onClick handlers were called
        expect(onClickLeftIcon).toHaveBeenCalledTimes(1);
        expect(onClickRightIcon).toHaveBeenCalledTimes(1);
    });

});

//Search Button Test 
import SearchButton from "@/components/SearchButton"; // Adjust the path if necessary

describe("SearchButton", () => {
    test("renders mainText correctly", () => {
        const mainText = "Search";

        // Render the SearchButton with mainText prop
        render(<SearchButton mainText={mainText} />);

        // Assert that the main text is rendered
        expect(screen.getByText(mainText)).toBeInTheDocument();
    });

});

