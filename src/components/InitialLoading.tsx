"use client";

import { motion, AnimatePresence } from "motion/react";
import { Tangerine } from "next/font/google";
import { useState, useEffect } from "react";

interface LoadingProps {
  children: React.ReactNode; // Children components to render after loading is complete
}

const tangerine = Tangerine({
  weight: "700",
  variable: "--font-tangerine",
  subsets: ["latin"], // Specify the language subset for the font to support
});

export default function InitialLoading({ children }: LoadingProps) {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simulate loading or check actual resources
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex flex-col gap-20  items-center justify-center bg-white"
          role="status"
          aria-label="Loading"
          aria-live="polite"
        >
          <motion.div
            initial={{ display: "block", y: 0 }}
            animate={{ display: "none", y: -100 }}
            transition={{
              duration: 0.8,
              visualDuration: 1,
              delay: 0.6,
              ease: "easeInOut",
            }}
          >
            <h1 className={`text-black text-8xl ${tangerine.className}`}>
              Artzy
            </h1>
          </motion.div>
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: -50 }}
            transition={{
              duration: 0.8,
              delay: 1.2,
              ease: "easeInOut",
            }}
          >
            <UI />
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  }
  return <>{children}</>; // Render children components when loading is complete
}

export function UI() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="loader">
        <svg viewBox="0 0 80 80">
          <circle r="32" cy="40" cx="40" id="test"></circle>
        </svg>
      </div>
      <div className="loader triangle">
        <svg viewBox="0 0 86 80">
          <polygon points="43 8 79 72 7 72"></polygon>
        </svg>
      </div>
      <div className="loader">
        <svg viewBox="0 0 80 80">
          <rect height="64" width="64" y="8" x="8"></rect>
        </svg>
      </div>
    </motion.div>
  );
}
