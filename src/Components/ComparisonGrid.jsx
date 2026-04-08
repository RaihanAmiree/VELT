import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "../ThemeContext";
import { gsap } from "gsap";

const CustomDropdown = ({ options, selected, onSelect, placeholder, dark }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(listRef.current, { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.3 });
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setIsOpen(false);
    };
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className="custom-select-container" ref={dropdownRef}>
      <style>{`
        .custom-select-container { position: relative; width: 100%; max-width: 280px; z-index: 100; }
        .select-trigger {
          width: 100%; padding: 14px 20px;
          background: ${dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)"};
          border: 1px solid ${dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"};
          border-radius: 12px; color: ${dark ? "#fff" : "#111"};
          display: flex; align-items: center; justify-content: space-between;
          cursor: pointer; font-family: 'Barlow', sans-serif; font-weight: 700; font-size: 0.8rem;
        }
        .options-list {
          position: absolute; top: calc(100% + 5px); left: 0; width: 100%;
          background: ${dark ? "#1a1a1a" : "#fff"};
          border: 1px solid ${dark ? "#333" : "#eee"};
          border-radius: 12px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.3); padding: 5px;
        }
        .option-item {
          padding: 10px 15px; border-radius: 8px; color: ${dark ? "#ccc" : "#444"};
          cursor: pointer; font-family: 'Barlow', sans-serif; font-size: 0.8rem; font-weight: 600;
        }
        .option-item:hover { background: #FF5A1F; color: #fff; }
      `}</style>
      <div className="select-trigger" onClick={() => setIsOpen(!isOpen)}>
        <span>{selected ? selected.name : placeholder}</span>
        <span style={{fontSize: '0.6rem', transform: isOpen ? 'rotate(180deg)' : 'none'}}>▼</span>
      </div>
      {isOpen && (
        <div className="options-list" ref={listRef}>
          {options.map((option) => (
            <div key={option.id} className="option-item" onClick={() => { onSelect(option); setIsOpen(false); }}>
              {option.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default function ComparisonGrid({ bikes = [] }) {
  const { dark } = useTheme();
  const [slotA, setSlotA] = useState(null);
  const [slotB, setSlotB] = useState(null);
  const tableRef = useRef(null);

  const theme = {
    bg: dark ? "#080808" : "#ffffff",
    text: dark ? "#ffffff" : "#000000",
    sub: dark ? "#888" : "#666",
    border: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
    accent: "#FF5A1F"
  };

  if (!bikes || bikes.length === 0) return null;
  const specKeys = Object.keys(bikes[0].specs);

  return (
    <section className="full-comp-section">
      <style>{`
        .full-comp-section { width: 100%; background: ${theme.bg}; color: ${theme.text}; border-top: 1px solid ${theme.border}; }
        
        .comp-header-row {
          display: grid; grid-template-columns: 1fr 1fr;
          width: 100%; min-height: 450px;
          border-bottom: 1px solid ${theme.border};
        }

        .comp-header-col {
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          padding: 60px 20px; position: relative;
          border-right: 1px solid ${theme.border};
        }

        .comp-header-col:last-child { border-right: none; }

        .comp-img-wrapper {
          width: 100%; max-width: 450px; height: 250px;
          display: flex; align-items: center; justify-content: center; margin-bottom: 30px;
        }

        .comp-bike-img { width: 90%; height: auto; object-fit: contain; filter: drop-shadow(0 20px 40px rgba(0,0,0,0.15)); }
        
        .spec-container { width: 100%; }

        .spec-grid-row {
          display: grid; grid-template-columns: 1fr 1.2fr 1.2fr;
          width: 100%; border-bottom: 1px solid ${theme.border};
        }

        .spec-cell {
          padding: 25px 40px; display: flex; align-items: center; justify-content: center;
          font-family: 'Barlow', sans-serif; font-size: 0.95rem; font-weight: 600;
          text-align: center; border-right: 1px solid ${theme.border};
        }

        .spec-cell:last-child { border-right: none; }

        .spec-label-cell {
          justify-content: flex-start; color: ${theme.sub}; font-size: 0.75rem;
          text-transform: uppercase; letter-spacing: 0.1em; font-weight: 800;
          background: ${dark ? "rgba(255,255,255,0.01)" : "rgba(0,0,0,0.01)"};
        }

        .price-text { color: ${theme.accent}; font-size: 1.5rem; font-weight: 900; }

        .empty-slot-icon { font-size: 4rem; opacity: 0.1; filter: grayscale(1); }

        @media (max-width: 850px) {
          .spec-grid-row { grid-template-columns: 1fr 1fr; }
          .spec-label-cell { grid-column: span 2; justify-content: center; background: ${theme.accent}; color: white; padding: 10px; }
        }
      `}</style>

      {/* Top Selection Row - Merged into page */}
      <div className="comp-header-row">
        <div className="comp-header-col">
          <div className="comp-img-wrapper">
            {slotA ? <img src={slotA.heroImage} className="comp-bike-img" alt={slotA.name} /> : <div className="empty-slot-icon">🏍️</div>}
          </div>
          <CustomDropdown options={bikes} selected={slotA} onSelect={setSlotA} placeholder="SELECT FIRST BIKE" dark={dark} />
        </div>

        <div className="comp-header-col">
          <div className="comp-img-wrapper">
            {slotB ? <img src={slotB.heroImage} className="comp-bike-img" alt={slotB.name} /> : <div className="empty-slot-icon">🏍️</div>}
          </div>
          <CustomDropdown options={bikes} selected={slotB} onSelect={setSlotB} placeholder="SELECT SECOND BIKE" dark={dark} />
        </div>
      </div>

      {/* Integrated Specs Table */}
      {slotA && slotB && (
        <div className="spec-container">
          {/* Dynamic Specs Mapping */}
          {specKeys.map(key => (
            <div className="spec-grid-row" key={key}>
              <div className="spec-cell spec-label-cell">{key}</div>
              <div className="spec-cell">{slotA.specs[key]}</div>
              <div className="spec-cell">{slotB.specs[key]}</div>
            </div>
          ))}

          {/* Price Row */}
          <div className="spec-grid-row" style={{borderBottom: 'none'}}>
            <div className="spec-cell spec-label-cell">MSRP Price</div>
            <div className="spec-cell price-text">${slotA.price}</div>
            <div className="spec-cell price-text">${slotB.price}</div>
          </div>
        </div>
      )}
    </section>
  );
}