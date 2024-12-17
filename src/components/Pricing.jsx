"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiCheckCircle, FiXSquare } from "react-icons/fi";
import SubscriptionButton from "./SubscriptionButton";
import Link from "next/link";

const Pricing = () => {
  const [selected, setSelected] = useState("annual");
  return (
    <div>
      <section className="mx-auto max-w-7xl px-2 py-24 md:px-4">
        <h2 className="mx-auto mb-4 max-w-2xl text-center text-4xl font-bold leading-[1.15] md:text-6xl md:leading-[1.15]">
          Pricing
        </h2>
        <Toggle selected={selected} setSelected={setSelected} />
        <div className="mt-6 grid grid-cols-1 gap-6 lg:mt-12 lg:grid-cols-2 lg:gap-8 max-w-4xl mx-auto">
          <PriceColumn
            title="Basic"
            price="0"
            statement="Perfect for students just getting started with AI-powered studying."
            highlight
            selected={selected}
            buttonText="Get Started" // Add buttonText prop
            items={[
              {
                children: "2 Documents per day",
                checked: true,
              },
              {
                children: "Basic AI Summaries",
                checked: true,
              },
              {
                children: "10 Quiz Questions Per Document",
                checked: true,
              },
              {
                children: "Basic Flashcards",
                checked: true,
              },
              {
                children: "Community Support",
                checked: true,
              },
            ]}
          />
          <PriceColumn
            title="Pro"
            price={selected === "monthly" ? "15" : "10"}
            statement="For serious students who want to maximize their study efficiency."
            highlight
            highlightTwo
            selected={selected}
            items={[
              {
                children: "10 Documents per month",
                checked: true,
              },
              {
                children: "Advanced AI Summaries",
                checked: true,
              },
              {
                children: "15 Quiz Questions Per Document",
                checked: true,
              },
              {
                children: "Advanced Flashcards",
                checked: true,
              },
              {
                children: "Priority Support",
                checked: true,
              },
            ]}
          />
        </div>
      </section>
    </div>
  );
};

export default Pricing;
const PriceColumn = ({
  highlight,
  highlightTwo,
  title,
  price,
  statement,
  items,
  selected,
  buttonText,
}) => {
  return (
    <div
      style={{
        boxShadow: highlight ? "0px 6px 0px rgb(24, 24, 27)" : "",
      }}
      className={`relative w-full rounded-lg p-6 md:p-8 ${
        highlight ? "border-2 border-zinc-900 bg-white" : ""
      }`}
    >
      {highlightTwo && (
        <span className="absolute right-4 top-0 -translate-y-1/2 rounded-full bg-[--poppy] px-2 py-0.5 text-sm text-white">
          Testing Stripe
        </span>
      )}

      <p className="mb-6 text-xl font-medium">{title}</p>
      <div className="mb-6 flex items-center gap-3">
        <AnimatePresence mode="popLayout">
          <motion.span
            initial={{
              y: 24,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: -24,
              opacity: 0,
            }}
            key={price}
            transition={{
              duration: 0.25,
              ease: "easeInOut",
            }}
            className="block text-6xl font-bold"
          >
            ${price}
          </motion.span>
        </AnimatePresence>
        <motion.div layout className="font-medium text-zinc-600">
          <span className="block">/user</span>
          <span className="block">/month</span>
        </motion.div>
      </div>

      <p className="mb-8 text-lg">{statement}</p>

      <div className="mb-8 space-y-2">
        {items.map((i) => (
          <CheckListItem key={i.children} checked={i.checked}>
            {i.children}
          </CheckListItem>
        ))}
      </div>

      {title.toLowerCase() === "basic" ? (
        <Link href="/sign-up">
          <button className="mt-4 w-full rounded bg-[--poppy] py-2 text-white">
            {buttonText}
          </button>
        </Link>
      ) : (
        <SubscriptionButton
          priceId={
            title.toLowerCase() === "pro"
              ? selected === "monthly"
                ? process.env.NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PRICE_ID
                : process.env.NEXT_PUBLIC_STRIPE_PRO_YEARLY_PRICE_ID
              : ""
          }
          plan={title.toLowerCase()}
          interval={selected}
        >
          {title.toLowerCase() === "basic" ? "Get Started" : "Upgrade to Pro"}
        </SubscriptionButton>
      )}
    </div>
  );
};

const Toggle = ({ selected, setSelected }) => {
  return (
    <div className="relative mx-auto mt-3 flex w-fit items-center rounded-full bg-zinc-200">
      <button
        className="relative z-10 flex items-center gap-2 px-3 py-1.5 text-sm font-medium"
        onClick={() => {
          setSelected("monthly");
        }}
      >
        <span className="relative z-10">Monthly</span>
      </button>
      <button
        className="relative z-10 flex items-center gap-2 px-3 py-1.5 text-sm font-medium"
        onClick={() => {
          setSelected("annual");
        }}
      >
        <span className="relative z-10">Annually</span>
      </button>
      <div
        className={`absolute inset-0 z-0 flex ${
          selected === "annual" ? "justify-end" : "justify-start"
        }`}
      >
        <motion.span
          layout
          transition={{ ease: "easeInOut" }}
          className="h-full w-1/2 rounded-full border border-zinc-900 bg-white"
        />
      </div>
    </div>
  );
};

const CheckListItem = ({ children, checked }) => {
  return (
    <div className="flex items-center gap-2 text-lg">
      {checked ? (
        <FiCheckCircle className="text-xl text-[--poppy]" />
      ) : (
        <FiXSquare className="text-xl text-zinc-400" />
      )}
      {children}
    </div>
  );
};
