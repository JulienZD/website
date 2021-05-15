import Layout from '@components/layout';
import { GetStaticPaths, GetStaticProps } from 'next';
import { getStoryData, getStorySlugs } from '@lib/stories';
import Head from 'next/head';

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
  return (
    <Layout title={title}>
      <Head>
        <meta property="og:description" content={description} key="og:description" />
        <meta name="description" content={description} key="description" />
        <meta property="og:image" content={image} key="og:image" />
      </Head>
      <h1>{title}</h1>
      <p>{description}</p>
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </Layout>
  );
}
