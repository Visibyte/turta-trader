"use client";
import { useState } from "react";
import { CATEGORIES } from "@/utils/Categories";
import NavItem from "./NavItem";

const NavItems = () => {
  const [activeCategory, setActiveCategory] = useState<null | number>(null);
  return (
    <div className="flex gap-4 h-full">
      {CATEGORIES.map((category, index) => {
        const handleOpen = () => {
          activeCategory === index
            ? setActiveCategory(null)
            : setActiveCategory(index);
        };

        const isActiveCategory = activeCategory;

        return <NavItem />;
      })}
    </div>
  );
};

export default NavItems;
