import { ClerkProvider } from "@clerk/nextjs";
import type { AppProps } from "next/app";

import "@/styles/globals.scss";

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
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
        <Component {...pageProps} />
      </main>
    </ClerkProvider>
  );
}
