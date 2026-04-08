import React, { useState, useEffect } from "react";
import ComparisonHero from "../Components/ComparisonHero";
import ComparisonGrid from "../Components/ComparisonGrid";

export default function Comparison() {
  const [bikes, setBikes] = useState([]);

  useEffect(() => {
    fetch("/products.json")
      .then((res) => res.json())
      .then((data) => setBikes(data))
      .catch((err) => console.error("Error loading bikes:", err));
  }, []);

  return (
    <div style={{ background: "var(--bg-primary)" }}>
      <ComparisonHero />
      <ComparisonGrid bikes={bikes} />
    </div>
  );
}