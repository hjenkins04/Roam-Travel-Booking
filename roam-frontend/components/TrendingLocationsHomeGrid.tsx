"use client";

import Image from 'next/image'

const TrendingLocationsHomeGrid = () => {
  return (
    <section className="mt-12">
      <h2 className="text-3xl font-bold text-center mb-2">Popular Destinations</h2>
      <p className="text-center text-gray-600 mb-6">Trending destinations today</p>

      <div className="px-4 md:px-8 lg:px-16 max-w-[1440px] mx-auto">
        {/* Grid container with semantic ul */}
        <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 list-none">
          {['Barcelona', 'New York', 'Paris', 'Rio De Janeiro', 'Singapore'].map((city, index) => (
            <li key={city} className={`flex flex-col items-center ${index === 4 ? 'hidden lg:flex' : ''}`}>
              <figure className="relative rounded-lg overflow-hidden group w-full max-w-[300px] aspect-[3/2]">
                <Image
                  src={`/assets/placeholder.svg?height=100&width=150`}
                  alt={city}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300"></div>
              </figure>
              <figcaption className="mt-3 text-lg font-semibold text-gray-800 tracking-wide">
                {city}
              </figcaption>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default TrendingLocationsHomeGrid;
