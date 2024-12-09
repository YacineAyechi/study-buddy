"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const VerifyEmail = () => {
  const [status, setStatus] = useState("Verifying...");
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/verify-email/${token}`
        );
        const data = await response.json();

        if (response.ok) {
          setStatus("Email verified successfully! Redirecting to login...");
          setTimeout(() => router.push("/sign-in"), 2000);
        } else {
          setStatus(data.error || "Verification failed");
        }
      } catch (error) {
        setStatus("Error verifying email");
      }
    };

    if (token) {
      verifyEmail();
    }
  }, [token, router]);

  return (
    <div className="grid min-h-screen place-items-center bg-slate-50">
      <div className="text-center">
        <h1 className="mb-4 text-2xl font-bold">{status}</h1>
      </div>
    </div>
  );
};

export default VerifyEmail;
