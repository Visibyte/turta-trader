"use client";
import { CATEGORIES } from "@/utils/Categories";
import { Button } from "./ui/button";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type Category = (typeof CATEGORIES)[number];

interface NavItemProps {
  category: Category;
  handleActive: () => void;
  isActive: boolean;
  isAnyActive: boolean;
}

const NavItem = ({
  category,
  handleActive,
  isActive,
  isAnyActive,
}: NavItemProps) => {
  return (
    <div className="flex">
      <div className="relative flex items-center">
        <Button
          className="gap-1.5"
          onClick={handleActive}
          variant={isActive ? "secondary" : "ghost"}
        >
          {category.label}
          <ChevronDown
            className={cn("h-4 w-4 transition-all text-muted-foreground", {
              "-rotate-180": isActive,
            })}
          />
        </Button>
      </div>
    </div>
  );
};

export default NavItem;
