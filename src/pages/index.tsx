import { GetStaticProps } from 'next';
import Layout from '@components/layout';
import About from '@components/About';
import Projects from '@components/Projects';
import Contact from '@components/Contact';
import { getStoriesData } from '@lib/stories';
import { StoryMeta } from '../types';
import { useRef } from 'react';

export const getStaticProps: GetStaticProps = async () => {
  const projectsData = getStoriesData(true);
  return {
    props: {
      projectsData,
    },
  };
};

interface Props {
  projectsData: StoryMeta[];
}

export default function Home({ projectsData }: Props): JSX.Element {
  const projectsRef = useRef<HTMLDivElement>(null);
  return (
    <Layout home>
      <About scrollTo={projectsRef} />
      <Projects projects={projectsData} projectsRef={projectsRef} />
      <Contact />
    </Layout>
  );
}
