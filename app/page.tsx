import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { PortfolioTabs } from '@/components/PortfolioTabs';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <main className="bg-white dark:bg-[#0a0e27]">
      <section id="hero">
        <Hero />
      </section>
      <section id="about">
        <About />
      </section>
      <section id="portfolio">
        <PortfolioTabs />
      </section>
      <section id="contact">
        <Contact />
      </section>
      <Footer />
    </main>
  );
}
