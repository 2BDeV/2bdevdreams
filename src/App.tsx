import { Analytics } from "@vercel/analytics/react";
import Logo3d from "./Logo3d";
import { SpeedInsights } from "@vercel/speed-insights/react";
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
  ArrowUp,
} from "lucide-react";
import Turnstile from "react-turnstile";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "./NotFound";

const Container = ({ children }: { children: React.ReactNode }) => (
  <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
);

const PrimaryButton = ({
  children,
  type = "button",
}: {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
}) => (
  <button
    type={type}
    className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-black text-white px-6 py-3 text-sm font-semibold shadow-lg transition-all duration-300 hover:bg-white hover:text-black hover:border hover:border-black focus:outline-none focus:ring-2 focus:ring-black"
  >
    <span className="relative z-10 flex items-center gap-2">
      {children}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
    </span>
    <span className="absolute inset-0 z-0 bg-white/10 opacity-0 group-hover:opacity-20 transition-opacity"></span>
  </button>
);

const GhostButton = ({ children }: { children: React.ReactNode }) => (
  <button className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl border border-black/30 bg-white/20 px-6 py-3 text-sm font-semibold text-black/90 backdrop-blur-md transition-all duration-300 hover:border-black/50 hover:bg-white/30 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-black">
    <span className="relative z-10 flex items-center gap-2">{children}</span>
    <span className="absolute inset-0 z-0 bg-white/10 opacity-0 group-hover:opacity-20 transition-opacity"></span>
  </button>
);

// Animated black blobs in the background
const AnimatedBlobs = () => (
  <div className="absolute inset-0 -z-10">
    {[...Array(4)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute bg-black/20 rounded-full blur-3xl"
        initial={{
          x: `${Math.random() * 100}%`,
          y: `${Math.random() * 100}%`,
          scale: 0.8 + Math.random() * 0.4,
        }}
        animate={{
          x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
          y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
          scale: [0.8, 1.2, 0.9],
        }}
        transition={{
          duration: 20 + Math.random() * 20,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
        style={{
          width: `${200 + Math.random() * 200}px`,
          height: `${200 + Math.random() * 200}px`,
        }}
      />
    ))}
  </div>
);

function MainAppContent() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showScroll, setShowScroll] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const menuItems = ["About", "Projects", "Skills", "Contact"];

  const handleMenuClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const checkScrollTop = () => {
    if (!showScroll && window.scrollY > 400) setShowScroll(true);
    else if (showScroll && window.scrollY <= 400) setShowScroll(false);
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (menuOpen) setMenuOpen(false);
      checkScrollTop();
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [menuOpen, showScroll]);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!turnstileToken) {
      alert("Please complete the CAPTCHA before submitting.");
      return;
    }
    const formData = { name, email, message, token: turnstileToken };
    console.log("Sending data to backend:", formData);
    alert("Form submitted! Check the console for the data that would be sent.");
  };

  return (
    <div className="font-sans antialiased relative overflow-hidden bg-white text-black">
      <AnimatedBlobs />

      <header className="fixed inset-x-0 top-0 z-50">
        <Container>
          <motion.div
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="mt-4 flex items-center justify-between rounded-xl border border-black/20 bg-white/20 px-4 py-3 text-black backdrop-blur-md shadow-lg"
          >
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-black text-white">
                <img src="/2bdev logo.png" alt="2BDeV logo" className="h-6 w-6" />
              </div>
              <span className="text-base font-bold tracking-tight">2BDeV</span>
            </div>

            <motion.button
              className="rounded-xl p-2 hover:bg-black/10"
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
                <motion.ul
                  className="mt-2 space-y-2 rounded-xl border border-black/20 bg-white/20 p-4 text-black backdrop-blur-md"
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={{
                    visible: { transition: { staggerChildren: 0.1 } },
                    hidden: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
                  }}
                >
                  {menuItems.map((item, idx) => (
                    <motion.li
                      key={idx}
                      className="block rounded-xl px-3 py-2 hover:bg-black/10 cursor-pointer"
                      variants={{
                        hidden: { y: -30, opacity: 0 },
                        visible: { y: 0, opacity: 1 },
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      onClick={() => handleMenuClick(item.toLowerCase())}
                    >
                      {item}
                    </motion.li>
                  ))}
                  <motion.li
                    variants={{
                      hidden: { y: -30, opacity: 0 },
                      visible: { y: 0, opacity: 1 },
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    <PrimaryButton>Let’s Talk</PrimaryButton>
                  </motion.li>
                </motion.ul>
              </Container>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section className="relative isolate overflow-hidden pt-40">
        <Container>
          <div className="grid items-center gap-10 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="mt-6 text-5xl font-extrabold leading-tight tracking-tight sm:text-6xl">
                Hi, I’m{" "}
                <span className="bg-black text-white px-1">2BDeV</span>.<br />
                Web Developer, Creative Problem Solver & Photographer :)
              </h1>
              <p className="mt-4 max-w-xl">
                I create modern, responsive websites and shot some good pictures.
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
              <Logo3d />
            </motion.div>
          </div>
        </Container>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-24 bg-white/20">
        <Container>
          <h2 className="text-4xl font-bold mb-6">About</h2>
          <p className="max-w-3xl">
            Hi! I’m 2BDeV, a passionate web developer and a starter photographer. I
            love building modern and visually appealing websites and saving my
            moments. I mostly work with HTML, CSS, and JavaScript, but I want to use
            React, Tailwind, and Node.js. I’m always curious to learn new technologies.
          </p>
        </Container>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative py-24 bg-white/10">
        <Container>
          <h2 className="text-4xl font-bold mb-6">Projects</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[{ title: "KET Webpage", desc: "My own family business website. (Under development)", link: "https://backup.2bdev.bot.nu/home/trans/home.html" },
              { title: "My fully functional mobile OS '2BOS'", desc: "I don't think I need to say more about it. (Under development)", link: "https://2bdevon.top/#projects" },
              { title: "Own Discord app: 2BUptime", desc: "This bot monitors my Main and Backup pages", link: "https://2bdevon.top/bot" },
            ].map((project, i) => (
              <a
                key={i}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-xl bg-white/20 p-6 shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-black/50 relative overflow-hidden backdrop-blur-md"
              >
                <h3 className="text-xl font-semibold relative z-10">{project.title}</h3>
                <p className="mt-2 text-sm relative z-10">{project.desc}</p>
              </a>
            ))}
          </div>
        </Container>
      </section>

      {/* Skills Section */}
      <section id="skills" className="relative py-24 bg-white/20">
        <Container>
          <h2 className="text-4xl font-bold mb-6">Skills</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            <div className="flex flex-col items-center">
              <Monitor className="h-10 w-10 text-black" />
              <span className="mt-2 text-sm">Frontend</span>
            </div>
            <div className="flex flex-col items-center">
              <Code className="h-10 w-10 text-black" />
              <span className="mt-2 text-sm">Backend</span>
            </div>
            <div className="flex flex-col items-center">
              <Zap className="h-10 w-10 text-black" />
              <span className="mt-2 text-sm">UI/UX</span>
            </div>
            <div className="flex flex-col items-center">
              <Github className="h-10 w-10 text-black" />
              <span className="mt-2 text-sm">GitHub</span>
            </div>
            <div className="flex flex-col items-center">
              <Linkedin className="h-10 w-10 text-black" />
              <span className="mt-2 text-sm">LinkedIn</span>
            </div>
            <div className="flex flex-col items-center">
              <Mail className="h-10 w-10 text-black" />
              <span className="mt-2 text-sm">Contact</span>
            </div>
          </div>
        </Container>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-24 bg-white/10">
        <Container>
          <div className="flex flex-col items-center text-center">
            <h2 className="text-4xl font-bold mb-6">Contact</h2>
            <form onSubmit={handleFormSubmit} className="w-full max-w-xl space-y-4">
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full rounded-lg bg-white/30 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black backdrop-blur-md"
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-lg bg-white/30 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black backdrop-blur-md"
              />
              <textarea
                placeholder="Message"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="w-full rounded-lg bg-white/30 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black backdrop-blur-md"
              />
              <div className="flex justify-center">
                <Turnstile
                  sitekey="0x4AAAAAAB4KBkZxjFBtjdKo"
                  onVerify={(token) => setTurnstileToken(token)}
                  theme="light"
                />
              </div>
              <PrimaryButton type="submit">Send</PrimaryButton>
            </form>
          </div>
        </Container>
      </section>

      {/* Footer */}
      <footer className="relative py-6 text-center text-black/70 text-sm">
        <Container>© {new Date().getFullYear()} 2BDeV. All rights reserved.</Container>
      </footer>

      <AnimatePresence>
        {showScroll && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={scrollTop}
            aria-label="Scroll to top"
            className="fixed bottom-6 right-6 z-40 rounded-full p-4 bg-black/10 text-black backdrop-blur-md border border-black/20 shadow-lg transition-transform duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-black"
          >
            <ArrowUp className="h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>

      <Analytics />
      <SpeedInsights />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainAppContent />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
