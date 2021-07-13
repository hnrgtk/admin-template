import { ReactNode } from "react";

type ContentProps = {
  children?: ReactNode;
};

export function Content(props: ContentProps) {
  return (
    <div
      className={`
        flex flex-col mt-7
      dark:text-gray-200
      `}
    >
      {props.children}
    </div>
  );
}