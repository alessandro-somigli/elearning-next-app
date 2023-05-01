import { withClerkMiddleware, getAuth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AssertedGetUserEmailResponse, getUserEmail } from "./pages/api/getUserEmail";

// Set the paths that don't require the user to be signed in
const publicPaths = ["/auth/signin*", "/"];
const jailPaths = ["/jail"];

const matches = (path: string, resitrictions: Array<string>): string | undefined => {
  return resitrictions.find((p) => path.match(new RegExp(`^${p}$`.replace("*$", "($|/)"))) );
};

const redirectTo = (request: NextRequest, params: { 
  to: string,
  searchParams?: Map<string, string>
} ) => {
  const redirectURL = new URL(params.to, request.url);
  params.searchParams?.forEach((value: string, key: string) => 
    { redirectURL.searchParams.set(key, value); })
  return NextResponse.redirect(redirectURL); 
}

export default withClerkMiddleware(async (request: NextRequest) => {
  if (matches(request.nextUrl.pathname, jailPaths)) return NextResponse.next();

  const userId = getAuth(request).userId;
  if (userId) {
    const email = await getUserEmail({ userid: userId }) as AssertedGetUserEmailResponse;
    if (email.split("@")[1] !== "itismeucci.com") return redirectTo(request, { to: "/jail" })
  }

  if (matches(request.nextUrl.pathname, publicPaths)) return NextResponse.next();
  
  if (!userId) { 
    return redirectTo(request, {
      to: "/auth/signin",
      searchParams: new Map<string, string>().set("redirect_url", request.url)
    });
  }
  
  return NextResponse.next();
});

// Stop Middleware running on static files and public folder
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next
     * - static (static files)
     * - favicon.ico (favicon file)
     * - public folder
     * - public folder
     */
    "/((?!static|.*\\..*|_next|favicon.ico).*)",
    "/",
  ],
};
