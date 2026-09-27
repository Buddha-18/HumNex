import React from "react";
import { sans, serif, C } from "./Shared";
import logoImg from "../assets/logo.jpg"; // assuming we saved the logo here

export default function Header({ view, setView, openAuth }) {
  const tabs = [
    { id: "landing", label: "Home" },
    { id: "patient", label: "Patient dashboard" },
    { id: "doctor", label: "Clinician dashboard" },
    { id: "hospital", label: "Hospital management" },
    { id: "pharmacy", label: "Medicine supply" },
    { id: "about", label: "About" }
  ];

  return (
    <div style={{ position: "sticky", top: 0, zIndex: 50, background: C.ink, padding: "10px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", fontFamily: sans, borderBottom: `1px solid ${C.line}` }}>
      
      {/* LEFT MOST: Logo and Name */}
      <div 
        style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}
        onClick={() => setView("landing")}
      >
        <img src={logoImg} alt="HumaNex Logo" style={{ width: 34, height: 34, borderRadius: 8, objectFit: "cover" }} />
        <span style={{ fontFamily: serif, fontSize: 20, fontWeight: 600, color: "#fff" }}>HumaNex</span>
      </div>

      {/* CENTER: Navigation Links */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "center" }}>
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setView(t.id)}
            style={{
              border: "none", cursor: "pointer", fontFamily: sans, fontSize: 13, fontWeight: 600,
              padding: "7px 14px", borderRadius: 20,
              background: view === t.id ? "#fff" : "transparent",
              color: view === t.id ? C.ink : "#C7D6D2",
              transition: "background 0.2s"
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* RIGHT MOST: Auth Buttons */}
      <div style={{ display: "flex", gap: 10 }}>
        <button 
          onClick={() => openAuth("patient", "signin")} 
          style={{ border: "none", background: "transparent", color: "#fff", fontFamily: sans, fontSize: 13, fontWeight: 600, cursor: "pointer", padding: "7px 14px", borderRadius: 20 }}
        >
          Sign in / Register
        </button>
        <button 
          onClick={() => openAuth("patient", "register")} 
          style={{ border: "none", background: C.teal, color: "#fff", fontFamily: sans, fontSize: 13, fontWeight: 600, cursor: "pointer", padding: "7px 18px", borderRadius: 20 }}
        >
          Get Started
        </button>
      </div>

    </div>
  );
}
