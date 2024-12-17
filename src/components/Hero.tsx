"use client";

import { Button } from "./ui/button";

export default function Hero() {
  return (
    <div className="text-center flex flex-col justify-center items-center   p-8  sm:p-16 lg:p-40 min-h-screen">
      <h3 className="text-7xl sm:text-8xl font-semibold">
        Discover Artistic Wonders
      </h3>
      <p className=" sm: w-10/12 text-2xl  lg:w-9/12 m-auto font-normal">
        Explore a curated collection of artworks from around the world. Dive
        into centuries of creativity, from classical masterpieces to
        contemporary expressions.
      </p>
    </div>
  );
}
