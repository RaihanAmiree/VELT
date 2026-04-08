// AccessoriesCarousel.jsx
// Works in two ways:
//   1. Pass data directly:  <AccessoriesCarousel accessories={data} />
//   2. No prop — fetches from /Accessories.json automatically (used in ProductDetailsPage)

import { useState, useEffect } from "react";
import CarouselBase  from "./CarouselBase";
import AccessoryCard from "./Accessorycard";

export default function AccessoriesCarousel({ accessories: propData }) {
  const [items, setItems] = useState(propData ?? null);

  useEffect(() => {
    // Only fetch if no data was passed as a prop
    if (propData) { setItems(propData); return; }
    fetch("/Accessories.json")
      .then((r) => r.json())
      .then(setItems)
      .catch((err) => console.error("AccessoriesCarousel: failed to load", err));
  }, [propData]);

  if (!items) return null; // loading — render nothing silently

  return (
    <CarouselBase
      title="Gear & Accessories"
      linkTo="/accessories"
      linkLabel="Shop Accessories"
      items={items}
      renderCard={(item) => <AccessoryCard item={item} />}
    />
  );
}