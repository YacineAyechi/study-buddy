"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

const QuizView = ({ questions, documentId }) => {
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(null);
  const { getAuthToken } = useAuth();

  const handleAnswerSelect = (questionIndex, answerIndex) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionIndex]: answerIndex,
    }));
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q, index) => {
      if (userAnswers[index] === q.correctAnswer) {
        correct++;
      }
    });
    return {
      correct,
      total: questions.length,
      percentage: Math.round((correct / questions.length) * 100),
    };
  };

  const saveQuizScore = async (score) => {
    try {
      const token = getAuthToken();

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/quiz-scores`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            documentId,
            score: score.correct,
            totalQuestions: score.total,
          }),
          credentials: "include",
        }
      );

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error saving quiz score:", error);
    }
  };

  const handleSubmit = () => {
    const results = calculateScore();
    setScore(results);
    setShowResults(true);
    saveQuizScore(results);
  };

  const handleRetry = () => {
    setUserAnswers({});
    setShowResults(false);
    setScore(null);
  };

  return (
    <div className="space-y-6">
      {questions.map((question, index) => (
        <div
          key={index}
          className="rounded-lg border border-slate-200 p-4 md:p-6"
        >
          <div className="mb-4">
            <h3 className="text-base md:text-lg font-medium text-slate-800">
              {index + 1}. {question.question}
            </h3>
          </div>

          <div className="space-y-3">
            {question.options.map((option, optionIndex) => (
              <label
                key={optionIndex}
                className={`flex cursor-pointer items-center rounded-lg border p-3 md:p-4 transition-colors ${
                  showResults
                    ? userAnswers[index] === optionIndex
                      ? userAnswers[index] === question.correctAnswer
                        ? "border-green-500 bg-green-50"
                        : "border-red-500 bg-red-50"
                      : question.correctAnswer === optionIndex
                      ? "border-green-500 bg-green-50"
                      : "border-slate-200"
                    : userAnswers[index] === optionIndex
                    ? "border-[--poppy] bg-[--poppy]/5"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <input
                  type="radio"
                  name={`question-${index}`}
                  value={optionIndex}
                  checked={userAnswers[index] === optionIndex}
                  onChange={() => handleAnswerSelect(index, optionIndex)}
                  disabled={showResults}
                  className="sr-only"
                />
                <span className="text-sm md:text-base text-slate-700">
                  {option}
                </span>
              </label>
            ))}
          </div>

          {showResults && (
            <div className="mt-4 text-xs md:text-sm">
              {userAnswers[index] === question.correctAnswer ? (
                <p className="text-green-600">Correct!</p>
              ) : (
                <p className="text-red-600">
                  Incorrect. The correct answer was:{" "}
                  {question.options[question.correctAnswer]}
                </p>
              )}
            </div>
          )}
        </div>
      ))}

      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        {showResults ? (
          <>
            <div className="text-base md:text-lg font-medium order-2 md:order-1">
              Your score: {score.correct}/{score.total} ({score.percentage}%)
            </div>
            <button
              onClick={handleRetry}
              className="w-full md:w-auto order-1 md:order-2 rounded-md bg-[--poppy] px-4 py-2 text-sm md:text-base text-white hover:bg-[--poppy-dark] transition-colors"
            >
              Try Again
            </button>
          </>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={Object.keys(userAnswers).length !== questions.length}
            className="w-full md:w-auto rounded-md bg-[--poppy] px-4 py-2 text-sm md:text-base text-white hover:bg-[--poppy-dark] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit Quiz
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizView;
