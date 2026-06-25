import React, { useState } from "react";
import { KIOSK_COMPONENTS } from "../data";
import {
  Video,
  Tv,
  Heart,
  Activity,
  Thermometer,
  Layers,
  Cpu,
  FileText,
  Printer,
  ChevronRight,
  Info,
} from "lucide-react";

export default function KioskView() {
  const [activeComponentName, setActiveComponentName] = useState(KIOSK_COMPONENTS[0].name);

  const selectedComponent = KIOSK_COMPONENTS.find((c) => c.name === activeComponentName) || KIOSK_COMPONENTS[0];

  const getComponentIcon = (iconName: string) => {
    switch (iconName) {
      case "Video":
        return <Video className="h-4 w-4" />;
      case "Tv":
        return <Tv className="h-4 w-4" />;
      case "Heart":
        return <Heart className="h-4 w-4" />;
      case "Thermometer":
        return <Thermometer className="h-4 w-4" />;
      case "Layers":
        return <Layers className="h-4 w-4" />;
      case "Cpu":
        return <Cpu className="h-4 w-4" />;
      case "FileText":
        return <FileText className="h-4 w-4" />;
      case "Printer":
        return <Printer className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-16 pb-20 animate-fade-in" id="kiosk-view-container">
      {/* Title block */}
      <section className="text-center max-w-3xl mx-auto space-y-4 px-4">
        <span className="text-xs font-bold text-blue-600 uppercase tracking-widest font-mono">
          Hardware Showcase
        </span>
        <h2 className="font-display font-bold text-3xl md:text-4xl text-gray-900 tracking-tight">
          MediConnect AI Kiosk Blueprint
        </h2>
        <p className="text-gray-500 text-sm leading-relaxed">
          An elegant, compact health booth packed with certified clinical sensors, robust NPU processors, and tele-consultation tools.
        </p>
      </section>

      {/* Interactive Blueprint Grid */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Side: Mock Kiosk 3D Representation Frame */}
        <div className="lg:col-span-5 glass-dark text-white rounded-3xl p-6 border border-white/10 flex flex-col justify-between min-h-[480px]">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-6">
              <span className="text-xs font-mono text-teal-400 font-bold uppercase tracking-wider">
                Interactive Cabin Layout
              </span>
              <span className="h-2 w-2 rounded-full bg-teal-500 animate-ping" />
            </div>

            {/* Simulated Kiosk Chassis */}
            <div className="relative bg-slate-900 border border-slate-800 rounded-2xl p-8 aspect-[4/5] max-w-[280px] mx-auto flex flex-col justify-between shadow-2xl shadow-slate-950">
              {/* Camera Unit (top) */}
              <div
                onClick={() => setActiveComponentName("HD Consultation Camera")}
                className={`w-12 h-3 mx-auto rounded-full cursor-pointer transition-all border flex items-center justify-center ${
                  activeComponentName === "HD Consultation Camera"
                    ? "bg-blue-600 border-blue-400 scale-110 shadow-lg shadow-blue-500/50"
                    : "bg-slate-850 border-slate-700 hover:border-slate-500"
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              </div>

              {/* Central screen (mid-top) */}
              <div
                onClick={() => setActiveComponentName("Touchscreen Display")}
                className={`w-full h-24 rounded-lg cursor-pointer transition-all border p-2 flex flex-col justify-between ${
                  activeComponentName === "Touchscreen Display"
                    ? "bg-slate-950 border-blue-500 scale-105 shadow-xl shadow-blue-500/10"
                    : "bg-slate-950 border-slate-800 hover:border-slate-700"
                }`}
              >
                <div className="h-1.5 w-6 bg-slate-800 rounded" />
                <div className="flex flex-col space-y-1">
                  <div className="h-1 w-full bg-slate-900 rounded" />
                  <div className="h-1 w-10/12 bg-slate-900 rounded" />
                </div>
                <div className="flex justify-between items-center text-[8px] text-teal-400 font-mono">
                  <span>SYSTEM OK</span>
                  <span>98%</span>
                </div>
              </div>

              {/* Sensor counter deck (mid-bottom) */}
              <div className="grid grid-cols-4 gap-2 pt-2">
                {/* BP Monitor */}
                <div
                  onClick={() => setActiveComponentName("Blood Pressure Monitor")}
                  className={`h-8 rounded cursor-pointer transition-all border flex items-center justify-center ${
                    activeComponentName === "Blood Pressure Monitor"
                      ? "bg-red-500/20 border-red-500 scale-105"
                      : "bg-slate-950 border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <Heart className="h-3.5 w-3.5 text-red-400" />
                </div>

                {/* Pulse oximeter */}
                <div
                  onClick={() => setActiveComponentName("Pulse Oximeter")}
                  className={`h-8 rounded cursor-pointer transition-all border flex items-center justify-center ${
                    activeComponentName === "Pulse Oximeter"
                      ? "bg-teal-500/20 border-teal-500 scale-105"
                      : "bg-slate-950 border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <Activity className="h-3.5 w-3.5 text-teal-400" />
                </div>

                {/* thermometer */}
                <div
                  onClick={() => setActiveComponentName("Medical Thermometer")}
                  className={`h-8 rounded cursor-pointer transition-all border flex items-center justify-center ${
                    activeComponentName === "Medical Thermometer"
                      ? "bg-amber-500/20 border-amber-500 scale-105"
                      : "bg-slate-950 border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <Thermometer className="h-3.5 w-3.5 text-amber-400" />
                </div>

                {/* ECG */}
                <div
                  onClick={() => setActiveComponentName("12-Lead ECG Device")}
                  className={`h-8 rounded cursor-pointer transition-all border flex items-center justify-center ${
                    activeComponentName === "12-Lead ECG Device"
                      ? "bg-purple-500/20 border-purple-500 scale-105"
                      : "bg-slate-950 border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <Activity className="h-3.5 w-3.5 text-purple-400" />
                </div>
              </div>

              {/* Lower cabinet (Scanner and Printer) */}
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-800">
                <div
                  onClick={() => setActiveComponentName("Document Scanner")}
                  className={`h-6 rounded cursor-pointer transition-all border flex items-center justify-center text-[8px] font-mono font-bold ${
                    activeComponentName === "Document Scanner"
                      ? "bg-slate-950 border-blue-500 scale-105 text-blue-400"
                      : "bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-500"
                  }`}
                >
                  SCANNER
                </div>
                <div
                  onClick={() => setActiveComponentName("Prescription Printer")}
                  className={`h-6 rounded cursor-pointer transition-all border flex items-center justify-center text-[8px] font-mono font-bold ${
                    activeComponentName === "Prescription Printer"
                      ? "bg-slate-950 border-teal-500 scale-105 text-teal-400"
                      : "bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-500"
                  }`}
                >
                  PRINTER
                </div>
              </div>
            </div>
          </div>

          <p className="text-[10px] text-slate-500 font-mono text-center mt-4">
            Click chassis components to focus detail views.
          </p>
        </div>

        {/* Right Side: Component lists & specific focus panel */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          {/* Active Sensor Specification Panel */}
          <div className="glass border border-white/40 rounded-3xl p-6 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-blue-600 rounded-2xl text-white shadow-md shadow-blue-200">
                {getComponentIcon(selectedComponent.icon)}
              </div>
              <div>
                <h3 className="font-display font-extrabold text-lg text-gray-900 leading-none">
                  {selectedComponent.name}
                </h3>
                <span className="text-[10px] font-mono text-blue-600 uppercase font-bold block mt-1 tracking-wider">
                  Hardware Specifications Log
                </span>
              </div>
            </div>
            <p className="text-gray-600 text-xs md:text-sm leading-relaxed pt-2">
              {selectedComponent.desc}
            </p>

            <div className="bg-white/40 border border-white/50 backdrop-blur-md rounded-2xl p-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Info className="h-4 w-4 text-blue-500 flex-shrink-0" />
                <span className="text-xs font-semibold text-gray-700">Clinical Calibration Scope:</span>
              </div>
              <span className="font-mono text-xs font-bold text-gray-900 bg-gray-50 border border-gray-200 px-2.5 py-1 rounded">
                {selectedComponent.spec}
              </span>
            </div>
          </div>

          {/* Quick list selectors */}
          <div className="grid grid-cols-2 gap-3" id="kiosk-grid-selectors">
            {KIOSK_COMPONENTS.map((item) => (
              <button
                key={item.name}
                onClick={() => setActiveComponentName(item.name)}
                className={`w-full p-3 text-left rounded-xl border text-xs font-semibold transition-all duration-150 flex items-center justify-between ${
                  activeComponentName === item.name
                    ? "bg-slate-900 text-white border-slate-900"
                    : "glass text-gray-750 hover:bg-white/50 hover:border-blue-300"
                }`}
                id={`kiosk-selector-${item.name.replace(/\s+/g, "-")}`}
              >
                <span className="truncate">{item.name}</span>
                <ChevronRight className="h-3.5 w-3.5 flex-shrink-0 ml-1 opacity-65" />
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
