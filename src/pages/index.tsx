import { GetStaticProps } from 'next';
import Layout from '@components/layout';
import About from '@components/About';
import Projects from '@components/Projects';
import Contact from '@components/Contact';
import { getStoriesData } from '@lib/stories';
import { StoryMeta } from '../types';

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
  return (
    <Layout home>
      <About />
      <Projects projects={projectsData} />
      <Contact />
    </Layout>
  );
}
