import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Lazy initialization of Gemini
let aiClient: GoogleGenAI | null = null;
function getGeminiClient() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("GEMINI_API_KEY is not configured in environment variables.");
      return null;
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// In-Memory Databases with pre-populated realistic mock records
const bookings = [
  {
    id: "bk-1",
    name: "Dr. Rachel Green",
    organization: "Metropolis Community Health",
    email: "rachel.green@metrohealth.org",
    phone: "+1 (555) 234-5678",
    country: "United States",
    inquiryType: "Rural Deployment",
    message: "Interested in deploying 15 kiosks across rural clinic extensions.",
    date: "2026-07-10",
    time: "10:00 AM",
    status: "Confirmed",
    createdAt: new Date().toISOString(),
  },
  {
    id: "bk-2",
    name: "Marcus Aurelius",
    organization: "Stoic Tech Corp",
    email: "marcus@stoictech.com",
    phone: "+1 (555) 890-1234",
    country: "Canada",
    inquiryType: "Corporate Wellness",
    message: "Exploring kiosk installation in our main campus office.",
    date: "2026-07-14",
    time: "2:30 PM",
    status: "Pending",
    createdAt: new Date().toISOString(),
  },
];

const consultations = [
  {
    id: "con-1",
    patientName: "Sarah Connor",
    age: 34,
    gender: "Female",
    doctorName: "Dr. Allison Vance (Internal Medicine)",
    symptoms: "Mild chest tightness, persistent dry cough for 3 days, mild fatigue.",
    vitals: {
      systolic: 124,
      diastolic: 82,
      heartRate: 78,
      oxygen: 97,
      temperature: 99.1,
    },
    notes: "Patient has history of seasonal asthma. Clear lungs upon remote auscultation. Vitals stable.",
    diagnosis: "Acute Bronchitis (mild) / Post-viral reactive airway",
    prescription: "Albuterol HFA Inhaler - 2 puffs every 4-6 hours as needed; Rest & Hydration.",
    date: "2026-06-24",
    status: "Completed",
  },
  {
    id: "con-2",
    patientName: "John Doe",
    age: 45,
    gender: "Male",
    doctorName: "Dr. Kenneth Cole (Cardiologist)",
    symptoms: "Elevated blood pressure, occasional mild dizziness after exercise.",
    vitals: {
      systolic: 142,
      diastolic: 91,
      heartRate: 84,
      oxygen: 99,
      temperature: 98.4,
    },
    notes: "Slight stage 2 hypertension. Recommend reduction in dietary sodium, moderate daily walking.",
    diagnosis: "Essential Hypertension (Stage 2)",
    prescription: "Lisinopril 10mg daily; Daily BP monitoring at MediConnect Kiosk.",
    date: "2026-06-23",
    status: "Completed",
  },
  {
    id: "con-3",
    patientName: "Elena Rostova",
    age: 29,
    gender: "Female",
    doctorName: "Dr. Priya Patel (General Practitioner)",
    symptoms: "Sore throat, difficulty swallowing, body aches.",
    vitals: {
      systolic: 115,
      diastolic: 75,
      heartRate: 72,
      oxygen: 98,
      temperature: 101.2,
    },
    notes: "Erythematous tonsils without exudate. Temperature elevated, consistent with acute pharyngitis.",
    diagnosis: "Acute Pharyngitis (likely viral)",
    prescription: "Acetaminophen 500mg every 6 hours; Warm saline gargles; Re-check if symptoms persist > 48 hours.",
    date: "2026-06-22",
    status: "Completed",
  },
];

// -------------------------------------------------------------
// API Endpoints
// -------------------------------------------------------------

// Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// Chatbot Endpoint (Server-Side Gemini API Proxy)
app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Messages array is required." });
    }

    const ai = getGeminiClient();
    if (!ai) {
      // High-quality fallback if Gemini is not configured
      const lastUserMsg = messages[messages.length - 1]?.content || "";
      let reply = "Hello! I am the MediConnect AI Assistant. I can help guide you on our remote diagnostic kiosk capabilities, our pricing, solutions for corporate and rural communities, or how to schedule a demo. (To unlock real-time generative clinical intelligence, please set up your GEMINI_API_KEY in Secrets!)";

      if (lastUserMsg.toLowerCase().includes("kiosk") || lastUserMsg.toLowerCase().includes("hardware")) {
        reply = "The MediConnect AI Kiosk is a state-of-the-art health station equipped with an HD Consultation Camera, Touchscreen, Blood Pressure Monitor, Pulse Oximeter, Medical Thermometer, 12-lead ECG Device, Weight Scale, Document Scanner, and Secure Prescription Printer. It offers clinical grade diagnostics with remote provider guidance.";
      } else if (lastUserMsg.toLowerCase().includes("price") || lastUserMsg.toLowerCase().includes("cost")) {
        reply = "We offer three flexible plans: the Starter Plan for small clinics ($499/mo), the Professional Plan for healthcare networks ($1,299/mo), and the Custom Enterprise Plan for hospitals and governments. We offer monthly and yearly billing options with discount terms.";
      } else if (lastUserMsg.toLowerCase().includes("demo") || lastUserMsg.toLowerCase().includes("book")) {
        reply = "I'd be happy to assist with booking a live demonstration! Please head over to our 'Contact & Demo' page to choose your preferred date, time, and tell us about your organization. Alternatively, I can collect your details right here!";
      }

      return res.json({ text: reply, simulated: true });
    }

    const systemInstruction = `You are "MediConnect AI", the highly capable, empathetic, and professional virtual assistant for the MediConnect AI Kiosk platform.
    Your capabilities:
    1. Explain how the Kiosk works: integrated diagnostics (BP monitor, pulse oximeter, thermometer, ECG, weighing scale, scanner, printer, HD camera) and real-time remote physician connection.
    2. Answer FAQs regarding plans (Starter, Professional, Enterprise), solutions (Rural, Corporate, Hospital Extension, Government), and security (HIPAA compliant, E2E encrypted).
    3. Help collect lead information for scheduling kiosk demonstrations.
    4. Provide general health triage education. Always maintain a serious, clinical, yet warm tone.
    5. CRITICAL: Include a friendly, clear notice that you are an AI assistant and that official medical diagnoses are made by the certified remote doctors via the kiosk. Keep responses structured with clean markdown.`;

    // Translate chat history to a simple prompt string for generateContent
    const historyString = messages
      .map((m: any) => `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`)
      .join("\n");
    const prompt = `${historyString}\nAssistant:`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Chat API Error:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
});

// AI Symptom Assessment / Triage Endpoint (Gemini API Proxy)
app.post("/api/symptom-analyze", async (req, res) => {
  try {
    const { symptoms, vitals } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      // Intelligent fallback
      const sys = vitals?.systolic || 120;
      const dia = vitals?.diastolic || 80;
      const hr = vitals?.heartRate || 72;
      const ox = vitals?.oxygen || 98;
      const temp = vitals?.temperature || 98.6;

      let vitalsAssessment = "Vitals are within the normal reference range.";
      if (sys > 130 || dia > 85) vitalsAssessment = "Blood pressure is slightly elevated (prehypertension/hypertension range).";
      if (temp > 100) vitalsAssessment = "Body temperature indicates a low-to-medium grade fever.";
      if (ox < 95) vitalsAssessment = "Oxygen saturation is slightly below optimal (mild hypoxia risk).";

      const fallbackText = `### **AI-Assisted Symptom & Triage Report**
*Powered by MediConnect AI (Demo Mode)*

#### **1. Submissions Summary**
*   **Reported Symptoms:** ${symptoms || "No specific symptoms inputted."}
*   **Vitals Log:** BP: ${sys}/${dia} mmHg | Pulse: ${hr} bpm | SpO2: ${ox}% | Temp: ${temp}°F

#### **2. Vitals Analysis**
*   ${vitalsAssessment}
*   Heart Rate of ${hr} bpm is normal and stable.

#### **3. Severity Classification**
*   **Triage Rating:** **MODERATE RISK** (Based on simulated clinical indicators)
*   **Confidence Score:** 84% (Visual & Vital Log Match)

#### **4. Recommended Action Plan**
1.  **Teleconsultation:** Initiate an immediate video call with an on-call practitioner using the Kiosk HD screen.
2.  **Home Care:** Rest, maintain continuous hydration, and re-measure temperature in 4 hours.
3.  **Emergency Notice:** If you experience shortness of breath, severe chest pressure, or sudden numbness, please bypass the kiosk and dial emergency services immediately.

*Disclaimer: This is a simulated triage assessment. Always consult a licensed medical doctor for definitive advice.*`;

      return res.json({ analysis: fallbackText, simulated: true });
    }

    const prompt = `Conduct an exhaustive, professional medical triage and risk prediction analysis.
Patient Reported Symptoms: "${symptoms || "None specified"}"
Recorded Device Vitals:
- Blood Pressure: ${vitals?.systolic || 120}/${vitals?.diastolic || 80} mmHg
- Heart Rate: ${vitals?.heartRate || 72} bpm
- Oxygen Saturation (SpO2): ${vitals?.oxygen || 98}%
- Body Temperature: ${vitals?.temperature || 98.6}°F

Provide a beautiful, medical-grade report in Markdown.
Structure as follows:
### **AI-Assisted Symptom & Triage Report**
1. **Clinical Vitals Interpretation**: Break down each vital sign against clinical reference thresholds. Highlight abnormalities like hypertension, fever, bradycardia, or hypoxia.
2. **Symptom Risk Classification**: Determine severity rating (LOW, MODERATE, or HIGH RISK) with sound physiological rationale.
3. **Potential Physiological Considerations**: List educational differential scenarios (clearly state these are considerations, not formal diagnoses).
4. **Actionable Triage Protocol**: Step-by-step instructions (e.g., immediate kiosk doctor call, schedule general physician appointment, or emergency services dispatch).
5. **Disclaimer**: Include a visible, professional medical disclaimer.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are an advanced clinical triage AI module embedded in the MediConnect Kiosk. Your objective is to translate patient symptom entries and hardware vitals into structured, educational risk assessments. Always prioritize patient safety and direct them to medical professionals.",
        temperature: 0.3,
      },
    });

    res.json({ analysis: response.text });
  } catch (error: any) {
    console.error("AI Triage Error:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
});

// Bookings GET & POST
app.get("/api/bookings", (req, res) => {
  res.json(bookings);
});

app.post("/api/bookings", (req, res) => {
  const { name, organization, email, phone, country, inquiryType, message, date, time } = req.body;
  if (!name || !email || !organization) {
    return res.status(400).json({ error: "Name, email, and organization are required." });
  }

  const newBooking = {
    id: `bk-${Date.now()}`,
    name,
    organization,
    email,
    phone: phone || "Not provided",
    country: country || "United States",
    inquiryType: inquiryType || "General Demo",
    message: message || "",
    date: date || new Date().toISOString().split("T")[0],
    time: time || "11:00 AM",
    status: "Confirmed",
    createdAt: new Date().toISOString(),
  };

  bookings.unshift(newBooking);
  res.status(201).json(newBooking);
});

// Consultations GET & POST (Mock EMR logs)
app.get("/api/consultations", (req, res) => {
  res.json(consultations);
});

app.post("/api/consultations", (req, res) => {
  const { patientName, age, gender, symptoms, vitals, diagnosis, prescription, doctorName } = req.body;
  if (!patientName || !symptoms) {
    return res.status(400).json({ error: "Patient name and symptoms are required." });
  }

  const newConsultation = {
    id: `con-${Date.now()}`,
    patientName,
    age: Number(age) || 30,
    gender: gender || "Other",
    doctorName: doctorName || "Dr. Jarvis (AI Assisted Tele-Physician)",
    symptoms,
    vitals: {
      systolic: Number(vitals?.systolic) || 120,
      diastolic: Number(vitals?.diastolic) || 80,
      heartRate: Number(vitals?.heartRate) || 72,
      oxygen: Number(vitals?.oxygen) || 98,
      temperature: Number(vitals?.temperature) || 98.6,
    },
    notes: "Consultation conducted via remote kiosk high-definition clinical portal.",
    diagnosis: diagnosis || "Observation / Rest suggested",
    prescription: prescription || "No pharmacological prescription required. Standard rest recommended.",
    date: new Date().toISOString().split("T")[0],
    status: "Completed",
  };

  consultations.unshift(newConsultation);
  res.status(201).json(newConsultation);
});

// -------------------------------------------------------------
// Vite and Static Assets Pipeline
// -------------------------------------------------------------

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting Express server in development mode with Vite HMR integration...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting Express server in production mode serving static assets...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`=============================================================`);
    console.log(`MediConnect AI Server running on: http://localhost:${PORT}`);
    console.log(`=============================================================`);
  });
}

startServer();
