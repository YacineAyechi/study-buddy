"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import React from "react";

const links = [
  { name: "Home", href: "#home" },
  { name: "Features", href: "#features" },
  //   { name: "How to use", href: "#how-to-use" },
  { name: "Pricing", href: "#pricing" },
  { name: "FAQ", href: "#faq" },
];

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      const sections = links.map((link) => link.href.substring(1));
      let currentSection = "";

      const sectionPositions = sections
        .map((section) => {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            return {
              id: section,
              top: rect.top,
              bottom: rect.bottom,
            };
          }
          return null;
        })
        .filter(Boolean);

      const viewportHeight = window.innerHeight;
      const viewportMiddle = viewportHeight / 2;

      for (const section of sectionPositions) {
        if (section.top <= viewportMiddle && section.bottom >= 0) {
          currentSection = section.id;
          break;
        }
      }

      setActiveSection(currentSection ? `#${currentSection}` : "");
    };

    let ticking = false;
    const scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", scrollListener);

    handleScroll();

    return () => window.removeEventListener("scroll", scrollListener);
  }, []);

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link href="#home">
            <Image src="/logo.svg" alt="Logo" width={100} height={100} />
          </Link>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  isMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>

          <div className="hidden md:flex gap-4">
            {links.map((link) => (
              <Link
                href={link.href}
                key={link.name}
                className={`transition-all hover:text-[--poppy] font-semibold ${
                  activeSection === link.href
                    ? "text-[--poppy] underline underline-offset-4"
                    : ""
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex gap-4">
            <Link
              href="/login"
              className="text-[--poppy] border-[--poppy] border px-4 py-2 rounded-md transition-all hover:bg-[--poppy-dark] hover:text-white hover:border-[--poppy-dark]"
            >
              Sign In
            </Link>
            <Link
              href="/login"
              className="bg-[--poppy] border-[--poppy] border text-white px-4 py-2 rounded-md transition-all hover:bg-[--poppy-dark] hover:border-[--poppy-dark]"
            >
              Sign Up
            </Link>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={`fixed inset-0 bg-black/50 transition-opacity duration-300 md:hidden ${
            isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Mobile Navigation */}
        <div
          className={`fixed top-0 right-0 h-full w-[250px] bg-white shadow-lg transition-transform duration-300 ease-in-out transform md:hidden ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="pt-20 pb-3 px-4 space-y-3">
            {links.map((link) => (
              <Link
                href={link.href}
                key={link.name}
                className={`block transition-all hover:text-[--poppy] font-semibold ${
                  activeSection === link.href
                    ? "text-[--poppy] underline underline-offset-4"
                    : ""
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-2">
              <Link
                href="/login"
                className="text-center text-[--poppy] border-[--poppy] border px-4 py-2 rounded-md transition-all hover:bg-[--poppy-dark] hover:text-white hover:border-[--poppy-dark]"
              >
                Sign In
              </Link>
              <Link
                href="/login"
                className="text-center bg-[--poppy] border-[--poppy] border text-white px-4 py-2 rounded-md transition-all hover:bg-[--poppy-dark] hover:border-[--poppy-dark]"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
