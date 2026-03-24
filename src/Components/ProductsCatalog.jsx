import { useRef, useState, useEffect } from "react";
import { useTheme } from "../ThemeContext";
import ProductCard from "./ProductCard";

// ── Product Data (from JSON) ─────────────────────────────────
const PRODUCTS = [
  {
    id: "veltdrt-e10",
    name: "VELT DRT E10",
    tagline: "Glide With Power",
    heroSub: "ADVENTURE REDEFINED",
    category: "electric dirt bike",
    price: 1699,
    heroImage: "https://sur-ron.co.uk/wp-content/uploads/2026/01/EmptyName-1533-scaled-e1768314447471-1.png",
    bgDark: "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=1920&q=85",
    bgLight: "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=1920&q=85",
    thumbnail: "/products/veltdrt-e10/thumbnail.jpg",
    heroStats: [
      { label: "Top Speed", value: "65 KM/H", icon: "speed" },
      { label: "Range",     value: "65-70 KM", icon: "range" },
      { label: "Battery",   value: "60V 27Ah", icon: "capacity" },
    ],
    colors: [
      { name: "Matte Black", hex: "#1a1a1a", images: ["/products/veltdrt-e10/gallery/black-1.jpg", "/products/veltdrt-e10/gallery/black-2.jpg", "/products/veltdrt-e10/gallery/black-3.jpg"] },
      { name: "Steel Gray",  hex: "#6b6b6b", images: ["/products/veltdrt-e10/gallery/gray-1.jpg",  "/products/veltdrt-e10/gallery/gray-2.jpg",  "/products/veltdrt-e10/gallery/gray-3.jpg"]  },
    ],
    specs: {
      "Motor": "3500W Brushless Motor",
      "Top Speed": "65 KM/H",
      "Max Range": "65-70 KM",
      "Battery": "60V 27Ah Lithium",
      "Charging Time (hrs)": "6-8 H",
      "Brakes": "Front & Rear Disc",
      "Tyres": "14/12 Tubeless",
      "Shocks": "Front Telescopic & Rear Hydraulic",
      "Dimensions (L×W×H)": "1900 × 750 × 1150 MM",
      "Wheel Base": "1280 MM",
      "Ground Clearance": "185 MM",
      "Dry Weight": "60 KG",
      "Controllers": "Vector-Based Controller",
      "Electricity Consumption": "2.8 Units/KWH Per Charge",
    },
    highlights: [
      { title: "High-Torque 3500W Motor",    description: "Delivers instant torque for smooth city acceleration and confident highway cruising without breaking a sweat." },
      { title: "65-70 KM Real-World Range",  description: "The 60V 27Ah lithium pack keeps you riding through the full day on a single overnight charge." },
      { title: "Ride Modes",                 description: "Switch between Eco, City, and Sport modes to balance range and performance based on your ride." },
    ],
    features: [
      { tag: "USER-FRIENDLY INTERFACE | REAL-TIME RIDING DATA | EFFORTLESS OPERATION", title: "Upgraded LED Display — Simple, Smart, Easy to Control", description: "Features an upgraded LED display with a clean, easy-to-operate interface, giving you instant access to speed, battery level, mileage, PAS mode, and more.", image: "/products/veltdrt-e10/features/display.jpg", imagePosition: "right" },
      { tag: "LONG LIFE | FAST CHARGE | REMOVABLE",                                    title: "60V 27Ah Battery Built for the Long Haul",               description: "The removable lithium pack slides out in seconds for indoor charging. A full charge in 6-8 hours gives you 65+ km of real-world range.",                image: "/products/veltdrt-e10/features/battery.jpg", imagePosition: "left"  },
      { tag: "ALL-TERRAIN | PUNCTURE RESISTANT | SUPERIOR GRIP",                       title: "Tubeless Tires That Go Anywhere",                          description: "Wide all-terrain tires absorb shocks on gravel, mud, and cracked pavement for a naturally cushioned ride.",                                       image: "/products/veltdrt-e10/features/tires.jpg",    imagePosition: "right" },
    ],
  },
  {
    id: "volt-xr9",
    name: "VOLT XR9",
    tagline: "Unleash Electric Adventure",
    heroSub: "ZERO LIMITS. ZERO EMISSIONS.",
    category: "electric dirt bike",
    price: 1499,
    heroImage: "https://sur-ron.co.uk/wp-content/uploads/2026/01/EmptyName-1533-scaled-e1768314447471-1.png",
    bgDark: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=85",
    bgLight: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=85",
    thumbnail: "/products/volt-xr9/thumbnail.jpg",
    heroStats: [
      { label: "Top Speed", value: "60 KM/H", icon: "speed" },
      { label: "Range",     value: "60-65 KM", icon: "range" },
      { label: "Battery",   value: "60V 24Ah", icon: "capacity" },
    ],
    colors: [
      { name: "Midnight Black", hex: "#111111", images: ["/products/volt-xr9/gallery/black-1.jpg", "/products/volt-xr9/gallery/black-2.jpg", "/products/volt-xr9/gallery/black-3.jpg"] },
      { name: "Crimson Red",    hex: "#b30000", images: ["/products/volt-xr9/gallery/red-1.jpg",   "/products/volt-xr9/gallery/red-2.jpg",   "/products/volt-xr9/gallery/red-3.jpg"]   },
    ],
    specs: {
      "Motor": "3000W Brushless Motor",
      "Top Speed": "60 KM/H",
      "Max Range": "60-65 KM",
      "Battery": "60V 24Ah Lithium",
      "Charging Time (hrs)": "6-7 H",
      "Brakes": "Hydraulic Disc",
      "Tyres": "18 × 3 Off-Road",
      "Shocks": "Front Telescopic & Rear Mono",
      "Dimensions (L×W×H)": "1880 × 720 × 1100 MM",
      "Wheel Base": "1260 MM",
      "Ground Clearance": "180 MM",
      "Dry Weight": "55 KG",
      "Controllers": "Vector-Based Controller",
      "Electricity Consumption": "2.6 Units/KWH Per Charge",
    },
    highlights: [
      { title: "High Efficiency Motor",   description: "The 3000W brushless motor offers powerful acceleration and reliable performance on trails." },
      { title: "Extended Range Battery",  description: "Ride longer with a lithium battery capable of delivering up to 65 KM on a single charge." },
      { title: "Multi Ride Modes",        description: "Choose Eco, Standard, or Sport depending on terrain and riding style." },
    ],
    features: [
      { tag: "SMART DISPLAY | EASY CONTROLS",      title: "Bright Digital Dashboard",     description: "Clear LED display showing speed, battery level, ride mode, and trip data.",                   image: "/products/volt-xr9/features/display.jpg", imagePosition: "right" },
      { tag: "FAST CHARGING | REMOVABLE BATTERY",  title: "Quick Swap Battery System",    description: "Easily remove the battery for indoor charging and convenient transport.",                     image: "/products/volt-xr9/features/battery.jpg", imagePosition: "left"  },
      { tag: "OFF-ROAD PERFORMANCE",               title: "Durable Off-Road Tires",       description: "Designed to grip loose dirt, gravel, and rugged terrain with confidence.",                   image: "/products/volt-xr9/features/tires.jpg",   imagePosition: "right" },
    ],
  },
  {
    id: "veltdrt-e12",
    name: "VELT DRT E12",
    tagline: "Ride the Electric Storm",
    heroSub: "POWER MEETS PRECISION",
    category: "electric dirt bike",
    price: 1899,
    heroImage: "https://sur-ron.co.uk/wp-content/uploads/2026/01/lbx-black-1.png",
    bgDark: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=1920&q=85",
    bgLight: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=1920&q=85",
    thumbnail: "/products/veltdrt-e12/thumbnail.jpg",
    heroStats: [
      { label: "Top Speed", value: "70 KM/H", icon: "speed" },
      { label: "Range",     value: "70-75 KM", icon: "range" },
      { label: "Battery",   value: "60V 30Ah", icon: "capacity" },
    ],
    colors: [
      { name: "Midnight Black", hex: "#0d0d0d", images: ["/products/veltdrt-e12/gallery/black-1.jpg", "/products/veltdrt-e12/gallery/black-2.jpg", "/products/veltdrt-e12/gallery/black-3.jpg"] },
      { name: "Crimson Red",    hex: "#b11226", images: ["/products/veltdrt-e12/gallery/red-1.jpg",   "/products/veltdrt-e12/gallery/red-2.jpg",   "/products/veltdrt-e12/gallery/red-3.jpg"]   },
    ],
    specs: {
      "Motor": "4000W Brushless Motor",
      "Top Speed": "70 KM/H",
      "Max Range": "70-75 KM",
      "Battery": "60V 30Ah Lithium",
      "Charging Time (hrs)": "6-7 H",
      "Brakes": "Hydraulic Disc",
      "Tyres": "19/16 Off-Road",
      "Shocks": "Front Telescopic & Rear Hydraulic",
      "Dimensions (L×W×H)": "1920 × 760 × 1160 MM",
      "Wheel Base": "1300 MM",
      "Ground Clearance": "200 MM",
      "Dry Weight": "62 KG",
      "Controllers": "Vector-Based Controller",
      "Electricity Consumption": "3.0 Units/KWH Per Charge",
    },
    highlights: [
      { title: "4000W Performance Motor",  description: "High efficiency brushless motor delivering powerful acceleration and stable off-road performance." },
      { title: "Extended Range Battery",   description: "Ride longer with a 60V 30Ah lithium pack designed for endurance and reliability." },
      { title: "Smart Ride Modes",         description: "Eco, Trail, and Sport modes let you customize performance depending on terrain." },
    ],
    features: [
      { tag: "SMART DISPLAY | REAL-TIME DATA | EASY CONTROL", title: "Full LED Smart Dashboard",      description: "Clear LED interface showing speed, battery level, trip distance, and riding mode in real time.", image: "/products/veltdrt-e12/features/display.jpg", imagePosition: "right" },
      { tag: "REMOVABLE | HIGH CAPACITY | FAST CHARGING",     title: "Long Range Lithium Battery",    description: "Quick removable battery allows convenient indoor charging and longer riding sessions.",           image: "/products/veltdrt-e12/features/battery.jpg", imagePosition: "left"  },
      { tag: "OFF-ROAD GRIP | DURABLE BUILD",                 title: "Aggressive Trail Tires",        description: "Designed for maximum traction on dirt, gravel, and rocky terrain.",                            image: "/products/veltdrt-e12/features/tires.jpg",    imagePosition: "right" },
    ],
  },
  {
    id: "veltdrt-e8",
    name: "VELT DRT E8",
    tagline: "Compact Power for Every Trail",
    heroSub: "BUILT LIGHT. BUILT TOUGH.",
    category: "electric dirt bike",
    price: 1499,
    heroImage: "https://sur-ron.co.uk/wp-content/uploads/2026/01/lbx-black-1.png",
    bgDark: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=1920&q=85",
    bgLight: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=1920&q=85",
    thumbnail: "/products/veltdrt-e8/thumbnail.jpg",
    heroStats: [
      { label: "Top Speed", value: "55 KM/H", icon: "speed" },
      { label: "Range",     value: "55-60 KM", icon: "range" },
      { label: "Battery",   value: "48V 20Ah", icon: "capacity" },
    ],
    colors: [
      { name: "Jet Black",   hex: "#121212", images: ["/products/veltdrt-e8/gallery/black1.jpg", "/products/veltdrt-e8/gallery/black2.jpg", "/products/veltdrt-e8/gallery/black3.jpg"] },
      { name: "Desert Tan",  hex: "#c8a26e", images: ["/products/veltdrt-e8/gallery/tan1.jpg",   "/products/veltdrt-e8/gallery/tan2.jpg",   "/products/veltdrt-e8/gallery/tan3.jpg"]   },
    ],
    specs: {
      "Motor": "2500W Brushless Motor",
      "Top Speed": "55 KM/H",
      "Max Range": "55-60 KM",
      "Battery": "48V 20Ah Lithium",
      "Charging Time (hrs)": "5-6 H",
      "Brakes": "Front & Rear Disc",
      "Tyres": "18/14 Off-Road",
      "Shocks": "Front Telescopic & Rear Spring",
      "Dimensions (L×W×H)": "1880 × 740 × 1120 MM",
      "Wheel Base": "1240 MM",
      "Ground Clearance": "175 MM",
      "Dry Weight": "54 KG",
      "Controllers": "Standard Controller",
      "Electricity Consumption": "2.2 Units/KWH Per Charge",
    },
    highlights: [
      { title: "Lightweight Trail Bike",   description: "A compact electric dirt bike perfect for beginners and young riders." },
      { title: "Efficient Power System",   description: "2500W motor balances power and battery efficiency for longer rides." },
      { title: "Smooth Suspension",        description: "Front and rear suspension system absorbs shocks on rough terrain." },
    ],
    features: [
      { tag: "CLEAR DISPLAY | SIMPLE CONTROLS", title: "Minimalist LED Panel",   description: "Shows speed, battery level, and riding mode clearly.",                       image: "/products/veltdrt-e8/features/display.jpg", imagePosition: "right" },
      { tag: "LONG LIFE | REMOVABLE",           title: "Quick Swap Battery",      description: "Removable battery makes charging convenient at home or garage.",            image: "/products/veltdrt-e8/features/battery.jpg", imagePosition: "left"  },
      { tag: "TRAIL READY",                     title: "Durable Off-Road Tires",  description: "Strong tires designed for dirt trails and rugged terrain.",                 image: "/products/veltdrt-e8/features/tires.jpg",   imagePosition: "right" },
    ],
  },
  {
    id: "veltdrt-e15",
    name: "VELT DRT E15",
    tagline: "Built for Extreme Terrain",
    heroSub: "NO LIMITS. FULL POWER.",
    category: "electric dirt bike",
    price: 2199,
    heroImage: "https://sur-ron.co.uk/wp-content/uploads/2026/01/EmptyName-1533-scaled-e1768314447471-1.png",
    bgDark: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=85",
    bgLight: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=85",
    thumbnail: "/products/veltdrt-e15/thumbnail.jpg",
    heroStats: [
      { label: "Top Speed", value: "80 KM/H", icon: "speed" },
      { label: "Range",     value: "80 KM",   icon: "range" },
      { label: "Battery",   value: "72V 35Ah", icon: "capacity" },
    ],
    colors: [
      { name: "Matte Army Green", hex: "#3b4a32", images: ["/products/veltdrt-e15/gallery/g1.jpg",  "/products/veltdrt-e15/gallery/g2.jpg",  "/products/veltdrt-e15/gallery/g3.jpg"]  },
      { name: "Storm Gray",       hex: "#666666", images: ["/products/veltdrt-e15/gallery/gr1.jpg", "/products/veltdrt-e15/gallery/gr2.jpg", "/products/veltdrt-e15/gallery/gr3.jpg"] },
    ],
    specs: {
      "Motor": "5000W Brushless Motor",
      "Top Speed": "80 KM/H",
      "Max Range": "80 KM",
      "Battery": "72V 35Ah Lithium",
      "Charging Time (hrs)": "7 H",
      "Brakes": "Hydraulic Disc",
      "Tyres": "21/18 Off-Road",
      "Shocks": "Front Telescopic & Rear Hydraulic",
      "Dimensions (L×W×H)": "1980 × 780 × 1180 MM",
      "Wheel Base": "1340 MM",
      "Ground Clearance": "220 MM",
      "Dry Weight": "68 KG",
      "Controllers": "Advanced Vector Controller",
      "Electricity Consumption": "3.36 Units/KWH Per Charge",
    },
    highlights: [
      { title: "Extreme Power Motor",    description: "5000W motor built for high torque and aggressive off-road riding." },
      { title: "Large Capacity Battery", description: "High capacity lithium battery for extended adventures." },
      { title: "Reinforced Frame",       description: "Heavy-duty frame designed for demanding trails." },
    ],
    features: [
      { tag: "ADVANCED DISPLAY", title: "Digital Ride Computer",    description: "Advanced display showing all riding metrics clearly.",            image: "/products/veltdrt-e15/features/display.jpg", imagePosition: "right" },
      { tag: "LONG RANGE",       title: "High Capacity Battery",    description: "Ride longer with powerful lithium battery technology.",           image: "/products/veltdrt-e15/features/battery.jpg", imagePosition: "left"  },
      { tag: "EXTREME GRIP",     title: "Pro Off-Road Tires",       description: "Aggressive tread pattern for maximum traction.",                 image: "/products/veltdrt-e15/features/tires.jpg",   imagePosition: "right" },
    ],
  },
];

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

  // Group by category (preserving original casing for display via toTitleCase)
  const grouped = PRODUCTS.reduce((acc, p) => {
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

  const totalResults = filteredGroups.reduce((n, g) => n + g.products.length, 0);

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