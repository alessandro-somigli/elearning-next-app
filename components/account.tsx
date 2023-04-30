import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

import style from "@/styles/components/account.module.scss";

export default function Account() {
  return (
    <div className={style.account}>
      <SignedIn>
        <UserButton
          showName={true}
          appearance={{
            elements: {
              userButtonOuterIdentifier: style.userButtonOuterIdentifier,
              userButtonAvatarBox: style.userButtonAvatarBox,
            },
            variables: { fontSize: "1.25rem" },
          }}
        />
      </SignedIn>
      <SignedOut>
        <SignInButton>
          <button className={style.signin_button}>Login</button>
        </SignInButton>
      </SignedOut>
    </div>
  );
}
