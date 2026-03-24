import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ProductTable from "../Components/Producttable";
import ProductDetailHero from "../Components/Productdetailhero";
import ScrollBikeStats from "../Components/Scrollbikestats";
import FeatureDetail from "../Components/FeatureDetail";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/products.json")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((p) => p.id === id);
        setProduct(found || null);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch products.json:", err);
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>No product found for id: {id}</div>;

  return (
    <>
      <ProductDetailHero product={product} />
      <ScrollBikeStats product={product} />
      <ProductTable product={product} />

      {/* ✅ Feature Section */}
      {product.features && product.features.length > 0 && (
        <FeatureDetail features={product.features} />
      )}
    </>
  );
}