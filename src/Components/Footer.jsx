import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../ThemeContext";

const socials = [
  { label: "YouTube", href: "#", icon: (<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.7 15.5V8.5l6.3 3.5-6.3 3.5z" /></svg>) },
  { label: "Instagram", href: "#", icon: (<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 2.2c3.2 0 3.6 0 4.9.1 3.3.2 4.8 1.7 5 5 .1 1.3.1 1.6.1 4.8s0 3.5-.1 4.8c-.2 3.3-1.7 4.8-5 5-1.3.1-1.6.1-4.9.1s-3.5 0-4.8-.1c-3.3-.2-4.8-1.7-5-5C2 16.5 2 16.2 2 12s0-3.5.1-4.8c.2-3.3 1.7-4.8 5-5C8.5 2.2 8.8 2.2 12 2.2zm0-2.2C8.7 0 8.3 0 7 .1 2.7.3.3 2.7.1 7 0 8.3 0 8.7 0 12s0 3.7.1 5c.2 4.3 2.6 6.7 7 6.9 1.3.1 1.7.1 5 .1s3.7 0 5-.1c4.3-.2 6.8-2.6 7-7 .1-1.3.1-1.7.1-5s0-3.7-.1-5C23.7 2.7 21.3.3 17 .1 15.7 0 15.3 0 12 0zm0 5.8a6.2 6.2 0 1 0 0 12.4A6.2 6.2 0 0 0 12 5.8zm0 10.2a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.8a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8z" /></svg>) },
  { label: "Facebook", href: "#", icon: (<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.95.93-1.95 1.88v2.27h3.32l-.53 3.5h-2.8V24C19.62 23.1 24 18.1 24 12.07z" /></svg>) },
  { label: "LinkedIn", href: "#", icon: (<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.35-1.85 3.58 0 4.24 2.36 4.24 5.43v6.31zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" /></svg>) },
  { label: "TikTok", href: "#", icon: (<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M19.59 6.69a4.83 4.83 0 0 1-4.83-4.83V0h-3.37v16.57a2.89 2.89 0 1 1-2.06-2.77V10.3a6.27 6.27 0 1 0 5.43 6.2V8.47a8.16 8.16 0 0 0 4.83 1.57V6.68h-.0z" /></svg>) },
];

const navLinks = [
  { label: "Product",         to: "/products" },
  { label: "Accessories",     to: "/accessories" },
  { label: "About Us",        to: "/about" },
  { label: "Service Support", to: "/support" },
  { label: "Find a Store",    to: "/stores" },
  { label: "Schedule a Ride", to: "/schedule" },
];

const supportLinks = [
  { label: "After-sales Service", to: "/support/after-sales" },
  { label: "FAQ",                 to: "/support/faq" },
  { label: "Warranty Policy",     to: "/support/warranty" },
  { label: "User Manuals",        to: "/support/manuals" },
];

export default function Footer() {
  const lineRef = useRef(null);
  const { dark } = useTheme();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) entry.target.classList.add("line-animate"); },
      { threshold: 0.1 }
    );
    if (lineRef.current) observer.observe(lineRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@300;400;600;700&display=swap');

        .footer-root {
          font-family: 'Barlow', sans-serif;
          position: relative; overflow: hidden;
          width: 100%; box-sizing: border-box;
          transition: background 0.5s ease;
        }
        /* Dark: deep obsidian | Light: Carbon Black #0F0F10 — footer stays dark per client spec */
        .footer-root.dark  { background: #0B0B0C; color: #C2C5CC; }
        .footer-root.light { background: #0F0F10; color: #C2C5CC; }

        .footer-root.dark::before {
          content: '';
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(194,197,204,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(194,197,204,0.02) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none; z-index: 0;
        }
        .footer-root::after {
          content: '';
          position: absolute; top: -120px; right: -120px;
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(255,90,31,0.08) 0%, transparent 70%);
          pointer-events: none; z-index: 0;
        }

        /* Top */
        .footer-top {
          display: flex; align-items: center; justify-content: space-between;
          padding: 32px clamp(20px,5vw,80px);
          border-bottom: 1px solid rgba(194,197,204,0.08);
          flex-wrap: wrap; gap: 20px; position: relative; z-index: 1;
        }

        .footer-logo {
          font-family: 'Bebas Neue', sans-serif; font-size: 2rem;
          color: #C2C5CC; letter-spacing: 0.04em; text-decoration: none;
          transition: color 0.25s;
        }
        .footer-logo:hover { color: #FF5A1F; }

        .footer-socials { display: flex; gap: 10px; align-items: center; }
        .social-btn {
          width: 38px; height: 38px; border-radius: 50%;
          border: 1px solid rgba(194,197,204,0.15);
          background: rgba(194,197,204,0.04);
          color: rgba(194,197,204,0.55);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; text-decoration: none;
          transition: all 0.25s ease; position: relative; overflow: hidden;
        }
        .social-btn::before {
          content: ''; position: absolute; inset: 0; border-radius: 50%;
          background: #FF5A1F; transform: scale(0); transition: transform 0.3s ease;
        }
        .social-btn:hover::before { transform: scale(1); }
        .social-btn:hover { color: #fff; border-color: #FF5A1F; }
        .social-btn svg { position: relative; z-index: 1; }

        /* Body */
        .footer-body {
          display: grid; grid-template-columns: 1.2fr 1px 1fr 1px 0.8fr;
          gap: 0; padding: clamp(40px,6vw,72px) clamp(20px,5vw,80px);
          position: relative; z-index: 1; box-sizing: border-box;
        }
        @media (max-width: 900px) { .footer-body { grid-template-columns: 1fr; gap: 40px; } .footer-col-divider { display: none; } }

        .footer-col-divider { background: rgba(194,197,204,0.07); margin: 0 clamp(20px,3vw,48px); }

        .footer-tagline {
          font-size: 0.88rem; color: #7A7F87; line-height: 1.7;
          max-width: 280px; margin-bottom: 32px;
        }

        .contact-item { display: flex; align-items: center; gap: 14px; margin-bottom: 18px; }
        .contact-icon {
          width: 40px; height: 40px; border-radius: 50%;
          border: 1px solid rgba(194,197,204,0.12); background: rgba(194,197,204,0.04);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; color: #7A7F87; transition: all 0.25s;
        }
        .contact-item:hover .contact-icon { border-color: #FF5A1F; color: #FF5A1F; background: rgba(255,90,31,0.08); }
        .contact-label { font-size: 0.7rem; color: #7A7F87; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 3px; }
        .contact-value { font-size: 1rem; font-weight: 600; color: #C2C5CC; letter-spacing: 0.02em; }

        .footer-col-title {
          font-family: 'Bebas Neue', sans-serif; font-size: 0.75rem;
          letter-spacing: 0.22em; color: #7A7F87; text-transform: uppercase; margin-bottom: 20px;
        }

        .footer-nav-link {
          display: block; font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(1.4rem,2.2vw,1.9rem); color: rgba(194,197,204,0.4);
          text-decoration: none; letter-spacing: 0.04em; line-height: 1.35; margin-bottom: 4px;
          position: relative; transition: color 0.25s ease; width: fit-content;
        }
        .footer-nav-link::after {
          content: ''; position: absolute; bottom: -1px; left: 0;
          width: 0; height: 1px; background: #FF5A1F; transition: width 0.3s ease;
        }
        .footer-nav-link:hover { color: #C2C5CC; }
        .footer-nav-link:hover::after { width: 100%; }

        .footer-support-link {
          display: flex; align-items: center; gap: 8px;
          font-size: 0.88rem; color: #7A7F87; text-decoration: none;
          padding: 9px 0; border-bottom: 1px solid rgba(194,197,204,0.06);
          transition: color 0.25s, padding-left 0.25s; letter-spacing: 0.02em;
        }
        .footer-support-link:last-child { border-bottom: none; }
        .footer-support-link:hover { color: #C2C5CC; padding-left: 6px; }
        .footer-support-link:hover .support-arrow { opacity: 1; transform: translateX(0); }
        .support-arrow { opacity: 0; transform: translateX(-4px); transition: all 0.25s; color: #FF5A1F; flex-shrink: 0; }

        .footer-divider-line {
          height: 1px; background: rgba(194,197,204,0.07);
          margin: 0 clamp(20px,5vw,80px); position: relative; overflow: hidden; z-index: 1;
        }
        .footer-divider-line::after {
          content: ''; position: absolute; top: 0; left: 0; width: 0; height: 100%;
          background: linear-gradient(90deg, transparent, #FF5A1F, transparent);
          transition: width 1.2s ease;
        }
        .footer-divider-line.line-animate::after { width: 100%; }

        .footer-bottom {
          display: flex; align-items: center; justify-content: space-between;
          padding: 20px clamp(20px,5vw,80px); flex-wrap: wrap; gap: 12px;
          position: relative; z-index: 1;
        }
        .footer-copy { font-size: 0.78rem; color: #7A7F87; letter-spacing: 0.05em; }
        .footer-copy span { color: #FF5A1F; }
        .footer-legal { display: flex; gap: 20px; flex-wrap: wrap; }
        .footer-legal a { font-size: 0.78rem; color: #7A7F87; text-decoration: none; letter-spacing: 0.05em; transition: color 0.2s; }
        .footer-legal a:hover { color: #C2C5CC; }

        .scroll-top {
          position: fixed; bottom: 32px; right: 24px;
          width: 42px; height: 42px; border-radius: 50%;
          background: #FF5A1F; border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          color: #fff; box-shadow: 0 4px 20px rgba(255,90,31,0.4);
          transition: transform 0.25s, box-shadow 0.25s; z-index: 100;
        }
        .scroll-top:hover { transform: translateY(-3px); box-shadow: 0 8px 28px rgba(255,90,31,0.55); }

        @media (max-width: 480px) { .footer-bottom { flex-direction: column; align-items: flex-start; } }
      `}</style>

      <footer className={`footer-root ${dark ? "dark" : "light"}`}>
        <div className="footer-top">
          <Link to="/" className="footer-logo">VELT</Link>
          <div className="footer-socials">
            {socials.map(s => (
              <a key={s.label} href={s.href} className="social-btn" aria-label={s.label} target="_blank" rel="noreferrer">{s.icon}</a>
            ))}
          </div>
        </div>

        <div className="footer-body">
          <div>
            <p className="footer-tagline">VELT is committed to providing you with the most cutting-edge electric motorcycle experience. Built for tomorrow, available today.</p>
            <div className="contact-item">
              <div className="contact-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.8 19.8 0 0 1 3.08 5.18 2 2 0 0 1 5.07 3h3a2 2 0 0 1 2 1.72c.13 1 .37 1.97.72 2.9a2 2 0 0 1-.45 2.11L9.09 11a16 16 0 0 0 6.91 6.91l1.27-1.27a2 2 0 0 1 2.11-.45c.93.35 1.9.59 2.9.72A2 2 0 0 1 22 16.92z" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <div><p className="contact-label">Hotline</p><p className="contact-value">+880 1700-123456</p></div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" strokeLinecap="round"/></svg>
              </div>
              <div><p className="contact-label">Service Hotline</p><p className="contact-value">+880 1335-541654</p></div>
            </div>
          </div>

          <div className="footer-col-divider" />

          <div>
            <p className="footer-col-title">Navigate</p>
            {navLinks.map(l => <Link key={l.to} to={l.to} className="footer-nav-link">{l.label}</Link>)}
          </div>

          <div className="footer-col-divider" />

          <div>
            <p className="footer-col-title">Support</p>
            {supportLinks.map(l => (
              <Link key={l.to} to={l.to} className="footer-support-link">
                <svg className="support-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="footer-divider-line" ref={lineRef} />

        <div className="footer-bottom">
          <p className="footer-copy">© 2025 <span>VELT</span>. All rights reserved.</p>
          <div className="footer-legal">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Use</Link>
            <Link to="/cookies">Cookie Policy</Link>
          </div>
        </div>
      </footer>

      <button className="scroll-top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Scroll to top">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 19V5M5 12l7-7 7 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>
    </>
  );
}