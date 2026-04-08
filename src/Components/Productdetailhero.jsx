import { useEffect, useState } from "react";
import { useTheme } from "../ThemeContext";
import { useCartWishlist } from "../hooks/useCartWishlist";

function StatIcon({ type }) {
  if (type === "speed")
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 1 1-6.88 17.24" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    );
  if (type === "range")
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12h18M3 12l4-4M3 12l4 4M21 12l-4-4M21 12l-4 4" />
      </svg>
    );
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="16" height="10" rx="2" />
      <path d="M22 11v2" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M6 11h4M10 9v4" />
    </svg>
  );
}

export default function ProductDetailHero({ product }) {
  const { dark } = useTheme();
  const [scrollY, setScrollY] = useState(0);
  const [activeColor, setActiveColor] = useState(0);
  const [visible, setVisible] = useState(false);

  const { addToCart, removeFromCart, isInCart, toggleWishlist, isInWishlist } = useCartWishlist();
  const inCart = isInCart(product?.id);
  const inWishlist = isInWishlist(product?.id);

  const [cartAdding, setCartAdding] = useState(false);
  const [heartPopped, setHeartPopped] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setActiveColor(0); }, [product?.id]);

  if (!product) return null;

  const handleCartAction = (e) => {
    e.stopPropagation();
    if (inCart) {
      removeFromCart(product.id);
      return;
    }
    setCartAdding(true);
    setTimeout(() => {
      addToCart({ ...product, selectedColor: product.colors?.[activeColor] });
      setCartAdding(false);
    }, 500);
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    toggleWishlist(product);
    setHeartPopped(true);
    setTimeout(() => setHeartPopped(false), 400);
  };

  const parallax = scrollY * 0.28;
  const bg = dark ? product.bgDark : product.bgLight;
  const accentColor = "#FF5A1F";
  const textPrimary = dark ? "#C2C5CC" : "#111111";
  const textSecond = dark ? "#7A7F87" : "#6E6E73";
  const statBg = dark ? "rgba(194,197,204,0.04)" : "rgba(0,0,0,0.03)";

  const overlayDark = "linear-gradient(105deg, rgba(11,11,12,0.92) 0%, rgba(11,11,12,0.70) 50%, rgba(11,11,12,0.20) 100%), linear-gradient(to bottom, rgba(11,11,12,0) 40%, rgba(11,11,12,1) 100%)";
  const overlayLight = "linear-gradient(105deg, rgba(250,250,250,0.96) 0%, rgba(250,250,250,0.72) 50%, rgba(250,250,250,0.10) 100%), linear-gradient(to bottom, rgba(250,250,250,0) 40%, rgba(250,250,250,1) 100%)";

  const enter = (delay = 0) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0px)" : "translateY(18px)",
    transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`,
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@300;400;600;700&display=swap');

        .pdh-wrap { position: relative; height: 100vh; min-height: 720px; max-height: 900px; overflow: hidden; display: flex; align-items: center; }
        .pdh-bg { position: absolute; inset: 0; background-size: cover; background-position: center 35%; will-change: transform; transition: background-image 0.5s ease; }
        .pdh-overlay { position: absolute; inset: 0; }
        .pdh-bike { position: absolute; right: clamp(20px, 8vw, 120px); bottom: 0; height: clamp(280px, 55vh, 600px); width: auto; object-fit: contain; z-index: 2; filter: drop-shadow(0 24px 48px rgba(0,0,0,0.45)); transition: opacity 0.6s ease 300ms, transform 0.8s cubic-bezier(0.22,1,0.36,1) 300ms; }
        .pdh-content { position: relative; z-index: 3; padding-left: clamp(28px, 6vw, 100px); max-width: 56%; display: flex; flex-direction: column; }
        .pdh-stat { display: flex; flex-direction: column; gap: 5px; padding: 14px 18px; border-radius: 4px; border-top: 2px solid ${accentColor}; min-width: 86px; backdrop-filter: blur(6px); }
        .pdh-swatch { width: 22px; height: 22px; border-radius: 50%; cursor: pointer; border: 2px solid transparent; transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .pdh-swatch.active { border-color: ${accentColor}; box-shadow: 0 0 0 3px rgba(255,90,31,0.25); transform: scale(1.12); }
        .pdh-add-btn { height: 48px; padding: 0 32px; background: ${accentColor}; color: white; font-family: 'Barlow', sans-serif; font-weight: 700; font-size: 0.75rem; letter-spacing: 0.2em; text-transform: uppercase; border: none; border-radius: 4px; cursor: pointer; display: flex; align-items: center; gap: 12px; transition: all 0.3s ease; box-shadow: 0 8px 20px -6px rgba(255, 90, 31, 0.4); position: relative; overflow: hidden; }
        .pdh-add-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 24px -6px rgba(255, 90, 31, 0.6); }
        .pdh-wish-btn { width: 48px; height: 48px; border-radius: 4px; display: flex; align-items: center; justify-content: center; cursor: pointer; border: 1px solid ${dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}; transition: all 0.3s ease; }
        @keyframes heart-pop { 0% { transform: scale(1); } 50% { transform: scale(1.3); } 100% { transform: scale(1); } }
        .popping { animation: heart-pop 0.4s ease; }
        .pdh-scroll-line { width: 1px; height: 36px; background: linear-gradient(to bottom, ${accentColor}, transparent); animation: pdh-pulse 1.8s ease-in-out infinite; }
        @keyframes pdh-pulse { 0%, 100% { opacity: 0.4; } 50% { opacity: 1; } }
      `}</style>

      <div className="pdh-wrap">
        <div className="pdh-bg" style={{ backgroundImage: `url(${bg})`, transform: `translateY(${parallax}px)`, filter: dark ? "brightness(0.55) saturate(0.9)" : "brightness(0.88) saturate(0.35)" }} />
        <div className="pdh-overlay" style={{ background: dark ? overlayDark : overlayLight }} />

         {/* Floating bike */}

        <img

          key={`${product.id}-${activeColor}`}

          className="pdh-bike"

          src={product.colors?.[activeColor]?.images?.[0] || product.heroImage}

          alt={product.name}

          style={{

            opacity:   visible ? 1 : 0,

            transform: visible

              ? "translateX(0px) translateY(0px)"

              : "translateX(40px) translateY(10px)",

          }}

          onError={(e) => { e.currentTarget.src = product.heroImage; }}

        />

        <div className="pdh-content">
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, ...enter(80) }}>
            <span style={{ width: 22, height: 1.5, background: accentColor }} />
            <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.66rem", fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", color: accentColor }}>
              {product.heroSub || product.category}
            </span>
          </div>

          <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(3.4rem, 9vw, 7.5rem)", lineHeight: 0.88, margin: "0 0 16px", color: textPrimary, ...enter(160) }}>
            {product.name}
          </h1>

          <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: "clamp(0.76rem, 1.3vw, 0.88rem)", fontWeight: 300, letterSpacing: "0.12em", textTransform: "uppercase", color: textSecond, margin: "0 0 24px", ...enter(220) }}>
            {product.tagline}
          </p>

          {product.heroStats?.length > 0 && (
            <div style={{ display: "flex", gap: 20, marginBottom: 36, flexWrap: "wrap", ...enter(280) }}>
              {product.heroStats.map((stat) => (
                <div key={stat.label} className="pdh-stat" style={{ background: statBg }}>
                  <span style={{ color: accentColor }}><StatIcon type={stat.icon} /></span>
                  <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.4rem", color: textPrimary }}>{stat.value}</span>
                  <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.58rem", fontWeight: 700, color: textSecond, textTransform: "uppercase" }}>{stat.label}</span>
                </div>
              ))}
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: 32, ...enter(340) }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.6rem", fontWeight: 700, color: textSecond, textTransform: "uppercase" }}>Color</span>
              {product.colors?.map((color, i) => (
                <button key={color.name} className={`pdh-swatch ${i === activeColor ? "active" : ""}`} style={{ background: color.hex }} onClick={() => setActiveColor(i)} />
              ))}
              <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.65rem", fontWeight: 600, color: textPrimary }}>{product.colors?.[activeColor]?.name}</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
               <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.55rem", fontWeight: 700, color: accentColor, textTransform: "uppercase" }}>Price</span>
                  <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "2.4rem", color: textPrimary }}>${product.price?.toLocaleString()}</span>
               </div>

               <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <button className="pdh-add-btn" onClick={handleCartAction}>
                    {inCart ? "Remove from Cart" : "Add to Cart"}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      {inCart ? <path d="M18 6L6 18M6 6l12 12"/> : <path d="M5 12h14M12 5l7 7-7 7" />}
                    </svg>
                  </button>

                  <button 
                    className={`pdh-wish-btn ${heartPopped ? 'popping' : ''}`} 
                    onClick={handleWishlist}
                    style={{ background: inWishlist ? "rgba(224,68,90,0.15)" : statBg }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill={inWishlist ? "#e0445a" : "none"} stroke={inWishlist ? "#e0445a" : textSecond} strokeWidth="2">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                  </button>
               </div>
            </div>
          </div>
        </div>

        <div style={{ position: "absolute", bottom: 28, left: "clamp(28px, 6vw, 100px)", display: "flex", gap: 8, fontFamily: "'Barlow', sans-serif", fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase", ...enter(450) }}>
          <span style={{ color: textSecond }}>Home</span>
          <span style={{ color: accentColor }}>/</span>
          <span style={{ color: textPrimary }}>{product.name}</span>
        </div>

        <div style={{ position: "absolute", bottom: 28, right: "clamp(24px, 4vw, 64px)", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, ...enter(500) }}>
          <span style={{ writingMode: "vertical-rl", fontFamily: "'Barlow', sans-serif", fontSize: "0.55rem", fontWeight: 700, color: textSecond, textTransform: "uppercase" }}>Scroll</span>
          <div className="pdh-scroll-line" />
        </div>
      </div>
    </>
  );
}