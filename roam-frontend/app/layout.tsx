"use client";

import "./globals.css";
import { useLoaderStore } from "@/context/LoaderContext";
import LoaderPopup from "@/components/LoaderPopup";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isLoading, childrenHidden } = useLoaderStore();

  return (
    <html lang="en">
      <body>
        <LoaderPopup isOpen={isLoading} />
        {!childrenHidden && children}
      </body>
    </html>
  );
}
