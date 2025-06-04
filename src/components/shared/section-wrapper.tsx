import React from 'react';

interface SectionWrapperProps {
  id: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export default function SectionWrapper({ id, title, children, className }: SectionWrapperProps) {
  return (
    <section id={id} className={`scroll-target py-16 md:py-24 ${className || ''}`}>
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-headline font-bold text-center mb-12 md:mb-16">
          <span className="text-primary neon-glow-primary">{title.split(' ')[0]}</span>
          <span className="text-foreground"> {title.split(' ').slice(1).join(' ')}</span>
        </h2>
        {children}
      </div>
    </section>
  );
}
