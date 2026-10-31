import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AboutSection from "@/components/About";
import Skills from "@/components/Skills";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import ExperienceTimeline from "@/components/Experience";
import Testimonials from "@/components/Testimonials";
import Blog from "@/components/Blog";
import ContactSection from "@/components/Contact";
import Footer from "@/components/Footer";

import {
  getSiteSettings,
  getProjects,
  getTechnologies,
  getServices,
  getExperience,
  getTestimonials,
  getPosts,
} from "@/lib/data";

export default async function HomePage() {
  const [
    site,
    projects,
    technologies,
    services,
    experience,
    testimonials,
    posts,
  ] = await Promise.all([
    getSiteSettings(),
    getProjects(),
    getTechnologies(),
    getServices(),
    getExperience(),
    getTestimonials(),
    getPosts(),
  ]);

  return (
    <>
      <Header site={site} />
      <Hero site={site} />
      <AboutSection site={site} />
      <Skills technologies={technologies} />
      <Services services={services} />
      <Projects projects={projects} />
      <ExperienceTimeline items={experience} />
      <Testimonials items={testimonials} />
      <Blog posts={posts} />
      <ContactSection site={site} />
      <Footer site={site} />
    </>
  );
}
