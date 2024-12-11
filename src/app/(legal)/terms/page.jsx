"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const TermsPage = () => {
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
          <h1 className="mb-8 text-4xl font-bold">Terms and Conditions</h1>

          <div className="prose max-w-none">
            <p className="text-lg text-slate-600">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <h2 className="mt-8">1. Agreement to Terms</h2>
            <p>
              By accessing and using LearnEngine, you agree to be bound by these
              Terms and Conditions. If you disagree with any part of these
              terms, you may not access our service.
            </p>

            <h2>2. Description of Service</h2>
            <p>
              LearnEngine provides AI-powered document analysis, summarization,
              and learning tools. Our service includes document processing,
              summary generation, quiz creation, and flashcard generation.
            </p>

            <h2>3. User Accounts</h2>
            <p>
              When you create an account, you must provide accurate and complete
              information. You are responsible for maintaining the security of
              your account and password.
            </p>

            <h2>4. Acceptable Use</h2>
            <p>You agree not to:</p>
            <ul>
              <li>Use the service for any illegal purposes</li>
              <li>
                Upload content that infringes on intellectual property rights
              </li>
              <li>
                Attempt to access, tamper with, or use non-public areas of the
                platform
              </li>
              <li>Use automated systems or scripts to collect information</li>
            </ul>

            <h2>5. Content Rights</h2>
            <p>
              You retain all rights to your content. By uploading content, you
              grant LearnEngine a license to use, process, and analyze the
              content to provide our services.
            </p>

            <h2>6. Service Modifications</h2>
            <p>
              We reserve the right to modify or discontinue our service at any
              time, with or without notice. We shall not be liable to you or any
              third party for any modification, suspension, or discontinuance.
            </p>

            <h2>7. Limitation of Liability</h2>
            <p>
              LearnEngine shall not be liable for any indirect, incidental,
              special, consequential, or punitive damages resulting from your
              use or inability to use the service.
            </p>

            <h2>8. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. We will
              notify users of any material changes via email or through the
              platform.
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default TermsPage;
