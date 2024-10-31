"use client";

import { AuthProvider } from '@/context/AuthContext';
import { TripProvider } from '@/context/TripContext';
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <TripProvider>
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
    </TripProvider>
  );
}
