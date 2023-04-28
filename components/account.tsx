import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";

import style from "@/styles/components/account.module.scss"

export default function Account() {
  const { user, isSignedIn, isLoaded } = useUser();

  return (
    <div className={style.account}>
      {!isLoaded ? (
        <>spinner</>
      ) : !isSignedIn ? (
        <Link href={"/auth/signin"}>sign in</Link>
      ) : (
        <>
          <span>{user.fullName}</span>
          <Image src={user.profileImageUrl} alt="user-image" width={48} height={48} />
        </>
      )}
    </div>
  );
}
