'use client';

import Head from 'next/head';
import './globals.css';
import { AuthProvider } from '@/context/auth';

function MyApp() {
  return (
    <AuthProvider>
      <Head>
        <link rel='shortcut icon' href='/favicon.png' />
      </Head>
      {/* <Layout>
        <Component {...pageProps} />
      </Layout> */}
      <div></div>
    </AuthProvider>
  );
}

export default MyApp;
