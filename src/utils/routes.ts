import { ReactNode } from "react";
import { HomeIcon, NotificationIcon, SettingsIcon } from "../assets/icons";

type RouteType = {
  url: string;
  icon: ReactNode;
  text: string;
}[];

export const routes: RouteType = [
  {
    url: "/",
    text: "Início",
    icon: HomeIcon,
  },
  {
    url: "/avisos",
    text: "Avisos",
    icon: NotificationIcon,
  },
  {
    url: "/ajustes",
    text: "Ajustes",
    icon: SettingsIcon,
  },
];
