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

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const validateForm = () => {
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password,
          }),
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Registration failed");
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
            animate="animate"
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
                Create your account
              </motion.h1>

              <form onSubmit={handleSubmit} className="w-full">
                <div className="flex gap-4">
                  <motion.div variants={primaryVariants} className="mb-2 w-1/2">
                    <label
                      htmlFor="firstName"
                      className="mb-1 inline-block text-sm font-medium"
                    >
                      First Name<span className="text-red-600">*</span>
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      placeholder="Enter your First Name"
                      className="w-full rounded border-[1px] border-slate-300 px-2.5 py-1.5 focus:outline-[--poppy]"
                      required
                      value={formData.firstName}
                      onChange={(e) =>
                        setFormData({ ...formData, firstName: e.target.value })
                      }
                    />
                  </motion.div>

                  <motion.div variants={primaryVariants} className="mb-2 w-1/2">
                    <label
                      htmlFor="lastName"
                      className="mb-1 inline-block text-sm font-medium"
                    >
                      Last Name<span className="text-red-600">*</span>
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      placeholder="Enter your Last Name"
                      className="w-full rounded border-[1px] border-slate-300 px-2.5 py-1.5 focus:outline-[--poppy]"
                      required
                      value={formData.lastName}
                      onChange={(e) =>
                        setFormData({ ...formData, lastName: e.target.value })
                      }
                    />
                  </motion.div>
                </div>

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
                    requiredvalue={formData.email}
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

                <motion.div variants={primaryVariants} className="mb-4 w-full">
                  <label
                    htmlFor="rt-password-input"
                    className="mb-1 inline-block text-sm font-medium"
                  >
                    Re-type Password<span className="text-red-600">*</span>
                  </label>
                  <input
                    id="rt-password-input"
                    type="password"
                    placeholder="Re-type your password"
                    className="w-full rounded border-[1px] border-slate-300 px-2.5 py-1.5 focus:outline-[--poppy]"
                    required
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
                    }
                  />
                </motion.div>

                <motion.div
                  variants={primaryVariants}
                  className="mb-4 flex w-full items-start gap-1.5"
                >
                  <input
                    type="checkbox"
                    id="terms-checkbox"
                    className="h-4 w-4 accent-[--poppy]"
                    required
                  />
                  <label htmlFor="terms-checkbox" className="text-xs">
                    By signing up, I agree to the terms and conditions, privacy
                    policy.
                  </label>
                </motion.div>

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
                  Sign up
                </motion.button>
                <motion.p variants={primaryVariants} className="text-xs">
                  Already have an account?{" "}
                  <Link className="text-[--poppy] underline" href="/sign-in">
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

export default RegisterPage;
