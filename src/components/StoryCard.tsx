import Link from 'next/link';
import { ReactNode } from 'react';
import { ChevronRight } from 'react-feather';

interface Props {
  title: string;
  description: string;
  image: string;
  slug: string;
  linkText?: string;
}

export default function StoryCard({ title, description, image, slug, linkText }: Props): JSX.Element {
  const href = `/story/${slug}`;
  return (
    <article className="group flex flex-col mt-4 lg:max-w-lg">
      <ProjectLink href={href} title={title}>
        <div
          style={{
            backgroundImage: `url(${image})`,
          }}
          className="bg-cover bg-center-top h-72 rounded-t-xl rounded-b transition-transform duration-[250ms] transform group-hover:scale-[1.02]"
        />
      </ProjectLink>
      <ProjectLink href={href} title={title}>
        <h3 className="text-secondary mt-4">{title}</h3>
      </ProjectLink>
      <p className="mt-4">{description}</p>
      <ProjectLink href={href} title={title}>
        <div className="inline-flex items-center group-hover:underline uppercase mt-4">
          {linkText ?? 'View project'} <ChevronRight size={16} />
        </div>
      </ProjectLink>
    </article>
  );
}

function ProjectLink({ href, title, children }: { href: string; title: string; children: ReactNode }): JSX.Element {
  return (
    <Link href={href}>
      <a aria-label={`Read more about ${title}`}>{children}</a>
    </Link>
  );
}
