import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../ThemeContext";

export default function ProductCard({ product }) {
  const { dark } = useTheme();
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  const [imgErr, setImgErr] = useState(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@300;400;600;700&display=swap');

        .pc-card {
          flex-shrink: 0;
          width: clamp(240px, 28vw, 320px);
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;
          position: relative;
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease, border-color 0.3s ease;
          display: flex;
          flex-direction: column;
        }

        .pc-card:hover {
          transform: translateY(-8px) scale(1.01);
        }

        .pc-img-wrap {
          position: relative;
          height: 210px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .pc-img {
          width: 90%;
          height: 100%;
          object-fit: contain;
          transition: transform 0.55s cubic-bezier(0.22,1,0.36,1);
          position: relative;
          z-index: 1;
        }
        .pc-card:hover .pc-img {
          transform: scale(1.07) translateY(-6px);
        }

        .pc-img-glow {
          position: absolute;
          bottom: -10px; left: 50%;
          transform: translateX(-50%);
          width: 70%; height: 50%;
          border-radius: 50%;
          filter: blur(24px);
          pointer-events: none;
          z-index: 0;
          transition: opacity 0.35s ease;
          background: radial-gradient(ellipse, rgba(255,90,31,0.18) 0%, transparent 70%);
        }
        .pc-card:hover .pc-img-glow { opacity: 1 !important; }

        .pc-badge {
          position: absolute;
          top: 14px; left: 14px;
          z-index: 2;
          font-family: 'Barlow', sans-serif;
          font-size: 0.58rem; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase;
          padding: 4px 10px;
          border-radius: 2px;
          color: #FF5A1F;
          border: 1px solid rgba(255,90,31,0.25);
          background: rgba(255,90,31,0.08);
          backdrop-filter: blur(6px);
        }

        .pc-body {
          padding: 20px 22px 22px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          flex: 1;
        }

        .pc-name {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(1.6rem, 3vw, 2rem);
          letter-spacing: 0.04em;
          line-height: 1;
          margin: 0;
          transition: color 0.3s;
        }

        .pc-tagline {
          font-family: 'Barlow', sans-serif;
          font-size: 0.72rem;
          font-weight: 400;
          letter-spacing: 0.08em;
          line-height: 1.5;
          margin: 0;
          transition: color 0.3s;
        }

        .pc-stats {
          display: flex;
          gap: 0;
          margin-top: 4px;
        }

        .pc-stat {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 3px;
          padding: 10px 0;
          position: relative;
        }
        .pc-stat + .pc-stat {
          padding-left: 12px;
          margin-left: 12px;
        }
        .pc-stat + .pc-stat::before {
          content: '';
          position: absolute;
          left: 0; top: 8px; bottom: 8px;
          width: 1px;
        }

        .pc-stat-val {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.25rem;
          letter-spacing: 0.04em;
          line-height: 1;
          transition: color 0.3s;
        }
        .pc-stat-label {
          font-family: 'Barlow', sans-serif;
          font-size: 0.58rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          transition: color 0.3s;
        }

        .pc-btn {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 11px 16px;
          font-family: 'Barlow', sans-serif;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          border: none;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          margin-top: auto;
          transition: color 0.3s ease;
        }
        .pc-btn::before {
          content: '';
          position: absolute; inset: 0;
          background: #FF5A1F;
          transform: translateX(-101%);
          transition: transform 0.32s cubic-bezier(0.4,0,0.2,1);
        }
        .pc-card:hover .pc-btn::before { transform: translateX(0); }
        .pc-card:hover .pc-btn { color: #fff !important; }
        .pc-btn span, .pc-btn svg { position: relative; z-index: 1; }

        .pc-btn-arrow {
          width: 28px; height: 28px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          position: relative; z-index: 1;
          transition: all 0.25s ease;
          flex-shrink: 0;
        }
        .pc-card:hover .pc-btn-arrow {
          background: rgba(255,255,255,0.2) !important;
          transform: translateX(4px);
        }
      `}</style>

      <div
        className="pc-card"
        onClick={() => navigate(`/products/${product.id}`)}
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
        {/* Image area */}
        <div
          className="pc-img-wrap"
          style={{ background: dark ? "#0f1012" : "#F1F1F1" }}
        >
          <span className="pc-badge">{product.category}</span>

          <div
            className="pc-img-glow"
            style={{ opacity: hovered ? 1 : 0.4 }}
          />

          {!imgErr ? (
            <img
              src={product.heroImage}
              alt={product.name}
              className="pc-img"
              onError={() => setImgErr(true)}
              style={{
                filter: dark
                  ? "drop-shadow(0 16px 32px rgba(0,0,0,0.7))"
                  : "drop-shadow(0 10px 20px rgba(0,0,0,0.12))",
              }}
            />
          ) : (
            // Fallback placeholder
            <div style={{
              width: "80%", height: "70%",
              display: "flex", alignItems: "center", justifyContent: "center",
              opacity: 0.15,
            }}>
              <svg viewBox="0 0 80 40" fill="none" width="100%" height="100%">
                <ellipse cx="40" cy="28" rx="34" ry="7" fill={dark ? "#C2C5CC" : "#111"} />
                <rect x="8" y="10" width="64" height="20" rx="6" fill={dark ? "#C2C5CC" : "#111"} />
                <circle cx="20" cy="30" r="6" fill={dark ? "#7A7F87" : "#6E6E73"} />
                <circle cx="60" cy="30" r="6" fill={dark ? "#7A7F87" : "#6E6E73"} />
              </svg>
            </div>
          )}
        </div>

        {/* Body */}
        <div className="pc-body">
          <div>
            <h3
              className="pc-name"
              style={{ color: dark ? "#C2C5CC" : "#111111" }}
            >
              {product.name}
            </h3>
            <p
              className="pc-tagline"
              style={{ color: dark ? "#7A7F87" : "#6E6E73" }}
            >
              {product.tagline}
            </p>
          </div>

          {/* Stats */}
          {product.heroStats?.length > 0 && (
            <div
              className="pc-stats"
              style={{ borderTop: `1px solid ${dark ? "rgba(194,197,204,0.07)" : "#D9D9DE"}` }}
            >
              {product.heroStats.slice(0, 3).map((s, i) => (
                <div key={s.label} className="pc-stat">
                  {i > 0 && (
                    <span style={{
                      position: "absolute", left: 0, top: 8, bottom: 8,
                      width: 1,
                      background: dark ? "rgba(194,197,204,0.07)" : "#D9D9DE",
                    }} />
                  )}
                  <span
                    className="pc-stat-val"
                    style={{ color: dark ? "#C2C5CC" : "#111111" }}
                  >
                    {s.value}
                  </span>
                  <span
                    className="pc-stat-label"
                    style={{ color: dark ? "#7A7F87" : "#9A9AA0" }}
                  >
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* CTA Button */}
          <button
            className="pc-btn"
            style={{
              background: dark ? "rgba(194,197,204,0.05)" : "#F1F1F1",
              color: dark ? "#C2C5CC" : "#111111",
              borderTop: `1px solid ${dark ? "rgba(194,197,204,0.07)" : "#D9D9DE"}`,
            }}
          >
            <span>View Details</span>
            <div
              className="pc-btn-arrow"
              style={{
                background: dark ? "rgba(194,197,204,0.08)" : "rgba(0,0,0,0.06)",
                color: dark ? "#C2C5CC" : "#111111",
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </>
  );
}