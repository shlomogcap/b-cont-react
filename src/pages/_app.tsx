import type { AppProps } from 'next/app';
import Head from 'next/head';
import GlobalStyle from './GlobalStyle';
import { ProjectsProvider } from '@/lib/context/projectsContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { VendorsProvider } from '@/lib/context/vendorsContext';
import { UsersProvider } from '@/lib/context/usersContext';
import { ModalProvider } from '@/lib/context/ModalProvider';

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
      <ModalProvider>
        <UsersProvider>
          <ProjectsProvider>
            <VendorsProvider>
              <ToastContainer position='top-center' closeOnClick={false} />
              <Component {...pageProps} />
            </VendorsProvider>
          </ProjectsProvider>
        </UsersProvider>
      </ModalProvider>
    </>
  );
}
