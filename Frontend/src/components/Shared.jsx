import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  AreaChart, Area, LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip,
} from "recharts";
import {
  Heart, Droplet, Thermometer, Activity, Bell, Pill, MessageSquare, Users, User,
  Search, ChevronRight, Send, AlertTriangle, CheckCircle2, Stethoscope,
  Video, ShoppingBag, ClipboardList, TrendingUp, Home, Settings, LogOut,
  Sparkles, FileText, Building2, UserPlus,
  Calendar, CalendarDays, Wrench, Package, Truck, MapPin, BarChart3, Filter, PlusCircle,
  ChevronDown, Boxes, AlertCircle, Clock, Circle, RefreshCw, ShieldCheck,
  ToggleLeft, ToggleRight, Check, X, ArrowLeft, Mic, MicOff, CameraOff,
  PhoneOff, Mail, Phone, Pencil, Trash2, Lock, ClipboardCheck, Eye,
} from "lucide-react";



export const C = {
  ink: "#10262A",
  inkSoft: "#4C6265",
  paper: "#F6F8F7",
  paperDim: "#EEF2F0",
  panel: "#FFFFFF",
  teal: "#0C6E63",
  tealDark: "#0A5850",
  tealPale: "#E4F0EC",
  mist: "#DCE6E2",
  line: "#D4E0DB",
  amber: "#9A6B1E",
  amberPale: "#FBF1E1",
  signal: "#C64A3B",
  signalPale: "#FBEAE6",
};

export const serif = "'Source Serif 4', Georgia, serif";
export const sans = "'Inter', -apple-system, sans-serif";

export function useFonts() {
  useEffect(() => {
    const l = document.createElement("link");
    l.rel = "stylesheet";
    l.href =
      "https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,400;8..60,500;8..60,600;8..60,700&family=Inter:wght@400;500;600;700&display=swap";
    document.head.appendChild(l);
    return () => document.head.removeChild(l);
  }, []);
}

/* ---------------------------------------------------------------
   SHARED STYLE HELPERS
----------------------------------------------------------------*/
export const btn = {
  primary: { border: "none", background: C.teal, color: "#fff", padding: "11px 20px", borderRadius: 8, fontFamily: sans, fontSize: 14, fontWeight: 600, cursor: "pointer" },
  secondary: { border: `1px solid ${C.ink}`, background: "transparent", color: C.ink, padding: "11px 20px", borderRadius: 8, fontFamily: sans, fontSize: 14, fontWeight: 600, cursor: "pointer" },
  outline: { border: `1px solid ${C.line}`, background: C.panel, color: C.ink, padding: "11px 20px", borderRadius: 8, fontFamily: sans, fontSize: 14, fontWeight: 600, cursor: "pointer" },
  ghost: { border: "none", background: "transparent", color: C.teal, padding: "11px 4px", fontFamily: sans, fontSize: 14, fontWeight: 600, cursor: "pointer" },
  danger: { border: "none", background: C.signal, color: "#fff", padding: "11px 20px", borderRadius: 8, fontFamily: sans, fontSize: 14, fontWeight: 600, cursor: "pointer" },
};
export function withIcon(style) {
  return { ...style, display: "inline-flex", alignItems: "center", gap: 7 };
}
export const inputStyle = { width: "100%", padding: "10px 12px", borderRadius: 8, border: `1px solid ${C.line}`, fontFamily: sans, fontSize: 13.5, outline: "none", color: C.ink, background: C.panel, boxSizing: "border-box" };

export function Field({ label, children, half }) {
  return (
    <div style={{ marginBottom: 16, width: half ? "calc(50% - 8px)" : "100%", display: "inline-block", verticalAlign: "top" }}>
      <label style={{ display: "block", fontSize: 12.5, fontWeight: 600, color: C.inkSoft, marginBottom: 6 }}>{label}</label>
      {children}
    </div>
  );
}
export function TextField({ label, half, ...props }) {
  return <Field label={label} half={half}><input style={inputStyle} {...props} /></Field>;
}
export function TextAreaField({ label, half, ...props }) {
  return <Field label={label} half={half}><textarea rows={3} style={{ ...inputStyle, resize: "vertical", fontFamily: sans }} {...props} /></Field>;
}
export function SelectField({ label, options, half, ...props }) {
  return (
    <Field label={label} half={half}>
      <div style={{ position: "relative" }}>
        <select style={{ ...inputStyle, appearance: "none", paddingRight: 30 }} {...props}>
          {options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
        <ChevronDown size={14} color={C.inkSoft} style={{ position: "absolute", right: 10, top: 12, pointerEvents: "none" }} />
      </div>
    </Field>
  );
}

export function BackBar({ title, sub, onBack }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 13, marginBottom: 22 }}>
      <button onClick={onBack} style={{ width: 34, height: 34, borderRadius: 8, border: `1px solid ${C.line}`, background: C.panel, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>
        <ArrowLeft size={16} color={C.ink} />
      </button>
      <div>
        <div style={{ fontFamily: serif, fontSize: 21, fontWeight: 600 }}>{title}</div>
        {sub && <div style={{ fontSize: 12.5, color: C.inkSoft, marginTop: 2 }}>{sub}</div>}
      </div>
    </div>
  );
}

export function Modal({ title, onClose, children, width = 480 }) {
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(16,38,42,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200, padding: 20 }}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: C.panel, borderRadius: 14, width, maxWidth: "100%", maxHeight: "85vh", overflowY: "auto", padding: "24px 26px", fontFamily: sans, color: C.ink }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
          <div style={{ fontFamily: serif, fontSize: 19, fontWeight: 600 }}>{title}</div>
          <button onClick={onClose} style={{ border: "none", background: "transparent", cursor: "pointer", color: C.inkSoft, padding: 4 }}>
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function Tabs({ options, active, onChange }) {
  return (
    <div style={{ display: "flex", gap: 6, marginBottom: 18 }}>
      {options.map((o) => (
        <button key={o} onClick={() => onChange(o)} style={{
          border: "none", cursor: "pointer", fontFamily: sans, fontSize: 13, fontWeight: 600, padding: "7px 14px", borderRadius: 20,
          background: active === o ? C.teal : C.paperDim, color: active === o ? "#fff" : C.inkSoft,
        }}>{o}</button>
      ))}
    </div>
  );
}

/* ---------------------------------------------------------------
   DATA — mock, generated once
----------------------------------------------------------------*/
export function genTrend(base, variance, n = 14) {
  let v = base;
  return Array.from({ length: n }, (_, i) => {
    v += (Math.random() - 0.5) * variance;
    return { day: `${i + 1}`, value: Math.round(v * 10) / 10 };
  });
}

export const patients = [
  { id: 1, name: "Ananya Roy", age: 29, condition: "Post-op recovery", status: "stable", hr: 76, spo2: 98, bp: "118/76", temp: 98.4, initials: "AR",
    dob: "14 Mar 1997", gender: "Female", bloodGroup: "O+", phone: "+91 98300 11223", email: "ananya.roy@mail.com", address: "12 Lake View Road, Durgapur",
    allergies: ["Penicillin"], emergency: "Suman Roy (spouse) \u00b7 +91 98300 99887",
    history: [{ c: "Appendectomy", d: "Aug 2026" }, { c: "Seasonal allergy", d: "Ongoing" }],
    prescriptions: [{ date: "8 Sep 2026", medicine: "Atorvastatin 10mg", doctor: "Dr. S. Banerjee" }, { date: "2 Sep 2026", medicine: "Vitamin D3 1000 IU", doctor: "Dr. S. Banerjee" }] },
  { id: 2, name: "Debashish Sarkar", age: 54, condition: "Type 2 diabetes", status: "attention", hr: 92, spo2: 95, bp: "138/88", temp: 99.1, initials: "DS",
    dob: "2 Jul 1972", gender: "Male", bloodGroup: "B+", phone: "+91 94320 55667", email: "d.sarkar@mail.com", address: "45 Bidhannagar, Durgapur",
    allergies: ["None recorded"], emergency: "Ritu Sarkar (daughter) \u00b7 +91 94320 11009",
    history: [{ c: "Type 2 diabetes", d: "Diagnosed 2019" }, { c: "Hypertension", d: "Diagnosed 2022" }],
    prescriptions: [{ date: "5 Sep 2026", medicine: "Insulin glargine", doctor: "Dr. K. Dutta" }, { date: "20 Aug 2026", medicine: "Metformin 500mg", doctor: "Dr. K. Dutta" }] },
  { id: 3, name: "Priya Chatterjee", age: 61, condition: "Hypertension", status: "critical", hr: 108, spo2: 91, bp: "156/96", temp: 100.2, initials: "PC",
    dob: "19 Nov 1964", gender: "Female", bloodGroup: "A-", phone: "+91 90070 33445", email: "priya.c@mail.com", address: "9 Sector 2B, Durgapur",
    allergies: ["Sulfa drugs"], emergency: "Arjun Chatterjee (son) \u00b7 +91 90070 22114",
    history: [{ c: "Hypertension", d: "Diagnosed 2015" }, { c: "Mild arrhythmia", d: "Diagnosed 2024" }],
    prescriptions: [{ date: "10 Sep 2026", medicine: "Amlodipine 5mg", doctor: "Dr. S. Banerjee" }] },
  { id: 4, name: "Rohan Ghosh", age: 34, condition: "Routine checkup", status: "stable", hr: 70, spo2: 99, bp: "112/72", temp: 98.1, initials: "RG",
    dob: "27 Jan 1992", gender: "Male", bloodGroup: "AB+", phone: "+91 89670 44556", email: "rohan.ghosh@mail.com", address: "3 City Centre, Durgapur",
    allergies: ["None recorded"], emergency: "Neha Ghosh (spouse) \u00b7 +91 89670 66778",
    history: [{ c: "No major history", d: "\u2014" }],
    prescriptions: [{ date: "1 Sep 2026", medicine: "Multivitamin", doctor: "Dr. K. Dutta" }] },
  { id: 5, name: "Mitali Dey", age: 47, condition: "Post-viral fatigue", status: "stable", hr: 80, spo2: 97, bp: "122/80", temp: 98.6, initials: "MD",
    dob: "6 May 1979", gender: "Female", bloodGroup: "O-", phone: "+91 97330 22114", email: "mitali.dey@mail.com", address: "21 Muchipara, Durgapur",
    allergies: ["Dust"], emergency: "Kabir Dey (brother) \u00b7 +91 97330 88990",
    history: [{ c: "Viral fever", d: "Aug 2026" }],
    prescriptions: [{ date: "3 Sep 2026", medicine: "Paracetamol 500mg", doctor: "Dr. A. Mukherjee" }] },
];

export const statusColor = { stable: C.teal, attention: C.amber, critical: C.signal };
export const statusBg = { stable: C.tealPale, attention: C.amberPale, critical: C.signalPale };
export const statusLabel = { stable: "Stable", attention: "Needs attention", critical: "Critical" };

export const initialMedications = [
  { id: 1, name: "Metformin", dose: "500mg", freq: "Twice daily", time: "8:00 AM", status: "taken" },
  { id: 2, name: "Atorvastatin", dose: "10mg", freq: "Once daily", time: "9:00 PM", status: "upcoming" },
  { id: 3, name: "Vitamin D3", dose: "1000 IU", freq: "Once daily", time: "8:00 AM", status: "missed" },
  { id: 4, name: "Omega-3", dose: "1000mg", freq: "Once daily", time: "1:00 PM", status: "upcoming" },
];

export const initialAlerts = [
  { id: 1, level: "critical", text: "Blood oxygen dropped to 91% at 3:42 AM, below your configured threshold.", time: "3:42 AM", read: false },
  { id: 2, level: "info", text: "Heart rate has stayed in your normal range for 6 straight days.", time: "Yesterday", read: false },
  { id: 3, level: "info", text: "Medication adherence for this week is 92 percent.", time: "2 days ago", read: true },
  { id: 4, level: "critical", text: "Blood pressure reading of 138/89 exceeded your configured limit.", time: "3 days ago", read: true },
];

/* Consultations (patient-facing) */
export const initialConsultations = {
  upcoming: [
    { id: 1, doctor: "Dr. S. Banerjee", dept: "Cardiology", date: "13 Sep 2026", time: "10:30 AM", mode: "Video" },
  ],
  past: [
    { id: 2, doctor: "Dr. S. Banerjee", dept: "Cardiology", date: "28 Aug 2026", time: "11:00 AM", summary: "Reviewed post-op recovery. Cleared for light activity." },
    { id: 3, doctor: "Dr. K. Dutta", dept: "General medicine", date: "14 Aug 2026", time: "9:15 AM", summary: "Routine checkup. All vitals within normal range." },
  ],
};

/* AI assistant */
export const aiSuggestions = [
  "Summarize my health data for the last seven days",
  "What medicines are scheduled today?",
  "Show my recent alerts",
];
export function aiRespond(q) {
  const s = q.toLowerCase();
  if (s.includes("medic")) return "You have 4 medications scheduled: Metformin and Vitamin D3 at 8:00 AM, Omega-3 at 1:00 PM, and Atorvastatin at 9:00 PM. Vitamin D3 was missed this morning.";
  if (s.includes("alert")) return "You have 2 unread alerts: a critical SpO2 dip to 91% overnight, and a note that your heart rate has been steady for 6 days.";
  if (s.includes("summar") || s.includes("week") || s.includes("seven")) return "Heart rate averaged 78 bpm and stayed in range all week. SpO2 dipped below 94% once, Tuesday night. Blood pressure trended up, three readings above 130/85, worth mentioning at your next visit.";
  return "Here is what I found in your record for that. For anything beyond a summary, your care team can walk through the details with you at your next consultation.";
}

/* Hospital management module data */
export const doctorsRoster = [
  { name: "Dr. S. Banerjee", initials: "SB", dept: "Cardiology", patients: 8, status: "On duty" },
  { name: "Dr. R. Sen", initials: "RS", dept: "Orthopedics", patients: 5, status: "On duty" },
  { name: "Dr. A. Mukherjee", initials: "AM", dept: "Pediatrics", patients: 6, status: "On leave" },
  { name: "Dr. K. Dutta", initials: "KD", dept: "General medicine", patients: 11, status: "On duty" },
];
export const departments = ["Cardiology", "Orthopedics", "Pediatrics", "General medicine", "Radiology"];

export const initialAppointments = [
  { id: 1, time: "9:00 AM", patient: "Ananya Roy", doctor: "Dr. S. Banerjee", dept: "Cardiology", type: "Follow-up" },
  { id: 2, time: "9:30 AM", patient: "Rohan Ghosh", doctor: "Dr. K. Dutta", dept: "General medicine", type: "Routine checkup" },
  { id: 3, time: "10:15 AM", patient: "Priya Chatterjee", doctor: "Dr. S. Banerjee", dept: "Cardiology", type: "Urgent review" },
  { id: 4, time: "11:00 AM", patient: "Mitali Dey", doctor: "Dr. A. Mukherjee", dept: "Pediatrics", type: "Consultation" },
];

export function genBeds() {
  const beds = [];
  for (let i = 1; i <= 8; i++) beds.push({ id: `ICU-${i}`, ward: "ICU", status: i === 3 ? "critical" : i <= 6 ? "occupied" : "empty" });
  for (let i = 1; i <= 16; i++) beds.push({ id: `G-${i}`, ward: "General", status: i % 4 === 0 ? "empty" : "occupied" });
  return beds;
}
export const beds = genBeds();
export const bedStatusColor = { empty: C.mist, occupied: C.teal, critical: C.signal };

export const equipment = [
  { name: "Ventilator unit 3", location: "ICU", status: "operational", checked: "Today" },
  { name: "MRI scanner", location: "Radiology", status: "maintenance", checked: "2 days ago" },
  { name: "Defibrillator A2", location: "ER", status: "operational", checked: "Today" },
  { name: "Infusion pump 12", location: "General ward", status: "critical", checked: "Overdue" },
];
export const equipStatusColor = { operational: C.teal, maintenance: C.amber, critical: C.signal };
export const equipStatusBg = { operational: C.tealPale, maintenance: C.amberPale, critical: C.signalPale };

/* Medicine supply module data */
export const initialInventory = [
  { name: "Paracetamol 500mg", stock: 1200, threshold: 300, status: "in-stock" },
  { name: "Insulin glargine", stock: 45, threshold: 100, status: "low" },
  { name: "Amoxicillin 250mg", stock: 0, threshold: 150, status: "out" },
  { name: "Atorvastatin 10mg", stock: 640, threshold: 200, status: "in-stock" },
  { name: "Metformin 500mg", stock: 180, threshold: 250, status: "low" },
];
export const invStatusColor = { "in-stock": C.teal, low: C.amber, out: C.signal };
export const invStatusBg = { "in-stock": C.tealPale, low: C.amberPale, out: C.signalPale };
export const invStatusLabel = { "in-stock": "In stock", low: "Running low", out: "Out of stock" };
export function invStatusOf(stock, threshold) {
  if (stock <= 0) return "out";
  if (stock < threshold) return "low";
  return "in-stock";
}

export const orders = [
  { id: "#OR-2291", patient: "Ananya Roy", items: "Atorvastatin, Vitamin D3", status: "processing" },
  { id: "#OR-2290", patient: "Debashish Sarkar", items: "Insulin glargine", status: "out-for-delivery" },
  { id: "#OR-2289", patient: "Mitali Dey", items: "Paracetamol 500mg", status: "delivered" },
  { id: "#OR-2288", patient: "Rohan Ghosh", items: "Multivitamin", status: "pending" },
];
export const orderStatusColor = { pending: C.inkSoft, processing: C.amber, "out-for-delivery": C.teal, delivered: C.tealDark };
export const orderStatusBg = { pending: C.paperDim, processing: C.amberPale, "out-for-delivery": C.tealPale, delivered: C.tealPale };
export const orderStatusLabel = { pending: "Pending", processing: "Processing", "out-for-delivery": "Out for delivery", delivered: "Delivered" };
export const deliverySteps = ["Order placed", "Packed", "Out for delivery", "Delivered"];
export const orderStepIndex = { pending: 0, processing: 1, "out-for-delivery": 2, delivered: 3 };

/* ---------------------------------------------------------------
   ECG WAVEFORM — the one recurring motif, used once as hero device
----------------------------------------------------------------*/
export function ecgPath(width, height, cycles) {
  const mid = height / 2;
  const cw = width / cycles;
  let d = `M0,${mid} `;
  for (let i = 0; i < cycles; i++) {
    const x = i * cw;
    d += `L${x + cw * 0.14},${mid} `;
    d += `L${x + cw * 0.2},${mid - height * 0.1} `;
    d += `L${x + cw * 0.26},${mid} `;
    d += `L${x + cw * 0.36},${mid} `;
    d += `L${x + cw * 0.4},${mid + height * 0.16} `;
    d += `L${x + cw * 0.44},${mid - height * 0.44} `;
    d += `L${x + cw * 0.48},${mid + height * 0.26} `;
    d += `L${x + cw * 0.54},${mid} `;
    d += `L${x + cw * 0.64},${mid - height * 0.09} `;
    d += `L${x + cw * 0.72},${mid} `;
    d += `L${x + cw},${mid} `;
  }
  return d;
}

export function Waveform({ width = 820, height = 130, stroke = C.teal }) {
  const d = useMemo(() => ecgPath(width * 2, height, 8), [width, height]);
  return (
    <div style={{ width, height, overflow: "hidden" }}>
      <style>{`
        @keyframes wavescroll { from { transform: translateX(0); } to { transform: translateX(-${width}px); } }
        .wave-track { animation: wavescroll 5.5s linear infinite; }
        @media (prefers-reduced-motion: reduce) { .wave-track { animation: none; } }
      `}</style>
      <svg className="wave-track" width={width * 2} height={height} viewBox={`0 0 ${width * 2} ${height}`}>
        <path d={d} fill="none" stroke={stroke} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
      </svg>
    </div>
  );
}

export function Sparkline({ data, color }) {
  return (
    <div style={{ width: "100%", height: 40 }}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

/* ---------------------------------------------------------------
   SHARED BITS
----------------------------------------------------------------*/
export function Badge({ children, bg, fg }) {
  return (
    <span style={{ background: bg, color: fg, fontSize: 12.5, fontFamily: sans, fontWeight: 600, padding: "3px 10px", borderRadius: 20, whiteSpace: "nowrap" }}>
      {children}
    </span>
  );
}

export function Avatar({ initials, size = 38, bg = C.tealPale, fg = C.tealDark }) {
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", background: bg, color: fg, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: sans, fontWeight: 600, fontSize: size * 0.36, flexShrink: 0 }}>
      {initials}
    </div>
  );
}

export function IconBtn({ icon: Icon, active, onClick, label }) {
  return (
    <button
      onClick={onClick}
      title={label}
      style={{
        width: 42, height: 42, borderRadius: 10, border: "none", cursor: "pointer",
        background: active ? C.teal : "transparent",
        color: active ? "#fff" : C.inkSoft,
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "background 120ms ease",
      }}
    >
      <Icon size={19} strokeWidth={1.8} />
    </button>
  );
}




export function CallOverlay({ name, sub, onClose }) {
  const [seconds, setSeconds] = useState(0);
  const [muted, setMuted] = useState(false);
  const [camOff, setCamOff] = useState(false);
  useEffect(() => {
    const t = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, []);
  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");
  return (
    <div style={{ position: "fixed", inset: 0, background: C.ink, zIndex: 300, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", padding: "40px 20px", fontFamily: sans }}>
      <div style={{ color: "#9DB3AF", fontSize: 13 }}>Call in progress &middot; {mm}:{ss}</div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
        <Avatar initials={name.split(" ").map((p) => p[0]).slice(0, 2).join("")} size={96} bg="#1B3B38" fg="#8FD8C6" />
        <div style={{ color: "#fff", fontFamily: serif, fontSize: 22, fontWeight: 600 }}>{name}</div>
        <div style={{ color: "#9DB3AF", fontSize: 13 }}>{sub}</div>
        {camOff && <div style={{ color: "#9DB3AF", fontSize: 12, border: "1px solid #2C4A47", borderRadius: 8, padding: "6px 12px" }}>Camera is off</div>}
      </div>
      <div style={{ display: "flex", gap: 18 }}>
        <button onClick={() => setMuted(!muted)} style={{ width: 52, height: 52, borderRadius: "50%", border: "none", cursor: "pointer", background: muted ? "#fff" : "#1B3B38", color: muted ? C.ink : "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {muted ? <MicOff size={20} /> : <Mic size={20} />}
        </button>
        <button onClick={() => setCamOff(!camOff)} style={{ width: 52, height: 52, borderRadius: "50%", border: "none", cursor: "pointer", background: camOff ? "#fff" : "#1B3B38", color: camOff ? C.ink : "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {camOff ? <CameraOff size={20} /> : <Video size={20} />}
        </button>
        <button onClick={onClose} style={{ width: 52, height: 52, borderRadius: "50%", border: "none", cursor: "pointer", background: C.signal, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <PhoneOff size={20} />
        </button>
      </div>
    </div>
  );
}


export function AppFooterBar() {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 22px", borderTop: `1px solid ${C.line}`, background: C.panel, fontFamily: sans }}>
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <RefreshCw size={12} color={C.teal} />
          <span style={{ fontSize: 12, color: C.inkSoft }}>Synced just now</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <ShieldCheck size={12} color={C.teal} />
          <span style={{ fontSize: 12, color: C.inkSoft }}>HL7 / FHIR compliant</span>
        </div>
      </div>
      <div style={{ display: "flex", gap: 18, fontSize: 12, color: C.inkSoft }}>
        <span>Support</span><span>Privacy</span><span>v1.0.0</span>
      </div>
    </div>
  );
}
