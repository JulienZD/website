import ProjectCard from '@components/ProjectCard';
import { StoryMeta } from '../types';

interface Props {
  stories: StoryMeta[];
}

export default function StoryGrid({ stories }: Props): JSX.Element {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-16 gap-x-16 mb-8">
      {stories.map(({ title, description, slug, image, linkText }) => {
        return (
          <ProjectCard
            key={title}
            title={title}
            description={description}
            image={image}
            slug={slug}
            linkText={linkText}
          />
        );
      })}
    </div>
  );
}
