import Head from 'next/head';
import Link from 'next/link';
import { useEffect } from 'react';
import HomeButton from '@components/HomeButton';

export default function Layout({ children, home }) {
  useEffect(() => {
    document.querySelector('body').className = 'h-full';
    document.querySelector('html').className = 'h-full';
    document.querySelector('#__next').className = 'flex flex-col h-full';
  });
  return (
    <>
      <Head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="Hi, I'm Julien" key="og:title" />
        <meta
          property="og:description"
          content="Here you'll find the results of me tinkering around with various technologies."
          key="og:description"
        />
        <meta property="og:image" content="http://jzd.me/images/CircleJ.png" />
        <meta property="og:url" content="https://jzd.me" />
        <meta name="twitter:card" content="summary_large_image" />

        <title>Hi, I'm Julien</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.2.2/font/bootstrap-icons.css" />
      </Head>
      {!home && (
        <header>
          <nav className="py-2 px-4 fixed-top">
            <HomeButton />
          </nav>
        </header>
      )}
      <main className={home ? null : 'with-header'}>{children}</main>
      <footer className="mt-auto text-right py-3 pr-4">
        <div className="flex justify-end">
          {home && (
            <Link href="/colors">
              <a className="link-animated-hover">Preview Color Combinations</a>
            </Link>
          )}
          <a className="link-animated-hover" href="https://github.com/JulienZD/website">
            Source
          </a>
        </div>
      </footer>
    </>
  );
}
