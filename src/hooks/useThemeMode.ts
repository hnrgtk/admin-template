import { useContext } from "react";
import { ThemeModeContext } from "../contexts/ThemeModeContext";

export const useThemeMode = () => useContext(ThemeModeContext);
