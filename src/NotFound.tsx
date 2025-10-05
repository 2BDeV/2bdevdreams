import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#fdfdfd] text-black">
      {/* Folyadékos háttér – canvas effekt */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0 mix-blend-difference"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 30%, black 10%, transparent 30%),
              radial-gradient(circle at 80% 70%, black 10%, transparent 30%),
              radial-gradient(circle at 50% 50%, black 8%, transparent 30%)
            `,
            backgroundSize: "200% 200%",
          }}
        />
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
        The page is not founded.
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
          Back to home page
        </Link>
      </motion.div>

      {/* Folyadék animációs overlay */}
      <style>{`
        .liquid-bg {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 30% 40%, #000 8%, transparent 20%),
                      radial-gradient(circle at 70% 60%, #000 8%, transparent 20%);
          mix-blend-mode: difference;
          filter: blur(50px);
          animation: liquid 15s ease-in-out infinite alternate;
        }

        @keyframes liquid {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-20px, 30px) scale(1.1); }
          100% { transform: translate(20px, -30px) scale(1); }
        }
      `}</style>
    </div>
  );
}
