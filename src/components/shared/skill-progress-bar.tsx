"use client";

import React, { useEffect, useState } from 'react';
import { Skill } from '@/config/site';
import { cn } from '@/lib/utils';

interface SkillProgressBarProps {
  skill: Skill;
  isVisible: boolean;
}

export default function SkillProgressBar({ skill, isVisible }: SkillProgressBarProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => setProgress(skill.level), 100); // Small delay for animation to kick in
      return () => clearTimeout(timer);
    } else {
      // Optionally reset progress when not visible, or keep it
      // setProgress(0); 
    }
  }, [isVisible, skill.level]);

  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-foreground">{skill.name}</span>
        <span className="text-sm font-medium text-primary">{progress}%</span>
      </div>
      <div className="w-full bg-muted rounded-full h-2.5">
        <div
          className="bg-gradient-to-r from-primary to-accent h-2.5 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${progress}%` }}
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        ></div>
      </div>
    </div>
  );
}
