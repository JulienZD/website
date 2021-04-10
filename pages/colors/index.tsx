import Head from 'next/head';
import Layout from '@components/layout';
import ColorPreviewer from '@components/colors/ColorPreviewer';

interface Props {
  shared: boolean;
  initialColors: string[];
}

export default function Colors({ shared, initialColors = ['#000', '#fff'] }: Props) {
  const title = 'Preview Color Combinations';
  return (
    <Layout title={title}>
      <Head>
        {!shared && (
          <meta
            property="og:description"
            content="View all combinations of your favorite colors in a simple overview."
            key="og:description"
          />
        )}
      </Head>
      <div className="container mx-auto max-w-6xl">
        <div className="text-center">
          <h1>{title}</h1>
          <div className="text-left sm:w-7/12 sm:mx-auto">
            <p className="mt-2 mb-2">
              View all combinations for any{' '}
              <a className="link-animated-hover" href="https://en.wikipedia.org/wiki/Web_colors#Hex_triplet">
                hex color values
              </a>{' '}
              you enter.
            </p>
            <p className="mb-2">
              The preview will automatically update as long as you enter more than two unique colors.
            </p>
            <p>
              The preview filters out combinations with a contrast ratio that doesn't meet the{' '}
              <a
                className="link-animated-hover"
                href="https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"
              >
                <abbr title="Web Content Accessibility Guidelines">WCAG</abbr>
              </a>{' '}
              standards.
            </p>
          </div>
        </div>
        <ColorPreviewer initialColors={initialColors} />
      </div>
    </Layout>
  );
}
