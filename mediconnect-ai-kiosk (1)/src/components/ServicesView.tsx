import React from "react";
import { SERVICES } from "../data";
import { Clock, DollarSign, ArrowUpRight, HelpCircle } from "lucide-react";

export default function ServicesView() {
  return (
    <div className="space-y-16 pb-20 animate-fade-in" id="services-view-container">
      {/* Title */}
      <section className="text-center max-w-3xl mx-auto space-y-4 px-4">
        <span className="text-xs font-bold text-blue-600 uppercase tracking-widest font-mono">
          Clinical Portfolio
        </span>
        <h2 className="font-display font-bold text-3xl md:text-4xl text-gray-900 tracking-tight">
          Comprehensive Healthcare Offerings
        </h2>
        <p className="text-gray-500 text-sm leading-relaxed">
          Our kiosk bridges the gap between basic diagnostics and specialist expertise. Every consultant on our network is thoroughly credentialed.
        </p>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {SERVICES.map((serv, i) => (
          <div
            key={i}
            className="glass p-6 rounded-2xl shadow-xs hover:shadow-md hover:border-blue-300 hover:translate-y-[-2px] transition-all duration-200 flex flex-col justify-between"
            id={`service-tile-${i}`}
          >
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-1 rounded font-mono font-bold uppercase tracking-wider">
                  Care Sector {i + 1}
                </span>
                <div className="flex items-center space-x-1 font-mono text-xs font-bold text-gray-500">
                  <DollarSign className="h-3 w-3 text-emerald-500 -mr-0.5" />
                  <span>Cost: {serv.cost}</span>
                </div>
              </div>

              <h3 className="font-display font-extrabold text-base text-gray-900">
                {serv.title}
              </h3>
              <p className="text-gray-500 text-xs leading-relaxed">
                {serv.desc}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-50 flex items-center justify-between text-[11px] text-gray-400 font-mono">
              <div className="flex items-center space-x-1">
                <Clock className="h-3.5 w-3.5 text-blue-500" />
                <span>{serv.time}</span>
              </div>
              <span className="text-blue-500 font-semibold group cursor-pointer hover:underline flex items-center">
                Access Port <ArrowUpRight className="h-3 w-3 ml-0.5" />
              </span>
            </div>
          </div>
        ))}
      </section>

      {/* Triage Note */}
      <section className="max-w-3xl mx-auto glass p-6 rounded-2xl text-center space-y-2">
        <HelpCircle className="h-6 w-6 text-blue-600 mx-auto" />
        <h4 className="font-display font-bold text-sm text-gray-900">
          How consultations are conducted via Kiosk:
        </h4>
        <p className="text-gray-500 text-xs max-w-xl mx-auto leading-relaxed">
          1. Sit comfortably at the kiosk station. | 2. AI guides you through vitals capture. | 3. Our system selects the appropriate doctor. | 4. Video call activates; doctor views vitals; diagnostic summary and prescription are printed automatically.
        </p>
      </section>
    </div>
  );
}
