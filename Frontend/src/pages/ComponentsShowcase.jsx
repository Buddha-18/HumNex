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




export function Swatch({ hex, name }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, width: 118 }}>
      <div style={{ height: 56, borderRadius: 8, background: hex, border: hex === "#FFFFFF" ? `1px solid ${C.line}` : "none" }} />
      <div>
        <div style={{ fontSize: 12.5, fontWeight: 600 }}>{name}</div>
        <div style={{ fontSize: 11, color: C.inkSoft }}>{hex}</div>
      </div>
    </div>
  );
}

export function Section({ title, sub, children }) {
  return (
    <div style={{ padding: "34px 0", borderTop: `1px solid ${C.line}` }}>
      <div style={{ fontSize: 18, fontWeight: 600, marginBottom: sub ? 4 : 18 }}>{title}</div>
      {sub && <div style={{ fontSize: 13.5, color: C.inkSoft, marginBottom: 18, maxWidth: 520 }}>{sub}</div>}
      {children}
    </div>
  );
}

export function ComponentsShowcase() {
  const [toggleOn, setToggleOn] = useState(true);
  const [checked, setChecked] = useState(true);

  return (
    <div style={{ background: C.paper, fontFamily: sans, color: C.ink, padding: "40px 56px 80px", maxWidth: 1040, margin: "0 auto" }}>
      <div style={{ marginBottom: 8 }}>
        <div style={{ fontFamily: serif, fontSize: 30, fontWeight: 600, marginBottom: 8 }}>HumaNex design system</div>
        <p style={{ fontSize: 14.5, color: C.inkSoft, maxWidth: 560, lineHeight: 1.6 }}>
          The building blocks behind every screen: a clinical-instrument palette, one recurring waveform motif, and status colors that mean the same thing everywhere they appear.
        </p>
      </div>

      <Section title="Color" sub="Ink and paper carry structure. Teal is the working brand color. Amber and coral are reserved strictly for status, never decoration.">
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <Swatch hex={C.ink} name="Ink" />
          <Swatch hex={C.teal} name="Teal" />
          <Swatch hex={C.tealPale} name="Teal pale" />
          <Swatch hex={C.paper} name="Paper" />
          <Swatch hex={C.amber} name="Amber (attention)" />
          <Swatch hex={C.signal} name="Signal (critical)" />
        </div>
      </Section>

      <Section title="Typography" sub="Source Serif 4 carries headlines and hero numbers, the human side. Inter carries data, labels and UI, the machine side.">
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ fontFamily: serif, fontSize: 32, fontWeight: 600 }}>Aa &middot; Source Serif 4, 600</div>
          <div style={{ fontFamily: serif, fontSize: 20, fontWeight: 500 }}>Aa &middot; Source Serif 4, 500</div>
          <div style={{ fontFamily: sans, fontSize: 16, fontWeight: 600 }}>Aa &middot; Inter, 600</div>
          <div style={{ fontFamily: sans, fontSize: 14, fontWeight: 400, color: C.inkSoft }}>Aa &middot; Inter, 400 &middot; used for supporting copy and captions</div>
        </div>
      </Section>

      <Section title="Buttons" sub="One accent-filled action per screen. Everything else is outline or ghost, so the primary action always stands out.">
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
          <button style={btn.primary}>Primary action</button>
          <button style={btn.secondary}>Secondary action</button>
          <button style={btn.outline}>Outline</button>
          <button style={btn.ghost}>Ghost action</button>
          <button style={btn.danger}>Cancel appointment</button>
          <button disabled style={{ border: "none", background: C.mist, color: "#9DAFAA", padding: "11px 20px", borderRadius: 8, fontFamily: sans, fontSize: 14, fontWeight: 600, cursor: "not-allowed" }}>Disabled</button>
        </div>
        <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
          <IconBtn icon={Home} active label="Active nav item" onClick={() => {}} />
          <IconBtn icon={Pill} label="Resting nav item" onClick={() => {}} />
        </div>
      </Section>

      <Section title="Form fields" sub="Search, select and confirmation controls used across the patient, clinician, hospital and pharmacy views.">
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
          <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
            <Search size={15} color={C.inkSoft} style={{ position: "absolute", left: 12 }} />
            <input placeholder="Search records" style={{ width: 210, padding: "10px 12px 10px 34px", borderRadius: 8, border: `1px solid ${C.line}`, fontFamily: sans, fontSize: 13.5, outline: "none" }} />
          </div>
          <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
            <select style={{ width: 190, padding: "10px 30px 10px 12px", borderRadius: 8, border: `1px solid ${C.line}`, fontFamily: sans, fontSize: 13.5, color: C.ink, appearance: "none", background: C.panel }}>
              <option>Department: All</option>
              <option>Cardiology</option>
              <option>Pediatrics</option>
            </select>
            <ChevronDown size={14} color={C.inkSoft} style={{ position: "absolute", right: 10, pointerEvents: "none" }} />
          </div>
          <div onClick={() => setToggleOn(!toggleOn)} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
            {toggleOn ? <ToggleRight size={30} color={C.teal} /> : <ToggleLeft size={30} color={C.inkSoft} />}
            <span style={{ fontSize: 13.5 }}>Critical alerts</span>
          </div>
          <div onClick={() => setChecked(!checked)} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
            <div style={{ width: 18, height: 18, borderRadius: 5, border: `1.5px solid ${checked ? C.teal : C.line}`, background: checked ? C.teal : "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {checked && <Check size={12} color="#fff" strokeWidth={3} />}
            </div>
            <span style={{ fontSize: 13.5 }}>Medication taken</span>
          </div>
        </div>
      </Section>

      <Section title="Status badges" sub="The same three-tier vocabulary, stable, attention, critical, repeats across patients, equipment, orders and inventory.">
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Badge bg={statusBg.stable} fg={statusColor.stable}>Stable</Badge>
          <Badge bg={statusBg.attention} fg={statusColor.attention}>Needs attention</Badge>
          <Badge bg={statusBg.critical} fg={statusColor.critical}>Critical</Badge>
          <Badge bg={C.tealPale} fg={C.tealDark}>Taken</Badge>
          <Badge bg={C.paperDim} fg={C.inkSoft}>Upcoming</Badge>
          <Badge bg={C.signalPale} fg={C.signal}>Missed</Badge>
          <Badge bg={invStatusBg["in-stock"]} fg={invStatusColor["in-stock"]}>In stock</Badge>
          <Badge bg={invStatusBg.low} fg={invStatusColor.low}>Running low</Badge>
          <Badge bg={invStatusBg.out} fg={invStatusColor.out}>Out of stock</Badge>
        </div>
      </Section>

      <Section title="Alerts" sub="A coral left border marks anything that needs action. Teal marks reassurance. No other color is used for alerting, anywhere in the product.">
        <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 480 }}>
          <div style={{ borderLeft: `3px solid ${C.signal}`, background: C.signalPale, padding: "10px 12px", borderRadius: "0 8px 8px 0" }}>
            <div style={{ display: "flex", gap: 7, marginBottom: 4, alignItems: "center" }}>
              <AlertTriangle size={14} color={C.signal} />
              <span style={{ fontSize: 12, fontWeight: 600, color: C.signal }}>Critical</span>
            </div>
            <div style={{ fontSize: 13 }}>SpO2 below the configured threshold. Review as soon as possible.</div>
          </div>
          <div style={{ borderLeft: `3px solid ${C.teal}`, background: C.tealPale, padding: "10px 12px", borderRadius: "0 8px 8px 0" }}>
            <div style={{ display: "flex", gap: 7, marginBottom: 4, alignItems: "center" }}>
              <CheckCircle2 size={14} color={C.tealDark} />
              <span style={{ fontSize: 12, fontWeight: 600, color: C.tealDark }}>Stable</span>
            </div>
            <div style={{ fontSize: 13 }}>All readings in range for six consecutive days.</div>
          </div>
        </div>
      </Section>

      <Section title="Avatars" sub="Initials on a status-tinted background, so identity and status read together at a glance.">
        <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
          <Avatar initials="AR" size={44} bg={statusBg.stable} fg={statusColor.stable} />
          <Avatar initials="DS" size={44} bg={statusBg.attention} fg={statusColor.attention} />
          <Avatar initials="PC" size={44} bg={statusBg.critical} fg={statusColor.critical} />
          <Avatar initials="RG" size={32} />
          <Avatar initials="MD" size={24} />
        </div>
      </Section>

      <Section title="Navigation and back bar" sub="Every sub-page opens beneath the same back bar, so wherever a person is in the product, getting back one level works the same way.">
        <BackBar title="Medications" sub="Your schedule, adherence and reminders" onBack={() => {}} />
      </Section>

      <Section title="App footer bar" sub="A slim, quiet status strip on every in-app screen. Sync status and compliance on the left, support links on the right, never competing for attention with the page above it.">
        <div style={{ border: `1px solid ${C.line}`, borderRadius: 10, overflow: "hidden" }}>
          <AppFooterBar />
        </div>
      </Section>
    </div>
  );
}

