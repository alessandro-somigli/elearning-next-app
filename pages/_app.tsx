import { ClerkProvider } from "@clerk/nextjs";
import type { AppProps } from "next/app";

import { useRouter } from 'next/router';

import "@/styles/globals.scss";

import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import Spinner from "@/components/spinner";
const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  const [visible, setVisible] = useState(false)
  const router = useRouter();

  // client side code
  useEffect(() => {
    const handleRouteChange = () => setVisible(true)
    const handleRouteComplete = () => setVisible(false)
    router.events.on('routeChangeStart', handleRouteChange)
    router.events.on('routeChangeComplete', handleRouteComplete)
    
    return () => router.events.off('routeChangeStart', handleRouteChange)
  }, [])

  return (
    <ClerkProvider
      appearance={{
        variables: {
          fontFamily: inter.style.fontFamily,
          fontWeight: { normal: inter.style.fontWeight },
          fontSize: "1rem",
      }, } }
      {...pageProps}
    >
      <main className={inter.className}>
        <Spinner visible={visible}/>
        <Component {...pageProps} />
      </main>
    </ClerkProvider>
  );
}
