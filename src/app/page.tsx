import { Hero } from "@/components/sections/hero";
import { TrustStrip } from "@/components/sections/trust-strip";
import { Services } from "@/components/sections/services";
import { Showcase } from "@/components/sections/showcase";
import { Process } from "@/components/sections/process";
import { Gallery } from "@/components/sections/gallery";
import { Testimonials } from "@/components/sections/testimonials";
import { About } from "@/components/sections/about";
import { ServiceArea } from "@/components/sections/service-area";
import { Faq } from "@/components/sections/faq";
import { QuoteSection } from "@/components/quote/quote-section";
import { FinalCta } from "@/components/sections/final-cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Services />
      <Showcase />
      <Process />
      <Gallery />
      <Testimonials />
      <About />
      <ServiceArea />
      <Faq />
      <QuoteSection />
      <FinalCta />
    </>
  );
}
