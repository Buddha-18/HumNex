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




export function AddStockPage({ onBack, onSave }) {
  const [form, setForm] = useState({ name: "", quantity: "", supplier: "", expiry: "" });
  return (
    <div>
      <BackBar title="Add stock" sub="Add new inventory or top up an existing medicine" onBack={onBack} />
      <div style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 12, padding: "24px 26px", maxWidth: 560 }}>
        <TextField label="Medicine name" placeholder="e.g. Paracetamol 500mg" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <TextField label="Quantity" type="number" half placeholder="e.g. 500" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} />
        <TextField label="Expiry date" type="date" half value={form.expiry} onChange={(e) => setForm({ ...form, expiry: e.target.value })} />
        <TextField label="Supplier" placeholder="e.g. Salt Lake C1 distributor" value={form.supplier} onChange={(e) => setForm({ ...form, supplier: e.target.value })} />
        <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
          <button onClick={onBack} style={btn.outline}>Cancel</button>
          <button onClick={() => {
            const qty = parseInt(form.quantity, 10);
            if (!form.name || !qty) return;
            onSave({ name: form.name, quantity: qty });
          }} style={btn.primary}>Add to inventory</button>
        </div>
      </div>
    </div>
  );
}

export function PharmacyDashboard() {
  const [page, setPage] = useState("overview");
  const [stock, setStock] = useState(initialInventory);
  const [selectedOrder, setSelectedOrder] = useState(orders[1]);
  const [search, setSearch] = useState("");
  const [invFilter, setInvFilter] = useState("all");

  function addStock({ name, quantity }) {
    const existing = stock.find((s) => s.name.toLowerCase() === name.toLowerCase());
    let next;
    if (existing) {
      next = stock.map((s) => s.name.toLowerCase() === name.toLowerCase() ? { ...s, stock: s.stock + quantity, status: invStatusOf(s.stock + quantity, s.threshold) } : s);
    } else {
      next = [...stock, { name, stock: quantity, threshold: 200, status: invStatusOf(quantity, 200) }];
    }
    setStock(next);
    setPage("overview");
  }

  const filteredStock = stock.filter((it) => {
    const matchesSearch = it.name.toLowerCase().includes(search.toLowerCase());
    const st = invStatusOf(it.stock, it.threshold);
    const matchesFilter = invFilter === "all" || st === invFilter;
    return matchesSearch && matchesFilter;
  });

  if (page === "add-stock") {
    return (
      <div style={{ padding: "26px 34px", background: C.paper, fontFamily: sans, color: C.ink, minHeight: 680 }}>
        <AddStockPage onBack={() => setPage("overview")} onSave={addStock} />
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", background: C.paper, fontFamily: sans, color: C.ink }}>
      <div style={{ padding: "26px 34px", flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
          <div>
            <div style={{ fontFamily: serif, fontSize: 24, fontWeight: 600 }}>Medicine supply</div>
            <div style={{ fontSize: 13.5, color: C.inkSoft, marginTop: 2 }}>Inventory, orders and delivery tracking for the e-pharmacy</div>
          </div>
          <button onClick={() => setPage("add-stock")} style={withIcon(btn.primary)}>
            <Package size={14} /> Add stock
          </button>
        </div>

        {/* SUMMARY STATS */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 20 }}>
          {[
            [Boxes, "Items tracked", stock.length, "SKUs"],
            [AlertCircle, "Low or out of stock", stock.filter((i) => invStatusOf(i.stock, i.threshold) !== "in-stock").length, "need reorder"],
            [ClipboardList, "Open orders", orders.filter((o) => o.status !== "delivered").length, "in progress"],
            [Truck, "Out for delivery", orders.filter((o) => o.status === "out-for-delivery").length, "today"],
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

        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 16 }}>
          {/* INVENTORY */}
          <div style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 12, padding: "20px 22px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, gap: 12 }}>
              <div style={{ fontSize: 15, fontWeight: 600 }}>Inventory</div>
              <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: C.inkSoft, flexShrink: 0 }}><MapPin size={12} /> Nearest supplier: Salt Lake C1</div>
            </div>
            <div style={{ position: "relative", marginBottom: 12 }}>
              <Search size={14} color={C.inkSoft} style={{ position: "absolute", left: 11, top: 10 }} />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search medicine by name" style={{ ...inputStyle, paddingLeft: 32 }} />
            </div>
            <div style={{ display: "flex", gap: 6, marginBottom: 14, flexWrap: "wrap" }}>
              {[["all", "All"], ["in-stock", "In stock"], ["low", "Running low"], ["out", "Out of stock"]].map(([k, l]) => (
                <button key={k} onClick={() => setInvFilter(k)} style={{
                  border: "none", cursor: "pointer", fontFamily: sans, fontSize: 12, fontWeight: 600, padding: "6px 12px", borderRadius: 20,
                  background: invFilter === k ? C.teal : C.paperDim, color: invFilter === k ? "#fff" : C.inkSoft,
                }}>{l}</button>
              ))}
            </div>
            {filteredStock.length === 0 && <div style={{ padding: "16px 0", fontSize: 13, color: C.inkSoft }}>No medicines match your search.</div>}
            {filteredStock.map((it, i) => {
              const st = invStatusOf(it.stock, it.threshold);
              const pct = Math.min(100, Math.round((it.stock / (it.threshold * 2)) * 100));
              return (
                <div key={it.name} style={{ padding: "12px 0", borderTop: i > 0 ? `1px solid ${C.line}` : "none" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ fontSize: 13.5, fontWeight: 600 }}>{it.name}</span>
                    <Badge bg={invStatusBg[st]} fg={invStatusColor[st]}>{invStatusLabel[st]}</Badge>
                  </div>
                  <div style={{ height: 6, borderRadius: 4, background: C.paperDim, overflow: "hidden", marginBottom: 4 }}>
                    <div style={{ height: "100%", width: `${pct}%`, background: invStatusColor[st], borderRadius: 4 }} />
                  </div>
                  <div style={{ fontSize: 11.5, color: C.inkSoft }}>{it.stock} units in stock &middot; reorder below {it.threshold}</div>
                </div>
              );
            })}
          </div>

          {/* ORDERS + DELIVERY */}
          <div>
            <div style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 12, padding: "20px 22px", marginBottom: 16 }}>
              <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 14 }}>Patient orders</div>
              {orders.map((o, i) => (
                <div key={o.id} onClick={() => setSelectedOrder(o)} style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0",
                  borderTop: i > 0 ? `1px solid ${C.line}` : "none", cursor: "pointer",
                  background: selectedOrder.id === o.id ? C.paperDim : "transparent",
                }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{o.id} &middot; {o.patient}</div>
                    <div style={{ fontSize: 11.5, color: C.inkSoft }}>{o.items}</div>
                  </div>
                  <Badge bg={orderStatusBg[o.status]} fg={orderStatusColor[o.status]}>{orderStatusLabel[o.status]}</Badge>
                </div>
              ))}
            </div>

            <div style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 12, padding: "20px 22px" }}>
              <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 16 }}>Delivery status &middot; {selectedOrder.id}</div>
              <div style={{ display: "flex", alignItems: "center" }}>
                {deliverySteps.map((s, i) => {
                  const done = i <= orderStepIndex[selectedOrder.status];
                  return (
                    <React.Fragment key={s}>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: i === 0 || i === deliverySteps.length - 1 ? "0 0 auto" : 1 }}>
                        <div style={{ width: 22, height: 22, borderRadius: "50%", background: done ? C.teal : C.paperDim, display: "flex", alignItems: "center", justifyContent: "center" }}>
                          {done ? <Check size={12} color="#fff" /> : <Circle size={7} color={C.inkSoft} fill={C.inkSoft} />}
                        </div>
                        <span style={{ fontSize: 10.5, color: done ? C.ink : C.inkSoft, marginTop: 6, textAlign: "center", width: 64 }}>{s}</span>
                      </div>
                      {i < deliverySteps.length - 1 && <div style={{ flex: 1, height: 2, background: i < orderStepIndex[selectedOrder.status] ? C.teal : C.line, marginBottom: 18 }} />}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <AppFooterBar />
    </div>
  );
}

