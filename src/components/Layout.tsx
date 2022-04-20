import { ReactNode } from "react";
import { useThemeMode } from "../hooks/useThemeMode";
import { BottomMenu } from "./BottomMenu";
import { Content } from "./Content";
import { Drawer } from "./Drawer";
import { Header } from "./Header";
import { PrivateRoute } from "./PrivateRoute";

type LayoutProps = {
	title: string;
	subtitle: string;
	children?: ReactNode;
};

export function Layout(props: LayoutProps) {
	const { theme } = useThemeMode();

	return (
		<PrivateRoute>
			{/* Desktop */}
			<div className={`${theme} hidden md:flex h-screen w-screen`}>
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
			{/* Mobile */}
			<div className={`
				${theme} md:hidden flex flex-col 
				h-screen w-screen
			`}>
				<div
					className={`
          flex flex-col w-full p-7
					h-full 
          bg-gray-300 dark:bg-gray-800
          `}
				>
					<Header {...{ ...props }} />
					<Content>{props.children}</Content>
				</div>
				<BottomMenu />
			</div>
		</PrivateRoute>
	);
}
