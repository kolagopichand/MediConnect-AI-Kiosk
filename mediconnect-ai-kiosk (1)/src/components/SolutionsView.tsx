import React, { useState } from "react";
import { SOLUTIONS } from "../data";
import { ShieldCheck, HelpCircle, Briefcase, Landmark, Home, PlusCircle, Globe } from "lucide-react";

export default function SolutionsView() {
  const [selectedSolutionId, setSelectedSolutionId] = useState(SOLUTIONS[0].id);

  const activeSolution = SOLUTIONS.find((sol) => sol.id === selectedSolutionId) || SOLUTIONS[0];

  const getSolutionIcon = (title: string) => {
    switch (title) {
      case "Rural Healthcare Solution":
        return <Home className="h-5 w-5" />;
      case "Corporate Wellness Solution":
        return <Briefcase className="h-5 w-5" />;
      case "Hospital Extension Solution":
        return <PlusCircle className="h-5 w-5" />;
      case "Government Healthcare Programs":
        return <Landmark className="h-5 w-5" />;
      default:
        return <Globe className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-16 pb-20 animate-fade-in" id="solutions-view-container">
      {/* Title block */}
      <section className="text-center max-w-3xl mx-auto space-y-4 px-4">
        <span className="text-xs font-bold text-blue-600 uppercase tracking-widest font-mono">
          Targeted Deployments
        </span>
        <h2 className="font-display font-bold text-3xl md:text-4xl text-gray-900 tracking-tight">
          Flexible Solutions For Various Sectors
        </h2>
        <p className="text-gray-500 text-sm md:text-base leading-relaxed">
          From solar-powered village installations with satellite relays to biometric-enabled corporate hubs and HL7-compliant hospital extensions.
        </p>
      </section>

      {/* Interactive Tabs and Showcase */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Solution Selectors Side */}
        <div className="lg:col-span-4 space-y-3" id="solutions-navigation-panel">
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
            SELECT SECTOR PROGRAM
          </div>
          {SOLUTIONS.map((sol) => (
            <button
              key={sol.id}
              onClick={() => setSelectedSolutionId(sol.id)}
              className={`w-full text-left p-4 rounded-xl border transition-all duration-150 flex items-center space-x-3 group ${
                selectedSolutionId === sol.id
                  ? "bg-blue-600 text-white border-blue-600 shadow-md"
                  : "glass text-gray-750 hover:border-blue-300"
              }`}
              id={`solution-tab-btn-${sol.id}`}
            >
              <div
                className={`p-2 rounded-lg transition-colors ${
                  selectedSolutionId === sol.id
                    ? "bg-white/10 text-white"
                    : "bg-gray-50 text-gray-500 group-hover:bg-blue-50 group-hover:text-blue-600"
                }`}
              >
                {getSolutionIcon(sol.title)}
              </div>
              <div>
                <h4 className="font-display font-bold text-sm leading-tight">{sol.title}</h4>
                <span
                  className={`text-[10px] block mt-0.5 ${
                    selectedSolutionId === sol.id ? "text-blue-200" : "text-gray-400"
                  }`}
                >
                  {sol.subtitle}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Selected Solution Display Side */}
        <div className="lg:col-span-8 glass rounded-3xl p-6 md:p-8 shadow-xs space-y-6" id="solutions-active-display">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Visual */}
            <div className="rounded-2xl overflow-hidden h-64 md:h-auto border border-gray-100 relative">
              <img
                src={activeSolution.image}
                alt={activeSolution.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-slate-900/90 text-teal-400 border border-slate-800 text-[10px] font-mono px-3 py-1 rounded-full">
                {activeSolution.subtitle.toUpperCase()}
              </div>
            </div>

            {/* Description & specs */}
            <div className="space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <h3 className="font-display font-extrabold text-2xl text-gray-900 leading-tight">
                  {activeSolution.title}
                </h3>
                <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
                  {activeSolution.desc}
                </p>
              </div>

              {/* Bullet checklist */}
              <div className="space-y-2 pt-2 border-t border-gray-50">
                <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                  Core Implementation Features:
                </span>
                {activeSolution.bullets.map((bullet, i) => (
                  <div key={i} className="flex items-start space-x-2 text-xs text-gray-700">
                    <span className="text-blue-500 font-bold mt-0.5">✓</span>
                    <p>{bullet}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Program Summary Cards */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 space-y-6">
        <div className="border-t border-gray-100 pt-12 text-center">
          <h3 className="font-display font-bold text-lg text-gray-900">
            Why Deployment Partners Choose MediConnect
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass p-6 rounded-2xl space-y-2">
            <span className="text-xs font-mono text-blue-600 font-bold">01 / ROBUST EDGE CACHING</span>
            <h4 className="font-display font-semibold text-gray-900 text-sm">Low-Bandwidth Operation</h4>
            <p className="text-gray-500 text-xs leading-relaxed">
              Kiosks feature local offline-cache databases. Diagnostic history syncs automatically as soon as satellite or cellular signal is active.
            </p>
          </div>
          <div className="glass p-6 rounded-2xl space-y-2">
            <span className="text-xs font-mono text-teal-600 font-bold">02 / INTEROPERABILITY</span>
            <h4 className="font-display font-semibold text-gray-900 text-sm">HL7 & FHIR Standard</h4>
            <p className="text-gray-500 text-xs leading-relaxed">
              Transmit sensor records directly to standard central hospital databases and government registries without secondary manual logging.
            </p>
          </div>
          <div className="glass p-6 rounded-2xl space-y-2">
            <span className="text-xs font-mono text-purple-600 font-bold">03 / BIO-AUTHENTICATION</span>
            <h4 className="font-display font-semibold text-gray-900 text-sm">Patient Biometric Logging</h4>
            <p className="text-gray-500 text-xs leading-relaxed">
              Identify patients with secure optical fingerprint readers or local NFC medical smart cards, eliminating password friction completely.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
