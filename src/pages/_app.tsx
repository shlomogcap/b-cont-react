import type { AppProps } from 'next/app';
import Head from 'next/head';
import GlobalStyle from './GlobalStyle';
import { ProjectsProvider } from '@/lib/context/projectsContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { VendorsProvider } from '@/lib/context/vendorsContext';
import { UsersProvider } from '@/lib/context/usersContext';
import { ModalProvider } from '@/lib/context/ModalProvider';
import { LoginModal } from '@/lib/components/LoginModal';
import { useAuth } from '@/lib/hooks/useAuth';
import { UserProvider } from '@/lib/context/userContext';

export default function App({ Component, pageProps }: AppProps) {
  const { user, loading, error } = useAuth();
  return (
    <>
      <Head>
        <title>B cont</title>
        <meta name='description' content='B Cont Web Application' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <GlobalStyle dir='rtl' />
      <UserProvider value={{ data: user, isLoading: loading, error }}>
        <UsersProvider>
          <ProjectsProvider>
            <VendorsProvider>
              <ModalProvider>
                <ToastContainer position='top-center' closeOnClick={false} />
                {loading ? 'Loading...' : <Component {...pageProps} />}
                {!user && !loading && <LoginModal {...({} as any)} />}
              </ModalProvider>
            </VendorsProvider>
          </ProjectsProvider>
        </UsersProvider>
      </UserProvider>
    </>
  );
}
