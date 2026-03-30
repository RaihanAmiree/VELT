/**
 * AccessoriesPage.jsx
 *
 * Fetches data from /Accessories.json and composes:
 *   - AccessoriesHero
 *   - AccessoriesFilter
 *   - AccessoryCard
 */

import { useState, useEffect, useRef } from "react";
import { useTheme } from "../ThemeContext";

import AccessoriesHero from "../Components/Accessorieshero";
import AccessoriesFilter from "../Components/Accessoriesfilter";
import AccessoryCard     from "../Components/Accessorycard";

const ALL = "All";

const darkTheme  = { bgPrimary: "#0B0B0C", textPrimary: "#C2C5CC" };
const lightTheme = { bgPrimary: "#FAFAFA", textPrimary: "#111111" };

export default function AccessoriesPage() {
  const { dark } = useTheme();
  const t = dark ? darkTheme : lightTheme;

  // ── Data ──────────────────────────────────────────────────
  const [accessories, setAccessories] = useState([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState(null);

  useEffect(() => {
    fetch("/Accessories.json")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => { setAccessories(data); setLoading(false); })
      .catch((err) => { setError(err.message); setLoading(false); });
  }, []);

  // ── Derived types ─────────────────────────────────────────
  const types = [...new Set(accessories.map((a) => a.type))];

  // ── Filter state ──────────────────────────────────────────
  const [query, setQuery]           = useState("");
  const [activeType, setActiveType] = useState(ALL);

  // Re-key grid only on category change
  const [gridKey, setGridKey] = useState(0);
  const prevTypeRef           = useRef(activeType);

  useEffect(() => {
    if (prevTypeRef.current !== activeType) {
      prevTypeRef.current = activeType;
      setGridKey((k) => k + 1);
    }
  }, [activeType]);

  // ── Filtered items ────────────────────────────────────────
  const q = query.toLowerCase().trim();

  const filtered = accessories.filter((item) => {
    const matchType = activeType === ALL || item.type === activeType;
    const matchQ    = !q || [item.name, item.type, item.tagline].some((s) =>
      s.toLowerCase().includes(q)
    );
    return matchType && matchQ;
  });

  // ── Render ────────────────────────────────────────────────
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@300;400;600;700&display=swap');

        @keyframes ap-up {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes ap-line {
          from { opacity: 0; transform: scaleX(0); transform-origin: left; }
          to   { opacity: 1; transform: scaleX(1); }
        }
        @keyframes ap-scroll-pulse {
          0%,100% { opacity: 0.4; transform: scaleY(1); }
          50%      { opacity: 1;   transform: scaleY(1.2); }
        }
        @keyframes ap-card-in {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .ap-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(clamp(200px, 22vw, 280px), 1fr));
          gap: clamp(14px, 2.2vw, 24px);
        }
      `}</style>

      {/* ✅ FIXED: removed inner scroll container */}
      <div
        id="ap-scroll-root"
        style={{
          minHeight: "100vh",
          background: t.bgPrimary,
          transition: "background 0.5s",
          fontFamily: "'Barlow', sans-serif",
        }}
      >
        {/* Hero */}
        <AccessoriesHero types={types} />

        {/* Loading */}
        {loading && (
          <div style={{
            padding: "80px",
            textAlign: "center",
            color: dark ? "#7A7F87" : "#9A9AA0",
            fontFamily: "'Barlow',sans-serif",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            fontSize: "0.7rem"
          }}>
            Loading…
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div style={{
            padding: "80px",
            textAlign: "center",
            color: "#FF5A1F",
            fontFamily: "'Barlow',sans-serif",
            fontSize: "0.8rem"
          }}>
            Failed to load Accessories.json: {error}
          </div>
        )}

        {/* Content */}
        {!loading && !error && (
          <>
            <AccessoriesFilter
              types={types}
              activeType={activeType}
              setActiveType={setActiveType}
              query={query}
              setQuery={setQuery}
              totalCount={accessories.length}
              filteredCount={filtered.length}
            />

            <div style={{
              padding: "clamp(32px,5vh,52px) clamp(16px,5vw,72px) clamp(56px,9vh,96px)",
              background: t.bgPrimary,
              transition: "background 0.5s",
            }}>
              {/* Section heading */}
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: "clamp(20px,3vh,32px)"
              }}>
                <div style={{ width: 3, height: 28, background: "#FF5A1F", borderRadius: 2 }} />

                <h2 style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "clamp(1.5rem,3vw,2.4rem)",
                  letterSpacing: "0.04em",
                  margin: 0,
                  color: t.textPrimary
                }}>
                  {activeType === ALL ? "All Accessories" : activeType}
                </h2>

                <span style={{
                  fontSize: "0.62rem",
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  padding: "4px 10px",
                  color: "#FF5A1F",
                  background: "rgba(255,90,31,0.08)",
                  border: "1px solid rgba(255,90,31,0.2)",
                }}>
                  {filtered.length} item{filtered.length !== 1 ? "s" : ""}
                </span>
              </div>

              {/* Empty */}
              {filtered.length === 0 ? (
                <div style={{
                  padding: "80px 0",
                  textAlign: "center",
                  color: dark ? "#7A7F87" : "#9A9AA0"
                }}>
                  No results{query ? ` for "${query}"` : ""}
                </div>
              ) : (
                <div className="ap-grid" key={gridKey}>
                  {filtered.map((item, i) => (
                    <div key={item.id} style={{
                      opacity: 0,
                      animation: `ap-card-in 0.48s ease ${i * 55}ms forwards`
                    }}>
                      <AccessoryCard item={item} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}