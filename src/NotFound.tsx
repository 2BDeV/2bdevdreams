import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function NotFound() {
  const blobs = Array.from({ length: 6 });

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-white text-black">
      {/* Mozgó pacák háttér */}
      <div className="absolute inset-0 z-0">
        {blobs.map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-black opacity-80 blur-[100px]"
            style={{
              width: `${200 + Math.random() * 150}px`,
              height: `${200 + Math.random() * 150}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 300 - 150],
              y: [0, Math.random() * 300 - 150],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Tartalom */}
      <div className="relative z-10 flex flex-col items-center text-center">
        <motion.h1
          className="text-[8rem] font-extrabold leading-none select-none"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{
            WebkitTextStroke: "2px black",
            color: "black",
            mixBlendMode: "difference",
          }}
        >
          404
        </motion.h1>

        <motion.p
          className="mt-4 text-lg font-medium select-none"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          style={{
            mixBlendMode: "difference",
          }}
        >
          The page is not founded.
        </motion.p>

        <motion.div
          className="mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <Link
            to="/"
            className="px-6 py-3 border border-black rounded-full text-black font-semibold transition-all duration-300 hover:bg-black hover:text-white"
          >
            Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
