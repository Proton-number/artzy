import Hero from "@/components/Hero";
import Nav from "@/components/Nav";

export default function Home() {
  return (
    <div className=" items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <div className="bg-blue-400">
        <Nav />
        <Hero />
      </div>
    </div>
  );
}
