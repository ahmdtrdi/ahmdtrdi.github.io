import Navigation from "./components/Navigation";
import HeroChart from "./components/HeroChart";
import AboutSection from "./components/AboutSection";
import CategorySections from "./components/CategorySections";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <HeroChart />
        <div className="section-divider" />
        <AboutSection />
        <div className="section-divider" />
        <CategorySections />
      </main>
      <Footer />
    </>
  );
}
