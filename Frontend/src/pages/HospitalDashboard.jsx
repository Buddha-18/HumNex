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




export function ScheduleAppointmentPage({ onBack, onSave, roster }) {
  const [form, setForm] = useState({ patient: patients[0].name, doctor: roster[0].name, date: "", time: "", type: "Follow-up", notes: "" });
  return (
    <div>
      <BackBar title="Schedule appointment" sub="Book a new patient appointment" onBack={onBack} />
      <div style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 12, padding: "24px 26px", maxWidth: 560 }}>
        <SelectField label="Patient" options={patients.map((p) => p.name)} value={form.patient} onChange={(e) => setForm({ ...form, patient: e.target.value })} />
        <SelectField label="Doctor" options={roster.map((d) => d.name)} value={form.doctor} onChange={(e) => setForm({ ...form, doctor: e.target.value })} />
        <TextField label="Date" type="date" half value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
        <TextField label="Time" type="time" half value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} />
        <SelectField label="Appointment type" options={["Follow-up", "Routine checkup", "Urgent review", "Consultation"]} value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} />
        <TextAreaField label="Notes" placeholder="Optional" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
        <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
          <button onClick={onBack} style={btn.outline}>Cancel</button>
          <button onClick={() => {
            const doc = roster.find((d) => d.name === form.doctor);
            onSave({ id: Date.now(), time: form.time || "TBD", patient: form.patient, doctor: form.doctor, dept: doc ? doc.dept : "", type: form.type });
          }} style={btn.primary}>Schedule appointment</button>
        </div>
      </div>
    </div>
  );
}

export function AddDoctorPage({ onBack, onSave }) {
  const [form, setForm] = useState({ name: "", dept: departments[0], specialization: "", contact: "" });
  return (
    <div>
      <BackBar title="Add doctor" sub="Add a new clinician to the roster" onBack={onBack} />
      <div style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 12, padding: "24px 26px", maxWidth: 560 }}>
        <TextField label="Full name" placeholder="e.g. Dr. N. Roy" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <SelectField label="Department" half options={departments} value={form.dept} onChange={(e) => setForm({ ...form, dept: e.target.value })} />
        <TextField label="Specialization" half placeholder="e.g. Interventional cardiology" value={form.specialization} onChange={(e) => setForm({ ...form, specialization: e.target.value })} />
        <TextField label="Contact number" placeholder="+91 ..." value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} />
        <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
          <button onClick={onBack} style={btn.outline}>Cancel</button>
          <button onClick={() => {
            if (!form.name) return;
            const initials = form.name.replace("Dr.", "").trim().split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
            onSave({ name: form.name, initials, dept: form.dept, patients: 0, status: "On duty" });
          }} style={btn.primary}>Add doctor</button>
        </div>
      </div>
    </div>
  );
}

export function AppointmentDetailModal({ appt, onClose }) {
  const p = patients.find((x) => x.name === appt.patient);
  return (
    <Modal title="Appointment details" onClose={onClose} width={440}>
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
        <Avatar initials={p ? p.initials : appt.patient.split(" ").map((w) => w[0]).join("")} size={48} bg={p ? statusBg[p.status] : C.tealPale} fg={p ? statusColor[p.status] : C.tealDark} />
        <div>
          <div style={{ fontSize: 16, fontWeight: 600 }}>{appt.patient}</div>
          {p && <div style={{ fontSize: 12.5, color: C.inkSoft }}>{p.age} years &middot; {p.condition}</div>}
        </div>
      </div>
      <div style={{ background: C.paperDim, borderRadius: 10, padding: "14px 16px", marginBottom: 16 }}>
        {[["Time", appt.time], ["Doctor", appt.doctor], ["Department", appt.dept], ["Type", appt.type]].map(([l, v]) => (
          <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", fontSize: 13 }}>
            <span style={{ color: C.inkSoft }}>{l}</span><span style={{ fontWeight: 600 }}>{v}</span>
          </div>
        ))}
      </div>
      {p && (
        <>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Latest vitals</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, marginBottom: 6 }}>
            {[["HR", p.hr, "bpm"], ["SpO2", p.spo2, "%"], ["BP", p.bp, ""], ["Temp", p.temp, "\u00b0F"]].map(([l, v, u]) => (
              <div key={l} style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 8, padding: "8px 10px", textAlign: "center" }}>
                <div style={{ fontSize: 10.5, color: C.inkSoft, marginBottom: 3 }}>{l}</div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{v}{u}</div>
              </div>
            ))}
          </div>
        </>
      )}
    </Modal>
  );
}

export function FilterModal({ onClose, onApply, current }) {
  const [depts, setDepts] = useState(current.depts);
  function toggle(d) {
    setDepts(depts.includes(d) ? depts.filter((x) => x !== d) : [...depts, d]);
  }
  return (
    <Modal title="Filter appointments" onClose={onClose} width={380}>
      <div style={{ fontSize: 12.5, fontWeight: 600, color: C.inkSoft, marginBottom: 10 }}>Department</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 22 }}>
        {departments.map((d) => (
          <label key={d} style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 13.5, cursor: "pointer" }}>
            <div onClick={() => toggle(d)} style={{ width: 18, height: 18, borderRadius: 5, border: `1.5px solid ${depts.includes(d) ? C.teal : C.line}`, background: depts.includes(d) ? C.teal : "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {depts.includes(d) && <Check size={12} color="#fff" strokeWidth={3} />}
            </div>
            {d}
          </label>
        ))}
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <button onClick={() => { setDepts(departments); }} style={{ ...btn.outline, flex: 1 }}>Reset</button>
        <button onClick={() => onApply({ depts })} style={{ ...btn.primary, flex: 1 }}>Apply filter</button>
      </div>
    </Modal>
  );
}

export function HospitalDashboard() {
  const admissions = useMemo(() => genTrend(38, 6, 12), []);
  const occupied = beds.filter((b) => b.status !== "empty").length;

  const [page, setPage] = useState("overview");
  const [roster, setRoster] = useState(doctorsRoster);
  const [apptList, setApptList] = useState(initialAppointments);
  const [apptModal, setApptModal] = useState(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({ depts: departments });

  const visibleAppts = apptList.filter((a) => filters.depts.includes(a.dept));

  if (page === "schedule") {
    return (
      <div style={{ padding: "26px 34px", background: C.paper, fontFamily: sans, color: C.ink, minHeight: 680 }}>
        <ScheduleAppointmentPage roster={roster} onBack={() => setPage("overview")} onSave={(a) => { setApptList([...apptList, a]); setPage("overview"); }} />
      </div>
    );
  }
  if (page === "add-doctor") {
    return (
      <div style={{ padding: "26px 34px", background: C.paper, fontFamily: sans, color: C.ink, minHeight: 680 }}>
        <AddDoctorPage onBack={() => setPage("overview")} onSave={(d) => { setRoster([...roster, d]); setPage("overview"); }} />
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", background: C.paper, fontFamily: sans, color: C.ink }}>
      <div style={{ padding: "26px 34px", flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
          <div>
            <div style={{ fontFamily: serif, fontSize: 24, fontWeight: 600 }}>Hospital operations</div>
            <div style={{ fontSize: 13.5, color: C.inkSoft, marginTop: 2 }}>Doctors, admissions, wards and equipment in one view</div>
          </div>
          <button onClick={() => setPage("schedule")} style={withIcon(btn.primary)}>
            <PlusCircle size={14} /> Schedule appointment
          </button>
        </div>

        {/* SUMMARY STATS */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 20 }}>
          {[
            [Users, "On-duty doctors", roster.filter((d) => d.status === "On duty").length, "of " + roster.length],
            [Calendar, "Appointments today", apptList.length, "scheduled"],
            [Boxes, "Beds occupied", occupied, "of " + beds.length],
            [AlertCircle, "Equipment needing attention", equipment.filter((e) => e.status !== "operational").length, "flagged"],
          ].map(([Icon, l, v, sub], i) => (
            <div key={i} style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 12, padding: "16px 18px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 10 }}>
                <Icon size={14} color={C.inkSoft} strokeWidth={1.8} />
                <span style={{ fontSize: 12.5, color: C.inkSoft }}>{l}</span>
              </div>
              <div style={{ fontFamily: serif, fontSize: 24, fontWeight: 600 }}>{v}<span style={{ fontSize: 12, fontWeight: 400, color: C.inkSoft, fontFamily: sans, marginLeft: 5 }}>{sub}</span></div>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
          {/* APPOINTMENTS */}
          <div style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 12, padding: "20px 22px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
              <div style={{ fontSize: 15, fontWeight: 600 }}>Today's appointments</div>
              <div onClick={() => setFilterOpen(true)} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12.5, color: filters.depts.length < departments.length ? C.teal : C.inkSoft, cursor: "pointer", fontWeight: filters.depts.length < departments.length ? 600 : 400 }}>
                <Filter size={12} /> Filter{filters.depts.length < departments.length ? ` (${filters.depts.length})` : ""}
              </div>
            </div>
            {visibleAppts.length === 0 && <div style={{ padding: "16px 0", fontSize: 13, color: C.inkSoft }}>No appointments match this filter.</div>}
            {visibleAppts.map((a, i) => (
              <div key={a.id} style={{ display: "flex", alignItems: "center", gap: 14, padding: "11px 0", borderTop: i > 0 ? `1px solid ${C.line}` : "none" }}>
                <div style={{ width: 62, fontSize: 12.5, color: C.inkSoft, flexShrink: 0 }}>{a.time}</div>
                <div onClick={() => setApptModal(a)} style={{ flex: 1, cursor: "pointer" }}>
                  <div style={{ fontSize: 13.5, fontWeight: 600, color: C.tealDark }}>{a.patient}</div>
                  <div style={{ fontSize: 12, color: C.inkSoft }}>{a.doctor} &middot; {a.type}</div>
                </div>
                <ChevronRight size={14} color={C.inkSoft} />
              </div>
            ))}
          </div>

          {/* DOCTOR ROSTER */}
          <div style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 12, padding: "20px 22px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
              <div style={{ fontSize: 15, fontWeight: 600 }}>Doctor roster</div>
              <div onClick={() => setPage("add-doctor")} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12.5, color: C.teal, fontWeight: 600, cursor: "pointer" }}><UserPlus size={13} /> Add doctor</div>
            </div>
            {roster.map((d, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 0", borderTop: i > 0 ? `1px solid ${C.line}` : "none" }}>
                <Avatar initials={d.initials} size={30} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 600 }}>{d.name}</div>
                  <div style={{ fontSize: 12, color: C.inkSoft }}>{d.dept} &middot; {d.patients} patients</div>
                </div>
                <Badge bg={d.status === "On duty" ? C.tealPale : C.paperDim} fg={d.status === "On duty" ? C.tealDark : C.inkSoft}>{d.status}</Badge>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 16, marginBottom: 16 }}>
          {/* WARD / ICU BED MAP */}
          <div style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 12, padding: "20px 22px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
              <div style={{ fontSize: 15, fontWeight: 600 }}>Ward and ICU occupancy</div>
              <div style={{ display: "flex", gap: 14, fontSize: 12, color: C.inkSoft }}>
                <span style={{ display: "flex", alignItems: "center", gap: 5 }}><span style={{ width: 8, height: 8, borderRadius: 2, background: bedStatusColor.occupied, display: "inline-block" }} /> Occupied</span>
                <span style={{ display: "flex", alignItems: "center", gap: 5 }}><span style={{ width: 8, height: 8, borderRadius: 2, background: bedStatusColor.critical, display: "inline-block" }} /> Critical</span>
                <span style={{ display: "flex", alignItems: "center", gap: 5 }}><span style={{ width: 8, height: 8, borderRadius: 2, background: bedStatusColor.empty, display: "inline-block" }} /> Empty</span>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(8, 1fr)", gap: 7 }}>
              {beds.map((b) => (
                <div key={b.id} title={`${b.id} \u2014 ${b.status}`} style={{ aspectRatio: "1", borderRadius: 5, background: bedStatusColor[b.status], display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9.5, color: b.status === "empty" ? C.inkSoft : "#fff", fontWeight: 600 }}>
                  {b.id.split("-")[1]}
                </div>
              ))}
            </div>
          </div>

          {/* EQUIPMENT */}
          <div style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 12, padding: "20px 22px" }}>
            <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 14 }}>Equipment status</div>
            {equipment.map((e, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderTop: i > 0 ? `1px solid ${C.line}` : "none" }}>
                <Wrench size={14} color={equipStatusColor[e.status]} strokeWidth={1.8} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{e.name}</div>
                  <div style={{ fontSize: 11.5, color: C.inkSoft }}>{e.location} &middot; checked {e.checked}</div>
                </div>
                <Badge bg={equipStatusBg[e.status]} fg={equipStatusColor[e.status]}>{e.status}</Badge>
              </div>
            ))}
          </div>
        </div>

        {/* REPORTS */}
        <div style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 12, padding: "20px 22px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
            <div style={{ fontSize: 15, fontWeight: 600 }}>Admissions, last 12 weeks</div>
            <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12.5, color: C.inkSoft }}><BarChart3 size={13} /> Generate report</div>
          </div>
          <div style={{ height: 150 }}>
            <ResponsiveContainer>
              <AreaChart data={admissions}>
                <defs>
                  <linearGradient id="adm-fill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={C.teal} stopOpacity={0.18} />
                    <stop offset="100%" stopColor={C.teal} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: C.inkSoft }} axisLine={{ stroke: C.line }} tickLine={false} />
                <YAxis hide domain={["dataMin - 5", "dataMax + 5"]} />
                <Tooltip contentStyle={{ fontFamily: sans, fontSize: 12.5, border: `1px solid ${C.line}`, borderRadius: 8 }} />
                <Area type="monotone" dataKey="value" stroke={C.teal} strokeWidth={2} fill="url(#adm-fill)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <AppFooterBar />
      {apptModal && <AppointmentDetailModal appt={apptModal} onClose={() => setApptModal(null)} />}
      {filterOpen && <FilterModal current={filters} onClose={() => setFilterOpen(false)} onApply={(f) => { setFilters(f); setFilterOpen(false); }} />}
    </div>
  );
}

