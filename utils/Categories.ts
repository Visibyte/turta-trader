type CategoryProps = {
  label: string;
  value: string;
  href: string;
}[];

export const CATEGORIES: CategoryProps = [
  {
    label: "Category 1",
    value: "category-1" as const,
    href: "#",
  },
  {
    label: "Category 2",
    value: "category-2" as const,
    href: "#",
  },
  {
    label: "Category 3",
    value: "category-3" as const,
    href: "#",
  },
];
