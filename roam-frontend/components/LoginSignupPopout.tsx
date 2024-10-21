"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Sheet, SheetContent, SheetHeader, SheetClose, } from "@/components/ui/sheet";
import Underline from "@/components/Effects/TextUnderline";
import { useAuth } from "@/context/AuthContext";
import { DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface LoginSignupPopoutProps {
  isOpen: boolean;
  mode: "login" | "signup";
  closeDrawer: () => void;
  setPopoutMode: (mode: "login" | "signup") => void;
}

const LoginSignupPopout: React.FC<LoginSignupPopoutProps> = ({
  isOpen,
  mode,
  closeDrawer,
  setPopoutMode,
}) => {
  const isLogin = mode === "login";
  const { signIn } = useAuth();
  const router = useRouter();

  // Toggle between login and signup modes
  const toggleLoginSignup = () => {
    if (isLogin) {
      setPopoutMode("signup");
    } else {
      setPopoutMode("login");
    }
  };

  // Handle form submission for standard login/signup
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate successful login/signup
    signIn();
    closeDrawer();
  };

  // Handle Google sign-in or sign-up
  const handleGoogleSignIn = () => {
    // Simulate successful login/signup
    signIn();
    closeDrawer();
  };

  const handleForgotPassword = () => {
    router.push('/reset-password');
  };

  return (
    <Sheet open={isOpen} onOpenChange={closeDrawer}>
      <DialogTitle>{`${mode}`} page</DialogTitle>
      <DialogDescription>Fill in the required details below.</DialogDescription>
      <SheetContent
        side="right"
        className="bg-white p-8 rounded-l-lg shadow-xl flex flex-col justify-center items-center h-screen"
        style={{ maxWidth: "35vw", minWidth: "400px" }}
        data-testid={`${mode}-popout`}
      >
        {/* Close Button */}
        <SheetClose asChild className="h-6 w-6 cursor-pointer"></SheetClose>

        {/* Header Section with Underline */}
        <SheetHeader className="text-center mb-10">
          <div className="relative inline-block font-bold text-4xl sm:text-5xl md:text-6xl text-gray-800 mb-4">
            <span className="relative z-20">
              {isLogin ? "Welcome Back" : "Create an Account"}
            </span>
            <div className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-full h-auto z-10">
              <Underline width={isLogin ? 300 : 350} height={40} />
            </div>
          </div>
          <p className="text-gray-600 mb-4 text-center">
            {isLogin
              ? "Welcome back! Please enter your details below."
              : "Join us and start your adventure!"}
          </p>
        </SheetHeader>

        {/* Form Section */}
        <form className="space-y-5 w-full" onSubmit={handleFormSubmit}>
          {/* Full Name & Phone Number (for signup) */}
          {!isLogin && (
            <>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <Input
                  type="text"
                  id="name"
                  placeholder="Enter your full name"
                  className="mt-2"
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone
                </label>
                <Input
                  type="text"
                  id="phone"
                  placeholder="Enter your phone number"
                  className="mt-2"
                />
              </div>
            </>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <Input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="mt-2"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <Input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="mt-2"
            />
          </div>

          {/* Confirm Password (for signup) */}
          {!isLogin && (
            <div>
              <label
                htmlFor="confirmpassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <Input
                type="password"
                id="confirmpassword"
                placeholder="Enter your password"
                className="mt-2"
              />
            </div>
          )}

          {/* Remember Me & Forgot Password (for login) */}
          {isLogin && (
            <div className="flex justify-between items-center">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-orange-500 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
                />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <span
                onClick={handleForgotPassword}
                className="text-sm text-orange-500 hover:underline">
                Forgot Password?
              </span>
            </div>
          )}

          {/* Submit Button */}
          <Button
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg"
            type="submit"
          >
            {isLogin ? "Sign In" : "Sign Up"}
          </Button>
        </form>

        {/* Google Login Button */}
        <div className="mt-3 w-full">
          <Button
            variant="outline"
            className="w-full flex items-center justify-center py-3 rounded-lg"
            onClick={handleGoogleSignIn}
          >
            <Image
              src="/assets/google-icon.svg"
              alt="Google"
              width={20}
              height={20}
              className="mr-2"
            />
            Sign {isLogin ? "in" : "up"} with Google
          </Button>
        </div>

        {/* Toggle Between Login and Signup */}
        <p className="mt-8 text-center text-sm text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={toggleLoginSignup}
            className="ml-1 text-orange-500 hover:underline"
          >
            {isLogin ? "Sign up" : "Sign in"}
          </button>
        </p>
      </SheetContent>
    </Sheet>
  );
};

export default LoginSignupPopout;
