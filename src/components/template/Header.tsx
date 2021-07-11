import { Title } from "./Title";

type HeaderProps = {
  title: string;
  subtitle: string;
};

export function Header(props: HeaderProps) {
  return (
    <div>
      <Title {...{ ...props }} />
    </div>
  );
}
