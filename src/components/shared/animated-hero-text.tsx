"use client";

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedHeroTextProps {
  texts: string[];
  className?: string;
}

const AnimatedHeroText: React.FC<AnimatedHeroTextProps> = ({ texts, className }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  const typingSpeed = 100;
  const deletingSpeed = 50;
  const delayBetweenTexts = 2000;

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isDeleting) {
      if (charIndex > 0) {
        timer = setTimeout(() => {
          setDisplayedText((prev) => prev.substring(0, prev.length - 1));
          setCharIndex((prev) => prev - 1);
        }, deletingSpeed);
      } else {
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % texts.length);
      }
    } else {
      if (charIndex < texts[currentIndex].length) {
        timer = setTimeout(() => {
          setDisplayedText((prev) => prev + texts[currentIndex][charIndex]);
          setCharIndex((prev) => prev + 1);
        }, typingSpeed);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, delayBetweenTexts);
      }
    }

    return () => clearTimeout(timer);
  }, [charIndex, currentIndex, displayedText, isDeleting, texts]);
  
  return (
    <span className={cn("inline-block min-h-[1.2em]", className)}>
      {displayedText}
      <span className="animate-ping">|</span>
    </span>
  );
};

export default AnimatedHeroText;
