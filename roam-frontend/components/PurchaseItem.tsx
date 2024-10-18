import React from "react";
import { Ban } from "lucide-react";

interface FlightInfo {
  date: string;
  departure: string;
  airline: string;
  flightNumber: string;
  seat: string;
  duration: string;
  departureTime: string;
  arrivalTime: string;
  layover?: string;
}

interface PurchaseItemProps {
  title: string;
  outboundFlight: FlightInfo;
  returnFlight: FlightInfo;
}

const PurchaseItem: React.FC<PurchaseItemProps> = ({
  title,
  outboundFlight,
  returnFlight,
}) => {
  return (
    <section className="flex flex-col justify-center p-6 mt-4 bg-white rounded-lg border border-gray-200 max-md:mt-2 max-md:max-w-full">
      <div className="flex flex-row justify-between">
        <h2 className="text-xl font-semibold text-gray-700">{title}</h2>
        <Ban className="text-gray-400 hover:text-red-500 cursor-pointer" />
      </div>
      <div className="flex gap-8 mt-4 max-md:flex-col">
        <FlightDetails {...outboundFlight} />
        <FlightDetails {...returnFlight} isReturn />
      </div>
    </section>
  );
};

interface FlightDetailsProps extends FlightInfo {
  isReturn?: boolean;
}

const FlightDetails: React.FC<FlightDetailsProps> = ({
  date,
  departure,
  airline,
  flightNumber,
  seat,
  duration,
  departureTime,
  arrivalTime,
  layover,
  isReturn,
}) => {
  return (
    <div
      className={`flex flex-col ${
        isReturn ? "ml-5 w-[45%]" : "w-[55%]"
      } max-md:ml-0 max-md:w-full`}
    >
      <div className="flex flex-col grow max-md:max-w-full">
        <div className="flex flex-col items-start pr-14 pl-6 mt-4 w-full max-md:px-5 max-md:max-w-full">
          <time className="text-lg font-semibold text-slate-500">{date}</time>
          <p className="text-base text-black">Departing {departure}</p>
          <div className="flex gap-2 items-start self-stretch mt-2 max-md:ml-2">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/47154ef659dd968075223e67363fb44c6d051fe030370f4062cd21cc5bd1ef89?placeholderIfAbsent=true&apiKey=7a7173da98bb425ca4236bb2160d9309"
              className="object-contain shrink-0 w-10 aspect-square"
              alt=""
            />
            <div className="flex flex-col self-stretch text-xs">
              <div className="flex flex-col text-base min-h-[48px]">
                <p className="text-slate-800">{airline}</p>
                <p className="mt-1 text-black">{flightNumber}</p>
              </div>
              <p className="text-black max-md:mr-2.5">{seat}</p>
              <p className="self-start text-black">1 checked bag</p>
            </div>
            <div className="flex flex-col text-base text-right min-h-[74px] text-slate-800">
              <p>{duration}</p>
              <p className="mt-1">
                {departureTime} - {arrivalTime}
              </p>
              {layover && <p className="mt-1 text-black">{layover}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseItem;
