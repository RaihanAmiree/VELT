/**
 * ConfirmationPage.jsx
 *
 * Fixed navbar overlap with dynamic padding.
 * Full printable cash memo with premium Velt Drt styling.
 */

import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../ThemeContext";

// ── Theme ─────────────────────────────────────────────────────
const DT = {
  bg: "#0B0B0C", bgCard: "#16171A", bgMemo: "#111214",
  border: "rgba(194,197,204,0.1)", text: "#C2C5CC",
  muted: "#7A7F87", divider: "rgba(255,255,255,0.07)",
};
const LT = {
  bg: "#F4F4F6", bgCard: "#FFFFFF", bgMemo: "#FFFFFF",
  border: "#D9D9DE", text: "#111111",
  muted: "#6E6E73", divider: "#E4E4EA",
};

export default function ConfirmationPage() {
  const { dark } = useTheme();
  const t = dark ? DT : LT;
  const location = useLocation();
  const navigate = useNavigate();
  const memoRef  = useRef(null);

  const order = location.state?.order;

  // Redirect if landed here directly with no order data
  useEffect(() => {
    if (!order) navigate("/", { replace: true });
  }, [order, navigate]);

  if (!order) return null;

  const { orderId, orderDate, items, cartTotal, payment, billing } = order;

  // ── Print handler ─────────────────────────────────────────
  const handlePrint = () => window.print();

  // ── Calculate subtotals ───────────────────────────────────
  const lineItems = items.map((item) => {
    const unitPrice = parseFloat(String(item.price).replace(/[^0-9.]/g, "")) || 0;
    return { ...item, unitPrice, lineTotal: unitPrice * item.qty };
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@300;400;600;700&display=swap');

        @keyframes cp-in   { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes cp-check { 0%{stroke-dashoffset:60} 100%{stroke-dashoffset:0} }
        @keyframes cp-ring  { 0%{transform:scale(0.7);opacity:0} 60%{transform:scale(1.08);opacity:1} 100%{transform:scale(1)} }

        .cp-wrap { animation: cp-in 0.5s ease both; }

        /* ── Print styles ── */
        @media print {
          body * { visibility: hidden !important; }
          #cp-memo, #cp-memo * { visibility: visible !important; }
          #cp-memo {
            position: fixed !important;
            inset: 0 !important;
            width: 100% !important;
            background: #fff !important;
            color: #000 !important;
            padding: 32px !important;
            box-shadow: none !important;
            border: none !important;
          }
          .cp-no-print { display: none !important; }
          .cp-print-only { display: block !important; }
        }
        .cp-print-only { display: none; }

        /* Table */
        .cp-table { width: 100%; border-collapse: collapse; }
        .cp-table th {
          font-family: 'Barlow', sans-serif;
          font-size: 0.58rem; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase;
          padding: 8px 10px; text-align: left;
        }
        .cp-table td {
          font-family: 'Barlow', sans-serif;
          font-size: 0.75rem; font-weight: 500;
          padding: 10px 10px;
          vertical-align: middle;
        }
        .cp-table td.right, .cp-table th.right { text-align: right; }
        .cp-table tbody tr { border-top: 1px solid; }
      `}</style>

      <div style={{ 
        minHeight: "100vh", 
        background: t.bg, 
        transition: "background 0.5s", 
        fontFamily: "'Barlow', sans-serif", 
        paddingTop: "clamp(80px, 12vh, 110px)", // 👈 Matches BillingPage fix
        paddingBottom: 80 
      }}>

        {/* ── Success banner ────────────────────────────── */}
        <div className="cp-wrap cp-no-print" style={{ padding: "0 clamp(16px,5vw,72px)", display: "flex", flexDirection: "column", alignItems: "center", gap: 16, textAlign: "center", marginBottom: "clamp(24px,4vh,40px)" }}>

          {/* Animated check ring */}
          <div style={{ position: "relative", width: 72, height: 72 }}>
            <svg width="72" height="72" viewBox="0 0 72 72" fill="none" style={{ animation: "cp-ring 0.55s cubic-bezier(0.22,1,0.36,1) both" }}>
              <circle cx="36" cy="36" r="34" stroke="rgba(255,90,31,0.18)" strokeWidth="2" />
              <circle cx="36" cy="36" r="34" stroke="#FF5A1F" strokeWidth="2.5" strokeDasharray="213" strokeDashoffset="0" strokeLinecap="round"
                style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%", animation: "cp-check 0.6s ease 0.3s both" }} />
            </svg>
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FF5A1F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"
                  strokeDasharray="20" strokeDashoffset="20"
                  style={{ animation: "cp-check 0.4s ease 0.5s forwards", strokeDashoffset: 20 }} />
              </svg>
            </div>
          </div>

          <div>
            <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2rem,5vw,3.2rem)", letterSpacing: "0.04em", margin: "0 0 6px", color: t.text }}>Order Confirmed!</h1>
            <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.78rem", color: t.muted, margin: "0 0 4px", letterSpacing: "0.06em" }}>
              A confirmation email has been sent to <strong style={{ color: t.text }}>{billing.email}</strong>
            </p>
            <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.72rem", color: t.muted, margin: 0, letterSpacing: "0.04em" }}>
              Our team will contact you shortly to arrange delivery.
            </p>
          </div>

          {/* Action buttons */}
          <div className="cp-no-print" style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center", marginTop: 8 }}>
            <button onClick={handlePrint} style={{ padding: "10px 22px", borderRadius: 3, border: "none", background: "#FF5A1F", color: "#fff", fontFamily: "'Barlow', sans-serif", fontSize: "0.63rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}
              onMouseEnter={e => e.currentTarget.style.background = "#FF6A2E"}
              onMouseLeave={e => e.currentTarget.style.background = "#FF5A1F"}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 6 2 18 2 18 9" />
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                <rect x="6" y="14" width="12" height="8" />
              </svg>
              Print / Save PDF
            </button>
            <button onClick={() => navigate("/accessories")} style={{ padding: "10px 22px", borderRadius: 3, border: `1px solid ${t.border}`, background: "transparent", color: t.muted, fontFamily: "'Barlow', sans-serif", fontSize: "0.63rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", cursor: "pointer", transition: "border-color 0.2s, color 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#FF5A1F"; e.currentTarget.style.color = "#FF5A1F"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = t.border; e.currentTarget.style.color = t.muted; }}
            >
              Continue Shopping
            </button>
          </div>
        </div>

        {/* ── Cash Memo ─────────────────────────────────── */}
        <div style={{ padding: "0 clamp(12px, 3vw, 72px)", width: "100%", boxSizing: "border-box" }}>
          <div
            id="cp-memo"
            ref={memoRef}
            style={{
              background: t.bgMemo,
              border: `1px solid ${t.border}`,
              borderRadius: 12,
              overflow: "hidden",
              maxWidth: 860,
              margin: "20px auto",
              boxShadow: dark ? "0 20px 60px rgba(0,0,0,0.5)" : "0 8px 40px rgba(0,0,0,0.08)",
            }}
          >
            {/* Memo header */}
            <div style={{ 
              padding: "clamp(20px, 4vw, 28px) clamp(20px, 4vw, 32px)", 
              background: dark ? "#0f1012" : "#FF5A1F", 
              display: "flex", 
              alignItems: "flex-start", 
              justifyContent: "space-between", 
              flexWrap: "wrap", 
              gap: 20 
            }}>
              <div style={{ minWidth: "200px" }}>
                <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", margin: "0 0 4px", color: dark ? "#FF5A1F" : "rgba(255,255,255,0.7)" }}>VELT DRT</p>
                <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(1.5rem, 5vw, 2rem)", letterSpacing: "0.06em", margin: 0, color: dark ? "#C2C5CC" : "#fff" }}>CASH MEMO</h2>
                <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.65rem", margin: "6px 0 0", color: dark ? "#7A7F87" : "rgba(255,255,255,0.7)", letterSpacing: "0.06em" }}>Tax Invoice / Order Receipt</p>
              </div>
              <div style={{ textAlign: "left", alignSelf: "flex-end" }}>
                <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1rem", letterSpacing: "0.1em", margin: "0 0 4px", color: dark ? "#FF5A1F" : "#fff" }}>ORDER #{orderId}</p>
                <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.65rem", margin: 0, color: dark ? "#7A7F87" : "rgba(255,255,255,0.75)", letterSpacing: "0.04em" }}>{orderDate}</p>
                <div style={{ marginTop: 10, display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 10px", borderRadius: 2, background: dark ? "rgba(255,90,31,0.12)" : "rgba(255,255,255,0.2)", border: dark ? "1px solid rgba(255,90,31,0.25)" : "1px solid rgba(255,255,255,0.3)" }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: dark ? "#FF5A1F" : "#fff", flexShrink: 0 }} />
                  <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: dark ? "#FF5A1F" : "#fff" }}>{payment}</span>
                </div>
              </div>
            </div>

            {/* Billing + shipping info */}
            <div style={{ 
              padding: "24px 32px", 
              display: "flex", 
              flexWrap: "wrap", 
              gap: 32, 
              borderBottom: `1px solid ${t.divider}` 
            }}>
              <div style={{ flex: "1 1 240px" }}>
                <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", margin: "0 0 10px", color: "#FF5A1F" }}>Bill To</p>
                <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.82rem", fontWeight: 700, margin: "0 0 4px", color: t.text }}>{billing.firstName} {billing.lastName}</p>
                <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.72rem", margin: "0 0 2px", color: t.muted }}>{billing.email}</p>
                <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.72rem", margin: "0 0 2px", color: t.muted }}>{billing.phone}</p>
              </div>
              <div style={{ flex: "1 1 240px" }}>
                <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", margin: "0 0 10px", color: "#FF5A1F" }}>Ship To</p>
                <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.75rem", margin: "0 0 2px", color: t.text, lineHeight: 1.6 }}>
                  {billing.address}<br />
                  {billing.city}{billing.state ? `, ${billing.state}` : ""}{billing.zip ? ` ${billing.zip}` : ""}<br />
                  {billing.country}
                </p>
              </div>
            </div>

            {/* Items table */}
            <div style={{ padding: "0 32px", overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
              <table className="cp-table" style={{ width: "100%", minWidth: "600px", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: `2px solid ${t.divider}` }}>
                    <th style={{ textAlign: "left", color: t.muted, padding: "14px 10px 10px 0" }}>#</th>
                    <th style={{ textAlign: "left", color: t.muted }}>Item</th>
                    <th style={{ textAlign: "left", color: t.muted }}>Type</th>
                    <th style={{ textAlign: "right", color: t.muted }}>Unit</th>
                    <th style={{ textAlign: "right", color: t.muted }}>Qty</th>
                    <th style={{ textAlign: "right", color: t.muted, paddingRight: 0 }}>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {lineItems.map((item, i) => (
                    <tr key={item.id} style={{ borderBottom: `1px solid ${t.divider}` }}>
                      <td style={{ color: t.muted, padding: "16px 0" }}>{String(i + 1).padStart(2, "0")}</td>
                      <td style={{ padding: "16px 0" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <div style={{ width: 32, height: 32, borderRadius: 6, background: dark ? "#0B0B0C" : "#F4F4F6", overflow: "hidden", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <img src={item.image || item.heroImage} alt={item.name} style={{ width: "85%", height: "85%", objectFit: "contain" }} />
                          </div>
                          <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.76rem", fontWeight: 700, color: t.text }}>{item.name}</span>
                        </div>
                      </td>
                      <td>
                        <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.55rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "2px 6px", borderRadius: 2, color: "#FF5A1F", background: "rgba(255,90,31,0.08)", border: "1px solid rgba(255,90,31,0.2)" }}>
                          {item.type || item.category || "—"}
                        </span>
                      </td>
                      <td style={{ textAlign: "right", color: t.text }}>{item.price}</td>
                      <td style={{ textAlign: "right", color: t.text }}>{item.qty}</td>
                      <td style={{ textAlign: "right", color: t.text, paddingRight: 0, fontWeight: 700 }}>${item.lineTotal.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Totals */}
            <div style={{ padding: "20px 32px 28px", display: "flex", justifyContent: "flex-end" }}>
              <div style={{ width: "100%", maxWidth: 240, display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.7rem", color: t.muted }}>Subtotal</span>
                  <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.7rem", fontWeight: 700, color: t.text }}>${cartTotal.toFixed(2)}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.7rem", color: t.muted }}>Delivery</span>
                  <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.7rem", fontWeight: 700, color: "#4CAF50" }}>Free</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", paddingTop: 10, borderTop: `2px solid ${t.divider}`, marginTop: 4 }}>
                  <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.1rem", color: t.text }}>Grand Total</span>
                  <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.6rem", color: "#FF5A1F" }}>${cartTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Order notes */}
            {billing.notes && (
              <div style={{ padding: "16px 32px", borderTop: `1px solid ${t.divider}`, background: dark ? "rgba(255,255,255,0.015)" : "rgba(0,0,0,0.02)" }}>
                <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", margin: "0 0 6px", color: "#FF5A1F" }}>Order Notes</p>
                <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.72rem", margin: 0, color: t.muted, lineHeight: 1.6 }}>{billing.notes}</p>
              </div>
            )}

            {/* Memo footer */}
            <div style={{ 
              padding: "16px 32px", 
              borderTop: `1px solid ${t.divider}`, 
              background: dark ? "rgba(255,255,255,0.02)" : "#FAFAFA", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "space-between", 
              flexWrap: "wrap", 
              gap: 12 
            }}>
              <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.62rem", color: t.muted, margin: 0, maxWidth: "70%" }}>
                Thank you for your order. Questions? Contact us through our website.
              </p>
              <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "0.9rem", letterSpacing: "0.12em", color: "#FF5A1F", margin: 0 }}>
                VELT DRT
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}