import HeroSection from '@/components/sections/hero-section';
import ProjectsSection from '@/components/sections/projects-section';
import ResumeSection from '@/components/sections/resume-section';
import BlogSection from '@/components/sections/blog-section';
import ContactSection from '@/components/sections/contact-section';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProjectsSection />
      <ResumeSection />
      <BlogSection />
      <ContactSection />
    </>
  );
}
