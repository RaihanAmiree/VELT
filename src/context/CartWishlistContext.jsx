/**
 * CartWishlistContext.jsx
 *
 * Provides global cart + wishlist state and all actions.
 * Wrap your app root with <CartWishlistProvider>.
 *
 * Cart item shape:   { ...productFields, qty: number }
 * Wishlist item shape: { ...productFields }
 */

import { createContext, useCallback, useState, useEffect } from "react";

export const CartWishlistContext = createContext(null);

export function CartWishlistProvider({ children }) {

  // ✅ Load from localStorage on first render
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem("wishlist");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [toasts, setToasts] = useState([]); // [{ id, message, kind }]

  // ✅ Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // ── Toast helpers ─────────────────────────────────────────
  const pushToast = useCallback((message, kind = "cart") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, kind }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // ── Cart actions ──────────────────────────────────────────
  const addToCart = useCallback((item) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.id === item.id);
      if (exists) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
    pushToast(`${item.name} added to cart`, "cart");
  }, [pushToast]);

  const removeFromCart = useCallback((id) => {
    setCart((prev) => {
      const item = prev.find((i) => i.id === id);
      if (item) pushToast(`${item.name} removed from cart`, "remove");
      return prev.filter((i) => i.id !== id);
    });
  }, [pushToast]);

  const updateQty = useCallback((id, qty) => {
    if (qty < 1) return;
    setCart((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty } : i))
    );
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
    pushToast("Cart cleared", "remove");
  }, [pushToast]);

  const isInCart = useCallback(
    (id) => cart.some((i) => i.id === id),
    [cart]
  );

  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  const cartTotal = cart.reduce((sum, i) => {
    const num = parseFloat(String(i.price).replace(/[^0-9.]/g, ""));
    return sum + (isNaN(num) ? 0 : num * i.qty);
  }, 0);

  // ── Wishlist actions ──────────────────────────────────────
  const addToWishlist = useCallback((item) => {
    setWishlist((prev) => {
      if (prev.find((i) => i.id === item.id)) return prev;
      pushToast(`${item.name} added to wishlist`, "wishlist");
      return [...prev, item];
    });
  }, [pushToast]);

  const removeFromWishlist = useCallback((id) => {
    setWishlist((prev) => {
      const item = prev.find((i) => i.id === id);
      if (item) pushToast(`${item.name} removed from wishlist`, "remove");
      return prev.filter((i) => i.id !== id);
    });
  }, [pushToast]);

  const toggleWishlist = useCallback((item) => {
    setWishlist((prev) => {
      const exists = prev.find((i) => i.id === item.id);
      if (exists) {
        pushToast(`${item.name} removed from wishlist`, "remove");
        return prev.filter((i) => i.id !== item.id);
      }
      pushToast(`${item.name} added to wishlist`, "wishlist");
      return [...prev, item];
    });
  }, [pushToast]);

  const clearWishlist = useCallback(() => {
    setWishlist([]);
    pushToast("Wishlist cleared", "remove");
  }, [pushToast]);

  const isInWishlist = useCallback(
    (id) => wishlist.some((i) => i.id === id),
    [wishlist]
  );

  // ── Move wishlist → cart ──────────────────────────────────
  const moveToCart = useCallback((id) => {
    setWishlist((prev) => {
      const item = prev.find((i) => i.id === id);
      if (item) {
        setCart((cartPrev) => {
          const exists = cartPrev.find((i) => i.id === id);
          if (exists) {
            return cartPrev.map((i) =>
              i.id === id ? { ...i, qty: i.qty + 1 } : i
            );
          }
          return [...cartPrev, { ...item, qty: 1 }];
        });
        pushToast(`${item.name} moved to cart`, "cart");
      }
      return prev.filter((i) => i.id !== id);
    });
  }, [pushToast]);

  return (
    <CartWishlistContext.Provider
      value={{
        // state
        cart,
        wishlist,
        toasts,
        cartCount,
        cartTotal,
        wishlistCount: wishlist.length,

        // cart
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        isInCart,

        // wishlist
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        clearWishlist,
        isInWishlist,

        // cross
        moveToCart,

        // toast
        dismissToast,
      }}
    >
      {children}
    </CartWishlistContext.Provider>
  );
}