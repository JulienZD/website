import { ReactNode } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Header from '@components/Header';

interface Props {
  children: ReactNode;
  title?: string;
  home?: boolean;
}

const DEFAULT_TITLE = 'Julien Zapata Duque';

export default function Layout({ children, home, title = DEFAULT_TITLE }: Props): JSX.Element {
  const description =
    "For the past few years I've been playing around with various technologies. I'm eager to learn new things and am always on the lookout for a new challenge.";

  const headTitle = title === DEFAULT_TITLE ? title : `${title} | Julien Zapata Duque`;

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{headTitle}</title>
        <meta property="og:title" content={headTitle} />
        <meta name="description" content={description} key="description" />
        <meta property="og:description" content={description} key="og:description" />
        <meta property="og:image" content="/images/hero-og.jpg" key="og:image" />
        <meta property="og:url" content="https://jzd.me" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="theme-color" content="#071625" />
      </Head>
      <Header />
      <main className={home ? '' : 'container'}>{children}</main>
      <footer className="mt-auto text-right py-3 pr-4">
        <div className="flex justify-end">
          <Link href="https://colors.jzd.me/">
            <a className="link-animated-hover" target="_blank">
              Preview Color Combinations
            </a>
          </Link>
          <Link href="https://github.com/JulienZD/website">
            <a className="link-animated-hover" target="_blank">
              Source
            </a>
          </Link>
        </div>
      </footer>
    </>
  );
}
