import { SignIn } from "@clerk/nextjs";

export const config = { runtime: 'experimental-edge' }

const SignInPage = () => (
  <SignIn />
);

export default SignInPage;