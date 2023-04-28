import { SignIn } from "@clerk/nextjs";

export const config = { 
  runtime: 'experimental-edge',
  regions: ['fra1']
}

export default function SignInPage() { 
  
  return (
    <SignIn />
  )
}
