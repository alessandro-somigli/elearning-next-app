type Professor = {
  email: string;
};

type Student = {
  email: string;
};

type Course = {
  ID: number;
  name: string;
};

type Test = {
  ID: number;
  name: string;
  time: number;
  questions: {};

  professor: Professor["email"];
  course: Course["ID"];
};

type Own = {
  professor: Professor["email"];
  course: Course["ID"];
};

type Partake = {
  student: Student["email"];
  course: Course["ID"];
};

export type { Professor, Student, Course, Test, Own, Partake };
