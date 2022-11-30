import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthContextProvider } from '../context/AuthContext'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Menu Almatierra - Admin</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <AuthContextProvider>
        <Component {...pageProps} />
      </AuthContextProvider>
    </>
  )
}
