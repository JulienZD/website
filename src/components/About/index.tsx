import Link from 'next/link';
import Hero from '@components/Hero';
import Highlight from '@components/Highlight';
import { GitHub, Linkedin, Twitter } from 'react-feather';
import styles from './index.module.css';
import { AGE } from '@lib/calculateAge';

export default function About(): JSX.Element {
  return (
    <>
      <Hero src="/images/hero.jpg" altSrc="/images/hero-og.jpg" />

      <article id={styles.about} className="container lg:pr-[600px] md:mb-48">
        <h1
          id={styles.heading}
          className="flex flex-col mb-4 lg:mb-12 md:text-6xl md:whitespace-nowrap tracking-normal"
        >
          <span className="text-[#acacac]">Hi, my name is</span>
          <Highlight>Julien Zapata Duque</Highlight>
        </h1>
        <Socials />
        <p>
          I'm a {AGE}-year-old Software Engineering student from The Netherlands. My current focus lies in web
          development.
        </p>
        <p className="mt-2">
          I'm passionate about all things software development. I'm always reading and learning about new subjects in my
          free time. In college I've learned to make Java applications and do full-stack web development with .NET Core.
          In my free time I've learned React, TypeScript and Node.js.
        </p>
        <Link href="/about">
          <a className="link-animated-hover mt-8">Read more</a>
        </Link>
      </article>
    </>
  );
}

function Socials(): JSX.Element {
  const socialClass =
    'mx-4 first:ml-0 last:mr-0 focus-visible:ring-2 focus-visible:ring-secondary-dark hover:text-[#acacac] transition-colors duration-200';
  return (
    <div id={styles.socials} className="flex my-4">
      <a className={socialClass} href="https://github.com/JulienZD" aria-label="View my GitHub" title="View my GitHub">
        <GitHub />
      </a>
      <a
        className={socialClass}
        href="https://linkedin.com/in/julienzapataduque/"
        aria-label="Connect with me on LinkedIn"
        title="Connect with me on LinkedIn"
      >
        <Linkedin />
      </a>
      <a
        className={socialClass}
        href="https://twitter.com/JulienIsMe"
        aria-label="Follow me on Twitter"
        title="Follow me on Twitter"
      >
        <Twitter />
      </a>
    </div>
  );
}
