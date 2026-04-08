/**
 * BillingPage.jsx
 *
 * Fixed navbar overlap with dynamic padding.
 * Maintained premium Arctic White / Carbon Black aesthetic.
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

// ── Theme Definitions ─────────────────────────────────────────
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

const COUNTRIES = [
  "Bangladesh", "India", "Pakistan", "Nepal", "Sri Lanka",
  "Afghanistan", "Bhutan", "Maldives",
  "──────────────",
  "Australia", "Canada", "China", "France", "Germany",
  "Japan", "Singapore", "United Arab Emirates", "United Kingdom", "United States",
];

function genOrderId() {
  const ts = Date.now().toString(36).toUpperCase();
  const rnd = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `VELT-${ts}-${rnd}`;
}

// ── Shared Components ─────────────────────────────────────────
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
    transition: "all 0.22s ease",
  };
}

function Field({ label, required, error, children }) {
  const { dark } = useTheme();
  const t = dark ? DT : LT;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5, width: "100%" }}>
      <label style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: t.label }}>
        {label}{required && <span style={{ color: "#FF5A1F", marginLeft: 3 }}>*</span>}
      </label>
      {children}
      {error && <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.6rem", color: "#e0445a" }}>{error}</span>}
    </div>
  );
}

function Input({ value, onChange, placeholder, type = "text", error, name }) {
  const { dark } = useTheme();
  const t = dark ? DT : LT;
  const [focused, setFocused] = useState(false);
  return (
    <input
      name={name} type={type} value={value} onChange={onChange}
      placeholder={placeholder} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
      style={inputStyle(t, focused, error)}
    />
  );
}

function Select({ value, onChange, options, error }) {
  const { dark } = useTheme();
  const t = dark ? DT : LT;
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ position: "relative" }}>
      <select
        value={value} onChange={onChange} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={{ ...inputStyle(t, focused, error), appearance: "none", cursor: "pointer" }}
      >
        <option value="">Select country…</option>
        {options.map((c) => (
          <option key={c} value={c} disabled={c.startsWith("──")}>{c}</option>
        ))}
      </select>
      <div style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: t.muted, fontSize: "0.8rem" }}>▼</div>
    </div>
  );
}

function SectionHead({ accent = "#FF5A1F", children }) {
  const { dark } = useTheme();
  const t = dark ? DT : LT;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
      <div style={{ width: 3, height: 22, background: accent, borderRadius: 2 }} />
      <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.2rem", letterSpacing: "0.06em", margin: 0, color: t.text }}>{children}</h2>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────
export default function BillingPage() {
  const { dark } = useTheme();
  const t = dark ? DT : LT;
  const navigate = useNavigate();
  const { cart, cartTotal, clearCart } = useCartWishlist();

  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    address: "", city: "", state: "", zip: "",
    country: "Bangladesh", notes: "",
  });
  const [payment, setPayment] = useState("cod");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const set = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = "Required";
    if (!form.lastName.trim()) e.lastName = "Required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (!form.phone.trim()) e.phone = "Required";
    if (!form.address.trim()) e.address = "Required";
    if (!form.city.trim()) e.city = "Required";
    return e;
  };

  const handleSubmit = async () => {
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    
    setErrors({});
    setSubmitting(true);
    setSubmitError("");

    const orderId = genOrderId();
    const orderDate = new Date().toLocaleString("en-US", { dateStyle: "long", timeStyle: "short" });
    const itemsList = cart.map((i) => `${i.name} × ${i.qty} — ${i.price}`).join("\n");
    const billingAddress = `${form.firstName} ${form.lastName}\n${form.address}\n${form.city}${form.state ? ", " + form.state : ""}\n${form.country}`;

    const baseParams = {
      order_id: orderId, order_date: orderDate, items_list: itemsList,
      grand_total: `$${cartTotal.toFixed(2)}`, billing_address: billingAddress,
      phone: form.phone, notes: form.notes || "None",
      payment_method: payment === "cod" ? "Cash on Delivery" : "Online Banking",
    };

    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID_CUSTOMER, { ...baseParams, to_email: form.email, to_name: `${form.firstName} ${form.lastName}` }, EMAILJS_PUBLIC_KEY);
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID_ADMIN, { ...baseParams, to_email: ADMIN_EMAIL, to_name: "Admin", customer_name: `${form.firstName} ${form.lastName}`, customer_email: form.email }, EMAILJS_PUBLIC_KEY);
      
      const orderData = { orderId, orderDate, items: cart, cartTotal, payment: baseParams.payment_method, billing: { ...form } };
      clearCart();
      navigate("/confirmation", { state: { order: orderData } });
    } catch (err) {
      setSubmitError("Failed to process order. Please check your connection.");
      setSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div style={{ minHeight: "100vh", background: t.bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16 }}>
        <p style={{ color: t.muted, fontFamily: "'Barlow', sans-serif" }}>Your cart is empty.</p>
        <button onClick={() => navigate("/accessories")} style={{ padding: "12px 24px", background: "#FF5A1F", color: "#fff", border: "none", borderRadius: 4, cursor: "pointer", fontWeight: 700, textTransform: "uppercase", fontSize: "0.65rem", letterSpacing: "0.15em" }}>Browse Store</button>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @keyframes bp-in { from { opacity:0; transform:translateY(15px); } to { opacity:1; transform:translateY(0); } }
        @keyframes bp-spin { to { transform: rotate(360deg); } }
        .bp-section { animation: bp-in 0.4s ease both; }
        input::-webkit-outer-spin-button, input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
        
        .billing-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 40px;
          align-items: flex-start;
          padding: 0 clamp(16px, 5vw, 72px);
        }

        .summary-sidebar {
          flex: 1 1 320px;
          position: sticky;
          top: 100px; /* Aligned with the new top padding */
          max-width: 100%;
        }

        @media (max-width: 950px) {
          .summary-sidebar {
            position: static !important;
            flex: 1 1 100%;
          }
        }
      `}</style>

      <div style={{ 
        minHeight: "100vh", 
        background: t.bg, 
        color: t.text, 
        transition: "background 0.5s", 
        overflowX: "hidden", 
        paddingTop: "clamp(80px, 12vh, 110px)", // 👈 Fixes the Navbar coverage
        paddingBottom: 60 
      }}>
        
        {/* Header Section */}
        <div style={{ padding: "0 clamp(16px, 5vw, 72px) 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
             <button onClick={() => navigate("/cart")} style={{ background: "none", border: "none", cursor: "pointer", color: "#FF5A1F", display: "flex", alignItems: "center", gap: 6, fontWeight: 700, fontSize: "0.7rem", textTransform: "uppercase" }}>
               <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M19 12H5M12 5l-7 7 7 7" /></svg> Back
             </button>
             <div style={{ width: 1, height: 20, background: t.divider }} />
             <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(1.8rem, 5vw, 2.8rem)", margin: 0, letterSpacing: "0.04em" }}>Billing Details</h1>
          </div>
          
          <div style={{ display: "flex", gap: 12, fontFamily: "'Barlow', sans-serif", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
            <span style={{ color: t.muted }}>Cart</span> <span style={{ color: t.divider }}>/</span>
            <span style={{ color: "#FF5A1F" }}>Billing</span> <span style={{ color: t.divider }}>/</span>
            <span style={{ color: t.muted }}>Done</span>
          </div>
        </div>

        {/* Responsive Grid Wrapper */}
        <div className="billing-grid">
          
          {/* LEFT COLUMN: The Form */}
          <div style={{ flex: "1 1 500px", display: "flex", flexDirection: "column", gap: 24 }}>
            
            {/* Personal Info */}
            <div className="bp-section" style={{ padding: 24, borderRadius: 12, background: t.bgCard, border: `1px solid ${t.border}` }}>
              <SectionHead>Personal Information</SectionHead>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
                <Field label="First Name" required error={errors.firstName}>
                  <Input value={form.firstName} onChange={set("firstName")} placeholder="John" error={errors.firstName} />
                </Field>
                <Field label="Last Name" required error={errors.lastName}>
                  <Input value={form.lastName} onChange={set("lastName")} placeholder="Doe" error={errors.lastName} />
                </Field>
                <Field label="Email" required error={errors.email}>
                  <Input value={form.email} onChange={set("email")} placeholder="john@example.com" type="email" error={errors.email} />
                </Field>
                <Field label="Phone" required error={errors.phone}>
                  <Input value={form.phone} onChange={set("phone")} placeholder="+880" type="tel" error={errors.phone} />
                </Field>
              </div>
            </div>

            {/* Address */}
            <div className="bp-section" style={{ padding: 24, borderRadius: 12, background: t.bgCard, border: `1px solid ${t.border}`, animationDelay: "0.1s" }}>
              <SectionHead>Shipping Address</SectionHead>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <Field label="Street Address" required error={errors.address}>
                  <Input value={form.address} onChange={set("address")} placeholder="House no, Road, Area" error={errors.address} />
                </Field>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 16 }}>
                  <Field label="City" required error={errors.city}>
                    <Input value={form.city} onChange={set("city")} placeholder="Dhaka" error={errors.city} />
                  </Field>
                  <Field label="ZIP">
                    <Input value={form.zip} onChange={set("zip")} placeholder="1207" />
                  </Field>
                  <Field label="Country" required>
                    <Select value={form.country} onChange={set("country")} options={COUNTRIES} />
                  </Field>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bp-section" style={{ padding: 24, borderRadius: 12, background: t.bgCard, border: `1px solid ${t.border}`, animationDelay: "0.2s" }}>
              <SectionHead>Payment Method</SectionHead>
              <label style={{
                display: "flex", gap: 16, padding: 16, borderRadius: 8, cursor: "pointer",
                border: `1px solid ${payment === 'cod' ? "#FF5A1F66" : t.border}`,
                background: payment === 'cod' ? "#FF5A1F08" : "transparent",
                transition: "all 0.3s ease"
              }}>
                <input type="radio" checked={payment === 'cod'} onChange={() => setPayment('cod')} style={{ accentColor: "#FF5A1F", width: 18, height: 18, marginTop: 2 }} />
                <div>
                  <p style={{ margin: "0 0 4px", fontWeight: 700, fontSize: "0.85rem" }}>Cash on Delivery</p>
                  <p style={{ margin: 0, fontSize: "0.7rem", color: t.muted }}>Pay securely when the package is delivered to your door.</p>
                </div>
              </label>
            </div>
          </div>

          {/* RIGHT COLUMN: Order Summary */}
          <div className="summary-sidebar">
            <div style={{ padding: 24, borderRadius: 12, background: t.bgCard, border: `1px solid ${t.border}` }}>
              <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.4rem", margin: "0 0 20px", letterSpacing: "0.05em" }}>Summary</h2>
              
              <div style={{ display: "flex", flexDirection: "column", gap: 14, maxHeight: "350px", overflowY: "auto", paddingRight: 4, marginBottom: 20 }}>
                {cart.map((item) => (
                  <div key={item.id} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <div style={{ width: 44, height: 44, borderRadius: 6, background: t.bgInput, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <img src={item.image || item.heroImage} alt={item.name} style={{ width: "80%", height: "80%", objectFit: "contain" }} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: "0.75rem", fontWeight: 700, margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.name}</p>
                      <p style={{ fontSize: "0.65rem", color: t.muted, margin: 0 }}>Qty: {item.qty}</p>
                    </div>
                    <span style={{ fontSize: "0.75rem", fontWeight: 700 }}>{item.price}</span>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: `1px solid ${t.divider}`, paddingTop: 20, display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.2rem", color: t.text }}>Grand Total</span>
                <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.8rem", color: "#FF5A1F" }}>${cartTotal.toFixed(2)}</span>
              </div>

              {submitError && <p style={{ color: "#e0445a", fontSize: "0.7rem", marginTop: 12, textAlign: "center" }}>{submitError}</p>}

              <button
                onClick={handleSubmit}
                disabled={submitting}
                style={{
                  width: "100%", padding: "16px 0", marginTop: 20, borderRadius: 6, border: "none",
                  background: submitting ? "#FF5A1F80" : "#FF5A1F",
                  color: "#fff", fontFamily: "'Barlow', sans-serif", fontWeight: 700,
                  fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.15em",
                  cursor: submitting ? "not-allowed" : "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                  transition: "background 0.3s"
                }}
              >
                {submitting ? (
                  <div style={{ width: 14, height: 14, border: "2px solid #fff", borderTopColor: "transparent", borderRadius: "50%", animation: "bp-spin 0.6s linear infinite" }} />
                ) : "Place Order"}
              </button>
            </div>

            {/* Security Badges */}
            <div style={{ padding: 20, marginTop: 20, borderRadius: 12, background: t.bgCard, border: `1px solid ${t.border}`, display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: "0.7rem", color: t.muted }}>
                <span>🔒 Secure 256-bit SSL Encryption</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: "0.7rem", color: t.muted }}>
                <span>📦 Free Express Shipping</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}