import { ReactNode } from "react";

type ErrorProps = {
  children: ReactNode
}

export default function Error(props: ErrorProps) {
  
  return (
    <div>
      <span>{props.children}</span>
    </div>
  );
}
