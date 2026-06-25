import React, { useState } from "react";
import { Mail, Phone, MapPin, Calendar, Clock, CheckCircle2, Globe } from "lucide-react";
import { ActiveTab } from "../types";

interface ContactViewProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export default function ContactView({ setActiveTab }: ContactViewProps) {
  const [name, setName] = useState("");
  const [organization, setOrganization] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("United States");
  const [inquiryType, setInquiryType] = useState("Rural Deployment");
  const [message, setMessage] = useState("");

  const [selectedDate, setSelectedDate] = useState("2026-07-10");
  const [selectedTime, setSelectedTime] = useState("10:00 AM");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const availableDates = [
    { value: "2026-07-10", label: "Fri, Jul 10" },
    { value: "2026-07-13", label: "Mon, Jul 13" },
    { value: "2026-07-14", label: "Tue, Jul 14" },
    { value: "2026-07-15", label: "Wed, Jul 15" },
  ];

  const availableTimes = [
    "09:00 AM",
    "10:00 AM",
    "11:30 AM",
    "02:30 PM",
    "04:00 PM",
  ];

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          organization,
          email,
          phone,
          country,
          inquiryType,
          message,
          date: selectedDate,
          time: selectedTime,
        }),
      });

      if (response.ok) {
        setSuccess(true);
        // Clear forms
        setName("");
        setOrganization("");
        setEmail("");
        setPhone("");
        setMessage("");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-16 pb-20 animate-fade-in" id="contact-view-container">
      {/* Title */}
      <section className="text-center max-w-3xl mx-auto space-y-4 px-4">
        <span className="text-xs font-bold text-blue-600 uppercase tracking-widest font-mono">
          Global Expansion
        </span>
        <h2 className="font-display font-bold text-3xl md:text-4xl text-gray-900 tracking-tight">
          Request a Live Kiosk Demonstration
        </h2>
        <p className="text-gray-500 text-sm leading-relaxed">
          Tell us about your organization. Pick your preferred slot, and our clinical hardware specialists will organize an immersive live camera and diagnostic walk-through.
        </p>
      </section>

      {/* Main Grid split */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
        {/* Left Form Column */}
        <div className="lg:col-span-8 glass rounded-3xl p-6 md:p-8 shadow-xs">
          {success ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4 animate-fade-in">
              <div className="p-4 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100">
                <CheckCircle2 className="h-10 w-10 animate-bounce" />
              </div>
              <div>
                <h3 className="font-display font-extrabold text-xl text-gray-900">
                  Demonstration Confirmed Successfully!
                </h3>
                <p className="text-gray-500 text-xs mt-1.5 max-w-md leading-relaxed mx-auto">
                  Thank you! We have registered your inquiry and reserved your requested date/time on our system. A calendar invitation and conference details have been sent to your email.
                </p>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setSuccess(false)}
                  className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-750 font-bold rounded-xl text-xs transition-colors"
                >
                  Book Another Demo
                </button>
                <button
                  onClick={() => setActiveTab("dashboard")}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition-colors"
                >
                  View My Appointment on Portal
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleBooking} className="space-y-6">
              <h3 className="font-display font-extrabold text-lg text-gray-900 border-b border-gray-100 pb-3">
                1. Provide Organization Credentials
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Name */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs text-gray-800 focus:outline-none focus:border-blue-500"
                    placeholder="e.g. Dr. Green"
                    required
                  />
                </div>

                {/* Organization */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Organization / Health Network
                  </label>
                  <input
                    type="text"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs text-gray-800 focus:outline-none focus:border-blue-500"
                    placeholder="e.g. Stoic Tech Corp"
                    required
                  />
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Corporate Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs text-gray-800 focus:outline-none focus:border-blue-500"
                    placeholder="e.g. green@metro.org"
                    required
                  />
                </div>

                {/* Phone */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs text-gray-800 focus:outline-none focus:border-blue-500"
                    placeholder="e.g. +1 (555) 000-1111"
                  />
                </div>

                {/* Country */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Country
                  </label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs text-gray-800 focus:outline-none focus:border-blue-500"
                  >
                    <option value="United States">United States</option>
                    <option value="India">India</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Australia">Australia</option>
                  </select>
                </div>

                {/* Inquiry Type */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Deployment Scope
                  </label>
                  <select
                    value={inquiryType}
                    onChange={(e) => setInquiryType(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs text-gray-800 focus:outline-none focus:border-blue-500"
                  >
                    <option value="Rural Deployment">Rural Deployment Outreach</option>
                    <option value="Corporate Wellness">Corporate Office Wellness</option>
                    <option value="Hospital Extension">Hospital Lobby Triage</option>
                    <option value="General Demo">Other / General Demo</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Describe Your Goals or Questions
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="e.g. We are hoping to install 2 kiosks in our employee lounges and connect them to our private practitioner team..."
                  rows={3}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs text-gray-800 focus:outline-none focus:border-blue-500 placeholder-gray-400 resize-none"
                />
              </div>

              {/* Interactive Calendar Scheduler sub-block */}
              <div className="pt-4 border-t border-gray-100 space-y-4">
                <h3 className="font-display font-extrabold text-lg text-gray-900">
                  2. Select Demonstration Slot
                </h3>

                {/* Date Chips */}
                <div className="space-y-1.5">
                  <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                    Available Dates:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {availableDates.map((d) => (
                      <button
                        key={d.value}
                        type="button"
                        onClick={() => setSelectedDate(d.value)}
                        className={`px-4 py-2.5 rounded-lg border text-xs font-bold transition-all ${
                          selectedDate === d.value
                            ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                            : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                        }`}
                      >
                        <Calendar className="h-3 w-3 inline mr-1 -mt-0.5" />
                        <span>{d.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Hour Chips */}
                <div className="space-y-1.5">
                  <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                    Available Slots (UTC timezone compatible):
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {availableTimes.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setSelectedTime(t)}
                        className={`px-4 py-2.5 rounded-lg border text-xs font-bold transition-all ${
                          selectedTime === t
                            ? "bg-teal-600 text-white border-teal-600 shadow-sm"
                            : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                        }`}
                      >
                        <Clock className="h-3 w-3 inline mr-1 -mt-0.5" />
                        <span>{t}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Submit btn */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-200 disabled:text-gray-400 text-white rounded-xl font-semibold text-xs transition-colors shadow-lg shadow-blue-100 flex items-center justify-center space-x-2 cursor-pointer"
                id="submit-demo-booking-btn"
              >
                <span>Confirm Demonstration Registration</span>
              </button>
            </form>
          )}
        </div>

        {/* Right Info Column (Sales/Support & Vector Map) */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
          <div className="glass-dark text-white rounded-3xl p-6 space-y-6 border border-white/10">
            <div>
              <span className="text-[9px] font-mono text-teal-400 font-bold uppercase tracking-wider">
                Support Coordinates
              </span>
              <h3 className="font-display font-extrabold text-base text-slate-100 mt-1">
                Immediate Sales & Tech Assistance
              </h3>
            </div>

            <div className="space-y-4 text-xs text-slate-300">
              <div className="flex items-start space-x-3">
                <Mail className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[10px] text-slate-500 uppercase font-mono">Inquiries Email</span>
                  <span className="font-bold">sales@mediconnect.ai</span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Phone className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[10px] text-slate-500 uppercase font-mono">Hotline (Global)</span>
                  <span className="font-bold">+1 (800) 555-KIOSK</span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[10px] text-slate-500 uppercase font-mono">Headquarters</span>
                  <span className="font-bold leading-relaxed">
                    100 Innovation Way, Suite B<br />
                    Pune, MH 411001, India
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Mock Vector Map Representation */}
          <div className="glass rounded-3xl p-5 flex flex-col justify-between h-48 relative overflow-hidden shadow-xs">
            {/* Visual Grid Backdrop representing map nodes */}
            <div className="absolute inset-0 bg-slate-50 grid grid-cols-6 grid-rows-4 gap-1 p-2 opacity-65 -z-10">
              {[...Array(24)].map((_, i) => (
                <div key={i} className="border border-gray-100 rounded-md bg-white flex items-center justify-center font-mono text-[6px] text-gray-200">
                  {i % 4 === 0 ? "●" : ""}
                </div>
              ))}
            </div>

            <div className="space-y-1 relative z-10">
              <span className="text-[10px] font-mono text-blue-600 font-bold uppercase tracking-wider block">
                Active Fleet Status
              </span>
              <h4 className="font-display font-bold text-xs text-gray-900 leading-tight">
                Global Network Node Coordinates
              </h4>
            </div>

            <div className="flex justify-between items-end relative z-10">
              <div className="flex items-center space-x-1.5 bg-slate-900 text-white rounded-lg px-2.5 py-1 font-mono text-[9px] font-bold">
                <Globe className="h-3 w-3 text-teal-400 animate-spin" />
                <span>542 ONLINE NODES</span>
              </div>
              <span className="text-[10px] font-mono text-gray-400">
                PUNE // CHENNAI // US
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
