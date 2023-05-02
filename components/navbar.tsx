import Link from "next/link";
import Image from "next/image";

import Account from "./account";

import style from "@/styles/components/navbar.module.scss";

type NavbarProps = {
  showAccount?: boolean
}

export default function Navbar({ showAccount = true }: NavbarProps ) {
  return (
    <nav className={style.nav}>
      <div className={style.nav_logo}>
        <Link href={"/"}>
          <Image
            src="/logo.svg"
            alt="logo"
            width={0}
            height={0}
            className={style.logo_image}
          />
        </Link>
        <span className={style.logo_text}>Learnify</span>
      </div>

      { showAccount? <Account /> : null }
    </nav>
  );
}
