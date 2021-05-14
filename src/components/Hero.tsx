export default function Hero({ src, altSrc }: { src: string; altSrc: string }): JSX.Element {
  return (
    <>
      <div
        className={`hidden lg:block xl:w-[900px] lg:w-[600px] h-[650px] relative float-right xl:bg-center bg-left-center bg-cover bg-no-repeat`}
        style={{
          backgroundImage: `url(${src})`,
          clipPath: 'polygon(calc(30% - 10vw) 0, 100% 0, 100% 100%, 45% 100%)',
        }}
      />
      <img className="container block lg:hidden" src={altSrc ?? src} alt={''} />
    </>
  );
}
