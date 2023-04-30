import { AssertedGetCourseDataResponse } from "@/pages/api/getCourseData";

type StudentCourseProps = {
  data: AssertedGetCourseDataResponse;
};

export default function StudentCourse(props: StudentCourseProps) {
  return (
    <div>
      <span>student page</span>
    </div>
  );
}
