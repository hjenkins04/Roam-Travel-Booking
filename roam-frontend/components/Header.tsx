import Image from 'next/image'
import { Button } from '@/components/ui/button'

interface HeaderProps {
  openLoginDrawer: () => void;
  openSignupDrawer: () => void;
}

const Header: React.FC<HeaderProps> = ({ openLoginDrawer, openSignupDrawer }) => {
  return (
    <header className="flex justify-between items-center px-6 shadow-sm">
      <div className="relative w-32 h-[76px] z-10">
        <Image
          src="/images/logos/roam-high-resolution-logo-transparent-dark-letters.png"
          alt="ROAM Logo"
          fill
          style={{ objectFit: 'contain' }}
          className="w-auto h-auto"
        />
      </div>
      <div className="space-x-2 z-10">
        <Button variant="outline" onClick={openLoginDrawer}>Login</Button>
        <Button className="bg-[#ff6b35] hover:bg-[#ff8c5a]" onClick={openSignupDrawer}>Sign Up</Button>
      </div>
    </header>
  )
}

export default Header;
