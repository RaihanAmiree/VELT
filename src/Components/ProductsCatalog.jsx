import { useRef, useState, useEffect } from "react";
import { useTheme } from "../ThemeContext";
import ProductCard from "./ProductCard";



// ── Helpers ──────────────────────────────────────────────────
const toTitleCase = (str) =>
  str.replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());

// ── Category Row ─────────────────────────────────────────────
function CategoryRow({ category, products, dark }) {
  const scrollRef = useRef(null);
  const [canLeft,  setCanLeft]  = useState(false);
  const [canRight, setCanRight] = useState(true);
  const [inView, setInView] = useState(false);
  const rowRef = useRef(null);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 8);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  };

  const scrollBy = (dir) => {
    scrollRef.current?.scrollBy({ left: dir * 340, behavior: "smooth" });
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll, { passive: true });
    checkScroll();
    return () => el.removeEventListener("scroll", checkScroll);
  }, [products]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.1 }
    );
    if (rowRef.current) observer.observe(rowRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .cr-wrap {
          opacity: 0; transform: translateY(32px);
          transition: opacity 0.6s ease, transform 0.6s cubic-bezier(0.22,1,0.36,1);
        }
        .cr-wrap.in-view { opacity: 1; transform: translateY(0); }

        .cr-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
          flex-wrap: wrap;
          gap: 12px;
        }

        .cr-label-group {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .cr-category-name {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(1.8rem, 3.5vw, 2.8rem);
          letter-spacing: 0.04em;
          line-height: 1;
          margin: 0;
          transition: color 0.4s;
        }

        .cr-count {
          font-family: 'Barlow', sans-serif;
          font-size: 0.62rem; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase;
          padding: 4px 10px;
          border-radius: 2px;
          color: #FF5A1F;
          background: rgba(255,90,31,0.08);
          border: 1px solid rgba(255,90,31,0.2);
          align-self: center;
        }

        .cr-arrows {
          display: flex; gap: 8px;
          align-items: center;
        }

        .cr-arrow {
          width: 38px; height: 38px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: all 0.22s ease;
          border: none;
        }
        .cr-arrow:disabled { opacity: 0.25; cursor: default; transform: none !important; }
        .cr-arrow:not(:disabled):hover {
          border-color: #FF5A1F !important;
          background: rgba(255,90,31,0.1) !important;
          color: #FF5A1F !important;
          transform: scale(1.08);
        }

        .cr-scroll {
          display: flex;
          gap: 16px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          padding-bottom: 12px;
          scrollbar-width: none;
        }
        .cr-scroll::-webkit-scrollbar { display: none; }
        .cr-scroll > * { scroll-snap-align: start; }

        .cr-scroll-wrap { position: relative; }

        .cr-fade-left, .cr-fade-right {
          position: absolute; top: 0; bottom: 12px;
          width: 40px; z-index: 2;
          pointer-events: none;
          transition: opacity 0.3s;
        }
      `}</style>

      <div ref={rowRef} className={`cr-wrap ${inView ? "in-view" : ""}`}>
        {/* Header */}
        <div className="cr-header">
          <div className="cr-label-group">
            <div style={{ width: "3px", height: "32px", background: "#FF5A1F", borderRadius: "2px", flexShrink: 0 }} />
            <h2
              className="cr-category-name"
              style={{ color: dark ? "#C2C5CC" : "#111111" }}
            >
              {toTitleCase(category)}
            </h2>
            <span className="cr-count">{products.length} model{products.length !== 1 ? "s" : ""}</span>
          </div>

          <div className="cr-arrows">
            <button
              className="cr-arrow"
              disabled={!canLeft}
              onClick={() => scrollBy(-1)}
              style={{
                background: dark ? "rgba(194,197,204,0.05)" : "rgba(0,0,0,0.04)",
                border: `1px solid ${dark ? "rgba(194,197,204,0.1)" : "#D9D9DE"}`,
                color: dark ? "rgba(194,197,204,0.5)" : "rgba(0,0,0,0.4)",
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              className="cr-arrow"
              disabled={!canRight}
              onClick={() => scrollBy(1)}
              style={{
                background: dark ? "rgba(194,197,204,0.05)" : "rgba(0,0,0,0.04)",
                border: `1px solid ${dark ? "rgba(194,197,204,0.1)" : "#D9D9DE"}`,
                color: dark ? "rgba(194,197,204,0.5)" : "rgba(0,0,0,0.4)",
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Scroll row */}
        <div className="cr-scroll-wrap">
          <div
            className="cr-fade-left"
            style={{
              left: 0,
              background: `linear-gradient(to right, ${dark ? "#0B0B0C" : "#FAFAFA"}, transparent)`,
              opacity: canLeft ? 1 : 0,
            }}
          />

          <div ref={scrollRef} className="cr-scroll">
            {products.map((p, i) => (
              <div
                key={p.id}
                style={{
                  opacity: 0,
                  animation: inView ? `cr-card-in 0.5s ease ${i * 80}ms forwards` : "none",
                }}
              >
                <style>{`
                  @keyframes cr-card-in {
                    from { opacity: 0; transform: translateY(16px); }
                    to   { opacity: 1; transform: translateY(0); }
                  }
                `}</style>
                <ProductCard product={p} />
              </div>
            ))}
          </div>

          <div
            className="cr-fade-right"
            style={{
              right: 0,
              background: `linear-gradient(to left, ${dark ? "#0B0B0C" : "#FAFAFA"}, transparent)`,
              opacity: canRight ? 1 : 0,
            }}
          />
        </div>
      </div>
    </>
  );
}

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
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
      </div>
      <div>
        <p style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "1.6rem", letterSpacing: "0.06em",
          color: dark ? "#C2C5CC" : "#111111", margin: "0 0 6px",
        }}>
          No results for "{query}"
        </p>
        <p style={{
          fontFamily: "'Barlow', sans-serif",
          fontSize: "0.8rem", color: dark ? "#7A7F87" : "#9A9AA0",
          margin: 0,
        }}>
          Try a different model name or category
        </p>
      </div>
    </div>
  );
}

// ── Main Catalog ──────────────────────────────────────────────
export default function ProductsCatalog({ query = "" }) {
   const { dark } = useTheme();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Failed to load products:", error));
  }, []);

  // Group by category
  const grouped = products.reduce((acc, p) => {
    const key = p.category.toLowerCase();

    if (!acc[key]) acc[key] = [];

    acc[key].push(p);

    return acc;
  }, {});

  // Filter by query
  const q = query.toLowerCase().trim();

  const filteredGroups = Object.entries(grouped)
    .map(([cat, products]) => ({
      category: cat,
      products: q
        ? products.filter((p) =>
            p.name.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q) ||
            p.tagline.toLowerCase().includes(q)
          )
        : products,
    }))
    .filter((g) => g.products.length > 0);

  const totalResults = filteredGroups.reduce(
    (n, g) => n + g.products.length,
    0
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@300;400;600;700&display=swap');

        .cat-wrap {
          width: 100%;
          padding: clamp(32px,5vh,56px) clamp(16px,5vw,72px);
          display: flex;
          flex-direction: column;
          gap: clamp(48px, 7vh, 80px);
          transition: background 0.5s ease;
        }
      `}</style>

      <div
        className="cat-wrap"
        style={{ background: dark ? "#0B0B0C" : "#FAFAFA" }}
      >
        {/* Result count when searching */}
        {q && (
          <div style={{
            display: "flex", alignItems: "center", gap: "12px",
            fontFamily: "'Barlow', sans-serif",
          }}>
            <div style={{ width: "24px", height: "1.5px", background: "#FF5A1F" }} />
            <span style={{
              fontSize: "0.65rem", fontWeight: 700,
              letterSpacing: "0.22em", textTransform: "uppercase",
              color: "#FF5A1F",
            }}>
              {totalResults} result{totalResults !== 1 ? "s" : ""} for "{query}"
            </span>
          </div>
        )}

        {filteredGroups.length === 0 ? (
          <EmptyState query={query} dark={dark} />
        ) : (
          filteredGroups.map(({ category, products }) => (
            <CategoryRow
              key={category}
              category={category}
              products={products}
              dark={dark}
            />
          ))
        )}
      </div>
    </>
  );
}