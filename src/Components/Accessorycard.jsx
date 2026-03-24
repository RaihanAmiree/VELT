import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../ThemeContext";

export default function AccessoryCard({ item }) {
  const { dark } = useTheme();
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  const [imgErr, setImgErr] = useState(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@300;400;600;700&display=swap');

        .ac-card {
          width: 100%;
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;
          position: relative;
          display: flex;
          flex-direction: column;
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1),
                      box-shadow 0.35s ease,
                      border-color 0.3s ease;
        }
        .ac-card:hover {
          transform: translateY(-8px) scale(1.01);
        }

        .ac-img-wrap {
          position: relative;
          height: 200px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .ac-img {
          width: 85%;
          height: 100%;
          object-fit: contain;
          position: relative; z-index: 1;
          transition: transform 0.55s cubic-bezier(0.22,1,0.36,1);
        }
        .ac-card:hover .ac-img {
          transform: scale(1.08) translateY(-5px);
        }

        .ac-glow {
          position: absolute;
          bottom: -10px; left: 50%;
          transform: translateX(-50%);
          width: 65%; height: 45%;
          border-radius: 50%;
          filter: blur(22px);
          pointer-events: none; z-index: 0;
          background: radial-gradient(ellipse, rgba(255,90,31,0.16) 0%, transparent 70%);
          transition: opacity 0.35s ease;
        }

        .ac-type-badge {
          position: absolute;
          top: 14px; left: 14px; z-index: 2;
          font-family: 'Barlow', sans-serif;
          font-size: 0.57rem; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase;
          padding: 4px 10px; border-radius: 2px;
          color: #FF5A1F;
          border: 1px solid rgba(255,90,31,0.25);
          background: rgba(255,90,31,0.08);
          backdrop-filter: blur(6px);
        }

        .ac-new-badge {
          position: absolute;
          top: 14px; right: 14px; z-index: 2;
          font-family: 'Barlow', sans-serif;
          font-size: 0.57rem; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase;
          padding: 4px 9px; border-radius: 2px;
          backdrop-filter: blur(6px);
        }

        .ac-body {
          padding: 18px 20px 20px;
          display: flex; flex-direction: column;
          gap: 9px; flex: 1;
        }

        .ac-name {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(1.45rem, 2.5vw, 1.85rem);
          letter-spacing: 0.04em; line-height: 1;
          margin: 0; transition: color 0.3s;
        }

        .ac-tagline {
          font-family: 'Barlow', sans-serif;
          font-size: 0.7rem; font-weight: 400;
          letter-spacing: 0.07em; line-height: 1.5;
          margin: 0; transition: color 0.3s;
        }

        .ac-specs {
          display: flex; gap: 0;
          margin-top: 4px;
        }

        .ac-spec {
          flex: 1; display: flex; flex-direction: column;
          gap: 2px; padding: 9px 0;
          position: relative;
        }
        .ac-spec + .ac-spec {
          padding-left: 11px; margin-left: 11px;
        }

        .ac-spec-val {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.1rem; letter-spacing: 0.04em; line-height: 1;
          transition: color 0.3s;
        }
        .ac-spec-label {
          font-family: 'Barlow', sans-serif;
          font-size: 0.56rem; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase;
          transition: color 0.3s;
        }

        /* Price + CTA row */
        .ac-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 11px 16px;
          border-top: 1px solid;
          margin-top: auto;
          position: relative;
          overflow: hidden;
          transition: color 0.3s ease;
        }
        .ac-footer::before {
          content: '';
          position: absolute; inset: 0;
          background: #FF5A1F;
          transform: translateX(-101%);
          transition: transform 0.32s cubic-bezier(0.4,0,0.2,1);
        }
        .ac-card:hover .ac-footer::before { transform: translateX(0); }
        .ac-card:hover .ac-footer { color: #fff !important; }
        .ac-card:hover .ac-price { color: #fff !important; }
        .ac-card:hover .ac-cta-label { color: #fff !important; }
        .ac-card:hover .ac-arrow { background: rgba(255,255,255,0.18) !important; transform: translateX(4px); }

        .ac-price {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.5rem; letter-spacing: 0.04em;
          position: relative; z-index: 1;
          transition: color 0.3s;
        }

        .ac-cta {
          display: flex; align-items: center; gap: 8px;
          position: relative; z-index: 1;
        }
        .ac-cta-label {
          font-family: 'Barlow', sans-serif;
          font-size: 0.65rem; font-weight: 700;
          letter-spacing: 0.16em; text-transform: uppercase;
          transition: color 0.3s;
        }
        .ac-arrow {
          width: 28px; height: 28px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.25s ease;
          flex-shrink: 0;
        }
      `}</style>

      <div
        className="ac-card"
        onClick={() => navigate(`/accessories/${item.id}`)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: dark ? "#16171A" : "#FFFFFF",
          border: `1px solid ${hovered ? "rgba(255,90,31,0.3)" : dark ? "rgba(194,197,204,0.07)" : "#D9D9DE"}`,
          boxShadow: hovered
            ? dark
              ? "0 24px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,90,31,0.15)"
              : "0 24px 60px rgba(0,0,0,0.1), 0 0 0 1px rgba(255,90,31,0.1)"
            : dark
              ? "0 4px 20px rgba(0,0,0,0.4)"
              : "0 2px 12px rgba(0,0,0,0.05)",
        }}
      >
        {/* Image */}
        <div
          className="ac-img-wrap"
          style={{ background: dark ? "#0f1012" : "#F1F1F1" }}
        >
          <span className="ac-type-badge">{item.type}</span>

          {item.badge && (
            <span
              className="ac-new-badge"
              style={
                item.badge === "New"
                  ? { background: "rgba(255,90,31,0.12)", color: "#FF5A1F", border: "1px solid rgba(255,90,31,0.25)" }
                  : { background: dark ? "rgba(194,197,204,0.08)" : "rgba(0,0,0,0.06)", color: dark ? "#C2C5CC" : "#111111", border: `1px solid ${dark ? "rgba(194,197,204,0.12)" : "#D9D9DE"}` }
              }
            >
              {item.badge}
            </span>
          )}

          <div className="ac-glow" style={{ opacity: hovered ? 1 : 0.35 }} />

          {!imgErr ? (
            <img
              src={item.image}
              alt={item.name}
              className="ac-img"
              onError={() => setImgErr(true)}
              style={{
                filter: dark
                  ? "drop-shadow(0 14px 28px rgba(0,0,0,0.65))"
                  : "drop-shadow(0 8px 18px rgba(0,0,0,0.1))",
              }}
            />
          ) : (
            <div style={{ width: "70%", height: "60%", display: "flex", alignItems: "center", justifyContent: "center", opacity: 0.15 }}>
              <svg viewBox="0 0 80 60" fill="none" width="100%" height="100%">
                <rect x="10" y="10" width="60" height="40" rx="5" fill={dark ? "#C2C5CC" : "#111"} />
                <rect x="22" y="22" width="36" height="24" rx="3" fill={dark ? "#0B0B0C" : "#F1F1F1"} />
              </svg>
            </div>
          )}
        </div>

        {/* Body */}
        <div className="ac-body">
          <div>
            <h3 className="ac-name" style={{ color: dark ? "#C2C5CC" : "#111111" }}>{item.name}</h3>
            <p className="ac-tagline" style={{ color: dark ? "#7A7F87" : "#6E6E73" }}>{item.tagline}</p>
          </div>

          {/* Specs */}
          {item.specs?.length > 0 && (
            <div className="ac-specs" style={{ borderTop: `1px solid ${dark ? "rgba(194,197,204,0.07)" : "#D9D9DE"}` }}>
              {item.specs.slice(0, 3).map((s, i) => (
                <div key={s.label} className="ac-spec">
                  {i > 0 && (
                    <span style={{
                      position: "absolute", left: 0, top: 8, bottom: 8, width: 1,
                      background: dark ? "rgba(194,197,204,0.07)" : "#D9D9DE",
                    }} />
                  )}
                  <span className="ac-spec-val" style={{ color: dark ? "#C2C5CC" : "#111111" }}>{s.value}</span>
                  <span className="ac-spec-label" style={{ color: dark ? "#7A7F87" : "#9A9AA0" }}>{s.label}</span>
                </div>
              ))}
            </div>
          )}

          {/* Price + CTA */}
          <div
            className="ac-footer"
            style={{
              borderColor: dark ? "rgba(194,197,204,0.07)" : "#D9D9DE",
              background: dark ? "rgba(194,197,204,0.03)" : "#F9F9F9",
            }}
          >
            <span className="ac-price" style={{ color: dark ? "#C2C5CC" : "#111111" }}>
              {item.price}
            </span>
            <div className="ac-cta">
              <span className="ac-cta-label" style={{ color: dark ? "#7A7F87" : "#6E6E73" }}>View Item</span>
              <div
                className="ac-arrow"
                style={{
                  background: dark ? "rgba(194,197,204,0.08)" : "rgba(0,0,0,0.06)",
                  color: dark ? "#C2C5CC" : "#111111",
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}