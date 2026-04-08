// ProductsCarousel.jsx
// Usage in Home.jsx:
//   import ProductsCarousel from "../Components/ProductsCarousel";
//   import products from "../../public/products.json";
//   <ProductsCarousel products={products} />

import CarouselBase from "./CarouselBase";
import ProductCard  from "./ProductCard";

export default function ProductsCarousel({ products }) {
  return (
    <CarouselBase
      title="Our Bikes"
      linkTo="/products"
      linkLabel="View All Bikes"
      items={products}
      renderCard={(product) => <ProductCard product={product} />}
    />
  );
}