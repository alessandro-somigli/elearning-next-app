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
  const { searchParams } = new URL(request.url)
  const useremail = searchParams.get('useremail')

  let fetch_courses = "";
  if (useremail) { // row reads: Courses.rows + Partake.rows + Own.rows
    fetch_courses = `
    SELECT DISTINCT Courses.* FROM Courses
    INNER JOIN Partake ON Courses.ID = Partake.course
    INNER JOIN Own ON Courses.ID = Own.course
    WHERE Partake.student = '${useremail}' OR Own.professor = '${useremail}';`
  } else { // row reads: Courses.rows
    fetch_courses = `SELECT * FROM Courses;` 
  }
  
  const DBresponse = await planetscale.execute(fetch_courses)
  return NextResponse.json(DBresponse.rows);
}
