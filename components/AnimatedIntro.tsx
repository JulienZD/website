import useCombinedRef from '@hooks/useCombinedRef';
import React, { forwardRef, MutableRefObject, RefObject, useEffect, useRef } from 'react';

function animateIntroText(logo: RefObject<HTMLImageElement>, textRef: RefObject<HTMLElement>) {
  if (!textRef.current || !logo.current) return;

  const textNodes = Array.from(textRef.current.children) as HTMLElement[];

  textNodes.forEach((node, index) => {
    node.style.animationDuration = `${index + 1}s`;
    node.style.animationDelay = `${index / 2}s`;
  });

  logo.current.style.animationDelay = '1.25s'; //`${textNodes.length}s`;
}

export type Ref = HTMLElement;

const AnimatedIntro = forwardRef<Ref>((_props, introRef) => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const combinedRef = useCombinedRef(introRef) as MutableRefObject<HTMLImageElement | null>;
  useEffect(() => {
    animateIntroText(combinedRef, headingRef);
  });
  return (
    <>
      <h1 className="sr-only">Hi, my name is Julien</h1>
      <section id="introContainer">
        <h1 ref={headingRef} aria-hidden="true">
          <span className="text-7xl"> Hi, </span>
          <span className="text-5xl"> my name is </span>
        </h1>
        <img
          ref={combinedRef}
          className="inline"
          id="logo"
          src="images/julien.svg"
          aria-hidden="true"
          title="I drew this myself, can you believe it?"
        />
      </section>
    </>
  );
});

export default AnimatedIntro;
