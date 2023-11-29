"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Product } from "@/payload-types";
import ProductPlaceholder from "./ProductPlaceholder";
import { cn, formatPrice } from "@/lib/utils";
import { CATEGORIES } from "@/utils/Categories";
import ImageSlider from "./ImageSlider";

interface ProductListingProps {
  product: Product | null;
  index: number;
}

const ProductListing = ({ product, index }: ProductListingProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const label = CATEGORIES.find(
    ({ value }) => value === product?.category
  )?.label;

  const urls = product?.images
    .map(({ image }) => (typeof image === "string" ? image : image.url))
    .filter(Boolean) as string[];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 60);

    return () => clearTimeout(timer);
  }, [index]);

  if (!product || !isVisible) return <ProductPlaceholder />;

  if (isVisible && product) {
    return (
      <Link
        href={`/product/${product.id}`}
        className={cn("invisible h-full w-full cursor-pointer group/main", {
          "visible animate-in fade-in-5": isVisible,
        })}
      >
        <div className="flex flex-col w-full">
          <ImageSlider urls={urls} />
          <h3 className="mt-4 font-medium text-md text-slate-700">
            {product.name}
          </h3>
          <p className="mt-1 text-sm text-slate-500">{label}</p>
          <p className="mt-1 text-sm font-medium text-slate-900">
            {formatPrice(product.price)}
          </p>
        </div>
      </Link>
    );
  }
};

export default ProductListing;
