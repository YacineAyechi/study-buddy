"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

const primaryVariants = {
  initial: {
    y: 25,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
  },
  exit: {
    y: -25,
    opacity: 0,
  },
};

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      document.cookie = `token=${data.token}; path=/`;
      window.location.href = "/dashboard";
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.section
        key="register"
        initial="initial"
        animate="animate"
        exit="exit"
        className="grid min-h-screen place-items-center bg-slate-50"
      >
        <div className="w-full max-w-[500px] px-4">
          <motion.div
            initial={false}
            whileInView="animate"
            transition={{
              staggerChildren: 0.05,
            }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center"
          >
            <Link href="/" className="mb-8">
              <Image src="/logo.png" alt="Logo" width={220} height={220} />
            </Link>

            <div className="w-full">
              <motion.h1
                variants={primaryVariants}
                className="mb-4 text-center text-4xl font-semibold"
              >
                Sign In to Your Account
              </motion.h1>

              <form onSubmit={handleSubmit} className="w-full">
                <motion.div variants={primaryVariants} className="mb-2 w-full">
                  <label
                    htmlFor="email-input"
                    className="mb-1 inline-block text-sm font-medium"
                  >
                    Email<span className="text-red-600">*</span>
                  </label>
                  <input
                    id="email-input"
                    type="email"
                    placeholder="Enter your email"
                    className="w-full rounded border-[1px] border-slate-300 px-2.5 py-1.5 focus:outline-[--poppy]"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </motion.div>

                <motion.div variants={primaryVariants} className="mb-2 w-full">
                  <label
                    htmlFor="password-input"
                    className="mb-1 inline-block text-sm font-medium"
                  >
                    Password<span className="text-red-600">*</span>
                  </label>
                  <input
                    id="password-input"
                    type="password"
                    placeholder="Enter your password"
                    className="w-full rounded border-[1px] border-slate-300 px-2.5 py-1.5 focus:outline-[--poppy]"
                    required
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                </motion.div>

                <motion.p variants={primaryVariants} className="text-xs mb-2">
                  Forgot your password ?{" "}
                  <Link
                    className="text-[--poppy] underline"
                    href="/reset-password"
                  >
                    Reset Password
                  </Link>
                </motion.p>

                {error && (
                  <div className="text-center text-sm text-red-600">
                    {error}
                  </div>
                )}

                <motion.button
                  variants={primaryVariants}
                  whileTap={{
                    scale: 0.985,
                  }}
                  type="submit"
                  className="mb-1.5 w-full rounded bg-[--poppy] px-4 py-2 text-center font-medium text-white transition-colors hover:bg-[--poppy-dark]"
                >
                  Sign In
                </motion.button>
                <motion.p variants={primaryVariants} className="text-xs">
                  Don&apos; have an account?{" "}
                  <Link className="text-[--poppy] underline" href="/sign-up">
                    Sign Up
                  </Link>
                </motion.p>
              </form>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </AnimatePresence>
  );
};

export default LoginPage;
