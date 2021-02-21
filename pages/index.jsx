import { useEffect } from 'react';
import Layout from '@components/layout';
import EduProgress from '@components/EduProgress';
import SocialButton from '@components/SocialButton';
import styles from '@components/Home.module.css';

function displayIntro() {
  setAnimEvents();
  const children = document.querySelector('#introContainer h1').children;
  const duration = 1;

  for (let i = 0; i < children.length; i++) {
    const child = children[i];

    child.style.animationDuration = `${duration * (i + 1)}s`;
    child.style.animationDelay = `${i}s`;
  }

  logo.style.animationDelay = `${children.length}s`;
}

function setAnimEvents() {
  const setAnim = (el) => {
    el.style.animationDuration = '1s';
    el.style.animationFillMode = 'forwards';
    el.style.animationName = 'appear';
  };
  const logo = document.querySelector('#logo');
  const elsewhereContainer = document.querySelector('#elsewhereContainer');
  const progressContainer = document.querySelector('#progressContainer');

  logo.addEventListener('animationstart', function e() {
    setTimeout(() => setAnim(elsewhereContainer), 1000);
  });

  elsewhereContainer.addEventListener('animationstart', function e() {
    setTimeout(() => setAnim(progressContainer), 875);
  });
}

const endDate = new Date(2023, 5, 1);
const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };

export default function Home() {
  useEffect(() => {
    displayIntro();
    document.querySelector('main').id = styles.homeWrapper;
  });
  return (
    <Layout home>
      <div id="wrapper" className="text-left md:text-center">
        <h1 className="sr-only">Hi, my name is Julien</h1>
        <section id="introContainer">
          <h1 aria-hidden="true">
            <span style={{ fontSize: 5 + 'rem' }}> Hi, </span>
            <span style={{ fontSize: 3 + 'rem' }}> my name is </span>
          </h1>
          <img
            className="inline"
            id="logo"
            src="images/julien.svg"
            aria-hidden="true"
            title="I drew this myself, can you believe it?"
          />
        </section>
        <section id="elsewhereContainer" className="mt-4 mt-sm-12">
          <h2 className="section-title">Find me elsewhere</h2>
          <div className="pt-4">
            <SocialButton href="https://github.com/JulienZD" icon="github" ariaLabel="My GitHub" />
            <SocialButton href="https://linkedin.com/in/julienzapataduque/" icon="linkedin" ariaLabel="My LinkedIn" />
            <SocialButton href="https://twitter.com/JulienIsMe" icon="twitter" ariaLabel="My Twitter" />
          </div>
        </section>
        <section id="progressContainer" className="mt-12">
          <h2 className="section-title">Educational progress</h2>
          <h3 className="text-left mb-2">Software Engineering Bachelor's degree</h3>
          <EduProgress endDate={endDate} />
          <p className="text-left">I'm due to graduate on {endDate.toLocaleDateString('en-US', dateOptions)}.</p>
        </section>
      </div>
    </Layout>
  );
}
