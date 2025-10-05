import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-black via-purple-900 to-indigo-900 text-white relative overflow-hidden">
      {/* Háttér animáció */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-pink-500/20 via-purple-600/20 to-indigo-500/20 blur-3xl"
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <motion.h1
        className="text-8xl font-extrabold mb-6 z-10"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        404
      </motion.h1>

      <motion.p
        className="text-xl mb-8 text-white/80 z-10"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        The page is not founded :(
      </motion.p>

      <Link
        to="/"
        className="z-10 inline-block rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105"
      >
        Go back to main page
      </Link>
    </div>
  );
}