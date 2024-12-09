"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

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

const ResetPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus({ type: "", message: "" });

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setStatus({
          type: "success",
          message: "Password reset instructions have been sent to your email",
        });
        setEmail("");
      } else {
        setStatus({
          type: "error",
          message: data.error || "Failed to send reset password email",
        });
      }
    } catch (error) {
      setStatus({
        type: "error",
        message: "An error occurred. Please try again later.",
      });
    } finally {
      setIsLoading(false);
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
                Reset Your Password
              </motion.h1>

              <motion.p
                variants={primaryVariants}
                className="mb-6 text-center text-slate-600"
              >
                Enter your email address and we&apos;ll send you instructions to
                reset your password.
              </motion.p>

              <form onSubmit={handleSubmit} className="w-full">
                <motion.div variants={primaryVariants} className="mb-4 w-full">
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </motion.div>

                {status.message && (
                  <motion.div
                    variants={primaryVariants}
                    className={`mb-4 rounded p-3 text-sm ${
                      status.type === "success"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {status.message}
                  </motion.div>
                )}

                <motion.button
                  variants={primaryVariants}
                  whileTap={{
                    scale: 0.985,
                  }}
                  type="submit"
                  disabled={isLoading}
                  className="mb-4 w-full rounded bg-[--poppy] px-4 py-2 text-center font-medium text-white transition-colors hover:bg-[--poppy-dark] disabled:opacity-70"
                >
                  {isLoading ? "Sending..." : "Reset Password"}
                </motion.button>

                <motion.p
                  variants={primaryVariants}
                  className="text-center text-sm"
                >
                  Remember your password?{" "}
                  <Link
                    href="/sign-in"
                    className="text-[--poppy] hover:underline"
                  >
                    Sign in
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

export default ResetPasswordPage;
