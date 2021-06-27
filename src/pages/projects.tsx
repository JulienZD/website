import { GetStaticProps } from 'next';
import Head from 'next/head';
import Layout from '@components/layout';
import { getStoriesData } from '@lib/stories';
import { StoryMeta } from '../types';
import StoryGrid from '@components/StoryGrid';
import Contact from '@components/Contact';

export const getStaticProps: GetStaticProps = async (context) => {
  const projectsData = getStoriesData();
  return {
    props: {
      projectsData,
    },
  };
};

interface Props {
  projectsData: StoryMeta[];
}

export default function Projects({ projectsData }: Props): JSX.Element {
  const description = "All of the projects I've worked on during my career as a software engineer.";
  return (
    <Layout title="Projects">
      <Head>
        <meta name="description" content={description} key="description" />
        <meta property="og:description" content={description} key="og:description" />
      </Head>
      <h1 className="animate-slideUp mb-4">All projects</h1>
      <p className="mb-8">{description}</p>
      <StoryGrid stories={projectsData} />
      <Contact />
    </Layout>
  );
}
