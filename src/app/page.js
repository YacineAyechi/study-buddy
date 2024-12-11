import FAQ from "@/components/FAQ";
import Features from "@/components/Features";
import { Footer } from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Pricing from "@/components/Pricing";

export default function Home() {
  return (
    <main>
      <section id="home" className="min-h-screen">
        <Navbar />
        <Hero />
      </section>
      <section id="features" className="min-h-screen">
        <Features />
      </section>
      <section id="pricing" className="min-h-screen">
        <Pricing />
      </section>
      <section id="faq" className="min-h-screen">
        <FAQ />
      </section>
      <section>
        <Footer />
      </section>
    </main>
  );
}
