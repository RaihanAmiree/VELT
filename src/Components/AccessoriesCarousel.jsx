import { useState, useRef, useEffect } from "react";
import { useTheme } from "../ThemeContext";
import { darkTheme, lightTheme } from "../theme";
import AccessoryCard from "./Accessorycard";

export default function AccessoriesCarousel() {
  const { dark } = useTheme();
  const t = dark ? darkTheme : lightTheme;

  const [accessories, setAccessories] = useState([]);
  const [loading, setLoading]         = useState(true);
  const [current, setCurrent]         = useState(0);
  const [visible, setVisible]         = useState(4);
  const [cardW, setCardW]             = useState(0);
  const trackRef = useRef(null);
  const startX   = useRef(0);

  /* ── fetch from public/accessories.json ── */
  useEffect(() => {
    fetch("/Accessories.json")
      .then(r => r.json())
      .then(data => { setAccessories(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  /* ── responsive card count ── */
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setVisible(w < 480 ? 1 : w < 740 ? 2 : w < 1100 ? 3 : 4);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  /* ── measure card width after render ── */
  useEffect(() => {
    if (!trackRef.current) return;
    const card = trackRef.current.querySelector(".acc-slide");
    if (card) setCardW(card.getBoundingClientRect().width);
  }, [accessories, visible]);

  /* ── clamp current when visible changes ── */
  useEffect(() => {
    setCurrent(c => Math.min(c, Math.max(0, accessories.length - visible)));
  }, [visible, accessories.length]);

  const GAP     = 20;
  const maxIdx  = Math.max(0, accessories.length - visible);
  const pages   = Math.ceil(accessories.length / visible);
  const curPage = Math.floor(current / visible);
  const offset  = current * (cardW + GAP);

  const goTo = idx => setCurrent(Math.max(0, Math.min(idx, maxIdx)));

  /* ── touch swipe ── */
  const onTouchStart = e => { startX.current = e.touches[0].clientX; };
  const onTouchEnd   = e => {
    const diff = startX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) goTo(current + (diff > 0 ? 1 : -1));
  };

  if (loading) return (
    <div style={{
      padding: "60px 0", textAlign: "center",
      fontFamily: "Barlow, sans-serif",
      color: t.textSecondary,
      fontSize: "0.8rem", letterSpacing: "0.16em", textTransform: "uppercase",
    }}>
      Loading…
    </div>
  );

  if (!accessories.length) return null;

  return (
    <section style={{ width: "100%", padding: "80px 0 64px", background: t.bgPrimary }}>

      {/* ── HEADING ROW ── */}
      <div style={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 20,
        padding: "0 clamp(20px, 5vw, 80px)",
        marginBottom: 40,
      }}>

        {/* left: label + title */}
        <div>
          <p style={{
            display: "flex", alignItems: "center", gap: 10,
            fontFamily: "Barlow, sans-serif",
            fontSize: "0.68rem", fontWeight: 700,
            letterSpacing: "0.26em", textTransform: "uppercase",
            color: t.accent, margin: "0 0 10px",
          }}>
            <span style={{ display: "inline-block", width: 20, height: 2, background: t.accent }} />
            Velt-DRT
          </p>
          <h2 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontWeight: 400,
            fontSize: "clamp(2rem, 4.5vw, 3.8rem)",
            lineHeight: 0.95,
            textTransform: "uppercase",
            color: t.textPrimary,
            letterSpacing: "0.02em",
            margin: 0,
          }}>
            Related{" "}
            <span style={{ color: t.accent }}>Accessories</span>
          </h2>
        </div>

        {/* right: arrows + counter */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <ArrowBtn
            dir="prev"
            disabled={current === 0}
            accent={t.accent}
            muted={t.textSecondary}
            divider={t.divider}
            onClick={() => goTo(current - 1)}
          />
          <span style={{
            fontFamily: "Barlow, sans-serif",
            fontSize: "0.78rem",
            color: t.textSecondary,
            letterSpacing: "0.1em",
            minWidth: 48,
            textAlign: "center",
          }}>
            {String(current + 1).padStart(2, "0")} / {String(maxIdx + 1).padStart(2, "0")}
          </span>
          <ArrowBtn
            dir="next"
            disabled={current >= maxIdx}
            accent={t.accent}
            muted={t.textSecondary}
            divider={t.divider}
            onClick={() => goTo(current + 1)}
          />
        </div>
      </div>

      {/* ── CAROUSEL TRACK ── */}
      <div
        style={{ overflow: "hidden", padding: `4px clamp(20px, 5vw, 80px) 8px` }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          ref={trackRef}
          style={{
            display: "flex",
            gap: GAP,
            transform: `translateX(-${offset}px)`,
            transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
            willChange: "transform",
          }}
        >
          {accessories.map(item => (
            <div
              key={item.id}
              className="acc-slide"
              style={{
                flex: `0 0 calc((100% - ${(visible - 1) * GAP}px) / ${visible})`,
                minWidth: 0,
              }}
            >
              {/* ← your AccessoryCard, completely unmodified */}
              <AccessoryCard item={item} />
            </div>
          ))}
        </div>
      </div>

      {/* ── DOTS ── */}
      {pages > 1 && (
        <div style={{
          display: "flex", justifyContent: "center",
          gap: 8, paddingTop: 32,
        }}>
          {Array.from({ length: pages }).map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i * visible)}
              style={{
                width: i === curPage ? 32 : 18,
                height: 3,
                padding: 0,
                border: "none",
                borderRadius: 0,
                background: i === curPage ? t.accent : t.divider,
                cursor: "pointer",
                transition: "width 0.3s ease, background 0.3s ease",
              }}
            />
          ))}
        </div>
      )}

    </section>
  );
}

/* ── isolated arrow button ── */
function ArrowBtn({ dir, disabled, accent, muted, divider, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: 44, height: 44,
        border: `1px solid ${disabled ? divider : hovered ? accent : accent}`,
        background: hovered && !disabled ? accent : "transparent",
        color: disabled ? muted : hovered ? "#fff" : accent,
        cursor: disabled ? "default" : "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "0.95rem",
        opacity: disabled ? 0.25 : 1,
        transition: "background 0.22s ease, color 0.22s ease, opacity 0.22s ease",
        flexShrink: 0,
        borderRadius: 0,
        outline: "none",
      }}
    >
      {dir === "prev" ? "←" : "→"}
    </button>
  );
}