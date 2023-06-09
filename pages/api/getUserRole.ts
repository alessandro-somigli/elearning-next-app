import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

import { connect } from "@planetscale/database";
import { getAuth } from "@clerk/nextjs/dist/server/getAuth";

import { getUserEmail, GetUserEmailResponse } from "./getUserEmail";

const planetscale = connect({
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
});

export const config = {
  runtime: "edge",
  regions: ["fra1"],
};

export type GetUserRoleResponse = "student" | "teacher";

export const GetUserRole = async (params: {
  useremail: string | null;
}): Promise<GetUserRoleResponse> => {
  const DBresponse = await planetscale.execute(`
  SELECT * FROM Teachers
  WHERE Teachers.teacher_email = '${params.useremail}';
  `);

  return DBresponse.rows.length == 0 ? "student" : "teacher";
};

export default async function GET(
  request: NextRequest,
  context: NextFetchEvent
) {
  const { userId } = getAuth(request);
  const useremail = (await getUserEmail({ userid: userId })) as GetUserEmailResponse;

  return NextResponse.json(await GetUserRole({ useremail: useremail }), {
    status: 200,
    headers: {
      "Cache-Control": "s-maxage=60, stale-while-revalidate=600",
    },
  });
}
