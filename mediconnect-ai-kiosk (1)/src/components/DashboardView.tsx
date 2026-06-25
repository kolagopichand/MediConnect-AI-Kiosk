import React, { useState, useEffect } from "react";
import { Consultation, Booking, UserRole } from "../types";
import {
  Activity,
  Users,
  Tv,
  Calendar,
  CheckCircle,
  Plus,
  RefreshCw,
  Search,
  Sliders,
  Shield,
  Heart,
  FileText,
  User,
} from "lucide-react";

interface DashboardViewProps {
  userRole: UserRole;
}

export default function DashboardView({ userRole }: DashboardViewProps) {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);

  const [loading, setLoading] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<"consultations" | "bookings" | "analytics">("consultations");

  // Search/Filters
  const [searchQuery, setSearchQuery] = useState("");

  // New Consultation Form States (for simulating a Tele-Physician write-back)
  const [showAddConsultation, setShowAddConsultation] = useState(false);
  const [newPatientName, setNewPatientName] = useState("");
  const [newAge, setNewAge] = useState(30);
  const [newGender, setNewGender] = useState("Female");
  const [newSymptoms, setNewSymptoms] = useState("");
  const [newSystolic, setNewSystolic] = useState(120);
  const [newDiastolic, setNewDiastolic] = useState(80);
  const [newHeartRate, setNewHeartRate] = useState(72);
  const [newOxygen, setNewOxygen] = useState(98);
  const [newTemperature, setNewTemperature] = useState(98.6);
  const [newDiagnosis, setNewDiagnosis] = useState("");
  const [newPrescription, setNewPrescription] = useState("");
  const [newDoctorName, setNewDoctorName] = useState("Dr. Allison Vance (Internal Medicine)");

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [consultRes, bookingsRes] = await Promise.all([
        fetch("/api/consultations"),
        fetch("/api/bookings"),
      ]);

      if (consultRes.ok && bookingsRes.ok) {
        const consultData = await consultRes.json();
        const bookingsData = await bookingsRes.json();
        setConsultations(consultData);
        setBookings(bookingsData);
      }
    } catch (err) {
      console.error("Error fetching dashboard content:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleAddConsultation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPatientName || !newSymptoms) return;

    try {
      const res = await fetch("/api/consultations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patientName: newPatientName,
          age: newAge,
          gender: newGender,
          symptoms: newSymptoms,
          vitals: {
            systolic: newSystolic,
            diastolic: newDiastolic,
            heartRate: newHeartRate,
            oxygen: newOxygen,
            temperature: newTemperature,
          },
          diagnosis: newDiagnosis,
          prescription: newPrescription,
          doctorName: newDoctorName,
        }),
      });

      if (res.ok) {
        // Reset states & reload
        setNewPatientName("");
        setNewSymptoms("");
        setNewDiagnosis("");
        setNewPrescription("");
        setShowAddConsultation(false);
        fetchDashboardData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Filter lists based on search
  const filteredConsultations = consultations.filter((c) =>
    c.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.diagnosis?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.symptoms.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredBookings = bookings.filter((b) =>
    b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.inquiryType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-20 animate-fade-in" id="dashboard-view-container">
      {/* Header and simulation notice banner */}
      <div className="bg-slate-900 rounded-3xl p-6 text-white border border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-xs font-mono text-teal-400 font-bold uppercase tracking-wider">
            Secure Healthcare Dashboard Portal
          </span>
          <h2 className="font-display font-extrabold text-2xl text-slate-100 mt-1">
            Provider & Organization Command Center
          </h2>
          <p className="text-slate-400 text-xs mt-1">
            Showing continuous telemetry logs, electronic records, and demo bookings synced dynamically with the Express backend.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-slate-950 px-4 py-2 rounded-xl border border-slate-850">
          <Shield className="h-4 w-4 text-emerald-500" />
          <div className="text-[11px] font-mono leading-none">
            <span className="block text-slate-400">AUTHENTICATED ROLE:</span>
            <span className="block text-emerald-400 font-bold mt-1 uppercase">
              {userRole.replace("_", " ")}
            </span>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass p-5 rounded-2xl shadow-xs flex items-center space-x-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <Activity className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[10px] text-gray-400 uppercase font-bold block">Patient Consults</span>
            <span className="font-display font-extrabold text-xl text-gray-900 font-mono leading-none">
              {consultations.length} Logs
            </span>
          </div>
        </div>

        <div className="glass p-5 rounded-2xl shadow-xs flex items-center space-x-4">
          <div className="p-3 bg-teal-50 text-teal-600 rounded-xl">
            <Tv className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[10px] text-gray-400 uppercase font-bold block">Active Kiosks</span>
            <span className="font-display font-extrabold text-xl text-gray-900 font-mono leading-none">
              14 Nodes
            </span>
          </div>
        </div>

        <div className="glass p-5 rounded-2xl shadow-xs flex items-center space-x-4">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
            <Calendar className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[10px] text-gray-400 uppercase font-bold block">Demo Bookings</span>
            <span className="font-display font-extrabold text-xl text-gray-900 font-mono leading-none">
              {bookings.length} Reserved
            </span>
          </div>
        </div>

        <div className="glass p-5 rounded-2xl shadow-xs flex items-center space-x-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <CheckCircle className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[10px] text-gray-400 uppercase font-bold block">System Status</span>
            <span className="font-display font-semibold text-sm text-emerald-600 leading-none">
              100% ONLINE
            </span>
          </div>
        </div>
      </div>

      {/* Main Tab Switcher and Actions */}
      <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
        {/* Sub-Tabs Selector */}
        <div className="flex items-center space-x-1.5 glass p-1.5 rounded-xl border border-white/40 w-fit">
          <button
            onClick={() => setActiveSubTab("consultations")}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeSubTab === "consultations"
                ? "bg-blue-500/10 text-blue-700 shadow-xs border border-blue-500/20"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            Electronic Health Records (EMR)
          </button>
          <button
            onClick={() => setActiveSubTab("bookings")}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeSubTab === "bookings"
                ? "bg-blue-500/10 text-blue-700 shadow-xs border border-blue-500/20"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            Demo Bookings
          </button>
          <button
            onClick={() => setActiveSubTab("analytics")}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeSubTab === "analytics"
                ? "bg-blue-500/10 text-blue-700 shadow-xs border border-blue-500/20"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            Clinic Analytics
          </button>
        </div>

        {/* Action controls */}
        <div className="flex items-center space-x-2">
          {/* Search bar */}
          <div className="relative flex items-center glass border border-white/40 rounded-xl px-2.5 py-1.5 shadow-xs">
            <Search className="h-4 w-4 text-gray-400 mr-1.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search database..."
              className="bg-transparent text-xs text-gray-800 placeholder-gray-400 focus:outline-none w-48"
            />
          </div>

          {/* Refresh btn */}
          <button
            onClick={fetchDashboardData}
            className="p-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl text-gray-600 cursor-pointer"
            id="refresh-dashboard-btn"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          </button>

          {/* Doctor role specific: Create new medical record */}
          {activeSubTab === "consultations" && userRole === "doctor" && (
            <button
              onClick={() => setShowAddConsultation(!showAddConsultation)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-sm flex items-center space-x-1 cursor-pointer"
              id="add-clinical-record-btn"
            >
              <Plus className="h-4 w-4" />
              <span>Add Consultation Log</span>
            </button>
          )}
        </div>
      </div>

      {/* Write-Back Clinical record form (Doctor Role exclusive) */}
      {showAddConsultation && activeSubTab === "consultations" && (
        <form onSubmit={handleAddConsultation} className="glass rounded-2xl p-6 shadow-md space-y-4 animate-fade-in">
          <div className="flex justify-between items-center border-b border-blue-50 pb-2.5">
            <h4 className="font-display font-extrabold text-sm text-blue-700 flex items-center space-x-1.5">
              <Heart className="h-4 w-4 text-blue-600" />
              <span>Record New Remote Kiosk Consultation</span>
            </h4>
            <button
              type="button"
              onClick={() => setShowAddConsultation(false)}
              className="text-xs text-gray-400 hover:text-gray-600"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase">Patient Name</label>
              <input
                type="text"
                value={newPatientName}
                onChange={(e) => setNewPatientName(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-xs"
                placeholder="e.g. John Miller"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase">Patient Age</label>
              <input
                type="number"
                value={newAge}
                onChange={(e) => setNewAge(Number(e.target.value))}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-xs"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase">Patient Gender</label>
              <select
                value={newGender}
                onChange={(e) => setNewGender(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-xs"
              >
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase">Captured Symptoms</label>
              <textarea
                value={newSymptoms}
                onChange={(e) => setNewSymptoms(e.target.value)}
                rows={2}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-xs resize-none"
                placeholder="e.g. Chronic headache, low grade fever..."
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase">Diagnosis Summary</label>
              <textarea
                value={newDiagnosis}
                onChange={(e) => setNewDiagnosis(e.target.value)}
                rows={2}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-xs resize-none"
                placeholder="e.g. Tension Headache with high-fever considerations."
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase">Physician Prescription</label>
            <input
              type="text"
              value={newPrescription}
              onChange={(e) => setNewPrescription(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-xs"
              placeholder="e.g. Ibuprofen 400mg twice daily with meal; Rest & continuous hydration."
            />
          </div>

          {/* Captured vitals sliders */}
          <div className="bg-slate-50 rounded-xl p-3 grid grid-cols-5 gap-3 border border-gray-100">
            <div className="space-y-0.5">
              <span className="block text-[9px] font-bold text-gray-400 uppercase">Systolic BP</span>
              <input
                type="number"
                value={newSystolic}
                onChange={(e) => setNewSystolic(Number(e.target.value))}
                className="w-full bg-white border border-gray-200 rounded p-1 text-[11px] font-mono text-center font-bold"
              />
            </div>
            <div className="space-y-0.5">
              <span className="block text-[9px] font-bold text-gray-400 uppercase">Diastolic BP</span>
              <input
                type="number"
                value={newDiastolic}
                onChange={(e) => setNewDiastolic(Number(e.target.value))}
                className="w-full bg-white border border-gray-200 rounded p-1 text-[11px] font-mono text-center font-bold"
              />
            </div>
            <div className="space-y-0.5">
              <span className="block text-[9px] font-bold text-gray-400 uppercase">Heart Rate</span>
              <input
                type="number"
                value={newHeartRate}
                onChange={(e) => setNewHeartRate(Number(e.target.value))}
                className="w-full bg-white border border-gray-200 rounded p-1 text-[11px] font-mono text-center font-bold"
              />
            </div>
            <div className="space-y-0.5">
              <span className="block text-[9px] font-bold text-gray-400 uppercase">SpO2 %</span>
              <input
                type="number"
                value={newOxygen}
                onChange={(e) => setNewOxygen(Number(e.target.value))}
                className="w-full bg-white border border-gray-200 rounded p-1 text-[11px] font-mono text-center font-bold"
              />
            </div>
            <div className="space-y-0.5">
              <span className="block text-[9px] font-bold text-gray-400 uppercase">Temp °F</span>
              <input
                type="number"
                value={newTemperature}
                onChange={(e) => setNewTemperature(Number(e.target.value))}
                className="w-full bg-white border border-gray-200 rounded p-1 text-[11px] font-mono text-center font-bold"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            Submit Patient Log Entry
          </button>
        </form>
      )}

      {/* Database Display Lists depending on Sub-Tab selection */}
      <div className="glass rounded-3xl p-6 shadow-xs overflow-x-auto min-h-[300px]" id="dashboard-lists-wrapper">
        {activeSubTab === "consultations" && (
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-gray-100 text-gray-400 text-[10px] font-bold uppercase tracking-wider">
                <th className="pb-3 pl-2">Patient Details</th>
                <th className="pb-3">Vitals Captured</th>
                <th className="pb-3">Reported Symptoms</th>
                <th className="pb-3">Doctor Differential Diagnosis</th>
                <th className="pb-3">Actioned Prescription</th>
                <th className="pb-3 text-right pr-2">Date Logged</th>
              </tr>
            </thead>
            <tbody className="text-xs text-gray-700 divide-y divide-gray-50">
              {filteredConsultations.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 pl-2 font-semibold">
                    <span className="block text-gray-900">{item.patientName}</span>
                    <span className="text-[10px] text-gray-400 font-mono">
                      Age {item.age} • {item.gender}
                    </span>
                  </td>
                  <td className="py-4 font-mono">
                    <div className="flex flex-col gap-0.5 text-[10px]">
                      <span>BP: <span className="font-bold text-gray-900">{item.vitals.systolic}/{item.vitals.diastolic}</span></span>
                      <span>HR: <span className="font-bold text-gray-900">{item.vitals.heartRate} bpm</span></span>
                      <span>O2: <span className="font-bold text-gray-900">{item.vitals.oxygen}%</span></span>
                      <span>Temp: <span className="font-bold text-gray-900">{item.vitals.temperature}°F</span></span>
                    </div>
                  </td>
                  <td className="py-4 max-w-xs truncate text-gray-500" title={item.symptoms}>
                    {item.symptoms}
                  </td>
                  <td className="py-4 font-medium text-blue-600 max-w-xs truncate" title={item.diagnosis}>
                    {item.diagnosis || "Awaiting physical doctor sign-off"}
                  </td>
                  <td className="py-4 max-w-xs truncate text-slate-500 italic" title={item.prescription}>
                    {item.prescription || "None recorded"}
                  </td>
                  <td className="py-4 text-right pr-2 font-mono text-gray-400 font-medium">
                    {item.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeSubTab === "bookings" && (
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-gray-100 text-gray-400 text-[10px] font-bold uppercase tracking-wider">
                <th className="pb-3 pl-2">Client Details</th>
                <th className="pb-3">Organization</th>
                <th className="pb-3">Deployment Scope</th>
                <th className="pb-3">Reserved Date & Time</th>
                <th className="pb-3">Lead Email</th>
                <th className="pb-3 text-right pr-2">Booking Status</th>
              </tr>
            </thead>
            <tbody className="text-xs text-gray-700 divide-y divide-gray-50">
              {filteredBookings.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 pl-2 font-semibold text-gray-900">
                    {item.name}
                  </td>
                  <td className="py-4 font-medium text-gray-600">
                    {item.organization}
                  </td>
                  <td className="py-4 font-mono text-[11px] text-blue-600 uppercase font-bold">
                    {item.inquiryType}
                  </td>
                  <td className="py-4 font-mono text-gray-500 font-medium">
                    {item.date} at {item.time}
                  </td>
                  <td className="py-4 text-gray-500">
                    {item.email}
                  </td>
                  <td className="py-4 text-right pr-2">
                    <span className="inline-block px-2 py-1 rounded bg-emerald-50 text-emerald-700 font-bold font-mono text-[9px] border border-emerald-100">
                      {item.status.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeSubTab === "analytics" && (
          <div className="space-y-6 pt-4 text-center">
            <h3 className="font-display font-extrabold text-base text-gray-900">
              Real-time Fleet & Consultation Analytics
            </h3>
            <p className="text-gray-500 text-xs max-w-xl mx-auto leading-relaxed">
              Below are real-time, responsive hardware health grids representing aggregated patient consulting curves and sensor performance factors.
            </p>

            {/* Custom SVG animated bar graph and curves */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto pt-4">
              {/* Consultation Curves */}
              <div className="glass rounded-2xl p-6 space-y-4">
                <div className="flex justify-between items-center border-b border-gray-200/50 pb-2">
                  <span className="text-[10px] font-mono text-blue-600 font-bold uppercase">Patient consult volumes (2026)</span>
                  <span className="text-xs font-bold font-mono text-gray-700">14,200 total</span>
                </div>
                <div className="h-40 flex items-end justify-between gap-1.5 pt-4">
                  {[45, 62, 55, 78, 92, 110, 134].map((height, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center space-y-2">
                      <div
                        style={{ height: `${height}px` }}
                        className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-md relative group cursor-pointer transition-all hover:scale-105"
                      >
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-6 bg-slate-900 text-white text-[9px] font-mono font-bold px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                          {height * 10}
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-gray-400">
                        {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"][i]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sensor utilization ratios */}
              <div className="glass rounded-2xl p-6 space-y-4">
                <div className="flex justify-between items-center border-b border-gray-200/50 pb-2">
                  <span className="text-[10px] font-mono text-teal-600 font-bold uppercase">Sensor utilization ratios</span>
                  <span className="text-xs font-bold font-mono text-gray-700">Calibration average</span>
                </div>
                <div className="space-y-3.5 pt-4">
                  {[
                    { sensor: "Blood Pressure Cuff", ratio: "94%" },
                    { sensor: "Oximetry Probe", ratio: "88%" },
                    { sensor: "Robotic HD Zoom Lens", ratio: "76%" },
                    { sensor: "12-Lead Electrocardiograph", ratio: "62%" },
                  ].map((row, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between text-[11px] font-semibold text-gray-700">
                        <span>{row.sensor}</span>
                        <span className="font-mono text-teal-600">{row.ratio}</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          style={{ width: row.ratio }}
                          className="h-full bg-gradient-to-r from-teal-500 to-teal-400 rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
