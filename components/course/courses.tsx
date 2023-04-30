import { Course } from "@/types/schema";

import style from "@/styles/components/courses.module.scss"
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";
import Link from "next/link";

type CoursesProps = {
  courses: Array<Course>
};

export default function Courses(props: CoursesProps) {
  const { user, isSignedIn } = useUser()
  const router = useRouter()

  return (
    <div className={style.courses}>
      <span className={style.courses_title}>Courses {isSignedIn? <>of {user.fullName}</> : <></>}</span>
      {props.courses.map(course => (
        <div key={course.ID} className={style.course} onClick={() => router.push(`/courses/${course.ID}`)}>
          <span className={style.course_title}>{course.name}</span> 
        </div>
      ))}
    </div>
  );
}
