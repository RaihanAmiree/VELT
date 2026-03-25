/**
 * useCartWishlist.js
 * Convenience hook — throws if used outside CartWishlistProvider.
 */

import { useContext } from "react";
import { CartWishlistContext } from "../context/CartWishlistContext";

export function useCartWishlist() {
  const ctx = useContext(CartWishlistContext);
  if (!ctx) throw new Error("useCartWishlist must be used inside <CartWishlistProvider>");
  return ctx;
}