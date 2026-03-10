import React, { useEffect, useRef, useState } from "react";

const stats = [
  { value: 12400, label: "Units Sold" },
  { value: 98, label: "Satisfaction Rate", suffix: "%" },
  { value: 47, label: "Service Centers" },
  { value: 6, label: "Years of Innovation" },
];

function useCountUp(target, duration = 2000, started = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);
  return count;
}

function StatItem({ value, label, suffix = "+", delay, started }) {
  const count = useCountUp(value, 2000, started);
  return (
    <div className="stat-item" style={{ transitionDelay: `${delay}ms` }}>
      <div className="stat-number">
        {count.toLocaleString()}<span className="stat-suffix">{suffix}</span>
      </div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

export default function AboutSection() {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@300;400;600;700&display=swap');

        .about-section {
          background: #0d0d0d;
          overflow: hidden;
          padding: clamp(64px, 10vw, 120px) clamp(20px, 5vw, 80px) 0;
          width: 100%;
          box-sizing: border-box;
        }

        /* Top two-col layout */
        .about-top {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(32px, 5vw, 80px);
          align-items: start;
          margin-bottom: clamp(48px, 8vw, 96px);
        }
        @media (max-width: 768px) {
          .about-top { grid-template-columns: 1fr; gap: 24px; }
        }

        /* Left */
        .about-eyebrow {
          font-family: 'Barlow', sans-serif;
          font-size: 0.72rem; font-weight: 700;
          letter-spacing: 0.22em; text-transform: uppercase;
          color: #e53e3e; margin-bottom: 16px;
          opacity: 0; transform: translateY(16px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .about-eyebrow.visible { opacity: 1; transform: translateY(0); }

        .about-heading {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(36px, 5vw, 68px);
          line-height: 1.0; color: #fff;
          opacity: 0; transform: translateY(24px);
          transition: opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s;
        }
        .about-heading.visible { opacity: 1; transform: translateY(0); }

        /* Right */
        .about-desc {
          font-family: 'Barlow', sans-serif;
          font-size: clamp(0.9rem, 1.2vw, 1rem);
          color: rgba(255,255,255,0.45);
          line-height: 1.8;
          padding-top: 8px;
          opacity: 0; transform: translateY(20px);
          transition: opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s;
        }
        .about-desc.visible { opacity: 1; transform: translateY(0); }

        /* Middle row — bike image + stats */
        .about-mid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          gap: 0;
        }
        @media (max-width: 768px) {
          .about-mid { grid-template-columns: 1fr; }
          .about-bike { display: none; }
        }

        /* Bike image */
        .about-bike {
          position: relative;
          opacity: 0;
          transform: translateX(-40px);
          transition: opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s;
        }
        .about-bike.visible { opacity: 1; transform: translateX(0); }
        .about-bike img {
          width: 100%;
          max-width: 520px;
          object-fit: contain;
          filter: drop-shadow(0 20px 60px rgba(0,0,0,0.8));
        }

        /* Stats grid */
        .about-stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(24px, 4vw, 48px) clamp(32px, 5vw, 64px);
          padding: clamp(24px, 4vw, 48px);
        }

        .stat-item {
          opacity: 0; transform: translateY(30px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .stat-item.visible { opacity: 1; transform: translateY(0); }

        .stat-number {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(52px, 7vw, 88px);
          line-height: 1;
          color: #fff;
          letter-spacing: -0.01em;
        }
        .stat-suffix { color: #e53e3e; }

        .stat-label {
          font-family: 'Barlow', sans-serif;
          font-weight: 700;
          font-size: clamp(0.8rem, 1.1vw, 0.95rem);
          color: rgba(255,255,255,0.45);
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin-top: 6px;
        }

        /* Giant watermark word */
        .about-watermark {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(80px, 18vw, 260px);
          line-height: 0.85;
          color: rgba(255,255,255,0.045);
          letter-spacing: 0.02em;
          white-space: nowrap;
          user-select: none;
          pointer-events: none;
          display: flex;
          overflow: hidden;
          width: 100%;
        }

        .watermark-left {
          opacity: 0; transform: translateX(-60px);
          transition: opacity 1s ease 0.4s, transform 1s ease 0.4s;
          flex: 1;
        }
        .watermark-right {
          opacity: 0; transform: translateX(60px);
          transition: opacity 1s ease 0.4s, transform 1s ease 0.4s;
          text-align: right; flex: 1;
        }
        .watermark-left.visible,
        .watermark-right.visible { opacity: 1; transform: translateX(0); }

        /* Horizontal rule line */
        .about-rule {
          height: 1px;
          background: rgba(255,255,255,0.06);
          margin-bottom: 0;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.8s ease 0.2s;
        }
        .about-rule.visible { transform: scaleX(1); }
      `}</style>

      <section className="about-section" ref={sectionRef}>

        {/* Top: heading + description */}
        <div className="about-top">
          <div>
            <p className={`about-eyebrow ${inView ? "visible" : ""}`}>About REVOO</p>
            <h2 className={`about-heading ${inView ? "visible" : ""}`}>
              Your Trusted Electric Mobility Partner
            </h2>
          </div>
          <p className={`about-desc ${inView ? "visible" : ""}`}>
            Experience the future of urban mobility with REVOO. We engineer cutting-edge electric motorcycles built for performance, sustainability, and style. From daily commutes to weekend adventures — we've got every road covered.
          </p>
        </div>

        <div className={`about-rule ${inView ? "visible" : ""}`} />

        {/* Middle: bike + stats */}
        <div className="about-mid">
          <div className={`about-bike ${inView ? "visible" : ""}`}>
            <img
              src="https://png.pngtree.com/png-vector/20250116/ourmid/pngtree-a-blue-color-racing-bike-png-image_15224135.png"
              alt="REVOO Electric Motorcycle"
            />
          </div>

          <div className="about-stats">
            {stats.map((s, i) => (
              <div
                key={i}
                className={`stat-item ${inView ? "visible" : ""}`}
                style={{ transitionDelay: `${0.3 + i * 0.1}s` }}
              >
                <StatItem
                  value={s.value}
                  label={s.label}
                  suffix={s.suffix || "+"}
                  delay={300 + i * 100}
                  started={inView}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Giant watermark */}
        <div className="about-watermark">
          <span className={`watermark-left ${inView ? "visible" : ""}`}>ELECTRI-</span>
          <span className={`watermark-right ${inView ? "visible" : ""}`}>CITY</span>
        </div>

      </section>
    </>
  );
}