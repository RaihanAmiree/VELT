/**
 * Toast.jsx
 *
 * Renders a stack of toast notifications in the bottom-right corner.
 * Driven entirely by the CartWishlistContext — mount this once near
 * your app root (e.g. inside CartWishlistProvider but outside page routing).
 *
 * Usage:
 *   <Toast />
 */

import { useCartWishlist } from "../../hooks/useCartWishlist";
import { useTheme } from "../../ThemeContext";

const ICONS = {
  cart: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  ),
  wishlist: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
  remove: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  ),
};

const KIND_COLORS = {
  cart:     { accent: "#FF5A1F", bg: "rgba(255,90,31,0.1)",  border: "rgba(255,90,31,0.25)" },
  wishlist: { accent: "#e0445a", bg: "rgba(224,68,90,0.1)",  border: "rgba(224,68,90,0.25)" },
  remove:   { accent: "#7A7F87", bg: "rgba(122,127,135,0.1)", border: "rgba(122,127,135,0.2)" },
};

export default function Toast() {
  const { toasts, dismissToast } = useCartWishlist();
  const { dark } = useTheme();

  if (!toasts.length) return null;

  return (
    <>
      <style>{`
        @keyframes toast-in {
          from { opacity: 0; transform: translateX(24px) scale(0.96); }
          to   { opacity: 1; transform: translateX(0)    scale(1); }
        }
        @keyframes toast-out {
          from { opacity: 1; max-height: 80px; margin-bottom: 8px; }
          to   { opacity: 0; max-height: 0;   margin-bottom: 0; }
        }
        .toast-item {
          animation: toast-in 0.28s cubic-bezier(0.22,1,0.36,1) forwards;
        }
        .toast-dismiss {
          opacity: 0;
          transition: opacity 0.2s;
        }
        .toast-item:hover .toast-dismiss {
          opacity: 1;
        }
      `}</style>

      <div style={{
        position: "fixed", bottom: 28, right: 28, zIndex: 9999,
        display: "flex", flexDirection: "column", gap: 8,
        pointerEvents: "none",
      }}>
        {toasts.map((toast) => {
          const { accent, bg, border } = KIND_COLORS[toast.kind] ?? KIND_COLORS.cart;
          return (
            <div
              key={toast.id}
              className="toast-item"
              style={{
                pointerEvents: "all",
                display: "flex", alignItems: "center", gap: 10,
                padding: "11px 14px",
                borderRadius: 6,
                background: dark ? `rgba(22,23,26,0.96)` : `rgba(255,255,255,0.97)`,
                border: `1px solid ${border}`,
                boxShadow: dark
                  ? "0 8px 32px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.04)"
                  : "0 8px 32px rgba(0,0,0,0.12)",
                backdropFilter: "blur(12px)",
                minWidth: 220, maxWidth: 320,
              }}
            >
              {/* Icon */}
              <div style={{
                width: 28, height: 28, borderRadius: 4, flexShrink: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
                background: bg, color: accent,
              }}>
                {ICONS[toast.kind]}
              </div>

              {/* Message */}
              <span style={{
                fontFamily: "'Barlow', sans-serif", fontSize: "0.75rem", fontWeight: 600,
                letterSpacing: "0.03em", flex: 1,
                color: dark ? "#C2C5CC" : "#111111",
              }}>
                {toast.message}
              </span>

              {/* Dismiss */}
              <button
                className="toast-dismiss"
                onClick={() => dismissToast(toast.id)}
                style={{
                  width: 18, height: 18, borderRadius: "50%", border: "none",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", flexShrink: 0,
                  background: dark ? "rgba(194,197,204,0.1)" : "rgba(0,0,0,0.07)",
                  color: dark ? "#7A7F87" : "#9A9AA0",
                }}
              >
                <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}