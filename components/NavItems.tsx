"use client";
import { useState } from "react";
import { CATEGORIES } from "@/utils/Categories";
import NavItem from "./NavItem";

const NavItems = () => {
  const [activeCategory, setActiveCategory] = useState<null | number>(null);

  const isAnyActive = activeCategory !== null;

  return (
    <div className="flex gap-4 h-full">
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
