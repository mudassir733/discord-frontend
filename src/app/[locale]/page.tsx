// components
import Header from "@/components/header";
import HeroUI from "@/features/home/components/heroUI";
import HomeUI from "@/features/home/components/homeUI"
import Footer from "@/components/footer";


export default async function Home({ params }: { params: { locale: string } }) {
  const safeLocale = params.locale === "en" || params.locale === "fr" ? params.locale : "en";
  return (
    <>
      <div className="w-full h-screen bg-[#5865F2] relative">
        <Header locale={safeLocale} />
        <div className="absolute bottom-0 h-[80vh] w-full z-[0]">
          <HeroUI locale={safeLocale} />
        </div>
      </div>

      <div>
        <HomeUI locale={safeLocale} />
        <Footer locale={safeLocale} />
      </div>
    </>
  );
}