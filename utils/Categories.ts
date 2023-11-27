type CategoryProps = {
  label: string;
  value: string;
  href: string;
  featured: {
    name: string;
    href: string;
    imageSrc: string;
    tag: string;
  }[];
}[];

export const CATEGORIES: CategoryProps = [
  {
    label: "Images",
    value: "images" as const,
    href: "#",
    featured: [
      {
        name: "Wildlife",
        href: "#",
        imageSrc: "/wildlife.jpg",
        tag: "Photography",
      },
      {
        name: "Plants",
        href: "#",
        imageSrc: "/plants.jpg",
        tag: "Photography",
      },
      {
        name: "Buildings",
        href: "#",
        imageSrc: "/buildings.jpg",
        tag: "Photography",
      },
    ],
  },
  {
    label: "Category 2",
    value: "category-2" as const,
    href: "#",
    featured: [
      {
        name: "Subcategory 1",
        href: "#",
        imageSrc: "",
        tag: "Videos",
      },
    ],
  },
  {
    label: "Category 3",
    value: "category-3" as const,
    href: "#",
    featured: [
      {
        name: "Subcategory 1",
        href: "#",
        imageSrc: "",
        tag: "",
      },
    ],
  },
];
