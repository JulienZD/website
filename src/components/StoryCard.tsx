import Link from 'next/link';
import { ChevronRight } from 'react-feather';
import { useRef } from 'react';
import ClickableWrapper from '@components/ClickableWrapper';

interface Props {
  title: string;
  description: string;
  image: string;
  slug: string;
  linkText?: string;
}

export default function StoryCard({ title, description, image, slug, linkText }: Props): JSX.Element {
  const cardRef = useRef<HTMLDivElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);
  return (
    <ClickableWrapper parent={cardRef} target={linkRef}>
      <article ref={cardRef} tabIndex={0} className="group flex flex-col mt-4 lg:max-w-lg cursor-pointer">
        <div
          style={{
            backgroundImage: `url(${image})`,
          }}
          className="bg-cover bg-top h-72 rounded-t-xl rounded-b transition-transform duration-[250ms] transform group-focus:scale-[1.02] group-hover:scale-[1.02]"
        />
        <Link href={`/story/${slug}`}>
          <a ref={linkRef} aria-label={`Read more about ${title}`}>
            <h3 className="text-secondary mt-4">{title}</h3>
          </a>
        </Link>
        <p className="mt-4">{description}</p>
        <p className="inline-flex items-center uppercase mt-4 text-secondary">
          {linkText ?? 'View project'} <ChevronRight size={16} />
        </p>
      </article>
    </ClickableWrapper>
  );
}
