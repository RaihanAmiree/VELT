import { useEffect, useState } from "react";
import { useTheme } from "../ThemeContext";

export default function ProductsHero() {
  const { dark } = useTheme();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const parallax = scrollY * 0.3;

  const bgDark  = "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80";
  const bgLight = "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80";

  const overlayDark  = "linear-gradient(to bottom, rgba(11,11,12,0.55) 0%, rgba(11,11,12,0.72) 60%, rgba(11,11,12,1) 100%)";
  const overlayLight = "linear-gradient(to bottom, rgba(250,250,250,0.45) 0%, rgba(250,250,250,0.68) 60%, rgba(250,250,250,1) 100%)";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@300;400;600;700&display=swap');

        .ph-wrap {
          position: relative;
          height: 55vh;
          min-height: 380px;
          max-height: 560px;
          overflow: hidden;
          display: flex;
          align-items: center;
        }

        .ph-bg {
          position: absolute; inset: 0;
          background-size: cover;
          background-position: center 40%;
          will-change: transform;
          transition: opacity 0.6s ease;
        }

        .ph-overlay { position: absolute; inset: 0; }

        .ph-content {
          position: relative; z-index: 2;
          padding-left: clamp(28px, 6vw, 100px);
          padding-top: 80px;
        }

        .ph-eyebrow {
          font-family: 'Barlow', sans-serif;
          font-size: 0.68rem; font-weight: 700;
          letter-spacing: 0.3em; text-transform: uppercase;
          color: #FF5A1F;
          display: flex; align-items: center; gap: 12px;
          margin-bottom: 16px;
          opacity: 0; transform: translateY(10px);
          animation: ph-up 0.55s ease 0.1s forwards;
        }

        .ph-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(3.2rem, 8vw, 7rem);
          line-height: 0.92; letter-spacing: 0.03em;
          margin: 0 0 20px;
          opacity: 0; transform: translateY(20px);
          animation: ph-up 0.65s ease 0.2s forwards;
          transition: color 0.5s ease;
        }

        .ph-divider {
          width: 44px; height: 1.5px;
          background: #FF5A1F;
          margin-bottom: 20px;
          opacity: 0; transform: scaleX(0); transform-origin: left;
          animation: ph-line 0.5s ease 0.32s forwards;
        }

        .ph-sub {
          font-family: 'Barlow', sans-serif;
          font-size: 0.72rem; font-weight: 600;
          letter-spacing: 0.2em; text-transform: uppercase;
          opacity: 0; transform: translateY(10px);
          animation: ph-up 0.55s ease 0.4s forwards;
          transition: color 0.5s ease;
        }

        @keyframes ph-up  { to { opacity: 1; transform: translateY(0); } }
        @keyframes ph-line { to { opacity: 1; transform: scaleX(1); } }

        /* Breadcrumb */
        .ph-breadcrumb {
          position: absolute; bottom: 28px; left: clamp(28px, 6vw, 100px);
          z-index: 2;
          font-family: 'Barlow', sans-serif;
          font-size: 0.65rem; font-weight: 600;
          letter-spacing: 0.16em; text-transform: uppercase;
          display: flex; align-items: center; gap: 8px;
          opacity: 0; animation: ph-up 0.5s ease 0.5s forwards;
        }
        .ph-breadcrumb-sep { color: #FF5A1F; }

        /* Scroll hint */
        .ph-scroll-hint {
          position: absolute; bottom: 28px; right: clamp(24px, 4vw, 64px);
          z-index: 2;
          display: flex; flex-direction: column; align-items: center; gap: 6px;
          opacity: 0; animation: ph-up 0.5s ease 0.6s forwards;
        }
        .ph-scroll-line {
          width: 1px; height: 36px;
          background: linear-gradient(to bottom, #FF5A1F, transparent);
          animation: ph-scroll-pulse 1.8s ease-in-out infinite;
        }
        @keyframes ph-scroll-pulse {
          0%, 100% { opacity: 0.4; transform: scaleY(1); }
          50% { opacity: 1; transform: scaleY(1.2); }
        }
        .ph-scroll-label {
          font-family: 'Barlow', sans-serif;
          font-size: 0.56rem; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase;
          writing-mode: vertical-rl;
        }
      `}</style>

      <div className="ph-wrap">
        {/* Background */}
        <div
          className="ph-bg"
          style={{
            backgroundImage: `url(${dark ? bgDark : bgLight})`,
            transform: `translateY(${parallax}px)`,
            filter: dark ? "brightness(0.6)" : "brightness(0.85) saturate(0.4)",
          }}
        />

        {/* Overlay */}
        <div
          className="ph-overlay"
          style={{ background: dark ? overlayDark : overlayLight }}
        />

        {/* Content */}
        <div className="ph-content">
          <p className="ph-eyebrow">
            <span style={{ width: "24px", height: "1.5px", background: "#FF5A1F", display: "inline-block" }} />
            VELT DRT Collection
          </p>
          <h1
            className="ph-title"
            style={{ color: dark ? "#C2C5CC" : "#111111" }}
          >
            THE LINEUP
          </h1>
          <div className="ph-divider" />
          <p
            className="ph-sub"
            style={{ color: dark ? "#7A7F87" : "#6E6E73" }}
          >
            Every machine. Built for the ride.
          </p>
        </div>

        {/* Breadcrumb */}
        <div
          className="ph-breadcrumb"
          style={{ color: dark ? "#7A7F87" : "#9A9AA0" }}
        >
          <span style={{ color: dark ? "rgba(194,197,204,0.45)" : "#9A9AA0" }}>Home</span>
          <span className="ph-breadcrumb-sep">›</span>
          <span style={{ color: dark ? "#C2C5CC" : "#111111" }}>Products</span>
        </div>

        {/* Scroll hint */}
        <div className="ph-scroll-hint">
          <span
            className="ph-scroll-label"
            style={{ color: dark ? "#7A7F87" : "#9A9AA0" }}
          >
            Scroll
          </span>
          <div className="ph-scroll-line" />
        </div>
      </div>
    </>
  );
}