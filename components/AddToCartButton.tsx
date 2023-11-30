"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useCart } from "@/hooks/useCart";
import type { Product } from "@/payload-types";

const AddToCartButton = ({ product }: { product: Product }) => {
  const { addItem } = useCart();

  const [isSuccessful, setIsSuccessful] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSuccessful(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [isSuccessful]);

  return (
    <Button
      onClick={() => {
        addItem(product);
        setIsSuccessful(true);
      }}
      size="lg"
      className="w-full"
    >
      {isSuccessful ? "Added to cart!" : "Add to cart"}
    </Button>
  );
};

export default AddToCartButton;
