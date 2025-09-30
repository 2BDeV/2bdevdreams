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
    className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-400"
  >
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
  const [showScroll, setShowScroll] = useState(false);
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  // Ebben tároljuk a Cloudflare által adott tokent
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const menuItems = ["About", "Projects", "Skills", "Contact"];

  const handleMenuClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  const checkScrollTop = () => {
    if (!showScroll && window.scrollY > 400) {
      setShowScroll(true);
    } else if (showScroll && window.scrollY <= 400) {
      setShowScroll(false);
    }
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

    const formData = {
      name,
      email,
      message,
      token: turnstileToken,
    };

    console.log("Sending data to backend:", formData);
    alert("Form submitted! Check the console for the data that would be sent.");

  };


  return (
    <div className="font-sans antialiased relative overflow-hidden">
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-black to-indigo-900 animate-gradient-slow"></div>
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-pink-500 opacity-30 blur-3xl animate-pulse"></div>
        <div className="absolute top-60 -right-40 h-96 w-96 rounded-full bg-indigo-500 opacity-30 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-600 opacity-20 blur-3xl animate-spin-slow"></div>
      </div>
      
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
                <motion.ul
                  className="mt-2 space-y-2 rounded-xl border border-white/20 bg-black/80 p-4 text-white backdrop-blur-xl"
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
                      className="block rounded-xl px-3 py-2 hover:bg-white/10 cursor-pointer"
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

      <section className="relative isolate overflow-hidden pt-40 text-white">
        <Container>
          <div className="grid items-center gap-10 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="mt-6 text-5xl font-extrabold leading-tight tracking-tight sm:text-6xl">
                Hi, I’m{" "}
                <span className="bg-gradient-to-r from-pink-400 via-fuchsia-500 to-indigo-500 bg-clip-text text-transparent">
                  2BDeV
                </span>
                .<br />
                Web Developer, Creative Problem Solver & Photographer :)
              </h1>
              <p className="mt-4 text-white/80 max-w-xl">
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

      <section
        id="about"
        className="relative py-24 text-white bg-gradient-to-b from-transparent to-black/30"
      >
        <Container>
          <h2 className="text-4xl font-bold mb-6">About</h2>
          <p className="text-white/80 max-w-3xl">
            Hi! I’m 2BDeV, a passionate web developer and a starter photographer. I
            love building modern and visually appealing websites and saving my
            moments. I mostly work with HTML, CSS, and JavaScript, but I want to use
            React, Tailwind, and Node.js. I’m always curious to learn new technologies.
          </p>
        </Container>
      </section>

      <section
        id="projects"
        className="relative py-24 text-white bg-gradient-to-b from-black/30 to-transparent"
      >
        <Container>
          <h2 className="text-4xl font-bold mb-6">Projects</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "KET Webpage",
                desc: "My own family business website. (Under development)",
                link: "https://backup.2bdev.bot.nu/home/trans/home.html",
              },
              {
                title: "My fully functional mobile OS '2BOS'",
                desc: "I don't think I need to say more about it. (Under development)",
                link: "https://2bdevon.top/#projects",
              },
              {
                title: "Own Discord app: 2BUptime",
                desc: "This bot monitors my Main and Backup pages",
                link: "https://2bdevon.top/bot",
              },
            ].map((project, i) => (
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
      
      <section
        id="skills"
        className="relative py-24 text-white bg-gradient-to-b from-transparent to-black/30"
      >
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

      <section
        id="contact"
        className="relative py-24 text-white bg-gradient-to-b from-black/30 to-transparent"
      >
        <Container>
          <div className="flex flex-col items-center text-center">
            <h2 className="text-4xl font-bold mb-6">Contact</h2>
            {/* Hozzáadtuk az onSubmit eseménykezelőt a formhoz */}
            <form onSubmit={handleFormSubmit} className="w-full max-w-xl space-y-4">
              <input
                type="text"
                placeholder="Name"
                value={name} // Összekötés a 'name' state-tel
                onChange={(e) => setName(e.target.value)} 
                required // mező kitöltése kötelező
                className="w-full rounded-lg bg-white/10 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
              <input
                type="email"
                placeholder="Email"
                value={email} // Összekötés az 'email' state-tel
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-lg bg-white/10 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
              <textarea
                placeholder="Message"
                rows={4}
                value={message} // Összekötés a 'message' state-tel
                onChange={(e) => setMessage(e.target.value)}
                required
                className="w-full rounded-lg bg-white/10 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
              ></textarea>
              
              <div className="flex justify-center">
                <Turnstile
                  sitekey="0x4AAAAAAB4KBkZxjFBtjdKo"
                  onVerify={(token) => setTurnstileToken(token)}
                  theme="auto"
                />
              </div>

              <PrimaryButton type="submit">Send</PrimaryButton>
            </form>
          </div>
        </Container>
      </section>
      
      <footer className="relative py-6 text-center text-white/70 text-sm">
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
            className="fixed bottom-6 right-6 z-40 rounded-full p-4 bg-white/10 text-white backdrop-blur-xl border border-white/20 shadow-lg transition-transform duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-pink-400"
          >
            <ArrowUp className="h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>
      
      <Analytics />

      <SpeedInsights />

      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
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