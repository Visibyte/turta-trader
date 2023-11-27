"use client";
import { useEffect, useRef, useState } from "react";
import { CATEGORIES } from "@/utils/Categories";
import NavItem from "./NavItem";
import { useOnClickOutside } from "@/hooks/UseOnClickOutside";

const NavItems = () => {
  const [activeCategory, setActiveCategory] = useState<null | number>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      e.key === "Escape" && setActiveCategory(null);
    };

    document.addEventListener("keydown", handler);

    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, []);

  const isAnyActive = activeCategory !== null;

  const navRef = useRef<HTMLDivElement | null>(null);

  useOnClickOutside(navRef, () => setActiveCategory(null));

  return (
    <div className="flex gap-4 h-full" ref={navRef}>
      {CATEGORIES.map((category, index) => {
        const handleActive = () => {
          activeCategory === index
            ? setActiveCategory(null)
            : setActiveCategory(index);
        };

        const isActive = index === activeCategory;

        return (
          <NavItem
            category={category}
            handleActive={handleActive}
            isActive={isActive}
            key={category.value}
            isAnyActive={isAnyActive}
          />
        );
      })}
    </div>
  );
};

export default NavItems;
