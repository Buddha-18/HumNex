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
  C, serif, sans, useFonts, btn, withIcon, inputStyle, Field, TextField, TextAreaField, SelectField, BackBar, Modal, Tabs, genTrend, patients, statusColor, statusBg, statusLabel, initialMedications, initialAlerts, initialConsultations, aiSuggestions, aiRespond, doctorsRoster, departments, initialAppointments, genBeds, beds, bedStatusColor, equipment, equipStatusColor, equipStatusBg, initialInventory, invStatusColor, invStatusBg, invStatusLabel, invStatusOf, orders, orderStatusColor, orderStatusBg, orderStatusLabel, deliverySteps, orderStepIndex, ecgPath, Waveform, Sparkline, Badge, Avatar, IconBtn, CallOverlay
} from '../components/Shared';




export function Landing({ onSignIn, onGetStarted }) {
  return (
    <div style={{ background: C.paper, fontFamily: sans, color: C.ink }}>
      {/* HERO */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, padding: "76px 56px 60px", alignItems: "center" }}>
        <div>
          <h1 style={{ fontFamily: serif, fontSize: 52, lineHeight: 1.12, fontWeight: 600, margin: "0 0 22px", maxWidth: 540 }}>
            Where human care and machine intelligence read the same chart.
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.6, color: C.inkSoft, maxWidth: 460, margin: "0 0 32px" }}>
            HumaNex brings vitals, records, medication schedules and clinician review into one dashboard, so nothing about a patient's health lives in a different app than the rest.
          </p>
          <div style={{ display: "flex", gap: 14 }}>
            <button onClick={() => onGetStarted("patient")} style={{ border: "none", background: C.teal, color: "#fff", fontFamily: sans, fontSize: 15, fontWeight: 600, cursor: "pointer", padding: "13px 22px", borderRadius: 8 }}>Get started as a patient</button>
            <button onClick={() => onGetStarted("doctor")} style={{ border: `1px solid ${C.ink}`, background: "transparent", color: C.ink, fontFamily: sans, fontSize: 15, fontWeight: 600, cursor: "pointer", padding: "13px 22px", borderRadius: 8 }}>I'm a clinician</button>
          </div>
        </div>

        <div style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 14, padding: "26px 24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
            <div>
              <div style={{ fontSize: 12.5, color: C.inkSoft, marginBottom: 2 }}>Heart rate</div>
              <div style={{ fontFamily: serif, fontSize: 30, fontWeight: 600 }}>78 <span style={{ fontSize: 14, fontWeight: 400, color: C.inkSoft, fontFamily: sans }}>bpm</span></div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 12.5, color: C.inkSoft, marginBottom: 2 }}>SpO2</div>
              <div style={{ fontFamily: serif, fontSize: 30, fontWeight: 600 }}>98<span style={{ fontSize: 14, fontWeight: 400, color: C.inkSoft, fontFamily: sans }}>%</span></div>
            </div>
          </div>
          <Waveform width={520} height={120} />
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: 12.5, color: C.inkSoft }}>
            <span>Live feed from connected sensors</span>
            <span style={{ color: C.teal, fontWeight: 600 }}>Within normal range</span>
          </div>
        </div>
      </div>

      {/* STAT STRIP */}
      <div style={{ display: "flex", borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}` }}>
        {[
          ["4", "vitals monitored continuously"],
          ["24/7", "anomaly detection on incoming readings"],
          ["HL7 / FHIR", "ready data model for interoperability"],
          ["1", "unified record, patient and clinician alike"],
        ].map(([n, l], i) => (
          <div key={i} style={{ flex: 1, padding: "26px 30px", borderRight: i < 3 ? `1px solid ${C.line}` : "none" }}>
            <div style={{ fontFamily: serif, fontSize: 26, fontWeight: 600, marginBottom: 4 }}>{n}</div>
            <div style={{ fontSize: 13.5, color: C.inkSoft, maxWidth: 180 }}>{l}</div>
          </div>
        ))}
      </div>

      {/* WORKFLOW */}
      <div style={{ padding: "72px 56px" }}>
        <h2 style={{ fontFamily: serif, fontSize: 30, fontWeight: 600, margin: "0 0 46px" }}>How a reading becomes a decision</h2>
        <div style={{ display: "flex", alignItems: "flex-start" }}>
          {[
            { n: "01", t: "Patient records a reading", d: "Manually, or streamed automatically from a connected sensor." },
            { n: "02", t: "The analytics engine checks it", d: "Every value is compared against configurable thresholds in real time." },
            { n: "03", t: "An alert reaches the right people", d: "The patient sees it immediately; a clinician sees it on their queue." },
            { n: "04", t: "Care happens sooner", d: "A consultation, a prescription change, or simply reassurance." },
          ].map((s, i, arr) => (
            <React.Fragment key={s.n}>
              <div style={{ flex: 1, paddingRight: 20 }}>
                <div style={{ fontFamily: serif, fontSize: 15, color: C.teal, fontWeight: 600, marginBottom: 10 }}>{s.n}</div>
                <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{s.t}</div>
                <div style={{ fontSize: 14, color: C.inkSoft, lineHeight: 1.55 }}>{s.d}</div>
              </div>
              {i < arr.length - 1 && <div style={{ width: 1, alignSelf: "stretch", background: C.line, margin: "8px 0" }} />}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* MODULES — list with dividers, not card soup */}
      <div style={{ background: C.paperDim, padding: "72px 56px" }}>
        <h2 style={{ fontFamily: serif, fontSize: 30, fontWeight: 600, margin: "0 0 8px" }}>Five modules, one platform</h2>
        <p style={{ fontSize: 15, color: C.inkSoft, margin: "0 0 40px" }}>Built for the people who actually use a hospital system day to day.</p>
        <div>
          {[
            { icon: Users, t: "Patient module", d: "Sign up, manage a health profile, monitor vitals in real time, message a doctor, and order medicine, all from one account." },
            { icon: Stethoscope, t: "Clinician module", d: "Review patient history and live vitals, get AI-assisted risk flags, and issue e-prescriptions without switching tools." },
            { icon: Building2, t: "Hospital management", d: "Coordinate doctors, appointments, ward occupancy and equipment status from a single operational view." },
            { icon: ShoppingBag, t: "Medicine supply", d: "Track inventory, process orders as they come in, and route deliveries to the nearest available supplier." },
            { icon: Sparkles, t: "AI and analytics engine", d: "Early risk prediction, anomaly detection on vitals, and plain-language summaries, never an autonomous diagnosis." },
          ].map((m, i) => (
            <div key={i} style={{ display: "flex", gap: 22, alignItems: "flex-start", padding: "26px 0", borderTop: `1px solid ${C.line}` }}>
              <div style={{ width: 40, height: 40, borderRadius: 9, background: C.tealPale, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <m.icon size={19} color={C.tealDark} strokeWidth={1.8} />
              </div>
              <div style={{ flex: "0 0 260px" }}>
                <div style={{ fontSize: 17, fontWeight: 600 }}>{m.t}</div>
              </div>
              <div style={{ flex: 1, fontSize: 14.5, color: C.inkSoft, lineHeight: 1.6, maxWidth: 620 }}>{m.d}</div>
            </div>
          ))}
        </div>
      </div>

      {/* AI PREVIEW */}
      <div style={{ padding: "72px 56px", display: "grid", gridTemplateColumns: "0.9fr 1.1fr", gap: 50, alignItems: "center" }}>
        <div>
          <h2 style={{ fontFamily: serif, fontSize: 30, fontWeight: 600, margin: "0 0 16px" }}>Ask it plainly. It answers from your own record.</h2>
          <p style={{ fontSize: 15, color: C.inkSoft, lineHeight: 1.65, maxWidth: 420 }}>
            The AI assistant retrieves and summarizes information already in your chart. It does not diagnose or prescribe, it just makes your own data easier to reach.
          </p>
        </div>
        <div style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 14, padding: 22 }}>
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 14 }}>
            <div style={{ background: C.ink, color: "#fff", borderRadius: "12px 12px 2px 12px", padding: "10px 15px", fontSize: 14, maxWidth: 320 }}>
              Summarize my health data for the last seven days
            </div>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <div style={{ width: 26, height: 26, borderRadius: "50%", background: C.tealPale, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Sparkles size={13} color={C.tealDark} />
            </div>
            <div style={{ background: C.paperDim, borderRadius: "12px 12px 12px 2px", padding: "10px 15px", fontSize: 14, lineHeight: 1.6, maxWidth: 380 }}>
              Heart rate averaged 78 bpm and stayed in range all week. SpO2 dipped below 94% once, Tuesday night. Blood pressure trended up, three readings above 130/85, worth mentioning at your next visit.
            </div>
          </div>
        </div>
      </div>

      <MarketingFooter />
    </div>
  );
}

/* ---------------------------------------------------------------
   MARKETING FOOTER — full site footer for the landing page
----------------------------------------------------------------*/
export function MarketingFooter() {
  const columns = [
    { h: "Platform", items: ["Patient dashboard", "Clinician dashboard", "Hospital management", "Medicine supply", "AI and analytics"] },
    { h: "For patients", items: ["Vitals monitoring", "Medication reminders", "Online consultation", "E-pharmacy"] },
    { h: "For clinicians", items: ["Patient records", "Risk prediction", "E-prescription", "Progress tracking"] },
    { h: "Project", items: ["Synopsis", "System architecture", "Technology stack", "Methodology"] },
  ];
  return (
    <div style={{ borderTop: `1px solid ${C.line}`, background: C.paperDim }}>
      <div style={{ padding: "56px 56px 40px", display: "grid", gridTemplateColumns: "1.2fr repeat(4, 1fr)", gap: 32 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 14 }}>
            <img src={logoImg} alt="HumaNex Logo" style={{ width: 28, height: 28, borderRadius: 7, objectFit: "cover" }} />
            <span style={{ fontFamily: serif, fontSize: 18, fontWeight: 600 }}>HumaNex</span>
          </div>
          <p style={{ fontSize: 13.5, color: C.inkSoft, lineHeight: 1.6, maxWidth: 220 }}>
            A human-machine intelligent healthcare assistance system. Built to organize care, not replace it.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 7, marginTop: 16 }}>
            <ShieldCheck size={14} color={C.tealDark} />
            <span style={{ fontSize: 12.5, color: C.inkSoft }}>HL7 / FHIR interoperable data model</span>
          </div>
        </div>
        {columns.map((c) => (
          <div key={c.h}>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 14 }}>{c.h}</div>
            {c.items.map((it) => (
              <div key={it} style={{ fontSize: 13.5, color: C.inkSoft, marginBottom: 11, cursor: "pointer" }}>{it}</div>
            ))}
          </div>
        ))}
      </div>
      <div style={{ borderTop: `1px solid ${C.line}`, padding: "18px 56px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 12.5, color: C.inkSoft }}>&copy; 2026 HumaNex &middot; B.Tech project, Department of Information Technology</span>
        <div style={{ display: "flex", gap: 22, fontSize: 12.5, color: C.inkSoft }}>
          <span>Privacy</span><span>Terms</span><span>Not a substitute for professional medical care</span>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
   APP FOOTER BAR — slim status bar for every in-app dashboard
----------------------------------------------------------------*/


