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
      {questions.map((q, i) => (
        <div
          key={i}
          className="rounded-lg border border-slate-200 p-6 bg-white shadow-sm"
        >
          <p className="mb-4 text-lg font-medium text-slate-800">
            {i + 1}. {q.question}
          </p>
          <div className="space-y-3">
            {q.options.map((option, j) => (
              <div key={j} className="flex items-center gap-3">
                <input
                  type="radio"
                  name={`question-${i}`}
                  id={`q${i}-${j}`}
                  checked={userAnswers[i] === j}
                  onChange={() => handleAnswerSelect(i, j)}
                  disabled={showResults}
                  className="h-4 w-4 text-[--poppy] focus:ring-[--poppy]"
                />
                <label
                  htmlFor={`q${i}-${j}`}
                  className={`${
                    showResults
                      ? j === q.correctAnswer
                        ? "text-green-600 font-medium"
                        : userAnswers[i] === j
                        ? "text-red-600"
                        : "text-slate-700"
                      : "text-slate-700"
                  }`}
                >
                  {option}
                </label>
              </div>
            ))}
          </div>
          {showResults && userAnswers[i] !== q.correctAnswer && (
            <p className="mt-2 text-sm text-red-600">
              Correct answer: {q.options[q.correctAnswer]}
            </p>
          )}
        </div>
      ))}

      <div className="flex justify-between items-center">
        {showResults ? (
          <>
            <div className="text-lg font-medium">
              Your score: {score.correct}/{score.total} ({score.percentage}%)
            </div>
            <button
              onClick={handleRetry}
              className="rounded-md bg-[--poppy] px-6 py-2 text-white hover:bg-[--poppy-dark] transition-colors"
            >
              Try Again
            </button>
          </>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={Object.keys(userAnswers).length !== questions.length}
            className="rounded-md bg-[--poppy] px-6 py-2 text-white hover:bg-[--poppy-dark] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit Quiz
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizView;
