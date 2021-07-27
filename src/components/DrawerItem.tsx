import { MouseEvent, ReactNode } from "react";
import Link from "next/link";

type DrawerItemProps = {
	url?: string;
	text: string;
	icon: ReactNode;
	className?: string;
	onClick?: (event: MouseEvent<HTMLElement>) => void;
};

export function DrawerItem(props: DrawerItemProps) {
	function renderWithLink() {
		return (
			<a
				className={`
        flex flex-col justify-center items-center md:h-20 md:w-20
				xs:h-16 xs:w-16
        dark:text-gray-200
        ${props.className}
      `}
			>
				{props.icon}
				<span className="text-xs font-light">{props.text}</span>
			</a>
		);
	}
	return (
		<li
			onClick={props.onClick}
			className={`
      hover:bg-gray-300 dark:hover:bg-gray-800
        cursor-pointer
      `}
		>
			{props.url ? (
				<Link href={props.url}>{renderWithLink()}</Link>
			) : (
				renderWithLink()
			)}
		</li>
	);
}
