import { AssertedGetCourseDataResponse } from "@/pages/api/getCourseData";

type TeacherCourseProps = {
  data: AssertedGetCourseDataResponse;
};

export default function TeacherCourse(props: TeacherCourseProps) {
  return (
    <div>
      <span>{props.data.course}</span>
      <div>
        {props.data.teachers.map((teacher) => (
          <div key={teacher.owns_teacher}>
            <span>{teacher.owns_teacher}</span>
          </div>
        ))}
      </div>

      <div>
        <span>Students</span>
        {props.data.students.map((student) => (
          <div key={student.partakes_student}>
            <span>{student.partakes_student}</span>
          </div>
        ))}
      </div>

      <div>
        <button>add course</button>
      </div>
    </div>
  );
}
