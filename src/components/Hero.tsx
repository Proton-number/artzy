"use client";

import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { appStore } from "@/Store/appStore";

export default function Hero() {
  const { search, setSearch } = appStore();

  const searchHandler = () => {
    console.log("Searching for:", search);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      searchHandler();
    }
  };

  return (
    <div className="text-center flex flex-col gap-10 lg:gap-16   p-8  sm:p-20 lg:p-32 ">
      <h3 className="text-7xl sm:text-8xl font-semibold">
        Discover Artistic Wonders
      </h3>
      <p className=" sm: w-10/12 text-2xl  lg:w-9/12 m-auto font-light">
        Explore a curated collection of artworks from around the world. Dive
        into centuries of creativity, from classical masterpieces to
        contemporary expressions.
      </p>
      <div className="relative w-full max-w-screen-sm mx-auto">
        <input
          type="search"
          value={search}
          onKeyDown={handleKeyPress}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearch(e.target.value)
          }
          placeholder="Search artists, styles, periods..."
          className="w-full px-5 py-4 pr-16 text-lg rounded-full border-2 border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-md"
        />
        <Button
          onClick={searchHandler}
          className=" absolute right-4 top-1/2 transform -translate-y-1/2 rounded-full bg-blue-400 hover:bg-blue-500"
          size="icon"
        >
          {" "}
          <Search />
        </Button>
      </div>
    </div>
  );
}
