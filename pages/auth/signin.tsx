import { SignIn } from "@clerk/nextjs";
import { useRouter } from "next/router";

import style from "@/styles/pages/signin.module.scss";
import Navbar from "@/components/navbar";
import Head from "next/head";

export const config = {
  runtime: "experimental-edge",
  regions: ["fra1"],
};

export default function SignInPage() {
  const router = useRouter();
  const { redirect_url } = router.query;

  return (
    <>
      <Head>
        <title>Learnify - SignIn</title>
        <meta name="description" content="signin page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Navbar showAccount={false} />

        <div className={style.signin}>
          <SignIn redirectUrl={redirect_url?.toString()} />
        </div>
      </main>
    </>
  );
}
