import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "../ThemeContext";

const features = [
  {
    title: "Zero Emissions",
    desc: "Ride clean with 100% electric power. No fumes, no guilt — just pure, sustainable performance on every road.",
    accent: false,
    icon: (<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="56" height="56"><circle cx="32" cy="32" r="28" /><path d="M20 32c0-6.6 5.4-12 12-12s12 5.4 12 12-5.4 12-12 12" /><path d="M32 20v4M32 40v4M20 32h4M40 32h4" /><path d="M26 26l12 12M38 26L26 38" strokeWidth="1.4" opacity="0.5" /></svg>),
  },
  {
    title: "Cutting-Edge Tech",
    desc: "Smart TFT dashboard, app connectivity, real-time diagnostics and over-the-air firmware updates.",
    accent: true,
    icon: (<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="56" height="56"><rect x="8" y="16" width="48" height="28" rx="4" /><path d="M24 44v6M40 44v6M18 50h28" /><path d="M20 28h6M20 34h6M32 28h12M32 34h8" /><circle cx="46" cy="24" r="2" fill="currentColor" /></svg>),
  },
  {
    title: "Fast Charging",
    desc: "0 to 80% in under 2 hours. Swap-ready battery system with charging stations across the city.",
    accent: false,
    icon: (<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="56" height="56"><path d="M20 8h16l-4 20h12L18 56l6-28H8L20 8z" /></svg>),
  },
  {
    title: "Safety First",
    desc: "ABS braking, traction control, LED lighting, and 24/7 roadside support on every VELT model.",
    accent: false,
    icon: (<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="56" height="56"><path d="M32 6l22 8v18c0 12-10 22-22 26C20 54 10 44 10 32V14L32 6z" /><path d="M22 32l7 7 13-13" /></svg>),
  },
];

function FeatureCard({ feature, index, inView, dark }) {
  return (
    <div
      className={`feat-card ${feature.accent ? "feat-card--accent" : ""} ${inView ? "feat-card--visible" : ""} ${dark ? "feat-card--dark" : "feat-card--light"}`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      <div className="feat-icon-wrap">
        <div className="feat-icon">{feature.icon}</div>
        <div className="feat-icon-glow" />
      </div>
      <h3 className="feat-title">{feature.title}</h3>
      <p className="feat-desc">{feature.desc}</p>
      <div className="feat-line" />
    </div>
  );
}

export default function FeaturesSection() {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);
  const { dark } = useTheme();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@300;400;600;700&display=swap');

        .feat-section {
          position: relative;
          padding: clamp(72px,12vh,130px) clamp(20px,5vw,80px);
          overflow: hidden;
          transition: background 0.5s ease;
        }
        .feat-section.dark  { background: #0B0B0C; }
        .feat-section.light { background: #F1F1F1; }

        .feat-section::before {
          content: '';
          position: absolute; top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 600px; height: 600px;
          background: radial-gradient(circle, rgba(255,90,31,0.05) 0%, transparent 65%);
          pointer-events: none;
        }

        .feat-header { text-align: center; margin-bottom: clamp(40px,6vw,72px); position: relative; }

        .feat-eyebrow {
          font-family: 'Barlow', sans-serif; font-size: 0.72rem; font-weight: 700;
          letter-spacing: 0.25em; text-transform: uppercase; color: #FF5A1F;
          margin-bottom: 14px; opacity: 0; transform: translateY(16px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .feat-eyebrow.visible { opacity: 1; transform: translateY(0); }

        .feat-heading {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(36px,5.5vw,72px); letter-spacing: 0.03em; line-height: 1;
          opacity: 0; transform: translateY(20px);
          transition: opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s, color 0.5s ease;
        }
        .feat-heading.visible { opacity: 1; transform: translateY(0); }
        .feat-section.dark  .feat-heading { color: #C2C5CC; }
        .feat-section.light .feat-heading { color: #111111; }

        .feat-grid {
          display: grid; grid-template-columns: repeat(4,1fr);
          gap: 16px; max-width: 1400px; margin: 0 auto; position: relative;
        }
        @media (max-width: 1024px) { .feat-grid { grid-template-columns: repeat(2,1fr); } }
        @media (max-width: 560px)  { .feat-grid { grid-template-columns: 1fr; } }

        /* Card base */
        .feat-card {
          border-radius: 16px;
          padding: clamp(28px,4vw,44px) clamp(22px,3vw,36px);
          display: flex; flex-direction: column; align-items: center; text-align: center;
          position: relative; overflow: hidden; cursor: default;
          opacity: 0; transform: translateY(40px) scale(0.97);
          transition:
            opacity 0.65s cubic-bezier(0.22,1,0.36,1),
            transform 0.65s cubic-bezier(0.22,1,0.36,1),
            background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease;
        }
        .feat-card--visible { opacity: 1; transform: translateY(0) scale(1); }

        /* Dark card */
        .feat-card--dark:not(.feat-card--accent) {
          background: #16171A;
          border: 1px solid rgba(255,255,255,0.05);
        }
        .feat-card--dark:not(.feat-card--accent):hover {
          background: #1c1e22;
          border-color: rgba(255,90,31,0.2);
          box-shadow: 0 24px 60px rgba(255,90,31,0.08), 0 4px 16px rgba(0,0,0,0.5);
          transform: translateY(-6px) scale(1.01);
        }

        /* Light card */
        .feat-card--light:not(.feat-card--accent) {
          background: #FFFFFF;
          border: 1px solid #D9D9DE;
          box-shadow: 0 2px 16px rgba(0,0,0,0.04);
        }
        .feat-card--light:not(.feat-card--accent):hover {
          background: #FAFAFA;
          border-color: rgba(255,90,31,0.3);
          box-shadow: 0 24px 60px rgba(255,90,31,0.08), 0 4px 16px rgba(0,0,0,0.06);
          transform: translateY(-6px) scale(1.01);
        }

        /* Accent card */
        .feat-card--accent {
          background: #FF5A1F; border: 1px solid transparent;
          box-shadow: 0 20px 60px rgba(255,90,31,0.35);
          transform: translateY(-12px) scale(1.02);
        }
        .feat-card--accent.feat-card--visible { transform: translateY(-12px) scale(1.02); }
        .feat-card--accent:hover { box-shadow: 0 28px 72px rgba(255,90,31,0.5); transform: translateY(-18px) scale(1.03) !important; }

        /* Shimmer */
        .feat-card::after {
          content: ''; position: absolute; top: -60%; left: -60%;
          width: 60%; height: 200%; transform: skewX(-15deg);
          transition: left 0.6s ease; pointer-events: none;
        }
        .feat-card--dark::after  { background: linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.04) 50%, transparent 70%); }
        .feat-card--light::after { background: linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.6) 50%, transparent 70%); }
        .feat-card:hover::after  { left: 140%; }

        /* Icon */
        .feat-icon-wrap { position: relative; margin-bottom: 24px; }
        .feat-icon { position: relative; z-index: 1; transition: transform 0.4s cubic-bezier(0.22,1,0.36,1), color 0.4s ease; }
        .feat-card--dark  .feat-icon { color: #C2C5CC; }
        .feat-card--light .feat-icon { color: #111111; }
        .feat-card--accent .feat-icon { color: #fff !important; }
        .feat-card:hover .feat-icon { transform: scale(1.12) translateY(-4px); }

        .feat-icon-glow {
          position: absolute; inset: -12px; border-radius: 50%;
          filter: blur(12px); opacity: 0; transition: opacity 0.3s;
        }
        .feat-card--dark  .feat-icon-glow { background: rgba(194,197,204,0.06); }
        .feat-card--light .feat-icon-glow { background: rgba(255,90,31,0.08); }
        .feat-card:hover .feat-icon-glow { opacity: 1; }
        .feat-card--accent .feat-icon-glow { background: rgba(255,255,255,0.15); opacity: 0.6; }

        /* Text */
        .feat-title {
          font-family: 'Barlow', sans-serif; font-weight: 700;
          font-size: clamp(1rem,1.6vw,1.15rem); margin-bottom: 12px;
          letter-spacing: 0.01em; transition: color 0.4s ease;
        }
        .feat-card--dark  .feat-title { color: #C2C5CC; }
        .feat-card--light .feat-title { color: #111111; }
        .feat-card--accent .feat-title { color: #fff !important; }

        .feat-desc {
          font-family: 'Barlow', sans-serif; font-size: 0.88rem;
          line-height: 1.7; flex: 1; transition: color 0.4s ease;
        }
        .feat-card--dark  .feat-desc { color: #7A7F87; }
        .feat-card--light .feat-desc { color: #6E6E73; }
        .feat-card--accent .feat-desc { color: rgba(255,255,255,0.85) !important; }

        .feat-line {
          width: 32px; height: 2px; border-radius: 2px; margin-top: 24px;
          transition: width 0.4s ease, background 0.3s;
        }
        .feat-card--dark  .feat-line { background: rgba(194,197,204,0.12); }
        .feat-card--light .feat-line { background: #D9D9DE; }
        .feat-card:hover   .feat-line { width: 56px; background: #FF5A1F; }
        .feat-card--accent .feat-line { background: rgba(255,255,255,0.4); }
        .feat-card--accent:hover .feat-line { background: #fff; width: 56px; }
      `}</style>

      <section className={`feat-section ${dark ? "dark" : "light"}`} ref={sectionRef}>
        <div className="feat-header">
          <p className={`feat-eyebrow ${inView ? "visible" : ""}`}>Why Choose VELT</p>
          <h2 className={`feat-heading ${inView ? "visible" : ""}`}>Built Different. Built Better.</h2>
        </div>
        <div className="feat-grid">
          {features.map((f, i) => (
            <FeatureCard key={i} feature={f} index={i} inView={inView} dark={dark} />
          ))}
        </div>
      </section>
    </>
  );
}