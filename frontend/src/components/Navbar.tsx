"use client";

import Link from "next/link";
import {useAppSelector} from "@/redux/hooks";
import {IUser} from "@/redux/features/auth/authSlice";
import {usePathname} from "next/navigation";

export function Navbar() {
  const userToken: IUser | null = useAppSelector(state => state.auth.user);
  const pathname = usePathname();

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span
            className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Good deeds</span>
        </Link>
        <div className="w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <CustomLink href="/">Home</CustomLink>
            </li>
            <li>
              <CustomLink href="/friends">Friends</CustomLink>
            </li>
            <li>
              <CustomLink href="/login">Login</CustomLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )

  function CustomLink({href, children, ...rest}) {
    const active = href === pathname;
    return (
      <>
        {active ? (
          <Link href={href}
            {...rest}
            className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
            aria-current="page">
            {children}
          </Link>) :
          (
            <Link href={href}
              {...rest}
              className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
              {children}
            </Link>)}
      </>
    )
  }
}