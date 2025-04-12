"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      login(username);
      router.push("/");
    }
  };

  return (
    <div className="relative h-screen w-full">
      {/* Base background that fills entire space */}
      <div className="absolute inset-0 w-full h-full bg-custom_green-500" />

      {/* Content container */}
      <div className="relative flex flex-col md:flex-row h-full w-full">
        {/* Logo section - top on mobile, left on desktop */}
        <div className="relative md:absolute md:right-0 w-full md:w-[40%] h-[45%] md:h-full flex flex-col justify-center items-center rounded-b-[48px] md:rounded-b-none md:rounded-l-[48px] bg-custom_green-300">
          <div className="text-center">
            <Image
              src="/images/logo-board.svg"
              alt="Board Logo"
              width={301}
              height={231}
              priority
              className="w-[200px] h-auto md:w-[301px]"
            />
            <h2 className="text-custom_white text-[28px] mt-4 italic font-castoro font-normal">
              a Board
            </h2>
          </div>
        </div>

        {/* Login form section - bottom on mobile, right on desktop */}
        <div className="w-full md:w-[60%] flex flex-col justify-center items-center px-6 md:px-8 flex-1 md:flex-none">
          <div className="w-full max-w-md">
            <h1 className="text-custom_white text-[28px] font-inter font-semibold mb-8">
              Sign in
            </h1>
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full h-[44px] px-4 py-3 rounded-lg bg-white text-custom_text focus:outline-none border border-custom_grey-100"
                required
              />
              <button 
                type="submit"
                className="w-full h-[40px] py-2 bg-custom_success text-white rounded-lg hover:bg-custom_green-300 transition-colors font-inter"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
