import { ReactNode } from "react";
import { useThemeMode } from "../../hooks/useThemeMode";
import { Content } from "./Content";
import { Drawer } from "./Drawer";
import { Header } from "./Header";

type LayoutProps = {
  title: string;
  subtitle: string;
  children?: ReactNode;
};

export function Layout(props: LayoutProps) {
  const { theme } = useThemeMode();

  return (
    <div className={`${theme} flex h-screen w-screen`}>
      <Drawer />
      <div
        className={`
          flex flex-col w-full p-7 
          bg-gray-300 dark:bg-gray-800
        `}
      >
        <Header {...{ ...props }} />
        <Content>{props.children}</Content>
      </div>
    </div>
  );
}
