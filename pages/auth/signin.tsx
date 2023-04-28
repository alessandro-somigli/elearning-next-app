import { SignIn } from "@clerk/nextjs";

export const config = { 
  runtime: 'experimental-edge',
  regions: ['fra1']
}

const SignInPage = () => (
  <SignIn />
);

export default SignInPage;