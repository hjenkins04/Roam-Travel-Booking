"use client";

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { X } from 'lucide-react'
import Image from 'next/image'

// Define prop types for the LoginSignupPopout component
interface LoginSignupPopoutProps {
  isLoginOpen: boolean;
  isSignupOpen: boolean;
  closeDrawer: () => void;
}

const LoginSignupPopout: React.FC<LoginSignupPopoutProps> = ({ isLoginOpen, isSignupOpen, closeDrawer }) => {
  const [isLogin, setIsLogin] = useState(true)

  const toggleLoginSignup = () => {
    setIsLogin(!isLogin)
  }

  return (
    <div className={`fixed inset-y-0 right-0 w-full sm:w-96 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${(isLoginOpen || isSignupOpen) ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="p-6">
        <Button variant="ghost" className="absolute top-2 right-2" onClick={closeDrawer}>
          <X className="h-6 w-6" />
        </Button>
        <h2 className="text-2xl font-bold mb-1">
          {isLogin ? 'Welcome back' : 'Create an account'}
        </h2>
        <div className="w-12 h-1 bg-orange-500 mb-6"></div>
        <p className="text-gray-600 mb-6">
          {isLogin ? 'Welcome back! Please enter your details.' : 'Sign up to start your adventure!'}
        </p>
        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <Input type="email" id="email" placeholder="Enter your email" className="mt-1" />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <Input type="password" id="password" placeholder="Enter your password" className="mt-1" />
          </div>
          {isLogin && (
            <div className="flex justify-between items-center">
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-orange-500 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50" />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-sm text-orange-500 hover:underline">Forgot password?</a>
            </div>
          )}
          <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
            {isLogin ? 'Sign In' : 'Sign Up'}
          </Button>
        </form>
        <div className="mt-6">
          <Button variant="outline" className="w-full">
            <Image src="/assets/google-icon.svg" alt="Google" width={20} height={20} className="mr-2" />
            Sign {isLogin ? 'in' : 'up'} with Google
          </Button>
        </div>
        <p className="mt-6 text-center text-sm text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button onClick={toggleLoginSignup} className="ml-1 text-orange-500 hover:underline">
            {isLogin ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </div>
    </div>
  );
}

export default LoginSignupPopout;
