import { headers as getHeaders } from "next/headers.js";
import { getPayload } from "payload";

import config from "@/payload.config";
import Header from "@/components/Header";
import Projects from "@/components/Projects";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import AboutSection from "@/components/About";
import ContactSection from "@/components/Contact";
import Footer from "@/components/Footer";

export default async function HomePage() {
  const headers = await getHeaders();
  const payloadConfig = await config;
  const payload = await getPayload({ config: payloadConfig });
  const { user } = await payload.auth({ headers });

  return (
    <div className="home">
      <Header />
      <Hero />
      <AboutSection />
      <Services />
      <Projects />
      <ContactSection />
      <Footer />
    </div>
  );
}
