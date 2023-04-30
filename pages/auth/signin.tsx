import { SignIn } from "@clerk/nextjs";
import { useRouter } from "next/router";

export const config = { 
  runtime: 'experimental-edge',
  regions: ['fra1']
}

export default function SignInPage() { 
  const router = useRouter()
  const { redirect_url } = router.query

  return (
    <SignIn redirectUrl={redirect_url?.toString()} />
  )
}
