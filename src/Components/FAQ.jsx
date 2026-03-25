import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../ThemeContext"; // Path to your context
import { darkTheme, lightTheme } from "../theme"; // Path to your theme objects

const faqs = [
  {
    q: "How do I book a bike rental?",
    a: "Simply choose the bike that suits your style and needs, select a convenient date for your ride, and then proceed to confirm your payment either online through our secure portal or in-store at your leisure. Enjoy the freedom of cycling with ease!",
  },
  {
    q: "Can I rent a bike for more than one day?",
    a: "Absolutely! We offer flexible rental periods ranging from a single day to multiple weeks. Extended rentals come with discounted rates — the longer you ride, the more you save.",
  },
  {
    q: "Are helmets and locks included in the rental?",
    a: "Yes, every rental includes a helmet and a secure lock at no extra cost. Your safety and peace of mind are our top priority.",
  },
  {
    q: "Can I pick up the bike at one place and return it?",
    a: "Yes! We support one-way rentals across all our partner locations. Simply select your preferred pick-up and drop-off points when booking.",
  },
  {
    q: "Is there an age requirement for renting a bike?",
    a: "Riders must be at least 18 years old to rent independently. Riders aged 16–17 may rent with written parental consent presented at the time of pick-up.",
  },
  {
    q: "What types of bikes are available for rent?",
    a: "Our fleet includes electric scooters, city cruisers, sport models, and cargo bikes. Each is regularly serviced and ready to ride.",
  },
];

export default function FAQSection() {
  const { dark } = useTheme();
  const theme = dark ? darkTheme : lightTheme;
  const navigate = useNavigate();

  const [open, setOpen] = useState(0);
  const [search, setSearch] = useState("");
  const [mobileIndex, setMobileIndex] = useState(0);

  const filtered = useMemo(() => {
    if (!search.trim()) return faqs;
    const q = search.toLowerCase();
    return faqs.filter(f => f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q));
  }, [search]);

  const MOBILE_PAGE_SIZE = 3;

  const handleSearch = (val) => {
    setSearch(val);
    setMobileIndex(0);
    setOpen(null);
  };

  const totalPages = Math.ceil(filtered.length / MOBILE_PAGE_SIZE);
  const mobilePrev = () => { setMobileIndex(i => Math.max(0, i - 1)); setOpen(null); };
  const mobileNext = () => { setMobileIndex(i => Math.min(totalPages - 1, i + 1)); setOpen(null); };
  const currentPageItems = filtered.slice(mobileIndex * MOBILE_PAGE_SIZE, (mobileIndex + 1) * MOBILE_PAGE_SIZE);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@400;600;700&display=swap');

        .faq-section {
          background: ${theme.bgPrimary};
          padding: clamp(64px, 10vh, 120px) clamp(20px, 5vw, 96px);
          position: relative;
          z-index: 1;
          transition: background 0.3s ease;
        }
        .faq-inner { max-width: 1400px; margin: 0 auto; width: 100%; }

        .faq-grid {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: clamp(40px, 6vw, 100px);
          align-items: start;
        }
        .faq-left { position: sticky; top: 100px; }

        @media (max-width: 768px) {
          .faq-grid { grid-template-columns: 1fr; gap: 32px; }
          .faq-left { position: static !important; top: auto !important; }
          .faq-desktop-accordion { display: none !important; }
          .faq-mobile-carousel { display: block !important; }
        }
        @media (min-width: 769px) {
          .faq-desktop-accordion { display: block; }
          .faq-mobile-carousel { display: none; }
        }

        .faq-eyebrow {
          font-family: 'Barlow', sans-serif;
          font-size: 0.72rem; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: ${theme.accent}; margin-bottom: 18px;
        }
        .faq-heading {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(36px, 4.5vw, 64px);
          line-height: 1.0; color: ${theme.textPrimary}; margin-bottom: 20px;
        }
        .faq-sub {
          font-family: 'Barlow', sans-serif;
          font-size: 0.93rem; color: ${theme.textSecondary}; line-height: 1.75;
        }
        .faq-divider { width: 56px; height: 1px; background: ${theme.divider}; margin: 28px 0; }
        
        .contact-btn {
          font-family: 'Barlow', sans-serif; font-weight: 700;
          font-size: 0.88rem; letter-spacing: 0.08em;
          background: ${theme.accent}; color: #fff; border: none;
          padding: 13px 26px; border-radius: 6px; cursor: pointer;
          display: inline-flex; align-items: center; gap: 10px;
          transition: opacity 0.25s, transform 0.2s;
        }
        .contact-btn:hover { opacity: 0.9; transform: translateY(-1px); }

        .faq-search-wrap { position: relative; margin-bottom: 14px; }
        .faq-search {
          width: 100%; background: ${theme.bgSecondary};
          border: 1px solid ${theme.cardBorder}; border-radius: 8px;
          padding: 13px 16px 13px 44px; color: ${theme.textPrimary};
          font-family: 'Barlow', sans-serif; font-size: 0.92rem;
          outline: none; transition: border-color 0.25s; box-sizing: border-box;
        }
        .faq-search::placeholder { color: ${theme.textSecondary}; opacity: 0.5; }
        .faq-search:focus { border-color: ${theme.accent}; }
        .faq-search-icon {
          position: absolute; left: 14px; top: 50%;
          transform: translateY(-50%); color: ${theme.textSecondary}; pointer-events: none;
        }
        .faq-no-results {
          font-family: 'Barlow', sans-serif; font-size: 0.9rem;
          color: ${theme.textSecondary}; padding: 32px 0; text-align: center;
        }

        .faq-item { border-radius: 10px; overflow: hidden; margin-bottom: 10px; transition: background 0.3s; }
        .faq-item.active { background: ${theme.accent}; }
        .faq-item.inactive { background: ${theme.cardBg}; border: 1px solid ${theme.cardBorder}; }
        .faq-item.inactive:hover { background: ${theme.bgSecondary}; }
        
        .faq-trigger {
          width: 100%; display: flex; align-items: center;
          justify-content: space-between; padding: 20px 24px;
          background: transparent; border: none; cursor: pointer; text-align: left; gap: 14px;
        }
        .faq-question { font-family: 'Barlow', sans-serif; font-weight: 700; font-size: 1rem; color: ${theme.textPrimary}; line-height: 1.35; }
        .faq-item.active .faq-question { color: #fff; }

        .faq-icon {
          flex-shrink: 0; width: 26px; height: 26px; border-radius: 50%;
          border: 1.5px solid currentColor;
          display: flex; align-items: center; justify-content: center;
          color: ${theme.textSecondary};
        }
        .faq-item.active .faq-icon { color: #fff; }

        .faq-body { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 0.38s ease; }
        .faq-body.open { grid-template-rows: 1fr; }
        .faq-body-inner { overflow: hidden; }
        .faq-answer { font-family: 'Barlow', sans-serif; font-size: 0.91rem; color: ${theme.textSecondary}; line-height: 1.75; padding: 0 24px 20px; }
        .faq-item.active .faq-answer { color: rgba(255,255,255,0.9); }

        .faq-carousel-nav { display: flex; align-items: center; gap: 10px; margin-bottom: 14px; }
        .faq-carousel-counter { font-family: 'Barlow', sans-serif; font-size: 0.82rem; color: ${theme.textSecondary}; flex: 1; }
        .faq-carousel-btn {
          width: 36px; height: 36px; border-radius: 50%;
          background: ${theme.cardBg}; border: 1px solid ${theme.cardBorder};
          color: ${theme.textPrimary}; display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: all 0.2s; flex-shrink: 0;
        }
        .faq-carousel-btn:disabled { opacity: 0.25; cursor: default; }
        .faq-carousel-btn:not(:disabled):hover { background: ${theme.accent}; border-color: ${theme.accent}; color: #fff; }
        
        .faq-carousel-dots { display: flex; gap: 6px; justify-content: center; margin-top: 16px; flex-wrap: wrap; }
        .faq-carousel-dot { height: 3px; border-radius: 2px; background: ${theme.divider}; transition: all 0.3s; cursor: pointer; width: 20px; }
        .faq-carousel-dot.active { background: ${theme.accent}; width: 32px; }
      `}</style>

      <section className="faq-section">
        <div className="faq-inner">
          <div className="faq-grid">

            {/* Left */}
            <div className="faq-left">
              <p className="faq-eyebrow">Frequently Asked Questions</p>
              <h2 className="faq-heading">Everything You Need to Know Before You Ride</h2>
              <p className="faq-sub">
                We're here to make your rental experience easy and enjoyable. Browse through our most common questions to get started with confidence.
              </p>
              <div className="faq-divider" />
              <a className="contact-btn" href="#contact">
  Contact Us
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M7 17L17 7M7 7h10v10" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
</a>
            </div>

            {/* Right */}
            <div>
              <div className="faq-search-wrap">
                <svg className="faq-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" strokeLinecap="round" />
                </svg>
                <input
                  className="faq-search"
                  type="text"
                  placeholder="Search questions..."
                  value={search}
                  onChange={e => handleSearch(e.target.value)}
                />
              </div>

              {/* Desktop accordion */}
              <div className="faq-desktop-accordion">
                {filtered.length === 0
                  ? <p className="faq-no-results">No questions match your search.</p>
                  : filtered.map((faq, i) => (
                    <div key={i} className={`faq-item ${open === i ? "active" : "inactive"}`} style={{cursor:"pointer"}} onClick={() => setOpen(open === i ? -1 : i)}>
                      <div className="faq-trigger">
                        <span className="faq-question">{faq.q}</span>
                        <span className="faq-icon" style={{transition:"transform 0.35s, border-color 0.25s", ...(open === i ? {transform:"rotate(45deg)", color: "#fff"} : {})}}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                          </svg>
                        </span>
                      </div>
                      <div className={`faq-body ${open === i ? "open" : ""}`}>
                        <div className="faq-body-inner">
                          <p className="faq-answer">{faq.a}</p>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>

              {/* Mobile carousel */}
              <div className="faq-mobile-carousel">
                {filtered.length === 0
                  ? <p className="faq-no-results">No questions match your search.</p>
                  : <>
                    {totalPages > 1 && (
                      <div className="faq-carousel-nav">
                        <span className="faq-carousel-counter">Page {mobileIndex + 1} / {totalPages}</span>
                        <button className="faq-carousel-btn" onClick={mobilePrev} disabled={mobileIndex === 0} aria-label="Previous">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>
                        <button className="faq-carousel-btn" onClick={mobileNext} disabled={mobileIndex === totalPages - 1} aria-label="Next">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>
                      </div>
                    )}

                    {currentPageItems.map((faq, i) => {
                      const globalIndex = mobileIndex * MOBILE_PAGE_SIZE + i;
                      return (
                        <div key={globalIndex} className={`faq-item ${open === globalIndex ? "active" : "inactive"}`} style={{cursor:"pointer"}} onClick={() => setOpen(open === globalIndex ? null : globalIndex)}>
                          <div className="faq-trigger">
                            <span className="faq-question">{faq.q}</span>
                            <span className="faq-icon" style={{transition:"transform 0.35s, border-color 0.25s", ...(open === globalIndex ? {transform:"rotate(45deg)", color: "#fff"} : {})}}>
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                              </svg>
                            </span>
                          </div>
                          <div className={`faq-body ${open === globalIndex ? "open" : ""}`}>
                            <div className="faq-body-inner">
                              <p className="faq-answer">{faq.a}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    {totalPages > 1 && (
                      <div className="faq-carousel-dots">
                        {Array.from({ length: totalPages }).map((_, i) => (
                          <div key={i} className={`faq-carousel-dot ${i === mobileIndex ? "active" : ""}`} onClick={() => { setMobileIndex(i); setOpen(null); }} />
                        ))}
                      </div>
                    )}
                  </>
                }
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}