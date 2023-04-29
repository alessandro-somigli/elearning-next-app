import { Course } from "@/types/schema";

import style from "@/styles/components/courses.module.scss"
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";

type CoursesProps = {
  courses: Array<Course>;
  role: "student" | "professor"
};

export default function Courses(props: CoursesProps) {
  const { user, isSignedIn } = useUser()
  const router = useRouter()

  const onSelectCourse = (ID: number) => router.push(`/${props.role}/courses/${ID}`)

  return (
    <div className={style.courses}>
      <span className={style.courses_title}>Courses {isSignedIn? <>of {user.fullName}</> : <></>}</span>
      {props.courses.map(course => (
        <div key={course.ID} className={style.course} onClick={() => onSelectCourse(course.ID)}>
          <span className={style.course_title}>{course.name}</span> 
        </div>
      ))}
    </div>
  );
}
