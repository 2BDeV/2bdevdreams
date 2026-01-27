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
  Settings,
  Lock,
  LogOut
} from "lucide-react";
import Turnstile from "react-turnstile";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { createClient } from "@sanity/client";

// --- SANITY CLIENT CONFIG ---
const sanity = createClient({
  projectId: "2a99ehdl",
  dataset: "2bdevdreams",
  useCdn: true, 
  apiVersion: "2024-01-10",
});

// --- CONFIGURATION ---
const CONFIG = {
  EMAILJS_SERVICE: import.meta.env.VITE_EMAILJS_SERVICE_ID || "",
  EMAILJS_TEMPLATE: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "",
  EMAILJS_PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "",
  TURNSTILE_SITEKEY: import.meta.env.VITE_TURNSTILE_SITEKEY || "",
};

// --- UI COMPONENTS ---
const Container = ({ children }: { children: React.ReactNode }) => (
  <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
);

const PrimaryButton = ({ children, type = "button", onClick, disabled = false }: any) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-400 ${
      disabled ? "opacity-70 cursor-not-allowed grayscale" : ""
    }`}
  >
    <span className="relative z-10 flex items-center gap-2">
      {children}
      {!disabled && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />}
    </span>
    <span className="absolute inset-0 z-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></span>
  </button>
);

const GhostButton = ({ children, onClick }: any) => (
  <button
    onClick={onClick}
    className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl border border-white/30 bg-transparent px-6 py-3 text-sm font-semibold text-white/90 backdrop-blur transition-all duration-300 hover:border-white/50 hover:bg-white/5 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-400"
  >
    <span className="relative z-10 flex items-center gap-2">{children}</span>
    <span className="absolute inset-0 z-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></span>
  </button>
);

// --- MAINTENANCE SCREEN ---
const MaintenanceScreen = ({ settings }: { settings: any }) => {
  if (settings?.customHtml) {
    return <div dangerouslySetInnerHTML={{ __html: settings.customHtml }} />;
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white p-6 text-center font-sans">
      <div className="space-y-6 relative z-10">
        <Settings className="h-20 w-20 mx-auto text-pink-500 animate-spin-slow" />
        <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-400 to-indigo-500 bg-clip-text text-transparent">
          Under Maintenance
        </h1>
        <p className="text-white/60 max-w-md mx-auto">
          {settings.maintenanceMessage || "I am currently updating my portfolio. Please check back soon!"}
        </p>
        
        {/* Rejtett/kicsi login link az alján */}
        <div className="pt-10 opacity-30 hover:opacity-100 transition-opacity">
            <a href="/login" className="flex items-center justify-center gap-2 text-xs text-white">
                <Lock className="h-3 w-3" /> Admin Login
            </a>
        </div>
      </div>
       <style>{`
          .animate-spin-slow { animation: spin 20s linear infinite; }
          @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        `}</style>
    </div>
  );
};

// --- LOGIN SCREEN (WordPress style) ---
const AdminLogin = ({ settings, onLoginSuccess }: { settings: any, onLoginSuccess: () => void }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  // Ha már be van jelentkezve, irány a főoldal
  useEffect(() => {
    if (localStorage.getItem("isAdmin") === "true") {
        navigate("/");
    }
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validPassword = settings?.adminPassword || "admin";
    
    if (password === validPassword) {
      localStorage.setItem("isAdmin", "true");
      onLoginSuccess(); 
      navigate("/"); 
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000); 
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-black to-indigo-900/40"></div>
      
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }}
        className="relative z-10 w-full max-w-md p-8 rounded-2xl border border-white/10 bg-black/60 backdrop-blur-xl shadow-2xl"
      >
        <div className="text-center mb-8">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/10 mb-4">
                <Lock className="h-6 w-6 text-pink-500" />
            </div>
            <h2 className="text-2xl font-bold text-white">Admin Access</h2>
            <p className="text-white/50 text-sm mt-2">Enter your password to bypass maintenance mode.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              placeholder="Enter password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full rounded-xl bg-white/5 border ${error ? 'border-red-500 animate-shake' : 'border-white/10'} px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all`}
              autoFocus
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 py-3 font-semibold text-white shadow-lg hover:from-pink-500 hover:to-purple-500 transition-all active:scale-95"
          >
            Unlock Site
          </button>
        </form>
        
        {error && (
            <p className="text-red-400 text-sm text-center mt-4">Incorrect password. Please try again.</p>
        )}
      </motion.div>
      <style>{`
        @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-5px); } 75% { transform: translateX(5px); } }
        .animate-shake { animation: shake 0.3s ease-in-out; }
      `}</style>
    </div>
  );
};

// --- MAIN APP CONTENT ---
function MainAppContent({ onLogout }: { onLogout?: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showScroll, setShowScroll] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [projects, setProjects] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const menuItems = ["About", "Projects", "Skills", "Contact"];

  useEffect(() => {
    const fetchData = async () => {
        try {
            const projectData = await sanity.fetch(`*[_type == "project"] | order(_createdAt desc)`);
            const settingsData = await sanity.fetch(`*[_type == "siteSettings"][0]`);
            setProjects(projectData);
            setSettings(settingsData);
        } catch(e) { console.error(e) }
    };
    fetchData();
  }, []);
  
  const handleMenuClick = (id: string) => {
    const targetId = id.toLowerCase();
    const el = document.getElementById(targetId);
    if (el) {
      const offset = 80;
      const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: elementPosition - offset, behavior: "smooth" });
    }
    setMenuOpen(false);
  };
  const checkScrollTop = () => {
    if (!showScroll && window.scrollY > 400) setShowScroll(true);
    else if (showScroll && window.scrollY <= 400) setShowScroll(false);
  };
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  useEffect(() => {
    const handleScroll = () => { if (menuOpen) setMenuOpen(false); checkScrollTop(); };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [menuOpen, showScroll]);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!turnstileToken) { alert("Please complete the CAPTCHA."); return; }
    setIsSubmitting(true);
    try {
      await emailjs.send(CONFIG.EMAILJS_SERVICE, CONFIG.EMAILJS_TEMPLATE, { from_name: name, from_email: email, message, "g-recaptcha-response": turnstileToken }, CONFIG.EMAILJS_PUBLIC_KEY);
      alert("Sent!"); setName(""); setEmail(""); setMessage(""); setTurnstileToken(null);
    } catch { alert("Failed."); } finally { setIsSubmitting(false); }
  };

  return (
    <div className="font-sans antialiased relative overflow-hidden">
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-black to-indigo-900 animate-gradient-slow"></div>
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-pink-500 opacity-30 blur-3xl animate-pulse"></div>
        <div className="absolute top-60 -right-40 h-96 w-96 rounded-full bg-indigo-500 opacity-30 blur-3xl animate-pulse"></div>
      </div>
      
      <header className="fixed inset-x-0 top-0 z-50">
        <Container>
          <motion.div initial={{ y: -60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="mt-4 flex items-center justify-between rounded-xl border border-white/20 bg-black/70 px-4 py-3 text-white backdrop-blur-xl shadow-lg">
            <div className="flex items-center gap-2 cursor-pointer" onClick={scrollTop}>
               <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-pink-500 to-indigo-600">
                <img src="/2bdev logo.png" alt="2BDeV logo" className="h-6 w-6" />
              </div>
              <span className="text-base font-bold tracking-tight">2BDeV</span>
            </div>
            <motion.button className="rounded-xl p-2 hover:bg-white/10" onClick={() => setMenuOpen((v) => !v)} animate={{ rotate: menuOpen ? 90 : 0 }}>
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </motion.button>
          </motion.div>
        </Container>
        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <Container>
                <ul className="mt-2 space-y-2 rounded-xl border border-white/20 bg-black/80 p-4 text-white backdrop-blur-xl">
                  {menuItems.map((item, idx) => (
                    <li key={idx} className="block rounded-xl px-3 py-2 hover:bg-white/10 cursor-pointer" onClick={() => handleMenuClick(item)}>{item}</li>
                  ))}
                  <li><PrimaryButton onClick={() => handleMenuClick('contact')}>Let’s Talk</PrimaryButton></li>
                </ul>
              </Container>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
      
      <section className="relative isolate overflow-hidden pt-40 text-white">
        <Container>
          <div className="grid items-center gap-10 md:grid-cols-2">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="mt-6 text-5xl font-extrabold leading-tight tracking-tight sm:text-6xl">
                Hi, I’m <span className="bg-gradient-to-r from-pink-400 via-fuchsia-500 to-indigo-500 bg-clip-text text-transparent">2BDeV</span>.<br />
                Web Developer, Creative Problem Solver & Photographer :)
              </h1>
              <p className="mt-4 text-white/80 max-w-xl">Btw i created this website too, cuz this is mine (˶˃ ᵕ ˂˶) </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <PrimaryButton onClick={() => handleMenuClick('contact')}>Contact Me</PrimaryButton>
                <GhostButton onClick={() => handleMenuClick('projects')}><Code className="h-4 w-4" /> View my works</GhostButton>
              </div>
            </motion.div>
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative flex justify-center"><Logo3d /></motion.div>
          </div>
        </Container>
      </section>

      <section id="about" className="relative py-24 text-white">
        <Container>
          <h2 className="text-4xl font-bold mb-6">About</h2>
          <p className="text-white/80 max-w-3xl">{settings?.aboutText || "Loading profile..."}</p>
        </Container>
      </section>

      <section id="projects" className="relative py-24 text-white">
        <Container>
          <h2 className="text-4xl font-bold mb-6">Projects</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {projects.length > 0 ? (
              projects.map((project, i) => (
                <a key={project._id || i} href={project.link} target="_blank" rel="noopener noreferrer" className="group rounded-xl bg-gradient-to-tr from-pink-500/10 to-purple-600/10 p-6 border border-white/10 transition-all duration-300 hover:scale-105 hover:border-pink-500/50">
                  <h3 className="text-xl font-semibold">{project.title}</h3>
                  <p className="mt-2 text-sm text-white/70">{project.description}</p>
                  <div className="mt-4 flex items-center gap-2 text-pink-400 text-sm font-medium">View Project <ArrowRight className="h-4 w-4" /></div>
                </a>
              ))
            ) : <p className="text-white/40">Loading projects...</p>}
          </div>
        </Container>
      </section>

      {/* --- ITT AZ ÚJ SKILLS SZEKCIÓ --- */}
      <section id="skills" className="relative py-24 text-white">
        <Container>
          <h2 className="text-4xl font-bold mb-10 text-center">My Tech Stack</h2>
          
          {settings?.skills && settings.skills.length > 0 ? (
            <div className="flex flex-wrap justify-center gap-8">
              {settings.skills.map((skill: string) => (
                <div key={skill} className="group flex flex-col items-center justify-center p-4 transition-all duration-300 hover:-translate-y-2">
                  <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 shadow-lg backdrop-blur-sm border border-white/10 transition-all group-hover:border-pink-500/50 group-hover:shadow-pink-500/20">
                    <img 
                      src={`https://cdn.simpleicons.org/${skill}/F472B6`} 
                      alt={skill}
                      className="h-8 w-8 transition-all group-hover:scale-110"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                  </div>
                  <span className="mt-3 text-sm font-medium text-white/60 group-hover:text-white transition-colors capitalize">
                    {skill.replace('dotjs', '.js').replace('webservices', '').replace('adobe', '')}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            // Ha nincs még beállítva Sanity-ben, vagy tölt, ez jelenik meg
            <p className="text-center text-white/40">Loading skills...</p>
          )}
        </Container>
      </section>

      <section id="contact" className="relative py-24 text-white">
        <Container>
          <div className="flex flex-col items-center text-center">
            <h2 className="text-4xl font-bold mb-6">Contact</h2>
            <form onSubmit={handleFormSubmit} className="w-full max-w-xl space-y-4">
              <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required className="w-full rounded-lg bg-white/10 px-4 py-2 focus:ring-2 focus:ring-pink-400" />
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full rounded-lg bg-white/10 px-4 py-2 focus:ring-2 focus:ring-pink-400" />
              <textarea placeholder="Message" rows={4} value={message} onChange={(e) => setMessage(e.target.value)} required className="w-full rounded-lg bg-white/10 px-4 py-2 focus:ring-2 focus:ring-pink-400" ></textarea>
              <div className="flex justify-center">
                <Turnstile sitekey={CONFIG.TURNSTILE_SITEKEY} onVerify={(token) => setTurnstileToken(token)} theme="dark" />
              </div>
              <PrimaryButton type="submit" disabled={isSubmitting}>{isSubmitting ? "Sending..." : "Send"}</PrimaryButton>
            </form>
          </div>
        </Container>
      </section>

      <footer className="relative py-6 text-center text-white/70 text-sm">
        <Container>
            <div className="flex flex-col items-center gap-2">
                <span>© {new Date().getFullYear()} 2BDeV Studio Inc. All rights reserved.</span>
                {localStorage.getItem("isAdmin") === "true" && (
                     <button onClick={onLogout} className="flex items-center gap-1 text-xs text-red-400 hover:text-red-300 transition-colors">
                        <LogOut className="h-3 w-3" /> Logout (Admin)
                     </button>
                )}
            </div>
        </Container>
      </footer>

      <AnimatePresence>
        {showScroll && (
          <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={scrollTop} className="fixed bottom-6 right-6 z-40 rounded-full p-4 bg-white/10 text-white backdrop-blur-xl border border-white/20 shadow-lg" >
            <ArrowUp className="h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>
      <Analytics />
      <SpeedInsights />
      <style>{`html { scroll-behavior: smooth; } .animate-gradient-slow { background-size: 400% 400%; animation: gradientBG 15s ease infinite; } @keyframes gradientBG { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }`}</style>
    </div>
  );
}

// --- GLOBAL APP COMPONENT ---
export default function App() {
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem("isAdmin") === "true");

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await sanity.fetch(`*[_type == "siteSettings"][0]`);
        setSettings(data);
      } catch (err) {
        console.error("Settings fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleLoginSuccess = () => {
      setIsAdmin(true);
  };

  const handleLogout = () => {
      localStorage.removeItem("isAdmin");
      setIsAdmin(false);
      window.location.reload(); 
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-pink-500 border-t-transparent"></div>
      </div>
    );
  }

  const showMaintenance = settings?.maintenanceMode && !isAdmin;

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<AdminLogin settings={settings} onLoginSuccess={handleLoginSuccess} />} />

        <Route 
          path="/" 
          element={
            showMaintenance ? (
              <MaintenanceScreen settings={settings} />
            ) : (
              <MainAppContent onLogout={handleLogout} />
            )
          } 
        />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
