"use client";
import { useEffect, useState } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { cn } from "@/utils/cn";

export const TextGenerateEffect = ({
  words,
  className,
  number,
}: {
  words: string;
  className?: string;
  number?: Number;
}) => {
  const [scope, animate] = useAnimate();
  let wordsArray = words.split(" ");
  const [no, setNo] = useState(true);

  useEffect(() => {
    if(number) {
      setNo(false);
    }
    animate(
      "span",
      {
        opacity: 1,
      },
      {
        duration: 2,
        delay: stagger(0.2),
      }
    );
  }, [scope.current]);

  const renderWords = () => {
   
    return (
      <motion.div ref={scope}>
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              key={word + idx}
             
              className= {no? "dark:text-white text-black opacity-0" : "dark:text-red-700 text-black opacity-0"}
            >
              {word}{" "}
            </motion.span>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div className={cn("font-bold", className)}>
      <div className="mt-4">
        <div className={no? " dark:text-white text-black text-5xl leading-snug tracking-wide max-sm:text-2xl" : " dark:text-white text-black text-5xl leading-snug tracking-wide mb-4 max-sm:text-2xl"}>
          {renderWords()}
        </div>
      </div>
    </div>
  );
};
