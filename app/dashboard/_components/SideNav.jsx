"use client"; 
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { GraduationCap, Hand, LayoutIcon, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

function SideNav() {
  const { user } = useKindeBrowserClient();
  const [isOpen, setIsOpen] = useState(true); // state to toggle sidebar visibility

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
      name: "Attendance",
      icon: Hand,
      path: "/dashboard/attendance",
    },
    {
      id: 4,
      name: "Settings",
      icon: Settings,
      path: "/dashboard/settings",
    },
    {
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
    <div className={`h-screen p-5 ${isOpen ? 'w-60' : 'w-20'} transition-all duration-300 bg-gray-800 text-white`}>
      <Image src={"/logo.svg"} width={180} height={50} alt="Logo" />
      <hr className="my-5" />
      
      {/* Mobile toggle button */}
      <button 
        className="lg:hidden absolute top-5 right-5 p-2 text-white bg-gray-700 rounded-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>☰</span>
      </button>

      {/* Menu List */}
      <div className="mt-8">
        {menuList.map((menu) => (
          <Link href={menu.path} key={menu.id}>
            <h2
              className={`flex items-center gap-3 text-md p-4 text-slate-500 hover:bg-primary hover:text-white cursor-pointer rounded-lg my-2 ${path === menu.path && 'bg-gray-700 text-white'}`}
            >
              <menu.icon />
              {isOpen && menu.name}
            </h2>
          </Link>
        ))}
      </div>

      {/* Profile Section */}
      <div className={`flex gap-2 items-center absolute bottom-5 p-2 ${isOpen ? 'left-5' : 'left-2'} transition-all duration-300`}>
        <Image
          src={user?.picture || '/default-profile.png'} // Default profile image if none exists
          width={35}
          height={35}
          alt="user"
          className="rounded-full"
        />
        <div className="hidden sm:block">
          <h2 className="text-sm font-bold">{user?.given_name} {user?.family_name}</h2>
          <h2 className="text-xs text-slate-400 break-words w-40">{user?.email}</h2>
        </div>
      </div>
    </div>
  );
}

export default SideNav;
