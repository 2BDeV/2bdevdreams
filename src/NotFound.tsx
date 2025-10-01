import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-black flex flex-col items-center justify-center text-white">
      {/* Háttér gradient animáció */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-500 to-pink-600 opacity-30 blur-3xl"
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        style={{ backgroundSize: "200% 200%" }}
      />

      {/* Lebegő körök */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white/10"
          style={{
            width: `${Math.random() * 80 + 20}px`,
            height: `${Math.random() * 80 + 20}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{ y: ["0%", "-20%", "0%"] }}
          transition={{
            duration: Math.random() * 6 + 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Tartalom */}
      <motion.h1
        className="text-8xl font-bold relative z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        404
      </motion.h1>

      <motion.p
        className="text-lg text-white/70 mt-4 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        Oops! Az oldal nem található.
      </motion.p>

      <motion.a
        href="/"
        className="mt-6 px-6 py-3 bg-white/10 border border-white/30 rounded-2xl backdrop-blur-md hover:bg-white/20 transition relative z-10"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Vissza a főoldalra
      </motion.a>
    </div>
  );
}
