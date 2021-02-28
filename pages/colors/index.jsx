import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Layout from '@components/layout';
import ColorPreviewer from '@components/colors/ColorPreviewer';

const pageTitle = 'Preview Color Combinations';

export default function Colors({ initialColors = ['#000', '#fff'] }) {
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
      <div className="container mx-auto max-w-6xl">
        <div className="text-center">
          <h1>{pageTitle}</h1>
          <div className="text-left sm:w-7/12 sm:mx-auto">
            <p className="mt-2 mb-2">
              View all possible combinations for any{' '}
              <a className="link-animated-hover" href="https://en.wikipedia.org/wiki/Web_colors#Hex_triplet">
                hex color values
              </a>{' '}
              you enter.
            </p>
            <p className="mb-2">
              The preview will automatically update as long as you enter more than two unique colors.
            </p>
            <p>For performance reasons, the amount of colors you can enter has been limited to ten.</p>
          </div>
        </div>
        <ColorPreviewer initialColors={initialColors} />
      </div>
    </Layout>
  );
}
