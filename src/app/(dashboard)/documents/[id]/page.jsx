"use client";

import NavbarDashboard from "@/components/dashboard/NavbarDashboard";
import React, { useState, useEffect } from "react";
import { FiBook, FiList, FiCreditCard } from "react-icons/fi";
import { useParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import FlashCardView from "@/components/dashboard/FlashCardView";
import QuizView from "@/components/dashboard/QuizView";
import Loading from "@/app/loading";

const DocumentPage = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("summary");
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);
  const { user, getAuthToken } = useAuth();

  const parseQuiz = (quizString) => {
    try {
      const data =
        typeof quizString === "string" ? JSON.parse(quizString) : quizString;
      return data.questions || [];
    } catch (error) {
      console.error("Error parsing quiz:", error);
      return [];
    }
  };

  const parseFlashcards = (flashcardsString) => {
    try {
      const data =
        typeof flashcardsString === "string"
          ? JSON.parse(flashcardsString)
          : flashcardsString;
      return data.cards || [];
    } catch (error) {
      console.error("Error parsing flashcards:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const token = getAuthToken();

        if (!token) {
          throw new Error("No authentication token found");
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/documents/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch document");
        }

        const data = await response.json();

        // Parse the quiz and flashcards data safely
        const parsedDocument = {
          id: data.id,
          title: data.original_name,
          createdAt: data.upload_date,
          content: {
            summary: data.summary,
            quiz: parseQuiz(data.quiz),
            flashcards: parseFlashcards(data.flashcards),
          },
        };

        setDocument(parsedDocument);
      } catch (error) {
        console.error("Error fetching document:", error);
        setError(error.message);
      }
    };

    if (id) {
      fetchDocument();
    }
  }, [id, getAuthToken]);

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (!document) {
    return <Loading />;
  }

  return (
    <div className="flex min-h-screen bg-indigo-50">
      <NavbarDashboard />
      <div className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">
            {document.title}
          </h1>
          <p className="text-slate-600">
            Created on {new Date(document.createdAt).toLocaleDateString()}
          </p>
        </div>

        <div className="mb-6 flex gap-4 border-b">
          <TabButton
            active={activeTab === "summary"}
            onClick={() => setActiveTab("summary")}
            icon={<FiBook />}
            label="Summary"
          />
          <TabButton
            active={activeTab === "quiz"}
            onClick={() => setActiveTab("quiz")}
            icon={<FiList />}
            label="Quiz"
          />
          <TabButton
            active={activeTab === "flashcards"}
            onClick={() => setActiveTab("flashcards")}
            icon={<FiCreditCard />}
            label="Flashcards"
          />
        </div>

        <div className="rounded-lg bg-white p-6 shadow-sm">
          {activeTab === "summary" && (
            <div className="prose max-w-none">
              <p>{document.content.summary}</p>
            </div>
          )}

          {activeTab === "quiz" && (
            <div className="rounded-lg bg-slate-50 p-6">
              <QuizView
                questions={document.content.quiz}
                documentId={document.id}
              />
            </div>
          )}

          {activeTab === "flashcards" && (
            <div className="rounded-lg bg-slate-50 p-6">
              <FlashCardView flashcards={document.content.flashcards} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const TabButton = ({ active, onClick, icon, label }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 border-b-2 px-4 py-2 transition-colors ${
        active
          ? "border-[--poppy] text-[--poppy]"
          : "border-transparent text-slate-600 hover:text-[--poppy]"
      }`}
    >
      {icon}
      {label}
    </button>
  );
};

export default DocumentPage;
