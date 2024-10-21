const flightData = [

    {
        departureTime: "8:00 AM",
        arrivalTime: "11:00 AM",
        airline: "Airline A",
        tripLength: "3h 0m",
        numStops: "Non - stop",
        stopInfo: "",
        price: "$299",
        tripType: "Economy Class",
        leftIcon: "/images/DeltaLogo.png",
        outgoingAirport: "AAA",
        incomingAirport: "BBB",
        flightDate: "September 2, 2024",
        outgoingAirportName: "San Francisco International",
        incomingAirportName: "Narita International",
        baggageAllowance: "One Carry On"
    },
    {
        departureTime: "9:30 AM",
        arrivalTime: "1:00 PM",
        airline: "Airline B",
        tripLength: "3h 30m",
        numStops: "1 Stop",
        stopInfo: "1h 15m in LAX",
        price: "$350",
        tripType: "Economy Class",
        leftIcon: "/images/DeltaLogo.png",
        outgoingAirport: "AAA",
        incomingAirport: "CCC",
        flightDate: "September 2, 2024",
        outgoingAirportName: "San Francisco International",
        incomingAirportName: "Los Angeles International",
        baggageAllowance: "One Carry On"
    },
    {
        departureTime: "12:00 PM",
        arrivalTime: "5:00 PM",
        airline: "Airline C",
        tripLength: "5h 0m",
        numStops: "2 Stops",
        stopInfo: "1h 00m in LAS, 45m in HND",
        price: "$400",
        tripType: "Economy Class",
        leftIcon: "/images/DeltaLogo.png",
        outgoingAirport: "AAA",
        incomingAirport: "DDD",
        flightDate: "September 2, 2024",
        outgoingAirportName: "San Francisco International",
        incomingAirportName: "Tokyo Haneda International",
        baggageAllowance: "One Carry On, One Checked Bag"
    },
    {
        departureTime: "4:30 PM",
        arrivalTime: "9:00 PM",
        airline: "Airline D",
        tripLength: "4h 30m",
        numStops: "Non - stop",
        stopInfo: "",
        price: "$250",
        tripType: "Economy Class",
        leftIcon: "/images/DeltaLogo.png",
        outgoingAirport: "AAA",
        incomingAirport: "EEE",
        flightDate: "September 2, 2024",
        outgoingAirportName: "San Francisco International",
        incomingAirportName: "London Heathrow International",
        baggageAllowance: "One Carry On"
    },
    {
        departureTime: "7:00 AM",
        arrivalTime: "3:00 PM",
        airline: "Airline E",
        tripLength: "8h 0m",
        numStops: "1 Stop",
        stopInfo: "2h 00m in ORD",
        price: "$600",
        tripType: "Economy Class",
        leftIcon: "/images/DeltaLogo.png",
        outgoingAirport: "AAA",
        incomingAirport: "FFF",
        flightDate: "September 2, 2024",
        outgoingAirportName: "San Francisco International",
        incomingAirportName: "Toronto Pearson International",
        baggageAllowance: "One Carry On, Two Checked Bags"
    },

    {
        departureTime: "8:00 AM",
        arrivalTime: "11:00 AM",
        airline: "Airline Name",
        tripLength: "3h 0m",
        numStops: "Non-stop",
        stopInfo: "2h 45m in LAX",
        price: "$299",
        tripType: "Economy Class",
        leftIcon: "/images/DeltaLogo.png", // Left icon image source
        outgoingAirport: "AAA",
        incomingAirport: "BBB",
        flightDate: "September 2, 2024",
        outgoingAirportName: "San Francisco International",
        incomingAirportName: "Narita International",
        baggageAllowance: "One Carry On"


    },
    {
        departureTime: "8:00 AM",
        arrivalTime: "11:00 AM",
        airline: "Airline Name",
        tripLength: "3h 0m",
        numStops: "Non-stop",
        stopInfo: "2h 45m in LAX",
        price: "$299",
        tripType: "Economy Class",
        leftIcon: "/images/DeltaLogo.png", // Left icon image source
        outgoingAirport: "CCC",
        incomingAirport: "DDD",
        flightDate: "September 2, 2024",
        outgoingAirportName: "San Francisco International",
        incomingAirportName: "Narita International",
        baggageAllowance: "One Carry On"


    },
    {
        departureTime: "8:00 AM",
        arrivalTime: "11:00 AM",
        airline: "Airline Name",
        tripLength: "3h 0m",
        numStops: "Non-stop",
        stopInfo: "2h 45m in LAX",
        price: "$299",
        tripType: "Economy Class",
        leftIcon: "/images/DeltaLogo.png", // Left icon image source
        outgoingAirport: "EEE",
        incomingAirport: "FFF",
        flightDate: "September 2, 2024",
        outgoingAirportName: "San Francisco International",
        incomingAirportName: "Narita International",
        baggageAllowance: "One Carry On"


    },
    {
        departureTime: "8:00 AM",
        arrivalTime: "11:00 AM",
        airline: "Airline Name",
        tripLength: "3h 0m",
        numStops: "Non-stop",
        stopInfo: "2h 45m in LAX",
        price: "$299",
        tripType: "Economy Class",
        leftIcon: "/images/DeltaLogo.png", // Left icon image source
        outgoingAirport: "SFO",
        incomingAirport: "NAR",
        flightDate: "September 2, 2024",
        outgoingAirportName: "San Francisco International",
        incomingAirportName: "Narita International",
        baggageAllowance: "One Carry On"


    },
    {
        departureTime: "8:00 AM",
        arrivalTime: "11:00 AM",
        airline: "Airline Name",
        tripLength: "3h 0m",
        numStops: "Non-stop",
        stopInfo: "2h 45m in LAX",
        price: "$299",
        tripType: "Economy Class",
        leftIcon: "/images/DeltaLogo.png", // Left icon image source
        outgoingAirport: "SFO",
        incomingAirport: "NAR",
        flightDate: "September 2, 2024",
        outgoingAirportName: "San Francisco International",
        incomingAirportName: "Narita International",
        baggageAllowance: "One Carry On"


    },
    {
        departureTime: "8:00 AM",
        arrivalTime: "11:00 AM",
        airline: "Airline Name",
        tripLength: "3h 0m",
        numStops: "Non-stop",
        stopInfo: "2h 45m in LAX",
        price: "$299",
        tripType: "Economy Class",
        leftIcon: "/images/DeltaLogo.png", // Left icon image source
        outgoingAirport: "SFO",
        incomingAirport: "NAR",
        flightDate: "September 2, 2024",
        outgoingAirportName: "San Francisco International",
        incomingAirportName: "Narita International",
        baggageAllowance: "One Carry On"


    },
];
export default flightData;