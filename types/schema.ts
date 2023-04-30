type Teacher = {
  teacher_email: string;
};

type Student = {
  student_email: string;
};

type Course = {
  course_ID: number;
  course_name: string;
};

type Test = {
  test_ID: number;
  test_name: string;
  test_time: number;
  test_questions: {};

  test_teacher: Teacher["teacher_email"];
  test_course: Course["course_ID"];
};

type TeacherOwnsCourse = {
  owns_teacher: Teacher["teacher_email"];
  owns_course: Course["course_ID"];
};

type StudentPartakesCourse = {
  partakes_student: Student["student_email"];
  partakes_course: Course["course_ID"];
};

type StudentScoresTest = {
  scores_student: Student["student_email"];
  scores_test: Test["test_ID"];

  scores_score: number
}

export type { Teacher, Student, Course, Test, TeacherOwnsCourse, StudentPartakesCourse, StudentScoresTest };
