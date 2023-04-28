import { useUser } from "@clerk/nextjs"
import Image from "next/image"

import Account from "./account"

import style from "@/styles/components/navbar.module.scss"

export default function Navbar() {
  const user_data = useUser()

  return (
    <nav className={style.nav}>
      <div className={style.nav_logo}>
        <Image src="/logo.png" alt="logo" width={64} height={64} className={style.logo_image} />
        <span className={style.logo_text}>Learnify</span>
      </div>

      <Account />
    </nav>
  )
}
