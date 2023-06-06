import { StoryMeta } from '../types';
import Link from 'next/link';
import StoryGrid from '@components/StoryGrid';
import { RefObject } from 'react';

interface Props {
  projects: StoryMeta[];
  projectsRef: RefObject<HTMLDivElement>;
}

export default function Projects({ projects, projectsRef }: Props): JSX.Element {
  return (
    <div ref={projectsRef} id="projects" className={`container mt-24 lg:mt-0 animate-slideUp`}>
      <h2 className="mb-4 text-4xl">Projects</h2>
      <p>There's never a time when I'm not working on something. Take a look at my recent endeavors.</p>
      <p>
        Note: This list isn't up-to-date. Check my{' '}
        <Link href="https://github.com/JulienZD/">
          <a className="link-animated-hover" target="_blank">
            Github
          </a>
        </Link>{' '}
        to see what I'm up to.
      </p>
      <StoryGrid stories={projects.slice(0, 4)} />
      {projects.length > 4 && (
        <Link href="/projects">
          <a className="link-animated-hover !px-0">View all projects</a>
        </Link>
      )}
    </div>
  );
}
