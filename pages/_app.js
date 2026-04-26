import '../src/index.css';
import Head from 'next/head';

const SITE_URL = 'https://sarangrastogi.vercel.app';
const OG_IMAGE = `${SITE_URL}/assets/Sarang1.png`;
const DEFAULT_TITLE = 'Sarang Rastogi | Full Stack Developer';
const DEFAULT_DESCRIPTION =
  'Sarang Rastogi is a full-stack developer specializing in React, Next.js, AI systems, and scalable backend architecture.';
const DEFAULT_KEYWORDS =
  'Sarang Rastogi, Full Stack Developer, React Developer, Next.js Developer, AI Engineer, MongoDB, Express, Portfolio';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>{DEFAULT_TITLE}</title>
        <meta name="description" content={DEFAULT_DESCRIPTION} />
        <meta name="keywords" content={DEFAULT_KEYWORDS} />
        <meta name="author" content="Sarang Rastogi" />
        <meta name="creator" content="Sarang Rastogi" />
        <meta name="robots" content="index,follow" />

        <meta property="og:title" content={DEFAULT_TITLE} />
        <meta property="og:description" content={DEFAULT_DESCRIPTION} />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:site_name" content="Sarang Rastogi Portfolio" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Sarang Rastogi" />
        <meta name="twitter:description" content="Full Stack Developer Portfolio" />
        <meta name="twitter:image" content={OG_IMAGE} />

        <link rel="canonical" href={SITE_URL} />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
