"use client";

import { useState } from 'react'
import dynamic from 'next/dynamic'
import Header from '@/components/Header'
import SearchBox from '@/components/SearchBox'

// Dynamic imports
const TrendingLocationsHomeGrid = dynamic(() => import('@/components/TrendingLocationsHomeGrid'), { ssr: false });
const LoginSignupPopout = dynamic(() => import('@/components/LoginSignupPopout'), { ssr: false });

export default function Home() {
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isSignupOpen, setIsSignupOpen] = useState(false)

  const openLoginDrawer = () => {
    setIsLoginOpen(true)
    setIsSignupOpen(false)
  }

  const openSignupDrawer = () => {
    setIsSignupOpen(true)
    setIsLoginOpen(false)
  }

  const closeDrawer = () => {
    setIsLoginOpen(false)
    setIsSignupOpen(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-300 to-sky-100">
      <Header openLoginDrawer={openLoginDrawer} openSignupDrawer={openSignupDrawer} />

      <main className="px-4 py-8">
        <div className="container mx-auto">
          <h1 className="text-5xl font-bold text-center mb-4">
            Adventure made <span className="underline decoration-orange-500">easy!</span>
          </h1>

          {/* Render the search box */}
          <SearchBox />

          {/* Render the trending locations grid */}
          <TrendingLocationsHomeGrid />
        </div>
      </main>

      <LoginSignupPopout
        isLoginOpen={isLoginOpen}
        isSignupOpen={isSignupOpen}
        closeDrawer={closeDrawer}
      />
    </div>
  )
}
