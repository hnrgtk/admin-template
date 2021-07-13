/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useAuth } from "../hooks/useAuth";

export function Avatar() {
  const { user } = useAuth();
  return (
    <Link href="/perfil" passHref>
      <img
        src={user?.avatar ?? "/avatar.svg"}
        alt={user?.name}
        className={`
          h-10 w-10 rounded-full cursor-pointer
          ml-3
        `}
      />
    </Link>
  );
}
