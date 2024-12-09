"use client";

import { useState } from "react";

const FlashCardView = ({ flashcards }) => {
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showProgress, setShowProgress] = useState(true);

  const handleNext = (e) => {
    e.stopPropagation();
    if (currentCard < flashcards.length - 1) {
      setCurrentCard((prev) => prev + 1);
      setIsFlipped(false);
    }
  };

  const handlePrevious = (e) => {
    e.stopPropagation();
    if (currentCard > 0) {
      setCurrentCard((prev) => prev - 1);
      setIsFlipped(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      {showProgress && (
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-slate-600">
            Card {currentCard + 1} of {flashcards.length}
          </p>
          <div className="h-2 flex-1 mx-4 rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-[--poppy] transition-all duration-300"
              style={{
                width: `${((currentCard + 1) / flashcards.length) * 100}%`,
              }}
            />
          </div>
        </div>
      )}

      <div className="mx-auto max-w-md">
        <div
          className="perspective-1000"
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <div
            className={`relative transform-style-3d transition-transform duration-500 cursor-pointer ${
              isFlipped ? "rotate-y-180" : ""
            }`}
          >
            <div className="flex items-center justify-center mx-auto min-h-[300px] rounded-xl bg-white p-8 shadow-lg backface-hidden">
              <div className="flex h-full flex-col items-center justify-center text-center">
                <p className="text-xl font-medium text-slate-800">
                  {flashcards[currentCard].front}
                </p>
                <p className="mt-4 text-sm text-slate-500">Click to flip</p>
              </div>
            </div>

            <div className="absolute inset-0 min-h-[300px] rounded-xl bg-white p-8 shadow-lg backface-hidden rotate-y-180">
              <div className="flex h-full flex-col items-center justify-center text-center">
                <p className="text-xl font-medium text-slate-800">
                  {flashcards[currentCard].back}
                </p>
                <p className="mt-4 text-sm text-slate-500">
                  Click to flip back
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-center gap-4">
        <button
          onClick={handlePrevious}
          disabled={currentCard === 0}
          className="flex items-center gap-2 rounded-md bg-white px-4 py-2 text-slate-700 shadow-sm transition-colors hover:bg-slate-50 disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={currentCard === flashcards.length - 1}
          className="flex items-center gap-2 rounded-md bg-white px-4 py-2 text-slate-700 shadow-sm transition-colors hover:bg-slate-50 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default FlashCardView;
