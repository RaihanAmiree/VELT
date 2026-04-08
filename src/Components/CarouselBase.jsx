// CarouselBase.jsx — shared carousel shell, used by ProductsCarousel & AccessoriesCarousel
import { useRef, useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../ThemeContext";

/* ── Icons ───────────────────────────────────────────────────────────── */
export const ChevronLeft = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 18l-6-6 6-6" />
  </svg>
);
export const ChevronRight = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18l6-6-6-6" />
  </svg>
);
const ArrowRight = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

/* ── Helpers ─────────────────────────────────────────────────────────── */
// Returns true if the event target (or any ancestor up to the track) is interactive
function isInteractive(el, boundary) {
  let node = el;
  while (node && node !== boundary) {
    const tag = node.tagName?.toLowerCase();
    if (tag === "button" || tag === "a" || tag === "input" || tag === "select") return true;
    if (node.getAttribute?.("role") === "button") return true;
    node = node.parentElement;
  }
  return false;
}

/* ── CarouselBase ────────────────────────────────────────────────────── */
export default function CarouselBase({ title, linkTo, linkLabel, items, renderCard, visibleCount = 3.3, minWidth = 230, maxWidth = 380 }) {
  const { dark } = useTheme();
  const trackRef   = useRef(null);
  const autoRef    = useRef(null);
  const isDragging = useRef(false);
  const startX     = useRef(0);
  const savedLeft  = useRef(0);
  const hasDragged = useRef(false);

  const [canLeft,  setCanLeft]  = useState(false);
  const [canRight, setCanRight] = useState(true);

  /* ── theme tokens ─────────────────────────────────────────────────── */
  const accent      = "#FF5A1F";
  const bg          = dark ? "#0B0B0C" : "#FAFAFA";
  const headColor   = dark ? "#C2C5CC" : "#111111";
  const mutedColor  = dark ? "#7A7F87" : "#6E6E73";
  const borderColor = dark ? "rgba(255,255,255,0.06)" : "#D9D9DE";
  const arrowBg     = dark ? "#16171A" : "#F1F1F1";
  const arrowBorder = dark ? "rgba(194,197,204,0.10)" : "#D9D9DE";

  /* ── arrow sync ───────────────────────────────────────────────────── */
  const syncArrows = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", syncArrows, { passive: true });
    syncArrows();
    return () => el.removeEventListener("scroll", syncArrows);
  }, [syncArrows]);

  /* ── auto-scroll ──────────────────────────────────────────────────── */
  const STEP     = 310;
  const INTERVAL = 3400;

  const doScroll = useCallback((dir) => {
    const el = trackRef.current;
    if (!el) return;
    const max  = el.scrollWidth - el.clientWidth;
    let next   = el.scrollLeft + dir * STEP;
    if (dir > 0 && next >= max - 4) next = 0;
    if (dir < 0 && next <= 4)       next = max;
    el.scrollTo({ left: next, behavior: "smooth" });
  }, []);

  const stopAuto  = useCallback(() => clearInterval(autoRef.current), []);
  const startAuto = useCallback(() => {
    stopAuto();
    autoRef.current = setInterval(() => doScroll(1), INTERVAL);
  }, [doScroll, stopAuto]);

  useEffect(() => { startAuto(); return stopAuto; }, [startAuto, stopAuto]);

  /* ── drag handling ────────────────────────────────────────────────── */
  // DRAG_THRESHOLD: below this px of movement it's a click, not a drag.
  const DRAG_THRESHOLD = 6;

  const onPointerDown = useCallback((e) => {
    if (isInteractive(e.target, trackRef.current)) return;
    isDragging.current = true;
    hasDragged.current = false;
    startX.current    = e.clientX;
    savedLeft.current = trackRef.current?.scrollLeft ?? 0;
    stopAuto();
  }, [stopAuto]);

  const onPointerMove = useCallback((e) => {
    if (!isDragging.current) return;
    const walk = startX.current - e.clientX;
    if (Math.abs(walk) > DRAG_THRESHOLD) {
      hasDragged.current = true;
      if (trackRef.current) trackRef.current.scrollLeft = savedLeft.current + walk;
    }
  }, []);

  const onPointerUp = useCallback(() => {
    isDragging.current = false;
    // Synchronously reset after a real drag so the next clean click is never blocked.
    // We use a flag captured at this moment so the native click guard below can read it.
    startAuto();
  }, [startAuto]);

  // Attach ONE native click guard directly on the track element (not on React slots).
  // This fires before any child's onClick, suppresses the click only after a real drag,
  // then immediately resets the flag so the very next click works normally.
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const guard = (e) => {
      if (hasDragged.current) {
        hasDragged.current = false; // reset immediately — next click will be clean
        e.stopPropagation();
        e.preventDefault();
      }
    };
    el.addEventListener("click", guard, true); // capture phase
    return () => el.removeEventListener("click", guard, true);
  }, []);

  /* ── touch ────────────────────────────────────────────────────────── */
  const onTouchStart = (e) => {
    if (isInteractive(e.target, trackRef.current)) return;
    isDragging.current = true;
    hasDragged.current = false;
    startX.current    = e.touches[0].clientX;
    savedLeft.current = trackRef.current?.scrollLeft ?? 0;
    stopAuto();
  };
  const onTouchMove = (e) => {
    if (!isDragging.current) return;
    const walk = startX.current - e.touches[0].clientX;
    if (Math.abs(walk) > DRAG_THRESHOLD) {
      hasDragged.current = true;
      if (trackRef.current) trackRef.current.scrollLeft = savedLeft.current + walk;
    }
  };
  const onTouchEnd = () => { isDragging.current = false; startAuto(); };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@400;600;700&display=swap');

        .cb-section {
          padding: 48px 0 64px;
          position: relative;
          background: ${bg};
          transition: background .3s;
          overflow: hidden;
        }

        /* ── header ── */
        .cb-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          padding: 0 clamp(16px, 4vw, 80px);
          margin-bottom: 28px;
          gap: 16px;
          flex-wrap: wrap;
        }
        .cb-eyebrow {
          font-family: 'Barlow', sans-serif;
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: ${accent};
          margin: 0 0 6px;
        }
        .cb-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(1.8rem, 8vw, 3.4rem);
          letter-spacing: 0.04em;
          line-height: 1;
          margin: 0;
          color: ${headColor};
          transition: color .3s;
        }

        /* page link */
        .cb-page-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'Barlow', sans-serif;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          text-decoration: none;
          color: ${mutedColor};
          white-space: nowrap;
          padding-bottom: 2px;
          border-bottom: 1px solid ${borderColor};
          transition: color .25s, border-color .25s;
          flex-shrink: 0;
        }

        @media (max-width: 480px) {
          .cb-header { flex-direction: column; align-items: flex-start; gap: 12px; }
          .cb-section { padding: 36px 0 48px; }
          .cb-track { padding-left: 16px; padding-right: 16px; }
          .cb-slot { width: 72vw !important; }
        }
        .cb-page-link:hover { color: ${accent}; border-color: ${accent}; }
        .cb-page-link:hover .cb-link-circle {
          background: ${accent} !important;
          border-color: ${accent} !important;
          color: #fff !important;
          transform: translateX(4px);
        }
        .cb-link-circle {
          width: 24px; height: 24px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          background: ${arrowBg};
          border: 1px solid ${arrowBorder};
          color: ${mutedColor};
          transition: all .25s;
          flex-shrink: 0;
        }

        /* ── controls bar ── */
        .cb-controls {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 0 clamp(16px, 4vw, 80px);
          margin-bottom: 18px;
        }
        .cb-rule { flex: 1; height: 1px; background: ${borderColor}; }
        .cb-arrow {
          width: 36px; height: 36px;
          border-radius: 50%;
          border: 1px solid ${arrowBorder};
          background: ${arrowBg};
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          color: ${headColor};
          transition: all .22s ease;
          flex-shrink: 0;
        }
        .cb-arrow:hover:not(:disabled) {
          background: ${accent};
          border-color: ${accent};
          color: #fff;
          transform: scale(1.08);
        }
        .cb-arrow:disabled { opacity: 0.22; cursor: default; }

        @media (max-width: 480px) {
          .cb-controls { padding: 0 16px; margin-bottom: 14px; }
          .cb-arrow { width: 30px; height: 30px; }
        }

        /* ── track ── */
        .cb-track-wrap { position: relative; }

        .cb-track {
          display: flex;
          gap: 18px;
          overflow-x: scroll;
          overflow-y: visible;
          padding: 10px clamp(16px, 4vw, 80px) 28px;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          cursor: grab;
          user-select: none;
          box-sizing: border-box;
          width: 100%;
        }
        .cb-track:active { cursor: grabbing; }
        .cb-track::-webkit-scrollbar { display: none; }
        .cb-track { scrollbar-width: none; -ms-overflow-style: none; }

        /* card slot: fixed width passed per carousel */
        .cb-slot {
          flex-shrink: 0;
          width: ${maxWidth}px;
          scroll-snap-align: start;
        }

        /* edge fades */
        .cb-track-wrap::before,
        .cb-track-wrap::after {
          content: '';
          position: absolute;
          top: 0; bottom: 0; z-index: 3;
          width: clamp(16px, 4vw, 80px);
          pointer-events: none;
        }
        .cb-track-wrap::before {
          left: 0;
          background: linear-gradient(to right, ${bg} 60%, transparent);
        }
        .cb-track-wrap::after {
          right: 0;
          background: linear-gradient(to left, ${bg} 60%, transparent);
        }
      `}</style>

      <section className="cb-section">
        {/* header */}
        <div className="cb-header">
          <div>
            <p className="cb-eyebrow">Explore</p>
            <h2 className="cb-title">{title}</h2>
          </div>
          <Link to={linkTo} className="cb-page-link">
            {linkLabel}
            <span className="cb-link-circle"><ArrowRight /></span>
          </Link>
        </div>

        {/* arrow controls */}
        <div className="cb-controls">
          <div className="cb-rule" />
          <button className="cb-arrow" disabled={!canLeft}
            onClick={() => { stopAuto(); doScroll(-1); startAuto(); }}
            aria-label="Previous">
            <ChevronLeft />
          </button>
          <button className="cb-arrow" disabled={!canRight}
            onClick={() => { stopAuto(); doScroll(1); startAuto(); }}
            aria-label="Next">
            <ChevronRight />
          </button>
        </div>

        {/* scrollable track */}
        <div className="cb-track-wrap">
          <div
            className="cb-track"
            ref={trackRef}
            onMouseEnter={stopAuto}
            onMouseLeave={startAuto}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerLeave={onPointerUp}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {items.map((item, i) => (
              <div key={item.id ?? i} className="cb-slot">
                {renderCard(item)}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}