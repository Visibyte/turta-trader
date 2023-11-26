import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <MaxWidthWrapper>
      <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
        <h1 className="text-4xl font-bold tracking-wide text-gray-800">
          Lorem ipsum dolor sit amet consectetur{" "}
          <span className="text-emerald-600">Turtle?</span>
        </h1>
        <p className="mt-6 text-lg max-w-prose text-muted-foreground">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium,
          a? Nobis, facilis omnis tempora esse nesciunt tempore obcaecati
          dolorum laboriosam! Illum ratione alias quam nostrum suscipit quae
          pariatur quaerat nulla!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <Link href="/products">
            <Button>Browse Assets</Button>
          </Link>
          <Link href="/quality-guarantee">
            <Button variant="ghost">
              Our Quality Guarantee
              <MoveRight className="w-4 h-4 ml-2 text-muted-foreground" />
            </Button>
          </Link>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
