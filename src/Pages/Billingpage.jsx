/**
 * BillingPage.jsx
 *
 * Reads cart from CartWishlistContext.
 * On confirm → sends email via EmailJS, clears cart, navigates to /confirmation
 * with order data passed via router location state.
 *
 * Setup:
 *   1. npm install @emailjs/browser
 *   2. Fill in src/emailjs.config.js with your real IDs
 *   3. Add route: <Route path="/billing" element={<BillingPage />} />
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { useTheme } from "../ThemeContext";
import { useCartWishlist } from "../hooks/useCartWishlist";
import {
  EMAILJS_SERVICE_ID,
  EMAILJS_TEMPLATE_ID_CUSTOMER,
  EMAILJS_TEMPLATE_ID_ADMIN,
  EMAILJS_PUBLIC_KEY,
  ADMIN_EMAIL
} from "../emailjs.config";

// ── Theme ─────────────────────────────────────────────────────
const DT = {
  bg: "#0B0B0C", bgCard: "#16171A", bgInput: "#0f1012",
  border: "rgba(194,197,204,0.1)", borderFocus: "#FF5A1F",
  text: "#C2C5CC", muted: "#7A7F87", divider: "rgba(255,255,255,0.06)",
  label: "#7A7F87",
};
const LT = {
  bg: "#FAFAFA", bgCard: "#FFFFFF", bgInput: "#F7F7F8",
  border: "#D9D9DE", borderFocus: "#FF5A1F",
  text: "#111111", muted: "#6E6E73", divider: "#E8E8ED",
  label: "#6E6E73",
};

// ── Country list (common + BD priority) ──────────────────────
const COUNTRIES = [
  "Bangladesh", "India", "Pakistan", "Nepal", "Sri Lanka",
  "Afghanistan", "Bhutan", "Maldives",
  "──────────────",
  "Australia", "Brazil", "Canada", "China", "France",
  "Germany", "Indonesia", "Italy", "Japan", "Malaysia",
  "Mexico", "Netherlands", "New Zealand", "Nigeria",
  "Philippines", "Russia", "Saudi Arabia", "Singapore",
  "South Africa", "South Korea", "Spain", "Thailand",
  "Turkey", "United Arab Emirates", "United Kingdom",
  "United States", "Vietnam",
];

// ── Generate order ID ─────────────────────────────────────────
function genOrderId() {
  const ts  = Date.now().toString(36).toUpperCase();
  const rnd = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `VELT-${ts}-${rnd}`;
}

// ── Shared input style builder ────────────────────────────────
function inputStyle(t, focused, err) {
  return {
    width: "100%", boxSizing: "border-box",
    padding: "11px 14px",
    fontFamily: "'Barlow', sans-serif", fontSize: "0.82rem",
    fontWeight: 500, letterSpacing: "0.03em",
    borderRadius: 4, outline: "none",
    background: t.bgInput, color: t.text,
    border: `1px solid ${err ? "#e0445a" : focused ? t.borderFocus : t.border}`,
    boxShadow: focused ? `0 0 0 1px ${err ? "#e0445a" : t.borderFocus}, 0 0 16px rgba(255,90,31,0.08)` : "none",
    transition: "border-color 0.22s, box-shadow 0.22s, background 0.4s",
  };
}

// ── Field wrapper ─────────────────────────────────────────────
function Field({ label, required, error, children }) {
  const { dark } = useTheme();
  const t = dark ? DT : LT;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      <label style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: t.label }}>
        {label}{required && <span style={{ color: "#FF5A1F", marginLeft: 3 }}>*</span>}
      </label>
      {children}
      {error && <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.6rem", color: "#e0445a", letterSpacing: "0.06em" }}>{error}</span>}
    </div>
  );
}

// ── Input ─────────────────────────────────────────────────────
function Input({ value, onChange, placeholder, type = "text", error, name }) {
  const { dark } = useTheme();
  const t = dark ? DT : LT;
  const [focused, setFocused] = useState(false);
  return (
    <input
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      autoComplete="off"
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={inputStyle(t, focused, error)}
    />
  );
}

// ── Textarea ──────────────────────────────────────────────────
function Textarea({ value, onChange, placeholder, rows = 3, error }) {
  const { dark } = useTheme();
  const t = dark ? DT : LT;
  const [focused, setFocused] = useState(false);
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{ ...inputStyle(t, focused, error), resize: "vertical", lineHeight: 1.55 }}
    />
  );
}

// ── Select ────────────────────────────────────────────────────
function Select({ value, onChange, options, error }) {
  const { dark } = useTheme();
  const t = dark ? DT : LT;
  const [focused, setFocused] = useState(false);
  return (
    <select
      value={value}
      onChange={onChange}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{ ...inputStyle(t, focused, error), appearance: "none", cursor: "pointer" }}
    >
      <option value="">Select country…</option>
      {options.map((c) => (
        <option key={c} value={c} disabled={c.startsWith("──")}>{c}</option>
      ))}
    </select>
  );
}

// ── Section heading ───────────────────────────────────────────
function SectionHead({ accent = "#FF5A1F", children }) {
  const { dark } = useTheme();
  const t = dark ? DT : LT;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
      <div style={{ width: 3, height: 22, background: accent, borderRadius: 2, flexShrink: 0 }} />
      <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.2rem", letterSpacing: "0.06em", margin: 0, color: t.text }}>{children}</h2>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────
export default function BillingPage() {
  const { dark } = useTheme();
  const t = dark ? DT : LT;
  const navigate = useNavigate();
  const { cart, cartTotal, clearCart } = useCartWishlist();

  // Form state
  const [form, setForm] = useState({
    firstName: "", lastName: "",
    email: "", phone: "",
    address: "", city: "", state: "", zip: "",
    country: "Bangladesh",
    notes: "",
  });
  const [payment, setPayment] = useState("cod"); // cod | online
  const [errors, setErrors]   = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const set = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  // ── Validate ───────────────────────────────────────────────
  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = "Required";
    if (!form.lastName.trim())  e.lastName  = "Required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (!form.phone.trim())     e.phone    = "Required";
    if (!form.address.trim())   e.address  = "Required";
    if (!form.city.trim())      e.city     = "Required";
    if (!form.country)          e.country  = "Required";
    return e;
  };

  // ── Submit ─────────────────────────────────────────────────
const handleSubmit = async () => {
  const errs = validate();
  if (Object.keys(errs).length) {
    setErrors(errs);
    return;
  }

  setErrors({});
  setSubmitting(true);
  setSubmitError("");

  const orderId = genOrderId();
  const orderDate = new Date().toLocaleString("en-US", {
    dateStyle: "long",
    timeStyle: "short",
  });

  const itemsList = cart
    .map((i) => `${i.name} × ${i.qty} — ${i.price}`)
    .join("\n");

  const billingAddress = [
    `${form.firstName} ${form.lastName}`,
    form.address,
    `${form.city}${form.state ? ", " + form.state : ""}${form.zip ? " " + form.zip : ""}`,
    form.country,
  ].join("\n");

  const baseParams = {
    order_id: orderId,
    order_date: orderDate,
    items_list: itemsList,
    grand_total: `$${cartTotal.toFixed(2)}`,
    billing_address: billingAddress,
    phone: form.phone,
    notes: form.notes || "None",
    payment_method:
      payment === "cod" ? "Cash on Delivery" : "Online Banking",
  };

 try {
  // ── SEND TO CUSTOMER ─────────────────────
  await emailjs.send(
    EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_ID_CUSTOMER,
    {
      ...baseParams,
      to_email: form.email,
      to_name: `${form.firstName} ${form.lastName}`,
    },
    EMAILJS_PUBLIC_KEY
  );

  // ── SEND TO ADMIN ────────────────────────
  await emailjs.send(
    EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_ID_ADMIN,
    {
      ...baseParams,
      to_email: ADMIN_EMAIL, // VERY IMPORTANT
      to_name: "Admin",

      customer_name: `${form.firstName} ${form.lastName}`,
      customer_email: form.email,
    },
    EMAILJS_PUBLIC_KEY
  );

  const orderData = {
    orderId,
    orderDate,
    items: cart,
    cartTotal,
    payment:
      payment === "cod"
        ? "Cash on Delivery"
        : "Online Banking",
    billing: { ...form },
  };

  clearCart();
  navigate("/confirmation", { state: { order: orderData } });

} catch (err) {
  console.error(err);
  setSubmitError("Failed to send email. Try again.");
  setSubmitting(false);
}
};
  // ── Empty cart guard ───────────────────────────────────────
  if (cart.length === 0) {
    return (
      <div style={{ minHeight: "100vh", background: t.bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, fontFamily: "'Barlow', sans-serif" }}>
        <p style={{ color: t.muted, fontSize: "0.85rem", letterSpacing: "0.1em" }}>Your cart is empty.</p>
        <button onClick={() => navigate("/accessories")} style={{ padding: "10px 22px", borderRadius: 3, border: "none", background: "#FF5A1F", color: "#fff", fontFamily: "'Barlow', sans-serif", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", cursor: "pointer" }}>
          Browse Accessories
        </button>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@300;400;600;700&display=swap');
        @keyframes bp-in { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
        .bp-section { animation: bp-in 0.4s ease both; }
      `}</style>

      <div style={{ minHeight: "100vh", background: t.bg, transition: "background 0.5s", fontFamily: "'Barlow', sans-serif", paddingBottom: 80 }}>

        {/* ── Page header ───────────────────────────────── */}
        <div style={{ padding: "clamp(32px,5vw,56px) clamp(16px,5vw,72px) 0", display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap", marginBottom: "clamp(24px,4vh,40px)" }}>
          <button onClick={() => navigate("/cart")} style={{ background: "none", border: "none", cursor: "pointer", color: "#FF5A1F", display: "flex", alignItems: "center", gap: 6, fontFamily: "'Barlow', sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", padding: 0 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
            Back to Cart
          </button>
          <div style={{ width: 1, height: 20, background: t.divider }} />
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 3, height: 28, background: "#FF5A1F", borderRadius: 2 }} />
            <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(1.8rem,4vw,2.8rem)", letterSpacing: "0.04em", lineHeight: 1, margin: 0, color: t.text }}>Billing Details</h1>
          </div>

          {/* Progress trail */}
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8, fontFamily: "'Barlow', sans-serif", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase" }}>
            {["Cart", "Billing", "Confirmation"].map((step, i) => (
              <span key={step} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ color: i === 1 ? "#FF5A1F" : i < 1 ? t.muted : t.muted, opacity: i === 1 ? 1 : 0.45 }}>{step}</span>
                {i < 2 && <span style={{ color: t.muted, opacity: 0.3 }}>›</span>}
              </span>
            ))}
          </div>
        </div>

        {/* ── Two-column layout ─────────────────────────── */}
        <div style={{ padding: "0 clamp(16px,5vw,72px)", display: "grid", gridTemplateColumns: "1fr clamp(280px,30%,360px)", gap: "clamp(20px,3vw,44px)", alignItems: "start" }}>

          {/* ── LEFT: Form ────────────────────────────── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>

            {/* Personal info */}
            <div className="bp-section" style={{ padding: 24, borderRadius: 10, background: t.bgCard, border: `1px solid ${t.border}`, animationDelay: "0ms" }}>
              <SectionHead>Personal Information</SectionHead>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <Field label="First Name" required error={errors.firstName}>
                  <Input value={form.firstName} onChange={set("firstName")} placeholder="John" error={errors.firstName} />
                </Field>
                <Field label="Last Name" required error={errors.lastName}>
                  <Input value={form.lastName} onChange={set("lastName")} placeholder="Doe" error={errors.lastName} />
                </Field>
                <Field label="Email Address" required error={errors.email}>
                  <Input value={form.email} onChange={set("email")} placeholder="john@example.com" type="email" error={errors.email} />
                </Field>
                <Field label="Phone / WhatsApp" required error={errors.phone}>
                  <Input value={form.phone} onChange={set("phone")} placeholder="+880 1xxx xxxxxx" type="tel" error={errors.phone} />
                </Field>
              </div>
            </div>

            {/* Shipping address */}
            <div className="bp-section" style={{ padding: 24, borderRadius: 10, background: t.bgCard, border: `1px solid ${t.border}`, animationDelay: "80ms" }}>
              <SectionHead>Shipping Address</SectionHead>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <Field label="Street Address" required error={errors.address}>
                  <Input value={form.address} onChange={set("address")} placeholder="House no, Road, Area" error={errors.address} />
                </Field>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <Field label="City" required error={errors.city}>
                    <Input value={form.city} onChange={set("city")} placeholder="Dhaka" error={errors.city} />
                  </Field>
                  <Field label="State / Division">
                    <Input value={form.state} onChange={set("state")} placeholder="Dhaka Division" />
                  </Field>
                  <Field label="ZIP / Postal Code">
                    <Input value={form.zip} onChange={set("zip")} placeholder="1207" />
                  </Field>
                  <Field label="Country" required error={errors.country}>
                    <Select value={form.country} onChange={set("country")} options={COUNTRIES} error={errors.country} />
                  </Field>
                </div>
              </div>
            </div>

            {/* Order notes */}
            <div className="bp-section" style={{ padding: 24, borderRadius: 10, background: t.bgCard, border: `1px solid ${t.border}`, animationDelay: "140ms" }}>
              <SectionHead>Order Notes</SectionHead>
              <Field label="Special instructions (optional)">
                <Textarea value={form.notes} onChange={set("notes")} placeholder="Delivery preferences, special requests, alternate contact…" rows={3} />
              </Field>
            </div>

            {/* Payment method */}
            <div className="bp-section" style={{ padding: 24, borderRadius: 10, background: t.bgCard, border: `1px solid ${t.border}`, animationDelay: "200ms" }}>
              <SectionHead>Payment Method</SectionHead>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>

                {/* Cash on Delivery — ACTIVE */}
                <label style={{
                  display: "flex", alignItems: "flex-start", gap: 14,
                  padding: "14px 16px", borderRadius: 6, cursor: "pointer",
                  border: `1px solid ${payment === "cod" ? "rgba(255,90,31,0.4)" : t.border}`,
                  background: payment === "cod" ? "rgba(255,90,31,0.06)" : "transparent",
                  transition: "all 0.22s",
                }}>
                  <div style={{ position: "relative", marginTop: 2, flexShrink: 0 }}>
                    <input
                      type="radio" name="payment" value="cod"
                      checked={payment === "cod"}
                      onChange={() => setPayment("cod")}
                      style={{ position: "absolute", opacity: 0, width: 0, height: 0 }}
                    />
                    {/* Custom radio */}
                    <div style={{
                      width: 18, height: 18, borderRadius: "50%",
                      border: `2px solid ${payment === "cod" ? "#FF5A1F" : t.border}`,
                      background: "transparent", display: "flex", alignItems: "center", justifyContent: "center",
                      transition: "border-color 0.22s",
                    }}>
                      {payment === "cod" && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#FF5A1F" }} />}
                    </div>
                  </div>
                  <div>
                    <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.05em", margin: "0 0 3px", color: t.text }}>Cash on Delivery</p>
                    <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.68rem", color: t.muted, margin: 0, lineHeight: 1.5 }}>Pay when your order arrives. Our team will contact you to confirm the delivery details.</p>
                  </div>
                  {/* COD icon */}
                  <div style={{ marginLeft: "auto", flexShrink: 0, color: payment === "cod" ? "#FF5A1F" : t.muted, opacity: payment === "cod" ? 1 : 0.4, transition: "all 0.22s" }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="7" width="20" height="14" rx="2" />
                      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                      <line x1="12" y1="12" x2="12" y2="16" />
                      <line x1="10" y1="14" x2="14" y2="14" />
                    </svg>
                  </div>
                </label>

                {/* Online Banking — DISABLED */}
                <label style={{
                  display: "flex", alignItems: "flex-start", gap: 14,
                  padding: "14px 16px", borderRadius: 6, cursor: "not-allowed",
                  border: `1px solid ${t.border}`,
                  background: "transparent", opacity: 0.4,
                  position: "relative", overflow: "hidden",
                }}>
                  <div style={{ marginTop: 2, flexShrink: 0 }}>
                    <input type="radio" name="payment" value="online" disabled style={{ position: "absolute", opacity: 0 }} />
                    <div style={{ width: 18, height: 18, borderRadius: "50%", border: `2px solid ${t.border}`, background: "transparent" }} />
                  </div>
                  <div>
                    <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.05em", margin: "0 0 3px", color: t.text, display: "flex", alignItems: "center", gap: 8 }}>
                      Online Banking / Card
                      <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.52rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", padding: "2px 7px", borderRadius: 2, background: dark ? "rgba(194,197,204,0.08)" : "#F1F1F1", color: t.muted, border: `1px solid ${t.border}` }}>Coming Soon</span>
                    </p>
                    <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.68rem", color: t.muted, margin: 0 }}>Card, bKash, Nagad — currently unavailable.</p>
                  </div>
                  <div style={{ marginLeft: "auto", flexShrink: 0, color: t.muted }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="1" y="4" width="22" height="16" rx="2" />
                      <line x1="1" y1="10" x2="23" y2="10" />
                    </svg>
                  </div>
                </label>
              </div>
            </div>

            {/* Submit error */}
            {submitError && (
              <div style={{ padding: "12px 16px", borderRadius: 6, background: "rgba(224,68,90,0.08)", border: "1px solid rgba(224,68,90,0.25)", fontFamily: "'Barlow', sans-serif", fontSize: "0.75rem", color: "#e0445a", lineHeight: 1.5 }}>
                {submitError}
              </div>
            )}
          </div>

          {/* ── RIGHT: Order summary ──────────────────── */}
          <div style={{ position: "sticky", top: 24, display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ padding: 22, borderRadius: 10, background: t.bgCard, border: `1px solid ${t.border}` }}>
              <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.3rem", letterSpacing: "0.04em", margin: "0 0 18px", color: t.text }}>Order Summary</h2>

              <div style={{ display: "flex", flexDirection: "column", gap: 10, paddingBottom: 14, borderBottom: `1px solid ${t.divider}` }}>
                {cart.map((item) => (
                  <div key={item.id} style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <div style={{ width: 42, height: 42, borderRadius: 6, background: dark ? "#0f1012" : "#F1F1F1", flexShrink: 0, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <img src={item.image || item.heroImage} alt={item.name} style={{ width: "90%", height: "90%", objectFit: "contain" }} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.72rem", fontWeight: 700, margin: 0, color: t.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.name}</p>
                      <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.62rem", margin: "1px 0 0", color: t.muted }}>Qty: {item.qty}</p>
                    </div>
                    <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.72rem", fontWeight: 700, color: t.text, flexShrink: 0 }}>{item.price}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "14px 0 18px" }}>
                <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.05rem", letterSpacing: "0.06em", color: t.text }}>Grand Total</span>
                <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.55rem", letterSpacing: "0.04em", color: "#FF5A1F" }}>${cartTotal.toFixed(2)}</span>
              </div>

              {/* Confirm button */}
              <button
                onClick={handleSubmit}
                disabled={submitting}
                style={{
                  width: "100%", padding: "13px 0", borderRadius: 3, border: "none",
                  background: submitting ? "rgba(255,90,31,0.5)" : "#FF5A1F",
                  color: "#fff", cursor: submitting ? "not-allowed" : "pointer",
                  fontFamily: "'Barlow', sans-serif", fontSize: "0.68rem", fontWeight: 700,
                  letterSpacing: "0.2em", textTransform: "uppercase",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                  transition: "background 0.2s",
                }}
                onMouseEnter={e => { if (!submitting) e.currentTarget.style.background = "#FF6A2E"; }}
                onMouseLeave={e => { if (!submitting) e.currentTarget.style.background = "#FF5A1F"; }}
              >
                {submitting ? (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                      style={{ animation: "bp-spin 0.7s linear infinite" }}>
                      <path d="M12 2a10 10 0 0 1 10 10" />
                    </svg>
                    Placing Order…
                  </>
                ) : "Confirm Order"}
              </button>

              <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.6rem", color: t.muted, margin: "12px 0 0", textAlign: "center", lineHeight: 1.6, letterSpacing: "0.04em" }}>
                A confirmation email will be sent to your email address. Our team will reach out to confirm delivery.
              </p>
            </div>

            {/* Trust badges */}
            <div style={{ padding: "14px 18px", borderRadius: 10, background: t.bgCard, border: `1px solid ${t.border}`, display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { icon: "🔒", text: "Your information is secure" },
                { icon: "📦", text: "Free delivery on all orders" },
                { icon: "✅", text: "Verified by our support team" },
              ].map(({ icon, text }) => (
                <div key={text} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: "0.9rem" }}>{icon}</span>
                  <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.66rem", color: t.muted, letterSpacing: "0.04em" }}>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes bp-spin { to { transform: rotate(360deg); } }
      `}</style>
    </>
  );
}