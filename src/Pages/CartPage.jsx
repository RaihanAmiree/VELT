/**
 * CartPage.jsx
 *
 * Dedicated cart page. Shows all cart items with:
 *   - Quantity stepper (− / +)
 *   - Remove item
 *   - Move to wishlist
 *   - Order summary with total
 *   - Clear all
 */

import { useNavigate } from "react-router-dom";
import { useTheme } from "../ThemeContext";
import { useCartWishlist } from "../hooks/useCartWishlist";

const dark_t  = { bg: "#0B0B0C", bgCard: "#16171A", border: "rgba(255,255,255,0.06)", text: "#C2C5CC", muted: "#7A7F87", divider: "rgba(255,255,255,0.06)" };
const light_t = { bg: "#FAFAFA", bgCard: "#FFFFFF",  border: "#D9D9DE",               text: "#111111", muted: "#6E6E73", divider: "#E8E8ED" };

function QtyButton({ onClick, children, dark }) {
  return (
    <button onClick={onClick} style={{
      width: 28, height: 28, borderRadius: 4, border: `1px solid ${dark ? "rgba(194,197,204,0.12)" : "#D9D9DE"}`,
      background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
      color: dark ? "#C2C5CC" : "#111", fontFamily: "'Barlow',sans-serif", fontSize: "1rem", fontWeight: 600,
      transition: "border-color 0.2s, background 0.2s",
    }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = "#FF5A1F"; e.currentTarget.style.color = "#FF5A1F"; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = dark ? "rgba(194,197,204,0.12)" : "#D9D9DE"; e.currentTarget.style.color = dark ? "#C2C5CC" : "#111"; }}
    >{children}</button>
  );
}

export default function CartPage() {
  const { dark } = useTheme();
  const t = dark ? dark_t : light_t;
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQty, clearCart, addToWishlist, isInWishlist, cartTotal } = useCartWishlist();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@300;400;600;700&display=swap');
        @keyframes cp-in { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
      `}</style>

      <div style={{ minHeight: "100vh", background: t.bg, transition: "background 0.5s", fontFamily: "'Barlow',sans-serif", paddingBottom: 80 }}>

        {/* Header */}
        <div style={{ padding: "clamp(32px,5vw,64px) clamp(16px,5vw,72px) 0", display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
          <button onClick={() => navigate(-1)} style={{ background: "none", border: "none", cursor: "pointer", color: "#FF5A1F", display: "flex", alignItems: "center", gap: 6, fontFamily: "'Barlow',sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", padding: 0 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
            Back
          </button>
          <div style={{ width: 1, height: 20, background: dark ? "rgba(194,197,204,0.12)" : "#D9D9DE" }} />
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 3, height: 28, background: "#FF5A1F", borderRadius: 2 }} />
            <h1 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(1.8rem,4vw,2.8rem)", letterSpacing: "0.04em", lineHeight: 1, margin: 0, color: t.text }}>Your Cart</h1>
            <span style={{ fontFamily: "'Barlow',sans-serif", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", padding: "4px 10px", borderRadius: 2, color: "#FF5A1F", background: "rgba(255,90,31,0.08)", border: "1px solid rgba(255,90,31,0.2)" }}>
              {cart.length} item{cart.length !== 1 ? "s" : ""}
            </span>
          </div>
          {cart.length > 0 && (
            <button onClick={clearCart} style={{ marginLeft: "auto", background: "none", border: `1px solid ${dark ? "rgba(194,197,204,0.12)" : "#D9D9DE"}`, borderRadius: 3, cursor: "pointer", padding: "7px 14px", fontFamily: "'Barlow',sans-serif", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: t.muted, transition: "border-color 0.2s, color 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#FF5A1F"; e.currentTarget.style.color = "#FF5A1F"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = dark ? "rgba(194,197,204,0.12)" : "#D9D9DE"; e.currentTarget.style.color = t.muted; }}
            >Clear All</button>
          )}
        </div>

        {/* Empty */}
        {cart.length === 0 && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "100px 20px", gap: 16, textAlign: "center" }}>
            <div style={{ width: 64, height: 64, borderRadius: "50%", background: dark ? "rgba(194,197,204,0.05)" : "#F1F1F1", border: `1px solid ${t.border}`, display: "flex", alignItems: "center", justifyContent: "center", color: t.muted }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
            </div>
            <p style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.6rem", letterSpacing: "0.06em", color: t.text, margin: "0 0 4px" }}>Your cart is empty</p>
            <p style={{ fontFamily: "'Barlow',sans-serif", fontSize: "0.8rem", color: t.muted, margin: "0 0 20px" }}>Add some accessories to get started</p>
            <button onClick={() => navigate("/products")} style={{ padding: "11px 24px", borderRadius: 3, border: "none", background: "#FF5A1F", color: "#fff", fontFamily: "'Barlow',sans-serif", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", cursor: "pointer" }}>
              Browse Products
            </button>
            <button onClick={() => navigate("/accessories")} style={{ padding: "11px 24px", borderRadius: 3, border: "none", background: "#FF5A1F", color: "#fff", fontFamily: "'Barlow',sans-serif", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", cursor: "pointer" }}>
              Browse Accessories
            </button>
          </div>
        )}

        {/* Items + Summary */}
        {cart.length > 0 && (
          <div style={{ padding: "clamp(24px,4vh,40px) clamp(16px,5vw,72px)", display: "grid", gridTemplateColumns: "1fr clamp(260px,28%,340px)", gap: "clamp(20px,3vw,40px)", alignItems: "start" }}>

            {/* Item list */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {cart.map((item, i) => (
                <div key={item.id} style={{ display: "flex", gap: 16, padding: 16, borderRadius: 10, background: t.bgCard, border: `1px solid ${t.border}`, animation: `cp-in 0.38s ease ${i * 60}ms both`, alignItems: "center" }}>
                  {/* Image */}
                  <div style={{ width: 80, height: 80, borderRadius: 8, overflow: "hidden", flexShrink: 0, background: dark ? "#0f1012" : "#F1F1F1", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <img src={item.image} alt={item.name} style={{ width: "90%", height: "90%", objectFit: "contain" }} />
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.2rem", letterSpacing: "0.04em", margin: "0 0 2px", color: t.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.name}</p>
                    <p style={{ fontFamily: "'Barlow',sans-serif", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", margin: "0 0 10px", color: "#FF5A1F" }}>{item.type}</p>

                    {/* Qty stepper */}
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <QtyButton onClick={() => updateQty(item.id, item.qty - 1)} dark={dark}>−</QtyButton>
                      <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.1rem", color: t.text, minWidth: 20, textAlign: "center" }}>{item.qty}</span>
                      <QtyButton onClick={() => updateQty(item.id, item.qty + 1)} dark={dark}>+</QtyButton>
                    </div>
                  </div>

                  {/* Right: price + actions */}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 10, flexShrink: 0 }}>
                    <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.4rem", letterSpacing: "0.04em", color: t.text }}>
                      {item.price}
                      {item.qty > 1 && (
                        <span style={{ fontFamily: "'Barlow',sans-serif", fontSize: "0.62rem", fontWeight: 600, color: t.muted, letterSpacing: "0.1em", marginLeft: 6 }}>×{item.qty}</span>
                      )}
                    </span>
                    <div style={{ display: "flex", gap: 6 }}>
                      {/* Move to wishlist */}
                      <button
                        onClick={() => { addToWishlist(item); removeFromCart(item.id); }}
                        title={isInWishlist(item.id) ? "Already in wishlist" : "Move to wishlist"}
                        disabled={isInWishlist(item.id)}
                        style={{ padding: "5px 10px", borderRadius: 3, border: `1px solid ${dark ? "rgba(194,197,204,0.12)" : "#D9D9DE"}`, background: "transparent", cursor: isInWishlist(item.id) ? "default" : "pointer", fontFamily: "'Barlow',sans-serif", fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: isInWishlist(item.id) ? "#e0445a" : t.muted, transition: "all 0.2s" }}
                        onMouseEnter={e => { if (!isInWishlist(item.id)) { e.currentTarget.style.borderColor = "#e0445a"; e.currentTarget.style.color = "#e0445a"; } }}
                        onMouseLeave={e => { if (!isInWishlist(item.id)) { e.currentTarget.style.borderColor = dark ? "rgba(194,197,204,0.12)" : "#D9D9DE"; e.currentTarget.style.color = t.muted; } }}
                      >
                        {isInWishlist(item.id) ? "Wishlisted" : "Wishlist"}
                      </button>
                      {/* Remove */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        title="Remove from cart"
                        style={{ width: 30, height: 30, borderRadius: 3, border: `1px solid ${dark ? "rgba(194,197,204,0.12)" : "#D9D9DE"}`, background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: t.muted, transition: "all 0.2s" }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = "#FF5A1F"; e.currentTarget.style.color = "#FF5A1F"; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = dark ? "rgba(194,197,204,0.12)" : "#D9D9DE"; e.currentTarget.style.color = t.muted; }}
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                          <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order summary */}
            <div style={{ padding: 24, borderRadius: 10, background: t.bgCard, border: `1px solid ${t.border}`, position: "sticky", top: 24 }}>
              <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.4rem", letterSpacing: "0.04em", margin: "0 0 20px", color: t.text }}>Order Summary</h2>

              <div style={{ display: "flex", flexDirection: "column", gap: 10, paddingBottom: 16, borderBottom: `1px solid ${t.divider}` }}>
                {cart.map((item) => (
                  <div key={item.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <span style={{ fontFamily: "'Barlow',sans-serif", fontSize: "0.72rem", color: t.muted, flex: 1, marginRight: 8, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {item.name} {item.qty > 1 ? `×${item.qty}` : ""}
                    </span>
                    <span style={{ fontFamily: "'Barlow',sans-serif", fontSize: "0.72rem", fontWeight: 700, color: t.text, flexShrink: 0 }}>
                      {item.price}
                    </span>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "16px 0 20px" }}>
                <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.1rem", letterSpacing: "0.06em", color: t.text }}>Total</span>
                <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.6rem", letterSpacing: "0.04em", color: "#FF5A1F" }}>
                  ${cartTotal.toFixed(2)}
                </span>
              </div>

              <button style={{ width: "100%", padding: "13px 0", borderRadius: 3, border: "none", background: "#FF5A1F", color: "#fff", fontFamily: "'Barlow',sans-serif", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer", transition: "background 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "#FF6A2E"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "#FF5A1F"; }}
              >
                Proceed to Checkout
              </button>
              <button onClick={() => navigate("/accessories")} style={{ width: "100%", marginTop: 10, padding: "11px 0", borderRadius: 3, border: `1px solid ${dark ? "rgba(194,197,204,0.12)" : "#D9D9DE"}`, background: "transparent", color: t.muted, fontFamily: "'Barlow',sans-serif", fontSize: "0.63rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", cursor: "pointer", transition: "border-color 0.2s, color 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#FF5A1F"; e.currentTarget.style.color = "#FF5A1F"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = dark ? "rgba(194,197,204,0.12)" : "#D9D9DE"; e.currentTarget.style.color = t.muted; }}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}