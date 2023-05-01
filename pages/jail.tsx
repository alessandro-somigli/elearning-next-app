import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import Head from "next/head";

import Navbar from "@/components/navbar";
import { SignOutButton, } from "@clerk/nextjs";

import { getAuth, } from "@clerk/nextjs/server";

import style from "@/styles/pages/jail.module.scss";
import Spinner from '@/components/spinner';
import { useState } from 'react';

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
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Head>
        <title>Learnify - Jail</title>
        <meta name="description" content="jail for all unwanted accounts" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Spinner visible={visible} />
        <Navbar showAccount={false} />

        <div className={style.alert_container}>
          <div className={style.alert}>
            <h2>Sei in prigione!🔒</h2>
            <h3>L’account con cui ti sei registrato non fa parte del dominio della scuola.</h3>
            <h3>Torna alla 🏠 facendo un sign out.</h3>
          </div>

          <SignOutButton><button className={style.signout_button} onClick={() => setVisible(true)}>sign out</button></SignOutButton>
        </div>
      </main>
    </>
  );
}
