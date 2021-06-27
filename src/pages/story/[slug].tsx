import Layout from '@components/layout';
import { GetStaticPaths, GetStaticProps } from 'next';
import { getStoryData, getStorySlugs } from '@lib/stories';
import Head from 'next/head';
import { ReactNode, useEffect } from 'react';

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getStorySlugs();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const storyData = await getStoryData(params?.slug as string);
  return {
    props: storyData,
  };
};

interface Props {
  slug: string;
  title: string;
  description: string;
  summary: string;
  contentHtml: string;
  stack: string[];
  repository?: string;
  image?: string;
}

export default function Story({
  title,
  description,
  summary,
  image,
  contentHtml,
  stack,
  repository,
}: Props): JSX.Element {
  useEffect(() => {
    document
      .querySelectorAll('main a:not([href^="/images"])') // don't style the generated images wrapped in <a></a>
      .forEach((anchor) => (anchor.className = 'link-animated-hover'));
  });
  return (
    <Layout title={title}>
      <Head>
        <meta property="og:description" content={description} key="og:description" />
        <meta name="description" content={description} key="description" />
        <meta property="og:image" content={image} key="og:image" />
      </Head>
      <h1 className="animate-slideUp">{title}</h1>
      {summary ? (
        /* Let's pretend that markdown isn't parsed manually to extract a link in case a summary contains one
         * TODO: Find a way to improve this, maybe get rid of markdown files to manage these pages all together
         */
        <p
          className="max-w-4xl my-8"
          dangerouslySetInnerHTML={{
            __html: summary
              .split(' ')
              .map((word) => {
                const result = word.match(/\[(.*)]\((.*)\)/);
                if (result) {
                  return `<a href=${result[2]}>${result[1].replace(/\$/g, ' ')}</a>`;
                }
                return word;
              })
              .join(' '),
          }}
        />
      ) : (
        <p className="max-w-4xl my-8">{description}</p>
      )}
      <div className="flex flex-row gap-x-24 my-8">
        <InfoBlock title="Stack">
          {stack?.map((tech) => (
            <p key={tech} className="my-0.5 first:mt-0 last:mb-0">
              {tech}
            </p>
          ))}
        </InfoBlock>
        <InfoBlock title="Code">{repository ? <a href={repository}>Repository</a> : <p>Not available</p>}</InfoBlock>
      </div>
      {image && (
        <img
          src={image}
          alt=""
          width={1024}
          height={576}
          className="rounded-t-xl object-cover object-top h-56 sm:h-auto"
        />
      )}

      <div className="mt-12" dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </Layout>
  );
}

function InfoBlock({ title, children }: { title: string; children: ReactNode }): JSX.Element {
  return (
    <div className="flex flex-col">
      <strong className="text-secondary mb-2">{title}</strong>
      {children}
    </div>
  );
}
