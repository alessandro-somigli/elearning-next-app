import { clerkClient, getAuth } from "@clerk/nextjs/server";
import { connect } from "@planetscale/database";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

const planetscale = connect({
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
});

export const config = {
  runtime: "edge",
  regions: ["fra1"],
};

export type GetUserRoleResponse = "student" | "professor"

export const GetUserRole = async (params: { useremail: string | null }): Promise<GetUserRoleResponse> => {
  const DBresponse = await planetscale.execute(`
  SELECT * FROM Professors
  WHERE Professors.email = '${params.useremail}';
  `);

  return (DBresponse.rows.length == 0)? "student" : "professor"
}

export default async function GET(
  request: NextRequest,
  context: NextFetchEvent
) {
  const { userId } = getAuth(request);
  const user = userId ? await clerkClient.users.getUser(userId) : null;
  const emailAddress = user?.emailAddresses[0].emailAddress as string | null;

  return NextResponse.json( await GetUserRole({ useremail: emailAddress }) );
}