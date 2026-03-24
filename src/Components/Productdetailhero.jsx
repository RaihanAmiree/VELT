import { useEffect, useState } from "react";
import { useTheme } from "../ThemeContext";

function StatIcon({ type }) {
  if (type === "speed")
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 1 1-6.88 17.24" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    );
  if (type === "range")
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12h18M3 12l4-4M3 12l4 4M21 12l-4-4M21 12l-4 4" />
      </svg>
    );
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="16" height="10" rx="2" />
      <path d="M22 11v2" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M6 11h4M10 9v4" />
    </svg>
  );
}

export default function ProductDetailHero({ product }) {
  const { dark } = useTheme();
  const [scrollY, setScrollY]         = useState(0);
  const [activeColor, setActiveColor] = useState(0);
  const [visible, setVisible]         = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setActiveColor(0); }, [product?.id]);

  if (!product) return null;

  const parallax    = scrollY * 0.28;
  const bg          = dark ? product.bgDark : product.bgLight;
  const accentColor = "#FF5A1F";
  const textPrimary = dark ? "#C2C5CC" : "#111111";
  const textSecond  = dark ? "#7A7F87"  : "#6E6E73";
  const statBg      = dark ? "rgba(194,197,204,0.04)" : "rgba(0,0,0,0.03)";

  const overlayDark  = "linear-gradient(105deg, rgba(11,11,12,0.92) 0%, rgba(11,11,12,0.70) 50%, rgba(11,11,12,0.20) 100%), linear-gradient(to bottom, rgba(11,11,12,0) 40%, rgba(11,11,12,1) 100%)";
  const overlayLight = "linear-gradient(105deg, rgba(250,250,250,0.96) 0%, rgba(250,250,250,0.72) 50%, rgba(250,250,250,0.10) 100%), linear-gradient(to bottom, rgba(250,250,250,0) 40%, rgba(250,250,250,1) 100%)";

  const enter = (delay = 0) => ({
    opacity:    visible ? 1 : 0,
    transform:  visible ? "translateY(0px)" : "translateY(18px)",
    transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`,
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@300;400;600;700&display=swap');

        .pdh-wrap {
          position: relative;
          height: 100vh;
          min-height: 580px;
          max-height: 860px;
          overflow: hidden;
          display: flex;
          align-items: center;
        }

        .pdh-bg {
          position: absolute; inset: 0;
          background-size: cover;
          background-position: center 35%;
          will-change: transform;
          transition: background-image 0.5s ease;
        }

        .pdh-overlay { position: absolute; inset: 0; }

        .pdh-bike {
          position: absolute;
          right: clamp(20px, 8vw, 120px);
          bottom: 0;
          height: clamp(280px, 55vh, 600px);
          width: auto;
          object-fit: contain;
          object-position: bottom center;
          z-index: 2;
          filter: drop-shadow(0 24px 48px rgba(0,0,0,0.45));
          pointer-events: none;
          user-select: none;
          transition: opacity 0.6s ease 300ms, transform 0.8s cubic-bezier(0.22,1,0.36,1) 300ms;
        }

        .pdh-content {
          position: relative; z-index: 3;
          padding-left: clamp(28px, 6vw, 100px);
          padding-top: 80px;
          max-width: 56%;
          display: flex;
          flex-direction: column;
        }

        .pdh-stats {
          display: flex;
          gap: clamp(12px, 2vw, 28px);
          flex-wrap: wrap;
        }

        .pdh-stat {
          display: flex; flex-direction: column; gap: 5px;
          padding: 14px 18px;
          border-radius: 4px;
          border-top: 2px solid #FF5A1F;
          min-width: 86px;
          backdrop-filter: blur(6px);
        }

        .pdh-colors { display: flex; align-items: center; gap: 12px; }

        .pdh-swatch {
          width: 22px; height: 22px; border-radius: 50%;
          cursor: pointer; border: 2px solid transparent; outline: none;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .pdh-swatch:hover  { transform: scale(1.18); }
        .pdh-swatch.active {
          border-color: #FF5A1F;
          box-shadow: 0 0 0 3px rgba(255,90,31,0.25);
          transform: scale(1.12);
        }

        .pdh-scroll-line {
          width: 1px; height: 36px;
          background: linear-gradient(to bottom, #FF5A1F, transparent);
          animation: pdh-pulse 1.8s ease-in-out infinite;
        }
        @keyframes pdh-pulse {
          0%, 100% { opacity: 0.4; }
          50%       { opacity: 1;   }
        }

        @media (max-width: 640px) {
          .pdh-content { max-width: 100%; padding-right: 24px; }
          .pdh-bike    { right: -20px; height: clamp(200px, 40vh, 320px); opacity: 0.25; }
        }
      `}</style>

      <div className="pdh-wrap">

        {/* Background */}
        <div
          className="pdh-bg"
          style={{
            backgroundImage: `url(${bg})`,
            transform: `translateY(${parallax}px)`,
            filter: dark
              ? "brightness(0.55) saturate(0.9)"
              : "brightness(0.88) saturate(0.35)",
          }}
        />

        {/* Overlay */}
        <div className="pdh-overlay" style={{ background: dark ? overlayDark : overlayLight }} />

        {/* Floating bike */}
        <img
          key={`${product.id}-${activeColor}`}
          className="pdh-bike"
          src={product.colors?.[activeColor]?.images?.[0] || product.heroImage}
          alt={product.name}
          style={{
            opacity:   visible ? 1 : 0,
            transform: visible
              ? "translateX(0px) translateY(0px)"
              : "translateX(40px) translateY(10px)",
          }}
          onError={(e) => { e.currentTarget.src = product.heroImage; }}
        />

        {/* Content */}
        <div className="pdh-content">

          {/* Eyebrow */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, ...enter(80) }}>
            <span style={{ width: 22, height: 1.5, background: accentColor, display: "inline-block", flexShrink: 0 }} />
            <span style={{
              fontFamily: "'Barlow', sans-serif",
              fontSize: "0.66rem", fontWeight: 700,
              letterSpacing: "0.3em", textTransform: "uppercase",
              color: accentColor,
            }}>
              {product.heroSub || product.category}
            </span>
          </div>

          {/* Name */}
          <h1 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(3.4rem, 9vw, 7.5rem)",
            lineHeight: 0.88, letterSpacing: "0.03em",
            margin: "0 0 16px", color: textPrimary,
            ...enter(160),
          }}>
            {product.name}
          </h1>

          {/* Tagline */}
          <p style={{
            fontFamily: "'Barlow', sans-serif",
            fontSize: "clamp(0.76rem, 1.3vw, 0.88rem)",
            fontWeight: 300, letterSpacing: "0.12em", textTransform: "uppercase",
            color: textSecond, margin: "0 0 24px",
            ...enter(220),
          }}>
            {product.tagline}
          </p>

          {/* Price */}
          {product.price && (
            <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 28, ...enter(280) }}>
              <span style={{
                fontFamily: "'Barlow', sans-serif",
                fontSize: "0.6rem", fontWeight: 700,
                letterSpacing: "0.22em", textTransform: "uppercase",
                color: accentColor,
              }}>
                Starting at
              </span>
              <span style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                letterSpacing: "0.04em", color: textPrimary,
              }}>
                ${product.price.toLocaleString()}
              </span>
            </div>
          )}

          {/* Stats */}
          {product.heroStats?.length > 0 && (
            <div className="pdh-stats" style={{ marginBottom: 28, ...enter(340) }}>
              {product.heroStats.map((stat) => (
                <div key={stat.label} className="pdh-stat" style={{ background: statBg }}>
                  <span style={{ color: accentColor, marginBottom: 2 }}>
                    <StatIcon type={stat.icon} />
                  </span>
                  <span style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
                    letterSpacing: "0.05em", lineHeight: 1, color: textPrimary,
                  }}>
                    {stat.value}
                  </span>
                  <span style={{
                    fontFamily: "'Barlow', sans-serif",
                    fontSize: "0.58rem", fontWeight: 700,
                    letterSpacing: "0.18em", textTransform: "uppercase",
                    color: textSecond,
                  }}>
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Color swatches */}
          {product.colors?.length > 0 && (
            <div className="pdh-colors" style={enter(400)}>
              <span style={{
                fontFamily: "'Barlow', sans-serif",
                fontSize: "0.6rem", fontWeight: 700,
                letterSpacing: "0.2em", textTransform: "uppercase",
                color: textSecond,
              }}>
                Color
              </span>
              {product.colors.map((color, i) => (
                <button
                  key={color.name}
                  className={`pdh-swatch ${i === activeColor ? "active" : ""}`}
                  style={{ background: color.hex }}
                  title={color.name}
                  onClick={() => setActiveColor(i)}
                />
              ))}
              <span style={{
                fontFamily: "'Barlow', sans-serif",
                fontSize: "0.62rem", fontWeight: 600,
                letterSpacing: "0.12em", textTransform: "uppercase",
                color: textPrimary,
              }}>
                {product.colors[activeColor]?.name}
              </span>
            </div>
          )}
        </div>

        {/* Breadcrumb */}
        <div style={{
          position: "absolute", bottom: 28,
          left: "clamp(28px, 6vw, 100px)",
          zIndex: 3,
          display: "flex", alignItems: "center", gap: 8,
          fontFamily: "'Barlow', sans-serif",
          fontSize: "0.62rem", fontWeight: 600,
          letterSpacing: "0.16em", textTransform: "uppercase",
          ...enter(460),
        }}>
          <a href="/"         style={{ color: textSecond, textDecoration: "none" }}>Home</a>
          <span style={{ color: accentColor }}>›</span>
          <a href="/products" style={{ color: textSecond, textDecoration: "none" }}>Products</a>
          <span style={{ color: accentColor }}>›</span>
          <span style={{ color: textPrimary }}>{product.name}</span>
        </div>

        {/* Scroll hint */}
        <div style={{
          position: "absolute", bottom: 28,
          right: "clamp(24px, 4vw, 64px)",
          zIndex: 3,
          display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
          ...enter(500),
        }}>
          <span style={{
            fontFamily: "'Barlow', sans-serif",
            fontSize: "0.55rem", fontWeight: 700,
            letterSpacing: "0.2em", textTransform: "uppercase",
            writingMode: "vertical-rl", color: textSecond,
          }}>
            Scroll
          </span>
          <div className="pdh-scroll-line" />
        </div>

      </div>
    </>
  );
}