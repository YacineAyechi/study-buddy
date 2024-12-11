"use client";

import NavbarDashboard from "@/components/dashboard/NavbarDashboard";
import React, { useState } from "react";
import {
  FiUploadCloud,
  FiChevronRight,
  FiBook,
  FiList,
  FiCreditCard,
  FiSave,
  FiEye,
} from "react-icons/fi";
import { useRouter } from "next/navigation";
import QuizView from "@/components/dashboard/QuizView";
import FlashCardView from "@/components/dashboard/FlashCardView";
import { useAuth } from "@/contexts/AuthContext";

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

const Upload = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [documentId, setDocumentId] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [generatedContent, setGeneratedContent] = useState({
    summary: "",
    quiz: [],
    flashcards: [],
  });
  const [tokensRemaining, setTokensRemaining] = useState(null);
  const { user, getAuthToken } = useAuth();

  const router = useRouter();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    const allowedTypes = [
      "application/pdf",
      "text/plain",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    setError("");

    if (selectedFile) {
      if (!allowedTypes.includes(selectedFile.type)) {
        setError(
          "Invalid file type. Please upload PDF, TXT, or DOCX files only."
        );
        setFile(null);
        return;
      }

      if (selectedFile.size > maxSize) {
        setError("File size exceeds 10MB limit.");
        setFile(null);
        return;
      }

      setFile(selectedFile);
    }
  };

  const handleNextStep = async () => {
    if (currentStep === 1 && file) {
      setIsProcessing(true);
      try {
        const formData = new FormData();
        formData.append("file", file);

        const token = getAuthToken();

        if (!token) {
          throw new Error("No authentication token found");
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/process-document`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
            credentials: "include",
          }
        );

        const data = await response.json();

        if (!response.ok) {
          if (data.error.includes("Daily document limit reached")) {
            throw new Error(
              "You've reached your daily document limit. ✨ Upgrade to Pro for more uploads! ✨"
            );
          }
          throw new Error(data.error || "Failed to process document");
        }

        setDocumentId(data.documentId);
        setGeneratedContent({
          summary: data.summary,
          quiz: parseQuiz(data.quiz),
          flashcards:
            typeof data.flashcards === "string"
              ? JSON.parse(data.flashcards).cards
              : data.flashcards.cards || [],
        });
        setCurrentStep(2);
        setTokensRemaining(data.tokensRemaining);
      } catch (error) {
        setError(error.message);
        if (!error.message.includes("document limit")) {
          console.error("Processing error:", error);
        }
      }
      setIsProcessing(false);
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleSave = () => {
    if (documentId) {
      router.push(`/documents/${documentId}`);
    } else {
      setError("Document ID not found. Please try again.");
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <UploadStep
            file={file}
            error={error}
            handleFileChange={handleFileChange}
            isProcessing={isProcessing}
          />
        );
      case 2:
        return <SummaryStep summary={generatedContent.summary} />;
      case 3:
        return (
          <QuizStep quiz={generatedContent.quiz} documentId={documentId} />
        );
      case 4:
        return (
          <FlashcardsStep
            flashcards={generatedContent.flashcards}
            onSave={handleSave}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-indigo-50">
      <NavbarDashboard />
      <div className="flex-1 p-4 md:p-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-4 md:mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4 md:mb-0">
              Upload Document
            </h1>
            <div className="flex items-center gap-2">
              <StepIndicator currentStep={currentStep} totalSteps={4} />
            </div>
          </div>

          <div className="rounded-lg bg-white p-4 md:p-8 shadow-sm">
            {tokensRemaining !== null && (
              <TokenDisplay tokens={tokensRemaining} plan={user?.plan} />
            )}
            {renderStep()}

            {currentStep < 4 && file && !isProcessing && (
              <div className="mt-6 flex justify-center md:justify-end">
                <button
                  onClick={handleNextStep}
                  className="w-full md:w-auto flex items-center justify-center gap-2 rounded bg-[--poppy] px-4 py-2 text-white hover:bg-[--poppy-dark]"
                >
                  {currentStep === 1 ? "Process Document" : "Next"}
                  <FiChevronRight />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const StepIndicator = ({ currentStep, totalSteps }) => {
  return (
    <div className="flex items-center gap-2">
      {[...Array(totalSteps)].map((_, i) => (
        <div
          key={i}
          className={`h-2 w-8 rounded-full ${
            i + 1 <= currentStep ? "bg-[--poppy]" : "bg-slate-200"
          }`}
        />
      ))}
    </div>
  );
};

const UploadStep = ({ file, error, handleFileChange, isProcessing }) => {
  return (
    <div className="text-center">
      <FiUploadCloud className="mx-auto text-6xl text-[--poppy]" />
      <h2 className="mt-4 text-xl font-semibold">
        {file ? file.name : "Drag and drop your document"}
      </h2>
      <p className="mt-2 text-sm text-slate-600">
        Supported formats: PDF, TXT, DOCX
      </p>

      <div className="relative mt-4">
        <input
          type="file"
          accept=".pdf,.txt,.docx"
          className="absolute inset-0 cursor-pointer opacity-0"
          onChange={handleFileChange}
          disabled={isProcessing}
        />
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 p-6 transition-colors hover:border-[--poppy]">
          <p className="text-sm text-slate-600">
            Click to browse or drag and drop your file
          </p>
          <button className="mt-4 rounded bg-[--poppy] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[--poppy-dark]">
            Select File
          </button>
        </div>
      </div>

      {error && (
        <div className="mt-4 text-center text-sm text-red-500">{error}</div>
      )}

      {isProcessing && (
        <div className="mt-4 text-center text-sm text-slate-600">
          Processing your document... Please wait.
        </div>
      )}
    </div>
  );
};

const SummaryStep = ({ summary }) => {
  return (
    <div>
      <div className="mb-4 flex items-center gap-2">
        <FiBook className="text-xl md:text-2xl text-[--poppy]" />
        <h2 className="text-lg md:text-xl font-semibold">Document Summary</h2>
      </div>
      <div className="rounded-lg border border-slate-200 p-3 md:p-4">
        <p className="text-sm md:text-base text-slate-600">{summary}</p>
      </div>
    </div>
  );
};

const QuizStep = ({ quiz, documentId }) => {
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FiList className="text-xl md:text-2xl text-[--poppy]" />
          <h2 className="text-lg md:text-xl font-semibold">Generated Quiz</h2>
        </div>
      </div>
      <div className="rounded-lg bg-slate-50 p-4 md:p-6">
        <QuizView questions={quiz} documentId={documentId} />
      </div>
    </div>
  );
};

const FlashcardsStep = ({ flashcards, onSave }) => {
  return (
    <div>
      <div className="mb-4 flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-0">
        <div className="flex items-center gap-2">
          <FiCreditCard className="text-xl md:text-2xl text-[--poppy]" />
          <h2 className="text-lg md:text-xl font-semibold">Flashcards</h2>
        </div>
        <button
          onClick={onSave}
          className="w-full md:w-auto flex items-center justify-center gap-2 rounded bg-[--poppy] px-4 py-2 text-white hover:bg-[--poppy-dark]"
        >
          <FiEye className="h-4 w-4" /> View Full Document
        </button>
      </div>
      <div className="rounded-lg bg-slate-50 p-4 md:p-6">
        <FlashCardView flashcards={flashcards} />
      </div>
    </div>
  );
};

const TokenDisplay = ({ tokens, plan }) => {
  return (
    <div className="mb-4 text-sm text-slate-600">
      <p>
        Remaining uploads: <span className="font-bold">{tokens}</span>
        {plan === "free" ? " (resets daily)" : " (resets monthly)"}
      </p>
    </div>
  );
};

export default Upload;
