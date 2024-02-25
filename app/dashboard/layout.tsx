"use client";
import { FaHome, FaHamburger, FaFileSignature } from "react-icons/fa";
import "../globals.css";
import Link from "next/link";
import { AuthProvider } from "@/context/auth";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <div className="flex w-full">
        <div className="flex px-3 pt-5 h-screen bg-secondary w-fit flex-col gap-4">
          <Link
            href="/dashboard"
            className="text-3xl hover:bg-primary text-primary hover:text-secondary rounded-lg h-10 flex justify-center items-center w-10"
          >
            <FaHome />
          </Link>
          <Link
            href="/dashboard/menu"
            className="text-3xl hover:bg-primary text-primary hover:text-secondary rounded-lg h-10 flex justify-center items-center w-10"
          >
            <FaHamburger />
          </Link>
          <Link
            href="/dashboard"
            className="text-3xl hover:bg-primary text-primary hover:text-secondary rounded-lg h-10 flex justify-center items-center w-10"
          >
            <FaFileSignature />
          </Link>
        </div>
        <div className="w-full">{children}</div>
      </div>
    </AuthProvider>
  );
}
