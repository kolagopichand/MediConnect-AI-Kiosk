export type Language = "en" | "hi" | "te" | "ta" | "es";

export type UserRole = "patient" | "doctor" | "admin" | "org_manager";

export interface Vitals {
  systolic: number;
  diastolic: number;
  heartRate: number;
  oxygen: number;
  temperature: number;
}

export interface Consultation {
  id: string;
  patientName: string;
  age: number;
  gender: string;
  doctorName: string;
  symptoms: string;
  vitals: Vitals;
  notes?: string;
  diagnosis?: string;
  prescription?: string;
  date: string;
  status: "Completed" | "Pending" | "Active";
}

export interface Booking {
  id: string;
  name: string;
  organization: string;
  email: string;
  phone: string;
  country: string;
  inquiryType: string;
  message: string;
  date: string;
  time: string;
  status: "Confirmed" | "Pending" | "Declined";
  createdAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  author: string;
  role: string;
  date: string;
  readTime: string;
  image: string;
  content: string;
}

export type ActiveTab =
  | "home"
  | "about"
  | "solutions"
  | "technology"
  | "kiosk"
  | "services"
  | "pricing"
  | "casestudies"
  | "contact"
  | "dashboard"
  | "blog";
