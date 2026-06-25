import React, { useState } from "react";
import { CASE_STUDIES } from "../data";
import { TrendingUp, BarChart2, ShieldCheck, MapPin, ArrowRight, BookOpen } from "lucide-react";

export default function CaseStudiesView() {
  const [activeStudyId, setActiveStudyId] = useState(CASE_STUDIES[0].id);

  const selectedStudy = CASE_STUDIES.find((cs) => cs.id === activeStudyId) || CASE_STUDIES[0];

  return (
    <div className="space-y-16 pb-20 animate-fade-in" id="case-studies-view-container">
      {/* Title */}
      <section className="text-center max-w-3xl mx-auto space-y-4 px-4">
        <span className="text-xs font-bold text-blue-600 uppercase tracking-widest font-mono">
          Proven Impact
        </span>
        <h2 className="font-display font-bold text-3xl md:text-4xl text-gray-900 tracking-tight">
          Real Deployments, Quantifiable Results
        </h2>
        <p className="text-gray-500 text-sm leading-relaxed">
          Read how our interactive telemedicine kiosk solutions have transformed patient triaging and improved wellness indices across both urban and rural setups.
        </p>
      </section>

      {/* Selectors Deck */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {CASE_STUDIES.map((cs) => (
          <button
            key={cs.id}
            onClick={() => setActiveStudyId(cs.id)}
            className={`text-left rounded-2xl p-5 transition-all duration-150 relative overflow-hidden flex flex-col justify-between h-44 cursor-pointer group ${
              activeStudyId === cs.id
                ? "glass-dark text-white border-white/10 shadow-lg"
                : "glass text-gray-900 hover:border-blue-300"
            }`}
            id={`case-study-tab-${cs.id}`}
          >
            <div className="space-y-2">
              <span className={`text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                activeStudyId === cs.id ? "bg-blue-500/15 text-blue-400" : "bg-gray-100 text-gray-500"
              }`}>
                {cs.tag}
              </span>
              <h3 className="font-display font-bold text-base group-hover:text-blue-500 transition-colors leading-tight">
                {cs.title}
              </h3>
            </div>

            <div className="flex items-center space-x-1 text-xs text-gray-400 pt-3 border-t border-gray-100/10 font-mono">
              <MapPin className={`h-3.5 w-3.5 ${activeStudyId === cs.id ? "text-teal-400" : "text-gray-400"}`} />
              <span className="truncate">{cs.location}</span>
            </div>
          </button>
        ))}
      </section>

      {/* Main Focus Study Profile Display */}
      <section className="max-w-7xl mx-auto px-4 md:px-8" id="active-case-study-display">
        <div className="glass rounded-3xl overflow-hidden shadow-xs grid grid-cols-1 lg:grid-cols-12 items-stretch">
          {/* Visual Column */}
          <div className="lg:col-span-4 relative h-64 lg:h-auto">
            <img
              src={selectedStudy.image}
              alt={selectedStudy.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-slate-900/60 flex flex-col justify-end p-6 text-white">
              <span className="text-[10px] font-mono text-teal-300 font-bold uppercase tracking-wider">
                Active Study Blueprint
              </span>
              <h4 className="font-display font-bold text-lg leading-tight mt-1">
                {selectedStudy.title}
              </h4>
            </div>
          </div>

          {/* Details Column */}
          <div className="lg:col-span-8 p-6 md:p-8 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-xs font-mono font-bold text-blue-600 uppercase">
                <BookOpen className="h-4 w-4" />
                <span>Case Analysis File: {selectedStudy.id.toUpperCase()}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                {/* Problem */}
                <div className="space-y-1.5">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">The Clinical Challenge</h4>
                  <p className="text-gray-600 text-xs md:text-sm leading-relaxed">{selectedStudy.problem}</p>
                </div>

                {/* Solution */}
                <div className="space-y-1.5">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">The Kiosk Solution</h4>
                  <p className="text-gray-600 text-xs md:text-sm leading-relaxed">{selectedStudy.solution}</p>
                </div>
              </div>
            </div>

            {/* Results metrics */}
            <div className="border-t border-gray-100 pt-6 space-y-4">
              <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                Proven Biometric Outcomes:
              </span>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {selectedStudy.results.map((res, i) => (
                  <div key={i} className="bg-white/45 p-3 rounded-xl border border-white/55 text-center space-y-1">
                    <span className="block font-display font-extrabold text-lg text-blue-600 font-mono">
                      {res.metric}
                    </span>
                    <span className="block text-[9px] text-gray-400 uppercase leading-none font-medium">
                      {res.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
