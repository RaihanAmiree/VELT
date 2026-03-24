import { useState, useEffect, useRef } from "react";
import { useTheme } from "../ThemeContext";
import AccessoriesHero from "./AccessoriesHero";
import AccessoriesFilter from "./AccessoriesFilter";
import AccessoryCard from "./AccessoryCard";
import accessoriesData from "../data/accessories.json";

const ALL_LABEL = "All";

// ── Empty state ───────────────────────────────────────────────
function EmptyState({ query, dark }) {
  return (
    <div style={{
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "80px 20px", gap: "16px", textAlign: "center",
    }}>
      <div style={{
        width: "64px", height: "64px", borderRadius: "50%",
        background: dark ? "rgba(194,197,204,0.05)" : "#F1F1F1",
        border: `1px solid ${dark ? "rgba(194,197,204,0.1)" : "#D9D9DE"}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        color: dark ? "#7A7F87" : "#9A9AA0",
      }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
        </svg>
      </div>
      <div>
        <p style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "1.6rem", letterSpacing: "0.06em",
          color: dark ? "#C2C5CC" : "#111111", margin: "0 0 6px",
        }}>
          No results{query ? ` for "${query}"` : ""}
        </p>
        <p style={{
          fontFamily: "'Barlow', sans-serif",
          fontSize: "0.8rem", color: dark ? "#7A7F87" : "#9A9AA0",
          margin: 0,
        }}>
          Try a different name or filter
        </p>
      </div>
    </div>
  );
}

// ── Individual card with reveal animation ─────────────────────
function AnimatedCard({ item, index, inView }) {
  return (
    <div
      style={{
        opacity: 0,
        animation: inView
          ? `ac-grid-in 0.5s ease ${index * 60}ms forwards`
          : "none",
      }}
    >
      <style>{`
        @keyframes ac-grid-in {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <AccessoryCard item={item} />
    </div>
  );
}

// ── Main Catalog ──────────────────────────────────────────────
export default function AccessoriesCatalog() {
  const { dark } = useTheme();
  const [query, setQuery] = useState("");
  const [activeType, setActiveType] = useState(ALL_LABEL);
  const [inView, setInView] = useState(false);
  const gridRef = useRef(null);

  // Derive unique types from data (preserving order of first appearance)
  const types = [...new Set(accessoriesData.map(a => a.type))];

  // Filter logic
  const q = query.toLowerCase().trim();
  const filtered = accessoriesData.filter(item => {
    const matchesType = activeType === ALL_LABEL || item.type === activeType;
    const matchesQuery = !q || (
      item.name.toLowerCase().includes(q) ||
      item.type.toLowerCase().includes(q) ||
      item.tagline.toLowerCase().includes(q)
    );
    return matchesType && matchesQuery;
  });

  // Intersection observer for grid reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.05 }
    );
    if (gridRef.current) observer.observe(gridRef.current);
    return () => observer.disconnect();
  }, []);

  // Reset inView on filter/query change so cards re-animate
  useEffect(() => {
    setInView(false);
    const t = setTimeout(() => setInView(true), 50);
    return () => clearTimeout(t);
  }, [activeType, query]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@300;400;600;700&display=swap');

        .accat-page {
          min-height: 100vh;
          transition: background 0.5s ease;
        }

        .accat-grid-wrap {
          padding: clamp(32px,5vh,52px) clamp(16px,5vw,72px) clamp(48px,8vh,80px);
        }

        .accat-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(clamp(220px, 22vw, 290px), 1fr));
          gap: clamp(16px, 2.5vw, 24px);
        }

        /* Active type label above grid */
        .accat-grid-label {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 28px;
        }
        .accat-grid-label-text {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(1.5rem, 3vw, 2.4rem);
          letter-spacing: 0.04em;
          line-height: 1;
          margin: 0;
          transition: color 0.4s;
        }
        .accat-grid-label-count {
          font-family: 'Barlow', sans-serif;
          font-size: 0.62rem; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase;
          padding: 4px 10px; border-radius: 2px;
          color: #FF5A1F;
          background: rgba(255,90,31,0.08);
          border: 1px solid rgba(255,90,31,0.2);
        }
      `}</style>

      <div
        className="accat-page"
        style={{ background: dark ? "#0B0B0C" : "#FAFAFA" }}
      >
        {/* Hero */}
        <AccessoriesHero />

        {/* Filter bar */}
        <AccessoriesFilter
          types={types}
          activeType={activeType}
          setActiveType={setActiveType}
          query={query}
          setQuery={setQuery}
          totalCount={accessoriesData.length}
          filteredCount={filtered.length}
        />

        {/* Grid */}
        <div className="accat-grid-wrap">
          {/* Active section label */}
          <div className="accat-grid-label">
            <div style={{ width: "3px", height: "28px", background: "#FF5A1F", borderRadius: "2px", flexShrink: 0 }} />
            <h2
              className="accat-grid-label-text"
              style={{ color: dark ? "#C2C5CC" : "#111111" }}
            >
              {activeType === ALL_LABEL ? "All Accessories" : activeType}
            </h2>
            <span className="accat-grid-label-count">
              {filtered.length} item{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>

          {filtered.length === 0 ? (
            <EmptyState query={query} dark={dark} />
          ) : (
            <div ref={gridRef} className="accat-grid">
              {filtered.map((item, i) => (
                <AnimatedCard
                  key={item.id}
                  item={item}
                  index={i}
                  inView={inView}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}