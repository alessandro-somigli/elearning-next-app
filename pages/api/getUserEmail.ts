import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

import { clerkClient, getAuth } from "@clerk/nextjs/server";

export const config = {
  runtime: "edge",
  regions: ["fra1"],
};

export type GetUserEmailResponse = string | null

export const getUserEmail = async (params: { userid: string | null }): Promise<GetUserEmailResponse> => {
  if (params.userid) {
    const user = await clerkClient.users.getUser(params.userid);
    return user.emailAddresses[0].emailAddress;
  } else {
    return null
  }
}

export default async function GET (
  request: NextRequest,
  context: NextFetchEvent
) {
  const { userId } = getAuth(request);

  return NextResponse.json(
    await getUserEmail({ userid: userId }),
    {
      status: 200,
      headers: {
        'Cache-Control': 's-maxage=60, stale-while-revalidate=600'
      }
    }
  )
}