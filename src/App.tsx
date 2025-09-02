import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code,
  Zap,
  Monitor,
  Github,
  Linkedin,
  Mail,
  Menu,
  X,
  ArrowRight,
} from "lucide-react";

const Container = ({ children }: { children: React.ReactNode }) => (
  <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
);

const PrimaryButton = ({ children }: { children: React.ReactNode }) => (
  <button className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-400">
    <span className="relative z-10 flex items-center gap-2">
      {children}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
    </span>
    <span className="absolute inset-0 z-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></span>
  </button>
);

const GhostButton = ({ children }: { children: React.ReactNode }) => (
  <button className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl border border-white/30 bg-transparent px-6 py-3 text-sm font-semibold text-white/90 backdrop-blur transition-all duration-300 hover:border-white/50 hover:bg-white/5 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-400">
    <span className="relative z-10 flex items-center gap-2">{children}</span>
    <span className="absolute inset-0 z-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></span>
  </button>
);

// Scroll-to-top gomb
const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 200);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 right-6 p-3 rounded-full bg-black text-white shadow-lg hover:bg-gray-800 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="white">
            <path d="M441-280v-247L337-423l-56-57 200-200 200 200-57 56-103-103v247h-80Z" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuItems = ["About", "Projects", "Skills", "Contact"];

  const handleMenuClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (menuOpen) setMenuOpen(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [menuOpen]);

  return (
    <div className="font-sans antialiased relative overflow-hidden">
      {/* Háttér */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-black to-indigo-900 animate-gradient-slow"></div>
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-pink-500 opacity-30 blur-3xl animate-pulse"></div>
        <div className="absolute top-60 -right-40 h-96 w-96 rounded-full bg-indigo-500 opacity-30 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-600 opacity-20 blur-3xl animate-spin-slow"></div>
      </div>

      {/* Header */}
      <header className="fixed inset-x-0 top-0 z-50">
        <Container>
          <motion.div
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="mt-4 flex items-center justify-between rounded-xl border border-white/20 bg-black/70 px-4 py-3 text-white backdrop-blur-xl shadow-lg"
          >
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-pink-500 to-indigo-600">
                <img src="/2bdev logo.png" alt="2BDeV logo" className="h-6 w-6" />
              </div>
              <span className="text-base font-bold tracking-tight">2BDeV</span>
            </div>
            <motion.button
              className="rounded-xl p-2 hover:bg-white/10"
              aria-label="Menu"
              onClick={() => setMenuOpen((v) => !v)}
              animate={{ rotate: menuOpen ? 90 : 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </motion.button>
          </motion.div>
        </Container>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <Container>
                <motion.ul className="mt-2 space-y-2 rounded-xl border border-white/20 bg-black/80 p-4 text-white backdrop-blur-xl">
                  {menuItems.map((item, idx) => (
                    <motion.li
                      key={idx}
                      className="block rounded-xl px-3 py-2 hover:bg-white/10 cursor-pointer"
                      onClick={() => handleMenuClick(item.toLowerCase())}
                    >
                      {item}
                    </motion.li>
                  ))}
                  <motion.li>
                    <PrimaryButton>Let’s Talk</PrimaryButton>
                  </motion.li>
                </motion.ul>
              </Container>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section className="relative isolate overflow-hidden pt-40 text-white">
        <Container>
          <div className="grid items-center gap-10 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="mt-6 text-5xl font-extrabold leading-tight sm:text-6xl">
                Hi, I’m{" "}
                <span className="bg-gradient-to-r from-pink-400 via-fuchsia-500 to-indigo-500 bg-clip-text text-transparent">
                  2BDeV
                </span>
                . Web Developer & Creative Problem Solver
              </h1>
              <p className="mt-4 text-white/80 max-w-xl">
                I create modern, responsive websites and take cool photos.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <PrimaryButton>Contact Me</PrimaryButton>
                <GhostButton>
                  <Code className="h-4 w-4" /> View my works
                </GhostButton>
              </div>
            </motion.div>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1 }}
              className="relative flex justify-center"
            >
              <div className="relative w-80 h-80 rounded-full bg-gradient-to-tr from-pink-500 via-fuchsia-600 to-indigo-700 shadow-2xl animate-spin-slow">
                <img
                  src="/2bdev logo.png"
                  alt="2BDeV logo"
                  className="absolute inset-0 m-auto w-44 drop-shadow-xl animate-float"
                />
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Sections */}
      <section id="about" className="relative py-24 text-white bg-gradient-to-b from-transparent to-black/30">
        <Container>
          <h2 className="text-4xl font-bold mb-6">About</h2>
          <p className="text-white/80 max-w-3xl">
            I’m a passionate web developer and photographer. I love building modern and visually appealing websites.
          </p>
        </Container>
      </section>

      <section id="projects" className="relative py-24 text-white bg-gradient-to-b from-black/30 to-transparent">
        <Container>
          <h2 className="text-4xl font-bold mb-6">Projects</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <a href="#" className="group rounded-xl bg-gradient-to-tr from-pink-500/20 to-purple-600/20 p-6 shadow-lg transition-transform duration-300 hover:scale-105 relative overflow-hidden">
              <h3 className="text-xl font-semibold relative z-10">Project 1</h3>
              <p className="mt-2 text-sm text-white/70 relative z-10">Description</p>
            </a>
          </div>
        </Container>
      </section>

      <section id="skills" className="relative py-24 text-white bg-gradient-to-b from-transparent to-black/30">
        <Container>
          <h2 className="text-4xl font-bold mb-6">Skills</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            <div className="flex flex-col items-center">
              <Monitor className="h-10 w-10 text-pink-400" />
              <span className="mt-2 text-sm">Frontend</span>
            </div>
          </div>
        </Container>
      </section>

      <section id="contact" className="relative py-24 text-white bg-gradient-to-b from-black/30 to-transparent">
        <Container>
          <div className="flex flex-col items-center text-center">
            <h2 className="text-4xl font-bold mb-6">Contact</h2>
            <form className="w-full max-w-xl space-y-4">
              <input type="text" placeholder="Name" className="w-full rounded-lg bg-white/10 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400" />
              <input type="email" placeholder="Email" className="w-full rounded-lg bg-white/10 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400" />
              <textarea placeholder="Message" rows={4} className="w-full rounded-lg bg-white/10 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"></textarea>
              <PrimaryButton>Send</PrimaryButton>
            </form>
          </div>
        </Container>
      </section>

      <footer className="relative py-6 text-center text-white/70 text-sm">
        <Container>© {new Date().getFullYear()} 2BDeV. All rights reserved.</Container>
      </footer>

      {/* Scroll-to-top */}
      <ScrollToTopButton />
    </div>
  );
}
