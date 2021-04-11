import { createRef, RefObject, useEffect, useRef } from 'react';
import Layout from '@components/layout';
import EduProgress from '@components/EduProgress';
import SocialButton from '@components/SocialButton';
import AnimatedIntro from '@components/AnimatedIntro';

interface Elements {
  introRef: RefObject<HTMLElement>;
  socialsContainer: RefObject<HTMLElement>;
  progressContainer: RefObject<HTMLElement>;
}

function displayIntro(elements: Elements): void {
  setAnimEvents(elements);
}

function setAnimEvents({ introRef, socialsContainer, progressContainer }: Elements): void {
  const animateElementAfterPrevious = (
    { current: prevAnimatedEl }: RefObject<HTMLElement>,
    { current: nextAnimatedEl }: RefObject<HTMLElement>,
    delay: number
  ): void => {
    if (!prevAnimatedEl || !nextAnimatedEl) return;
    prevAnimatedEl.addEventListener('animationstart', () => {
      setTimeout(() => setAnim(nextAnimatedEl), delay);
    });
  };

  const setAnim = (el: HTMLElement): void => {
    el.style.animationDuration = '1s';
    el.style.animationFillMode = 'forwards';
    el.style.animationName = 'appear';
  };

  animateElementAfterPrevious(introRef, socialsContainer, 750);
  animateElementAfterPrevious(socialsContainer, progressContainer, 0);
}

const endDate = new Date(2023, 5, 1);

export default function Home(): JSX.Element {
  const socialsContainer = useRef<HTMLDivElement>(null);
  const progressContainer = useRef<HTMLDivElement>(null);
  const introRef = createRef<HTMLImageElement>();

  useEffect(() => {
    displayIntro({ introRef, socialsContainer: socialsContainer, progressContainer });
  });
  return (
    <Layout home>
      <div id="wrapper" className="text-left md:text-center">
        <AnimatedIntro ref={introRef} />
        <section ref={socialsContainer} className="mt-4 mt-sm-12 opacity-0">
          <h2 className="section-title">Find me elsewhere</h2>
          <div className="pt-4">
            <SocialButton href="https://github.com/JulienZD" icon="github" ariaLabel="My GitHub" />
            <SocialButton href="https://linkedin.com/in/julienzapataduque/" icon="linkedin" ariaLabel="My LinkedIn" />
            <SocialButton href="https://twitter.com/JulienIsMe" icon="twitter" ariaLabel="My Twitter" />
          </div>
        </section>
        <section ref={progressContainer} className="mt-12 opacity-0">
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
