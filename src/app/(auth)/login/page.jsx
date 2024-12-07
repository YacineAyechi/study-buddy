"use client";

import React from "react";
import { SiGithub, SiTwitter } from "react-icons/si";
import { FiArrowLeft } from "react-icons/fi";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

const LoginPage = () => {
  return (
    <div className="bg-zinc-950 py-20 text-zinc-200 selection:bg-zinc-600">
      <BubbleButton className="absolute left-4 top-6 text-sm">
        <FiArrowLeft />
        Go back
      </BubbleButton>

      <motion.div
        initial={{
          opacity: 0,
          y: 25,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 1.25,
          ease: "easeInOut",
        }}
        className="relative z-10 mx-auto w-full max-w-xl p-4"
      >
        <div>
          <NavLogo />
          <div className="mb-9 mt-6 space-y-1.5">
            <h1 className="text-2xl font-semibold">Sign in to your account</h1>
            <p className="text-zinc-400">
              Don&apos;t have an account?{" "}
              <a href="#" className="text-blue-400">
                Create one.
              </a>
            </p>
          </div>
        </div>

        <div>
          <div className="mb-3 flex gap-3">
            <BubbleButton className="flex w-full justify-center py-3">
              <SiTwitter />
            </BubbleButton>
            <BubbleButton className="flex w-full justify-center py-3">
              <SiGithub />
            </BubbleButton>
          </div>
          <BubbleButton className="flex w-full justify-center py-3">
            Sign in with SSO
          </BubbleButton>
        </div>

        <div className="my-6 flex items-center gap-3">
          <div className="h-[1px] w-full bg-zinc-700" />
          <span className="text-zinc-400">OR</span>
          <div className="h-[1px] w-full bg-zinc-700" />
        </div>
        <Email />
        <Terms />
      </motion.div>

      <CornerGrid />
    </div>
  );
};

export default LoginPage;

const Email = () => {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="mb-3">
        <label htmlFor="email-input" className="mb-1.5 block text-zinc-400">
          Email
        </label>
        <input
          id="email-input"
          type="email"
          placeholder="your.email@provider.com"
          className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 placeholder-zinc-500 ring-1 ring-transparent transition-shadow focus:outline-0 focus:ring-blue-700"
        />
      </div>
      <div className="mb-6">
        <div className="mb-1.5 flex items-end justify-between">
          <label htmlFor="password-input" className="block text-zinc-400">
            Password
          </label>
          <a href="#" className="text-sm text-blue-400">
            Forgot?
          </a>
        </div>
        <input
          id="password-input"
          type="password"
          placeholder="••••••••••••"
          className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 placeholder-zinc-500 ring-1 ring-transparent transition-shadow focus:outline-0 focus:ring-blue-700"
        />
      </div>
      <SplashButton type="submit" className="w-full">
        Sign in
      </SplashButton>
    </form>
  );
};

const Terms = () => (
  <p className="mt-9 text-xs text-zinc-400">
    By signing in, you agree to our{" "}
    <a href="#" className="text-blue-400">
      Terms & Conditions
    </a>{" "}
    and{" "}
    <a href="#" className="text-blue-400">
      Privacy Policy.
    </a>
  </p>
);

const SplashButton = ({ children, className, ...rest }) => {
  return (
    <button
      className={twMerge(
        "rounded-md bg-gradient-to-br from-blue-400 to-blue-700 px-4 py-2 text-lg text-zinc-50 ring-2 ring-blue-500/50 ring-offset-2 ring-offset-zinc-950 transition-all hover:scale-[1.02] hover:ring-transparent active:scale-[0.98] active:ring-blue-500/70",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

const BubbleButton = ({ children, className, ...rest }) => {
  return (
    <button
      className={twMerge(
        `
        relative z-0 flex items-center gap-2 overflow-hidden whitespace-nowrap rounded-md 
        border border-zinc-700 bg-gradient-to-br from-zinc-800 to-zinc-950
        px-3 py-1.5
        text-zinc-50 transition-all duration-300
        
        before:absolute before:inset-0
        before:-z-10 before:translate-y-[200%]
        before:scale-[2.5]
        before:rounded-[100%] before:bg-zinc-100
        before:transition-transform before:duration-500
        before:content-[""]

        hover:scale-105 hover:text-zinc-900
        hover:before:translate-y-[0%]
        active:scale-100`,
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

const CornerGrid = () => {
  return (
    <div
      style={{
        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke-width='2' stroke='rgb(30 58 138 / 0.5)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
      }}
      className="absolute right-0 top-0 z-0 size-[50vw]"
    >
      <div
        style={{
          backgroundImage:
            "radial-gradient(100% 100% at 100% 0%, rgba(9,9,11,0), rgba(9,9,11,1))",
        }}
        className="absolute inset-0"
      />
    </div>
  );
};

const NavLogo = () => {
  return (
    <a href="#">
      <svg width="99" height="21" viewBox="0 0 99 21" fill="none">
        <path
          d="M9.00013 21C13.9708 21 18.0001 16.2991 18.0001 10.5V3.15C18.0001 2.31457 17.7157 1.51335 17.2093 0.922614C16.703 0.331874 16.0162 0 15.3001 0L9.45013 0V4.60635C9.45013 5.6574 9.50503 6.74625 9.97753 7.64085C10.3158 8.28198 10.7683 8.83073 11.3043 9.24987C11.8404 9.669 12.4475 9.94871 13.0843 10.07L13.2567 10.1026C13.3277 10.1309 13.3894 10.1845 13.4331 10.2557C13.4768 10.327 13.5002 10.4124 13.5002 10.5C13.5002 10.5876 13.4768 10.673 13.4331 10.7443C13.3894 10.8155 13.3277 10.8691 13.2567 10.8974L13.0843 10.93C12.1538 11.1073 11.2945 11.6212 10.6278 12.399C9.96113 13.1768 9.52068 14.1793 9.36868 15.2649L9.34078 15.466C9.31649 15.5489 9.27059 15.6208 9.20951 15.6718C9.14843 15.7227 9.07522 15.7501 9.00013 15.7501C8.92504 15.7501 8.85183 15.7227 8.79074 15.6718C8.72966 15.6208 8.68376 15.5489 8.65948 15.466L8.63158 15.2649C8.52757 14.5219 8.2878 13.8137 7.92855 13.1883C7.56929 12.5629 7.09895 12.035 6.54943 11.6403C5.78263 11.089 4.84933 11.025 3.94843 11.025H0.0109253C0.246275 16.58 4.18063 21 9.00013 21Z"
          className="fill-zinc-200"
        />
        <path
          d="M0 9.975H3.9483C4.8492 9.975 5.7825 9.91095 6.5493 9.3597C7.14871 8.92883 7.65328 8.34016 8.0226 7.64085C8.4951 6.74625 8.55 5.6574 8.55 4.60635V0H2.7C1.98392 0 1.29716 0.331874 0.790812 0.922614C0.284464 1.51335 0 2.31457 0 3.15L0 9.975ZM20.9048 1.05C20.9048 1.32848 20.8099 1.59555 20.6411 1.79246C20.4724 1.98938 20.2434 2.1 20.0048 2.1C19.7661 2.1 19.5371 1.98938 19.3684 1.79246C19.1996 1.59555 19.1048 1.32848 19.1048 1.05C19.1048 0.771523 19.1996 0.504451 19.3684 0.307538C19.5371 0.110625 19.7661 0 20.0048 0C20.2434 0 20.4724 0.110625 20.6411 0.307538C20.8099 0.504451 20.9048 0.771523 20.9048 1.05ZM95.27 6.3546C97.7859 6.3546 99 8.40473 99 10.7793V15.2392H96.3671V11.3085C96.3671 10.2323 96.0305 9.34395 95.0652 9.34395C94.1 9.34395 93.7782 10.2323 93.7782 11.3085V15.2387H91.1453V11.3085C91.1453 10.2323 90.8235 9.34395 89.8578 9.34395C88.8926 9.34395 88.556 10.2323 88.556 11.3085V15.2387H85.9235V10.7788C85.9235 8.4042 87.1371 6.35408 89.6531 6.35408C91.0283 6.35408 92.0228 6.98618 92.4764 8.0283C92.9588 6.98618 94.0122 6.35355 95.27 6.35355V6.3546ZM81.1922 12.5055C82.0404 12.5055 82.4063 11.5999 82.4063 10.5231V6.69585H85.0388V10.899C85.0388 13.4106 83.781 15.4954 81.1922 15.4954C78.6029 15.4954 77.3451 13.4111 77.3451 10.899V6.69585H79.9781V10.5231C79.9781 11.5994 80.3435 12.5055 81.1922 12.5055ZM73.4738 15.5122C71.8209 15.5122 70.7531 14.846 70.124 13.5476L72.0257 12.3002C72.2889 12.8468 72.6836 13.1203 73.3419 13.1203C73.8833 13.1203 74.1317 12.8982 74.1317 12.6247C74.1317 11.5826 70.2702 12.642 70.2702 9.32768C70.2702 7.72118 71.4402 6.42285 73.4297 6.42285C75.1703 6.42285 76.1211 7.41353 76.5455 8.3706L74.6438 9.6348C74.4831 9.1224 73.9854 8.81475 73.4882 8.81475C73.1079 8.81475 72.9032 9.0027 72.9032 9.2589C72.9032 10.3184 76.7646 9.34448 76.7646 12.5564C76.7646 14.3504 75.258 15.5122 73.4738 15.5122ZM64.2749 19.1688H61.6419V10.9505C61.6419 8.33595 63.324 6.43965 65.6645 6.43965C67.9464 6.43965 69.687 8.47298 69.687 10.9505C69.687 13.6841 68.1363 15.4954 65.8107 15.4954C65.2694 15.4954 64.7285 15.3074 64.2749 15.0166V19.1688ZM65.6645 12.6079C66.4983 12.6079 67.0541 11.8561 67.0541 10.9673C67.0541 10.0622 66.4983 9.32715 65.6645 9.32715C64.8306 9.32715 64.2749 10.0622 64.2749 10.9678C64.2749 11.8561 64.8306 12.6079 65.6645 12.6079ZM59.0045 5.79075C58.1414 5.79075 57.425 4.95338 57.425 3.94538C57.425 2.93738 58.1414 2.1 59.0045 2.1C59.8676 2.1 60.5844 2.93738 60.5844 3.94538C60.5844 4.95338 59.8676 5.79075 59.0045 5.79075ZM57.6882 6.69585H60.3212V15.2392H57.6882V6.69585ZM52.6365 15.4954C50.3546 15.4954 48.614 13.4453 48.614 10.9505C48.614 8.47298 50.3546 6.42285 52.6365 6.42285C54.9185 6.42285 56.6591 8.47298 56.6591 10.9505C56.6591 13.4453 54.9185 15.4954 52.6365 15.4954ZM52.6365 12.6079C53.4704 12.6079 54.0261 11.8561 54.0261 10.9673C54.0261 10.0622 53.4704 9.31035 52.6365 9.31035C51.8027 9.31035 51.2469 10.0622 51.2469 10.9673C51.2469 11.8561 51.8027 12.6079 52.6365 12.6079ZM43.6424 19.425C41.8289 19.425 40.5122 18.4853 39.8394 16.8105L42.0188 15.4439C42.2528 16.0251 42.6915 16.6231 43.5983 16.6231C44.5496 16.6231 45.1782 15.9222 45.2516 14.6921C44.9006 15.0512 44.3444 15.3242 43.511 15.3242C41.4774 15.3242 39.839 13.4962 39.839 10.9331C39.839 8.45618 41.58 6.43965 43.862 6.43965C46.2024 6.43965 47.8845 8.33648 47.8845 10.9505V14.3336C47.8845 17.409 46.0557 19.425 43.6424 19.425ZM43.8179 12.4373C44.6076 12.4373 45.2075 11.8046 45.2075 10.8649C45.2075 9.94245 44.6081 9.32715 43.8179 9.32715C43.0425 9.32715 42.4283 9.94245 42.4283 10.8654C42.4283 11.8052 43.0425 12.4373 43.8179 12.4373ZM35.3732 15.4954C33.0912 15.4954 31.3502 13.4453 31.3502 10.9505C31.3502 8.47298 33.0912 6.42285 35.3732 6.42285C37.6547 6.42285 39.3957 8.47298 39.3957 10.9505C39.3957 13.4453 37.6551 15.4954 35.3732 15.4954ZM35.3732 12.6079C36.207 12.6079 36.7628 11.8561 36.7628 10.9673C36.7628 10.0622 36.207 9.31035 35.3732 9.31035C34.5393 9.31035 33.9836 10.0622 33.9836 10.9673C33.9836 11.8561 34.5393 12.6079 35.3732 12.6079ZM26.5559 3.7065V12.3344H30.915V15.2392H26.19C24.5228 15.2392 23.85 14.2139 23.85 12.5906V3.7065H26.5559Z"
          className="fill-zinc-200"
        />
      </svg>
    </a>
  );
};
