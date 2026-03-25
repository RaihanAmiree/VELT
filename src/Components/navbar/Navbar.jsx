import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useTheme } from "../../ThemeContext";
import Logo from "../../assets/Logo.webp";
import CartWishlistBadges from "./CartWishlistBadges";

function SunIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/>
      <line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  );
}

const Navbar = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const { dark, setDark } = useTheme();

  useEffect(() => {
    const controlNavbar = () => {

      const currentScrollY = window.scrollY;

      setIsAtTop(currentScrollY < 10);

      setIsVisible(!(currentScrollY > lastScrollY && currentScrollY > 100));

      setLastScrollY(currentScrollY);

    };

    window.addEventListener("scroll", controlNavbar);

    return () => window.removeEventListener("scroll", controlNavbar);

  }, [lastScrollY]);

  /* Dynamic text colors */

  const textColor = dark
    ? "rgba(194,197,204,0.75)"
    : isAtTop
      ? "rgba(25,25,25,0.9)"
      : "rgba(235,235,235,0.95)";

  const mobileTextColor = dark
    ? "rgba(194,197,204,0.65)"
    : isAtTop
      ? "rgba(25,25,25,0.8)"
      : "rgba(235,235,235,0.95)";

  const labelColor = dark
    ? "rgba(194,197,204,0.55)"
    : isAtTop
      ? "rgba(40,40,40,0.7)"
      : "rgba(235,235,235,0.9)";

  const atTopBg = "rgba(11,11,12,0.15)";
  const scrolledBg = "rgba(15,15,16,0.94)";

  return (
    <>
      <style>{`

        .nav-link {
          position: relative;
          padding: 6px 0;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.13em;
          text-transform: uppercase;
          text-decoration: none;
          color: ${textColor};
          transition: color 0.25s ease;
        }

        .nav-link::after {
          content:'';
          position:absolute;
          bottom:0;
          left:0;
          width:0;
          height:1.5px;
          background:#FF5A1F;
          transition:width .3s cubic-bezier(0.4,0,0.2,1);
        }

        .nav-link:hover::after,
        .nav-link.active::after{
          width:100%;
        }

        .nav-link:hover{
          color:#FF5A1F !important;
        }

        .nav-link.active{
          color:#FF5A1F !important;
        }

        .mobile-link{
          display:flex;
          align-items:center;
          gap:10px;
          padding:12px 0;
          font-size:0.82rem;
          font-weight:700;
          letter-spacing:0.14em;
          text-transform:uppercase;
          text-decoration:none;
          color:${mobileTextColor};
          border-bottom:1px solid rgba(255,255,255,0.05);
          transition:color .2s,padding-left .25s;
        }

        .mobile-link:last-child{
          border-bottom:none;
        }

        .mobile-link:hover{
          color:#FF5A1F !important;
          padding-left:4px;
        }

        .toggle-pill{
          width:42px;
          height:23px;
          background:#FF5A1F;
          border-radius:999px;
          position:relative;
        }

        .toggle-knob{
          position:absolute;
          top:2.5px;
          width:18px;
          height:18px;
          background:#fff;
          border-radius:50%;
          display:flex;
          align-items:center;
          justify-content:center;
          transition:left .35s;
        }

        .toggle-knob.is-dark{
          left:2.5px;
          color:#0B0B0C;
        }

        .toggle-knob.is-light{
          left:21px;
          color:#FF5A1F;
        }

        .theme-btn{
          display:flex;
          align-items:center;
          gap:8px;
          padding:5px 5px 5px 11px;
          border-radius:999px;
          border:1px solid rgba(194,197,204,0.2);
          cursor:pointer;
          background:transparent;
        }

        .theme-btn-label{
          font-size:0.68rem;
          font-weight:700;
          letter-spacing:0.12em;
          text-transform:uppercase;
          color:${labelColor};
        }

      `}</style>

      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${isVisible ? "top-0" : "-top-24"}`}
        style={{
          background: isAtTop && !isOpen ? atTopBg : scrolledBg,
          backdropFilter:"blur(20px)",
          borderBottom:isAtTop && !isOpen ? "none" : "1px solid rgba(255,255,255,0.05)"
        }}
      >

        <div style={{width:"100%",paddingLeft:"clamp(16px,4vw,80px)",paddingRight:"clamp(16px,4vw,80px)"}}>
          <div className="flex justify-between items-center h-20">

            <Link to="/" onClick={()=>setIsOpen(false)} className="flex items-center gap-2.5">

              <img
                src={Logo}
                alt="Velt Logo"
                className="h-7 w-auto"
                style={{filter: dark || !isAtTop ? "brightness(0) invert(1)" : "none"}}
              />

              <span style={{
                fontSize:"1.1rem",
                fontWeight:900,
                letterSpacing:"0.18em",
                textTransform:"uppercase",
                color:textColor
              }}>
                VELT DRT
              </span>

            </Link>

            <div className="hidden md:flex items-center gap-10 ml-auto mr-10">

              {[
                {to:"/products",label:"Product"},
                {to:"/accessories",label:"Accessories"},
                {to:"/about",label:"About Us"},
                {to:"/support",label:"Service Support"},
              ].map(({to,label})=>(
                <NavLink key={to} to={to} className={({isActive})=>`nav-link ${isActive?"active":""}`}>
                  {label}
                </NavLink>
              ))}

            </div>

            <div className="flex items-center gap-4">

              <button className="theme-btn" onClick={()=>setDark(d=>!d)}>
                <span className="theme-btn-label">{dark?"Dark":"Light"}</span>

                <div className="toggle-pill">
                  <div className={`toggle-knob ${dark?"is-dark":"is-light"}`}>
                    {dark?<MoonIcon/>:<SunIcon/>}
                  </div>
                </div>
              </button>

              <button onClick={()=>setIsOpen(!isOpen)} className="md:hidden p-2" style={{color:textColor}}>
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isOpen
                    ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                    : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
                  }
                </svg>
              </button>

            </div>
          </div>
        </div>

        <div className={`md:hidden overflow-hidden transition-all duration-300 ${isOpen?"max-h-80":"max-h-0"}`} style={{background:"rgba(11,11,12,0.98)"}}>

          <div className="flex flex-col px-6 py-4">

            {[
              {to:"/products",label:"Products"},
              {to:"/accessories",label:"Accessories"},
              {to:"/about",label:"About Us"},
              {to:"/support",label:"Service Support"},
            ].map(({to,label})=>(
              <NavLink key={to} to={to} className="mobile-link" onClick={()=>setIsOpen(false)}>
                {label}
              </NavLink>
            ))}

          </div>
          <CartWishlistBadges />
        </div>

      </nav>
    </>
  );
};

export default Navbar;