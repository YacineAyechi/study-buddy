"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const RefundPage = () => {
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
          <h1 className="mb-8 text-4xl font-bold">Refund Policy</h1>

          <div className="prose max-w-none">
            <p className="text-lg text-slate-600">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <h2 className="mt-8">1. Refund Eligibility</h2>
            <p>We offer refunds under the following conditions:</p>
            <ul>
              <li>Request made within 14 days of purchase</li>
              <li>Service unavailability or technical issues on our end</li>
              <li>Billing errors or unauthorized charges</li>
            </ul>

            <h2>2. Non-Refundable Items</h2>
            <p>The following are not eligible for refunds:</p>
            <ul>
              <li>Partially used subscription periods</li>
              <li>Consumed document processing credits</li>
              <li>Special promotional offers marked as non-refundable</li>
            </ul>

            <h2>3. Refund Process</h2>
            <p>To request a refund:</p>
            <ol>
              <li>Contact our support team through the support portal</li>
              <li>Provide your account email and order information</li>
              <li>Explain the reason for your refund request</li>
              <li>Allow up to 5-7 business days for processing</li>
            </ol>

            <h2>4. Payment Method</h2>
            <p>
              Refunds will be issued to the original payment method used for the
              purchase. Processing time may vary depending on your payment
              provider.
            </p>

            <h2>5. Cancellation Policy</h2>
            <p>
              You may cancel your subscription at any time. After cancellation:
            </p>
            <ul>
              <li>
                You will maintain access until the end of your billing period
              </li>
              <li>No partial refunds for unused periods</li>
              <li>Recurring payments will be stopped</li>
            </ul>

            <h2>6. Contact Us</h2>
            <p>
              For refund requests or questions about this policy, please contact
              our support team at contact@learnengine.pro
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default RefundPage;
