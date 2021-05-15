export default function Hero({ src, altSrc }: { src: string; altSrc: string }): JSX.Element {
  return (
    <>
      <div
        className={`hidden lg:block xl:w-[900px] lg:w-[600px] h-[650px] relative float-right xl:bg-center bg-left-center bg-cover bg-no-repeat animate-slideLeft`}
        style={{
          backgroundImage: `url(${src})`,
          clipPath: 'polygon(calc(30% - 10vw) 0, 100% 0, 100% 100%, 45% 100%)',
        }}
      />
      <div className="container block lg:hidden">
        <img className="animate-slideUp rounded-t-xl" src={altSrc ?? src} alt={''} height="360" />
      </div>
    </>
  );
}
