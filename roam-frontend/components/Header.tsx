import Image from 'next/image'
import { Button } from '@/components/ui/button'
import HeaderBackground from './Backgrounds/HeaderBackground';
import TallHeaderBackground from './Backgrounds/TallHeaderBackground';

interface HeaderProps {
  openLoginDrawer: () => void;
  openSignupDrawer: () => void;
  headerSize: string;
  logoColour: string;
}

const Header: React.FC<HeaderProps> = ({ openLoginDrawer, openSignupDrawer, headerSize, logoColour }) => {
  return (
    <>
    <div className="absolute inset-0">
      {headerSize === "tall" ? <TallHeaderBackground /> : <HeaderBackground />}
    </div>
    <header className="flex justify-between items-center px-16 py-6 shadow-sm">
      <div className="relative w-32 h-[76px] z-10">
        <Image
           src={logoColour === "black" 
            ? "/images/logos/roam-high-resolution-logo-transparent-dark-letters.png" 
            : "/images/logos/roam-high-resolution-logo-transparent.png"}
          alt="ROAM Logo"
          fill
          style={{ objectFit: 'contain' }}
          className="w-auto h-auto"
        />
      </div>
      <div className="space-x-2 z-10">
        {openLoginDrawer === undefined ? null : <Button variant="outline" onClick={openLoginDrawer}>Login</Button>}
        {openSignupDrawer === undefined ? null: <Button className="bg-[#ff6b35] hover:bg-[#ff8c5a]" onClick={openSignupDrawer}>Sign Up</Button>}
      </div>
    </header>
    </>
  )
}

export default Header;
