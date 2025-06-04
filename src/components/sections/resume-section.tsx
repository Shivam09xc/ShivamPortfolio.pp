"use client";

import { siteConfig, Skill } from '@/config/site';
import SkillProgressBar from '@/components/shared/skill-progress-bar';
import SectionWrapper from '@/components/shared/section-wrapper';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, GraduationCap, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import React, { useRef, useState, useEffect } from 'react';

const experienceData = [
  {
    role: "Senior Software Engineer",
    company: "Innovatech Solutions",
    duration: "2021 - Present",
    description: "Led development of AI-driven analytics platforms, mentored junior engineers, and spearheaded adoption of microservices architecture. Contributed to a 20% increase in platform efficiency.",
  },
  {
    role: "Software Developer",
    company: "TechForward Inc.",
    duration: "2018 - 2021",
    description: "Developed and maintained full-stack web applications using React, Node.js, and Python. Collaborated in an Agile environment to deliver high-quality software products.",
  },
];

const educationData = [
  {
    degree: "M.S. in Computer Science",
    institution: "Stanford University",
    duration: "2016 - 2018",
    description: "Specialized in Artificial Intelligence and Machine Learning. Thesis on 'Scalable Deep Learning Models for NLP'.",
  },
  {
    degree: "B.S. in Software Engineering",
    institution: "University of California, Berkeley",
    duration: "2012 - 2016",
    description: "Graduated with Honors. Capstone project on 'IoT-based Smart City Solutions'.",
  },
];

export default function ResumeSection() {
  const skillsRef = useRef<HTMLDivElement>(null);
  const [skillsVisible, setSkillsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setSkillsVisible(true);
            // observer.unobserve(entry.target); // Optional: stop observing once visible
          } else {
            // Optionally reset visibility if you want animation to replay on scroll away and back
            // setSkillsVisible(false);
          }
        });
      },
      { threshold: 0.1 } // Trigger when 10% of the element is visible
    );

    const currentRef = skillsRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);
  
  return (
    <SectionWrapper id="resume" title="My Resume">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Skills Column */}
        <Card className="glassmorphism-darker lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-2xl text-primary">Skills</CardTitle>
          </CardHeader>
          <CardContent ref={skillsRef}>
            {siteConfig.skills.map((skill: Skill) => (
              <SkillProgressBar key={skill.name} skill={skill} isVisible={skillsVisible} />
            ))}
          </CardContent>
        </Card>

        {/* Experience and Education Column */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="glassmorphism-darker">
            <CardHeader>
              <CardTitle className="text-2xl text-primary flex items-center">
                <Briefcase className="mr-3 h-6 w-6" /> Experience
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {experienceData.map((exp, index) => (
                <div key={index} className="relative pl-8 border-l-2 border-primary/30">
                   <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-primary neon-glow-primary"></div>
                  <h3 className="font-semibold text-lg text-accent">{exp.role}</h3>
                  <p className="text-sm text-muted-foreground">{exp.company} | {exp.duration}</p>
                  <p className="mt-1 text-sm text-foreground/80">{exp.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="glassmorphism-darker">
            <CardHeader>
              <CardTitle className="text-2xl text-primary flex items-center">
                <GraduationCap className="mr-3 h-6 w-6" /> Education
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {educationData.map((edu, index) => (
                <div key={index} className="relative pl-8 border-l-2 border-primary/30">
                  <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-primary neon-glow-primary"></div>
                  <h3 className="font-semibold text-lg text-accent">{edu.degree}</h3>
                  <p className="text-sm text-muted-foreground">{edu.institution} | {edu.duration}</p>
                  <p className="mt-1 text-sm text-foreground/80">{edu.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="text-center mt-12">
        <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/80 neon-glow-primary">
          <Download className="mr-2 h-5 w-5" /> Download Full Resume (PDF)
        </Button>
      </div>
    </SectionWrapper>
  );
}
