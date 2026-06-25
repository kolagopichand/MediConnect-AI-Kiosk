import React, { useState } from "react";
import { Shield, Brain, Lock, Server, AlertCircle, RefreshCw, Cpu, CheckCircle } from "lucide-react";

export default function TechnologyView() {
  const [symptoms, setSymptoms] = useState("");
  const [systolic, setSystolic] = useState(120);
  const [diastolic, setDiastolic] = useState(80);
  const [heartRate, setHeartRate] = useState(72);
  const [oxygen, setOxygen] = useState(98);
  const [temperature, setTemperature] = useState(98.6);

  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<string | null>(null);
  const [isSimulated, setIsSimulated] = useState(false);

  const handleSymptomAnalysis = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!symptoms.trim()) return;

    setLoading(true);
    setReport(null);

    try {
      const res = await fetch("/api/symptom-analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          symptoms,
          vitals: {
            systolic,
            diastolic,
            heartRate,
            oxygen,
            temperature,
          },
        }),
      });

      const data = await res.json();
      if (data.analysis) {
        setReport(data.analysis);
        setIsSimulated(!!data.simulated);
      } else {
        setReport("### Error\nFailed to compile AI Triage analysis. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setReport("### Network Error\nUnable to connect to the MediConnect server-side triage engine.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-16 pb-20 animate-fade-in" id="technology-view-container">
      {/* Introduction */}
      <section className="text-center max-w-3xl mx-auto space-y-4 px-4">
        <span className="text-xs font-bold text-blue-600 uppercase tracking-widest font-mono">
          Clinical Intelligence
        </span>
        <h2 className="font-display font-bold text-3xl md:text-4xl text-gray-900 tracking-tight">
          AI Engine and Security Architecture
        </h2>
        <p className="text-gray-500 text-sm leading-relaxed">
          Driven by fine-tuned medical models, translating biometric telemetry and speech symptoms into structured clinical decision support pipelines.
        </p>
      </section>

      {/* Interactive AI Playground */}
      <section className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="glass-dark text-white rounded-3xl p-6 md:p-10 shadow-xl border border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-600/10 rounded-full blur-3xl -z-10" />

          {/* Playground Form Controls */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="inline-flex items-center space-x-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-mono px-2.5 py-1 rounded-full mb-3 uppercase font-semibold">
                <Cpu className="h-3 w-3 mr-1" /> Live AI Engine Simulation
              </div>
              <h3 className="font-display font-extrabold text-2xl text-slate-100">
                AI Symptom & Triage Playground
              </h3>
              <p className="text-slate-400 text-xs mt-1.5 leading-relaxed">
                Input mock symptoms and drag the diagnostic vitals below. Then trigger our server-side medical triage compiler.
              </p>
            </div>

            <form onSubmit={handleSymptomAnalysis} className="space-y-5">
              {/* Symptoms Input */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Describe Symptoms
                </label>
                <textarea
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  placeholder="e.g. Dry hacking cough for 4 days, mild shortness of breath when walking up stairs, body fatigue..."
                  rows={3}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-blue-500 placeholder-slate-600 resize-none transition-colors"
                  required
                />
              </div>

              {/* Vitals Sliders */}
              <div className="space-y-4 border-t border-slate-800 pt-4">
                <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Adjust Kiosk Vitals
                </span>

                {/* Blood Pressure */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] text-slate-400">
                      <span>Systolic BP</span>
                      <span className="font-mono text-blue-400 font-bold">{systolic} mmHg</span>
                    </div>
                    <input
                      type="range"
                      min={90}
                      max={180}
                      value={systolic}
                      onChange={(e) => setSystolic(Number(e.target.value))}
                      className="w-full accent-blue-500 h-1 rounded"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] text-slate-400">
                      <span>Diastolic BP</span>
                      <span className="font-mono text-blue-400 font-bold">{diastolic} mmHg</span>
                    </div>
                    <input
                      type="range"
                      min={50}
                      max={110}
                      value={diastolic}
                      onChange={(e) => setDiastolic(Number(e.target.value))}
                      className="w-full accent-blue-500 h-1 rounded"
                    />
                  </div>
                </div>

                {/* Heart Rate & Oxygen */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] text-slate-400">
                      <span>Heart Rate</span>
                      <span className="font-mono text-teal-400 font-bold">{heartRate} bpm</span>
                    </div>
                    <input
                      type="range"
                      min={50}
                      max={130}
                      value={heartRate}
                      onChange={(e) => setHeartRate(Number(e.target.value))}
                      className="w-full accent-teal-400 h-1 rounded"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] text-slate-400">
                      <span>Oxygen SpO2</span>
                      <span className="font-mono text-cyan-400 font-bold">{oxygen}%</span>
                    </div>
                    <input
                      type="range"
                      min={85}
                      max={100}
                      value={oxygen}
                      onChange={(e) => setOxygen(Number(e.target.value))}
                      className="w-full accent-cyan-400 h-1 rounded"
                    />
                  </div>
                </div>

                {/* Temperature */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>Core Temperature</span>
                    <span className="font-mono text-red-400 font-bold">{temperature}°F</span>
                  </div>
                  <input
                    type="range"
                    min={95}
                    max={104}
                    step={0.1}
                    value={temperature}
                    onChange={(e) => setTemperature(Number(e.target.value))}
                    className="w-full accent-red-400 h-1 rounded"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-800 text-white rounded-xl font-bold text-xs transition-colors shadow-lg shadow-blue-950 flex items-center justify-center space-x-2 cursor-pointer"
                id="submit-ai-triage-btn"
              >
                {loading ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    <span>Analyzing clinical logs...</span>
                  </>
                ) : (
                  <span>Compile AI Triage Assessment</span>
                )}
              </button>
            </form>
          </div>

          {/* Report Display Output Side */}
          <div className="lg:col-span-7 bg-slate-950/60 backdrop-blur-md rounded-2xl border border-white/5 p-6 flex flex-col justify-between overflow-y-auto max-h-[500px]" id="playground-output-report-container">
            {report ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-emerald-500" />
                    <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                      Report Compiled Successfully
                    </span>
                  </div>
                  {isSimulated && (
                    <span className="text-[10px] bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded font-mono border border-amber-500/20">
                      Demo Mode Fallback
                    </span>
                  )}
                </div>

                {/* Render report text simply with structured margins */}
                <div className="text-xs text-slate-300 space-y-4 leading-relaxed font-sans prose prose-invert select-text">
                  {report.split("\n").map((line, idx) => {
                    if (line.startsWith("###")) {
                      return (
                        <h3 key={idx} className="text-slate-100 font-display font-bold text-sm mt-4 border-b border-slate-900 pb-1">
                          {line.replace("###", "").trim()}
                        </h3>
                      );
                    } else if (line.startsWith("####")) {
                      return (
                        <h4 key={idx} className="text-slate-200 font-display font-semibold text-xs mt-3 uppercase tracking-wider text-teal-400">
                          {line.replace("####", "").trim()}
                        </h4>
                      );
                    } else if (line.startsWith("*") || line.startsWith("-")) {
                      return (
                        <div key={idx} className="pl-4 border-l border-blue-500/30 text-slate-300 text-xs">
                          {line.replace(/^[\s*-]+/, "").trim()}
                        </div>
                      );
                    } else if (line.startsWith("1.") || line.startsWith("2.") || line.startsWith("3.") || line.startsWith("4.") || line.startsWith("5.")) {
                      return (
                        <div key={idx} className="pl-2 font-mono text-[11px] text-slate-300">
                          {line}
                        </div>
                      );
                    }
                    return <p key={idx}>{line}</p>;
                  })}
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
                <Brain className="h-12 w-12 text-slate-700 animate-pulse" />
                <div>
                  <h4 className="text-sm font-semibold text-slate-400">Awaiting Biometric Compilation</h4>
                  <p className="text-slate-500 text-xs mt-1 max-w-sm leading-relaxed">
                    Once you hit "Compile AI Triage Assessment", our clinical LLM engine will analyze your vitals and report differentials.
                  </p>
                </div>
              </div>
            )}

            {report && (
              <div className="mt-6 pt-3 border-t border-slate-800 text-center flex justify-between items-center text-[10px] text-slate-500 font-mono">
                <span>Secure SSL Encryption Enabled</span>
                <button
                  onClick={() => setReport(null)}
                  className="text-blue-400 hover:underline flex items-center space-x-1"
                >
                  <span>Clear Report</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Core AI and Encryption Pillars */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="glass p-6 rounded-2xl shadow-xs space-y-3">
          <Brain className="h-8 w-8 text-blue-600" />
          <h3 className="font-display font-semibold text-gray-900 text-base">Predictive Clinical Modeling</h3>
          <p className="text-gray-500 text-xs leading-relaxed">
            Fine-tuned on massive clinical training data to perform reliable, safe differential triages, categorizing patients into clear Red (High Risk), Yellow (Moderate), or Green (Low) emergency tiers.
          </p>
        </div>

        <div className="glass p-6 rounded-2xl shadow-xs space-y-3">
          <Shield className="h-8 w-8 text-teal-600" />
          <h3 className="font-display font-semibold text-gray-900 text-base">Full HIPAA Regulatory Compliance</h3>
          <p className="text-gray-500 text-xs leading-relaxed">
            All user data, bio-metric vital logs, and active tele-consultation streams undergo real-time AES-256 local encryption on the hardware edge before syncing safely to our secure health cloud.
          </p>
        </div>

        <div className="glass p-6 rounded-2xl shadow-xs space-y-3">
          <Lock className="h-8 w-8 text-purple-600" />
          <h3 className="font-display font-semibold text-gray-900 text-base">Zero-Trust Authentication</h3>
          <p className="text-gray-500 text-xs leading-relaxed">
            Patient files are isolated. Decryption keys are issued exclusively to the licensed medical consultant on-call during that specific active ticket—ensuring flawless medical secrecy.
          </p>
        </div>
      </section>
    </div>
  );
}
