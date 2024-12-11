"use cleint";
import React from "react";
import { SiInstagram, SiX, SiYoutube } from "react-icons/si";
import { IoIosLogOut } from "react-icons/io";
import Link from "next/link";
import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="relative overflow-hidden py-12 px-4 md:px-40">
      <div className="relative z-20 grid grid-cols-12 gap-x-1.5 gap-y-6">
        <LogoColumn />
        <GenericColumn
          title="Product"
          links={[
            {
              title: "Features",
              href: "/#features",
            },
            {
              title: "Testimonials",
              href: "/#testimonials",
            },
            {
              title: "Pricing",
              href: "/#pricing",
            },
          ]}
        />

        <GenericColumn
          title="Legal"
          links={[
            {
              title: "Terms & Conditions",
              href: "/terms",
            },
            {
              title: "Privacy Policy",
              href: "/privacy",
            },
            {
              title: "Refund Policy",
              href: "/refund",
            },
          ]}
        />

        <GenericColumn
          title="Socials"
          links={[
            {
              title: "Twitter",
              href: "/#",
              Icon: SiX,
            },
            {
              title: "Instagram",
              href: "/#",
              Icon: SiInstagram,
            },
            {
              title: "Youtube",
              href: "/#",
              Icon: SiYoutube,
            },
          ]}
        />
      </div>
    </footer>
  );
};

const LogoColumn = () => {
  return (
    <div className="col-span-6 md:col-span-4">
      <Image src="/logo.png" alt="Logo" width={220} height={220} />
      <span className="mt-3 inline-block text-xs text-zinc-400">
        © LearnEngine - All rights reserved.
      </span>
    </div>
  );
};

const GenericColumn = ({ title, links }) => {
  return (
    <div className="col-span-6 space-y-2 text-sm md:col-span-2">
      <span className="block text-black font-bold">{title}</span>
      {links.map((l) => (
        <Link
          key={l.title}
          href={l.href}
          className="flex items-center gap-1.5 text-black transition-colors hover:text-[--poppy] hover:underline"
        >
          {l.Icon && <l.Icon />}
          {l.title}
        </Link>
      ))}
    </div>
  );
};
