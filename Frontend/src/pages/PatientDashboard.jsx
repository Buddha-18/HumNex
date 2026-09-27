import logoImg from "../assets/logo.jpg";
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

import {
  C, serif, sans, useFonts, btn, withIcon, inputStyle, Field, TextField, TextAreaField, SelectField, BackBar, Modal, Tabs, genTrend, patients, statusColor, statusBg, statusLabel, initialMedications, initialAlerts, initialConsultations, aiSuggestions, aiRespond, doctorsRoster, departments, initialAppointments, genBeds, beds, bedStatusColor, equipment, equipStatusColor, equipStatusBg, initialInventory, invStatusColor, invStatusBg, invStatusLabel, invStatusOf, orders, orderStatusColor, orderStatusBg, orderStatusLabel, deliverySteps, orderStepIndex, ecgPath, Waveform, Sparkline, Badge, Avatar, IconBtn, CallOverlay, AppFooterBar
} from '../components/Shared';




export function VitalCard({ icon: Icon, label, value, unit, trend, color, status }) {
  return (
    <div style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 12, padding: "18px 20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Icon size={16} color={color} strokeWidth={2} />
          <span style={{ fontSize: 13, color: C.inkSoft, fontFamily: sans }}>{label}</span>
        </div>
        {status && <div style={{ width: 7, height: 7, borderRadius: "50%", background: status === "high" ? C.signal : C.teal }} />}
      </div>
      <div style={{ fontFamily: serif, fontSize: 28, fontWeight: 600, marginBottom: 8 }}>
        {value}<span style={{ fontSize: 13, fontWeight: 400, color: C.inkSoft, fontFamily: sans, marginLeft: 3 }}>{unit}</span>
      </div>
      <Sparkline data={trend} color={color} />
    </div>
  );
}

export function MedicationStatusBadge({ status }) {
  if (status === "taken") return <Badge bg={C.tealPale} fg={C.tealDark}>Taken</Badge>;
  if (status === "missed") return <Badge bg={C.signalPale} fg={C.signal}>Missed</Badge>;
  return <Badge bg={C.paperDim} fg={C.inkSoft}>Upcoming</Badge>;
}

export function MedicationsPage({ meds, setMeds, filter, setFilter }) {
  const [addOpen, setAddOpen] = useState(false);
  const [form, setForm] = useState({ name: "", dose: "", freq: "Once daily", time: "" });
  const filtered = filter === "All" ? meds : meds.filter((m) => m.status === filter.toLowerCase());
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
        <Tabs options={["All", "Taken", "Upcoming", "Missed"]} active={filter} onChange={setFilter} />
        <button onClick={() => setAddOpen(true)} style={withIcon(btn.primary)}><PlusCircle size={15} /> Add medication</button>
      </div>

      {addOpen && (
        <Modal title="Add a medication" onClose={() => setAddOpen(false)} width={420}>
          <TextField label="Medicine name" placeholder="e.g. Losartan" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <TextField label="Dosage" placeholder="e.g. 50mg" half value={form.dose} onChange={(e) => setForm({ ...form, dose: e.target.value })} />
          <TextField label="Time" type="time" half value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} />
          <SelectField label="Frequency" options={["Once daily", "Twice daily", "Three times daily", "As needed"]} value={form.freq} onChange={(e) => setForm({ ...form, freq: e.target.value })} />
          <button style={{ ...btn.primary, width: "100%", marginTop: 6 }} onClick={() => {
            if (!form.name) return;
            setMeds([...meds, { id: Date.now(), name: form.name, dose: form.dose || "\u2014", freq: form.freq, time: form.time || "\u2014", status: "upcoming" }]);
            setForm({ name: "", dose: "", freq: "Once daily", time: "" });
            setAddOpen(false);
          }}>Save medication</button>
        </Modal>
      )}

      <div style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 12, padding: "6px 22px" }}>
        {filtered.length === 0 && <div style={{ padding: "24px 0", color: C.inkSoft, fontSize: 13.5 }}>No medications in this filter.</div>}
        {filtered.map((m, i) => (
          <div key={m.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "15px 0", borderTop: i > 0 ? `1px solid ${C.line}` : "none" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 34, height: 34, borderRadius: 8, background: C.tealPale, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Pill size={15} color={C.tealDark} strokeWidth={1.8} />
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{m.name} <span style={{ fontWeight: 400, color: C.inkSoft }}>&middot; {m.dose}</span></div>
                <div style={{ fontSize: 12.5, color: C.inkSoft }}>{m.freq} &middot; {m.time}</div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              {m.status !== "taken" && (
                <button onClick={() => setMeds(meds.map((x) => x.id === m.id ? { ...x, status: "taken" } : x))} style={{ ...btn.outline, padding: "6px 12px", fontSize: 12.5 }}>Mark taken</button>
              )}
              <MedicationStatusBadge status={m.status} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ConsultationsPage({ data, setData, onJoinCall }) {
  const [bookOpen, setBookOpen] = useState(false);
  const [form, setForm] = useState({ doctor: doctorsRoster[0].name, date: "", time: "", reason: "" });
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 18 }}>
        <button onClick={() => setBookOpen(true)} style={withIcon(btn.primary)}><PlusCircle size={15} /> Book a consultation</button>
      </div>

      {bookOpen && (
        <Modal title="Book a consultation" onClose={() => setBookOpen(false)} width={440}>
          <SelectField label="Doctor" options={doctorsRoster.map((d) => d.name)} value={form.doctor} onChange={(e) => setForm({ ...form, doctor: e.target.value })} />
          <TextField label="Date" type="date" half value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
          <TextField label="Time" type="time" half value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} />
          <TextAreaField label="Reason for visit" placeholder="Briefly describe what you'd like to discuss" value={form.reason} onChange={(e) => setForm({ ...form, reason: e.target.value })} />
          <button style={{ ...btn.primary, width: "100%", marginTop: 6 }} onClick={() => {
            const doc = doctorsRoster.find((d) => d.name === form.doctor);
            setData({ ...data, upcoming: [...data.upcoming, { id: Date.now(), doctor: form.doctor, dept: doc ? doc.dept : "", date: form.date || "TBD", time: form.time || "TBD", mode: "Video" }] });
            setBookOpen(false);
          }}>Confirm booking</button>
        </Modal>
      )}

      <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 12 }}>Upcoming</div>
      <div style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 12, padding: "6px 22px", marginBottom: 26 }}>
        {data.upcoming.length === 0 && <div style={{ padding: "20px 0", color: C.inkSoft, fontSize: 13.5 }}>No upcoming consultations.</div>}
        {data.upcoming.map((c, i) => (
          <div key={c.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "15px 0", borderTop: i > 0 ? `1px solid ${C.line}` : "none" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <Avatar initials={c.doctor.split(" ").slice(-1)[0][0] + "D"} />
              <div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{c.doctor}</div>
                <div style={{ fontSize: 12.5, color: C.inkSoft }}>{c.dept} &middot; {c.date} at {c.time} &middot; {c.mode}</div>
              </div>
            </div>
            <button onClick={() => onJoinCall(c.doctor)} style={withIcon(btn.primary)}><Video size={14} /> Join call</button>
          </div>
        ))}
      </div>

      <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 12 }}>Past</div>
      <div style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 12, padding: "6px 22px" }}>
        {data.past.map((c, i) => (
          <div key={c.id} style={{ padding: "15px 0", borderTop: i > 0 ? `1px solid ${C.line}` : "none" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{c.doctor} <span style={{ fontWeight: 400, color: C.inkSoft }}>&middot; {c.dept}</span></div>
              <div style={{ fontSize: 12.5, color: C.inkSoft }}>{c.date}</div>
            </div>
            <div style={{ fontSize: 13, color: C.inkSoft, lineHeight: 1.5 }}>{c.summary}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PharmacyPatientPage() {
  const myOrders = orders.filter((o) => o.patient === "Ananya Roy");
  const [cart, setCart] = useState({});
  return (
    <div>
      <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 12 }}>Browse medicines</div>
      <div style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 12, padding: "6px 22px", marginBottom: 26 }}>
        {initialInventory.map((it, i) => {
          const st = invStatusOf(it.stock, it.threshold);
          const inCart = cart[it.name];
          return (
            <div key={it.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0", borderTop: i > 0 ? `1px solid ${C.line}` : "none" }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{it.name}</div>
                <div style={{ fontSize: 12, color: C.inkSoft }}>Ships from nearest partner pharmacy</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <Badge bg={invStatusBg[st]} fg={invStatusColor[st]}>{invStatusLabel[st]}</Badge>
                <button disabled={st === "out"} onClick={() => setCart({ ...cart, [it.name]: true })} style={{ ...btn.outline, padding: "7px 14px", fontSize: 12.5, opacity: st === "out" ? 0.5 : 1, cursor: st === "out" ? "not-allowed" : "pointer" }}>
                  {inCart ? "Added" : "Order"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 12 }}>Your orders</div>
      <div style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 12, padding: "20px 22px" }}>
        {myOrders.map((o, i) => (
          <div key={o.id} style={{ padding: "12px 0", borderTop: i > 0 ? `1px solid ${C.line}` : "none" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
              <div>
                <div style={{ fontSize: 13.5, fontWeight: 600 }}>{o.id}</div>
                <div style={{ fontSize: 12, color: C.inkSoft }}>{o.items}</div>
              </div>
              <Badge bg={orderStatusBg[o.status]} fg={orderStatusColor[o.status]}>{orderStatusLabel[o.status]}</Badge>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              {deliverySteps.map((s, si) => {
                const done = si <= orderStepIndex[o.status];
                return (
                  <React.Fragment key={s}>
                    <div style={{ width: 16, height: 16, borderRadius: "50%", background: done ? C.teal : C.paperDim, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      {done && <Check size={9} color="#fff" strokeWidth={3} />}
                    </div>
                    {si < deliverySteps.length - 1 && <div style={{ flex: 1, height: 2, background: si < orderStepIndex[o.status] ? C.teal : C.line }} />}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AIAssistantPage({ chat, setChat }) {
  const [input, setInput] = useState("");
  const endRef = useRef(null);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [chat]);

  function send(text) {
    const q = (text ?? input).trim();
    if (!q) return;
    setChat((c) => [...c, { role: "user", text: q }]);
    setInput("");
    setTimeout(() => setChat((c) => [...c, { role: "ai", text: aiRespond(q) }]), 500);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: 520, background: C.panel, border: `1px solid ${C.line}`, borderRadius: 12 }}>
      <div style={{ padding: "16px 20px", borderBottom: `1px solid ${C.line}`, display: "flex", alignItems: "center", gap: 9 }}>
        <Sparkles size={16} color={C.tealDark} />
        <span style={{ fontSize: 14.5, fontWeight: 600 }}>Ask HumaNex</span>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "18px 20px", display: "flex", flexDirection: "column", gap: 12 }}>
        {chat.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
            {m.role === "ai" && (
              <div style={{ width: 24, height: 24, borderRadius: "50%", background: C.tealPale, display: "flex", alignItems: "center", justifyContent: "center", marginRight: 8, flexShrink: 0 }}>
                <Sparkles size={12} color={C.tealDark} />
              </div>
            )}
            <div style={{
              background: m.role === "user" ? C.ink : C.paperDim, color: m.role === "user" ? "#fff" : C.ink,
              borderRadius: m.role === "user" ? "12px 12px 2px 12px" : "12px 12px 12px 2px", padding: "10px 15px", fontSize: 13.5, lineHeight: 1.55, maxWidth: 400,
            }}>{m.text}</div>
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <div style={{ padding: "12px 16px", borderTop: `1px solid ${C.line}` }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
          {aiSuggestions.map((s) => (
            <span key={s} onClick={() => send(s)} style={{ fontSize: 12, color: C.tealDark, background: C.tealPale, padding: "5px 11px", borderRadius: 20, cursor: "pointer" }}>{s}</span>
          ))}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} placeholder="Ask about your health record" style={{ ...inputStyle, flex: 1 }} />
          <button onClick={() => send()} style={{ width: 38, height: 38, borderRadius: 8, border: "none", background: C.teal, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>
            <Send size={15} color="#fff" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function SettingsPage() {
  const [notif, setNotif] = useState({ critical: true, reminders: true, weekly: false });
  const [thresh, setThresh] = useState({ hrHigh: 110, hrLow: 50, spo2Low: 94, bpHigh: 140 });
  return (
    <div style={{ maxWidth: 640 }}>
      <div style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 12, padding: "20px 22px", marginBottom: 16 }}>
        <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 16 }}>Profile information</div>
        <div>
          <TextField label="Full name" half defaultValue="Ananya Roy" />
          <TextField label="Email" half defaultValue="ananya.roy@mail.com" />
          <TextField label="Phone" half defaultValue="+91 98300 11223" />
          <TextField label="Date of birth" half defaultValue="14 Mar 1997" />
        </div>
        <button style={withIcon(btn.outline)}><Check size={14} /> Save changes</button>
      </div>

      <div style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 12, padding: "20px 22px", marginBottom: 16 }}>
        <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 16 }}>Notification preferences</div>
        {[["critical", "Critical vital alerts"], ["reminders", "Medication reminders"], ["weekly", "Weekly health summary email"]].map(([k, l]) => (
          <div key={k} onClick={() => setNotif({ ...notif, [k]: !notif[k] })} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 0", cursor: "pointer" }}>
            {notif[k] ? <ToggleRight size={30} color={C.teal} /> : <ToggleLeft size={30} color={C.inkSoft} />}
            <span style={{ fontSize: 13.5 }}>{l}</span>
          </div>
        ))}
      </div>

      <div style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 12, padding: "20px 22px", marginBottom: 16 }}>
        <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>Vital reading thresholds</div>
        <div style={{ fontSize: 12.5, color: C.inkSoft, marginBottom: 16 }}>Alerts are generated when a reading crosses these configured limits.</div>
        <div>
          <TextField label="Heart rate, high (bpm)" half type="number" value={thresh.hrHigh} onChange={(e) => setThresh({ ...thresh, hrHigh: e.target.value })} />
          <TextField label="Heart rate, low (bpm)" half type="number" value={thresh.hrLow} onChange={(e) => setThresh({ ...thresh, hrLow: e.target.value })} />
          <TextField label="SpO2, low (%)" half type="number" value={thresh.spo2Low} onChange={(e) => setThresh({ ...thresh, spo2Low: e.target.value })} />
          <TextField label="Blood pressure, high (systolic)" half type="number" value={thresh.bpHigh} onChange={(e) => setThresh({ ...thresh, bpHigh: e.target.value })} />
        </div>
      </div>

      <div style={{ background: C.panel, border: `1px solid ${C.signalPale}`, borderRadius: 12, padding: "20px 22px" }}>
        <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4, color: C.signal }}>Danger zone</div>
        <div style={{ fontSize: 12.5, color: C.inkSoft, marginBottom: 14 }}>Permanently delete your account and all associated health records.</div>
        <button style={withIcon(btn.danger)}><Trash2 size={14} /> Delete account</button>
      </div>
    </div>
  );
}

export function AlertsPage({ alerts, setAlerts, filter, setFilter }) {
  const filtered = filter === "All" ? alerts : alerts.filter((a) => a.level === filter.toLowerCase());
  return (
    <div>
      <Tabs options={["All", "Critical", "Info"]} active={filter} onChange={setFilter} />
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {filtered.map((a) => (
          <div key={a.id} style={{
            borderLeft: `3px solid ${a.level === "critical" ? C.signal : C.teal}`,
            background: a.level === "critical" ? C.signalPale : C.tealPale,
            padding: "14px 16px", borderRadius: "0 10px 10px 0", opacity: a.read ? 0.55 : 1,
            display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 14,
          }}>
            <div>
              <div style={{ display: "flex", gap: 7, marginBottom: 5, alignItems: "center" }}>
                {a.level === "critical" ? <AlertTriangle size={14} color={C.signal} /> : <CheckCircle2 size={14} color={C.tealDark} />}
                <span style={{ fontSize: 12, fontWeight: 600, color: a.level === "critical" ? C.signal : C.tealDark }}>{a.time}</span>
              </div>
              <div style={{ fontSize: 13.5, lineHeight: 1.5, color: C.ink }}>{a.text}</div>
            </div>
            {!a.read && (
              <button onClick={() => setAlerts(alerts.map((x) => x.id === a.id ? { ...x, read: true } : x))} style={{ ...btn.outline, padding: "6px 12px", fontSize: 12, flexShrink: 0 }}>Mark read</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function ProfilePage({ onEdit }) {
  const p = patients[0];
  const rows = [
    ["Date of birth", p.dob], ["Gender", p.gender], ["Blood group", p.bloodGroup],
    ["Phone", p.phone], ["Email", p.email], ["Address", p.address],
  ];
  return (
    <div style={{ maxWidth: 640 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 22 }}>
        <Avatar initials={p.initials} size={64} bg={statusBg[p.status]} fg={statusColor[p.status]} />
        <div>
          <div style={{ fontFamily: serif, fontSize: 22, fontWeight: 600 }}>{p.name}</div>
          <div style={{ fontSize: 13, color: C.inkSoft }}>Patient ID: HMX-{1000 + p.id} &middot; {p.age} years</div>
        </div>
        <button style={{ ...withIcon(btn.outline), marginLeft: "auto" }}><Pencil size={13} /> Edit profile</button>
      </div>

      <div style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 12, padding: "20px 22px", marginBottom: 16 }}>
        <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 14 }}>Personal details</div>
        {rows.map(([l, v], i) => (
          <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderTop: i > 0 ? `1px solid ${C.line}` : "none", fontSize: 13.5 }}>
            <span style={{ color: C.inkSoft }}>{l}</span><span style={{ fontWeight: 600 }}>{v}</span>
          </div>
        ))}
      </div>

      <div style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 12, padding: "20px 22px", marginBottom: 16 }}>
        <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 12 }}>Allergies</div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {p.allergies.map((a) => <Badge key={a} bg={C.signalPale} fg={C.signal}>{a}</Badge>)}
        </div>
      </div>

      <div style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 12, padding: "20px 22px" }}>
        <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>Emergency contact</div>
        <div style={{ fontSize: 13.5, color: C.inkSoft }}>{p.emergency}</div>
      </div>
    </div>
  );
}

export function PatientDashboard({ onSignOut }) {
  const hrTrend = useMemo(() => genTrend(78, 4), []);
  const spo2Trend = useMemo(() => genTrend(97, 1.5), []);
  const bpTrend = useMemo(() => genTrend(120, 5), []);
  const tempTrend = useMemo(() => genTrend(98.3, 0.4), []);
  const weekTrend = useMemo(() => genTrend(78, 5, 30), []);

  const [section, setSection] = useState("overview");
  const [meds, setMeds] = useState(initialMedications);
  const [medsFilter, setMedsFilter] = useState("All");
  const [alertsList, setAlertsList] = useState(initialAlerts);
  const [alertsFilter, setAlertsFilter] = useState("All");
  const [consultData, setConsultData] = useState(initialConsultations);
  const [chat, setChat] = useState([{ role: "ai", text: "Hi Ananya, ask me anything about your health record." }]);
  const [logoutConfirm, setLogoutConfirm] = useState(false);
  const [callWith, setCallWith] = useState(null);

  const unreadAlerts = alertsList.filter((a) => !a.read).length;

  const navItems = [
    { id: "overview", icon: Home, label: "Overview" },
    { id: "medications", icon: Pill, label: "Medications" },
    { id: "consultations", icon: Video, label: "Consultations" },
    { id: "pharmacy", icon: ShoppingBag, label: "Pharmacy" },
    { id: "ai", icon: MessageSquare, label: "AI assistant" },
  ];

  const pageTitles = {
    medications: ["Medications", "Your schedule, adherence and reminders"],
    consultations: ["Consultations", "Book, join and review visits with your care team"],
    pharmacy: ["Pharmacy", "Order medicine and track deliveries"],
    ai: ["AI assistant", "Ask about anything already in your record"],
    settings: ["Settings", "Account, notifications and alert thresholds"],
    alerts: ["Alerts", "Everything flagged by the analytics engine"],
    profile: ["Your profile", "Personal and medical details on file"],
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", background: C.paper, fontFamily: sans, color: C.ink }}>
    <div style={{ display: "flex", minHeight: 680 }}>
      {/* ICON RAIL */}
      <div style={{ width: 68, background: C.panel, borderRight: `1px solid ${C.line}`, display: "flex", flexDirection: "column", alignItems: "center", padding: "20px 0", gap: 6 }}>
        <img src={logoImg} alt="HumaNex Logo" style={{ width: 30, height: 30, borderRadius: 8, objectFit: "cover", marginBottom: 20 }} />
        {navItems.map((n) => (
          <IconBtn key={n.id} icon={n.icon} label={n.label} active={section === n.id} onClick={() => setSection(n.id)} />
        ))}
        <div style={{ flex: 1 }} />
        <IconBtn icon={Settings} label="Settings" active={section === "settings"} onClick={() => setSection("settings")} />
        <IconBtn icon={LogOut} label="Sign out" onClick={() => setLogoutConfirm(true)} />
      </div>

      <div style={{ flex: 1, padding: "26px 34px" }}>
        {section === "overview" ? (
          <>
            {/* TOP BAR */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
              <div>
                <div style={{ fontFamily: serif, fontSize: 24, fontWeight: 600 }}>Good evening, Ananya</div>
                <div style={{ fontSize: 13.5, color: C.inkSoft, marginTop: 2 }}>Thursday, September 10 &middot; your vitals are within range</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                  <Search size={15} color={C.inkSoft} style={{ position: "absolute", left: 12 }} />
                  <input placeholder="Search records" style={{ width: 200, padding: "9px 12px 9px 34px", borderRadius: 8, border: `1px solid ${C.line}`, fontFamily: sans, fontSize: 13.5, outline: "none" }} />
                </div>
                <div style={{ position: "relative", cursor: "pointer" }} onClick={() => setSection("alerts")}>
                  <Bell size={19} color={C.inkSoft} strokeWidth={1.8} />
                  {unreadAlerts > 0 && <div style={{ position: "absolute", top: -3, right: -3, width: 8, height: 8, borderRadius: "50%", background: C.signal }} />}
                </div>
                <div style={{ cursor: "pointer" }} onClick={() => setSection("profile")}>
                  <Avatar initials="AR" />
                </div>
              </div>
            </div>

            {/* VITALS ROW */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 20 }}>
              <VitalCard icon={Heart} label="Heart rate" value={78} unit="bpm" trend={hrTrend} color={C.teal} />
              <VitalCard icon={Droplet} label="Blood oxygen" value={97} unit="% SpO2" trend={spo2Trend} color={C.teal} />
              <VitalCard icon={Activity} label="Blood pressure" value={122} unit="/80 mmHg" trend={bpTrend} color={C.amber} status="high" />
              <VitalCard icon={Thermometer} label="Temperature" value={98.4} unit="\u00b0F" trend={tempTrend} color={C.teal} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 16 }}>
              {/* LEFT COLUMN */}
              <div>
                <div style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 12, padding: "20px 22px", marginBottom: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                    <div style={{ fontSize: 15, fontWeight: 600 }}>Heart rate, last 30 days</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 13, color: C.teal, fontWeight: 600 }}>
                      <TrendingUp size={14} /> Trending steady
                    </div>
                  </div>
                  <div style={{ height: 170 }}>
                    <ResponsiveContainer>
                      <AreaChart data={weekTrend}>
                        <defs>
                          <linearGradient id="hr-fill" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor={C.teal} stopOpacity={0.18} />
                            <stop offset="100%" stopColor={C.teal} stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="day" hide />
                        <YAxis hide domain={["dataMin - 5", "dataMax + 5"]} />
                        <Tooltip contentStyle={{ fontFamily: sans, fontSize: 12.5, border: `1px solid ${C.line}`, borderRadius: 8 }} />
                        <Area type="monotone" dataKey="value" stroke={C.teal} strokeWidth={2} fill="url(#hr-fill)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 12, padding: "20px 22px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
                    <div style={{ fontSize: 15, fontWeight: 600 }}>Today's medication</div>
                    <span onClick={() => setSection("medications")} style={{ fontSize: 13, color: C.teal, fontWeight: 600, cursor: "pointer" }}>View schedule</span>
                  </div>
                  {meds.slice(0, 3).map((m, i) => (
                    <div key={m.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "13px 0", borderTop: i > 0 ? `1px solid ${C.line}` : "none" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <Pill size={16} color={C.inkSoft} strokeWidth={1.8} />
                        <div>
                          <div style={{ fontSize: 14, fontWeight: 600 }}>{m.name} <span style={{ fontWeight: 400, color: C.inkSoft }}>&middot; {m.dose}</span></div>
                          <div style={{ fontSize: 12.5, color: C.inkSoft }}>{m.time}</div>
                        </div>
                      </div>
                      <MedicationStatusBadge status={m.status} />
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT COLUMN */}
              <div>
                <div style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 12, padding: "18px 20px", marginBottom: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                    <div style={{ fontSize: 15, fontWeight: 600 }}>Alerts</div>
                    <span onClick={() => setSection("alerts")} style={{ fontSize: 12.5, color: C.teal, fontWeight: 600, cursor: "pointer" }}>View all</span>
                  </div>
                  {alertsList.slice(0, 2).map((a, i) => (
                    <div key={a.id} style={{
                      borderLeft: `3px solid ${a.level === "critical" ? C.signal : C.teal}`,
                      background: a.level === "critical" ? C.signalPale : C.tealPale,
                      padding: "10px 12px", marginBottom: i < 1 ? 10 : 0, borderRadius: "0 8px 8px 0",
                    }}>
                      <div style={{ display: "flex", gap: 7, marginBottom: 4 }}>
                        {a.level === "critical" ? <AlertTriangle size={14} color={C.signal} /> : <CheckCircle2 size={14} color={C.tealDark} />}
                        <span style={{ fontSize: 12, fontWeight: 600, color: a.level === "critical" ? C.signal : C.tealDark }}>{a.time}</span>
                      </div>
                      <div style={{ fontSize: 13, lineHeight: 1.5, color: C.ink }}>{a.text}</div>
                    </div>
                  ))}
                </div>

                <div style={{ background: C.ink, borderRadius: 12, padding: "18px 20px", color: "#fff" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                    <Sparkles size={15} color="#9FE1CB" />
                    <span style={{ fontSize: 14.5, fontWeight: 600 }}>Ask HumaNex</span>
                  </div>
                  <div style={{ fontSize: 13, lineHeight: 1.6, color: "#C7D6D2", marginBottom: 14 }}>
                    "What medicines are scheduled today?" &middot; "Show my recent alerts" &middot; "Summarize the last 7 days"
                  </div>
                  <button onClick={() => setSection("ai")} style={{ display: "flex", width: "100%", gap: 8, border: "none", background: C.teal, color: "#fff", padding: "10px 14px", borderRadius: 8, fontFamily: sans, fontSize: 13.5, fontWeight: 600, cursor: "pointer", alignItems: "center", justifyContent: "center" }}>
                    <MessageSquare size={14} /> Open assistant
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <BackBar title={pageTitles[section][0]} sub={pageTitles[section][1]} onBack={() => setSection("overview")} />
            {section === "medications" && <MedicationsPage meds={meds} setMeds={setMeds} filter={medsFilter} setFilter={setMedsFilter} />}
            {section === "consultations" && <ConsultationsPage data={consultData} setData={setConsultData} onJoinCall={(name) => setCallWith(name)} />}
            {section === "pharmacy" && <PharmacyPatientPage />}
            {section === "ai" && <AIAssistantPage chat={chat} setChat={setChat} />}
            {section === "settings" && <SettingsPage />}
            {section === "alerts" && <AlertsPage alerts={alertsList} setAlerts={setAlertsList} filter={alertsFilter} setFilter={setAlertsFilter} />}
            {section === "profile" && <ProfilePage />}
          </>
        )}
      </div>
    </div>
    <AppFooterBar />

    {logoutConfirm && (
      <Modal title="Sign out" onClose={() => setLogoutConfirm(false)} width={360}>
        <p style={{ fontSize: 13.5, color: C.inkSoft, lineHeight: 1.6, marginBottom: 20 }}>
          Are you sure you want to sign out of HumaNex? You'll need to sign in again to see your dashboard.
        </p>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={() => setLogoutConfirm(false)} style={{ ...btn.outline, flex: 1 }}>Cancel</button>
          <button onClick={() => { setLogoutConfirm(false); onSignOut(); }} style={{ ...btn.danger, flex: 1 }}>Sign out</button>
        </div>
      </Modal>
    )}

    {callWith && <CallOverlay name={callWith} sub="Video consultation" onClose={() => setCallWith(null)} />}
    </div>
  );
}

