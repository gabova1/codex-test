import '@/styles/globals.css';
import { useEffect } from 'react';
import Head from 'next/head';

export default function App({ Component, pageProps }) {
  useEffect(() => {
    const observer = new MutationObserver(() => {
      document.documentElement.setAttribute('data-theme', 'dark');
    });
    observer.observe(document.documentElement, { attributes: true });
    document.documentElement.setAttribute('data-theme', 'dark');
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Head>
        <title>Telemetry Terminal Clone</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
