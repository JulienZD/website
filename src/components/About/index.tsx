import Link from 'next/link';
import Hero from '@components/Hero';
import Highlight from '@components/Highlight';
import { ChevronDown, ChevronRight, GitHub, Linkedin, Twitter } from 'react-feather';
import styles from './index.module.css';
import { AGE } from '@lib/calculateAge';
import { RefObject } from 'react';

export default function About({ scrollTo }: { scrollTo: RefObject<HTMLDivElement> }): JSX.Element {
  return (
    <>
      <div className="lg:h-screen">
        <Hero />
        <article id={styles.about} className="container lg:pr-[600px]">
          <h1
            id={styles.heading}
            className="flex flex-col mb-4 lg:mb-12 md:text-6xl md:whitespace-nowrap tracking-normal"
          >
            <span className="text-[#acacac]">Hi, my name is</span>
            <Highlight>Julien Zapata Duque</Highlight>
          </h1>
          <Socials />
          <p>
            I'm a {AGE}-year-old software developer from The Netherlands. My current focus lies in web development. I'm
            currently working at{' '}
            <Link href="https://hoorayhr.io">
              <a className="link-animated-hover">HoorayHR</a>
            </Link>
            .
          </p>
          <p>
            I'm passionate about all things software development. I'm always reading and learning about new subjects in
            my free time. In college I've learned to make Java applications and do full-stack web development with .NET
            Core. In my free time I've learned technologies like React, TypeScript and Node.js. Have a look below to see
            what I've worked on.
          </p>
          <Link href="/about">
            <a className="link-animated-hover mt-8" aria-label="Read more about me">
              <span className="flex items-center">
                More about me <ChevronRight size={16} />
              </span>
            </a>
          </Link>
        </article>
        <div className="container mt-16 hidden lg:block">
          <button
            id={styles.scroll}
            onClick={(): void => {
              if (scrollTo && scrollTo.current) scrollTo.current.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <Highlight>
              <div className="flex text-xl items-end">
                <span className="mr-2">Scroll down</span>
                <ChevronDown className="motion-safe:animate-bounce" size={24} />
              </div>
            </Highlight>
          </button>
        </div>
      </div>
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
