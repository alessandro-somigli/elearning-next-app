import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

import { connect } from "@planetscale/database";

import { Course, Own, Partake, Test } from "@/types/schema";

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
} | null

export const GetCourseData = async (params: { courseid: string }): Promise<GetCourseDataResponse> => {
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

  const professorsResponse = (await professors).rows as Array<Own & Course>
  const studentsResponse = (await students).rows as Array<Partake>
  const testsResponse = (await tests).rows as Array<Test>
  
  if (professorsResponse.length == 0) return null

  return {
    course: professorsResponse[0].name,
    professors: professorsResponse as Array<Own>,
    students: studentsResponse,
    tests: testsResponse
  } as GetCourseDataResponse
}

export default async function GET (
  request: NextRequest,
  context: NextFetchEvent
) {
  const { searchParams } = new URL(request.url);
  const courseid = searchParams.get("courseid");

  return NextResponse.json(
    (courseid)? await GetCourseData({ courseid }) : null,
    {
      status: 200,
      headers: {
        'Cache-Control': 's-maxage=60, stale-while-revalidate=600'
      }
    });
}
