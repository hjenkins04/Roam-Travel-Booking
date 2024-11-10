
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SearchBoxButton from "@/components/SearchBoxButton";

describe("SearchBoxButton", () => {
    test("renders correctly with all props", () => {
        render(
            <SearchBoxButton
                headerText="Header"
                mainTextLeft="Left Main Text"
                subTextLeft="Left Sub Text"
                mainTextRight="Right Main Text"
                subTextRight="Right Sub Text"
                size="w-[250px]"
                className="custom-class"
                leftIcon={<div>Left Icon</div>}
                rightIcon={<div>Right Icon</div>}
                onClickLeftIcon={() => { }}
                onClickRightIcon={() => { }}
                onClickMainButton={() => { }}
            />
        );

        // Check if text and icons render correctly
        expect(screen.getByText("Header")).toBeInTheDocument();
        expect(screen.getByText("Left Main Text")).toBeInTheDocument();
        expect(screen.getByText("Left Sub Text")).toBeInTheDocument();
        expect(screen.getByText("Right Main Text")).toBeInTheDocument();
        expect(screen.getByText("Right Sub Text")).toBeInTheDocument();
        expect(screen.getByText("Left Icon")).toBeInTheDocument();
        expect(screen.getByText("Right Icon")).toBeInTheDocument();
    });

    test("executes onClick handlers", () => {
        const onClickLeftIcon = jest.fn();
        const onClickRightIcon = jest.fn();
        const onClickMainButton = jest.fn();

        render(
            <SearchBoxButton
                headerText="Header"
                mainTextLeft="Left Main Text"
                subTextLeft="Left Sub Text"
                mainTextRight="Right Main Text"
                subTextRight="Right Sub Text"
                size="w-[250px]"
                className="custom-class"
                leftIcon={<div>Left Icon</div>}
                rightIcon={<div>Right Icon</div>}
                onClickLeftIcon={onClickLeftIcon}
                onClickRightIcon={onClickRightIcon}
            />
        );

        // Simulate clicks
        fireEvent.click(screen.getByText("Left Icon"));
        fireEvent.click(screen.getByText("Right Icon"));

        // Check if the handlers were called
        expect(onClickLeftIcon).toHaveBeenCalledTimes(1);
        expect(onClickRightIcon).toHaveBeenCalledTimes(1);

    });

    test("falls back to default values for size and className", () => {
        render(
            <SearchBoxButton
                headerText="Header"
                mainTextLeft="Left Main Text"
                subTextLeft="Left Sub Text"
                mainTextRight="Right Main Text"
                subTextRight="Right Sub Text"
            />
        );

        // Check default size and className
        const button = screen.getByText("Left Main Text").closest("div");
        expect(button).toHaveClass("flex flex-col text-left");
    });

    test("ref is forwarded correctly", () => {
        const ref = React.createRef<HTMLDivElement>();

        render(
            <SearchBoxButton
                headerText="Header"
                mainTextLeft="Left Main Text"
                subTextLeft="Left Sub Text"
                mainTextRight="Right Main Text"
                subTextRight="Right Sub Text"
                ref={ref}
            />
        );

        // Assert that the ref is correctly attached to the div element
        expect(ref.current).not.toBeNull();
        expect(ref.current).toBeInstanceOf(HTMLDivElement);
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
    test("renders headerText, mainText, and subText", () => {
        // Render the component with the required props
        render(
            <SearchBoxButtonOneSide
                headerText="Header"
                mainText="Main Text"
                subText="Sub Text"
            />
        );

        // Assert that the text is rendered
        expect(screen.getByText("Header")).toBeInTheDocument();
        expect(screen.getByText("Main Text")).toBeInTheDocument();
        expect(screen.getByText("Sub Text")).toBeInTheDocument();
    });

    test("renders left and right icons when provided", () => {
        const leftIcon = <span data-testid="left-icon">Left</span>;
        const rightIcon = <span data-testid="right-icon">Right</span>;

        // Render the component with icons
        render(
            <SearchBoxButtonOneSide
                headerText="Header"
                mainText="Main Text"
                subText="Sub Text"
                leftIcon={leftIcon}
                rightIcon={rightIcon}
            />
        );

        // Assert that the icons are rendered
        expect(screen.getByTestId("left-icon")).toBeInTheDocument();
        expect(screen.getByTestId("right-icon")).toBeInTheDocument();
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

    test("does not render left or right icon if not provided", () => {
        // Render the component without any icons
        render(
            <SearchBoxButtonOneSide
                headerText="Header"
                mainText="Main Text"
                subText="Sub Text"
            />
        );

        // Assert that the left and right icons are not in the document
        expect(screen.queryByTestId("left-icon")).not.toBeInTheDocument();
        expect(screen.queryByTestId("right-icon")).not.toBeInTheDocument();
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

    test("calls onClick handler when clicked", () => {
        const onClick = jest.fn(); // Mock the onClick function

        // Render the SearchButton with the onClick handler
        render(<SearchButton mainText="Search" onClick={onClick} />);

        // Simulate a click event
        fireEvent.click(screen.getByTestId("search-button"));

        // Assert that the onClick function is called
        expect(onClick).toHaveBeenCalledTimes(1);
    });

});

