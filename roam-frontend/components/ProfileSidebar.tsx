import React from "react";

const Sidebar: React.FC = () => {
  return (
    <nav className="flex flex-col h-full z-10 max-w-full text-xs leading-none text-amber-500 w-[218px] max-md:h-auto">
      {/* Top section: Home and Purchases */}
      <div className="flex flex-col gap-6 flex-grow">
        <a
          href="#"
          className="gap-2.5 self-stretch px-2 py-2.5 whitespace-nowrap bg-white rounded-lg min-h-[33px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)]"
        >
          Home
        </a>
        <a
          href="#"
          className="gap-2.5 self-stretch px-2 py-2.5 whitespace-nowrap bg-white rounded-lg min-h-[33px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)]"
        >
          Purchases
        </a>
      </div>

      {/* Log Out button pinned at the bottom */}
      <div className="fixed bottom-5 w-[218px]">
        <button className="gap-2.5 self-stretch px-2 py-2.5 bg-white rounded-lg min-h-[33px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] w-full">
          Log Out
        </button>
      </div>
    </nav>
  );
};

export default Sidebar;
