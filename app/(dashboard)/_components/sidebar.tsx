"use client";
import { useRouter } from "next/navigation";
import { Logo } from "./logo";
import { SidebarRoutes } from "./sidebar-routes";

export const Sidebar = () => {
  const router = useRouter();
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">
      {/* Logo */}
      <div className="p-6 ">
        <div className="cursor-pointer" onClick={() => router.push("/")}>
          <Logo />
        </div>
      </div>
      {/* Menu bawah */}
      <div className="flex flex-col w-full">
        <SidebarRoutes />
      </div>
    </div>
  );
};
