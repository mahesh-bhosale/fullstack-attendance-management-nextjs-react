"use client";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { GraduationCap, Hand, LayoutIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

function SideNav() {
  const { user } = useKindeBrowserClient();

  const menuList = [
    {
      id: 1,
      name: "Dashboard",
      icon: LayoutIcon,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Students",
      icon: GraduationCap,
      path: "/dashboard/students",
    },
    {
      id: 3,
      name: "Attandance",
      icon: Hand,
      path: "/dashboard/attendance",
    },
    {
      id: 4,
      name: "Settings",
      icon: LayoutIcon,
      path: "/dashboard/settings",
    },{
      id: 5,
      name: "Report",
      icon: LayoutIcon,
      path: "/dashboard/report",
    },
  ];

  const path = usePathname();
  useEffect(() => {
    console.log(path);
  }, [path]);
  return (
    <div className="border shadow-md h-screen p-5">
      <Image src={"/logo.svg"} width={180} height={50} />
      <hr className="my-5" />
      {menuList.map((menu, index) => (
        <Link href={menu.path}>
          <h2
            className={`flex items-center gap-3 text-md  p-4 text-slate-500 hover:bg-primary hover:text-white cursor-pointer rounded-lg my-2 ${path==menu.path&&'bg-gray-700 text-white'}`}
          >
            <menu.icon />
            {menu.name}
          </h2>
        </Link>
      ))}
      <div className="flex gap-2 items-center bottom-5 fixed p-2">
        <Image
          src={user?.picture}
          width={35}
          height={35}
          alt="user"
          className="rounded-full"
        />
        <div>
          <h2 className="text-sm font-bold">
            {user?.given_name}
            {user?.family_name}
          </h2>
          <h2 className="text-xs  text-slate-400 break-words w-40 ">
            {user?.email}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default SideNav;
