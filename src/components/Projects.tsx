import { RefObject } from 'react';
import { StoryMeta } from '../types';
import Link from 'next/link';
import StoryGrid from '@components/StoryGrid';

interface Props {
  projectsRef: RefObject<HTMLDivElement>;
  projects: StoryMeta[];
}

export default function Projects({ projectsRef, projects }: Props): JSX.Element {
  return (
    <div id="projects" ref={projectsRef} className="container">
      <h2 className="text-secondary mb-4 text-4xl">Projects</h2>
      <p>There's never a time when I'm not working on something. Take a look at my recent endeavours.</p>
      <StoryGrid stories={projects.slice(0, 4)} />
      {projects.length > 4 && (
        <Link href="/projects">
          <a className="link-animated-hover !px-0">View all projects</a>
        </Link>
      )}
    </div>
  );
}
