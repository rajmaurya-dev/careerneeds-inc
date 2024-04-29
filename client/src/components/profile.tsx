import Link from "next/link";
import React from "react";

const Profile = ({ user }: any) => {
  return (
    <div className="flex justify-center items-end px-20 mx-20 text-white flex-col h-[100vh] fixed border-r-2 border-[#3d3d3d] w-[33vh]">
      <img
        className="rounded-full mb-4"
        alt="hello"
        width="100"
        height="100"
        src={user.imageUrl}
      />
      <div className="text-right">
        <p className="text-2xl text-gray-300 font-semibold ">
          {user.fullName}
        </p>
        <p className="text-Sm text-blue-500 font-semibold">
          {user.emailAddresses[0].emailAddress}{" "}
        </p>
        <Link
          href="/profile"
          className="inline-flex h-12 mt-5 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-gray-800 bg-[length:200%_100%] px-6 font-medium text-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-orange-50"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default Profile;
