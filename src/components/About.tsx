import Hero from '@components/Hero';
import Highlight from '@components/Highlight';
import { GitHub, Linkedin, Twitter } from 'react-feather';

export default function About(): JSX.Element {
  return (
    <>
      <Hero src="/images/hero.jpg" altSrc="/images/hero-og.jpg" />
      <Socials />
      <div id="about" className="container lg:pr-[600px]">
        <h1 className="flex flex-col mb-12 md:mb-20 md:text-6xl md:whitespace-nowrap">
          <span>Hi, my name is</span>
          <Highlight>Julien Zapata Duque</Highlight>
        </h1>
        <p>
          I'm a {calculateAge()} year old Software Engineering student from The Netherlands. My current focus lies in
          web development.
        </p>
        <p className="mt-2">
          I've had an interest in computers since I was 17. I built my first computer around my 18th birthday. Soon
          after that I was introduced to AutoHotkey, a scripting language to automate various aspects of Windows. I
          quickly picked up the basics and wrote some simple scripts. A few months later I started learning Python, but
          soon stopped because I couldn't find a real use for it in my daily life.
        </p>
        <p className="mt-2">
          A year or so went by without much change until one day, when I was working at a local computer repair shop,
          where I was introduced to web development. They had recently hired a new guy to rebuild their website from the
          ground up and I was asked if I wanted to look over his shoulder as he worked. While I couldn't understand much
          of the code, I enjoyed the process around web development. So much that I started learning it in my free time
          with the help of online courses.
        </p>

        {/*TODO: add education section*/}
      </div>
    </>
  );
}

function calculateAge(): number {
  const diff = new Date().getTime() - new Date(1998, 5, 18).getTime();
  return Math.floor(diff / 1000 / 60 / 60 / 24 / 365);
}

function Socials(): JSX.Element {
  const socialClass = 'mx-4 first:ml-0 last:mr-0 focus-visible:ring-2 focus-visible:ring-secondary-dark';
  return (
    <div className="flex container justify-end mt-4 lg:mr-40 lg:absolute lg:right-0 lg:top-[750px]">
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
