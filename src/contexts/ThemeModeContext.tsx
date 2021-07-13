import { createContext, ReactNode, useState } from "react";

type ThemeType = "dark" | "";

export type ThemeModeProps = {
  theme?: ThemeType;
  changeTheme?: () => void;
};

export const ThemeModeContext = createContext<ThemeModeProps>({});

export function ThemeModeProvider(props) {
  const [theme, setTheme] = useState<ThemeType>("dark");

  function changeTheme() {
    setTheme((prev: ThemeType) => (prev === "" ? "dark" : ""));
  }

  return (
    <ThemeModeContext.Provider
      value={{
        theme,
        changeTheme,
      }}
    >
      {props.children}
    </ThemeModeContext.Provider>
  );
}
