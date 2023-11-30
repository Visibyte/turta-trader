"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";

const AddToCartButton = () => {
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
