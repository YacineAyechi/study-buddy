"use client";

import React from "react";
import { motion } from "framer-motion";

const Features = () => {
  return (
    <section className="mx-auto px-4 md:px-40 py-12 bg-[--delft-blue] text-slate-800">
      <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end md:px-8">
        <h2 className="max-w-lg text-4xl font-bold md:text-5xl text-slate-50">
          Smart features for
          <span className="text-slate-300"> smarter studying</span>
          <div className="border-2 border-[--poppy] mt-3 rounded-full"></div>
        </h2>
      </div>
      <div className="mb-4 grid grid-cols-12 gap-4">
        <BounceCard className="col-span-12 md:col-span-4">
          <CardTitle>AI-Powered Summaries</CardTitle>
          <div className="absolute bottom-0 left-4 right-4 top-32 translate-y-8 rounded-t-2xl p-4 bg-[--non-photo-blue]  transition-transform duration-[250ms] group-hover:translate-y-4 group-hover:rotate-[2deg]">
            <span className="block text-center font-semibold text-white">
              Get instant, comprehensive summaries of any document, highlighting
              key concepts and main ideas
            </span>
          </div>
        </BounceCard>
        <BounceCard className="col-span-12 md:col-span-8">
          <CardTitle>Smart Quiz Generation</CardTitle>
          <div className="absolute bottom-0 left-4 right-4 top-32 translate-y-8 rounded-t-2xl p-4 bg-[--non-photo-blue] transition-transform duration-[250ms] group-hover:translate-y-4 group-hover:rotate-[2deg]">
            <span className="block text-center font-semibold text-white">
              AI creates personalized quizzes that adapt to your knowledge level
              and learning progress
            </span>
          </div>
        </BounceCard>
      </div>
      <div className="grid grid-cols-12 gap-4">
        <BounceCard className="col-span-12 md:col-span-8">
          <CardTitle>Interactive Flashcards</CardTitle>
          <div className="absolute bottom-0 left-4 right-4 top-32 translate-y-8 rounded-t-2xl p-4 bg-[--non-photo-blue] transition-transform duration-[250ms] group-hover:translate-y-4 group-hover:rotate-[2deg]">
            <span className="block text-center font-semibold text-white">
              Dynamic flashcard sets generated from your documents with spaced
              repetition learning
            </span>
          </div>
        </BounceCard>
        <BounceCard className="col-span-12 md:col-span-4">
          <CardTitle>Daily Study Quotes</CardTitle>
          <div className="absolute bottom-0 left-4 right-4 top-32 translate-y-8 rounded-t-2xl p-4 bg-[--non-photo-blue] transition-transform duration-[250ms] group-hover:translate-y-4 group-hover:rotate-[2deg]">
            <span className="block text-center font-semibold text-white">
              Get inspired with two fresh educational quotes every day,
              carefully selected to motivate your learning journey
            </span>
          </div>
        </BounceCard>
      </div>
    </section>
  );
};

export default Features;

const BounceCard = ({ className, children }) => {
  return (
    <motion.div
      whileHover={{ scale: 0.95, rotate: "-1deg" }}
      className={`group relative min-h-[300px] cursor-pointer overflow-hidden rounded-2xl bg-slate-100 p-8  ${className}`}
    >
      {children}
    </motion.div>
  );
};

const CardTitle = ({ children }) => {
  return (
    <h3 className="mx-auto text-center text-3xl font-semibold">{children}</h3>
  );
};
