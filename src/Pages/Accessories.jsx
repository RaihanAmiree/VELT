import { useState, useEffect, useRef } from "react";
import { useTheme } from "../ThemeContext";

// ── Theme tokens ──────────────────────────────────────────────
const darkTheme = {
  bgPrimary: "#0B0B0C", bgSecondary: "#16171A",
  textPrimary: "#C2C5CC", textSecondary: "#7A7F87",
  accent: "#FF5A1F", accentHover: "#FF6A2E",
  divider: "rgba(255,255,255,0.06)",
  cardBg: "#16171A", cardBorder: "rgba(255,255,255,0.05)",
};
const lightTheme = {
  bgPrimary: "#FAFAFA", bgSecondary: "#F1F1F1",
  textPrimary: "#111111", textSecondary: "#6E6E73",
  textMuted: "#9A9AA0", accent: "#FF5A1F", accentHover: "#FF6A2E",
  accentCopper: "#C46A2D", divider: "#D9D9DE",
  cardBg: "#FFFFFF", cardBorder: "#D9D9DE",
  navBg: "#0F0F10",
};

// ── Data ──────────────────────────────────────────────────────
const ACCESSORIES = [
  { id:"helmet-pro-x1", name:"ProX Helmet", type:"Helmets", tagline:"Full-face protection engineered for speed.", price:"$189", image:"https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600&q=80", badge:"Best Seller", specs:[{label:"Rating",value:"ECE 22.06"},{label:"Weight",value:"1.2kg"},{label:"Shell",value:"Carbon"}] },
  { id:"helmet-trail-t3", name:"Trail T3 Helmet", type:"Helmets", tagline:"Open-face agility for off-road adventures.", price:"$129", image:"https://images.unsplash.com/photo-1575654118413-8e5d5b982e0e?w=600&q=80", badge:null, specs:[{label:"Rating",value:"DOT"},{label:"Weight",value:"0.98kg"},{label:"Shell",value:"ABS"}] },
  { id:"helmet-urban-u7", name:"Urban U7 Helmet", type:"Helmets", tagline:"Sleek street style meets certified safety.", price:"$149", image:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80", badge:"New", specs:[{label:"Rating",value:"ECE 22.05"},{label:"Weight",value:"1.05kg"},{label:"Shell",value:"Fiberglass"}] },
  { id:"gloves-grip-g2", name:"Grip G2 Gloves", type:"Riding Gear", tagline:"Knuckle-armored grip for every condition.", price:"$59", image:"https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=600&q=80", badge:null, specs:[{label:"Material",value:"Leather"},{label:"Protection",value:"D3O"},{label:"Sizes",value:"S–XXL"}] },
  { id:"gloves-lite-l1", name:"Lite L1 Gloves", type:"Riding Gear", tagline:"Lightweight touch-screen compatible riding gloves.", price:"$39", image:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80", badge:null, specs:[{label:"Material",value:"Mesh"},{label:"Protection",value:"Palm Pad"},{label:"Sizes",value:"S–XL"}] },
  { id:"jacket-rider-r5", name:"Rider R5 Jacket", type:"Riding Gear", tagline:"CE Level 2 armored jacket built for the bold.", price:"$229", image:"https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&q=80", badge:"Best Seller", specs:[{label:"Armor",value:"CE Lv2"},{label:"Material",value:"Cordura"},{label:"Sizes",value:"S–3XL"}] },
  { id:"jacket-mesh-m3", name:"Mesh M3 Jacket", type:"Riding Gear", tagline:"Ventilated summer riding with full protection.", price:"$179", image:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80", badge:"New", specs:[{label:"Armor",value:"CE Lv1"},{label:"Material",value:"Mesh"},{label:"Sizes",value:"S–2XL"}] },
  { id:"charger-fast-f60", name:"FastCharge F60", type:"Chargers", tagline:"60A smart charger with auto-shutoff and diagnostics.", price:"$119", image:"https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=600&q=80", badge:"Best Seller", specs:[{label:"Output",value:"60A"},{label:"Voltage",value:"48–84V"},{label:"Smart",value:"Yes"}] },
  { id:"charger-portable-p20", name:"Portable P20", type:"Chargers", tagline:"Compact 20A charger for trail and travel.", price:"$69", image:"https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=600&q=80", badge:null, specs:[{label:"Output",value:"20A"},{label:"Voltage",value:"36–72V"},{label:"Smart",value:"Yes"}] },
  { id:"charger-solar-s10", name:"Solar S10 Charger", type:"Chargers", tagline:"Off-grid solar charging for the true explorer.", price:"$199", image:"https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=80", badge:"New", specs:[{label:"Output",value:"10A"},{label:"Voltage",value:"36–60V"},{label:"Smart",value:"Yes"}] },
  { id:"bag-tank-t1", name:"Tank Bag T1", type:"Bags & Storage", tagline:"Magnetic mount tank bag with waterproof shell.", price:"$89", image:"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80", badge:null, specs:[{label:"Capacity",value:"8L"},{label:"Mount",value:"Magnetic"},{label:"Rating",value:"IPX4"}] },
  { id:"bag-tail-r3", name:"Tail Bag R3", type:"Bags & Storage", tagline:"Expandable tail bag for long-distance touring.", price:"$109", image:"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80", badge:"Best Seller", specs:[{label:"Capacity",value:"20–30L"},{label:"Mount",value:"Strap"},{label:"Rating",value:"IPX5"}] },
  { id:"light-bar-led-x", name:"LED Light Bar X", type:"Lighting", tagline:"Ultra-bright 48W auxiliary light bar for night rides.", price:"$79", image:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80", badge:null, specs:[{label:"Power",value:"48W"},{label:"Beam",value:"Flood+Spot"},{label:"IP",value:"IP68"}] },
  { id:"light-halo-h2", name:"Halo H2 Headlight", type:"Lighting", tagline:"DRL halo headlight upgrade for any VELT model.", price:"$59", image:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80", badge:"New", specs:[{label:"Power",value:"20W"},{label:"Type",value:"LED"},{label:"IP",value:"IP65"}] },
];

const ALL = "All";
const TYPES = [ALL, ...new Set(ACCESSORIES.map(a => a.type))];

// ── Add to Cart Button ────────────────────────────────────────
function AddToCartButton({ dark }) {
  const [state, setState] = useState("idle"); // idle | adding | added

  const handleClick = (e) => {
    e.stopPropagation();
    if (state !== "idle") return;
    setState("adding");
    setTimeout(() => setState("added"), 600);
    setTimeout(() => setState("idle"), 2400);
  };

  const isAdding = state === "adding";
  const isAdded  = state === "added";

  return (
    <>
      <style>{`
        @keyframes atc-spin {
          to { transform: rotate(360deg); }
        }
        @keyframes atc-pop {
          0%   { transform: scale(1); }
          40%  { transform: scale(1.06); }
          100% { transform: scale(1); }
        }
        @keyframes atc-check-draw {
          from { stroke-dashoffset: 20; }
          to   { stroke-dashoffset: 0; }
        }
      `}</style>
      <button
        onClick={handleClick}
        style={{
          width: "100%",
          display: "flex", alignItems: "center", justifyContent: "center",
          gap: 9,
          padding: "10px 16px",
          borderRadius: 3,
          border: isAdded
            ? "1px solid rgba(255,90,31,0.35)"
            : `1px solid ${dark ? "rgba(194,197,204,0.12)" : "#D9D9DE"}`,
          background: isAdded
            ? "rgba(255,90,31,0.08)"
            : isAdding
              ? (dark ? "rgba(255,90,31,0.12)" : "rgba(255,90,31,0.07)")
              : (dark ? "rgba(194,197,204,0.05)" : "#F1F1F1"),
          cursor: state === "idle" ? "pointer" : "default",
          transition: "background 0.3s ease, border-color 0.3s ease",
          animation: isAdded ? "atc-pop 0.35s ease" : "none",
          position: "relative", overflow: "hidden",
        }}
      >
        {/* Shimmer sweep on adding */}
        {isAdding && (
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(90deg, transparent 0%, rgba(255,90,31,0.12) 50%, transparent 100%)",
            animation: "atc-shimmer 0.6s ease forwards",
          }} />
        )}

        {/* Icon */}
        <div style={{
          width: 16, height: 16, flexShrink: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: isAdded ? "#FF5A1F" : isAdding ? "#FF5A1F" : (dark ? "#7A7F87" : "#9A9AA0"),
          transition: "color 0.25s",
        }}>
          {isAdding ? (
            // Spinner
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
              style={{ animation: "atc-spin 0.6s linear infinite" }}>
              <path d="M12 2a10 10 0 0 1 10 10" opacity="0.3" />
              <path d="M12 2a10 10 0 0 1 10 10" strokeDasharray="16" strokeDashoffset="0" />
            </svg>
          ) : isAdded ? (
            // Checkmark
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FF5A1F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"
                strokeDasharray="20" strokeDashoffset="0"
                style={{ animation: "atc-check-draw 0.3s ease forwards" }}
              />
            </svg>
          ) : (
            // Cart icon
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
          )}
        </div>

        {/* Label */}
        <span style={{
          fontFamily: "'Barlow',sans-serif", fontSize: "0.65rem", fontWeight: 700,
          letterSpacing: "0.18em", textTransform: "uppercase",
          color: isAdded ? "#FF5A1F" : isAdding ? "#FF5A1F" : (dark ? "#7A7F87" : "#6E6E73"),
          transition: "color 0.25s",
          position: "relative", zIndex: 1,
        }}>
          {isAdding ? "Adding…" : isAdded ? "Added!" : "Add to Cart"}
        </span>
      </button>
    </>
  );
}

// ── AccessoryCard ─────────────────────────────────────────────
function AccessoryCard({ item }) {
  const { dark } = useTheme();
  const t = dark ? darkTheme : lightTheme;
  const [hovered, setHovered] = useState(false);
  const [imgErr, setImgErr] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 12, overflow: "hidden", cursor: "pointer",
        display: "flex", flexDirection: "column",
        background: t.cardBg,
        border: `1px solid ${hovered ? "rgba(255,90,31,0.32)" : t.cardBorder}`,
        boxShadow: hovered
          ? dark ? "0 24px 60px rgba(0,0,0,0.6),0 0 0 1px rgba(255,90,31,0.15)" : "0 24px 60px rgba(0,0,0,0.1),0 0 0 1px rgba(255,90,31,0.1)"
          : dark ? "0 4px 20px rgba(0,0,0,0.4)" : "0 2px 12px rgba(0,0,0,0.05)",
        transform: hovered ? "translateY(-8px) scale(1.01)" : "translateY(0) scale(1)",
        transition: "transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease, border-color 0.3s ease",
      }}
    >
      {/* Image */}
      <div style={{
        position: "relative", height: 200, overflow: "hidden",
        display: "flex", alignItems: "center", justifyContent: "center",
        background: dark ? "#0f1012" : "#F1F1F1",
      }}>
        {/* Type badge */}
        <span style={{
          position: "absolute", top: 14, left: 14, zIndex: 2,
          fontFamily: "'Barlow',sans-serif", fontSize: "0.57rem", fontWeight: 700,
          letterSpacing: "0.18em", textTransform: "uppercase",
          padding: "4px 10px", borderRadius: 2,
          color: "#FF5A1F", border: "1px solid rgba(255,90,31,0.25)",
          background: "rgba(255,90,31,0.08)", backdropFilter: "blur(6px)",
        }}>{item.type}</span>

        {/* Badge top-right */}
        {item.badge && (
          <span style={{
            position: "absolute", top: 14, right: 14, zIndex: 2,
            fontFamily: "'Barlow',sans-serif", fontSize: "0.57rem", fontWeight: 700,
            letterSpacing: "0.14em", textTransform: "uppercase",
            padding: "4px 9px", borderRadius: 2, backdropFilter: "blur(6px)",
            ...(item.badge === "New"
              ? { background: "rgba(255,90,31,0.12)", color: "#FF5A1F", border: "1px solid rgba(255,90,31,0.25)" }
              : { background: dark ? "rgba(194,197,204,0.08)" : "rgba(0,0,0,0.06)", color: t.textPrimary, border: `1px solid ${t.cardBorder}` }
            ),
          }}>{item.badge}</span>
        )}

        {/* Glow */}
        <div style={{
          position: "absolute", bottom: -10, left: "50%", transform: "translateX(-50%)",
          width: "65%", height: "45%", borderRadius: "50%",
          filter: "blur(22px)", pointerEvents: "none", zIndex: 0,
          background: "radial-gradient(ellipse, rgba(255,90,31,0.16) 0%, transparent 70%)",
          opacity: hovered ? 1 : 0.35,
          transition: "opacity 0.35s ease",
        }} />

        {!imgErr ? (
          <img
            src={item.image} alt={item.name}
            onError={() => setImgErr(true)}
            style={{
              width: "85%", height: "100%", objectFit: "contain",
              position: "relative", zIndex: 1,
              filter: dark ? "drop-shadow(0 14px 28px rgba(0,0,0,0.65))" : "drop-shadow(0 8px 18px rgba(0,0,0,0.1))",
              transform: hovered ? "scale(1.08) translateY(-5px)" : "scale(1) translateY(0)",
              transition: "transform 0.55s cubic-bezier(0.22,1,0.36,1)",
            }}
          />
        ) : (
          <div style={{ opacity: 0.15, width: "70%", height: "60%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg viewBox="0 0 80 60" fill="none" width="100%" height="100%">
              <rect x="10" y="10" width="60" height="40" rx="5" fill={dark ? "#C2C5CC" : "#111"} />
              <rect x="22" y="22" width="36" height="24" rx="3" fill={dark ? "#0B0B0C" : "#F1F1F1"} />
            </svg>
          </div>
        )}
      </div>

      {/* Body */}
      <div style={{ padding: "18px 20px 0", display: "flex", flexDirection: "column", gap: 9, flex: 1 }}>
        <h3 style={{
          fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(1.45rem,2.5vw,1.85rem)",
          letterSpacing: "0.04em", lineHeight: 1, margin: 0,
          color: t.textPrimary, transition: "color 0.3s",
        }}>{item.name}</h3>
        <p style={{
          fontFamily: "'Barlow',sans-serif", fontSize: "0.7rem", fontWeight: 400,
          letterSpacing: "0.07em", lineHeight: 1.5, margin: 0,
          color: t.textSecondary,
        }}>{item.tagline}</p>

        {/* Specs */}
        {item.specs?.length > 0 && (
          <div style={{
            display: "flex", marginTop: 4,
            borderTop: `1px solid ${t.divider}`,
          }}>
            {item.specs.slice(0, 3).map((s, i) => (
              <div key={s.label} style={{
                flex: 1, display: "flex", flexDirection: "column", gap: 2,
                padding: "9px 0", paddingLeft: i > 0 ? 11 : 0,
                marginLeft: i > 0 ? 11 : 0,
                borderLeft: i > 0 ? `1px solid ${t.divider}` : "none",
              }}>
                <span style={{
                  fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.1rem",
                  letterSpacing: "0.04em", lineHeight: 1, color: t.textPrimary,
                }}>{s.value}</span>
                <span style={{
                  fontFamily: "'Barlow',sans-serif", fontSize: "0.56rem", fontWeight: 700,
                  letterSpacing: "0.18em", textTransform: "uppercase",
                  color: dark ? "#7A7F87" : "#9A9AA0",
                }}>{s.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Price + Add to Cart footer */}
      <div style={{
        padding: "14px 16px 16px",
        margin: "12px 0 0",
        borderTop: `1px solid ${t.divider}`,
        display: "flex", flexDirection: "column", gap: 10,
      }}>
        {/* Price row */}
        <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
          <span style={{
            fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.7rem",
            letterSpacing: "0.04em", lineHeight: 1,
            color: t.textPrimary, transition: "color 0.3s",
          }}>{item.price}</span>
          <span style={{
            fontFamily: "'Barlow',sans-serif", fontSize: "0.6rem", fontWeight: 700,
            letterSpacing: "0.14em", textTransform: "uppercase",
            color: dark ? "#7A7F87" : "#9A9AA0",
          }}>incl. tax</span>
        </div>

        {/* Add to Cart button */}
        <AddToCartButton dark={dark} />
      </div>
    </div>
  );
}

// ── Hero ──────────────────────────────────────────────────────
function AccessoriesHero() {
  const { dark } = useTheme();
  const t = dark ? darkTheme : lightTheme;
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const el = document.getElementById("ap-scroll-root");
    if (!el) return;
    const onScroll = () => setScrollY(el.scrollTop);
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const parallax = scrollY * 0.28;

  return (
    <div style={{
      position: "relative", height: "55vh", minHeight: 380, maxHeight: 560,
      overflow: "hidden", display: "flex", alignItems: "center",
    }}>
      {/* BG */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "url(https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=1920&q=80)",
        backgroundSize: "cover", backgroundPosition: "center 35%",
        transform: `translateY(${parallax}px)`,
        filter: dark ? "brightness(0.52)" : "brightness(0.8) saturate(0.35)",
        transition: "filter 0.6s ease",
      }} />
      {/* Overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: dark
          ? "linear-gradient(to bottom, rgba(11,11,12,0.5) 0%, rgba(11,11,12,0.72) 60%, rgba(11,11,12,1) 100%)"
          : "linear-gradient(to bottom, rgba(250,250,250,0.42) 0%, rgba(250,250,250,0.66) 60%, rgba(250,250,250,1) 100%)",
      }} />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 2, paddingLeft: "clamp(28px,6vw,100px)", paddingTop: 80 }}>
        <p style={{
          fontFamily: "'Barlow',sans-serif", fontSize: "0.68rem", fontWeight: 700,
          letterSpacing: "0.3em", textTransform: "uppercase",
          color: "#FF5A1F", display: "flex", alignItems: "center", gap: 12,
          margin: "0 0 16px",
          animation: "ap-up 0.55s ease 0.1s both",
        }}>
          <span style={{ width: 24, height: 1.5, background: "#FF5A1F", display: "inline-block" }} />
          VELT DRT Gear
        </p>
        <h1 style={{
          fontFamily: "'Bebas Neue',sans-serif",
          fontSize: "clamp(3.2rem,8vw,7rem)",
          lineHeight: 0.92, letterSpacing: "0.03em", margin: "0 0 20px",
          color: t.textPrimary, transition: "color 0.5s",
          animation: "ap-up 0.65s ease 0.2s both",
        }}>ACCESSORIES</h1>
        <div style={{
          width: 44, height: 1.5, background: "#FF5A1F", marginBottom: 20,
          animation: "ap-line 0.5s ease 0.32s both",
        }} />
        <p style={{
          fontFamily: "'Barlow',sans-serif", fontSize: "0.72rem", fontWeight: 600,
          letterSpacing: "0.2em", textTransform: "uppercase",
          color: t.textSecondary, transition: "color 0.5s",
          animation: "ap-up 0.55s ease 0.4s both",
          margin: 0,
        }}>Everything the ride demands.</p>

        {/* Type pills */}
        <div style={{
          display: "flex", gap: 8, flexWrap: "wrap", marginTop: 24,
          animation: "ap-up 0.55s ease 0.52s both",
        }}>
          {TYPES.filter(t => t !== ALL).map(type => (
            <span key={type} style={{
              fontFamily: "'Barlow',sans-serif", fontSize: "0.58rem", fontWeight: 700,
              letterSpacing: "0.16em", textTransform: "uppercase",
              padding: "5px 12px", borderRadius: 2,
              border: "1px solid rgba(255,90,31,0.22)",
              background: "rgba(255,90,31,0.07)", color: "#FF5A1F",
              backdropFilter: "blur(6px)",
            }}>{type}</span>
          ))}
        </div>
      </div>

      {/* Breadcrumb */}
      <div style={{
        position: "absolute", bottom: 28, left: "clamp(28px,6vw,100px)", zIndex: 2,
        fontFamily: "'Barlow',sans-serif", fontSize: "0.65rem", fontWeight: 600,
        letterSpacing: "0.16em", textTransform: "uppercase",
        display: "flex", alignItems: "center", gap: 8,
        animation: "ap-up 0.5s ease 0.5s both",
      }}>
        <span style={{ color: dark ? "rgba(194,197,204,0.4)" : "#9A9AA0" }}>Home</span>
        <span style={{ color: "#FF5A1F" }}>›</span>
        <span style={{ color: t.textPrimary }}>Accessories</span>
      </div>

      {/* Scroll hint */}
      <div style={{
        position: "absolute", bottom: 28, right: "clamp(24px,4vw,64px)", zIndex: 2,
        display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
        animation: "ap-up 0.5s ease 0.6s both",
      }}>
        <span style={{
          fontFamily: "'Barlow',sans-serif", fontSize: "0.56rem", fontWeight: 700,
          letterSpacing: "0.2em", textTransform: "uppercase",
          writingMode: "vertical-rl", color: t.textSecondary,
        }}>Scroll</span>
        <div style={{
          width: 1, height: 36,
          background: "linear-gradient(to bottom, #FF5A1F, transparent)",
          animation: "ap-scroll-pulse 1.8s ease-in-out infinite",
        }} />
      </div>
    </div>
  );
}

// ── Filter bar ────────────────────────────────────────────────
function AccessoriesFilter({ activeType, setActiveType, query, setQuery, filteredCount }) {
  const { dark } = useTheme();
  const t = dark ? darkTheme : lightTheme;
  const inputRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "/" && document.activeElement !== inputRef.current) {
        e.preventDefault(); inputRef.current?.focus();
      }
      if (e.key === "Escape") { setQuery(""); inputRef.current?.blur(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setQuery]);

  return (
    <div style={{
      padding: "clamp(24px,4vh,44px) clamp(16px,5vw,72px) 0",
      background: t.bgPrimary, transition: "background 0.5s",
      display: "flex", flexDirection: "column", gap: 20,
    }}>
      {/* Search row */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: 1, minWidth: 220, maxWidth: 480 }}>
          <span style={{
            position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)",
            pointerEvents: "none", color: query ? "#FF5A1F" : t.textSecondary,
            transition: "color 0.25s",
          }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
            </svg>
          </span>
          <input
            ref={inputRef}
            type="text"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            name="accessories-search"
            placeholder="Search accessories…"
            value={query}
            onChange={e => setQuery(e.target.value)}
            style={{
              width: "100%", boxSizing: "border-box",
              padding: "12px 44px 12px 44px",
              fontFamily: "'Barlow',sans-serif", fontSize: "0.82rem", fontWeight: 500,
              letterSpacing: "0.05em", borderRadius: 3, outline: "none",
              background: t.cardBg, color: t.textPrimary,
              border: `1px solid ${query ? "rgba(255,90,31,0.45)" : t.cardBorder}`,
              transition: "border-color 0.25s, box-shadow 0.25s, background 0.4s",
            }}
            onFocus={e => { e.target.style.boxShadow = "0 0 0 1px #FF5A1F, 0 0 20px rgba(255,90,31,0.1)"; }}
            onBlur={e => { e.target.style.boxShadow = "none"; }}
          />
          {query && (
            <button
              onClick={() => { setQuery(""); inputRef.current?.focus(); }}
              style={{
                position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
                width: 24, height: 24, borderRadius: "50%", border: "none",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer",
                background: dark ? "rgba(194,197,204,0.08)" : "rgba(0,0,0,0.06)",
                color: t.textSecondary,
              }}
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        <span style={{
          fontFamily: "'Barlow',sans-serif", fontSize: "0.62rem", fontWeight: 700,
          letterSpacing: "0.2em", textTransform: "uppercase",
          padding: "5px 13px", borderRadius: 2,
          color: "#FF5A1F", border: "1px solid rgba(255,90,31,0.22)",
          background: "rgba(255,90,31,0.07)", whiteSpace: "nowrap",
        }}>
          {filteredCount} item{filteredCount !== 1 ? "s" : ""}
        </span>

        {!query && (
          <span style={{
            fontFamily: "'Barlow',sans-serif", fontSize: "0.6rem", fontWeight: 600,
            letterSpacing: "0.18em", textTransform: "uppercase",
            color: dark ? "rgba(194,197,204,0.25)" : "#9A9AA0",
            display: "flex", alignItems: "center", gap: 5,
          }}>
            Press
            <span style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              width: 17, height: 17, borderRadius: 3,
              fontSize: "0.62rem", fontWeight: 700,
              background: dark ? "rgba(194,197,204,0.08)" : "#F1F1F1",
              color: t.textSecondary, border: `1px solid ${t.cardBorder}`,
            }}>/</span>
            to search
          </span>
        )}
      </div>

      {/* Type pills */}
      <div style={{
        display: "flex", gap: 8, flexWrap: "wrap",
        paddingBottom: "clamp(16px,3vh,28px)",
        borderBottom: `1px solid ${t.divider}`,
      }}>
        {TYPES.map(type => {
          const isActive = activeType === type;
          return (
            <TypePill key={type} label={type} isActive={isActive} onClick={() => setActiveType(type)} dark={dark} t={t} />
          );
        })}
      </div>
    </div>
  );
}

function TypePill({ label, isActive, onClick, dark, t }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        fontFamily: "'Barlow',sans-serif", fontSize: "0.62rem", fontWeight: 700,
        letterSpacing: "0.18em", textTransform: "uppercase",
        padding: "7px 16px", borderRadius: 2, border: "1px solid",
        cursor: "pointer", transition: "all 0.22s ease",
        ...(isActive
          ? { background: "#FF5A1F", borderColor: "#FF5A1F", color: "#fff" }
          : hov
            ? { background: "#FF5A1F", borderColor: "#FF5A1F", color: "#fff" }
            : { background: "transparent", borderColor: dark ? "rgba(194,197,204,0.12)" : "#D9D9DE", color: t.textSecondary }
        ),
      }}
    >{label}</button>
  );
}

// ── Empty state ───────────────────────────────────────────────
function EmptyState({ query }) {
  const { dark } = useTheme();
  const t = dark ? darkTheme : lightTheme;
  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", padding: "80px 20px", gap: 16, textAlign: "center",
    }}>
      <div style={{
        width: 64, height: 64, borderRadius: "50%",
        background: dark ? "rgba(194,197,204,0.05)" : "#F1F1F1",
        border: `1px solid ${t.cardBorder}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        color: t.textSecondary,
      }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
        </svg>
      </div>
      <div>
        <p style={{
          fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.6rem",
          letterSpacing: "0.06em", color: t.textPrimary, margin: "0 0 6px",
        }}>No results{query ? ` for "${query}"` : ""}</p>
        <p style={{ fontFamily: "'Barlow',sans-serif", fontSize: "0.8rem", color: t.textSecondary, margin: 0 }}>
          Try a different name or filter
        </p>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────
export default function AccessoriesPage() {
  const { dark } = useTheme();
  const [query, setQuery] = useState("");
  const [activeType, setActiveType] = useState(ALL);
  const [gridKey, setGridKey] = useState(0);
  const t = dark ? darkTheme : lightTheme;

  const q = query.toLowerCase().trim();
  const filtered = ACCESSORIES.filter(item => {
    const matchType = activeType === ALL || item.type === activeType;
    const matchQ = !q || item.name.toLowerCase().includes(q) || item.type.toLowerCase().includes(q) || item.tagline.toLowerCase().includes(q);
    return matchType && matchQ;
  });

  // Only re-trigger grid animation when filter TYPE changes, not every keystroke
  const prevTypeRef = useRef(activeType);
  useEffect(() => {
    if (prevTypeRef.current !== activeType) {
      prevTypeRef.current = activeType;
      setGridKey(k => k + 1);
    }
  }, [activeType]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@300;400;600;700&display=swap');
        @keyframes ap-up {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes ap-line {
          from { opacity: 0; transform: scaleX(0); transform-origin: left; }
          to   { opacity: 1; transform: scaleX(1); transform-origin: left; }
        }
        @keyframes ap-scroll-pulse {
          0%,100% { opacity: 0.4; transform: scaleY(1); }
          50%      { opacity: 1;   transform: scaleY(1.2); }
        }
        @keyframes ap-card-in {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .ap-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(clamp(200px,22vw,280px),1fr));
          gap: clamp(14px,2.2vw,24px);
        }
      `}</style>

      <div
        id="ap-scroll-root"
        style={{
          minHeight: "100vh", height: "100vh", overflowY: "auto",
          background: t.bgPrimary, transition: "background 0.5s",
          fontFamily: "'Barlow',sans-serif",
        }}
      >
        {/* Hero */}
        <AccessoriesHero />

        {/* Filter */}
        <AccessoriesFilter
          activeType={activeType}
          setActiveType={(type) => { setActiveType(type); }}
          query={query}
          setQuery={setQuery}
          filteredCount={filtered.length}
        />

        {/* Grid section */}
        <div style={{
          padding: "clamp(32px,5vh,52px) clamp(16px,5vw,72px) clamp(56px,9vh,96px)",
          background: t.bgPrimary, transition: "background 0.5s",
        }}>
          {/* Section label — no key, just update in place */}
          <div style={{
            display: "flex", alignItems: "center", gap: 12,
            marginBottom: "clamp(20px,3vh,32px)",
          }}>
            <div style={{ width: 3, height: 28, background: "#FF5A1F", borderRadius: 2, flexShrink: 0 }} />
            <h2 style={{
              fontFamily: "'Bebas Neue',sans-serif",
              fontSize: "clamp(1.5rem,3vw,2.4rem)",
              letterSpacing: "0.04em", lineHeight: 1, margin: 0,
              color: t.textPrimary, transition: "color 0.4s",
            }}>
              {activeType === ALL ? "All Accessories" : activeType}
            </h2>
            <span style={{
              fontFamily: "'Barlow',sans-serif", fontSize: "0.62rem", fontWeight: 700,
              letterSpacing: "0.2em", textTransform: "uppercase",
              padding: "4px 10px", borderRadius: 2,
              color: "#FF5A1F", background: "rgba(255,90,31,0.08)",
              border: "1px solid rgba(255,90,31,0.2)",
              transition: "opacity 0.2s",
            }}>
              {filtered.length} item{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>

          {filtered.length === 0 ? (
            <EmptyState query={query} />
          ) : (
            <div className="ap-grid" key={gridKey}>
              {filtered.map((item, i) => (
                <div
                  key={item.id}
                  style={{
                    opacity: 0,
                    animation: `ap-card-in 0.48s ease ${i * 55}ms forwards`,
                  }}
                >
                  <AccessoryCard item={item} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}