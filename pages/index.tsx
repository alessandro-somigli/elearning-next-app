import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType, } from "next";
import Head from "next/head";

import { clerkClient, getAuth } from "@clerk/nextjs/server";

import { GetCourses, GetCoursesResponse } from "@/pages/api/getCourses";

import Navbar from "@/components/navbar";
import Courses from "@/components/course/courses";

import style from "@/styles/pages/home.module.scss";

export const config = {
  runtime: "experimental-edge",
  regions: ["fra1"],
};

export const getServerSideProps: GetServerSideProps<{ courses: GetCoursesResponse; }> = async (context: GetServerSidePropsContext) => {
  const { userId } = getAuth(context.req);
  const user = userId ? await clerkClient.users.getUser(userId) : null;
  const emailAddress = user?.emailAddresses[0].emailAddress as string | null;

  const courses = GetCourses({ useremail: emailAddress });

  return {
    props: { courses: await courses, },
  };
};

export default function Home(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Head>
        <title>Learnify - Home</title>
        <meta name="description" content="homepage of the Learnify website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Navbar />

        <div className={style.courses_container}>
          <Courses courses={props.courses}/>
        </div>
      </main>
    </>
  );
}
