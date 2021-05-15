import { RefObject } from 'react';
import { ProjectMeta } from '../types';
import ProjectCard from '@components/ProjectCard';
import Link from 'next/link';

interface Props {
  projectsRef: RefObject<HTMLDivElement>;
  projects: ProjectMeta[];
}

export default function Projects({ projectsRef, projects }: Props): JSX.Element {
  return (
    <div id="projects" ref={projectsRef} className="container">
      <h2 className="text-secondary mb-4">Projects</h2>
      <p>There's never a time when I'm not working on something. Take a look at my recent endeavours.</p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-16 gap-x-16 mb-8">
        {projects.map(({ title, description, identifier, image, linkText }) => {
          return (
            <ProjectCard
              key={title}
              title={title}
              description={description}
              image={image}
              identifier={identifier}
              linkText={linkText}
            />
          );
        })}
      </div>
      {projects.length > 4 && (
        <Link href="/projects">
          <a className="link-animated-hover !px-0">View all projects</a>
        </Link>
      )}
    </div>
  );
}
