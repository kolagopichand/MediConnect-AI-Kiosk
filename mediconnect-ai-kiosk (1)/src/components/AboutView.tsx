import React from "react";
import { TIMELINE, LEADERSHIP } from "../data";
import { ShieldCheck, Award, HeartHandshake, Eye, Compass, Calendar } from "lucide-react";

export default function AboutView() {
  return (
    <div className="space-y-24 pb-20 animate-fade-in" id="about-view-container">
      {/* Vision & Mission Row */}
      <section className="relative overflow-hidden py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-bold text-teal-600 uppercase tracking-widest font-mono">
              Empowering Human Connection
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-gray-900 tracking-tight">
              Our Vision and Mission
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              We leverage safe clinical intelligence to provide equitable, instant, and high-fidelity primary healthcare access worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
            {/* Mission */}
            <div className="glass p-8 rounded-2xl shadow-xs space-y-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl w-fit">
                <Compass className="h-6 w-6" />
              </div>
              <h3 className="font-display font-bold text-xl text-gray-900">Company Mission</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                To build, certify, and deploy robust AI-powered telemedicine hardware hubs that connect remote communities with licensed physicians instantly. By conducting accurate preliminary vitals triages, we save valuable transport overheads, lower doctor work burdens, and bridge the massive urban-rural clinical disparity.
              </p>
            </div>

            {/* Vision */}
            <div className="glass p-8 rounded-2xl shadow-xs space-y-4">
              <div className="p-3 bg-teal-50 text-teal-600 rounded-xl w-fit">
                <Eye className="h-6 w-6" />
              </div>
              <h3 className="font-display font-bold text-xl text-gray-900">Vision Statement</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                A world where geographical boundaries do not limit a human's right to high-quality healthcare. We envision thousands of solar-compatible micro-clinic kiosks operating in rural village squares, public subways, corporate lobbies, and disaster-prone belts—creating a continuous global safety-net of clinical diagnosis.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Innovation Story */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center space-x-1 bg-teal-50 text-teal-700 text-xs font-bold px-2.5 py-1 rounded-full">
            <HeartHandshake className="h-3.5 w-3.5" />
            <span>Decentralized Care</span>
          </div>
          <h2 className="font-display font-bold text-3xl text-gray-900 leading-tight">
            Our Healthcare Innovation Story
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            MediConnect was born in 2023 when our founders observed that patients in remote South Indian villages lost entire days of wages and critical travel money just to check standard diabetic glucose parameters or get general practitioner prescriptions.
          </p>
          <p className="text-gray-600 text-sm leading-relaxed">
            By collaborating with leading hardware manufacturers and software engineers, we miniaturized medical-grade diagnostic bays into an intuitive, standalone, self-sanitizing kiosk. We embedded modern local neural processors capable of running responsive triage questions in several native regional languages—allowing non-technical patients to operate the station successfully.
          </p>

          {/* Key Compliance list */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="h-5 w-5 text-emerald-500 flex-shrink-0" />
              <span className="text-xs text-gray-700 font-semibold">HIPAA & GDPR Patient Data Isolation compliant</span>
            </div>
            <div className="flex items-center space-x-2">
              <ShieldCheck className="h-5 w-5 text-emerald-500 flex-shrink-0" />
              <span className="text-xs text-gray-700 font-semibold">ISO 13485 Quality Standard for Medical Hardware Devices</span>
            </div>
            <div className="flex items-center space-x-2">
              <ShieldCheck className="h-5 w-5 text-emerald-500 flex-shrink-0" />
              <span className="text-xs text-gray-700 font-semibold">CE Medical & FDA Certified diagnostic sensors integration</span>
            </div>
          </div>
        </div>

        {/* Big Illustration/Visual */}
        <div className="lg:col-span-6 relative">
          <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-100">
            <img
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800"
              alt="MediConnect Team Deploying Kiosk in rural area"
              className="w-full h-96 object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 bg-blue-600 text-white rounded-2xl p-6 shadow-lg max-w-xs space-y-1">
            <Award className="h-8 w-8 text-teal-300" />
            <h4 className="font-bold text-sm">Recognized Digital Health Innovation</h4>
            <p className="text-[10px] text-blue-100">Awarded best rural telemedicine infrastructure of 2025.</p>
          </div>
        </div>
      </section>

      {/* Historical Growth Timeline */}
      <section className="glass-dark text-white py-16 px-4 md:px-8 rounded-3xl max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold text-teal-400 uppercase tracking-widest font-mono">
            Company Progress
          </span>
          <h2 className="font-display font-bold text-3xl text-white">
            Chronology of Our Growth
          </h2>
          <p className="text-slate-400 text-xs">
            From an initial engineering garage design to managing hundreds of public medical micro-stations.
          </p>
        </div>

        {/* Timeline deck */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-4 relative">
          {/* Progress bar line for large screens */}
          <div className="hidden md:block absolute top-[28px] left-8 right-8 h-0.5 bg-gradient-to-r from-blue-500 to-teal-400 -z-0" />

          {TIMELINE.map((item, index) => (
            <div key={index} className="bg-slate-900/40 backdrop-blur-md p-6 rounded-2xl border border-white/10 relative z-10 space-y-3 hover:border-teal-400 transition-colors duration-150">
              <div className="flex items-center justify-between">
                <span className="font-display font-extrabold text-2xl text-teal-400 font-mono">
                  {item.year}
                </span>
                <div className="h-6 w-6 rounded-full bg-slate-900 border border-teal-500 flex items-center justify-center text-[10px] text-teal-300">
                  {index + 1}
                </div>
              </div>
              <h3 className="font-display font-semibold text-sm text-slate-100">{item.title}</h3>
              <p className="text-slate-400 text-xs leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Executive Leadership Team */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest font-mono">
            Clinical & Engineering Leaders
          </span>
          <h2 className="font-display font-bold text-3xl text-gray-900">
            Meet Our Leadership Team
          </h2>
          <p className="text-gray-500 text-sm">
            Our team brings together decades of experience in clinical medicine, hardware manufacturing, and safe artificial intelligence models.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {LEADERSHIP.map((leader, idx) => (
            <div key={idx} className="glass rounded-2xl overflow-hidden shadow-xs hover:shadow-md hover:border-blue-300 transition-all duration-150">
              <div className="h-64 overflow-hidden relative">
                <img
                  src={leader.img}
                  alt={leader.name}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
                />
                <div className="absolute top-2 right-2 bg-slate-900/80 text-white text-[10px] font-mono px-2 py-1 rounded-md">
                  VITALIZED CO-FOUNDER
                </div>
              </div>
              <div className="p-6 space-y-2">
                <h3 className="font-display font-bold text-lg text-gray-900">{leader.name}</h3>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block font-mono">{leader.role}</span>
                <p className="text-gray-500 text-xs leading-relaxed pt-2 border-t border-gray-50">{leader.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
