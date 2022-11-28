import Head from 'next/head';

import {
  QueryClient,
  QueryClientProvider,
  Hydrate,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import NextNProgress from 'nextjs-progressbar';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../globals.scss';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Component {...pageProps} />
          <ReactQueryDevtools initialIsOpen={false} />
        </Hydrate>
      </QueryClientProvider>

      <NextNProgress
        color="#0dcaf0"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        showOnShallow={true}
      />
    </>
  );
}

export default MyApp;
