import React from "react";

const JobProfile = (jobData: any) => {
  return (
    <div className="flex border-l-2 ml-60 border-b-2 justify-center items-center text-white flex-col h-[100vh]  w-[33vh] border-[#3d3d3d]">
      {jobData.jobData ? (
        <div className=" text-left pl-20">
          <p className="text-xl font-semibold">{jobData.jobData.title}</p>
          <p className="text-3xl font-semibold text-gray-300">
            {jobData.jobData.company}
          </p>
          
          <p className="text-md font-medium text-gray-500">
            Skills:{" "}
            {jobData.jobData.skills
              ? jobData.jobData.skills.join(", ")
              : "No Skills Provided"}
          </p>
          <a
            className="text-lg font-semibold text-green-600 underline"
            href={jobData.jobData.url}
            target="_blank"
          >
            Link To Apply{" "}
          </a>
        </div>
      ) : (
        <div className="ml-5">
          <p className="text-5xl text-gray-600 "> Wanna Know the Details? </p>
          <p className="text-gray-400">
            Click on the{" "}
            <span className="bg-gray-900 text-white px-2 py-1 ">Detail</span>{" "}
            button above ^^
          </p>
        </div>
      )}
    </div>
  );
};

export default JobProfile;
