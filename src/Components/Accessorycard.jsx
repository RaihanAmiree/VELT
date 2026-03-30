import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../ThemeContext";
import { useCartWishlist } from "../hooks/useCartWishlist";

export default function AccessoryCard({ item }) {
  const { dark } = useTheme();
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  const [imgErr, setImgErr] = useState(false);

  const {
    addToCart,
    removeFromCart,
    isInCart,
    toggleWishlist,
    isInWishlist,
  } = useCartWishlist();

  const inCart = isInCart(item.id);
  const inWishlist = isInWishlist(item.id);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@300;400;600;700&display=swap');

        .ac-card {
          width: 100%;
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;
          position: relative;
          display: flex;
          flex-direction: column;
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1),
                      box-shadow 0.35s ease,
                      border-color 0.3s ease;
        }
        .ac-card:hover {
          transform: translateY(-8px) scale(1.01);
        }

        .ac-img-wrap {
          position: relative;
          height: 200px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .ac-img {
          width: 85%;
          height: 100%;
          object-fit: contain;
          position: relative; z-index: 1;
          transition: transform 0.55s cubic-bezier(0.22,1,0.36,1);
        }
        .ac-card:hover .ac-img {
          transform: scale(1.08) translateY(-5px);
        }

        .ac-glow {
          position: absolute;
          bottom: -10px; left: 50%;
          transform: translateX(-50%);
          width: 65%; height: 45%;
          border-radius: 50%;
          filter: blur(22px);
          pointer-events: none; z-index: 0;
          background: radial-gradient(ellipse, rgba(255,90,31,0.16) 0%, transparent 70%);
          transition: opacity 0.35s ease;
        }

        .ac-type-badge {
          position: absolute;
          top: 14px; left: 14px; z-index: 2;
          font-family: 'Barlow', sans-serif;
          font-size: 0.57rem; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase;
          padding: 4px 10px; border-radius: 2px;
          color: #FF5A1F;
          border: 1px solid rgba(255,90,31,0.25);
          background: rgba(255,90,31,0.08);
          backdrop-filter: blur(6px);
        }

        .ac-new-badge {
          position: absolute;
          top: 14px; right: 14px; z-index: 2;
          font-family: 'Barlow', sans-serif;
          font-size: 0.57rem; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase;
          padding: 4px 9px; border-radius: 2px;
          backdrop-filter: blur(6px);
        }

        .ac-body {
          padding: 18px 20px 20px;
          display: flex; flex-direction: column;
          gap: 9px; flex: 1;
        }

        .ac-name {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(1.45rem, 2.5vw, 1.85rem);
          letter-spacing: 0.04em; line-height: 1;
          margin: 0; transition: color 0.3s;
        }

        .ac-tagline {
          font-family: 'Barlow', sans-serif;
          font-size: 0.7rem; font-weight: 400;
          letter-spacing: 0.07em; line-height: 1.5;
          margin: 0; transition: color 0.3s;
        }

        .ac-specs {
          display: flex; gap: 0;
          margin-top: 4px;
        }

        .ac-spec {
          flex: 1; display: flex; flex-direction: column;
          gap: 2px; padding: 9px 0;
          position: relative;
        }
        .ac-spec + .ac-spec {
          padding-left: 11px; margin-left: 11px;
        }

        .ac-spec-val {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.1rem; letter-spacing: 0.04em; line-height: 1;
          transition: color 0.3s;
        }
        .ac-spec-label {
          font-family: 'Barlow', sans-serif;
          font-size: 0.56rem; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase;
          transition: color 0.3s;
        }

        /* Price + CTA row */
        .ac-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 11px 16px;
          border-top: 1px solid;
          margin-top: auto;
          position: relative;
          overflow: hidden;
          transition: color 0.3s ease;
        }
        .ac-footer::before {
          content: '';
          position: absolute; inset: 0;
          background: #FF5A1F;
          transform: translateX(-101%);
          transition: transform 0.32s cubic-bezier(0.4,0,0.2,1);
        }
        .ac-card:hover .ac-footer::before { transform: translateX(0); }
        .ac-card:hover .ac-footer { color: #fff !important; }
        .ac-card:hover .ac-price { color: #fff !important; }
        .ac-card:hover .ac-cta-label { color: #fff !important; }
        .ac-card:hover .ac-arrow { background: rgba(255,255,255,0.18) !important; transform: translateX(4px); }

        .ac-price {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.5rem; letter-spacing: 0.04em;
          position: relative; z-index: 1;
          transition: color 0.3s;
        }

        .ac-cta {
          display: flex; align-items: center; gap: 8px;
          position: relative; z-index: 1;
        }
        .ac-cta-label {
          font-family: 'Barlow', sans-serif;
          font-size: 0.65rem; font-weight: 700;
          letter-spacing: 0.16em; text-transform: uppercase;
          transition: color 0.3s;
        }
        .ac-arrow {
          width: 28px; height: 28px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.25s ease;
          flex-shrink: 0;
        }
      `}</style>

      <div
        className="ac-card"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: dark ? "#16171A" : "#FFFFFF",
          border: `1px solid ${hovered
              ? "rgba(255,90,31,0.3)"
              : dark
                ? "rgba(194,197,204,0.07)"
                : "#D9D9DE"
            }`,
        }}
      >
        {/* IMAGE */}
        <div
          className="ac-img-wrap"
          style={{ background: dark ? "#0f1012" : "#F1F1F1" }}
        >
          <span className="ac-type-badge">{item.type}</span>

          {/* ❤️ Wishlist Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(item);
            }}
            style={{
              position: "absolute",
              top: 14,
              right: 50,
              zIndex: 3,

              width: 32,
              height: 32,
              borderRadius: "50%",

              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              border: "1px solid rgba(255,255,255,0.12)",
              background: inWishlist
                ? "rgba(224,68,90,0.2)"
                : "rgba(0,0,0,0.35)",

              color: "#fff",
              cursor: "pointer",
              padding: 0,
            }}
          >
            {inWishlist ? (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="#e0445a"
                stroke="#e0445a"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
      2 6 4 4 6.5 4c1.74 0 3.41 1.01 4.13 2.44h.74
      C11.09 5.01 12.76 4 14.5 4 17 4 19 6 19 8.5
      c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            ) : (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgba(255,255,255,0.9)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
      2 6 4 4 6.5 4c1.74 0 3.41 1.01 4.13 2.44h.74
      C11.09 5.01 12.76 4 14.5 4 17 4 19 6 19 8.5
      c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            )}
          </button>

          {/* 🛒 Cart Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              inCart ? removeFromCart(item.id) : addToCart(item);
            }}
            style={{
              position: "absolute",
              top: 14,
              right: 14,
              zIndex: 3,

              width: 32,
              height: 32,
              borderRadius: "50%",

              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              border: "1px solid rgba(255,255,255,0.12)",
              background: inCart
                ? "rgba(255,90,31,0.18)"
                : "rgba(0,0,0,0.35)",

              color: "#fff",
              cursor: "pointer",
              padding: 0,
            }}
          >
            {inCart ? (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#FF5A1F"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgba(255,255,255,0.9)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
            )}
          </button>

          <div className="ac-glow" style={{ opacity: hovered ? 1 : 0.35 }} />

          {!imgErr ? (
            <img
              src={item.image}
              alt={item.name}
              className="ac-img"
              onError={() => setImgErr(true)}
            />
          ) : (
            <div style={{ opacity: 0.15 }}>No Image</div>
          )}
        </div>

        {/* BODY */}
        <div className="ac-body">
          <h3
            className="ac-name"
            style={{ color: dark ? "#C2C5CC" : "#111111" }}
          >
            {item.name}
          </h3>

          <p
            className="ac-tagline"
            style={{ color: dark ? "#7A7F87" : "#6E6E73" }}
          >
            {item.tagline}
          </p>

          {/* PRICE ONLY (CTA removed) */}
          <div
            className="ac-footer"
            style={{
              justifyContent: "flex-start",
              borderColor: dark
                ? "rgba(194,197,204,0.07)"
                : "#D9D9DE",
              background: dark
                ? "rgba(194,197,204,0.03)"
                : "#F9F9F9",
            }}
          >
            <span
              className="ac-price"
              style={{ color: dark ? "#C2C5CC" : "#111111" }}
            >
              {item.price}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}