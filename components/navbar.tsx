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
        <Image
          src="/logo.svg"
          alt="logo"
          width={64}
          height={64}
          className={style.logo_image}
        />
        <span className={style.logo_text}>Learnify</span>
      </div>

      { showAccount? <Account /> : null }
    </nav>
  );
}
