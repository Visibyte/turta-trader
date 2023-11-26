import {
  ArrowDownToLine,
  CheckCircle,
  HelpCircle,
  LucideIcon,
} from "lucide-react";

type FeatureProps = {
  name: string;
  Icon: LucideIcon;
  description: string;
};

export const FEATURES: FeatureProps[] = [
  {
    name: "Instant Delivery",
    Icon: ArrowDownToLine,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime inventore totam quo.",
  },
  {
    name: "Quality Guaranteed",
    Icon: CheckCircle,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime inventore totam quo.",
  },
  {
    name: "24/7 Customer Support",
    Icon: HelpCircle,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime inventore totam quo.",
  },
];
