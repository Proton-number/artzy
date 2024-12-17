import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import Art from "./Art/page";
import FloatingButton from "@/components/FloatingButton";

export default function Home() {
  return (
    <>
      <div className=" items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
        <div className="relative bg-[url('/background.jpg')] bg-cover bg-center">
          {/* Overlay div to improve text readability */}
          <div className="absolute inset-0 bg-gray-500 bg-opacity-15"></div>

          {/* Content positioned relatively to sit above the overlay */}
          <div className="relative z-10">
            <Nav />
            <Hero />
          </div>
        </div>
        <Art />
      </div>
      <FloatingButton />
    </>
  );
}
