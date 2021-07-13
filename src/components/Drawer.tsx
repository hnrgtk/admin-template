import {
  HomeIcon,
  LogoutIcon,
  NotificationIcon,
  SettingsIcon,
} from "../assets/icons";
import { DrawerItem } from "./DrawerItem";
import { Logo } from "./Logo";

export function Drawer() {
  return (
    <aside
      className={`
        flex flex-col
        bg-gray-200 text-gray-700
        dark:bg-gray-900 
        `}
    >
      <div
        className={`
        flex flex-col items-center justify-center
        bg-gradient-to-r from-indigo-500 to-purple-800 h-20 w-20
      `}
      >
        <Logo />
      </div>
      <ul className="flex-grow">
        <DrawerItem url="/" text="Início" icon={HomeIcon} />
        <DrawerItem
          url="/notificacoes"
          text="Notificações"
          icon={NotificationIcon}
        />
        <DrawerItem url="/ajustes" text="Ajustes" icon={SettingsIcon} />
      </ul>
      <ul>
        <DrawerItem
          onClick={() => console.log("logout")}
          className={`
            text-red-600 dark:text-red-400 
            hover:bg-red-400 hover:text-white
            dark:hover:text-white
          `}
          text="Sair"
          icon={LogoutIcon}
        />
      </ul>
    </aside>
  );
}
