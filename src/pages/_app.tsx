import type { AppProps } from 'next/app';
import Head from 'next/head';
import { GlobalStyle } from './GlobalStyle';
import { ProjectsProvider } from '@/lib/context/projectsContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>B cont</title>
        <meta name='description' content='B Cont Web Application' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <GlobalStyle dir='rtl' />
      <ProjectsProvider>
        <ToastContainer position='top-center' />
        <Component {...pageProps} />
      </ProjectsProvider>
    </>
  );
}
