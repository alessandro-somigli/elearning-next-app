import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";

import { Course } from "@/types/schema";

import style from "@/styles/components/courses.module.scss";

type CoursesProps = {
  courses: Array<Course>
  onClick?: () => void
};

export default function Courses(props: CoursesProps) {
  const { user, isSignedIn } = useUser();
  const router = useRouter();

  const handleClick = (courseid: number) => {
    router.push(`/courses/${courseid}`);
    props.onClick? props.onClick() : null
  }

  return (
    <div className={style.courses}>
      <span className={style.courses_title}>
        Courses {isSignedIn ? <>of {user.fullName}</> : <></>}
      </span>
      {props.courses.map((course) => (
        <div
          key={course.course_ID}
          className={style.course}
          onClick={() => handleClick(course.course_ID)}
        >
          <span className={style.course_title}>{course.course_name}</span>
        </div>
      ))}
    </div>
  );
}
