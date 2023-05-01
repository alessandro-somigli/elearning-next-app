import { useRouter } from "next/router";

import { Course, Test } from "@/types/schema";

import style from "@/styles/components/tests.module.scss";

type TestsProps = {
  tests: Array<Test>;
  course: Course;
};

export default function Tests(props: TestsProps) {
  const router = useRouter();

  return (
    <div className={style.tests}>
      <span className={style.tests_title}>
        Tests of {props.course.course_name}
      </span>
      {props.tests.map((test) => (
        <div
          key={test.test_ID}
          className={style.test}
          onClick={() => router.push(`/tests/${test.test_ID}`)}
        >
          <span className={style.test_title}>{test.test_name}</span>
        </div>
      ))}
    </div>
  );
}
