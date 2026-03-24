import { useEffect, useRef, useState } from "react";
import { useTheme } from "../ThemeContext";

export default function ScrollBikeStats({ product }) {
  const { dark } = useTheme();
  const sectionRef = useRef(null);

  const progressRef = useRef(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let rafId;

    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;

      const target = Math.min(Math.max(scrolled / total, 0), 1);
      progressRef.current = target;
    };

    const animate = () => {
      setProgress((prev) => prev + (progressRef.current - prev) * 0.1);
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    animate();

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (!product) return null;

  const stats = product.heroStats || [];

  const colorP = Math.min(progress / 0.25, 1);
  const slideP = Math.min(Math.max((progress - 0.25) / 0.35, 0), 1);
  const statsP = Math.min(Math.max((progress - 0.4) / 0.6, 0), 1);

  // Luxury layout tuning
  const bikeLeft = 55 - slideP * 30;
  const bikeSize = 1 - slideP * 0.15;

  const hueShift = colorP * 180;
  const brightness = 1 + colorP * 0.12;
  const saturate = 1 + colorP * 0.4;

  const statThresholds = stats.map((_, i) => i / Math.max(stats.length, 1));

  const statsOpacity = (i) => {
    const threshold = statThresholds[i];
    const span = 1 / Math.max(stats.length, 1);
    return Math.min(Math.max((statsP - threshold) / span, 0), 1);
  };

  const bg = dark ? "#0B0B0C" : "#F5F5F5";
  const text = dark ? "#E5E7EB" : "#111111";
  const muted = dark ? "#9CA3AF" : "#6B7280";
  const divider = dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@300;400;600;700&display=swap');

        .sbs-outer {
          height: 300vh;
          position: relative;
        }

        .sbs-sticky {
          position: sticky;
          top: 0;
          height: 100vh;
          overflow: hidden;
          display: flex;
          align-items: center;
          background: ${bg};
        }

        .sbs-bike {
          position: absolute;
          bottom: 0;
          height: clamp(400px, 80vh, 900px);
          width: auto;
          object-fit: contain;
          object-position: bottom center;
          pointer-events: none;
          user-select: none;
          will-change: transform, filter, left;
          z-index: 2;
        }

        .sbs-stats {
          position: absolute;
          right: clamp(80px, 10vw, 160px);
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          flex-direction: column;
          width: clamp(300px, 32vw, 420px);
          z-index: 3;
        }

        .sbs-stat-row {
          display: flex;
          align-items: flex-start;
          gap: 18px;
          padding: 22px 0;
          will-change: opacity, transform;
        }

        .sbs-stat-row + .sbs-stat-row {
          border-top: 1px solid;
        }

        .sbs-stat-icon {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          background: rgba(255, 90, 31, 0.08);
          color: #FF5A1F;
          margin-top: 4px;
        }

        .sbs-stat-value {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(2.2rem, 4.5vw, 3.8rem);
          letter-spacing: 0.02em;
          line-height: 1;
          margin: 0 0 4px;
        }

        .sbs-stat-label {
          font-family: 'Barlow', sans-serif;
          font-size: 0.6rem;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }

        .sbs-label {
          position: absolute;
          top: clamp(24px, 5vh, 48px);
          left: clamp(28px, 6vw, 100px);
          font-family: 'Barlow', sans-serif;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #FF5A1F;
          display: flex;
          align-items: center;
          gap: 10px;
          z-index: 4;
        }
      `}</style>

      <div ref={sectionRef} className="sbs-outer">
        <div className="sbs-sticky">

          <div className="sbs-label">
            <span style={{ width: 20, height: 1.5, background: "#FF5A1F", display: "inline-block" }} />
            Key Specs
          </div>

          <img
            src={product.heroImage}
            alt={product.name}
            className="sbs-bike"
            style={{
              left: `${bikeLeft}%`,
              transform: `translateX(-50%) scale(${bikeSize})`,
              filter: `hue-rotate(${hueShift}deg) brightness(${brightness}) saturate(${saturate})`,
            }}
          />

          <div className="sbs-stats">
            {stats.map((stat, i) => {
              const p = statsOpacity(i);

              return (
                <div
                  key={stat.label}
                  className="sbs-stat-row"
                  style={{
                    opacity: Math.pow(p, 1.5),
                    transform: `translateX(${(1 - p) * 25}px) scale(${0.96 + p * 0.04})`,
                    borderTopColor: divider,
                  }}
                >
                  <div className="sbs-stat-icon">
                    <StatIcon type={stat.icon} />
                  </div>

                  <div>
                    <div className="sbs-stat-value" style={{ color: text }}>
                      {stat.value}
                    </div>
                    <div className="sbs-stat-label" style={{ color: muted }}>
                      {stat.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </>
  );
}

function StatIcon({ type }) {
  if (type === "speed")
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 1 1-6.88 17.24" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    );

  if (type === "range")
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12h18M3 12l4-4M3 12l4 4M21 12l-4-4M21 12l-4 4" />
      </svg>
    );

  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="16" height="10" rx="2" />
      <path d="M22 11v2" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M6 11h4M10 9v4" />
    </svg>
  );
}
