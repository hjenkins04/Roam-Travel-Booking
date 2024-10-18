import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon, UserIcon, Users, PlusIcon, MinusIcon, ChevronDown, Search, ArrowLeftRight } from "lucide-react";
import SearchBoxButtonList from "@/components/SearchBoxButtonGroup";
import SearchBoxButton from "@/components/SearchBoxButton";
import HumpButton from "@/components/Buttons/HumpButton";

const SearchResultBox = () => {
    const [departureDate, setDepartureDate] = useState<Date>();
    const [returnDate, setReturnDate] = useState<Date>();
    const [passengers, setPassengers] = useState([{ class: "Economy" }]);
    const [isRoundTrip, setIsRoundTrip] = useState(true);

    const addPassenger = () => {
        setPassengers([...passengers, { class: "Economy" }]);
    };

    const removePassenger = () => {
        if (passengers.length > 1) {
            setPassengers(passengers.slice(0, -1));
        }
    };

    const updatePassengerClass = (index: number, newClass: "Business" | "Economy") => {
        const updatedPassengers = [...passengers];
        updatedPassengers[index].class = newClass;
        setPassengers(updatedPassengers);
    };

    const getPassengerTypesButton = () => {
        const allBusiness = passengers.every((p) => p.class === "Business");
        const allEconomy = passengers.every((p) => p.class === "Economy");

        if (allBusiness) return `Business`;
        if (allEconomy) return `Economy`;
        return `Varying`;
    };

    const getNumberOfPassengersButton = () => {
        const count = passengers.length;
        return `${count}`;
    };

    return (
        <>
            <div className=" flex flex-col items-start  relative" >
                {/* Toggle Button Container */}
                <div className="relative flex -mb-0.5 justify-center items-center">
                    <HumpButton
                        primaryColor="#FF9A2A"
                        secondaryColor="#FFFFFF"
                        primaryText="Round Trip"
                        secondaryText="One Way"
                        onPrimaryClick={() => setIsRoundTrip(true)}
                        onSecondaryClick={() => setIsRoundTrip(false)}
                    />
                </div >

                {/* Main search container */}
                < div className="relative bg-white rounded-2xl shadow-lg p-4 max-w-[97%] w-full z-2" >
                    {/* Search Form (Button List) */}
                    < SearchBoxButtonList className="w-full justify-center space-y-4 sm:space-y-6" >
                        {/* Departure City Button */}
                        < SearchBoxButton
                            leftIcon={< ChevronDown className="text-gray-500 h-4 w-4" />}
                            rightIcon={< ChevronDown className="text-gray-500 h-4 w-4" />}
                            headerText="DEPARTURE CITY"
                            mainTextLeft="YYZ"
                            subTextLeft=""
                            mainTextRight="Toronto"
                            subTextRight="Pearson International"
                            size="w-[230px]"
                            className="-bottom-2.5"
                            onClickMainButton={() => console.log("Departure City Clicked")}
                        />

                        {/* Swap Icon between Departure and Arrival */}
                        <div className="bg-orange-500 rounded-full p-2 z-10"
                            style={{
                                position: 'relative',
                                transform: 'translateX(25%)',
                                margin: '-18px'
                            }}>
                            <ArrowLeftRight className="w-5 h-5 text-white" />
                        </div>

                        {/* Arrival City Button */}
                        <SearchBoxButton
                            leftIcon={<ChevronDown className="text-gray-500 h-4 w-4" />}
                            rightIcon={<ChevronDown className="text-gray-500 h-4 w-4" />}
                            headerText="ARRIVAL CITY"
                            mainTextLeft="HNL"
                            subTextLeft=""
                            mainTextRight="Honolulu"
                            subTextRight="Daniel K. Inouye International"
                            size="w-[230px]"
                            onClickMainButton={() => console.log("Arrival City Clicked")}
                        />

                        {
                            isRoundTrip && (
                                <>
                                    <Popover>
                                        {/* Departure Date Button */}
                                        <PopoverTrigger asChild>
                                            <div>
                                                <SearchBoxButton
                                                    leftIcon={<CalendarIcon className="text-gray-500 h-4 w-4" />}
                                                    rightIcon={<ChevronDown className="text-gray-500 h-4 w-4" />}
                                                    headerText="DEPARTURE DATE"
                                                    mainTextLeft={departureDate ? format(departureDate, "dd") : "DD"}
                                                    subTextLeft=""
                                                    mainTextRight={departureDate ? format(departureDate, "EEE") : "Day"}
                                                    subTextRight={departureDate ? format(departureDate, "MMMM") : "Month"}
                                                    size="w-[175px]"
                                                    onClickMainButton={() => { }}
                                                />
                                            </div>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar mode="single" selected={departureDate} onSelect={setDepartureDate} />
                                        </PopoverContent>
                                    </Popover>

                                    <Popover>
                                        {/* Return Date Button */}
                                        <PopoverTrigger asChild>
                                            <div>
                                                <SearchBoxButton
                                                    leftIcon={<CalendarIcon className="text-gray-500 h-4 w-4" />}
                                                    rightIcon={<ChevronDown className="text-gray-500 h-4 w-4" />}
                                                    headerText="RETURN DATE"
                                                    mainTextLeft={returnDate ? format(returnDate, "dd") : "DD"}
                                                    subTextLeft=""
                                                    mainTextRight={returnDate ? format(returnDate, "EEE") : "Day"}
                                                    subTextRight={returnDate ? format(returnDate, "MMMM") : "Month"}
                                                    size="w-[175px]"
                                                    onClickMainButton={() => { }}
                                                />
                                            </div>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar mode="single" selected={returnDate} onSelect={setReturnDate} />
                                        </PopoverContent>
                                    </Popover>
                                </>
                            )
                        }

                        {
                            !isRoundTrip && (
                                <Popover>
                                    {/* Departure Date Button */}
                                    <PopoverTrigger asChild>
                                        <div>
                                            <SearchBoxButton
                                                leftIcon={<CalendarIcon className="text-gray-500 h-4 w-4" />}
                                                rightIcon={<ChevronDown className="text-gray-500 h-4 w-4" />}
                                                headerText="DEPARTURE DATE"
                                                mainTextLeft={departureDate ? format(departureDate, "dd") : "DD"}
                                                subTextLeft=""
                                                mainTextRight={departureDate ? format(departureDate, "EEEE") : "Day"}
                                                subTextRight={departureDate ? format(departureDate, "MMMM") : "Month"}
                                                size="w-[230px]"
                                                onClickMainButton={() => { }}
                                            />
                                        </div>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar mode="single" selected={departureDate} onSelect={setDepartureDate} />
                                    </PopoverContent>
                                </Popover>
                            )
                        }

                        {/* Traveler & Class Button */}
                        <Popover>
                            <PopoverTrigger asChild>
                                <div>
                                    <SearchBoxButton
                                        leftIcon={
                                            getNumberOfPassengersButton() != "1" ?
                                                (<Users className="text-gray-500 h-4 w-4" />)
                                                :
                                                (<UserIcon className="text-gray-500 h-4 w-4" />)
                                        }
                                        rightIcon={<ChevronDown className="text-gray-500 h-4 w-4" />}
                                        headerText="TRAVELER & CLASS"
                                        mainTextLeft={getNumberOfPassengersButton()}
                                        subTextLeft=""
                                        mainTextRight={getPassengerTypesButton()}
                                        subTextRight=""
                                        size="w-[195px]"
                                        onClickMainButton={() => { }}
                                    />
                                </div>
                            </PopoverTrigger>
                            <PopoverContent className="w-64 p-4">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="font-medium">Passengers</span>
                                        <div className="flex items-center space-x-2">
                                            <Button size="sm" variant="outline" onClick={removePassenger} disabled={passengers.length === 1}>
                                                <MinusIcon className="h-4 w-4" />
                                            </Button>
                                            <span>{passengers.length}</span>
                                            <Button size="sm" variant="outline" onClick={addPassenger}>
                                                <PlusIcon className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                    {passengers.map((passenger, index) => (
                                        <div key={index} className="flex items-center justify-between">
                                            <span>Passenger {index + 1}</span>
                                            <Select
                                                value={passenger.class}
                                                onValueChange={(value: "Business" | "Economy") => updatePassengerClass(index, value)}
                                            >
                                                <SelectTrigger className="w-[120px]">
                                                    <SelectValue placeholder="Select class" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Economy">Economy</SelectItem>
                                                    <SelectItem value="Business">Business</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    ))}
                                </div>
                            </PopoverContent>
                        </Popover>
                    </SearchBoxButtonList >

                </div >
            </div >
        </>
    );
};

export default SearchResultBox;
