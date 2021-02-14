import { useState } from 'react';
import Head from 'next/head';
import Layout from '@components/layout';
import ColorDeck from '@components/colors/ColorDeck';
import ColorForm from '@components/colors/ColorForm';

const pageTitle = 'Preview Color Combinations';

export default function Colors() {
  const [state, setState] = useState({ colors: new Set(['#000', '#fff']), doShuffle: false });

  const displayColors = ({ colorSet, doShuffle }) => setState({ colors: colorSet, doShuffle: doShuffle });
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
      <div className="container">
        <div className="row">
          <ColorForm onChangeCallback={displayColors} defaultColors={Array.from(state.colors)} />
        </div>
        <ColorDeck doShuffle={state.doShuffle} colors={state.colors}></ColorDeck>
      </div>
    </Layout>
  );
}
