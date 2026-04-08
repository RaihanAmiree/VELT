import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../ThemeContext";

export default function AboutHero() {
  const { dark } = useTheme();
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);
  const lineRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  /* ── Same overlay logic as HeroCarousel ── */
  const overlayLeft = dark
    ? "linear-gradient(105deg, rgba(11,11,12,0.92) 0%, rgba(11,11,12,0.65) 38%, rgba(11,11,12,0.15) 65%, transparent 100%)"
    : "linear-gradient(105deg, rgba(250,250,250,0.94) 0%, rgba(250,250,250,0.72) 40%, rgba(250,250,250,0.12) 65%, transparent 100%)";
  const overlayBottom = dark
    ? "linear-gradient(to top, rgba(11,11,12,0.7) 0%, transparent 45%)"
    : "linear-gradient(to top, rgba(250,250,250,0.55) 0%, transparent 40%)";
  const overlayTop = dark
    ? "linear-gradient(to bottom, rgba(11,11,12,0.3) 0%, transparent 25%)"
    : "linear-gradient(to bottom, rgba(250,250,250,0.28) 0%, transparent 25%)";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@300;400;600;700;800&display=swap');

        .about-hero-wrap {
          position: relative;
          height: 100vh;
          min-height: 600px;
          overflow: hidden;
          transition: background 0.6s ease;
          background: ${dark ? "#0B0B0C" : "#FAFAFA"};
        }

        /* ── Static background image ── */
        .about-hero-bg {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center 30%;
          transform: scale(1.04);
          animation: ah-slowZoom 10s ease forwards;
        }
        @keyframes ah-slowZoom {
          from { transform: scale(1.04); }
          to   { transform: scale(1); }
        }

        /* ── Overlays — identical structure to HeroCarousel ── */
        .about-hero-overlay-left   { position: absolute; inset: 0; transition: background 0.6s ease; }
        .about-hero-overlay-bottom { position: absolute; inset: 0; transition: background 0.6s ease; }
        .about-hero-overlay-top    { position: absolute; inset: 0; transition: background 0.6s ease; }

        /* ── Content block ── */
        .about-hero-content {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          left: clamp(28px, 6vw, 100px);
          z-index: 5;
          max-width: 640px;
        }

        /* ── Eyebrow ── */
        .about-hero-eyebrow {
          font-family: 'Barlow', sans-serif;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #FF5A1F;
          margin: 0 0 18px;
          opacity: 0;
          transform: translateY(12px);
          animation: ah-slideUp 0.6s ease 0.1s forwards;
        }

        /* ── Giant Bebas title ── */
        .about-hero-name {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(80px, 12vw, 160px);
          line-height: 0.88;
          letter-spacing: 0.04em;
          margin: 0 0 0;
          opacity: 0;
          transform: translateY(20px);
          animation: ah-slideUp 0.7s ease 0.2s forwards;
          transition: color 0.5s ease;
          color: ${dark ? "#FFFFFF" : "#0B0B0C"};
        }

        /* ── Tagline under name ── */
        .about-hero-tagline {
          font-family: 'Barlow', sans-serif;
          font-size: clamp(1.1rem, 2vw, 1.65rem);
          font-weight: 800;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          margin: 14px 0 26px;
          opacity: 0;
          transform: translateY(14px);
          animation: ah-slideUp 0.65s ease 0.28s forwards;
          transition: color 0.5s ease;
          color: ${dark ? "#FFFFFF" : "#0B0B0C"};
        }

        /* ── Orange divider ── */
        .about-hero-divider {
          width: 48px;
          height: 1.5px;
          background: #FF5A1F;
          margin-bottom: 28px;
          opacity: 0;
          transform: scaleX(0);
          transform-origin: left;
          animation: ah-growLine 0.5s ease 0.36s forwards;
        }
        @keyframes ah-growLine { to { opacity: 1; transform: scaleX(1); } }

        /* ── Sub text ── */
        .about-hero-sub {
          font-family: 'Barlow', sans-serif;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          margin: 0 0 40px;
          opacity: 0;
          transform: translateY(12px);
          animation: ah-slideUp 0.6s ease 0.42s forwards;
          transition: color 0.5s ease;
          color: ${dark ? "#7A7F87" : "#6E6E73"};
        }

        /* ── CTA button — same as HeroCarousel .hero-btn ── */
        .about-hero-btn {
          font-family: 'Barlow', sans-serif;
          font-weight: 700;
          font-size: 0.75rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: ${dark ? "#C2C5CC" : "#111111"};
          background: transparent;
          border: 1px solid rgba(255,90,31,0.5);
          padding: 13px 28px;
          display: inline-flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          opacity: 0;
          transform: translateY(10px);
          animation: ah-slideUp 0.6s ease 0.5s forwards;
          transition: gap 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease, color 0.3s ease;
        }
        .about-hero-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #FF5A1F;
          transform: translateX(-101%);
          transition: transform 0.35s cubic-bezier(0.4,0,0.2,1);
        }
        .about-hero-btn:hover::before { transform: translateX(0); }
        .about-hero-btn:hover {
          gap: 18px;
          border-color: #FF5A1F;
          color: #fff;
          box-shadow: 0 0 24px rgba(255,90,31,0.3);
        }
        .about-hero-btn span,
        .about-hero-btn svg { position: relative; z-index: 1; }

        /* ── Scroll indicator — bottom center ── */
        .about-hero-scroll {
          position: absolute;
          bottom: clamp(32px, 6vh, 56px);
          left: 50%;
          transform: translateX(-50%);
          z-index: 5;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          opacity: 0;
          animation: ah-fadeIn 0.8s ease 1s forwards;
        }
        .about-hero-scroll-label {
          font-family: 'Barlow', sans-serif;
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          transition: color 0.5s ease;
          color: ${dark ? "#7A7F87" : "#6E6E73"};
        }
        .about-hero-scroll-line {
          width: 1px;
          height: 40px;
          background: rgba(255,90,31,0.4);
          position: relative;
          overflow: hidden;
        }
        .about-hero-scroll-line::after {
          content: '';
          position: absolute;
          top: -100%;
          left: 0;
          width: 100%;
          height: 100%;
          background: #FF5A1F;
          animation: ah-scrollDrop 1.8s ease-in-out 1.2s infinite;
        }
        @keyframes ah-scrollDrop {
          0%   { top: -100%; }
          50%  { top: 100%; }
          100% { top: 100%; }
        }

        /* ── "About" side label — mirrors the counter position ── */
        .about-hero-sidetag {
          position: absolute;
          top: clamp(90px, 12vh, 130px);
          right: clamp(24px, 4vw, 64px);
          z-index: 5;
          font-family: 'Barlow', sans-serif;
          display: flex;
          align-items: center;
          gap: 10px;
          opacity: 0;
          animation: ah-fadeIn 0.7s ease 0.6s forwards;
        }
        .about-hero-sidetag-num {
          font-size: 2.4rem;
          font-weight: 700;
          line-height: 1;
          transition: color 0.5s ease;
          color: ${dark ? "#C2C5CC" : "#111111"};
        }
        .about-hero-sidetag-sep {
          width: 1px;
          height: 32px;
          transform: rotate(20deg);
          transition: background 0.5s ease;
          background: ${dark ? "rgba(194,197,204,0.2)" : "#D9D9DE"};
        }
        .about-hero-sidetag-word {
          font-size: 0.9rem;
          font-weight: 600;
          line-height: 1;
          align-self: flex-end;
          margin-bottom: 4px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          transition: color 0.5s ease;
          color: ${dark ? "#7A7F87" : "#9A9AA0"};
        }

        /* ── Vertical side dots strip — mirrors HeroCarousel ── */
        .about-hero-dots {
          position: absolute;
          right: clamp(24px, 4vw, 64px);
          top: 50%;
          transform: translateY(-50%);
          z-index: 5;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .about-hero-dot {
          width: 3px;
          border-radius: 2px;
          transition: background 0.5s ease;
          background: ${dark ? "rgba(194,197,204,0.2)" : "#D9D9DE"};
        }
        .about-hero-dot.tall  { height: 44px; background: #FF5A1F; }
        .about-hero-dot.short { height: 24px; }

        @keyframes ah-slideUp { to { opacity: 1; transform: translateY(0); } }
        @keyframes ah-fadeIn  { to { opacity: 1; } }
      `}</style>

      <section className="about-hero-wrap">

        {/* ── Static BG image — swap src for your actual asset ── */}
        <div
          className="about-hero-bg"
          style={{
            backgroundImage: dark
              ? "url('/images/about-hero-dark.jpg')"
              : "url('/images/about-hero-light.jpg')",
          }}
        />

        {/* ── Overlays — same structure as HeroCarousel ── */}
        <div className="about-hero-overlay-left"   style={{ background: overlayLeft }} />
        <div className="about-hero-overlay-bottom" style={{ background: overlayBottom }} />
        <div className="about-hero-overlay-top"    style={{ background: overlayTop }} />

        {/* ── Main content ── */}
        <div className="about-hero-content">
          <p className="about-hero-eyebrow">Our story</p>

          <h1 className="about-hero-name">About<br />Us</h1>

          <p className="about-hero-tagline">Built for the road less ridden.</p>

          <div className="about-hero-divider" />

          <p className="about-hero-sub">Electric. Engineered. Uncompromised.</p>

          <button className="about-hero-btn" onClick={() => navigate("/products")}>
            <span>Shop the lineup</span>
            <svg
              width="14" height="14" viewBox="0 0 24 24"
              fill="none" stroke="currentColor"
              strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* ── Side counter — mirrors HeroCarousel position ── */}
        <div className="about-hero-sidetag">
          <span className="about-hero-sidetag-num">01</span>
          <div className="about-hero-sidetag-sep" />
          <span className="about-hero-sidetag-word">About</span>
        </div>

        {/* ── Side dots strip — mirrors HeroCarousel ── */}
        <div className="about-hero-dots">
          <div className="about-hero-dot tall" />
          <div className="about-hero-dot short" />
          <div className="about-hero-dot short" />
        </div>

        {/* ── Scroll indicator ── */}
        <div className="about-hero-scroll">
          <span className="about-hero-scroll-label">Scroll</span>
          <div className="about-hero-scroll-line" />
        </div>

      </section>
    </>
  );
}