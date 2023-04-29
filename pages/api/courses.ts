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

export const GET_Courses = async (params: { useremail: string | null }) => {
  let fetch_courses = "";
  if (params.useremail) { // row reads: Courses.rows + Partake.rows + Own.rows
    fetch_courses = `
    SELECT DISTINCT Courses.* FROM Courses
    LEFT JOIN Partake ON Courses.ID = Partake.course
    LEFT JOIN Own ON Courses.ID = Own.course
    WHERE Partake.student = '${params.useremail}' OR Own.professor = '${params.useremail}';`;
  } else { // row reads: Courses.rows
    fetch_courses = `SELECT * FROM Courses;`;
  }

  return await planetscale.execute(fetch_courses);
};

export default async function GET (
  request: NextRequest,
  context: NextFetchEvent
) {
  const { searchParams } = new URL(request.url);
  const useremail = searchParams.get("useremail");

  const DBresponse = await GET_Courses({ useremail });
  return NextResponse.json(DBresponse);
}
