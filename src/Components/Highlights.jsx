import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../ThemeContext";
import { darkTheme, lightTheme } from "../theme";

const AUTO_INTERVAL = 5000;
const DRAG_THRESHOLD = 50;

function SpeedIcon({ color }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a10 10 0 1 0 10 10" />
      <path d="M12 12l4.5-4.5" />
      <circle cx="12" cy="12" r="1.5" fill={color} stroke="none" />
    </svg>
  );
}
function RangeIcon({ color }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}
function CapacityIcon({ color }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="16" height="11" rx="2" />
      <path d="M18 10h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-2" />
      <line x1="6" y1="11" x2="6" y2="14" />
      <line x1="10" y1="10" x2="10" y2="15" />
      <line x1="14" y1="12" x2="14" y2="13" />
    </svg>
  );
}
function StatIcon({ type, color }) {
  if (type === "speed")    return <SpeedIcon color={color} />;
  if (type === "range")    return <RangeIcon color={color} />;
  if (type === "capacity") return <CapacityIcon color={color} />;
  return null;
}

function ArrowBtn({ dir, onClick, dark }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      aria-label={dir === "prev" ? "Previous" : "Next"}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: "44px", height: "44px",
        borderRadius: "50%",
        border: hovered ? "1px solid #FF5A1F" : `1px solid ${dark ? "rgba(194,197,204,0.12)" : "rgba(0,0,0,0.12)"}`,
        background: hovered ? "#FF5A1F" : dark ? "rgba(194,197,204,0.05)" : "rgba(0,0,0,0.04)",
        backdropFilter: "blur(8px)",
        color: hovered ? "#fff" : dark ? "rgba(194,197,204,0.5)" : "rgba(0,0,0,0.4)",
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer", flexShrink: 0,
        transform: hovered ? "scale(1.08)" : "scale(1)",
        transition: "all 0.22s ease",
        boxShadow: hovered ? "0 8px 24px rgba(255,90,31,0.28)" : "none",
      }}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        {dir === "prev"
          ? <polyline points="15 18 9 12 15 6" />
          : <polyline points="9 18 15 12 9 6" />}
      </svg>
    </button>
  );
}

export default function Highlights() {
  const { dark } = useTheme();
  const t = dark ? darkTheme : lightTheme;

  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [current, setCurrent]   = useState(0);
  const [phase, setPhase]       = useState("idle");
  const [direction, setDirection] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const pendingIdx = useRef(null);
  const timerRef   = useRef(null);

  const dragStart  = useRef(null);
  const isDragging = useRef(false);
  const dragDelta  = useRef(0);
  const [dragOffset, setDragOffset] = useState(0);

  // track screen size
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    fetch("/products.json")
      .then(r => r.json())
      .then(data => { setProducts(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const goTo = useCallback((idx, dir) => {
    if (phase !== "idle" || !products.length) return;
    pendingIdx.current = (idx + products.length) % products.length;
    setDirection(dir);
    setPhase("exit");
  }, [phase, products.length]);

  const next = useCallback(() => goTo(current + 1,  1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1, -1), [current, goTo]);

  useEffect(() => {
    if (phase === "exit") {
      const id = setTimeout(() => { setCurrent(pendingIdx.current); setPhase("enter"); }, 280);
      return () => clearTimeout(id);
    }
    if (phase === "enter") {
      const id = setTimeout(() => setPhase("idle"), 20);
      return () => clearTimeout(id);
    }
  }, [phase]);

  const startTimer = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent(c => {
        const nxt = (c + 1) % (products.length || 1);
        pendingIdx.current = nxt;
        setDirection(1);
        setPhase(p => p === "idle" ? "exit" : p);
        return c;
      });
    }, AUTO_INTERVAL);
  }, [products.length]);

  useEffect(() => {
    if (!products.length) return;
    startTimer();
    return () => clearInterval(timerRef.current);
  }, [products.length, startTimer]);

  const manualNext = () => { clearInterval(timerRef.current); next(); startTimer(); };
  const manualPrev = () => { clearInterval(timerRef.current); prev(); startTimer(); };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft")  manualPrev();
      if (e.key === "ArrowRight") manualNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const onPointerDown = (e) => {
    if (phase !== "idle") return;
    dragStart.current = { x: e.clientX, y: e.clientY };
    isDragging.current = true;
    dragDelta.current = 0;
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e) => {
    if (!isDragging.current) return;
    const dx = e.clientX - dragStart.current.x;
    dragDelta.current = dx;
    setDragOffset(Math.max(-120, Math.min(120, dx)));
  };
  const onPointerUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    setDragOffset(0);
    const dx = dragDelta.current;
    if (Math.abs(dx) >= DRAG_THRESHOLD) {
      clearInterval(timerRef.current);
      dx < 0 ? next() : prev();
      startTimer();
    }
    dragDelta.current = 0;
  };

  const isVisible = phase === "idle";
  const baseSlideX = phase === "exit"  ? `${direction * -60}px`
                   : phase === "enter" ? `${direction * 60}px` : "0px";
  const opacity = isVisible ? 1 : 0;
  const contentTransition = isVisible
    ? "opacity 0.42s ease, transform 0.42s cubic-bezier(0.22,1,0.36,1)"
    : "opacity 0.24s ease, transform 0.24s ease";

  if (loading || !products.length) {
    return (
      <section style={{ background: t.bgPrimary, height: "600px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: "36px", height: "36px", borderRadius: "50%", border: `2px solid ${t.divider}`, borderTopColor: "#FF5A1F", animation: "hl-spin 0.8s linear infinite" }} />
        <style>{`@keyframes hl-spin { to { transform: rotate(360deg); } }`}</style>
      </section>
    );
  }

  const product = products[current];
  const progressKey = `${current}-${dark}`;

  return (
    <section style={{ background: t.bgPrimary, transition: "background 0.5s ease", width: "100%", overflow: "hidden", position: "relative" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@300;400;600;700&display=swap');

        .hl-ghost {
          position: absolute;
          top: 42%; left: 50%;
          transform: translate(-50%, -50%);
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(60px, 15vw, 200px);
          letter-spacing: 0.06em;
          text-transform: uppercase;
          white-space: nowrap;
          pointer-events: none;
          user-select: none;
          z-index: 0;
          transition: color 0.5s ease, opacity 0.35s ease;
        }

        .hl-bike-img {
          width: 100%;
          max-width: 560px;
          height: clamp(220px, 38vw, 340px);
          object-fit: contain;
          position: relative;
          z-index: 1;
          will-change: transform, opacity;
        }
        .hl-stage:not(.is-dragging) .hl-bike-img:hover {
          transform: scale(1.03) translateY(-6px);
          transition: transform 0.5s cubic-bezier(0.22,1,0.36,1) !important;
        }

        .hl-stage {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: clamp(220px, 38vw, 340px);
          position: relative;
          cursor: grab;
          user-select: none;
          -webkit-user-select: none;
        }
        .hl-stage:active { cursor: grabbing; }

        /* ── Stats ── */
        /* Desktop: horizontal row */
        .hl-stats-wrap {
          display: flex;
          flex-direction: row;
          border-top: 1px solid;
          border-bottom: 1px solid;
        }

        .hl-stat-cell {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 26px 16px;
          gap: 7px;
          position: relative;
          transition: background 0.25s;
        }

        /* Mobile: vertical stack */
        @media (max-width: 639px) {
          .hl-stats-wrap {
            flex-direction: column;
            border-left: none;
            border-right: none;
          }

          .hl-stat-cell {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            padding: 16px 4px;
            gap: 0;
          }

          /* Remove vertical divider on mobile */
          .hl-stat-divider { display: none; }

          /* Horizontal divider between rows */
          .hl-stat-cell + .hl-stat-cell {
            border-top: 1px solid;
          }

          .hl-stat-left {
            display: flex;
            align-items: center;
            gap: 10px;
          }
        }

        @media (min-width: 640px) {
          .hl-stat-cell:hover { background: rgba(255,90,31,0.03); }
          .hl-stat-left {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 7px;
          }
        }

        .hl-stat-label {
          font-family: 'Barlow', sans-serif;
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }
        .hl-stat-value {
          font-family: 'Bebas Neue', sans-serif;
          letter-spacing: 0.04em;
          line-height: 1;
        }

        /* Buttons */
        .hl-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: 'Barlow', sans-serif;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          text-decoration: none;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: gap 0.25s ease, color 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease, transform 0.2s ease;
        }
        .hl-btn-solid {
          border: 1px solid transparent;
        }
        .hl-btn-solid::before {
          content: '';
          position: absolute; inset: 0;
          background: #FF5A1F;
          transform: translateX(-101%);
          transition: transform 0.32s cubic-bezier(0.4,0,0.2,1);
        }
        .hl-btn-solid:hover::before { transform: translateX(0); }
        .hl-btn-solid:hover { gap: 16px; box-shadow: 0 10px 30px rgba(255,90,31,0.28); transform: translateY(-2px); }
        .hl-btn-solid span, .hl-btn-solid svg { position: relative; z-index: 1; }
        .hl-btn-ghost {
          background: transparent;
        }
        .hl-btn-ghost:hover {
          border-color: #FF5A1F !important;
          color: #FF5A1F !important;
          gap: 16px;
          transform: translateY(-2px);
        }

        /* Dots */
        .hl-dot {
          height: 3px;
          border-radius: 2px;
          border: none;
          padding: 0;
          cursor: pointer;
          overflow: hidden;
          position: relative;
          transition: width 0.35s cubic-bezier(0.22,1,0.36,1), background 0.35s;
          flex-shrink: 0;
        }
        .hl-dot-fill {
          position: absolute;
          top: 0; left: 0; height: 100%;
          background: #FF5A1F;
          border-radius: 2px;
          animation: hl-progress ${AUTO_INTERVAL}ms linear forwards;
        }
        @keyframes hl-progress { from { width: 0%; } to { width: 100%; } }
        @keyframes hl-spin { to { transform: rotate(360deg); } }

        /* Button row responsive */
        .hl-btn-row {
          display: flex;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
        }
        @media (max-width: 400px) {
          .hl-btn-row {
            flex-direction: column;
            align-items: stretch;
          }
          .hl-btn-row .hl-btn {
            justify-content: center;
          }
        }

        /* Header row responsive */
        .hl-header-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 32px;
        }

        /* Heading + badge responsive */
        .hl-title-row {
          display: flex;
          align-items: baseline;
          gap: 14px;
          flex-wrap: wrap;
          margin-bottom: 6px;
        }
        @media (max-width: 480px) {
          .hl-title-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }
        }
      `}</style>

      {/* Ghost watermark */}
      <div
        className="hl-ghost"
        style={{
          color: dark ? "rgba(194,197,204,0.022)" : "rgba(0,0,0,0.032)",
          opacity: isVisible ? 1 : 0,
        }}
      >
        {product.name}
      </div>

      {/* Top accent line */}
      <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, #FF5A1F, transparent)", opacity: 0.4 }} />

      <div style={{ maxWidth: "1160px", margin: "0 auto", padding: "clamp(40px,7vh,80px) clamp(16px,5vw,72px)", position: "relative", zIndex: 1 }}>

        {/* ── Header row ── */}
        <div className="hl-header-row">
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "28px", height: "1.5px", background: "#FF5A1F", flexShrink: 0 }} />
            <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", color: "#FF5A1F" }}>
              Our Lineup
            </span>
          </div>
          <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: dark ? "#7A7F87" : "#9A9AA0", transition: "color 0.4s", margin: 0 }}>
            {String(current + 1).padStart(2, "0")}
            <span style={{ color: dark ? "rgba(194,197,204,0.2)" : "#D9D9DE", margin: "0 5px" }}>—</span>
            {String(products.length).padStart(2, "0")}
          </p>
        </div>

        {/* ── Title + tagline ── */}
        <div style={{
          marginBottom: "clamp(28px, 4vw, 44px)",
          opacity, transition: contentTransition,
          transform: `translateY(${isVisible ? "0" : "16px"})`,
        }}>
          <div className="hl-title-row">
            <h2 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(2.2rem, 6vw, 4.8rem)",
              letterSpacing: "0.04em",
              color: dark ? "#C2C5CC" : "#111111",
              lineHeight: 1, margin: 0,
              transition: "color 0.4s",
            }}>
              {product.name}
            </h2>
            <span style={{
              fontFamily: "'Barlow', sans-serif",
              fontSize: "0.6rem", fontWeight: 700,
              letterSpacing: "0.18em", textTransform: "uppercase",
              color: "#FF5A1F",
              background: dark ? "rgba(255,90,31,0.1)" : "rgba(255,90,31,0.07)",
              border: "1px solid rgba(255,90,31,0.2)",
              padding: "4px 10px",
              flexShrink: 0,
            }}>
              {product.category}
            </span>
          </div>
          <p style={{
            fontFamily: "'Barlow', sans-serif",
            fontSize: "0.75rem", fontWeight: 400,
            letterSpacing: "0.1em", textTransform: "uppercase",
            color: dark ? "#7A7F87" : "#6E6E73",
            margin: 0,
            transition: "color 0.4s",
          }}>
            {product.tagline}
          </p>
        </div>

        {/* ── Carousel row ── */}
        <div style={{ display: "flex", alignItems: "center", gap: isMobile ? "8px" : "16px", marginBottom: "clamp(28px, 4vw, 40px)" }}>
          <ArrowBtn dir="prev" onClick={manualPrev} dark={dark} />

          <div
            className={`hl-stage${isDragging.current ? " is-dragging" : ""}`}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
          >
            {/* Glow */}
            <div style={{
              position: "absolute",
              width: "60%", height: "40%",
              borderRadius: "50%",
              background: dark
                ? "radial-gradient(ellipse, rgba(255,90,31,0.09) 0%, transparent 70%)"
                : "radial-gradient(ellipse, rgba(255,90,31,0.06) 0%, transparent 70%)",
              bottom: 0, left: "50%",
              transform: "translateX(-50%)",
              filter: "blur(28px)",
              pointerEvents: "none",
              opacity: isVisible ? 1 : 0,
              transition: "opacity 0.4s",
            }} />

            <img
              key={product.id}
              src={product.heroImage}
              alt={product.name}
              className="hl-bike-img"
              draggable={false}
              style={{
                opacity,
                transform: isDragging.current
                  ? `translateX(${dragOffset}px) scale(0.97)`
                  : `translateX(${baseSlideX}) scale(${isVisible ? 1 : 0.95})`,
                transition: isDragging.current ? "none" : contentTransition,
                filter: dark
                  ? "drop-shadow(0 28px 52px rgba(0,0,0,0.8))"
                  : "drop-shadow(0 16px 32px rgba(0,0,0,0.13))",
              }}
              onError={e => { e.target.style.opacity = "0.2"; }}
            />
          </div>

          <ArrowBtn dir="next" onClick={manualNext} dark={dark} />
        </div>

        {/* ── Stats bar ── */}
        <div
          className="hl-stats-wrap"
          style={{
            borderColor: t.divider,
            marginBottom: "clamp(24px, 4vw, 40px)",
            opacity,
            transform: `translateY(${isVisible ? "0" : "14px"})`,
            transition: isVisible ? "opacity 0.44s ease 0.1s, transform 0.44s ease 0.1s" : "opacity 0.22s, transform 0.22s",
          }}
        >
          {product.heroStats.map((stat, i) => (
            <div
              key={stat.label}
              className="hl-stat-cell"
              style={{
                borderTopColor: t.divider, // used for mobile row divider via CSS
              }}
            >
              {/* Desktop vertical divider */}
              {i > 0 && (
                <div className="hl-stat-divider" style={{
                  position: "absolute", left: 0, top: "18px", bottom: "18px",
                  width: "1px", background: t.divider,
                }} />
              )}

              {/* Mobile: icon + label on left, value on right */}
              {/* Desktop: stacked center */}
              <div className="hl-stat-left">
                <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                  <StatIcon type={stat.icon} color="#FF5A1F" />
                  <span className="hl-stat-label" style={{ color: dark ? "#7A7F87" : "#9A9AA0", transition: "color 0.4s" }}>
                    {stat.label}
                  </span>
                </div>
              </div>

              <span
                className="hl-stat-value"
                style={{
                  color: dark ? "#C2C5CC" : "#111111",
                  fontSize: isMobile ? "clamp(1.5rem, 6vw, 2rem)" : "clamp(1.8rem, 3vw, 2.4rem)",
                  transition: "color 0.4s",
                }}
              >
                {stat.value}
              </span>
            </div>
          ))}
        </div>

        {/* ── Buttons ── */}
        <div
          className="hl-btn-row"
          style={{
            marginBottom: "clamp(24px, 4vw, 36px)",
            opacity,
            transform: `translateY(${isVisible ? "0" : "14px"})`,
            transition: isVisible ? "opacity 0.44s ease 0.18s, transform 0.44s ease 0.18s" : "opacity 0.22s, transform 0.22s",
          }}
        >
          <Link
            to={`/products/${product.id}/compare`}
            className="hl-btn hl-btn-ghost"
            style={{
              padding: isMobile ? "12px 20px" : "12px 28px",
              color: dark ? "rgba(194,197,204,0.75)" : "rgba(0,0,0,0.6)",
              border: `1px solid ${dark ? "rgba(194,197,204,0.15)" : "rgba(0,0,0,0.15)"}`,
            }}
          >
            Compare
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </Link>
          <Link
            to={`/products/${product.id}`}
            className="hl-btn hl-btn-solid"
            style={{
              padding: isMobile ? "12px 20px" : "12px 28px",
              background: dark ? "#C2C5CC" : "#111111",
              color: dark ? "#0B0B0C" : "#ffffff",
            }}
          >
            <span>Learn More</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </Link>
        </div>

        {/* ── Dots ── */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "6px" }}>
          {products.map((p, i) => (
            <button
              key={p.id}
              className="hl-dot"
              aria-label={`View ${p.name}`}
              onClick={() => {
                if (i === current) return;
                clearInterval(timerRef.current);
                goTo(i, i > current ? 1 : -1);
                startTimer();
              }}
              style={{
                width: i === current ? "32px" : "6px",
                background: i === current
                  ? dark ? "rgba(194,197,204,0.15)" : "rgba(0,0,0,0.1)"
                  : dark ? "rgba(194,197,204,0.18)" : "#D9D9DE",
              }}
            >
              {i === current && <div key={progressKey} className="hl-dot-fill" />}
            </button>
          ))}
        </div>

      </div>

      {/* Bottom accent line */}
      <div style={{ height: "1px", background: `linear-gradient(90deg, transparent, ${dark ? "rgba(194,197,204,0.08)" : "#D9D9DE"}, transparent)` }} />
    </section>
  );
}