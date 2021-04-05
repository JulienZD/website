import { useEffect, useRef } from 'react';
import Layout from '@components/layout';
import EduProgress from '@components/EduProgress';
import SocialButton from '@components/SocialButton';

function displayIntro(elements) {
  setAnimEvents(elements);
  const { children } = elements.h1Ref.current;
  const duration = 1;

  for (let i = 0; i < children.length; i++) {
    const child = children[i];

    child.style.animationDuration = `${duration * (i + 1)}s`;
    child.style.animationDelay = `${i}s`;
  }

  logo.style.animationDelay = `${children.length}s`;
}

function setAnimEvents({ logo, elsewhereContainer, progressContainer }) {
  const setAnim = (el) => {
    if (!el) return;
    el.style.animationDuration = '1s';
    el.style.animationFillMode = 'forwards';
    el.style.animationName = 'appear';
  };

  const animateElementAfterPrevious = ({ current: prevAnimatedEl }, nextAnimatedEl, delay) => {
    prevAnimatedEl.addEventListener('animationstart', () => {
      setTimeout(() => setAnim(nextAnimatedEl.current), delay);
    });
  };
  animateElementAfterPrevious(logo, elsewhereContainer, 1000);
  animateElementAfterPrevious(elsewhereContainer, progressContainer, 875);
}

const endDate = new Date(2023, 5, 1);
const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };

export default function Home() {
  const logo = useRef(null);
  const elsewhereContainer = useRef(null);
  const progressContainer = useRef(null);
  const h1Ref = useRef(null);

  useEffect(() => {
    displayIntro({ logo, elsewhereContainer, progressContainer, h1Ref });
  });
  return (
    <Layout home>
      <div id="wrapper" className="text-left md:text-center">
        <h1 className="sr-only">Hi, my name is Julien</h1>
        <section id="introContainer">
          <h1 ref={h1Ref} aria-hidden="true">
            <span style={{ fontSize: 5 + 'rem' }}> Hi, </span>
            <span style={{ fontSize: 3 + 'rem' }}> my name is </span>
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
          <p className="text-left">I'm due to graduate on {endDate.toLocaleDateString('en-US', dateOptions)}.</p>
        </section>
      </div>
    </Layout>
  );
}
