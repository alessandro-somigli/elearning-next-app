import Head from "next/head";
import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType, } from "next";

import { getAuth } from "@clerk/nextjs/dist/server/getAuth";

import { AssertedGetCourseDataResponse, GetCourseData, GetCourseDataResponse, } from "@/pages/api/getCourseData";
import { getUserEmail, GetUserEmailResponse } from "@/pages/api/getUserEmail";
import { GetUserRole, GetUserRoleResponse } from "@/pages/api/getUserRole";

import type { Course } from "@/types/schema";

import Navbar from "@/components/navbar";
import Error from "@/components/error";
import TeacherCourse from "@/components/course/teacherCourse";
import StudentCourse from "@/components/course/studentCourse";

import style from "@/styles/pages/course.module.scss";

export const config = {
  runtime: "experimental-edge",
  regions: ["fra1"],
};

export const getServerSideProps: GetServerSideProps<{
  data: GetCourseDataResponse;
  error: "NO_COURSE_ID" | "NO_COURSE_FOUND" | "USER_NOT_AUTHORIZED" | null;
  role: "teacher" | "student" | null;
}> = async (context: GetServerSidePropsContext) => {
  const { id } = context.query;
  if (!id) return {
    props: {
      data: null,
      error: "NO_COURSE_ID",
      role: null,
  }, };

  const courseData = await GetCourseData({ courseid: id.toString() });
  if (!courseData) return {
    props: {
      data: null,
      error: "NO_COURSE_FOUND",
      role: null,
  }, };

  const { userId } = getAuth(context.req);
  const userEmail = (await getUserEmail({ userid: userId, })) as GetUserEmailResponse;
  const userRole = (await GetUserRole({ useremail: userEmail, })) as GetUserRoleResponse;

  let isAuthorized;
  if (userRole === "teacher") isAuthorized = !!courseData.teachers.filter((email) => email.owns_teacher === userEmail).length;
  else isAuthorized = !!courseData.students.filter((email) => email.partakes_student === userEmail).length;

  if (!userEmail || !isAuthorized) return {
    props: {
      data: null,
      error: "USER_NOT_AUTHORIZED",
      role: null,
  }, };

  return { props: { 
    data: {
      course: courseData.course,
      teachers: courseData.teachers,
      students: courseData.students,
      tests: courseData.tests,
    },
    error: null,
    role: userRole,
  }, };
};

export default function Course(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Head>
        <title>Learnify - course</title>
        <meta name="description" content="visualize the details of a course" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Navbar />

        {props.error ? (
          <Error>
            {props.error === "NO_COURSE_ID"
              ? "ERROR: no course ID was inserted."
              : props.error === "NO_COURSE_FOUND"
              ? "ERROR: this course does not exist."
              : props.error === "USER_NOT_AUTHORIZED"
              ? "ERROR: you are not authorized to enter this course."
              : props.error}
          </Error>
        ) : props.role === "teacher" ? (
          <TeacherCourse data={props.data as AssertedGetCourseDataResponse} />
        ) : props.role === "student" ? (
          <StudentCourse data={props.data as AssertedGetCourseDataResponse} />
        ) : null}
      </main>
    </>
  );
}
