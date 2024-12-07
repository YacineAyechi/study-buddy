"use client";

import Link from "next/link";
import { FiBell, FiChevronDown, FiUser } from "react-icons/fi";

const Hero = () => {
  return (
    <section className="overflow-hidden bg-white md:h-screen">
      <div className="relative flex flex-col items-center justify-center px-12 pb-48 pt-24 md:pt-32">
        <Copy />
        <MockupScreen />
      </div>
    </section>
  );
};

export default Hero;

const Copy = () => {
  return (
    <>
      <h1 className="max-w-4xl text-center text-4xl font-black leading-[1.15] md:text-6xl md:leading-[1.15]">
        Your AI-Powered Study Companion
      </h1>
      <p className="mx-auto my-4 max-w-3xl text-center text-base leading-relaxed md:my-6 md:text-xl md:leading-relaxed">
        Upload any PDF or text document and let AI create personalized
        summaries, quizzes, and flashcards. Master your study material faster
        and more effectively.
      </p>
      <Link
        href="/login"
        className="rounded-lg bg-[--poppy] p-3 uppercase text-white transition-colors hover:bg-[--poppy-dark] md:mb-[52px]"
      >
        <span className="font-bold">Start Learning - </span> it&apos;s free
      </Link>
    </>
  );
};

const MockupScreen = () => {
  return (
    <div className="absolute bottom-0 left-1/2 h-36 w-[calc(100vw_-_56px)] max-w-[1100px] -translate-x-1/2 overflow-hidden rounded-t-xl bg-zinc-900 p-0.5">
      <div className="flex items-center justify-between px-2 py-1">
        <div className="flex items-center gap-0.5">
          <span className="size-2 rounded-full bg-red-400" />
          <span className="size-2 rounded-full bg-yellow-400" />
          <span className="size-2 rounded-full bg-green-400" />
        </div>
        <span className="rounded bg-zinc-600 px-2 py-0.5 text-xs text-zinc-100">
          your-website.com
        </span>
        <FiChevronDown className="text-white" />
      </div>
      <div className="relative z-0 grid h-full w-full grid-cols-[100px,_1fr] overflow-hidden rounded-t-lg bg-white md:grid-cols-[150px,_1fr]">
        <div className="h-full p-2">
          <Logo />
        </div>

        <div className="relative z-0 p-2">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <p className="text-sm font-semibold capitalize">Dashboard</p>
              <p className="text-sm font-semibold capitalize">History</p>
            </div>
            <div className="flex items-center gap-1.5 text-xl">
              <FiBell className="text-indigo-600" />
              <FiUser />
            </div>
          </div>
          <div className="h-full rounded-xl border border-dashed border-zinc-500 bg-zinc-100" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 top-0 z-10 bg-gradient-to-b from-white/0 to-white" />
      </div>
    </div>
  );
};

const Logo = () => {
  // Temp logo from https://logoipsum.com/
  return (
    <svg
      width="32"
      height="auto"
      viewBox="0 0 50 39"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-fit fill-zinc-950"
    >
      <path
        d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z"
        stopColor="#09090B"
      ></path>
      <path
        d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z"
        stopColor="#09090B"
      ></path>
    </svg>
  );
};
