"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });



const LocalVideo = () => {
  return (
    <motion.div
      className="h-full w-full"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{
        duration: 2,
        delay: 0,
      }}
    >
      <ReactPlayer
        height="100%"
        width="100%"
        url="./Dash.mp4"
        playing={true}
        pip={true}
        loop={true}
        muted
      />
    </motion.div>
  );
};

export default LocalVideo;
