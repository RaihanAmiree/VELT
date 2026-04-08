import { useEffect, useState } from "react";
import { useTheme } from "../ThemeContext";

export default function ComparisonHero() {
  const { dark } = useTheme();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const parallax = scrollY * 0.3;

  // Cinematic Background - Neutral but powerful for the "Null State"
  const bgImage = "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80";

  const overlayDark  = "linear-gradient(to bottom, rgba(11,11,12,0.6) 0%, rgba(11,11,12,0.8) 60%, rgba(11,11,12,1) 100%)";
  const overlayLight = "linear-gradient(to bottom, rgba(250,250,250,0.5) 0%, rgba(250,250,250,0.7) 60%, rgba(250,250,250,1) 100%)";

  return (
    <>
      <style>{`
        .ch-wrap {
          position: relative;
          height: 60vh;
          min-height: 450px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        .ch-bg {
          position: absolute; inset: 0;
          background-size: cover;
          background-position: center;
          will-change: transform;
          transition: filter 0.6s ease;
        }

        .ch-overlay { position: absolute; inset: 0; z-index: 1; }

        .ch-content {
          position: relative; 
          z-index: 2;
          padding: 0 20px;
          max-width: 900px;
        }

        .ch-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(3.5rem, 10vw, 8.5rem);
          line-height: 0.85;
          letter-spacing: -0.02em;
          margin: 0 0 15px;
          opacity: 0;
          transform: translateY(30px);
          animation: ch-reveal 0.8s cubic-bezier(0.2, 1, 0.3, 1) forwards;
        }

        .ch-sub {
          font-family: 'Barlow', sans-serif;
          font-size: clamp(0.75rem, 2vw, 0.9rem);
          font-weight: 600;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          opacity: 0;
          transform: translateY(20px);
          animation: ch-reveal 0.8s cubic-bezier(0.2, 1, 0.3, 1) 0.2s forwards;
        }

        .ch-accent-line {
          width: 60px;
          height: 3px;
          background: #FF5A1F;
          margin: 30px auto;
          opacity: 0;
          transform: scaleX(0);
          animation: ch-line-grow 0.6s ease 0.4s forwards;
        }

        @keyframes ch-reveal {
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes ch-line-grow {
          to { opacity: 1; transform: scaleX(1); }
        }

        /* Simplified Breadcrumb for Comparison */
        .ch-breadcrumb {
          position: absolute; 
          top: 40px; 
          left: clamp(28px, 6vw, 100px);
          z-index: 3;
          font-family: 'Barlow', sans-serif;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .ch-sep { color: #FF5A1F; }
      `}</style>

      <div className="ch-wrap">
        {/* Background with Parallax and Blur */}
        <div
          className="ch-bg"
          style={{
            backgroundImage: `url(${bgImage})`,
            transform: `translateY(${parallax}px) scale(1.05)`,
            filter: dark ? "brightness(0.4) grayscale(0.2)" : "brightness(0.9) saturate(0.8)",
          }}
        />

        {/* Dynamic Overlay */}
        <div
          className="ch-overlay"
          style={{ background: dark ? overlayDark : overlayLight }}
        />

        {/* Global Breadcrumb Navigation */}
        <div className="ch-breadcrumb" style={{ color: dark ? "#7A7F87" : "#9A9AA0" }}>
          <span>Home</span>
          <span className="ch-sep">/</span>
          <span style={{ color: dark ? "#C2C5CC" : "#111111" }}>Compare</span>
        </div>

        {/* Hero Content */}
        <div className="ch-content">
          <h1 className="ch-title" style={{ color: dark ? "#FFFFFF" : "#111111" }}>
            HEAD TO HEAD
          </h1>
          <div className="ch-accent-line" />
          <p className="ch-sub" style={{ color: dark ? "#7A7F87" : "#6E6E73" }}>
            Select two machines to compare technical DNA
          </p>
        </div>
      </div>
    </>
  );
}