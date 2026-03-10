import { useState } from "react";
import { useTheme } from "../ThemeContext";
import ProductsHero from "../Components/ProductsHero";
import ProductsSearch from "../Components/ProductsSearch";
import ProductsCatalog from "../Components/ProductsCatalog";

export default function Products() {
  const [query, setQuery] = useState("");
  const { dark } = useTheme();

  return (
    <div style={{
      minHeight: "100vh",
      background: dark ? "#0B0B0C" : "#FAFAFA",
      transition: "background 0.5s ease",
    }}>
      <ProductsHero />
      <ProductsSearch query={query} setQuery={setQuery} />
      <ProductsCatalog query={query} />
    </div>
  );
}