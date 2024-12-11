"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6">
          <Link href="/" className="inline-block">
            <Image src="/logo.png" alt="Logo" width={150} height={150} />
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="mb-8 text-4xl font-bold">Privacy Policy</h1>

          <div className="prose max-w-none">
            <p className="text-lg text-slate-600">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <h2 className="mt-8">1. Information We Collect</h2>
            <p>We collect information you provide directly to us, including:</p>
            <ul>
              <li>Account information (name, email, password)</li>
              <li>Documents you upload for processing</li>
              <li>Usage data and interaction with our services</li>
              <li>Payment information when purchasing premium features</li>
            </ul>

            <h2>2. How We Use Your Information</h2>
            <p>We use the collected information to:</p>
            <ul>
              <li>Provide and maintain our services</li>
              <li>Process and analyze your documents</li>
              <li>Send you important notifications and updates</li>
              <li>Improve our services and develop new features</li>
              <li>Protect against fraud and abuse</li>
            </ul>

            <h2>3. Data Storage and Security</h2>
            <p>
              We implement appropriate security measures to protect your
              personal information. Your documents and data are encrypted both
              in transit and at rest.
            </p>

            <h2>4. Data Sharing</h2>
            <p>
              We do not sell your personal information. We may share your
              information with:
            </p>
            <ul>
              <li>Service providers who assist in our operations</li>
              <li>Law enforcement when required by law</li>
              <li>Third parties with your explicit consent</li>
            </ul>

            <h2>5. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access your personal information</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Export your data</li>
              <li>Opt-out of marketing communications</li>
            </ul>

            <h2>6. Cookies and Tracking</h2>
            <p>
              We use cookies and similar technologies to improve user experience
              and analyze service usage. You can control cookie preferences
              through your browser settings.
            </p>

            <h2>7. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, please contact us
              at contact@learnengine.pro
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default PrivacyPage;
