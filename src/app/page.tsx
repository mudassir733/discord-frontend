import Header from "@/components/header";

// components
import HeroUI from "@/features/home/components/heroUI";
import HomeUI from "@/features/home/components/homeUI"


export default function Home() {
  return (
    <>
      <div className="w-full h-screen bg-[#5865F2] relative">
        <Header />
        <div className="absolute bottom-0 h-[80vh] w-full z-[0]">
          <HeroUI />
        </div>
      </div>

      <div>
        <HomeUI />
      </div>
    </>
  );
}