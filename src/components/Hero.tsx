export default function Hero(): JSX.Element {
  return (
    <>
      <div
        className={`hidden lg:block xl:w-[900px] lg:w-[600px] h-[650px] relative float-right xl:bg-center bg-left-center bg-cover bg-no-repeat animate-slideLeft`}
        style={{
          backgroundImage: `url(images/hero.jpg)`,
          clipPath: 'polygon(calc(30% - 10vw) 0, 100% 0, 100% 100%, 45% 100%)',
        }}
      />
      <div className="container block lg:hidden">
        <picture>
          <source srcSet="/images/hero-og.webp" type="image/webp" />
          <img className="animate-slideUp rounded-t-xl" src="/images/hero-og.jpg" alt="" height={360} loading="lazy" />
        </picture>
      </div>
    </>
  );
}
