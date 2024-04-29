"use client";
import Jobs from "../../components/jobs";
import Header from "@/components/header";
import Profile from "@/components/profile";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useEffect, useState } from "react";

const Page = () => {
  const [job, setJob] = useState<any>([]);
  const { user } = useUser();

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("/api/getData");
        const data = res.data;
        setJob(data);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  return (
    <>
      {job.length > 1 && user ? (
        <div className="overflow-hidden">
          <Header />
          <div className="lg:grid-cols-3 bg-[#050505] grid">
            <div className="  lg:flex hidden col-span-1">
              <Profile user={user} />
            </div>
            <div className=" col-span-2">
              <Jobs
                details={job}
                videoLinks={job.map((jobs: any) => jobs.videoUrl)}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex bg-black justify-center items-center h-[100vh]">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-400">
            {" "}
          </div>
        </div>
      )}
    </>
  );
};
export default Page;
