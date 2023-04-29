import { Course } from "@/types/schema";

type CoursesProps = {
  courses: Array<Course>;
};

export default function Courses(props: CoursesProps) {
  console.log(props)

  return (
    <div>
      {props.courses.map(course => (
        <div key={course.ID}>
          <a>{course.name}</a>
        </div>
      ))}
    </div>
  );
}
