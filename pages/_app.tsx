import '@/styles/globals.scss'
import { ClerkProvider } from '@clerk/nextjs'
import type { AppProps } from 'next/app'

import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider {...pageProps}>
      <main className={inter.className}>
      <Component {...pageProps} />
      </main>
    </ClerkProvider>)
}
