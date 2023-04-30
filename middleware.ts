import { withClerkMiddleware, getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Set the paths that don't require the user to be signed in
const publicPaths = ["/auth/signin*", "/"];

const matches = (path: string, resitrictions: Array<string>): string | undefined => {
  return resitrictions.find((p) => path.match(new RegExp(`^${p}$`.replace("*$", "($|/)"))) );
};

export default withClerkMiddleware((request: NextRequest) => {
  if (matches(request.nextUrl.pathname, publicPaths)) return NextResponse.next();

  // if the user is not signed in redirect them to the sign in page.
  if (!getAuth(request).userId) {
    const redirectURL = new URL("/auth/signin", request.url);
    redirectURL.searchParams.set("redirect_url", request.url);
    return NextResponse.redirect(redirectURL);
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
