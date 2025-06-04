import { siteConfig } from '@/config/site';
import ProjectCard from '@/components/shared/project-card';
import SectionWrapper from '@/components/shared/section-wrapper';

export default function ProjectsSection() {
  return (
    <SectionWrapper id="projects" title="Featured Projects">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {siteConfig.projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </SectionWrapper>
  );
}
