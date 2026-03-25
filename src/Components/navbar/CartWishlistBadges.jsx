/**
 * CartWishlistBadges.jsx
 *
 * Drop-in badge snippet for your existing Navbar.
 *
 * Usage — just drop <CartWishlistBadges /> anywhere inside your Navbar JSX:
 *
 *   import CartWishlistBadges from "../components/navbar/CartWishlistBadges";
 *
 *   // inside your Navbar return:
 *   <nav>
 *     ...your existing nav items...
 *     <CartWishlistBadges />
 *   </nav>
 *
 * Clicking wishlist navigates to /wishlist, cart to /cart.
 * Uses react-router-dom's useNavigate — swap for your router's equivalent if different.
 */

import { useNavigate } from "react-router-dom";
import { useCartWishlist } from "../../hooks/useCartWishlist";
import { useTheme } from "../../ThemeContext";

export default function CartWishlistBadges() {
  const { cartCount, wishlistCount } = useCartWishlist();
  const { dark } = useTheme();
  const navigate = useNavigate();

  const iconColor  = dark ? "#C2C5CC" : "#111111";
  const badgeBg    = "#FF5A1F";
  const wishlistActiveBg = "#e0445a";

  return (
    <>
      <style>{`
        .cwb-btn {
          position: relative;
          display: flex; align-items: center; justify-content: center;
          width: 38px; height: 38px;
          border-radius: 6px;
          border: none;
          background: transparent;
          cursor: pointer;
          transition: background 0.2s ease;
        }
        .cwb-btn:hover {
          background: ${dark ? "rgba(194,197,204,0.07)" : "rgba(0,0,0,0.05)"};
        }
        .cwb-badge {
          position: absolute;
          top: 2px; right: 2px;
          min-width: 16px; height: 16px;
          border-radius: 8px;
          padding: 0 4px;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Barlow', sans-serif;
          font-size: 0.55rem; font-weight: 700;
          letter-spacing: 0.02em;
          color: #fff;
          pointer-events: none;
          line-height: 1;
        }
        @keyframes cwb-pop {
          0%   { transform: scale(1); }
          40%  { transform: scale(1.35); }
          100% { transform: scale(1); }
        }
        .cwb-badge-pop { animation: cwb-pop 0.3s ease; }
      `}</style>

      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        {/* Wishlist */}
        <button
          className="cwb-btn"
          onClick={() => navigate("/wishlist")}
          aria-label={`Wishlist (${wishlistCount} items)`}
          title="Wishlist"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill={wishlistCount > 0 ? "#e0445a" : "none"}
            stroke={wishlistCount > 0 ? "#e0445a" : iconColor}
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            style={{ transition: "fill 0.25s, stroke 0.25s" }}
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          {wishlistCount > 0 && (
            <span className="cwb-badge" style={{ background: wishlistActiveBg }}>
              {wishlistCount > 99 ? "99+" : wishlistCount}
            </span>
          )}
        </button>

        {/* Cart */}
        <button
          className="cwb-btn"
          onClick={() => navigate("/cart")}
          aria-label={`Cart (${cartCount} items)`}
          title="Cart"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke={cartCount > 0 ? "#FF5A1F" : iconColor}
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            style={{ transition: "stroke 0.25s" }}
          >
            <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          {cartCount > 0 && (
            <span className="cwb-badge" style={{ background: badgeBg }}>
              {cartCount > 99 ? "99+" : cartCount}
            </span>
          )}
        </button>
      </div>
    </>
  );
}