import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Layout from '@components/layout';
import ColorPreviewer from '@components/colors/ColorPreviewer';

const pageTitle = 'Preview Color Combinations';

export default function Colors() {
  const [colors, setColors] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return null;
    const { share: query } = router.query;
    if (query) {
      let decoded;
      try {
        decoded = atob(query);
      } catch (err) {
        return;
      }
      setColors(tryImportColors(decodeURIComponent(decoded)));
    }
  }, [router.isReady]);

  return (
    <Layout>
      <Head>
        <title>{pageTitle}</title>
        <meta name="og:title" value={pageTitle} key="og:title" />
        <meta
          name="og:description"
          value="View all possible color combinations in a simple overview."
          key="og:description"
        />
      </Head>
      <div className="text-center">
        <h1>{pageTitle}</h1>
        <p>
          View all possible combinations for any{' '}
          <a className="j-link" href="https://en.wikipedia.org/wiki/Web_colors#Hex_triplet">
            hex color values
          </a>{' '}
          you enter.
        </p>
        <p>The preview will automatically update as long as you enter more than two unique colors.</p>
      </div>
      {!colors && <ColorPreviewer initialColors={['#000', '#fff']} />}
      {colors && <ColorPreviewer initialColors={colors} />}
    </Layout>
  );
}

function tryImportColors(colors) {
  if (!colors) return;
  const splitColors = colors.split(',');
  if (!splitColors.length) return;
  return splitColors.filter((c) => c.match(/^([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/)).map((c) => `#${c}`);
}
