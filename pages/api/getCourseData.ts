import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

import { connect } from "@planetscale/database";

import { Course, TeacherOwnsCourse, StudentPartakesCourse, Test } from "@/types/schema";

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
  course: string;
  teachers: Array<TeacherOwnsCourse>;
  students: Array<StudentPartakesCourse>;
  tests: Array<Test>;
} | null;

export type AssertedGetCourseDataResponse = Exclude<GetCourseDataResponse, null>;

export const GetCourseData = async (params: {
  courseid: string;
}): Promise<GetCourseDataResponse> => {
  const teachers = planetscale.execute(`
  SELECT TeachersOwnCourses.*, Courses.* FROM Courses 
  INNER JOIN TeachersOwnCourses ON Courses.course_ID = TeachersOwnCourses.owns_course
  WHERE Courses.course_ID = ${params.courseid};
  `);

  const students = planetscale.execute(`
  SELECT StudentsPartakeCourses.* FROM Courses 
  INNER JOIN StudentsPartakeCourses ON Courses.course_ID = StudentsPartakeCourses.partakes_course
  WHERE Courses.course_ID = ${params.courseid};
  `);

  const tests = planetscale.execute(`
  SELECT Tests.* FROM Courses 
  INNER JOIN Tests ON Courses.course_ID = Tests.test_course
  WHERE Courses.course_ID = ${params.courseid};
  `);

  const teachersResponse = (await teachers).rows as Array<TeacherOwnsCourse & Course>;
  const studentsResponse = (await students).rows as Array<StudentPartakesCourse>;
  const testsResponse = (await tests).rows as Array<Test>;

  if (teachersResponse.length == 0) return null;

  return {
    course: teachersResponse[0].course_name,
    teachers: teachersResponse as Array<TeacherOwnsCourse>,
    students: studentsResponse,
    tests: testsResponse,
  } as GetCourseDataResponse;
};

export default async function GET(
  request: NextRequest,
  context: NextFetchEvent
) {
  const { searchParams } = new URL(request.url);
  const courseid = searchParams.get("courseid");

  return NextResponse.json(
    courseid ? await GetCourseData({ courseid }) : null,
    {
      status: 200,
      headers: {
        "Cache-Control": "s-maxage=60, stale-while-revalidate=600",
      },
    }
  );
}
