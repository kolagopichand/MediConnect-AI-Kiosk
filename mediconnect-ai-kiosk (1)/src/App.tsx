import React, { useState, useEffect } from "react";
import { ActiveTab, Language, UserRole } from "./types";
import { TRANSLATIONS } from "./data";

// Sub-views
import Header from "./components/Header";
import HomeView from "./components/HomeView";
import AboutView from "./components/AboutView";
import SolutionsView from "./components/SolutionsView";
import TechnologyView from "./components/TechnologyView";
import KioskView from "./components/KioskView";
import ServicesView from "./components/ServicesView";
import PricingView from "./components/PricingView";
import CaseStudiesView from "./components/CaseStudiesView";
import ContactView from "./components/ContactView";
import DashboardView from "./components/DashboardView";
import BlogView from "./components/BlogView";
import ChatAssistant from "./components/ChatAssistant";

// Lucide Icons
import {
  Activity,
  Heart,
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  Send,
  Shield,
  Clock,
  Sparkles,
} from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("home");
  const [language, setLanguage] = useState<Language>("en");
  const [userRole, setUserRole] = useState<UserRole>("patient");

  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  // Sync scroll on tab swap
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeTab]);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterSubscribed(true);
    setNewsletterEmail("");
  };

  const renderActiveView = () => {
    switch (activeTab) {
      case "home":
        return <HomeView setActiveTab={setActiveTab} language={language} />;
      case "about":
        return <AboutView />;
      case "solutions":
        return <SolutionsView />;
      case "technology":
        return <TechnologyView />;
      case "kiosk":
        return <KioskView />;
      case "services":
        return <ServicesView />;
      case "pricing":
        return <PricingView setActiveTab={setActiveTab} />;
      case "casestudies":
        return <CaseStudiesView />;
      case "blog":
        return <BlogView />;
      case "contact":
        return <ContactView setActiveTab={setActiveTab} />;
      case "dashboard":
        return <DashboardView userRole={userRole} />;
      default:
        return <HomeView setActiveTab={setActiveTab} language={language} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f1f7fa] text-gray-800 font-sans flex flex-col justify-between selection:bg-blue-100 relative overflow-hidden">
      {/* Decorative ambient background blur shapes for Frosted Glass theme */}
      <div className="absolute top-[-50px] left-[-50px] w-96 h-96 bg-teal-200/35 rounded-full blur-[100px] pointer-events-none -z-10 animate-pulse duration-[8000ms]" />
      <div className="absolute top-[40%] right-[-100px] w-[600px] h-[600px] bg-blue-200/30 rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="absolute bottom-[-100px] left-[20%] w-[500px] h-[500px] bg-emerald-100/35 rounded-full blur-[110px] pointer-events-none -z-10" />

      {/* Header element */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        language={language}
        setLanguage={setLanguage}
        userRole={userRole}
        setUserRole={setUserRole}
      />

      {/* Main body area container */}
      <main className="flex-grow max-w-7xl mx-auto px-4 md:px-8 py-10 w-full">
        {renderActiveView()}
      </main>

      {/* Floating chatbot virtual assistant */}
      <ChatAssistant />

      {/* Enterprise-grade SaaS Footer */}
      <footer className="bg-slate-900 text-white pt-16 pb-8 border-t border-slate-800 font-sans">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-slate-800">
          {/* Logo and company info */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-tr from-blue-600 to-teal-400 p-2 rounded-xl text-white">
                <Activity className="h-5 w-5" />
              </div>
              <h2 className="font-display font-bold text-lg text-slate-100">
                MediConnect <span className="text-blue-400 font-normal">AI</span>
              </h2>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-xs">
              De-centralizing clinic-grade primary healthcare through robust medical kiosk integrations and secure server-side AI differential triages.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a href="#" className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition-colors">
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 space-y-3.5">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">
              Company
            </h4>
            <div className="flex flex-col space-y-2 text-xs text-slate-300">
              <button onClick={() => setActiveTab("home")} className="text-left hover:text-white transition-colors">Home</button>
              <button onClick={() => setActiveTab("about")} className="text-left hover:text-white transition-colors">About Us</button>
              <button onClick={() => setActiveTab("solutions")} className="text-left hover:text-white transition-colors">Solutions</button>
              <button onClick={() => setActiveTab("services")} className="text-left hover:text-white transition-colors">Services</button>
              <button onClick={() => setActiveTab("contact")} className="text-left hover:text-white transition-colors">Contact & Demo</button>
              <button onClick={() => setActiveTab("dashboard")} className="text-left hover:text-white transition-colors">Provider Portal</button>
            </div>
          </div>

          {/* Resources */}
          <div className="md:col-span-2 space-y-3.5">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">
              Resources
            </h4>
            <div className="flex flex-col space-y-2 text-xs text-slate-300">
              <button onClick={() => setActiveTab("blog")} className="text-left hover:text-white transition-colors">Insights Blog</button>
              <button onClick={() => setActiveTab("casestudies")} className="text-left hover:text-white transition-colors">Case Studies</button>
              <button onClick={() => setActiveTab("pricing")} className="text-left hover:text-white transition-colors">Pricing Models</button>
              <button onClick={() => setActiveTab("technology")} className="text-left hover:text-white transition-colors">AI Diagnostics</button>
              <button onClick={() => setActiveTab("kiosk")} className="text-left hover:text-white transition-colors">Chassis Blueprint</button>
            </div>
          </div>

          {/* Newsletter Signup form */}
          <div className="md:col-span-4 space-y-3.5">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">
              Insights Newsletter
            </h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Stay updated on telemetry upgrades, hardware integrations, and epidemiological outbreak notifications.
            </p>
            {newsletterSubscribed ? (
              <div className="p-3 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-xl text-xs font-bold flex items-center space-x-1 animate-fade-in">
                <Sparkles className="h-4 w-4" />
                <span>Subscription Confirmed! Thank you!</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex space-x-2">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="name@organization.com"
                  className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-blue-500 placeholder-slate-650 flex-grow text-white"
                  required
                />
                <button
                  type="submit"
                  className="p-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors cursor-pointer"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Lower footer row and Medical Disclaimer */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="space-y-2">
            <p className="text-[11px] text-slate-400 leading-normal max-w-3xl">
              <span className="font-bold text-slate-300">Disclaimer:</span> {t.footerDisclaimer} All biometric sensor streams are encrypted under HIPAA standards.
            </p>
            <span className="text-[10px] text-slate-500 block font-mono">
              © {new Date().getFullYear()} MediConnect AI Kiosk Systems. {t.allRightsReserved}
            </span>
          </div>

          <div className="flex space-x-4 text-[10px] text-slate-500 font-mono">
            <a href="#" className="hover:text-white transition-colors">PRIVACY CODE</a>
            <span>/</span>
            <a href="#" className="hover:text-white transition-colors">HIPAA PROTOCOL</a>
            <span>/</span>
            <a href="#" className="hover:text-white transition-colors">TERMS OF SALE</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
