"use client";

import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import JobProfile from "./JobProfile";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

const Jobs = ({ videoLinks, details }: { videoLinks: string[], details: any }) => {
  const [videosPlaying, setVideosPlaying] = useState<boolean[]>(
    Array(videoLinks.length).fill(false)
  );
  const [isMuted, setIsMuted] = useState(true);
  const videoRefs = useRef<HTMLDivElement[]>([]);
  const [openDetails, setOpenDetails] = useState<boolean[]>(
    Array(videoLinks.length).fill(false)
  );

  const jobData = details;

  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          if (!videosPlaying[index]) {
            handleVideoPlay(index);
          }
        } else {
          if (videosPlaying[index]) {
            handleVideoPause(index);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.6,
    });
    videoRefs.current.forEach((videoElement, index) => {
      observer.observe(videoElement);
    });

    return () => {
      observer.disconnect();
    };
  }, [videoRefs.current.length, videosPlaying]);

  const handleVideoPlay = (index: number) => {
    setVideosPlaying((prev) => {
      const updatedPlaying = [...prev];
      updatedPlaying[index] = true;
      return updatedPlaying;
    });
  };
  const handleVideoPause = (index: number) => {
    setVideosPlaying((prev) => {
      const updatedPlaying = [...prev];
      updatedPlaying[index] = false;
      setOpenDetails((prev) => {
        const updatedOpenDetails = [...prev];
        updatedOpenDetails[index] = false;
        return updatedOpenDetails;
      });
      return updatedPlaying;
    });
  };

  const toggleMute = () => {
    setIsMuted((prevMuted) => !prevMuted);
  };

  const toggleDetails = (index: number) => {
    setOpenDetails((prev) => {
      const updatedOpenDetails = [...prev];
      updatedOpenDetails[index] = !updatedOpenDetails[index];
      return updatedOpenDetails;
    });
  };


  return (
    <div className="">
      {videoLinks.map((videoLink, index) => (
        <div
          key={index}
          id={"id-" + index}
          className={
            index === 0
              ? "video-container flex justify-center items-center"
              : "video-container flex justify-center items-center "
          }
        >
          <div className="relative h-[100vh] bg-black flex justify-end max-sm:border-b-2 lg:border-2 border-gray-700 rounded-xl ">
            <div
              className="h-[90vh] flex flex-col min-w-[50vh] bg-black text-white items-end"
              ref={(el) => {
                videoRefs.current[index] = el!;
              }}
            >
              <ReactPlayer
                height="100%"
                width="100%"
                url={videoLink}
                pip={true}
                loop={true}
                playing={videosPlaying[index]}
                muted={isMuted}
              />
              <div className=""></div>
              <button
                className=" text-white rounded-2xl p-2 m-5"
                onClick={toggleMute}
              >
                {isMuted ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-volume"
                  >
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-volume-x"
                  >
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <line x1="22" x2="16" y1="9" y2="15" />
                    <line x1="16" x2="22" y1="9" y2="15" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <div className="lg:flex lg:flex-col  lg:items-center hidden">
            <button
              onClick={() => toggleDetails(index)}
              className="text-black rounded-xl flex justify-center items-center m-2 bg-[#adaaaa] p-2 w-20"
            >
              {openDetails[index] ? "Close>" : "Detail"}
            </button>
            {openDetails[index] ? (
              <JobProfile jobData={jobData[index]} />
            ) : (
              <JobProfile jobData={jobData[200]} />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Jobs;
