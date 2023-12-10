import Headers from '@/components/Headers'
import '@/styles/globals.css'
import { AnimatePresence } from 'framer-motion'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
      <SessionProvider session={session}>
        <AnimatePresence mode="wait" initial={false}>
          <Headers />
          <Component {...pageProps} />
        </AnimatePresence>
      </SessionProvider>
    </>
  )
}
