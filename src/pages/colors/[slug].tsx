import { useState, useEffect } from 'react';
import Colors from './index';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';

export default function slug(): JSX.Element {
  const [colors, setColors] = useState<string[] | null>(null);
  const [loadingTimedOut, setLoadingTimedOut] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => setLoadingTimedOut(true), 3000);
    if (!router.isReady) return (): void => clearTimeout(timeout);
    const importedColors = tryImportColors(router.query.slug as string);
    if (!importedColors) return (): void => clearTimeout(timeout);
    setColors(importedColors);

    return (): void => clearTimeout(timeout);
  }, [router.isReady]);
  return (
    <>
      <Head>
        <title>Preview Color Combinations</title>
        <meta property="og:title" content="Preview Color Combinations" />
        <meta
          property="og:description"
          content="Check out this awesome combination of colors that has been shared with you!"
          key="og:description"
        />
      </Head>
      {colors ? (
        <Colors initialColors={colors} shared />
      ) : (
        loadingTimedOut && (
          <div className="flex flex-col justify-center text-center h-screen animate-slideUp">
            <h1>This is awkward.</h1>
            <p>Loading your colors took longer than expected, something may have gone wrong.</p>
            <div>
              <Link href="/colors">
                <a className="link-animated-hover mt-4">Click me to go back to the default colors page</a>
              </Link>
            </div>
          </div>
        )
      )}
    </>
  );
}

function tryImportColors(query: string): string[] | undefined {
  if (!query) return;
  const splitQuery = query.split('-');
  if (!splitQuery.length) return;
  return splitQuery.filter((c) => c.match(/^([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/)).map((c) => `#${c}`);
}
