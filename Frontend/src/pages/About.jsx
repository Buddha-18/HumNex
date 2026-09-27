import logoImg from "../assets/logo.jpg";
import React from 'react';
import { C, sans, serif, AppFooterBar } from '../components/Shared';
import { Activity, ShieldCheck, Heart, Stethoscope, Building2 } from 'lucide-react';

export function AboutPage() {
  return (
    <div style={{ background: C.paper, fontFamily: sans, color: C.ink, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, padding: "72px 56px", maxWidth: 900, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 32 }}>
          <img src={logoImg} alt="HumaNex Logo" style={{ width: 44, height: 44, borderRadius: 12, objectFit: "cover" }} />
          <h1 style={{ fontFamily: serif, fontSize: 42, fontWeight: 600, margin: 0 }}>About HumaNex</h1>
        </div>
        
        <p style={{ fontSize: 18, lineHeight: 1.6, color: C.inkSoft, marginBottom: 40 }}>
          HumaNex is a unified healthcare platform bridging the gap between human care and machine intelligence. 
          By bringing vitals, records, medication schedules, and clinician reviews into a single intuitive dashboard, 
          we ensure that no critical information about a patient's health is ever siloed.
        </p>

        <h2 style={{ fontFamily: serif, fontSize: 28, fontWeight: 600, marginBottom: 20 }}>Our Mission</h2>
        <p style={{ fontSize: 16, lineHeight: 1.6, color: C.inkSoft, marginBottom: 40 }}>
          To organize healthcare so efficiently that doctors have more time to be doctors, and patients feel constantly cared for. 
          We believe technology shouldn't replace the human touch in medicine—it should empower it.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 30, marginBottom: 50 }}>
          <div style={{ background: C.panel, padding: 24, borderRadius: 12, border: `1px solid ${C.line}` }}>
            <Heart size={24} color={C.teal} style={{ marginBottom: 16 }} />
            <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>Patient-Centric</div>
            <p style={{ fontSize: 14, color: C.inkSoft, lineHeight: 1.5 }}>
              Empowering individuals to monitor their health, adhere to medication schedules, and stay connected with their care team effortlessly.
            </p>
          </div>
          <div style={{ background: C.panel, padding: 24, borderRadius: 12, border: `1px solid ${C.line}` }}>
            <Stethoscope size={24} color={C.teal} style={{ marginBottom: 16 }} />
            <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>Clinician-Focused</div>
            <p style={{ fontSize: 14, color: C.inkSoft, lineHeight: 1.5 }}>
              Providing doctors with real-time vitals, AI-assisted risk flags, and full medical histories without switching applications.
            </p>
          </div>
          <div style={{ background: C.panel, padding: 24, borderRadius: 12, border: `1px solid ${C.line}` }}>
            <Building2 size={24} color={C.teal} style={{ marginBottom: 16 }} />
            <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>Hospital Management</div>
            <p style={{ fontSize: 14, color: C.inkSoft, lineHeight: 1.5 }}>
              Streamlining operations from ward occupancy to equipment status and doctor rosters, giving admins a clear operational view.
            </p>
          </div>
          <div style={{ background: C.panel, padding: 24, borderRadius: 12, border: `1px solid ${C.line}` }}>
            <ShieldCheck size={24} color={C.teal} style={{ marginBottom: 16 }} />
            <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>Interoperable & Secure</div>
            <p style={{ fontSize: 14, color: C.inkSoft, lineHeight: 1.5 }}>
              Built with an HL7 / FHIR compliant data model to ensure that your health data is portable, secure, and ready for the future.
            </p>
          </div>
        </div>

        <div style={{ padding: "24px", background: C.paperDim, borderRadius: 12, textAlign: "center" }}>
          <p style={{ fontSize: 14, color: C.inkSoft, margin: 0 }}>
            HumaNex was originally developed as a B.Tech project by the Department of Information Technology.
          </p>
        </div>
      </div>
      <AppFooterBar />
    </div>
  );
}
