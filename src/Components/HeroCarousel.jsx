import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../ThemeContext";

export default function HeroCarousel() {
  const [slides, setSlides]     = useState([]);
  const [loading, setLoading]   = useState(true);
  const [current, setCurrent]   = useState(0);
  const [animating, setAnimating] = useState(false);
  const timerRef  = useRef(null);
  const navigate  = useNavigate();
  const { dark }  = useTheme();

  /* ── Fetch products.json ── */
  useEffect(() => {
    fetch("/products.json")
      .then(r => r.json())
      .then(data => { setSlides(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const goTo = useCallback((index) => {
    if (animating || !slides.length) return;
    setAnimating(true);
    setCurrent((index + slides.length) % slides.length);
    setTimeout(() => setAnimating(false), 800);
  }, [animating, slides.length]);

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  /* ── Auto-play ── */
  useEffect(() => {
    if (!slides.length) return;
    timerRef.current = setInterval(next, 6000);
    return () => clearInterval(timerRef.current);
  }, [next, slides.length]);

  const resetTimer = (fn) => {
    clearInterval(timerRef.current);
    fn();
    timerRef.current = setInterval(next, 6000);
  };

  /* ── Loading state ── */
  if (loading || !slides.length) {
    return (
      <section style={{
        position: "relative", height: "100vh", minHeight: "600px",
        background: dark ? "#0B0B0C" : "#FAFAFA",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <div style={{
          width: "36px", height: "36px", borderRadius: "50%",
          border: "2px solid rgba(255,90,31,0.2)",
          borderTopColor: "#FF5A1F",
          animation: "hl-spin 0.75s linear infinite",
        }} />
        <style>{`@keyframes hl-spin { to { transform: rotate(360deg); } }`}</style>
      </section>
    );
  }

  const slide = slides[current];

  /* ── Overlays ── */
  const overlayLeft   = dark
    ? "linear-gradient(105deg, rgba(11,11,12,0.92) 0%, rgba(11,11,12,0.65) 38%, rgba(11,11,12,0.15) 65%, transparent 100%)"
    : "linear-gradient(105deg, rgba(250,250,250,0.94) 0%, rgba(250,250,250,0.72) 40%, rgba(250,250,250,0.12) 65%, transparent 100%)";
  const overlayBottom = dark
    ? "linear-gradient(to top, rgba(11,11,12,0.7) 0%, transparent 45%)"
    : "linear-gradient(to top, rgba(250,250,250,0.55) 0%, transparent 40%)";
  const overlayTop    = dark
    ? "linear-gradient(to bottom, rgba(11,11,12,0.3) 0%, transparent 25%)"
    : "linear-gradient(to bottom, rgba(250,250,250,0.28) 0%, transparent 25%)";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@300;400;600;700&display=swap');

        .hero-wrap {
          position: relative; height: 100vh; min-height: 600px;
          overflow: hidden;
          transition: background 0.6s ease;
          background: ${dark ? "#0B0B0C" : "#FAFAFA"};
        }

        .hero-bg {
          position: absolute; inset: 0;
          background-size: cover; background-position: center 30%;
          opacity: 0; transition: opacity 1s ease; transform: scale(1.04);
        }
        .hero-bg.active { opacity: 1; animation: slowZoom 8s ease forwards; }
        @keyframes slowZoom { from { transform: scale(1.04); } to { transform: scale(1); } }

        .hero-overlay-left   { position: absolute; inset: 0; transition: background 0.6s ease; }
        .hero-overlay-bottom { position: absolute; inset: 0; transition: background 0.6s ease; }
        .hero-overlay-top    { position: absolute; inset: 0; transition: background 0.6s ease; }

        .hero-content {
          position: absolute; top: 50%; transform: translateY(-50%);
          left: clamp(28px, 6vw, 100px); z-index: 5; max-width: 600px;
        }

        .hero-eyebrow {
          font-family: 'Barlow', sans-serif; font-size: 0.7rem; font-weight: 700;
          letter-spacing: 0.28em; text-transform: uppercase;
          color: #FF5A1F; margin-bottom: 18px;
          opacity: 0; transform: translateY(12px);
          animation: slideUp 0.6s ease 0.1s forwards;
        }

        .hero-name {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(80px, 12vw, 160px);
          line-height: 0.88; letter-spacing: 0.04em;
          margin-bottom: 0;
          opacity: 0; transform: translateY(20px);
          animation: slideUp 0.7s ease 0.2s forwards;
          transition: color 0.5s ease;
          color: ${dark ? "#FFFFFF" : "#0B0B0C"};
        }

        .hero-tagline-text {
          font-family: 'Barlow', sans-serif;
          font-size: clamp(1.2rem, 2.2vw, 1.75rem);
          font-weight: 800;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          margin-top: 14px;
          margin-bottom: 26px;
          opacity: 0; transform: translateY(14px);
          animation: slideUp 0.65s ease 0.28s forwards;
          transition: color 0.5s ease;
          color: ${dark ? "#FFFFFF" : "#0B0B0C"};
        }

        .hero-divider {
          width: 48px; height: 1.5px; background: #FF5A1F; margin-bottom: 28px;
          opacity: 0; transform: scaleX(0); transform-origin: left;
          animation: growLine 0.5s ease 0.36s forwards;
        }
        @keyframes growLine { to { opacity: 1; transform: scaleX(1); } }

        .hero-sub {
          font-family: 'Barlow', sans-serif; font-size: 0.72rem; font-weight: 600;
          letter-spacing: 0.22em; text-transform: uppercase; margin-bottom: 40px;
          opacity: 0; transform: translateY(12px);
          animation: slideUp 0.6s ease 0.42s forwards;
          transition: color 0.5s ease;
          color: ${dark ? "#7A7F87" : "#6E6E73"};
        }

        .hero-btn {
          font-family: 'Barlow', sans-serif; font-weight: 700; font-size: 0.75rem;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: ${dark ? "#C2C5CC" : "#111111"};
          background: transparent;
          border: 1px solid rgba(255,90,31,0.5);
          padding: 13px 28px; display: inline-flex; align-items: center; gap: 12px;
          cursor: pointer; position: relative; overflow: hidden;
          opacity: 0; transform: translateY(10px);
          animation: slideUp 0.6s ease 0.5s forwards;
          transition: gap 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease, color 0.3s ease;
        }
        .hero-btn::before {
          content: ''; position: absolute; inset: 0;
          background: #FF5A1F; transform: translateX(-101%);
          transition: transform 0.35s cubic-bezier(0.4,0,0.2,1);
        }
        .hero-btn:hover::before { transform: translateX(0); }
        .hero-btn:hover { gap: 18px; border-color: #FF5A1F; color: #fff; box-shadow: 0 0 24px rgba(255,90,31,0.3); }
        .hero-btn span, .hero-btn svg { position: relative; z-index: 1; }

        @keyframes slideUp { to { opacity: 1; transform: translateY(0); } }

        .hero-counter {
          position: absolute; top: clamp(90px,12vh,130px); right: clamp(24px,4vw,64px);
          z-index: 5; font-family: 'Barlow', sans-serif;
          display: flex; align-items: center; gap: 10px;
        }
        .hero-counter-cur {
          font-size: 2.4rem; font-weight: 700; line-height: 1;
          transition: color 0.5s ease;
          color: ${dark ? "#C2C5CC" : "#111111"};
        }
        .hero-counter-sep {
          width: 1px; height: 32px; transform: rotate(20deg);
          transition: background 0.5s ease;
          background: ${dark ? "rgba(194,197,204,0.2)" : "#D9D9DE"};
        }
        .hero-counter-total {
          font-size: 0.9rem; font-weight: 600; line-height: 1;
          align-self: flex-end; margin-bottom: 4px;
          transition: color 0.5s ease;
          color: ${dark ? "#7A7F87" : "#9A9AA0"};
        }

        .hero-dots {
          position: absolute; right: clamp(24px,4vw,64px); top: 50%;
          transform: translateY(-50%); z-index: 5;
          display: flex; flex-direction: column; gap: 10px;
        }
        .hero-dot {
          width: 3px; height: 24px; border-radius: 2px; cursor: pointer;
          transition: all 0.4s ease;
          background: ${dark ? "rgba(194,197,204,0.2)" : "#D9D9DE"};
        }
        .hero-dot.active { height: 44px; background: #FF5A1F; }

        .hero-arrows {
          position: absolute; bottom: clamp(32px,6vh,56px); right: clamp(24px,4vw,64px);
          z-index: 5; display: flex; gap: 10px;
        }
        .arrow-btn {
          width: 44px; height: 44px; border-radius: 50%;
          backdrop-filter: blur(8px);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: all 0.25s ease;
          border: 1px solid ${dark ? "rgba(194,197,204,0.18)" : "#D9D9DE"};
          background: ${dark ? "rgba(194,197,204,0.05)" : "rgba(255,255,255,0.6)"};
          color: ${dark ? "rgba(194,197,204,0.75)" : "#6E6E73"};
        }
        .arrow-btn:hover {
          border-color: #FF5A1F;
          background: rgba(255,90,31,0.12);
          color: ${dark ? "#C2C5CC" : "#111111"};
          transform: scale(1.08);
        }
      `}</style>

      <section className="hero-wrap">

        {/* ── Backgrounds ── */}
        {slides.map((s, i) => (
          <div
            key={s.id}
            className={`hero-bg ${i === current ? "active" : ""}`}
            style={{ backgroundImage: `url(${dark ? s.bgDark : s.bgLight})` }}
          />
        ))}

        <div className="hero-overlay-left"   style={{ background: overlayLeft }} />
        <div className="hero-overlay-bottom" style={{ background: overlayBottom }} />
        <div className="hero-overlay-top"    style={{ background: overlayTop }} />

        {/* ── Content ── */}
        <div className="hero-content" key={`content-${current}`}>
          {/* eyebrow = category */}
          <p className="hero-eyebrow">{slide.category}</p>

          {/* name in giant Bebas */}
          <h1 className="hero-name">{slide.name}</h1>

          {/* tagline under name */}
          <p className="hero-tagline-text">{slide.tagline}</p>

          <div className="hero-divider" />

          {/* sub = heroSub from json */}
          <p className="hero-sub">{slide.heroSub}</p>

          <button className="hero-btn" onClick={() => navigate(`/products/${slide.id}`)}>
            <span>Discover More</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* ── Counter ── */}
        <div className="hero-counter">
          <span className="hero-counter-cur">{String(current + 1).padStart(2, "0")}</span>
          <div className="hero-counter-sep" />
          <span className="hero-counter-total">{String(slides.length).padStart(2, "0")}</span>
        </div>

        {/* ── Side dots ── */}
        <div className="hero-dots">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`hero-dot ${i === current ? "active" : ""}`}
              onClick={() => resetTimer(() => goTo(i))}
            />
          ))}
        </div>

        {/* ── Arrows ── */}
        <div className="hero-arrows">
          <button className="arrow-btn" onClick={() => resetTimer(prev)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
          </button>
          <button className="arrow-btn" onClick={() => resetTimer(next)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
          </button>
        </div>

      </section>
    </>
  );
}