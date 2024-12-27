"use client";
import Hero from "@/components/Hero";
import Art from "./Art/page";
import FloatingButton from "@/components/FloatingButton";
import Image from "next/image";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <link rel="preload" href="/background.jpg" as="image" />
      </Head>
      <div className="items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
        <div className="relative bg-[#f0f0f0]">
          {/* Background image with Next.js Image component */}
          <div className="absolute inset-0">
            <Image
              src="/background.jpg"
              alt="Background"
              fill
              priority
              quality={75}
              style={{
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
          </div>

          {/* Overlay div to improve text readability */}
          <div className="absolute inset-0 bg-gray-500 bg-opacity-15"></div>

          {/* Content positioned relatively to sit above the overlay */}
          <div className="relative">
            <Hero />
          </div>
        </div>
        <Art />
      </div>
      <FloatingButton />
    </>
  );
}
