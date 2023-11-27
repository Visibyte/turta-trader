"use client";
import { CATEGORIES } from "@/utils/Categories";
import { Button } from "./ui/button";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

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
      {isActive ? (
        <div
          className={cn(
            "absolute inset-x-0 top-full text-sm text-muted-foreground",
            {
              "animate-in fade-in-10 slide-in-fro-top-5": !isAnyActive,
            }
          )}
        >
          <div
            className="absolute inset-0 top-1/2 bg-white shadow"
            aria-hidden="true"
          />
          <div className="relative bg-white">
            <div className="mx-auto max-w-7xl px-8">
              <div className="grid grid-cols-4 gap-x-8 gap-y-10 py-16">
                <div className="col-span-4 col-start-1 grid grid-cols-3 gap-x-8">
                  {category.featured.map((item) => (
                    <div
                      key={item.name}
                      className="group relative text-base sm:text-sm"
                    >
                      <Link href={item.href}>
                        <div className="relative aspect-video overflow-hidden rounded-md group-hover:opacity-75">
                          <Image
                            src={item.imageSrc}
                            fill
                            alt={item.name}
                            className="object-cover object-center"
                          />
                        </div>
                        <span className="mt-6 flex items-center text-base font-medium text-slate-900">
                          {item.name}
                          <ChevronRight className="text-muted-foreground w-4 h-4 mb-0.5" />
                        </span>
                        <p className="mt-1" aria-hidden="true">
                          Shop {item.name} {item.tag}
                        </p>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default NavItem;
