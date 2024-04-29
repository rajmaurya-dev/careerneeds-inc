// Reelvideo.tsx
"use client";
// Reelvideo component
import React from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

interface ReelvideoProps {
  url: string;
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
}

const Reelvideo: React.FC<ReelvideoProps> = ({ url, isPlaying, onPlay, onPause }) => {
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
        url={url}
        playing={isPlaying}
        pip={true}
        loop={true}
        controls = {true}
        onPlay={onPlay}
        onPause={onPause}
      />
    </motion.div>
  );
};

export default Reelvideo;
