import FAQ from "@/components/FAQ";
import Features from "@/components/Features";
import { Footer } from "@/components/Footer";
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
      <section id="faq">
        <FAQ />
      </section>
      <section>
        <Footer />
      </section>
    </main>
  );
}
