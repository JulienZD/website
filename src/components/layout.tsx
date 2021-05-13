import { ReactNode } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Header from '@components/Header';

interface Props {
  children: ReactNode;
  title?: string;
  home?: boolean;
}

export default function Layout({ children, home, title = "Hi, I'm Julien" }: Props): JSX.Element {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta
          property="og:description"
          content="Here you'll find the results of me tinkering around with various technologies."
          key="og:description"
        />
        <meta property="og:image" content="http://jzd.me/images/CircleJ.png" />
        <meta property="og:url" content="https://jzd.me" />
        <meta name="twitter:card" content="summary_large_image" />

        <link
          rel="preload"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.2.2/font/bootstrap-icons.css"
          as="style"
        />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.2.2/font/bootstrap-icons.css" />
      </Head>
      <Header />
      <main className={home ? 'home' : 'with-header'}>{children}</main>
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
