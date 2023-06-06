import Contact from '@components/Contact';
import StoryGrid from '@components/StoryGrid';
import Layout from '@components/layout';
import { getStoriesData } from '@lib/stories';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { StoryMeta } from '../types';

export const getStaticProps: GetStaticProps = async () => {
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
      <p>
        Note: This list isn't up-to-date. Check my{' '}
        <Link href="https://github.com/JulienZD/">
          <a className="link-animated-hover" target="_blank">
            Github
          </a>
        </Link>{' '}
        to see what I'm up to.
      </p>
      <StoryGrid stories={projectsData} />
      <Contact />
    </Layout>
  );
}
