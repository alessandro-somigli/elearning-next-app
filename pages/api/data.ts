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

export default async function GET(
  request: NextRequest,
  context: NextFetchEvent
) {
  const DBresponse = await planetscale.execute("SELECT * FROM Example;");

  return NextResponse.json(DBresponse.rows);
}
