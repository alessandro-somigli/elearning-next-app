import { connect } from "@planetscale/database";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { Course, Own, Partake, Professor, Student, Test } from "@/types/schema";

const planetscale = connect({
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
});

export const config = {
  runtime: "edge",
  regions: ["fra1"],
};

export type GetCourseDataResponse = {
  course: string
  professors: Array<Own>
  students: Array<Partake>
  tests: Array<Test>
}

export const GetCourseData = async (params: { courseid: string }) => {
  const professors = planetscale.execute(`
  SELECT Own.*, Courses.* FROM Courses 
  INNER JOIN Own ON Courses.ID = Own.course
  WHERE Courses.ID = ${params.courseid};
  `);

  const students = planetscale.execute(`
  SELECT Partake.* FROM Courses 
  INNER JOIN Partake ON Courses.ID = Partake.course
  WHERE Courses.ID = ${params.courseid};
  `);
  
  const tests = planetscale.execute(`
  SELECT Tests.* FROM Courses 
  INNER JOIN Tests ON Courses.ID = Tests.course
  WHERE Courses.ID = ${params.courseid};
  `);

  const course = (await professors).rows[0] as Course
  
  return {
    course: course.name,
    professors: (await professors).rows as Array<Own>,
    students: (await students).rows as Array<Partake>,
    tests: (await tests).rows as Array<Test>
  } as GetCourseDataResponse
}

export default async function GET (
  request: NextRequest,
  context: NextFetchEvent
) {

  const { searchParams } = new URL(request.url);
  const courseid = searchParams.get("courseid");

  const DBresponse = (courseid)? await GetCourseData({ courseid }) : null;
  return NextResponse.json(
    DBresponse,
    {
      status: 200,
      headers: {
        'Cache-Control': 's-maxage=1, stale-while-revalidate'
      }
    });
}
