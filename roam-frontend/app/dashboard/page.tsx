"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import ProfilePage from "@/components/ProfilePage";
import { useAuthStore } from "@/context/AuthContext";

export default function DashboardPage() {
  const { authData, setAuthData, setShowPleaseSignInPopup } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (authData.isSignedIn === false) {
      setShowPleaseSignInPopup(true);
      router.replace("/home");
    }
  }, [authData.isSignedIn, router]);

  if (authData.isSignedIn === false) {
    return null;
  }

  return (
    <div>
      {authData.isSignedIn && (
        <ProfilePage />
      )}
    </div>
  );
}
