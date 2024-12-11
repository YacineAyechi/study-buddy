"use client";

import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

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
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm md:text-base text-slate-600">
          Card {currentCard + 1} of {flashcards.length}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevious}
            disabled={currentCard === 0}
            className="rounded-lg border border-slate-200 p-2 text-slate-600 transition-colors hover:bg-slate-50 disabled:opacity-50"
          >
            <FiChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={handleNext}
            disabled={currentCard === flashcards.length - 1}
            className="rounded-lg border border-slate-200 p-2 text-slate-600 transition-colors hover:bg-slate-50 disabled:opacity-50"
          >
            <FiChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

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
            <div className="flex items-center justify-center mx-auto min-h-[200px] md:min-h-[300px] rounded-xl bg-white p-4 md:p-8 shadow-lg backface-hidden">
              <div className="flex h-full flex-col items-center justify-center text-center">
                <p className="text-base md:text-xl font-medium text-slate-800">
                  {flashcards[currentCard].front}
                </p>
                <p className="mt-4 text-xs md:text-sm text-slate-500">
                  Click to flip
                </p>
              </div>
            </div>

            <div className="absolute inset-0 min-h-[200px] md:min-h-[300px] rounded-xl bg-white p-4 md:p-8 shadow-lg backface-hidden rotate-y-180">
              <div className="flex h-full flex-col items-center justify-center text-center">
                <p className="text-base md:text-xl font-medium text-slate-800">
                  {flashcards[currentCard].back}
                </p>
                <p className="mt-4 text-xs md:text-sm text-slate-500">
                  Click to flip back
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashCardView;
