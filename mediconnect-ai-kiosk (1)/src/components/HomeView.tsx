import React from "react";
import { ActiveTab, Language } from "../types";
import { TRANSLATIONS, FEATURES, STATISTICS, BENEFITS, TESTIMONIALS } from "../data";
import {
  ArrowRight,
  ShieldCheck,
  UserCheck,
  Heart,
  TrendingUp,
  Globe2,
  Users,
  Video,
  Database,
  Cpu,
  Tv,
  CheckCircle,
  FileSpreadsheet,
  Activity,
  Award,
} from "lucide-react";

interface HomeViewProps {
  setActiveTab: (tab: ActiveTab) => void;
  language: Language;
}

export default function HomeView({ setActiveTab, language }: HomeViewProps) {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const getFeatureIcon = (title: string) => {
    switch (title) {
      case "AI Symptom Assessment":
        return <Cpu className="h-6 w-6 text-blue-600" />;
      case "Remote Doctor Consultation":
        return <Video className="h-6 w-6 text-teal-600" />;
      case "Vital Signs Monitoring":
        return <Activity className="h-6 w-6 text-red-500" />;
      case "Electronic Medical Records":
        return <Database className="h-6 w-6 text-indigo-600" />;
      case "E-Prescription Services":
        return <CheckCircle className="h-6 w-6 text-green-600" />;
      case "Multi-Language Support":
        return <Globe2 className="h-6 w-6 text-amber-600" />;
      case "Secure Cloud Platform":
        return <ShieldCheck className="h-6 w-6 text-cyan-600" />;
      case "Real-Time Health Analytics":
        return <TrendingUp className="h-6 w-6 text-purple-600" />;
      default:
        return <Activity className="h-6 w-6 text-blue-600" />;
    }
  };

  return (
    <div className="space-y-24 pb-20 animate-fade-in" id="home-view-container">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden py-16 md:py-24 px-4 md:px-8">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-100/30 rounded-full blur-3xl -z-10" />
        <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-teal-100/20 rounded-full blur-2xl -z-10" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Text */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center space-x-1.5 bg-blue-50 border border-blue-100 rounded-full px-3 py-1 text-xs font-semibold text-blue-700">
              <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
              <span>ISO 13485 Certified Medical Solution</span>
            </div>
            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-gray-900 tracking-tight leading-tight">
              {t.heroTitle}
            </h1>
            <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {t.heroSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => setActiveTab("contact")}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white font-semibold rounded-xl shadow-lg shadow-blue-100 hover:shadow-xl hover:shadow-blue-200 transition-all duration-200 flex items-center justify-center space-x-2"
                id="hero-book-demo-btn"
              >
                <span>{t.bookDemo}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => setActiveTab("kiosk")}
                className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-xl border border-gray-200 shadow-sm transition-colors duration-150 flex items-center justify-center space-x-2"
                id="hero-learn-more-btn"
              >
                <span>{t.learnMore}</span>
              </button>
            </div>

            {/* Quick trust metrics */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-gray-100 max-w-md mx-auto lg:mx-0">
              <div>
                <span className="block font-display font-bold text-xl text-blue-600">HIPAA</span>
                <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Compliant</span>
              </div>
              <div className="border-x border-gray-100">
                <span className="block font-display font-bold text-xl text-teal-600">FDA-Grade</span>
                <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Sensors</span>
              </div>
              <div>
                <span className="block font-display font-bold text-xl text-indigo-600">98%</span>
                <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Accuracy</span>
              </div>
            </div>
          </div>

          {/* Hero Visual Block */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none bg-slate-900 rounded-3xl p-4 shadow-2xl shadow-slate-300 border-4 border-slate-800">
              {/* Virtual Screen Header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4 px-2">
                <div className="flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                </div>
                <div className="bg-slate-800 text-[10px] font-mono font-medium px-3 py-1 rounded-full text-blue-300">
                  Patient Portal ID: MK-9082
                </div>
              </div>

              {/* Patient Session Preview */}
              <div className="space-y-4">
                <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 relative overflow-hidden">
                  <div className="absolute top-2 right-2 bg-red-500/20 text-red-400 border border-red-500/30 text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center space-x-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-ping" />
                    <span>LIVE VITAL STREAM</span>
                  </div>
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Patient Vitals Audit</h4>
                  <div className="grid grid-cols-2 gap-3 mt-3">
                    <div className="bg-slate-900 p-3 rounded-lg border border-slate-800/80">
                      <span className="block text-[10px] text-slate-500 font-bold uppercase">Blood Pressure</span>
                      <span className="font-mono text-lg font-bold text-white leading-none">124/82 <span className="text-xs font-normal text-slate-400">mmHg</span></span>
                      <span className="block text-[9px] text-emerald-400 font-medium mt-1">● Optimal Range</span>
                    </div>
                    <div className="bg-slate-900 p-3 rounded-lg border border-slate-800/80">
                      <span className="block text-[10px] text-slate-500 font-bold uppercase">Oxygen SpO2</span>
                      <span className="font-mono text-lg font-bold text-cyan-400 leading-none">98.5%</span>
                      <span className="block text-[9px] text-emerald-400 font-medium mt-1">● Healthy Range</span>
                    </div>
                  </div>
                </div>

                {/* Simulated Doctor Consultation Video View */}
                <div className="relative bg-slate-950 aspect-video rounded-xl overflow-hidden border border-slate-800">
                  <img
                    src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600"
                    alt="Telehealth Doctor Video Consultation"
                    className="w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute bottom-2 left-2 bg-slate-900/95 border border-slate-800 rounded-lg p-2 flex items-center space-x-2">
                    <div className="h-7 w-7 rounded-full bg-teal-500/10 flex items-center justify-center text-teal-400 font-bold text-[10px]">
                      GP
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-white">Dr. Allison Vance, MD</span>
                      <span className="block text-[9px] text-slate-400">Apollo Hospital Delhi Portal</span>
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-teal-500 text-white text-[9px] font-bold px-2 py-1 rounded-md flex items-center space-x-1 shadow-md">
                    <Video className="h-3 w-3" />
                    <span>CONNECTED</span>
                  </div>
                </div>
              </div>

              {/* Subtitle Indicator */}
              <div className="mt-4 text-center">
                <span className="text-slate-500 text-[11px] font-mono font-medium">
                  Remote Diagnostics Tele-Platform v3.5
                </span>
              </div>
            </div>

            {/* Backdrops elements */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-teal-400/20 rounded-2xl blur-lg" />
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-blue-400/20 rounded-full blur-xl" />
          </div>
        </div>
      </section>

      {/* 2. Statistics Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-teal-600 rounded-3xl text-white p-8 md:p-12 shadow-xl shadow-blue-100">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {STATISTICS.map((stat, i) => (
              <div key={i} className="space-y-2 border-r last:border-r-0 border-white/10 px-2">
                <span className="block font-display font-bold text-4xl md:text-5xl tracking-tight text-teal-100 animate-pulse">
                  {stat.value}
                </span>
                <span className="block font-semibold text-sm text-white">{stat.label}</span>
                <span className="block text-xs text-blue-100/80 font-mono font-light">{stat.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Features Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest font-mono">
            State Of The Art Technology
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-gray-900 tracking-tight">
            {t.featuresTitle}
          </h2>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            {t.featuresSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feat) => (
            <div
              key={feat.id}
              className="glass p-6 rounded-2xl shadow-xs hover:shadow-md hover:border-blue-300 hover:translate-y-[-2px] transition-all duration-200 space-y-4 flex flex-col justify-between"
              id={`feature-card-${feat.id}`}
            >
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 rounded-xl w-fit">
                  {getFeatureIcon(feat.title)}
                </div>
                <h3 className="font-display font-semibold text-base text-gray-900">
                  {feat.title}
                </h3>
                <p className="text-gray-500 text-xs leading-relaxed">
                  {feat.description}
                </p>
              </div>
              <div className="pt-2 border-t border-gray-50 flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                <span className="font-mono">{feat.category}</span>
                <span className="text-blue-500">Active Sensors</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Benefits Matrix */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
        {/* Patient benefits */}
        <div className="glass p-8 rounded-2xl shadow-xs space-y-6">
          <div className="flex items-center space-x-3 border-b border-gray-100 pb-4">
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
              <Heart className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-display font-bold text-xl text-gray-900">
                {t.patientBenefits}
              </h3>
              <p className="text-xs text-gray-400">Empowering health convenience & speed</p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-5">
            {BENEFITS.patients.map((item, i) => (
              <div key={i} className="flex items-start space-x-3">
                <div className="mt-1 h-5 w-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 text-xs font-bold">
                  ✓
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-gray-900">{item.title}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Provider benefits */}
        <div className="glass p-8 rounded-2xl shadow-xs space-y-6">
          <div className="flex items-center space-x-3 border-b border-gray-100 pb-4">
            <div className="p-2.5 bg-teal-50 text-teal-600 rounded-xl">
              <Award className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-display font-bold text-xl text-gray-900">
                {t.providerBenefits}
              </h3>
              <p className="text-xs text-gray-400">Decentralizing diagnostics & workflow scale</p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-5">
            {BENEFITS.providers.map((item, i) => (
              <div key={i} className="flex items-start space-x-3">
                <div className="mt-1 h-5 w-5 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center flex-shrink-0 text-xs font-bold">
                  ✓
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-gray-900">{item.title}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Testimonials Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="text-xs font-bold text-teal-600 uppercase tracking-widest font-mono">
            User Success Stories
          </span>
          <h2 className="font-display font-bold text-3xl text-gray-900">
            Trusted by Patients & Physicians Globally
          </h2>
          <p className="text-gray-500 text-sm">
            Hear from community leaders, clinical providers, and patients utilizing our telehealth kiosks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((test, index) => (
            <div
              key={index}
              className={`p-6 rounded-2xl flex flex-col justify-between space-y-6 transition-all duration-150 ${
                test.type === "provider"
                  ? "glass-dark text-white border-white/10 shadow-lg"
                  : "glass text-gray-900 shadow-xs"
              }`}
            >
              <div className="space-y-3">
                {/* Five star indicator */}
                <div className="flex items-center space-x-1">
                  {[...Array(test.rating)].map((_, i) => (
                    <span key={i} className="text-amber-400 font-bold text-sm">
                      ★
                    </span>
                  ))}
                </div>
                <p
                  className={`text-sm italic leading-relaxed ${
                    test.type === "provider" ? "text-slate-300" : "text-gray-600"
                  }`}
                >
                  "{test.quote}"
                </p>
              </div>

              <div className="flex items-center space-x-3 pt-3 border-t border-gray-100/10">
                <div
                  className={`h-9 w-9 rounded-full flex items-center justify-center font-bold text-xs ${
                    test.type === "provider" ? "bg-teal-500 text-slate-900" : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {test.author[0]}
                </div>
                <div>
                  <h4 className="font-bold text-sm leading-none">{test.author}</h4>
                  <span
                    className={`text-[10px] uppercase font-mono tracking-wider block mt-1 ${
                      test.type === "provider" ? "text-teal-400" : "text-gray-400"
                    }`}
                  >
                    {test.role}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Lead Generation CTA */}
      <section className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="bg-slate-900 rounded-3xl p-8 md:p-16 text-center text-white space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl" />

          <h2 className="font-display font-bold text-3xl md:text-4xl max-w-2xl mx-auto leading-tight">
            Ready to Bring Virtual Clinic Capabilities to Your Community?
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto leading-relaxed">
            Schedule a live hardware and software demonstration with our implementation specialists today. Custom clinical parameters are configurable.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => setActiveTab("contact")}
              className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all shadow-md shadow-blue-900/30"
              id="cta-book-demo-btn"
            >
              Book My Demonstration
            </button>
            <button
              onClick={() => setActiveTab("pricing")}
              className="w-full sm:w-auto px-8 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold rounded-xl transition-all"
              id="cta-view-plans-btn"
            >
              View Pricing Models
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
