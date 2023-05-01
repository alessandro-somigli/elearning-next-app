import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import Head from "next/head";

import Navbar from "@/components/navbar";
import { SignOutButton, SignedIn, SignedOut } from "@clerk/nextjs";

import { getAuth, buildClerkProps } from "@clerk/nextjs/server";

export const config = {
  runtime: "experimental-edge",
  regions: ["fra1"],
};

export const getServerSideProps: GetServerSideProps<{}> = async (context: GetServerSidePropsContext) => {
  const { userId } = getAuth(context.req);

  if (!userId) { 
    return { 
      redirect: {
        destination: "/",
        permanent: true,
      }, props: {} 
    };
  }

  return { props: {} }
}

export default function Jail(props: InferGetServerSidePropsType<typeof getServerSideProps>) {

  return (
    <>
      <Head>
        <title>Learnify - Jail</title>
        <meta name="description" content="jail for all unwanted accounts" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Navbar />

        <span>You&apos;re in jail!</span>
        <span>Use the school account if you want to exit the jail.</span>
        <SignOutButton />
      </main>
    </>
  );
}
