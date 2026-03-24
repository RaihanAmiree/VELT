import { useEffect, useState } from "react";
import { useTheme } from "../ThemeContext";

export default function AccessoriesHero() {
  const { dark } = useTheme();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const parallax = scrollY * 0.3;

  const bgUrl = "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=1920&q=80";

  const overlayDark  = "linear-gradient(to bottom, rgba(11,11,12,0.50) 0%, rgba(11,11,12,0.70) 60%, rgba(11,11,12,1) 100%)";
  const overlayLight = "linear-gradient(to bottom, rgba(250,250,250,0.40) 0%, rgba(250,250,250,0.65) 60%, rgba(250,250,250,1) 100%)";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@300;400;600;700&display=swap');

        .ah-wrap {
          position: relative;
          height: 55vh;
          min-height: 380px;
          max-height: 560px;
          overflow: hidden;
          display: flex;
          align-items: center;
        }

        .ah-bg {
          position: absolute; inset: 0;
          background-size: cover;
          background-position: center 35%;
          will-change: transform;
          transition: opacity 0.6s ease;
        }

        .ah-overlay { position: absolute; inset: 0; }

        .ah-content {
          position: relative; z-index: 2;
          padding-left: clamp(28px, 6vw, 100px);
          padding-top: 80px;
        }

        .ah-eyebrow {
          font-family: 'Barlow', sans-serif;
          font-size: 0.68rem; font-weight: 700;
          letter-spacing: 0.3em; text-transform: uppercase;
          color: #FF5A1F;
          display: flex; align-items: center; gap: 12px;
          margin-bottom: 16px;
          opacity: 0; transform: translateY(10px);
          animation: ah-up 0.55s ease 0.1s forwards;
        }

        .ah-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(3.2rem, 8vw, 7rem);
          line-height: 0.92; letter-spacing: 0.03em;
          margin: 0 0 20px;
          opacity: 0; transform: translateY(20px);
          animation: ah-up 0.65s ease 0.2s forwards;
          transition: color 0.5s ease;
        }

        .ah-divider {
          width: 44px; height: 1.5px;
          background: #FF5A1F;
          margin-bottom: 20px;
          opacity: 0; transform: scaleX(0); transform-origin: left;
          animation: ah-line 0.5s ease 0.32s forwards;
        }

        .ah-sub {
          font-family: 'Barlow', sans-serif;
          font-size: 0.72rem; font-weight: 600;
          letter-spacing: 0.2em; text-transform: uppercase;
          opacity: 0; transform: translateY(10px);
          animation: ah-up 0.55s ease 0.4s forwards;
          transition: color 0.5s ease;
        }

        @keyframes ah-up  { to { opacity: 1; transform: translateY(0); } }
        @keyframes ah-line { to { opacity: 1; transform: scaleX(1); } }

        .ah-breadcrumb {
          position: absolute; bottom: 28px; left: clamp(28px, 6vw, 100px);
          z-index: 2;
          font-family: 'Barlow', sans-serif;
          font-size: 0.65rem; font-weight: 600;
          letter-spacing: 0.16em; text-transform: uppercase;
          display: flex; align-items: center; gap: 8px;
          opacity: 0; animation: ah-up 0.5s ease 0.5s forwards;
        }
        .ah-breadcrumb-sep { color: #FF5A1F; }

        .ah-scroll-hint {
          position: absolute; bottom: 28px; right: clamp(24px, 4vw, 64px);
          z-index: 2;
          display: flex; flex-direction: column; align-items: center; gap: 6px;
          opacity: 0; animation: ah-up 0.5s ease 0.6s forwards;
        }
        .ah-scroll-line {
          width: 1px; height: 36px;
          background: linear-gradient(to bottom, #FF5A1F, transparent);
          animation: ah-scroll-pulse 1.8s ease-in-out infinite;
        }
        @keyframes ah-scroll-pulse {
          0%, 100% { opacity: 0.4; transform: scaleY(1); }
          50%       { opacity: 1;   transform: scaleY(1.2); }
        }
        .ah-scroll-label {
          font-family: 'Barlow', sans-serif;
          font-size: 0.56rem; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase;
          writing-mode: vertical-rl;
        }

        /* Stat pills row */
        .ah-pills {
          display: flex; gap: 10px; flex-wrap: wrap;
          margin-top: 28px;
          opacity: 0; transform: translateY(12px);
          animation: ah-up 0.55s ease 0.52s forwards;
        }
        .ah-pill {
          font-family: 'Barlow', sans-serif;
          font-size: 0.6rem; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase;
          padding: 5px 14px;
          border-radius: 2px;
          border: 1px solid rgba(255,90,31,0.22);
          background: rgba(255,90,31,0.07);
          color: #FF5A1F;
          backdrop-filter: blur(6px);
        }
      `}</style>

      <div className="ah-wrap">
        {/* Background */}
        <div
          className="ah-bg"
          style={{
            backgroundImage: `url(${bgUrl})`,
            transform: `translateY(${parallax}px)`,
            filter: dark ? "brightness(0.55)" : "brightness(0.82) saturate(0.35)",
          }}
        />

        {/* Overlay */}
        <div
          className="ah-overlay"
          style={{ background: dark ? overlayDark : overlayLight }}
        />

        {/* Content */}
        <div className="ah-content">
          <p className="ah-eyebrow">
            <span style={{ width: "24px", height: "1.5px", background: "#FF5A1F", display: "inline-block" }} />
            VELT DRT Gear
          </p>
          <h1
            className="ah-title"
            style={{ color: dark ? "#C2C5CC" : "#111111" }}
          >
            ACCESSORIES
          </h1>
          <div className="ah-divider" />
          <p
            className="ah-sub"
            style={{ color: dark ? "#7A7F87" : "#6E6E73" }}
          >
            Everything the ride demands.
          </p>
          <div className="ah-pills">
            {["Helmets", "Riding Gear", "Chargers", "Bags & Storage", "Lighting"].map(t => (
              <span key={t} className="ah-pill">{t}</span>
            ))}
          </div>
        </div>

        {/* Breadcrumb */}
        <div
          className="ah-breadcrumb"
          style={{ color: dark ? "#7A7F87" : "#9A9AA0" }}
        >
          <span style={{ color: dark ? "rgba(194,197,204,0.45)" : "#9A9AA0" }}>Home</span>
          <span className="ah-breadcrumb-sep">›</span>
          <span style={{ color: dark ? "#C2C5CC" : "#111111" }}>Accessories</span>
        </div>

        {/* Scroll hint */}
        <div className="ah-scroll-hint">
          <span
            className="ah-scroll-label"
            style={{ color: dark ? "#7A7F87" : "#9A9AA0" }}
          >
            Scroll
          </span>
          <div className="ah-scroll-line" />
        </div>
      </div>
    </>
  );
}