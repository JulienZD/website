import Layout from '../components/layout';
import { useEffect } from 'react';
import EduProgressBar from '../components/EduProgressBar';
import styles from '../components/Home.module.css';

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
      <div id="wrapper" className="text-left text-md-center">
        <h1 className="visuallyhidden">Hi, my name is Julien</h1>
        <section id="introContainer">
          <h1 aria-hidden="true">
            <span style={{ fontSize: 5 + 'rem' }}> Hi, </span>
            <span style={{ fontSize: 3 + 'rem' }}> my name is </span>
          </h1>
          <img id="logo" src="images/julien.svg" aria-hidden="true" title="I drew this myself, can you believe it?" />
        </section>
        <section id="elsewhereContainer">
          <h2 className="title mt-3 mt-sm-5">Find me elsewhere</h2>
          <div className="links">
            <a href="https://github.com/JulienZD" rel="noopener noreferrer" className="button--gold">
              <i className="bi bi-github" aria-label="My GitHub"></i>
            </a>
            <a href="https://twitter.com/JulienIsMe" rel="noopener noreferrer" className="button--gold">
              <i className="bi bi-twitter" aria-label="My Twitter"></i>
            </a>
          </div>
        </section>
        <section id="progressContainer" className="mt-5">
          <h2 className="title">Educational progress</h2>
          <h3>Software Engineering Bachelor's degree</h3>
          <EduProgressBar endDate={endDate} />
          <p className="text-left">I'm due to graduate on {endDate.toLocaleDateString('en-US', dateOptions)}.</p>
        </section>
      </div>
    </Layout>
  );
}
