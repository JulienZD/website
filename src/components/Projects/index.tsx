import { StoryMeta } from '../../types';
import Link from 'next/link';
import StoryGrid from '@components/StoryGrid';
import styles from './index.module.css';
interface Props {
  projects: StoryMeta[];
}

export default function Projects({ projects }: Props): JSX.Element {
  return (
    <div id="projects" className={`container mt-24 ${styles.projects}`}>
      <h2 className="mb-4 text-4xl">Projects</h2>
      <p>There's never a time when I'm not working on something. Take a look at my recent endeavors.</p>
      <StoryGrid stories={projects.slice(0, 4)} />
      {projects.length > 4 && (
        <Link href="/projects">
          <a className="link-animated-hover !px-0">View all projects</a>
        </Link>
      )}
    </div>
  );
}
