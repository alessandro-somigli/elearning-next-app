import { SignInButton, SignOutButton, SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";

import style from "@/styles/components/account.module.scss"
import { useState } from "react";

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ['latin'] })

export default function Account() {
  const { user } = useUser();

  const onClickSignOut = () => { SignOutButton}

  return (
    <div className={style.account}>
      <SignedIn>
        <UserButton showName={true} appearance={{ 
          elements: {
            userButtonOuterIdentifier: style.userButtonOuterIdentifier,
            userButtonAvatarBox: style.userButtonAvatarBox,
          },
          variables: { fontSize: "1.25rem" }
        }} />
      </SignedIn>
      <SignedOut>
        <SignInButton><button className={style.signin_button}>Login</button></SignInButton>
      </SignedOut>
      
    </div>
  );
}
