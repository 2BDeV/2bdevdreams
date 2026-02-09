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
  LogOut,
  ChevronLeft
} from "lucide-react";
import Turnstile from "react-turnstile";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import { createClient } from "@sanity/client";

// --- CONFIG ---
const sanity = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET,
  useCdn: true, 
  apiVersion: "2024-01-10",
});

const CONFIG = {
  GOOGLE_SCRIPT_URL: import.meta.env.VITE_GOOGLE_SCRIPT_URL || "", 
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

// --- ✅ JAVÍTOTT DYNAMIC NAVBAR ---
const DynamicNavbar = ({ 
  menuItems, 
  onMenuClick 
}: { 
  menuItems: string[], 
  onMenuClick: (id: string) => void 
}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-4 inset-x-0 z-50 flex justify-center pointer-events-none">
      <motion.div
        layout
        initial={{ width: "95%", borderRadius: 24 }}
        animate={{ 
          width: isScrolled ? "auto" : "95%",
          backgroundColor: isScrolled ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.15)" 
        }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
        className="pointer-events-auto flex items-center justify-between p-2 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden min-h-[60px]"
        style={{ maxWidth: "1280px" }}
      >
        
        {/* --- BAL OLDAL: GIF (Fent) vs LOGÓ (Lent) --- */}
        <div className="flex items-center gap-4 pl-2">
          <AnimatePresence mode="wait">
            {!isScrolled ? (
              <motion.div 
                key="video-mode"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center"
              >
                {/* ✅ GIF KERET NÉLKÜL - Cseréld ki a saját GIF-edre */}
                <div className="h-18 w-18 overflow-hidden relative bg-transparent">
                   <img 
                     src="/dreams.png" 
                     alt="Logo Animation" 
                     className="h-10 object-contain"
                   />
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="icon-mode"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="cursor-pointer"              
              >
                <img src="/2bdev logo.png" alt="Logo" className="h-8 w-8" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* --- KÖZÉP: MENÜPONTOK --- */}
        <div className="flex items-center justify-center absolute left-1/2 -translate-x-1/2">
          <AnimatePresence mode="wait">
            {!isScrolled ? (
              <motion.div 
                key="full-menu"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="hidden md:flex items-center gap-1"
              >
                {menuItems.map((item) => (
                  <button 
                    key={item} 
                    onClick={() => onMenuClick(item)}
                    className="px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all"
                  >
                    {item}
                  </button>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                key="compact-menu"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-2"
              >
                <button 
                    onClick={() => onMenuClick('Projects')} 
                    className="px-3 py-1.5 text-xs font-bold bg-white/10 rounded-full hover:bg-white/20 transition-all text-white"
                >
                  Works
                </button>
                <button 
                    onClick={() => onMenuClick('Contact')} 
                    className="px-3 py-1.5 text-xs font-bold bg-gradient-to-r from-pink-500 to-indigo-500 rounded-full text-white shadow-lg"
                >
                  Talk
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* --- JOBB OLDAL: Contact Gomb (✅ ÚJ HOVER ANIMÁCIÓ) --- */}
        <div className="flex items-center gap-2 pr-2">
            {!isScrolled && (
              <button 
                  onClick={() => onMenuClick('Contact')}
                  className="hidden sm:flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 hover:scale-105 hover:bg-gradient-to-r hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500 hover:text-white hover:shadow-lg hover:shadow-pink-500/50"
              >
                  Let's Talk <ArrowRight className="h-3 w-3" />
              </button>
            )}
        </div>

      </motion.div>
    </div>
  );
};

// --- ANIMÁLT ÁTMENET WRAPPER ---
const PageTransition = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.98 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 1.02 }}
    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} 
    className="w-full h-full"
  >
    {children}
  </motion.div>
);

// --- RETRO COOKIE CONSENT ---
const RetroCookieConsent = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      const timer = setTimeout(() => setShow(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAction = (status: "accepted" | "declined") => {
    localStorage.setItem("cookie_consent", status);
    setShow(false);
  };

  const bgColor = "#008888";

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 15 } }}
          exit={{ y: 100, opacity: 0, transition: { duration: 0.5 } }}
          className="fixed bottom-4 right-4 z-[9990] w-full max-w-sm px-4 md:px-0 pointer-events-auto"
        >
          <div className="border-2 border-gray-400 shadow-[8px_8px_0px_rgba(0,0,0,0.8)] text-white overflow-hidden font-mono text-sm" style={{ backgroundColor: bgColor }}>
            <div className="border border-white/40 m-1 flex flex-col">
              <div className="flex justify-between items-center px-2 py-1 border-b border-white/40 bg-black/10">
                <span className="font-bold uppercase tracking-wider animate-pulse text-yellow-300">[ COOKIE_PROTOCOL.EXE ]</span>
                <button onClick={() => handleAction("declined")} className="hover:text-black hover:bg-white px-1">[x]</button>
              </div>
              <div className="p-4 text-center">
                <p className="mb-4 leading-relaxed drop-shadow-md">We use cookies to optimize system performance and analyze data streams.</p>
                <a href="/legal.html" target="_blank" className="text-xs uppercase underline hover:text-yellow-300 mb-4 block">View Privacy Protocols</a>
                <div className="flex gap-2 justify-center mt-2">
                  <button onClick={() => handleAction("declined")} className="flex-1 border border-white/50 py-1 hover:bg-white hover:text-black transition-colors uppercase text-xs">[ Decline ]</button>
                  <button onClick={() => handleAction("accepted")} className="flex-1 border-2 border-white bg-black/20 py-1 hover:bg-white hover:text-black transition-colors uppercase font-bold text-xs shadow-[2px_2px_0px_black]">[ Accept ]</button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- RETRO SYSTEM MESSAGE COMPONENT ---
const RetroSystemMessage = ({ data, updatedAt }: { data: any, updatedAt?: string }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!data || !data.isActive || !data.text) { setIsVisible(false); return; }
    const now = new Date();
    if (data.startDate && new Date(data.startDate) > now) { setIsVisible(false); return; }
    if (data.endDate && new Date(data.endDate) < now) { setIsVisible(false); return; }

    const storageKey = `sys_msg_${btoa(encodeURIComponent(data.text)).slice(0, 16)}`;
    const isClosed = localStorage.getItem(storageKey);
    if (data.closable && isClosed) { setIsVisible(false); } else { setIsVisible(true); }
  }, [data]);

  const handleClose = () => {
    setIsVisible(false);
    if (data.closable && data.text) {
      const storageKey = `sys_msg_${btoa(encodeURIComponent(data.text)).slice(0, 16)}`;
      localStorage.setItem(storageKey, "true");
    }
  };

  const dateStr = data.startDate || updatedAt || new Date().toISOString();
  const displayDate = new Date(dateStr).toISOString().replace("T", " ").substring(0, 16);
  const getRetroColor = (type: string) => { switch (type) { case 'error': return '#AA0000'; case 'warning': return '#AA5500'; case 'success': return '#00AA00'; case 'brand': return '#AA00AA'; case 'info': default: return '#0000AA'; } };
  const bgColor = getRetroColor(data.type);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div key="retro-overlay" className="fixed inset-0 z-[9999] flex items-center justify-center font-mono p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { delay: 0.8, duration: 0.5 } }}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={data.closable ? handleClose : undefined}></div>
          <motion.div key="retro-window" initial={{ scaleY: 0, scaleX: 0.1, opacity: 0 }} animate={{ scaleY: 1, scaleX: 1, opacity: 1, transition: { type: "spring", stiffness: 120, damping: 15, mass: 0.5 } }} exit={{ scaleY: 0.001, scaleX: 0, opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }} className="relative w-full max-w-lg border-2 border-gray-400 shadow-[12px_12px_0px_rgba(0,0,0,0.6)] text-white overflow-hidden" style={{ backgroundColor: bgColor }}>
            <div className="border border-white/40 m-1 flex flex-col relative h-full">
              <div className="flex justify-between items-center px-3 py-2 border-b border-white/40 select-none" style={{ backgroundColor: bgColor }}>
                <span className="text-xs text-yellow-300 font-bold uppercase tracking-wider animate-pulse">{displayDate}</span>
                {data.closable && (<button onClick={handleClose} className="text-white hover:bg-white hover:text-black px-2 font-bold transition-colors uppercase border border-transparent hover:border-white">[ X ]</button>)}
              </div>
              <div className="p-8 text-center min-h-[140px] flex flex-col items-center justify-center" style={{ backgroundColor: bgColor }}>
                <p className="text-lg md:text-xl leading-relaxed whitespace-pre-wrap font-bold tracking-wide drop-shadow-md">{data.text}</p>
                {data.link && (<div className="mt-6"><a href={data.link} target="_blank" rel="noreferrer" className="inline-block bg-gray-300 px-6 py-2 font-bold hover:bg-white transition-colors shadow-[4px_4px_0px_black] uppercase text-sm border-2 border-black" style={{ color: bgColor }}>&lt; Open Link &gt;</a></div>)}
              </div>
              <div className="border-t border-white/40 py-2 text-center select-none" style={{ backgroundColor: bgColor }}><span className="text-xs text-gray-300 font-bold tracking-widest">&lt; 2BDeV Studio &gt;</span></div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- MAINTENANCE SCREEN ---
const MaintenanceScreen = ({ settings }: { settings: any }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => { setMousePos({ x: (window.innerWidth / 2 - e.pageX) / 50, y: (window.innerHeight / 2 - e.pageY) / 50 }); };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <PageTransition>
      <div className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-[#0a0a0a] text-white font-sans">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_50%,#1a1a1a_0%,#0a0a0a_100%)]"></div>
        <motion.div className="relative z-10 text-center px-4" animate={{ x: mousePos.x, y: mousePos.y }} transition={{ type: "tween", ease: "linear", duration: 0.2 }}>
          <div className="mx-auto mb-10 flex h-[120px] w-[120px] items-center justify-center rounded-full border border-white animate-breathe"><div className="h-2.5 w-2.5 rounded-full bg-white"></div></div>
          <h1 className="mb-4 text-sm font-light uppercase tracking-[12px] opacity-90 text-white">Under Construction</h1>
          <p className="mb-10 text-[11px] uppercase tracking-[4px] text-gray-500 max-w-md mx-auto leading-relaxed">{settings?.maintenanceMessage || "We are currently evolving. Check back soon."}</p>
          <button onClick={() => navigate('/contact')} className="group relative px-8 py-3 text-[10px] uppercase tracking-[3px] text-white overflow-hidden rounded-full border border-white/20 bg-transparent hover:bg-white/5 transition-all"><span className="relative z-10 group-hover:text-white transition-colors">Contact Us</span></button>
        </motion.div>
        <div className="fixed bottom-8 w-full text-center z-10 opacity-40">
          <p className="text-[10px] tracking-[2px] text-white">&copy; {new Date().getFullYear()} 2BDeV Studio.</p>
          <a href="https://2bdevon.top/legal-2bdevmail" target="_blank" rel="noopener noreferrer" className="text-[10px] tracking-[2px] text-white hover:opacity-100 transition-opacity underline">Privacy Policy and Terms of Service</a>
        </div>
        <style>{`@keyframes breathe { 0% { transform: scale(1); opacity: 0.3; box-shadow: 0 0 0px white; } 50% { transform: scale(1.1); opacity: 1; box-shadow: 0 0 30px rgba(255,255,255,0.1); } 100% { transform: scale(1); opacity: 0.3; box-shadow: 0 0 0px white; } } .animate-breathe { animation: breathe 4s ease-in-out infinite; }`}</style>
      </div>
    </PageTransition>
  );
};

// --- DEDICATED CONTACT PAGE ---
const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!turnstileToken) { alert("Please complete the CAPTCHA."); return; }
    setIsSubmitting(true);
    let ipData = { ip: "Unknown", country_name: "Unknown", city: "Unknown" };
    try { const res = await fetch("https://ipapi.co/json/"); if (res.ok) ipData = await res.json(); } catch (err) {}

    const scriptData = new URLSearchParams();
    scriptData.append("name", name);
    scriptData.append("email", email);
    scriptData.append("message", message);
    scriptData.append("userIp", ipData.ip || "Unknown");
    scriptData.append("userLocation", `${ipData.country_name || "?"}, ${ipData.city || "?"}`);
    scriptData.append("turnstileToken", turnstileToken); 

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      await fetch(CONFIG.GOOGLE_SCRIPT_URL, { method: "POST", mode: "no-cors", body: scriptData });
      alert("Message sent successfully! 🚀 Note: If you do not see the confirmation email, please check your spam folder. If you did not receive a confirmation email in any way, it is likely that your email did not reach us. In this case, you can also contact us via this email: [contact-error@2bdevon.top](mailto:contact-error@2bdevon.top) ");
      navigate('/');
    } catch (error) {
      console.error("Submission error:", error);
      alert("Something went wrong. Please try again.");
    } finally { setIsSubmitting(false); }
  };

  return (
    <PageTransition>
      <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a] text-white font-sans relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#1a1a1a_0%,#0a0a0a_100%)] z-0"></div>
         <div className="relative z-10 w-full max-w-lg p-6">
            <button onClick={() => navigate('/')} className="mb-8 flex items-center gap-2 text-[10px] uppercase tracking-[2px] text-gray-500 hover:text-white transition-colors"><ChevronLeft className="h-4 w-4" /> Back</button>
            <h1 className="text-2xl font-light uppercase tracking-[8px] mb-2 text-white">Get in Touch</h1>
            <p className="text-gray-500 mb-8 text-[11px] uppercase tracking-[2px]">Fill out the form below.</p>
            <form onSubmit={handleSubmit} className="space-y-5">
              <input name="name" type="text" placeholder="NAME" value={name} onChange={(e) => setName(e.target.value)} required className="w-full rounded-xl bg-[#111] border border-[#333] p-4 text-xs text-white placeholder-gray-600 focus:border-white focus:outline-none transition-all tracking-wider" />
              <input name="email" type="email" placeholder="EMAIL" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full rounded-xl bg-[#111] border border-[#333] p-4 text-xs text-white placeholder-gray-600 focus:border-white focus:outline-none transition-all tracking-wider" />
              <textarea name="message" rows={5} placeholder="MESSAGE" value={message} onChange={(e) => setMessage(e.target.value)} required className="w-full rounded-xl bg-[#111] border border-[#333] p-4 text-xs text-white placeholder-gray-600 focus:border-white focus:outline-none transition-all resize-none tracking-wider" />
              <div className="flex justify-center py-2 grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all"><Turnstile sitekey={CONFIG.TURNSTILE_SITEKEY} onVerify={(token) => setTurnstileToken(token)} theme="dark" /></div>
              <button type="submit" disabled={isSubmitting} className="w-full rounded-xl border border-white bg-transparent py-4 text-[11px] font-bold uppercase tracking-[3px] text-white hover:bg-white hover:text-black disabled:opacity-50 disabled:cursor-not-allowed transition-all">{isSubmitting ? "Sending..." : "Send Message"}</button>
            </form>
         </div>
      </div>
    </PageTransition>
  );
};

// --- LOGIN SCREEN ---
const AdminLogin = ({ settings, onLoginSuccess }: { settings: any, onLoginSuccess: () => void }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  useEffect(() => { if (localStorage.getItem("isAdmin") === "true") { navigate("/"); } }, [navigate]);
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); if (password === (settings?.adminPassword || "admin")) { localStorage.setItem("isAdmin", "true"); onLoginSuccess(); navigate("/"); } else { setError(true); setTimeout(() => setError(false), 2000); } };
  return (
    <PageTransition>
      <div className="flex min-h-screen items-center justify-center bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-black to-indigo-900/40"></div>
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative z-10 w-full max-w-md p-8 rounded-2xl border border-white/10 bg-black/60 backdrop-blur-xl shadow-2xl">
          <h2 className="text-2xl font-bold text-white text-center mb-8">Admin Access</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className={`w-full rounded-xl bg-white/5 border ${error ? 'border-red-500 animate-shake' : 'border-white/10'} px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all`} autoFocus />
            <button type="submit" className="w-full rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 py-3 font-semibold text-white hover:from-pink-500 hover:to-purple-500 transition-all">Unlock Site</button>
          </form>
        </motion.div>
        <style>{`@keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-5px); } 75% { transform: translateX(5px); } } .animate-shake { animation: shake 0.3s ease-in-out; }`}</style>
      </div>
    </PageTransition>
  );
};

// --- MAIN APP CONTENT ---
function MainAppContent({ onLogout }: { onLogout?: () => void }) {
  const [showScroll, setShowScroll] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [projects, setProjects] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const navigate = useNavigate();
  
  const menuItems = ["About", "Projects", "Skills"]; 

  useEffect(() => {
    const fetchData = async () => {
        try { const projectData = await sanity.fetch(`*[_type == "project"] | order(_createdAt desc)`); const settingsData = await sanity.fetch(`*[_type == "siteSettings"][0]`); setProjects(projectData); setSettings(settingsData); } catch(e) { console.error(e) }
    };
    fetchData();
  }, []);
  
  const handleMenuClick = (id: string) => { 
    const targetId = id.toLowerCase(); 
    if (targetId === 'contact') { navigate('/contact'); return; }
    const el = document.getElementById(targetId); 
    if (el) { const offset = 120; const elementPosition = el.getBoundingClientRect().top + window.pageYOffset; window.scrollTo({ top: elementPosition - offset, behavior: "smooth" }); } 
  };
  
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  useEffect(() => { const handleScroll = () => { if(window.scrollY > 400) setShowScroll(true); else setShowScroll(false); }; window.addEventListener("scroll", handleScroll); return () => window.removeEventListener("scroll", handleScroll); }, [showScroll]);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!turnstileToken) { alert("Please complete the CAPTCHA."); return; }
    setIsSubmitting(true);
    let ipData = { ip: "Unknown", country_name: "Unknown", city: "Unknown" };
    try { const res = await fetch("https://ipapi.co/json/"); if (res.ok) ipData = await res.json(); } catch (err) {}
    
    const scriptData = new URLSearchParams();
    scriptData.append("name", name);
    scriptData.append("email", email);
    scriptData.append("message", message);
    scriptData.append("userIp", ipData.ip);
    scriptData.append("userLocation", `${ipData.country_name}, ${ipData.city}`);
    scriptData.append("turnstileToken", turnstileToken); 

    try { 
      await new Promise(resolve => setTimeout(resolve, 1500));
      await fetch(CONFIG.GOOGLE_SCRIPT_URL, { method: "POST", mode: "no-cors", body: scriptData }); 
      alert("Message sent successfully! 🚀 Note: If you do not see the confirmation email, please check your spam folder. If you did not receive a confirmation email in any way, it is likely that your email did not reach us. In this case, you can also contact us via this email: [contact-error@2bdevon.top](mailto:contact-error@2bdevon.top) "); 
      setName(""); setEmail(""); setMessage(""); setTurnstileToken(null); 
    } 
    catch (err) { alert("Error sending message."); console.error(err); } finally { setIsSubmitting(false); }
  };

  return (
    <PageTransition>
      <div className="font-sans antialiased relative overflow-hidden min-h-screen">
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-black to-indigo-900 animate-gradient-slow"></div>
          <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-pink-500 opacity-30 blur-3xl animate-pulse"></div>
          <div className="absolute top-60 -right-40 h-96 w-96 rounded-full bg-indigo-500 opacity-30 blur-3xl animate-pulse"></div>
        </div>

        <div className="relative z-10">
          
          {/* ✅ JAVÍTOTT LEBEGŐ MENÜ */}
          <DynamicNavbar 
            menuItems={menuItems} 
            onMenuClick={handleMenuClick} 
          />

          <section className="relative isolate overflow-hidden pt-48 text-white">
            <Container>
              <div className="grid items-center gap-10 md:grid-cols-2">
                <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
                  <h1 className="mt-6 text-5xl font-extrabold leading-tight tracking-tight sm:text-6xl">Hi, I'm <span className="bg-gradient-to-r from-pink-400 via-fuchsia-500 to-indigo-500 bg-clip-text text-transparent">2BDeV</span>.<br />Web Developer, Creative Problem Solver & Photographer :)</h1>
                  <p className="mt-4 text-white/80 max-w-xl">Btw i created this website too, cuz this is mine (˶˃ ᵕ ˂˶) </p>
                  <div className="mt-8 flex flex-wrap items-center gap-3"><PrimaryButton onClick={() => navigate('/contact')}>Contact Me</PrimaryButton><GhostButton onClick={() => handleMenuClick('projects')}><Code className="h-4 w-4" /> View my works</GhostButton></div>
                </motion.div>
                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative flex justify-center"><Logo3d /></motion.div>
              </div>
            </Container>
          </section>
          
          <section id="about" className="relative py-24 text-white"><Container><h2 className="text-4xl font-bold mb-6">About</h2><p className="text-white/80 max-w-3xl">{settings?.aboutText || "Loading profile..."}</p></Container></section>
          <section id="projects" className="relative py-24 text-white"><Container><h2 className="text-4xl font-bold mb-6">Projects</h2><div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">{projects.length > 0 ? (projects.map((project, i) => (<a key={project._id || i} href={project.link} target="_blank" rel="noopener noreferrer" className="group rounded-xl bg-gradient-to-tr from-pink-500/10 to-purple-600/10 p-6 border border-white/10 transition-all duration-300 hover:scale-105 hover:border-pink-500/50"><h3 className="text-xl font-semibold">{project.title}</h3><p className="mt-2 text-sm text-white/70">{project.description}</p><div className="mt-4 flex items-center gap-2 text-pink-400 text-sm font-medium">View Project <ArrowRight className="h-4 w-4" /></div></a>))) : <p className="text-white/40">Loading projects...</p>}</div></Container></section>
          <section id="skills" className="relative py-24 text-white"><Container><h2 className="text-4xl font-bold mb-10 text-center">My Tech Stack</h2>{settings?.skills && settings.skills.length > 0 ? (<div className="flex flex-wrap justify-center gap-8">{settings.skills.map((skill: string) => (<div key={skill} className="group flex flex-col items-center justify-center p-4 transition-all duration-300 hover:-translate-y-2"><div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 shadow-lg backdrop-blur-sm border border-white/10 transition-all group-hover:border-pink-500/50 group-hover:shadow-pink-500/20"><img src={`https://cdn.simpleicons.org/${skill}/F472B6`} alt={skill} className="h-8 w-8 transition-all group-hover:scale-110" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} /></div><span className="mt-3 text-sm font-medium text-white/60 group-hover:text-white transition-colors capitalize">{skill.replace('dotjs', '.js').replace('webservices', '').replace('adobe', '')}</span></div>))}</div>) : (<p className="text-center text-white/40">Loading skills...</p>)}</Container></section>
          
          <section className="relative py-24 text-white"><Container><div className="flex flex-col items-center text-center"><h2 className="text-4xl font-bold mb-6">Quick Message</h2><form onSubmit={handleFormSubmit} className="w-full max-w-xl space-y-4"><input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required className="w-full rounded-lg bg-white/10 px-4 py-2 focus:ring-2 focus:ring-pink-400" /><input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full rounded-lg bg-white/10 px-4 py-2 focus:ring-2 focus:ring-pink-400" /><textarea placeholder="Message" rows={4} value={message} onChange={(e) => setMessage(e.target.value)} required className="w-full rounded-lg bg-white/10 px-4 py-2 focus:ring-2 focus:ring-pink-400" ></textarea><div className="flex justify-center"><Turnstile sitekey={CONFIG.TURNSTILE_SITEKEY} onVerify={(token) => setTurnstileToken(token)} theme="dark" /></div><PrimaryButton type="submit" disabled={isSubmitting}>{isSubmitting ? "Sending..." : "Send"}</PrimaryButton></form></div></Container></section>
          <footer className="relative py-6 text-center text-white/70 text-sm"><Container><div className="flex flex-col items-center gap-2"><span>© {new Date().getFullYear()} 2BDeV Studio Inc. All rights reserved.</span>{localStorage.getItem("isAdmin") === "true" && (<button onClick={onLogout} className="flex items-center gap-1 text-xs text-red-400 hover:text-red-300 transition-colors"><LogOut className="h-3 w-3" /> Logout (Admin)</button>)}</div></Container></footer>
          <AnimatePresence>{showScroll && (<motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={scrollTop} className="fixed bottom-6 right-6 z-40 rounded-full p-4 bg-white/10 text-white backdrop-blur-xl border border-white/20 shadow-lg" ><ArrowUp className="h-6 w-6" /></motion.button>)}</AnimatePresence>
        </div>
        <Analytics />
        <SpeedInsights />
        <style>{`html { scroll-behavior: smooth; } .animate-gradient-slow { background-size: 400% 400%; animation: gradientBG 15s ease infinite; } @keyframes gradientBG { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }`}</style>
      </div>
    </PageTransition>
  );
}

// --- GLOBAL ROUTING & ANIMATIONS ---
function AnimatedRoutes({ settings, onLoginSuccess, onLogout, showMaintenance }: any) {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/login" element={<AdminLogin settings={settings} onLoginSuccess={onLoginSuccess} />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/" element={showMaintenance ? (<MaintenanceScreen settings={settings} />) : (<MainAppContent onLogout={onLogout} />)} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem("isAdmin") === "true");

  useEffect(() => {
    const fetchSettings = async () => { try { const data = await sanity.fetch(`*[_type == "siteSettings"][0]`); setSettings(data); } catch (err) { console.error("Settings fetch error:", err); } finally { setLoading(false); } };
    fetchSettings();
  }, []);

  const handleLoginSuccess = () => { setIsAdmin(true); };
  const handleLogout = () => { localStorage.removeItem("isAdmin"); setIsAdmin(false); window.location.reload(); };

  if (loading) return <div className="flex min-h-screen items-center justify-center bg-black text-white"><div className="h-12 w-12 animate-spin rounded-full border-4 border-pink-500 border-t-transparent"></div></div>;
  const showMaintenance = settings?.maintenanceMode && !isAdmin;

  return (
    <Router>
      <RetroCookieConsent />
      {settings?.announcement && (<RetroSystemMessage data={settings.announcement} updatedAt={settings?._updatedAt} />)}
      <AnimatedRoutes settings={settings} onLoginSuccess={handleLoginSuccess} onLogout={handleLogout} showMaintenance={showMaintenance} />
    </Router>
  );
}
