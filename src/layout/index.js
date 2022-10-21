import Head from 'next/head';
import { Navbar } from '../components';

export function Layout({ children, session }) {
  const title = `Sexta é Nóis | ${session}`;
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="" />
        <meta name="theme-color" content="#FFFFFF" />
        <meta name="msapplication-TileColor" content="#212529" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="application-name" content="" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="" />
        {/* Twitter */}
        <meta name="twitter:card" content="summary" key="twcard" />
        <meta name="twitter:url" content="" />
        <meta name="twitter:title" content="PWA App" />
        <meta name="twitter:description" content="" />
        <meta name="twitter:image" content="/vercel.svg" />
        <meta name="twitter:creator" content="" />
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={session} key="ogtitle" />
        <meta property="og:description" content="" key="ogdesc" />
        <meta property="og:site_name" content="" />
        <meta property="og:url" content="" key="ogurl" />
        <meta property="og:image" content="/vercel.svg" key="ogimage" />
        <link rel="shortcut icon" href="/vercel.svg" />
        <link rel="apple-touch-icon" href="/vercel.svg" />
        <link rel="mask-icon" href="/vercel.svg" color="#212529" />
        <link rel="apple-touch-icon" href="/vercel.svg" />
        <link rel="apple-touch-icon" sizes="152x152" href="/vercel.svg" />=
      </Head>

      <Navbar />
      <main>{children}</main>
    </>
  );
}
