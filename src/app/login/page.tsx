"use client";
import { auth } from "@/config/firebase";
import { AuthProvider } from "@/context/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import React from "react";

const LoginPage = () => {
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    var data = new FormData(event.target);
    const formData = Object.fromEntries(data.entries());
    const email = formData.email as string;
    const password = formData.password as string;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };
  return (
    <AuthProvider>
      <div className="w-screen h-screen">
        <h1 className="w-full pb-[100px] text-primary text-center pt-[50px] text-5xl font-black">
          Canteen Order Management System
        </h1>
        <div className="bg-secondary w-1/2 m-auto rounded-xl py-10 px-10">
          <h2 className="text-3xl font-black text-primary text-center">
            Login
          </h2>
          <form className="px-2" onSubmit={(event) => handleSubmit(event)}>
            <label className="text-lg font-black text-primary">Email</label>
            <input
              id="email"
              name="email"
              className="outline-none mb-5 border-2 w-full border-primary rounded px-2 py-1"
              type="email"
            />
            <label className="text-lg font-black text-primary">Password</label>
            <input
              id="password"
              name="password"
              className="outline-none border-2 w-full border-primary rounded px-2 py-1"
              type="password"
            />
            <button className="px-2 mt-5 py-1 text-xl m-auto font-black rounded bg-primary text-secondary">
              Login
            </button>
          </form>
        </div>
      </div>
    </AuthProvider>
  );
};

export default LoginPage;
