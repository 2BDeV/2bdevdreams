import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#fafafa] text-black">
      {/* Mozgó fekete pacák háttér */}
      <div className="absolute inset-0">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-black/80 mix-blend-difference blur-[80px]"
            style={{
              width: `${150 + Math.random() * 150}px`,
              height: `${150 + Math.random() * 150}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 200 - 100],
              y: [0, Math.random() * 200 - 100],
              scale: [1, 1.3, 1],
              opacity: [0.6, 0.9, 0.6],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Tartalom */}
      <motion.h1
        className="relative z-10 text-[8rem] font-extrabold tracking-tight leading-none select-none"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{
          WebkitTextStroke: "2px white",
          color: "black",
          mixBlendMode: "difference",
        }}
      >
        404
      </motion.h1>

      <motion.p
        className="relative z-10 text-lg text-center mt-4 font-medium select-none"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        style={{ mixBlendMode: "difference" }}
      >
        The page is not found.
      </motion.p>

      <motion.div
        className="relative z-10 mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <Link
          to="/"
          className="px-6 py-3 border border-black rounded-full text-black font-semibold transition-all duration-300 hover:bg-black hover:text-white"
        >
          Main page
        </Link>
      </motion.div>

      <style>{`
        body {
          background-color: #fafafa;
        }
      `}</style>
    </div>
  );
}
