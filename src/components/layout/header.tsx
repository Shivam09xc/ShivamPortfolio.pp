"use client";

import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled || isOpen ? "py-3 bg-background/80 backdrop-blur-lg shadow-lg border-b border-primary/20" : "py-5 bg-transparent"
    )}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="#home" className="text-2xl font-headline font-bold hover:text-primary transition-colors neon-glow-primary">
          {siteConfig.name}
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-2">
          {siteConfig.navItems.map((item) => (
            <Button key={item.title} variant="ghost" asChild className="text-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200 transform hover:scale-105">
              <Link href={item.href}>{item.title}</Link>
            </Button>
          ))}
          <div className="flex space-x-2 ml-4">
            {siteConfig.socialLinks.map((social) => (
              <Button key={social.name} variant="ghost" size="icon" asChild className="text-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200 transform hover:scale-110 neon-glow-accent">
                <Link href={social.href} target="_blank" rel="noreferrer">
                  <social.icon className="h-5 w-5" />
                  <span className="sr-only">{social.name}</span>
                </Link>
              </Button>
            ))}
          </div>
        </nav>

        {/* Mobile Nav Toggle */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleMenu} className="text-foreground hover:text-primary">
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      {isOpen && (
        <nav className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-lg shadow-lg pb-4 border-t border-primary/20">
          <div className="container mx-auto px-4 flex flex-col space-y-2 pt-2">
            {siteConfig.navItems.map((item) => (
              <Button key={item.title} variant="ghost" asChild className="text-foreground hover:text-primary hover:bg-primary/10 w-full justify-start" onClick={() => setIsOpen(false)}>
                <Link href={item.href}>{item.title}</Link>
              </Button>
            ))}
            <div className="flex space-x-2 pt-2 justify-center">
              {siteConfig.socialLinks.map((social) => (
                <Button key={social.name} variant="ghost" size="icon" asChild className="text-foreground hover:text-primary hover:bg-primary/10 neon-glow-accent">
                  <Link href={social.href} target="_blank" rel="noreferrer">
                    <social.icon className="h-5 w-5" />
                    <span className="sr-only">{social.name}</span>
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
