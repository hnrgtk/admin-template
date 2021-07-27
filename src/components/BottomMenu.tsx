import { HomeIcon, LogoutIcon, NotificationIcon, SettingsIcon } from "../assets/icons";
import { useAuth } from "../hooks/useAuth";
import { DrawerItem } from "./DrawerItem";

export function BottomMenu() {
  const { logout } = useAuth();
	return (
		<div
			className={`
			 	h-16 w-full
			bg-gray-200 text-gray-700
      dark:bg-gray-900 
			`}
		>
			<ul className="flex justify-between">
				<DrawerItem url="/" text="Início" icon={HomeIcon} />
				<DrawerItem
					url="/avisos"
					text="Avisos"
					icon={NotificationIcon}
				/>
				<DrawerItem url="/ajustes" text="Ajustes" icon={SettingsIcon} />
				<DrawerItem
					onClick={logout}
					className={`
            text-red-600 dark:text-red-400 
            hover:bg-red-400 hover:text-white
            dark:hover:text-white
          `}
					text="Sair"
					icon={LogoutIcon}
				/>
			</ul>
		</div>
	)
}