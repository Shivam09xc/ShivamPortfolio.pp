import Image from 'next/image';
import { Project } from '@/config/site';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="glassmorphism-darker overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-primary/30 flex flex-col h-full">
      <CardHeader>
        <div className="relative w-full h-48 mb-4 rounded-md overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            layout="fill"
            objectFit="cover"
            data-ai-hint={project.dataAiHint || "technology project"}
            className="transform transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        <CardTitle className="text-2xl font-headline text-primary">{project.title}</CardTitle>
        <CardDescription className="text-muted-foreground min-h-[3em]">{project.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="mb-4">
          <h4 className="text-sm font-semibold mb-2 text-accent">Tech Stack:</h4>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <Badge key={tech} variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
        {project.longDescription && <p className="text-sm text-foreground/80 mb-4">{project.longDescription}</p>}
      </CardContent>
      <CardFooter className="mt-auto">
        <div className="flex space-x-2 w-full">
          {project.liveLink && (
            <Button variant="outline" asChild className="border-accent text-accent hover:bg-accent/10 hover:text-accent flex-1">
              <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
              </a>
            </Button>
          )}
          {project.repoLink && (
            <Button variant="outline" asChild className="border-accent text-accent hover:bg-accent/10 hover:text-accent flex-1">
              <a href={project.repoLink} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" /> View Code
              </a>
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
