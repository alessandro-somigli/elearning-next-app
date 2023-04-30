import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

import { connect } from "@planetscale/database";
import { getAuth } from "@clerk/nextjs/dist/server/getAuth";

import { getUserEmail, GetUserEmailResponse } from "./getUserEmail";
import { Course } from "@/types/schema";

const planetscale = connect({
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
});

export const config = {
  runtime: "edge",
  regions: ["fra1"],
};

export type GetCoursesResponse = Array<Course>;

export const GetCourses = async (params: {
  useremail: string | null;
}): Promise<GetCoursesResponse> => {
  let fetch_courses = "";
  if (params.useremail) {
    fetch_courses = `
    SELECT DISTINCT Courses.* FROM Courses
    LEFT JOIN StudentsPartakeCourses ON Courses.course_ID = StudentsPartakeCourses.partakes_course
    LEFT JOIN TeachersOwnCourses ON Courses.course_ID = TeachersOwnCourses.owns_course
    WHERE StudentsPartakeCourses.partakes_student = '${params.useremail}' OR TeachersOwnCourses.owns_teacher = '${params.useremail}';`;
  } else {
    fetch_courses = `SELECT * FROM Courses;`;
  }

  const DBResponse = await planetscale.execute(fetch_courses);
  return DBResponse.rows as GetCoursesResponse;
};

export default async function GET(
  request: NextRequest,
  context: NextFetchEvent
) {
  const { userId } = getAuth(request);
  const useremail = (await getUserEmail({ userid: userId })) as GetUserEmailResponse;

  return NextResponse.json(await GetCourses({ useremail }), {
    status: 200,
    headers: {
      "Cache-Control": "s-maxage=60, stale-while-revalidate=600",
    },
  });
}
