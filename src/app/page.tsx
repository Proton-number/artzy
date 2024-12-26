"use client";
import Hero from "@/components/Hero";
import Art from "./Art/page";
import FloatingButton from "@/components/FloatingButton";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const img = new Image(); // Create new Image object to preload image asset
    img.src = "/background.jpg"; // Set the src attribute to the image asset URL
  }, []);

  return (
    <>
      <div className=" items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
        <div
          className="relative bg-[#f0f0f0] transition-[background-image] duration-300 ease-in-out"
          style={{
            backgroundImage: `url('/background.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Overlay div to improve text readability */}
          <div className="absolute inset-0 bg-gray-500 bg-opacity-15"></div>

          {/* Content positioned relatively to sit above the overlay */}
          <div className="relative ">
            {/* <Nav /> */}
            <Hero />
          </div>
        </div>
        <Art />
      </div>
      <FloatingButton />
    </>
  );
}
