import Features from "@/components/Features";
import Hero from "@/components/Hero";
import HowToUse from "@/components/HowToUse";
import Navbar from "@/components/Navbar";
import Pricing from "@/components/Pricing";

export default function Home() {
  return (
    <main>
      <section id="home">
        <Navbar />
        <Hero />
      </section>
      <section id="features">
        <Features />
      </section>
      {/* <section id="how-to-use">
        <HowToUse />
      </section> */}
      <section id="pricing">
        <Pricing />
      </section>
    </main>
  );
}
