"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem } from "@/components/ui/navbar-menu";
import { cn } from "@/utils/cn";
import Image from "next/image";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

const Header = () => {
  return <Navbar className="top-2" />;
};
function Navbar({ className }: { className?: string }) {
  const { isSignedIn } = useUser()
  const [active, setActive] = useState<string | null>(null);
  return (
    <div
      className={cn(
        "fixed top-10  inset-x-0 max-w-xl mx-auto z-50 ",
        className
      )}
    >
      <Menu setActive={setActive}>
        <div className="backdrop:blur-2xl  flex justify-between  w-full items-center">
          <Link href="/">
            <div className="flex items-center  gap-2">

              <Image
                className="rounded-full"
                src="/logo.png"
                alt="Picture of the author"
                width={35}
                height={35}
              />
              <h1 className="text-white">CareerNeeds</h1>
            </div>
          </Link>
          <MenuItem setActive={setActive} active={active} item="Services">
            <div className="flex flex-col space-y-6 text-sm">
              <HoveredLink href="/jobs">Search For Jobs</HoveredLink>
              <HoveredLink href="/profile">Profile</HoveredLink>
            </div>

          </MenuItem>
          {isSignedIn ? <UserButton /> :
            <Link className="hover:text-gray-200 bg-orange-500 text-black border-2 delay-300 ease-in-out  hover:bg-orange-700 px-2 py-1 rounded-xl border-gray-700" href="/jobs" >Sign In</Link>

          }

        </div>
      </Menu>
    </div>
  );
}

export default Header;
