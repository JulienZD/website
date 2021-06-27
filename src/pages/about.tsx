import Head from 'next/head';
import Link from 'next/link';
import Layout from '@components/layout';
import { AGE } from '@lib/calculateAge';
import EduProgress from '@components/EduProgress';
import Contact from '@components/Contact';

export default function About(): JSX.Element {
  return (
    <Layout title="About me">
      <Head>
        <meta
          name="description"
          content={`My name is Julien Zapata Duque. I'm a ${AGE} year old Software Engineering student from The Netherlands.`}
          key="description"
        />
        <meta
          property="og:description"
          content={`My name is Julien Zapata Duque. I'm a ${AGE} year old Software Engineering student from The Netherlands.`}
          key="og:description"
        />
      </Head>
      <h1 className="animate-slideUp">About me</h1>
      <img src="/images/hero-og.jpg" width={640} height={360} alt="" className="rounded-t-xl mb-4 md:max-w-xl" />
      <p>My name is Julien Zapata Duque. I am a {AGE}-year-old software engineering student from The Netherlands.</p>
      <p className="mt-2">
        I've had an interest in computers since I was 17. I built my first computer around my 18th birthday. Soon after
        that I was introduced to AutoHotkey, a scripting language to automate various aspects of Windows. I quickly
        picked up the basics and wrote some simple scripts. A few months later I started learning Python, but soon
        stopped because I couldn't find a real use for it in my daily life.
      </p>
      <p className="mt-2">
        A year or two went by without much change until one day, when I was working at a local computer repair shop,
        where I was introduced to web development. They had recently hired a new guy to rebuild their website from the
        ground up and I was asked if I wanted to look over his shoulder as he worked. While I couldn't understand much
        of the code, I enjoyed the process around web development. So much that I started learning it in my free time
        with the help of online courses.
      </p>
      <p className="mt-2">
        At the age of 21 I decided to go to college to study Software Engineering (you can view my college progress
        below!). It was there where my love for software development has really made it's home. After a{' '}
        <Link href="/story/neighborhood">
          <a className="link-animated-hover">full-stack web development project</a>
        </Link>{' '}
        I quickly fell in love with everything surrounding it. Since then I've spent my spare time learning Node.js,
        React and TypeScript. Currently I'm also learning a bit of Svelte on the side.
      </p>
      <section className="mt-12 animate-slideUp md:w-2/3 lg:w-1/2">
        <h2 className="text-4xl">Educational progress</h2>
        <h3 className="mb-2">Software Engineering Bachelor's degree</h3>
        <EduProgress />
        <p className="mt-2">
          I'm due to graduate on{' '}
          {new Date(2023, 5, 20).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}.
        </p>
      </section>
      <Contact />
    </Layout>
  );
}
