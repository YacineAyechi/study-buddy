"use client";

import React, { useState, useEffect } from "react";
import {
  FiBook,
  FiClock,
  FiTrendingUp,
  FiMessageSquare,
  FiUser,
} from "react-icons/fi";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { RiCoinLine } from "react-icons/ri";

const DashboardContent = () => {
  const { user, getAuthToken } = useAuth();

  const [studyTime, setStudyTime] = useState("0 hrs");
  const [totalDocuments, setTotalDocuments] = useState(0);
  const [averageQuizScore, setAverageQuizScore] = useState(0);
  const [dailyQuotes, setDailyQuotes] = useState([]);

  useEffect(() => {
    const updateSession = async () => {
      try {
        const token = getAuthToken();

        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sessions/update`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });
      } catch (error) {
        console.error("Error updating session:", error);
      }
    };

    const fetchStudyTime = async () => {
      try {
        const token = getAuthToken();

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/sessions/study-time`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            credentials: "include",
          }
        );

        const data = await response.json();
        const displayTime =
          data.hours >= 1
            ? `${data.hours}.${data.minutes} hrs`
            : `${data.minutes} mins`;
        setStudyTime(displayTime);
      } catch (error) {
        console.error("Error fetching study time:", error);
      }
    };

    const fetchDocumentStats = async () => {
      try {
        const token = getAuthToken();

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/history`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            credentials: "include",
          }
        );

        const documents = await response.json();
        setTotalDocuments(documents.length);
      } catch (error) {
        console.error("Error fetching document stats:", error);
      }
    };

    const fetchQuizAverage = async () => {
      try {
        const token = getAuthToken();

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/quiz-scores/average`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            credentials: "include",
          }
        );

        const data = await response.json();
        setAverageQuizScore(data.averageScore || 0);
      } catch (error) {
        console.error("Error fetching quiz average:", error);
        setAverageQuizScore(0);
      }
    };

    const fetchDailyQuotes = async () => {
      try {
        const token = getAuthToken();

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/daily-quotes`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            credentials: "include",
          }
        );

        const data = await response.json();
        if (data.quotes && data.quotes.length > 0) {
          setDailyQuotes(data.quotes);
          return;
        }

        const today = new Date().toISOString().split("T")[0];
        const seed = parseInt(user?._id + today.replace(/-/g, ""));

        const response1 = await fetch(
          `https://api.api-ninjas.com/v1/quotes?category=education&offset=${
            seed % 50
          }`,
          {
            headers: {
              "X-Api-Key": process.env.NEXT_PUBLIC_QUOTE_API_KEY,
            },
          }
        );

        const response2 = await fetch(
          `https://api.api-ninjas.com/v1/quotes?category=education&offset=${
            (seed + 1) % 50
          }`,
          {
            headers: {
              "X-Api-Key": process.env.NEXT_PUBLIC_QUOTE_API_KEY,
            },
          }
        );

        const quotes1 = await response1.json();
        const quotes2 = await response2.json();
        const newQuotes = [quotes1[0], quotes2[0]];

        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/daily-quotes`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
          body: JSON.stringify({ quotes: newQuotes }),
        });

        setDailyQuotes(newQuotes);
      } catch (error) {
        console.error("Error fetching quotes:", error);
      }
    };

    fetchStudyTime();
    fetchDocumentStats();
    fetchQuizAverage();

    const sessionInterval = setInterval(updateSession, 30000);

    const displayInterval = setInterval(fetchStudyTime, 60000);

    if (user?._id) {
      fetchDailyQuotes();
    }

    return () => {
      clearInterval(sessionInterval);
      clearInterval(displayInterval);
    };
  }, [user?._id]);

  return (
    <div className="flex-1 p-4 md:p-8 pb-0">
      <div className="mb-4 md:mb-8 flex items-center gap-2">
        <FiUser className="text-xl md:text-2xl text-[--poppy]" />
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
            Welcome back, {user?.firstName}
          </h1>
          <p className="text-sm md:text-base text-slate-600">
            Ready to continue your learning journey?
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-4 md:mb-8">
        <StatCard
          icon={<FiBook />}
          title="Study Sessions"
          value={user?.loginCount?.toString()}
          subtitle="Total logins"
        />
        <StatCard
          icon={<FiClock />}
          title="Study Time"
          value={studyTime}
          subtitle="Total time"
        />
        <StatCard
          icon={<RiCoinLine />}
          title="Document Credits"
          value={`${user?.tokens || 0}/${user?.plan === "free" ? "2" : "10"}`}
          subtitle={`${user?.plan === "free" ? "Daily" : "Monthly"} limit`}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-5">
        <div className="rounded-lg bg-white p-4 md:p-6 shadow-sm">
          <h2 className="text-lg md:text-xl font-semibold mb-4">Study Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            <Link href="/history" className="sm:col-span-2">
              <FeatureCard
                title="Documents"
                count={totalDocuments.toString()}
                subtitle="Total uploaded documents"
                icon={<FiBook className="text-xl md:text-2xl" />}
              />
            </Link>
            <Link href="/history" className="sm:col-span-2">
              <FeatureCard
                title="Quiz Performance"
                count={`${averageQuizScore}%`}
                subtitle="Average quiz score"
                icon={<FiBook className="text-xl md:text-2xl" />}
              />
            </Link>
          </div>
        </div>

        <div className="rounded-lg bg-white p-4 md:p-6 shadow-sm">
          <h2 className="text-lg md:text-xl font-semibold mb-4">
            Daily Study Quotes
          </h2>
          <div className="space-y-3 md:space-y-4">
            {dailyQuotes.map((quote, index) => (
              <InsightCard
                key={index}
                title={quote?.author || "Anonymous"}
                message={quote?.quote || "Loading..."}
                type={index === 0 ? "suggestion" : "analysis"}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center text-xs md:text-sm text-[--poppy] font-semibold mb-4 md:mb-0">
        <p>© LearnEngine - All rights reserved.</p>
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value, subtitle }) => {
  return (
    <div className="rounded-lg bg-white p-4 md:p-6 shadow-sm">
      <div className="flex items-center gap-3 md:gap-4">
        <div className="rounded-full bg-[--poppy]/10 p-3 md:p-4 text-[--poppy] text-xl md:text-2xl">
          {icon}
        </div>
        <div>
          <p className="text-sm text-slate-600">{title}</p>
          <p className="text-xl md:text-2xl font-bold">{value}</p>
          <p className="text-xs text-slate-500">{subtitle}</p>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ title, count, subtitle, icon }) => {
  return (
    <div className="rounded-lg border border-slate-200 p-3 md:p-4 hover:border-[--poppy] transition-colors cursor-pointer">
      <div className="flex flex-row items-center justify-center">
        <div className="flex flex-row items-center text-center gap-2 mb-2">
          <div className="rounded-full bg-[--poppy]/10 p-2 text-[--poppy]">
            {icon}
          </div>
          <span className="text-xl md:text-2xl font-bold">{count}</span>
        </div>
      </div>
      <div className="text-center">
        <h3 className="text-sm md:text-base font-medium">{title}</h3>
        <p className="text-xs md:text-sm text-slate-600">{subtitle}</p>
      </div>
    </div>
  );
};

const InsightCard = ({ title, message, type }) => {
  return (
    <div className="rounded-lg border border-slate-200 p-3 md:p-4">
      <h3 className="text-sm md:text-base font-medium mb-1 md:mb-2">{title}</h3>
      <p className="text-xs md:text-sm text-slate-600">{message}</p>
    </div>
  );
};

export default DashboardContent;
