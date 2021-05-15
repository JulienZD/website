import Layout from '@components/layout';
import { GetStaticPaths, GetStaticProps } from 'next';
import { getStoryData, getStorySlugs } from '@lib/stories';
import Head from 'next/head';
import { useEffect } from 'react';

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
    props: {
      storyData,
    },
  };
};

interface Props {
  storyData: {
    title: string;
    description: string;
    image?: string;
    contentHtml: string;
  };
}

export default function Story({ storyData: { title, description, image, contentHtml } }: Props): JSX.Element {
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
      {image && <img src={image} alt="" width={1280} height={720} className="rounded-t-xl" />}
      <div className="mt-12" dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </Layout>
  );
}
