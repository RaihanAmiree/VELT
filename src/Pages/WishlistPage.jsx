/**
 * WishlistPage.jsx
 *
 * Dedicated wishlist page. Shows all wishlisted items with:
 *   - Move to cart
 *   - Remove from wishlist
 *   - Clear all
 */

import { useNavigate } from "react-router-dom";
import { useTheme } from "../ThemeContext";
import { useCartWishlist } from "../hooks/useCartWishlist";

const dark_t  = { bg: "#0B0B0C", bgCard: "#16171A", border: "rgba(255,255,255,0.06)", text: "#C2C5CC", muted: "#7A7F87", divider: "rgba(255,255,255,0.06)" };
const light_t = { bg: "#FAFAFA", bgCard: "#FFFFFF",  border: "#D9D9DE",               text: "#111111", muted: "#6E6E73", divider: "#E8E8ED" };

export default function WishlistPage() {
  const { dark } = useTheme();
  const t = dark ? dark_t : light_t;
  const navigate = useNavigate();
  const { wishlist, removeFromWishlist, clearWishlist, moveToCart, isInCart } = useCartWishlist();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@300;400;600;700&display=swap');
        @keyframes wp-in { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }

        .wp-card { transition: border-color 0.25s, box-shadow 0.25s; }
        .wp-card:hover { border-color: rgba(255,90,31,0.28) !important; }
      `}</style>

      <div
  style={{
    minHeight: "100vh",
    background: t.bg,
    transition: "background 0.5s",
    fontFamily: "'Barlow', sans-serif",
    paddingTop: "clamp(64px, 8vh, 96px)", // 👈 space for navbar
    paddingBottom: "80px",
    boxSizing: "border-box",
  }}
>

        {/* Header */}
        <div style={{ padding: "clamp(32px,5vw,64px) clamp(16px,5vw,72px) 0", display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
          <button onClick={() => navigate(-1)} style={{ background: "none", border: "none", cursor: "pointer", color: "#FF5A1F", display: "flex", alignItems: "center", gap: 6, fontFamily: "'Barlow',sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", padding: 0 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
            Back
          </button>
          <div style={{ width: 1, height: 20, background: dark ? "rgba(194,197,204,0.12)" : "#D9D9DE" }} />
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 3, height: 28, background: "#e0445a", borderRadius: 2 }} />
            <h1 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(1.8rem,4vw,2.8rem)", letterSpacing: "0.04em", lineHeight: 1, margin: 0, color: t.text }}>Wishlist</h1>
            <span style={{ fontFamily: "'Barlow',sans-serif", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", padding: "4px 10px", borderRadius: 2, color: "#e0445a", background: "rgba(224,68,90,0.08)", border: "1px solid rgba(224,68,90,0.2)" }}>
              {wishlist.length} item{wishlist.length !== 1 ? "s" : ""}
            </span>
          </div>
          {wishlist.length > 0 && (
            <button onClick={clearWishlist} 
            style={{ marginLeft: "auto", background: "none", border: `1px solid ${dark ? "rgba(194,197,204,0.12)" : "#D9D9DE"}`, borderRadius: 3, cursor: "pointer", padding: "7px 14px", fontFamily: "'Barlow',sans-serif", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: t.muted, transition: "border-color 0.2s, color 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#e0445a"; e.currentTarget.style.color = "#e0445a"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = dark ? "rgba(194,197,204,0.12)" : "#D9D9DE"; e.currentTarget.style.color = t.muted; }}
            >Clear All</button>
          )}
        </div>

        {/* Empty */}
        {wishlist.length === 0 && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "100px 20px", gap: 16, textAlign: "center" }}>
            <div style={{ width: 64, height: 64, borderRadius: "50%", background: dark ? "rgba(194,197,204,0.05)" : "#F1F1F1", border: `1px solid ${t.border}`, display: "flex", alignItems: "center", justifyContent: "center", color: t.muted }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </div>
            <p style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.6rem", letterSpacing: "0.06em", color: t.text, margin: "0 0 4px" }}>Your wishlist is empty</p>
            <p style={{ fontFamily: "'Barlow',sans-serif", fontSize: "0.8rem", color: t.muted, margin: "0 0 20px" }}>Heart any item on the accessories page to save it here</p>
            <button onClick={() => navigate("/products")} style={{ padding: "11px 24px", borderRadius: 3, border: "none", background: "#e0445a", color: "#fff", fontFamily: "'Barlow',sans-serif", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", cursor: "pointer" }}>
              Browse Products
            </button>
            <button onClick={() => navigate("/accessories")} style={{ padding: "11px 24px", borderRadius: 3, border: "none", background: "#e0445a", color: "#fff", fontFamily: "'Barlow',sans-serif", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", cursor: "pointer" }}>
              Browse Accessories
            </button>
          </div>
        )}

        {/* Grid */}
        {wishlist.length > 0 && (
          <div style={{ padding: "clamp(24px,4vh,40px) clamp(16px,5vw,72px)" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(clamp(240px,22vw,300px),1fr))", gap: "clamp(14px,2vw,22px)" }}>
              {wishlist.map((item, i) => (
                <div
                  key={item.id}
                  className="wp-card"
                  style={{
                    borderRadius: 10, background: t.bgCard,
                    border: `1px solid ${t.border}`,
                    overflow: "hidden", display: "flex", flexDirection: "column",
                    animation: `wp-in 0.4s ease ${i * 55}ms both`,
                  }}
                >
                  {/* Image */}
                  <div style={{ height: 180, background: dark ? "#0f1012" : "#F1F1F1", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
                    <span style={{ position: "absolute", top: 12, left: 12, zIndex: 2, fontFamily: "'Barlow',sans-serif", fontSize: "0.55rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", padding: "3px 8px", borderRadius: 2, color: "#FF5A1F", border: "1px solid rgba(255,90,31,0.25)", background: "rgba(255,90,31,0.08)" }}>{item.type}</span>
                    <img src={item.image} alt={item.name} style={{ width: "80%", height: "100%", objectFit: "contain" }} />
                  </div>

                  {/* Body */}
                  <div style={{ padding: "14px 16px", flex: 1 }}>
                    <h3 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.3rem", letterSpacing: "0.04em", lineHeight: 1, margin: "0 0 4px", color: t.text }}>{item.name}</h3>
                    <p style={{ fontFamily: "'Barlow',sans-serif", fontSize: "0.67rem", color: t.muted, margin: 0, lineHeight: 1.5 }}>{item.tagline}</p>
                  </div>

                  {/* Footer */}
                  <div style={{ padding: "12px 16px 16px", borderTop: `1px solid ${t.divider}`, display: "flex", flexDirection: "column", gap: 8 }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                      <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.5rem", letterSpacing: "0.04em", color: t.text }}>{item.price}</span>
                      <span style={{ fontFamily: "'Barlow',sans-serif", fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: t.muted }}>incl. tax</span>
                    </div>

                    <div style={{ display: "flex", gap: 8 }}>
                      {/* Move to cart */}
                      <button
                        onClick={() => moveToCart(item.id)}
                        disabled={isInCart(item.id)}
                        style={{
                          flex: 1, padding: "9px 0", borderRadius: 3, border: "none", cursor: isInCart(item.id) ? "default" : "pointer",
                          background: isInCart(item.id) ? "rgba(255,90,31,0.1)" : "#FF5A1F",
                          color: isInCart(item.id) ? "#FF5A1F" : "#fff",
                          fontFamily: "'Barlow',sans-serif", fontSize: "0.6rem", fontWeight: 700,
                          letterSpacing: "0.16em", textTransform: "uppercase",
                          border: isInCart(item.id) ? "1px solid rgba(255,90,31,0.3)" : "none",
                          transition: "background 0.2s",
                        }}
                        onMouseEnter={e => { if (!isInCart(item.id)) e.currentTarget.style.background = "#FF6A2E"; }}
                        onMouseLeave={e => { if (!isInCart(item.id)) e.currentTarget.style.background = "#FF5A1F"; }}
                      >
                        {isInCart(item.id) ? "In Cart" : "Move to Cart"}
                      </button>

                      {/* Remove */}
                      <button
                        onClick={() => removeFromWishlist(item.id)}
                        title="Remove from wishlist"
                        style={{ width: 36, height: 36, borderRadius: 3, border: `1px solid ${dark ? "rgba(194,197,204,0.12)" : "#D9D9DE"}`, background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: t.muted, transition: "all 0.2s", flexShrink: 0 }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = "#e0445a"; e.currentTarget.style.color = "#e0445a"; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = dark ? "rgba(194,197,204,0.12)" : "#D9D9DE"; e.currentTarget.style.color = t.muted; }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}