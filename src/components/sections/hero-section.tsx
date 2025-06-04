import AnimatedHeroText from '@/components/shared/animated-hero-text';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function HeroSection() {
  const titles = ["Engineer.", "Developer.", "Futurist."];

  return (
    <section id="home" className="scroll-target min-h-screen flex items-center justify-center text-center relative overflow-hidden py-20 pt-32 md:pt-20">
      <div className="absolute inset-0 -z-10">
        {/* Placeholder for more complex background animations if needed */}
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <h1 className="text-5xl md:text-7xl font-headline font-bold mb-6">
          <span className="block text-foreground mb-2">Alex Chen</span>
          <AnimatedHeroText texts={titles} className="text-primary neon-glow-primary" />
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Crafting innovative solutions at the intersection of technology and creativity.
          Passionate about building scalable software and exploring future technologies.
        </p>
        <div className="space-x-4">
          <Button size="lg" asChild className="bg-primary text-primary-foreground hover:bg-primary/80 neon-glow-primary transform transition-transform hover:scale-105">
            <Link href="#projects">View My Work</Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="border-accent text-accent hover:bg-accent/10 hover:text-accent transform transition-transform hover:scale-105">
            <Link href="#contact">Get In Touch</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
