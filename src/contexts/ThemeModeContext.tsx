import { createContext, useEffect, useState } from "react";

export type ThemeModeProps = {
  theme?: string;
  changeTheme?: () => void;
};

export const ThemeModeContext = createContext<ThemeModeProps>({});

export function ThemeModeProvider(props) {
  const [theme, setTheme] = useState<string>("dark");

  useEffect(() => {
    const storageTheme = localStorage.getItem("theme");
    setTheme(storageTheme);
  }, []);

  function changeTheme() {
    setTheme((prev: string) => (prev === "" ? "dark" : ""));
    localStorage.setItem("theme", theme === "" ? "dark" : "");
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
