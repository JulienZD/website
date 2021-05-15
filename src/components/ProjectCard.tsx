import { ProjectMeta } from '../types';
import { ChevronRight } from 'react-feather';

export default function ProjectCard({ title, description, image, identifier, linkText }: ProjectMeta) {
  return (
    <article className="group flex flex-col mt-4 lg:max-w-lg">
      <a href={`/${identifier}`}>
        <div
          style={{
            backgroundImage: `url(${image})`,
          }}
          className="bg-cover h-72 rounded-t-xl rounded-b transition-transform duration-[250ms] transform group-hover:scale-[1.02]"
        />
      </a>
      <a href={`/${identifier}`}>
        <h3 className="text-secondary mt-4">{title}</h3>
      </a>
      <p className="mt-4">{description}</p>
      <a href={`/${identifier}`} className="uppercase mt-4">
        <div className="inline-flex items-center group-hover:underline">
          {linkText ?? 'View project'} <ChevronRight size={16} />
        </div>
      </a>
    </article>
  );
}
