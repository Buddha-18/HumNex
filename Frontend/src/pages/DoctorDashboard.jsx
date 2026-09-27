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




export function PrescriptionModal({ patientName, onClose }) {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ medicine: "", dose: "", freq: "Once daily", duration: "", notes: "" });
  return (
    <Modal title={sent ? "Prescription sent" : `E-prescribe \u00b7 ${patientName}`} onClose={onClose} width={440}>
      {sent ? (
        <div style={{ textAlign: "center", padding: "20px 0" }}>
          <div style={{ width: 52, height: 52, borderRadius: "50%", background: C.tealPale, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
            <CheckCircle2 size={24} color={C.tealDark} />
          </div>
          <div style={{ fontSize: 14.5, fontWeight: 600, marginBottom: 6 }}>Sent to {patientName}</div>
          <div style={{ fontSize: 13, color: C.inkSoft, marginBottom: 20 }}>The prescription is now visible in their medication schedule and available to the pharmacy.</div>
          <button onClick={onClose} style={{ ...btn.primary, width: "100%" }}>Done</button>
        </div>
      ) : (
        <>
          <TextField label="Medicine name" placeholder="e.g. Amlodipine" value={form.medicine} onChange={(e) => setForm({ ...form, medicine: e.target.value })} />
          <TextField label="Dosage" placeholder="e.g. 5mg" half value={form.dose} onChange={(e) => setForm({ ...form, dose: e.target.value })} />
          <SelectField label="Frequency" half options={["Once daily", "Twice daily", "Three times daily", "As needed"]} value={form.freq} onChange={(e) => setForm({ ...form, freq: e.target.value })} />
          <TextField label="Duration" placeholder="e.g. 14 days" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} />
          <TextAreaField label="Notes for pharmacy" placeholder="Optional" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
          <button onClick={() => form.medicine && setSent(true)} style={{ ...withIcon(btn.primary), width: "100%", justifyContent: "center", marginTop: 6 }}>
            <FileText size={14} /> Send prescription
          </button>
        </>
      )}
    </Modal>
  );
}

export function FullProfilePage({ patient, onBack }) {
  return (
    <div>
      <BackBar title="Full patient profile" sub={patient.name} onBack={onBack} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <div style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 12, padding: "20px 22px" }}>
          <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 14 }}>Demographics</div>
          {[["Date of birth", patient.dob], ["Gender", patient.gender], ["Blood group", patient.bloodGroup], ["Phone", patient.phone], ["Email", patient.email], ["Address", patient.address]].map(([l, v], i) => (
            <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderTop: i > 0 ? `1px solid ${C.line}` : "none", fontSize: 13 }}>
              <span style={{ color: C.inkSoft }}>{l}</span><span style={{ fontWeight: 600, textAlign: "right", maxWidth: 220 }}>{v}</span>
            </div>
          ))}
        </div>
        <div style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 12, padding: "20px 22px" }}>
          <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 12 }}>Allergies</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 18 }}>
            {patient.allergies.map((a) => <Badge key={a} bg={C.signalPale} fg={C.signal}>{a}</Badge>)}
          </div>
          <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>Emergency contact</div>
          <div style={{ fontSize: 13, color: C.inkSoft }}>{patient.emergency}</div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 12, padding: "20px 22px" }}>
          <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 14 }}>Medical history</div>
          {patient.history.map((h, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderTop: i > 0 ? `1px solid ${C.line}` : "none", fontSize: 13.5 }}>
              <span>{h.c}</span><span style={{ color: C.inkSoft }}>{h.d}</span>
            </div>
          ))}
        </div>
        <div style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 12, padding: "20px 22px" }}>
          <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 14 }}>Past prescriptions</div>
          {patient.prescriptions.map((p, i) => (
            <div key={i} style={{ padding: "9px 0", borderTop: i > 0 ? `1px solid ${C.line}` : "none" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13.5 }}>
                <span style={{ fontWeight: 600 }}>{p.medicine}</span><span style={{ color: C.inkSoft }}>{p.date}</span>
              </div>
              <div style={{ fontSize: 12, color: C.inkSoft }}>{p.doctor}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function DoctorDashboard() {
  const [selected, setSelected] = useState(patients[2]);
  const [view, setView] = useState("summary");
  const [callOpen, setCallOpen] = useState(false);
  const [prescribeOpen, setPrescribeOpen] = useState(false);
  const trend = useMemo(() => genTrend(selected.hr, 6, 20), [selected.id]);

  function pick(p) {
    setSelected(p);
    setView("summary");
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", background: C.paper, fontFamily: sans, color: C.ink }}>
    <div style={{ display: "flex", minHeight: 680 }}>
      {/* PATIENT QUEUE */}
      <div style={{ width: 280, background: C.panel, borderRight: `1px solid ${C.line}`, padding: "22px 0" }}>
        <div style={{ padding: "0 20px", marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 18 }}>
            <img src={logoImg} alt="HumaNex Logo" style={{ width: 28, height: 28, borderRadius: 7, objectFit: "cover" }} />
            <span style={{ fontFamily: serif, fontSize: 17, fontWeight: 600 }}>HumaNex</span>
          </div>
          <div style={{ fontSize: 13, fontWeight: 600, color: C.inkSoft, marginBottom: 4 }}>Patient queue</div>
          <div style={{ fontSize: 12, color: C.inkSoft }}>5 patients &middot; 1 critical</div>
        </div>
        {patients.map((p) => (
          <div key={p.id} onClick={() => pick(p)} style={{
            display: "flex", alignItems: "center", gap: 11, padding: "11px 20px", cursor: "pointer",
            background: selected.id === p.id ? C.paperDim : "transparent",
            borderLeft: `3px solid ${selected.id === p.id ? C.teal : "transparent"}`,
          }}>
            <Avatar initials={p.initials} size={34} bg={statusBg[p.status]} fg={statusColor[p.status]} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13.5, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.name}</div>
              <div style={{ fontSize: 12, color: C.inkSoft }}>{p.condition}</div>
            </div>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: statusColor[p.status], flexShrink: 0 }} />
          </div>
        ))}
      </div>

      {/* PATIENT DETAIL */}
      <div style={{ flex: 1, padding: "26px 34px" }}>
        {view === "full" ? (
          <FullProfilePage patient={selected} onBack={() => setView("summary")} />
        ) : (
        <>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <Avatar initials={selected.initials} size={54} bg={statusBg[selected.status]} fg={statusColor[selected.status]} />
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontFamily: serif, fontSize: 23, fontWeight: 600 }}>{selected.name}</span>
                <Badge bg={statusBg[selected.status]} fg={statusColor[selected.status]}>{statusLabel[selected.status]}</Badge>
              </div>
              <div style={{ fontSize: 13.5, color: C.inkSoft, marginTop: 3 }}>{selected.age} years &middot; {selected.condition}</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => setView("full")} style={withIcon(btn.outline)}>
              <Eye size={14} /> View full profile
            </button>
            <button onClick={() => setCallOpen(true)} style={withIcon(btn.outline)}>
              <Video size={14} /> Start consult
            </button>
            <button onClick={() => setPrescribeOpen(true)} style={withIcon(btn.primary)}>
              <FileText size={14} /> E-prescribe
            </button>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 20 }}>
          {[
            [Heart, "Heart rate", selected.hr, "bpm"],
            [Droplet, "SpO2", selected.spo2, "%"],
            [Activity, "Blood pressure", selected.bp, "mmHg"],
            [Thermometer, "Temperature", selected.temp, "\u00b0F"],
          ].map(([Icon, l, v, u], i) => (
            <div key={i} style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 12, padding: "15px 17px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 8 }}>
                <Icon size={14} color={C.inkSoft} strokeWidth={1.8} />
                <span style={{ fontSize: 12.5, color: C.inkSoft }}>{l}</span>
              </div>
              <div style={{ fontFamily: serif, fontSize: 22, fontWeight: 600 }}>{v}<span style={{ fontSize: 12, fontWeight: 400, color: C.inkSoft, fontFamily: sans, marginLeft: 3 }}>{u}</span></div>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 16 }}>
          <div style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 12, padding: "20px 22px" }}>
            <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 12 }}>Heart rate trend, last 20 readings</div>
            <div style={{ height: 190 }}>
              <ResponsiveContainer>
                <LineChart data={trend}>
                  <XAxis dataKey="day" tick={{ fontSize: 11, fill: C.inkSoft }} axisLine={{ stroke: C.line }} tickLine={false} />
                  <YAxis hide domain={["dataMin - 5", "dataMax + 5"]} />
                  <Tooltip contentStyle={{ fontFamily: sans, fontSize: 12.5, border: `1px solid ${C.line}`, borderRadius: 8 }} />
                  <Line type="monotone" dataKey="value" stroke={statusColor[selected.status]} strokeWidth={2} dot={{ r: 2.5 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div style={{ borderTop: `1px solid ${C.line}`, marginTop: 16, paddingTop: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <Sparkles size={14} color={C.tealDark} />
                <span style={{ fontSize: 13.5, fontWeight: 600 }}>AI summary</span>
              </div>
              <p style={{ fontSize: 13.5, color: C.inkSoft, lineHeight: 1.6, margin: 0 }}>
                {selected.status === "critical"
                  ? "SpO2 crossed the low threshold twice overnight, alongside an elevated heart rate. Recommend a same-day review."
                  : selected.status === "attention"
                  ? "Blood pressure has trended upward over the past week, with three readings above the configured limit."
                  : "All monitored vitals have remained within normal range for the past two weeks."}
              </p>
            </div>
          </div>

          <div>
            <div style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 12, padding: "18px 20px", marginBottom: 16 }}>
              <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 12 }}>Current medication</div>
              {initialMedications.map((m, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderTop: i > 0 ? `1px solid ${C.line}` : "none", fontSize: 13.5 }}>
                  <span>{m.name} &middot; {m.dose}</span>
                  <span style={{ color: C.inkSoft }}>{m.time}</span>
                </div>
              ))}
            </div>
            <div style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 12, padding: "18px 20px" }}>
              <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 12 }}>Recent alerts</div>
              {initialAlerts.slice(0, 2).map((a, i) => (
                <div key={i} style={{ borderLeft: `3px solid ${a.level === "critical" ? C.signal : C.teal}`, padding: "4px 0 4px 10px", marginBottom: i < 1 ? 10 : 0 }}>
                  <div style={{ fontSize: 12.5, fontWeight: 600, color: a.level === "critical" ? C.signal : C.tealDark, marginBottom: 2 }}>{a.time}</div>
                  <div style={{ fontSize: 12.5, color: C.inkSoft, lineHeight: 1.5 }}>{a.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        </>
        )}
      </div>
    </div>
    <AppFooterBar />
    {callOpen && <CallOverlay name={selected.name} sub={selected.condition} onClose={() => setCallOpen(false)} />}
    {prescribeOpen && <PrescriptionModal patientName={selected.name} onClose={() => setPrescribeOpen(false)} />}
    </div>
  );
}

