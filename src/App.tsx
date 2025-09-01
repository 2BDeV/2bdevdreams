import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
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

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Menüpontok láthatóságának vezérlése
  useEffect(() => {
    setIsVisible(menuOpen);
  }, [menuOpen]);

  // Scroll esemény figyelése menü automatikus bezárásához
  useEffect(() => {
    const handleScroll = () => {
      if (menuOpen) {
        setIsVisible(false);
        setTimeout(() => setMenuOpen(false), 300);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [menuOpen]);

  return (
    <div className="font-sans antialiased relative overflow-hidden">
      {/* Animated Background */}
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

            {/* Hamburger gomb minden eszközön */}
            <button
              className="rounded-xl p-2 hover:bg-white/10"
              aria-label="Menu"
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </motion.div>
        </Container>

        {/* Animált menü minden eszközön */}
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <Container>
              <motion.ul
                className="mt-2 space-y-2 rounded-xl border border-white/20 bg-black/80 p-4 text-white backdrop-blur-xl"
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
                variants={{
                  visible: { transition: { staggerChildren: 0.05 } },
                }}
              >
                {["About", "Projects", "Skills", "Contact"].map((item, idx) => (
                  <motion.li
                    key={idx}
                    className="block rounded-xl px-3 py-2 hover:bg-white/10 cursor-pointer"
                    variants={{
                      hidden: { y: -20, opacity: 0 },
                      visible: { y: 0, opacity: 1 },
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <a href={`#${item.toLowerCase()}`}>{item}</a>
                  </motion.li>
                ))}
                <motion.li
                  variants={{
                    hidden: { y: -20, opacity: 0 },
                    visible: { y: 0, opacity: 1 },
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <PrimaryButton>Let’s Talk</PrimaryButton>
                </motion.li>
              </motion.ul>
            </Container>
          </motion.div>
        )}
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
              <h1 className="mt-6 text-5xl font-extrabold leading-tight tracking-tight sm:text-6xl">
                Hi, I’m <span className="bg-gradient-to-r from-pink-400 via-fuchsia-500 to-indigo-500 bg-clip-text text-transparent">2BDeV </span>.<br />Web Developer ,Creative Problem Solver & Photographer :)
              </h1>
              <p className="mt-4 text-white/80 max-w-xl">
                I create modern, responsive websites and shott some good pictures.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <PrimaryButton>Contact Me</PrimaryButton>
                <GhostButton><Code className="h-4 w-4" /> View my works</GhostButton>
              </div>
            </motion.div>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1 }}
              className="relative flex justify-center"
            >
              <div className="relative w-80 h-80 rounded-full bg-gradient-to-tr from-pink-500 via-fuchsia-600 to-indigo-700 shadow-2xl animate-spin-slow">
                <img src="/2bdev logo.png" alt="2BDeV logo" className="absolute inset-0 m-auto w-44 drop-shadow-xl animate-float" />
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-24 text-white bg-gradient-to-b from-transparent to-black/30">
        <Container>
          <h2 className="text-4xl font-bold mb-6">About</h2>
          <p className="text-white/80 max-w-3xl">
            Hi! I’m 2BDeV, a passionate web developer and a starter photographer. I love building modern and visually appealing websites and saving my moments.
            I mostly work with HTML CSS and JavaScript, but i want to use React, Tailwind, and Node.js . I’m always curious to learn new technologies.
          </p>
        </Container>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative py-24 text-white bg-gradient-to-b from-black/30 to-transparent">
        <Container>
          <h2 className="text-4xl font-bold mb-6">Projects</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[{
              title: "KET Webpage",
              desc: "My own family business website. 
(Under developement)",
              link: "https://backup.2bdev.bot.nu/home/trans/home.html"
            }, {
              title: "My fully functional mobile OS '2BOS'",
              desc: "I don't think I need to say more about it. 
Under development",
              link: "https://2bdevon.top/#projects"
            }, {
              title: "Own Discord app: 2BUptime",
              desc: "This bot monitors my Main and Backup pages",
              link: "https://2bdevon.top/bot"
            }].map((project, i) => (
              <a
                key={i}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-xl bg-gradient-to-tr from-pink-500/20 to-purple-600/20 p-6 shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-pink-500/50 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 opacity-0 group-hover:opacity-30 blur-2xl transition-opacity"></div>
                <h3 className="text-xl font-semibold relative z-10">{project.title}</h3>
                <p className="mt-2 text-sm text-white/70 relative z-10">{project.desc}</p>
              </a>
            ))}
          </div>
        </Container>
      </section>

      {/* Skills Section */}
      <section id="skills" className="relative py-24 text-white bg-gradient-to-b from-transparent to-black/30">
        <Container>
          <h2 className="text-4xl font-bold mb-6">Skills</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            <div className="flex flex-col items-center">
              <Monitor className="h-10 w-10 text-pink-400" />
              <span className="mt-2 text-sm">Frontend</span>
            </div>
            <div className="flex flex-col items-center">
              <Code className="h-10 w-10 text-indigo-400" />
              <span className="mt-2 text-sm">Backend</span>
            </div>
            <div className="flex flex-col items-center">
              <Zap className="h-10 w-10 text-fuchsia-400" />
              <span className="mt-2 text-sm">UI/UX</span>
            </div>
            <div className="flex flex-col items-center">
              <Github className="h-10 w-10 text-white" />
              <span className="mt-2 text-sm">GitHub</span>
            </div>
            <div className="flex flex-col items-center">
              <Linkedin className="h-10 w-10 text-blue-400" />
              <span className="mt-2 text-sm">LinkedIn</span>
            </div>
            <div className="flex flex-col items-center">
              <Mail className="h-10 w-10 text-green-400" />
              <span className="mt-2 text-sm">Contact</span>
            </div>
          </div>
        </Container>
      </section>

      {/* Contact Section */}
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

      {/* Footer */}
      <footer className="relative py-6 text-center text-white/70 text-sm">
        <Container>
          © {new Date().getFullYear()} 2BDeV. All rights reserved.
        </Container>
      </footer>

      {/* Extra animations */}
      <style jsx global>{`
        .animate-gradient-slow {
          background-size: 400% 400%;
          animation: gradientBG 15s ease infinite;
        }
        @keyframes gradientBG {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-spin-slow {
          animation: spin 20s linear infinite;
        }
        .animate-pulse-slow {
          animation: pulse 8s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
