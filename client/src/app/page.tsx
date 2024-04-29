"use client";
import Header from "@/components/header";
import ContainerScroll from "@/components/ui/container-scroll-animation";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import Link from "next/link";

const words = "Easy Gigs, Easy Swipes:";
const words2 = "Your Shortcut to Flexible Work";

const HeroScrollDemo = () => {
  return (
    <>
      <Header />

      <div className=" w-full dark:bg-black flex-col  bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

        <ContainerScroll
          titleComponent={
            <>
              <h1 className="text-4xl max-sm:text-7xl font-semibold text-white dark:text-white">
                <TextGenerateEffect words={words} />
                <TextGenerateEffect words={words2} number={2} />
              </h1>
            </>
          }
        />
        <p className="flex flex-col -mt-40 justify-center items-center max-sm:text-lg ml-5 max-sm:text-left text-3xl mb-5 text-center lg:mx-80 text-white">
          CareerNeeds is your friendly gig companion! Swipe through reels of
          possibilities, and let{"'"}s turn finding gigs into a breeze. Your next
          gig adventure is just a swipe away <br /> <span className="orange_gradient font-bold text-4xl"> Start exploring with CareerNeeds now!</span>

        </p>
        <Link href="/jobs" className="inline-flex mb-40 h-12 animate-shimmer items-center justify-center rounded-md border border-slate-300  px-6 font-medium text-white transition-colors bg-slate-900 hover:bg-orange-400 hover:text-black ">
          Get Started
        </Link >
      </div>
    </>
  );
};

export default HeroScrollDemo;
