import { useRef, useEffect } from "react";
import { useTheme } from "../ThemeContext";

export default function ProductsSearch({ query, setQuery }) {
  const { dark } = useTheme();
  const inputRef = useRef(null);

  // Keyboard shortcut: "/" focuses search
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

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@300;400;600;700&display=swap');

        .ps-wrap {
          width: 100%;
          padding: clamp(32px,5vh,56px) clamp(16px,5vw,72px);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
          transition: background 0.5s ease;
        }

        .ps-bar {
          position: relative;
          width: 100%;
          max-width: 600px;
        }

        .ps-input {
          width: 100%;
          box-sizing: border-box;
          padding: 14px 52px 14px 20px;
          font-family: 'Barlow', sans-serif;
          font-size: 0.85rem;
          font-weight: 500;
          letter-spacing: 0.05em;
          border-radius: 3px;
          outline: none;
          transition: border-color 0.25s, box-shadow 0.25s, background 0.4s, color 0.4s;
        }

        .ps-input:focus {
          box-shadow: 0 0 0 1px #FF5A1F, 0 0 20px rgba(255,90,31,0.12);
        }

        .ps-icon {
          position: absolute;
          left: 18px; top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
          transition: color 0.25s;
        }

        .ps-clear {
          position: absolute;
          right: 14px; top: 50%;
          transform: translateY(-50%);
          width: 26px; height: 26px;
          border-radius: 50%;
          border: none;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .ps-clear:hover { background: #FF5A1F !important; color: #fff !important; }

        .ps-hint {
          font-family: 'Barlow', sans-serif;
          font-size: 0.62rem;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .ps-key {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 18px; height: 18px;
          border-radius: 3px;
          font-size: 0.65rem;
          font-weight: 700;
        }

        /* Result count badge */
        .ps-count {
          font-family: 'Barlow', sans-serif;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          padding: 4px 12px;
          border-radius: 2px;
          border: 1px solid rgba(255,90,31,0.25);
          background: rgba(255,90,31,0.07);
          color: #FF5A1F;
          animation: ps-fade-in 0.25s ease;
        }
        @keyframes ps-fade-in { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      <div
        className="ps-wrap"
        style={{ background: dark ? "#0B0B0C" : "#FAFAFA" }}
      >
        <div className="ps-bar">
          {/* Search icon */}
          <span className="ps-icon" style={{ color: query ? "#FF5A1F" : dark ? "#7A7F87" : "#9A9AA0" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          </span>

          <input
            ref={inputRef}
            className="ps-input"
            type="text"
            placeholder="Search models, categories…"
            value={query}
            onChange={e => setQuery(e.target.value)}
            style={{
              paddingLeft: "46px",
              background: dark ? "#16171A" : "#FFFFFF",
              color: dark ? "#C2C5CC" : "#111111",
              border: `1px solid ${query ? "rgba(255,90,31,0.45)" : dark ? "rgba(194,197,204,0.1)" : "#D9D9DE"}`,
            }}
          />

          {/* Clear button */}
          {query && (
            <button
              className="ps-clear"
              onClick={() => { setQuery(""); inputRef.current?.focus(); }}
              style={{
                background: dark ? "rgba(194,197,204,0.08)" : "rgba(0,0,0,0.06)",
                color: dark ? "#7A7F87" : "#9A9AA0",
              }}
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Hint / result count */}
        {!query ? (
          <p className="ps-hint" style={{ color: dark ? "rgba(194,197,204,0.25)" : "#9A9AA0" }}>
            Press
            <span className="ps-key" style={{ background: dark ? "rgba(194,197,204,0.08)" : "#F1F1F1", color: dark ? "#7A7F87" : "#6E6E73", border: `1px solid ${dark ? "rgba(194,197,204,0.1)" : "#D9D9DE"}` }}>
              /
            </span>
            to search
          </p>
        ) : null}
      </div>
    </>
  );
}