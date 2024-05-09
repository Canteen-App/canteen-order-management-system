"use client";
import {
  FaHome,
  FaHamburger,
  FaFileSignature,
  FaSignOutAlt,
} from "react-icons/fa";
import "../globals.css";
import Link from "next/link";
import { Toaster } from "react-hot-toast";
import { signOut } from "firebase/auth";
import React from "react";
import { auth } from "../../../config/firebase";
import { AuthProvider } from "../../../context/auth";
import { NewOrderNotificationProvider } from "../../../context/newOrderEvent";
import { ItemsCollectedNotificationProvider } from "../../../context/itemsCollectedEvent";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const logout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <AuthProvider>
      <NewOrderNotificationProvider>
        <ItemsCollectedNotificationProvider>
          <div className="flex w-full ">
            <div className="flex h-screen sticky top-0 left-0 px-3 pt-5 bg-secondary w-fit flex-col gap-4">
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
                href="/dashboard/order"
                className="text-3xl hover:bg-primary text-primary hover:text-secondary rounded-lg h-10 flex justify-center items-center w-10"
              >
                <FaFileSignature />
              </Link>
              <div className="flex-grow" />
              <div
                onClick={logout}
                className="text-red-800 mb-2 cursor-pointer hover:bg-red-800 hover:text-white rounded-lg p-2 text-xl"
              >
                <FaSignOutAlt />
              </div>
            </div>
            <div className="w-full">{children}</div>
          </div>
        </ItemsCollectedNotificationProvider>
        <Toaster position="top-right" />
      </NewOrderNotificationProvider>
    </AuthProvider>
  );
}
