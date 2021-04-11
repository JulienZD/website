import { useState, useEffect } from 'react';
import Colors from './index';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function slug(): JSX.Element {
  const [colors, setColors] = useState<string[] | null>(null);
  const router = useRouter();
  useEffect(() => {
    if (!router.isReady) return;
    const importedColors = tryImportColors(router.query.slug as string);
    if (!importedColors) return;
    setColors(importedColors);
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
      {colors && <Colors initialColors={colors} shared />}
    </>
  );
}

function tryImportColors(query: string): string[] | undefined {
  if (!query) return;
  const splitQuery = query.split('-');
  if (!splitQuery.length) return;
  return splitQuery.filter((c) => c.match(/^([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/)).map((c) => `#${c}`);
}
