import Underline from '@/components/Effects/TextUnderline';

const LandingPageText = () => (
  <div className="relative text-center mt-12">
    {/* Adventure Line */}
    <div className="relative inline-block font-bold xl:text-8xl lg:text-7xl sm:text-6xl text-6xl">
      <span className="relative z-20">Adventure</span>
      {/* Custom Underline SVG */}
      <div className="absolute bottom-[-20px] left-0 w-full h-auto z-10">
        {/* Dynamically change underline size based on screen size */}
        <Underline width={475} height={70} className="hidden xl:block" />
        <Underline width={350} height={45} className="hidden lg:block xl:hidden" />
        <Underline width={300} height={40} className="block sm:block lg:hidden xl:hidden" />
      </div>
    </div>
    {/* Made Line */}
    <div className="inline-block font-bold ml-2 xl:text-8xl lg:text-7xl sm:text-6xl text-6xl">
      made
    </div>

    {/* easy! Line */}
    <div className="font-bold xl:text-8xl lg:text-7xl sm:text-6xl text-6xl mt-2">
      easy!
    </div>
  </div>
);

export default LandingPageText;
