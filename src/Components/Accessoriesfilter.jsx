import { useRef, useEffect } from "react";
import { useTheme } from "../ThemeContext";

const ALL_LABEL = "All";

export default function AccessoriesFilter({ types, activeType, setActiveType, query, setQuery, totalCount, filteredCount }) {
  const { dark } = useTheme();
  const inputRef = useRef(null);

  // Keyboard shortcut
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "/" && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === "Escape") {
        setQuery("");
        inputRef.current?.blur();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setQuery]);

  const pills = [ALL_LABEL, ...types];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@300;400;600;700&display=swap');

        .af-wrap {
          width: 100%;
          padding: clamp(24px,4vh,44px) clamp(16px,5vw,72px) 0;
          display: flex;
          flex-direction: column;
          gap: 20px;
          transition: background 0.5s ease;
        }

        /* Top row: search + count */
        .af-top {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .af-search-bar {
          position: relative;
          flex: 1;
          min-width: 220px;
          max-width: 480px;
        }

        .af-search-icon {
          position: absolute;
          left: 16px; top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
          transition: color 0.25s;
        }

        .af-input {
          width: 100%;
          box-sizing: border-box;
          padding: 12px 44px 12px 44px;
          font-family: 'Barlow', sans-serif;
          font-size: 0.82rem;
          font-weight: 500;
          letter-spacing: 0.05em;
          border-radius: 3px;
          outline: none;
          transition: border-color 0.25s, box-shadow 0.25s, background 0.4s, color 0.4s;
        }
        .af-input:focus {
          box-shadow: 0 0 0 1px #FF5A1F, 0 0 20px rgba(255,90,31,0.1);
        }

        .af-clear {
          position: absolute;
          right: 12px; top: 50%;
          transform: translateY(-50%);
          width: 24px; height: 24px;
          border-radius: 50%;
          border: none;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .af-clear:hover { background: #FF5A1F !important; color: #fff !important; }

        .af-count {
          font-family: 'Barlow', sans-serif;
          font-size: 0.62rem; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase;
          padding: 5px 13px;
          border-radius: 2px;
          border: 1px solid rgba(255,90,31,0.22);
          background: rgba(255,90,31,0.07);
          color: #FF5A1F;
          white-space: nowrap;
        }

        .af-hint {
          font-family: 'Barlow', sans-serif;
          font-size: 0.6rem; font-weight: 600;
          letter-spacing: 0.18em; text-transform: uppercase;
          display: flex; align-items: center; gap: 5px;
          margin-left: auto;
        }
        .af-key {
          display: inline-flex; align-items: center; justify-content: center;
          width: 17px; height: 17px; border-radius: 3px;
          font-size: 0.62rem; font-weight: 700;
        }

        /* Filter pills row */
        .af-pills {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          padding-bottom: clamp(16px,3vh,28px);
          border-bottom: 1px solid;
        }

        .af-pill {
          font-family: 'Barlow', sans-serif;
          font-size: 0.62rem; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase;
          padding: 7px 16px;
          border-radius: 2px;
          border: 1px solid;
          cursor: pointer;
          transition: all 0.22s ease;
          position: relative;
          overflow: hidden;
        }
        .af-pill::before {
          content: '';
          position: absolute; inset: 0;
          background: #FF5A1F;
          transform: translateX(-101%);
          transition: transform 0.28s cubic-bezier(0.4,0,0.2,1);
          z-index: 0;
        }
        .af-pill:hover::before { transform: translateX(0); }
        .af-pill:hover { color: #fff !important; border-color: #FF5A1F !important; }
        .af-pill span { position: relative; z-index: 1; }

        .af-pill.active {
          background: #FF5A1F !important;
          border-color: #FF5A1F !important;
          color: #fff !important;
        }
        .af-pill.active::before { display: none; }
      `}</style>

      <div
        className="af-wrap"
        style={{ background: dark ? "#0B0B0C" : "#FAFAFA" }}
      >
        {/* Top: search + count */}
        <div className="af-top">
          <div className="af-search-bar">
            <span
              className="af-search-icon"
              style={{ color: query ? "#FF5A1F" : dark ? "#7A7F87" : "#9A9AA0" }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
              </svg>
            </span>

            <input
              ref={inputRef}
              className="af-input"
              type="text"
              placeholder="Search accessories…"
              value={query}
              onChange={e => setQuery(e.target.value)}
              style={{
                background: dark ? "#16171A" : "#FFFFFF",
                color: dark ? "#C2C5CC" : "#111111",
                border: `1px solid ${query ? "rgba(255,90,31,0.45)" : dark ? "rgba(194,197,204,0.1)" : "#D9D9DE"}`,
              }}
            />

            {query && (
              <button
                className="af-clear"
                onClick={() => { setQuery(""); inputRef.current?.focus(); }}
                style={{
                  background: dark ? "rgba(194,197,204,0.08)" : "rgba(0,0,0,0.06)",
                  color: dark ? "#7A7F87" : "#9A9AA0",
                }}
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Result count */}
          <span className="af-count">
            {filteredCount} / {totalCount} item{totalCount !== 1 ? "s" : ""}
          </span>

          {/* Keyboard hint */}
          {!query && (
            <p className="af-hint" style={{ color: dark ? "rgba(194,197,204,0.25)" : "#9A9AA0" }}>
              Press
              <span className="af-key" style={{
                background: dark ? "rgba(194,197,204,0.08)" : "#F1F1F1",
                color: dark ? "#7A7F87" : "#6E6E73",
                border: `1px solid ${dark ? "rgba(194,197,204,0.1)" : "#D9D9DE"}`,
              }}>
                /
              </span>
              to search
            </p>
          )}
        </div>

        {/* Type filter pills */}
        <div
          className="af-pills"
          style={{ borderColor: dark ? "rgba(194,197,204,0.07)" : "#D9D9DE" }}
        >
          {pills.map(type => {
            const isActive = activeType === type;
            return (
              <button
                key={type}
                className={`af-pill${isActive ? " active" : ""}`}
                onClick={() => setActiveType(type)}
                style={isActive ? {} : {
                  background: "transparent",
                  border: `1px solid ${dark ? "rgba(194,197,204,0.12)" : "#D9D9DE"}`,
                  color: dark ? "#7A7F87" : "#6E6E73",
                }}
              >
                <span>{type}</span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}