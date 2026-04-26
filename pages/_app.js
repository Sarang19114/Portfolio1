import '../src/index.css';
import Head from 'next/head';

const SITE_URL = 'https://sarangrastogi.vercel.app';
const OG_IMAGE = `${SITE_URL}/assets/og.png`;
const DEFAULT_TITLE = 'Sarang Rastogi | Full Stack Developer';
const DEFAULT_DESCRIPTION =
  'Sarang Rastogi is a full-stack developer specializing in React, Next.js, AI systems, and scalable backend architecture.';
const DEFAULT_KEYWORDS =
  'Sarang Rastogi, Full Stack Developer, React Developer, Next.js Developer, AI Engineer, MongoDB, Express, Portfolio';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title key="title">{DEFAULT_TITLE}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" key="viewport" />
        <meta name="description" content={DEFAULT_DESCRIPTION} key="description" />
        <meta name="keywords" content={DEFAULT_KEYWORDS} key="keywords" />
        <meta name="author" content="Sarang Rastogi" key="author" />
        <meta name="creator" content="Sarang Rastogi" key="creator" />
        <meta name="robots" content="index,follow" key="robots" />

        <meta property="og:title" content={DEFAULT_TITLE} key="og:title" />
        <meta property="og:description" content={DEFAULT_DESCRIPTION} key="og:description" />
        <meta property="og:url" content={SITE_URL} key="og:url" />
        <meta property="og:site_name" content="Sarang Rastogi Portfolio" key="og:site_name" />
        <meta property="og:type" content="website" key="og:type" />
        <meta property="og:locale" content="en_US" key="og:locale" />
        <meta property="og:image" content={OG_IMAGE} key="og:image" />
        <meta property="og:image:secure_url" content={OG_IMAGE} key="og:image:secure_url" />
        <meta property="og:image:type" content="image/png" key="og:image:type" />
        <meta property="og:image:width" content="1200" key="og:image:width" />
        <meta property="og:image:height" content="630" key="og:image:height" />
        <meta property="og:image:alt" content="Sarang Rastogi portfolio preview" key="og:image:alt" />

        <meta name="twitter:card" content="summary_large_image" key="twitter:card" />
        <meta name="twitter:title" content="Sarang Rastogi | Full Stack Developer" key="twitter:title" />
        <meta name="twitter:description" content={DEFAULT_DESCRIPTION} key="twitter:description" />
        <meta name="twitter:image" content={OG_IMAGE} key="twitter:image" />
        <meta name="twitter:image:alt" content="Sarang Rastogi portfolio preview" key="twitter:image:alt" />

        <link rel="canonical" href={SITE_URL} key="canonical" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
