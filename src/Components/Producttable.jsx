import { useEffect, useRef, useState } from "react";
import { useTheme } from "../ThemeContext";

const darkTheme = {
  bgPrimary: "#0B0B0C",
  cardBg: "#16171A",
  textPrimary: "#C2C5CC",
  textSecondary: "#7A7F87",
  accent: "#FF5A1F",
};

const lightTheme = {
  bgPrimary: "#FAFAFA",
  cardBg: "#FFFFFF",
  textPrimary: "#111111",
  textSecondary: "#6E6E73",
  accent: "#FF5A1F",
};

// ── Spec Row ─────────────────────────────────────────
function SpecRow({ label, value, index, inView, t }) {
  const delay = index * 40;
  const isHighlight = ["Top Speed", "Max Range", "Battery", "Motor"].includes(label);

  return (
    <div
      className="pt-row"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 22px",
        borderRadius: 10,
        background: t.cardBg,
        marginBottom: 10,
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(10px)",
        transition: "all 0.25s ease " + delay + "ms",
        boxShadow: " 2px 8px rgba(0,0,0,0.05)",
      }}
    >
      <span
        style={{
          fontFamily: "'Barlow', sans-serif",
          fontSize: "0.82rem",
          letterSpacing: "0.03em",
          color: t.textSecondary,
        }}
      >
        {label}
      </span>

      <span
        style={{
          fontFamily: isHighlight ? "'Bebas Neue', sans-serif" : "'Barlow', sans-serif",
          fontSize: isHighlight ? "1.05rem" : "0.9rem",
          letterSpacing: "0.04em",
          color: t.textPrimary,
        }}
      >
        {value}
      </span>
    </div>
  );
}

// ── Color Row ─────────────────────────────────────────
function ColorRow({ colors, inView, t }) {
  return (
    <div
      style={{
        padding: "16px 22px",
        borderRadius: 10,
        background: t.cardBg,
        marginTop: 10,
        display: "flex",
        gap: 12,
        flexWrap: "wrap",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(10px)",
        transition: "all 0.25s ease 0.2s",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      }}
    >
      {colors.map((c, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: "50%",
              background: c.hex,
              border: "1px solid rgba(0,0,0,0.2)",
            }}
          />
          <span style={{ fontSize: "0.72rem", color: t.textSecondary }}>
            {c.name}
          </span>
        </div>
      ))}
    </div>
  );
}

// ── Main Component ───────────────────────────────────
export default function ProductTable({ product }) {
  const { dark } = useTheme();
  const t = dark ? darkTheme : lightTheme;

  const [inView, setInView] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setInView(true);
    });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  if (!product) return null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@300;400;500;600&display=swap');

        :root {
          --nav-height: 90px; /* 🔥 adjust if your navbar height is different */
        }

        .pt-wrap {
          width: 100%;
          padding: 60px 16px;
          padding-top: calc(var(--nav-height) + 40px); /* ✅ FIXED overlap */
          display: flex;
          justify-content: center;
        }

        .pt-container {
          width: 100%;
          max-width: 820px;
        }

        .pt-row:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(0,0,0,0.08);
        }

        /* Optional: fixes anchor scroll issues */
        html {
          scroll-padding-top: var(--nav-height);
        }
      `}</style>

      <div ref={ref} className="pt-wrap" style={{ background: t.bgPrimary }}>
        <div className="pt-container">

          {/* Title */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 24,
            }}
          >
            <div
              style={{
                width: 3,
                height: 34,
                background: t.accent,
                borderRadius: 2,
              }}
            />
            <h2
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "2.4rem",
                letterSpacing: "0.05em",
                margin: 0,
                color: t.textPrimary,
              }}
            >
              Full Specifications
            </h2>
          </div>

          {/* Specs */}
          {Object.entries(product.specs).map(([k, v], i) => (
            <SpecRow
              key={k}
              label={k}
              value={v}
              index={i}
              inView={inView}
              t={t}
            />
          ))}

          {/* Colors */}
          {product.colors && (
            <ColorRow colors={product.colors} inView={inView} t={t} />
          )}
        </div>
      </div>
    </>
  );
}