import { useThemeMode } from "../../hooks/useThemeMode";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { Title } from "./Title";

type HeaderProps = {
  title: string;
  subtitle: string;
};

export function Header(props: HeaderProps) {
  const { theme, changeTheme } = useThemeMode();
  return (
    <div className="flex">
      <Title {...{ ...props }} />
      <div className="flex flex-grow justify-end">
        <ThemeSwitcher {...{ theme, changeTheme }} />
      </div>
    </div>
  );
}
