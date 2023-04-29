import Head from "next/head";

import Navbar from "@/components/navbar";
import type { Course } from "@/types/schema";

import style from "@/styles/pages/course.module.scss";
import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { GetCourseData, GetCourseDataResponse } from "@/pages/api/course/data";
import { clerkClient, getAuth } from "@clerk/nextjs/server";

export const getServerSideProps: GetServerSideProps<GetCourseDataResponse> = async (context: GetServerSidePropsContext) => {
  const { userId } = getAuth(context.req);
  const user = userId ? await clerkClient.users.getUser(userId) : null;
  const emailAddress = user?.emailAddresses[0].emailAddress as string | null
  
  const { id } = context.query;
  
  if (!id) { return { props: {
    course: "",
    professors: [],
    students: [],
    tests: [] }} 
  }

  const DBresponse = await GetCourseData({ courseid: id.toString() })

  const isAuthorized = DBresponse.students.filter(email => email.student === emailAddress).length
  if (!isAuthorized) return { redirect: {
    permanent: false,
    destination: '/'
  } }

  return { props: {
    course: DBresponse.course,
    professors: DBresponse.professors,
    students: DBresponse.students,
    tests: DBresponse.tests
  }}
};

export default function Course(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Head>
        <title>Learnify - {props.course}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Navbar />

        <div>
          <span>{props.course}</span>

          <span>made by: </span>
          {props.professors.map(professor => <>{professor.professor}</>)}

          <div>
            {props.tests.map(test => <>{test.name}</>)}
          </div>
        </div>
      </main>
    </>
  );
}
