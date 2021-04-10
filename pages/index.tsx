import { RefObject, useEffect, useRef } from 'react';
import Layout from '@components/layout';
import EduProgress from '@components/EduProgress';
import SocialButton from '@components/SocialButton';

interface Elements {
  logo: RefObject<HTMLElement>;
  elsewhereContainer: RefObject<HTMLElement>;
  progressContainer: RefObject<HTMLElement>;
  h1Ref: RefObject<HTMLElement>;
}

function displayIntro(elements: Elements) {
  animateIntroText(elements.logo, elements.h1Ref);
  setAnimEvents(elements);
}

function animateIntroText(logo: RefObject<HTMLElement>, textRef: RefObject<HTMLElement>) {
  if (!textRef.current || !logo.current) return;

  const textNodes = Array.from(textRef.current.children) as HTMLElement[];

  textNodes.forEach((node, index) => {
    node.style.animationDuration = `${index + 1}s`;
    node.style.animationDelay = `${index / 2}s`;
  });

  logo.current.style.animationDelay = '1.25s'; //`${textNodes.length}s`;
}

function setAnimEvents({ logo, elsewhereContainer, progressContainer }: Omit<Elements, 'h1Ref'>) {
  const animateElementAfterPrevious = (
    { current: prevAnimatedEl }: RefObject<HTMLElement>,
    { current: nextAnimatedEl }: RefObject<HTMLElement>,
    delay: number
  ) => {
    if (!prevAnimatedEl || !nextAnimatedEl) return;
    prevAnimatedEl.addEventListener('animationstart', () => {
      setTimeout(() => setAnim(nextAnimatedEl), delay);
    });
  };

  const setAnim = (el: HTMLElement) => {
    el.style.animationDuration = '1s';
    el.style.animationFillMode = 'forwards';
    el.style.animationName = 'appear';
  };

  animateElementAfterPrevious(logo, elsewhereContainer, 750);
  animateElementAfterPrevious(elsewhereContainer, progressContainer, 0);
}

const endDate = new Date(2023, 5, 1);

export default function Home() {
  const logo = useRef<HTMLImageElement>(null);
  const elsewhereContainer = useRef<HTMLDivElement>(null);
  const progressContainer = useRef<HTMLDivElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    displayIntro({ logo, elsewhereContainer, progressContainer, h1Ref });
  });
  return (
    <Layout home>
      <div id="wrapper" className="text-left md:text-center">
        <h1 className="sr-only">Hi, my name is Julien</h1>
        <section id="introContainer">
          <h1 ref={h1Ref} aria-hidden="true">
            <span className="text-7xl"> Hi, </span>
            <span className="text-5xl"> my name is </span>
          </h1>
          <img
            ref={logo}
            className="inline"
            id="logo"
            src="images/julien.svg"
            aria-hidden="true"
            title="I drew this myself, can you believe it?"
          />
        </section>
        <section ref={elsewhereContainer} id="elsewhereContainer" className="mt-4 mt-sm-12">
          <h2 className="section-title">Find me elsewhere</h2>
          <div className="pt-4">
            <SocialButton href="https://github.com/JulienZD" icon="github" ariaLabel="My GitHub" />
            <SocialButton href="https://linkedin.com/in/julienzapataduque/" icon="linkedin" ariaLabel="My LinkedIn" />
            <SocialButton href="https://twitter.com/JulienIsMe" icon="twitter" ariaLabel="My Twitter" />
          </div>
        </section>
        <section ref={progressContainer} id="progressContainer" className="mt-12">
          <h2 className="section-title">Educational progress</h2>
          <h3 className="text-left mb-2">Software Engineering Bachelor's degree</h3>
          <EduProgress endDate={endDate} container={progressContainer} />
          <p className="text-left">
            I'm due to graduate on{' '}
            {endDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}.
          </p>
        </section>
      </div>
    </Layout>
  );
}
