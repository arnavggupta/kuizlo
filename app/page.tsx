"use client";

import TypewriterComponent from "@/components/Typewriter";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/dashboard");
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-r from-green-300 via-blue-100 to-purple-400"
    >
  

      <div className="text-center p-8">
        <h1 className="text-5xl font-extrabold text-red-700 mb-2">
          Text-Editor
        </h1>

        <div className="text-black font font-extrabold text-3xl">
          <TypewriterComponent />
        </div>

        <Button
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4  mt-2 rounded-lg"
          onClick={handleClick}
        >
          Get Started
        </Button>
      </div>
    </div>
  );
}
