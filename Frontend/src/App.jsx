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
} from './components/Shared';
import { Landing } from "./pages/Landing";
import { AuthPage } from "./pages/Auth";
import { PatientDashboard } from "./pages/PatientDashboard";
import { DoctorDashboard } from "./pages/DoctorDashboard";
import { HospitalDashboard } from "./pages/HospitalDashboard";
import { PharmacyDashboard } from "./pages/PharmacyDashboard";
import { ComponentsShowcase } from "./pages/ComponentsShowcase";
import { AboutPage } from "./pages/About";
import Header from "./components/Header";




export default function HumaNexPrototype() {
  useFonts();
  const [view, setView] = useState("landing");
  const [authRole, setAuthRole] = useState("patient");
  const [authMode, setAuthMode] = useState("signin");

  function goApp(v) { setView(v); }
  function openAuth(role, mode) { setAuthRole(role); setAuthMode(mode); setView("auth"); }
  function enterApp(role) { setView(role === "hospital" ? "hospital" : role); }

  return (
    <div style={{ background: C.paper, minHeight: "100vh" }}>
      <Header view={view} setView={setView} openAuth={openAuth} />
      {view === "landing" && <Landing onSignIn={(r) => openAuth(r, "signin")} onGetStarted={(r) => openAuth(r, "register")} />}
      {view === "about" && <AboutPage />}
      {view === "auth" && (
        <AuthPage
          role={authRole} setRole={setAuthRole}
          mode={authMode} setMode={setAuthMode}
          onEnter={enterApp}
          onBackHome={() => setView("landing")}
        />
      )}
      {view === "patient" && <PatientDashboard onSignOut={() => setView("landing")} />}
      {view === "doctor" && <DoctorDashboard />}
      {view === "hospital" && <HospitalDashboard />}
      {view === "pharmacy" && <PharmacyDashboard />}
      {view === "components" && <ComponentsShowcase />}
    </div>
  );
}
