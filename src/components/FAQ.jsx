"use client";

import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { motion } from "framer-motion";
import useMeasure from "react-use-measure";

const FAQ = () => {
  return (
    <div className="px-4 py-40">
      <div className="mx-auto max-w-3xl">
        <h3 className="mb-4 text-center text-3xl font-semibold text-black">
          Frequently asked questions
        </h3>
        <Question title="How does the AI summarization work?" defaultOpen>
          <p>
            Our AI technology analyzes your uploaded documents, identifying key
            concepts, main ideas, and important details. It then generates
            comprehensive summaries that maintain the core meaning while being
            concise and easy to understand. The AI adapts to different types of
            content, from textbooks to research papers.
          </p>
        </Question>
        <Question title="What file formats are supported?">
          <p>
            Currently, we support PDF documents, plain text files (.txt), and
            Word documents (.doc, .docx). We&apos;re constantly working to
            expand our supported file formats to accommodate more document types
            and make our platform more accessible.
          </p>
        </Question>
        <Question title="How accurate are the AI-generated quizzes?">
          <p>
            Our AI-generated quizzes are highly accurate as they&apos;re created
            directly from your uploaded content. The system uses advanced
            natural language processing to generate relevant questions that test
            your understanding of key concepts. Questions are also reviewed and
            refined based on user feedback to ensure quality.
          </p>
        </Question>
      </div>
    </div>
  );
};

const Question = ({ title, children, defaultOpen = false }) => {
  const [ref, { height }] = useMeasure();
  const [open, setOpen] = useState(defaultOpen);

  return (
    <motion.div
      animate={open ? "open" : "closed"}
      className="border-b-[1px] border-b-slate-300"
    >
      <button
        onClick={() => setOpen((pv) => !pv)}
        className="flex w-full items-center justify-between gap-4 py-6"
      >
        <motion.span
          variants={{
            open: {
              color: "#d64045ff",
            },
            closed: {
              color: "rgba(3, 6, 23, 1)",
            },
          }}
          className="text-[--poppy] text-left text-lg font-medium"
        >
          {title}
        </motion.span>
        <motion.span
          variants={{
            open: {
              rotate: "180deg",
              color: "#d64045ff",
            },
            closed: {
              rotate: "0deg",
              color: "#030617",
            },
          }}
        >
          <FiChevronDown className="text-2xl" />
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{
          height: open ? height : "0px",
          marginBottom: open ? "24px" : "0px",
        }}
        className="overflow-hidden text-slate-600"
      >
        <div ref={ref}>{children}</div>
      </motion.div>
    </motion.div>
  );
};

export default FAQ;
