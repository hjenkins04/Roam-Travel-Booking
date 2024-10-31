"use client";

import Image from 'next/image';
import { PopularDestination } from "@/models/popular_destination";
import { useDestinationsContext } from "@/context/DestinationContext"; // Import the context

const TrendingLocationsHomeGrid: React.FC = () => {
  const { popularDestinations } = useDestinationsContext(); // Access destinations from context

  return (
    <section>
      <h2 className="text-5xl font-bold text-center mb-2">Popular Destinations</h2>
      <p className="text-center text-gray-600 mb-6">Trending destinations today</p>

      <div className="px-4 md:px-8 lg:px-16 max-w-[1440px] mx-auto">
        <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 list-none">
          {popularDestinations.map((destination, index) => (
            <li key={destination.guid} className={`flex flex-col items-center ${index === 4 ? 'hidden lg:flex' : ''}`}>
              <figure className="relative rounded-2xl overflow-hidden group w-full sm:max-w-[250px] md:max-w-[300px] lg:max-w-[1200px] lg:min-w-[200px] aspect-[3/2]">
                <Image
                  src={destination.image_path || '/assets/placeholder.svg'}
                  alt={destination.name}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300"></div>
              </figure>
              <figcaption className="mt-3 text-lg font-semibold text-gray-800 tracking-wide">
                {destination.name}
              </figcaption>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default TrendingLocationsHomeGrid;