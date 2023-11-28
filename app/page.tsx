import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductReel from "@/components/ProductReel";
import { Button } from "@/components/ui/button";
import { FEATURES } from "@/utils/Features";
import { MoveRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <>
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
        <ProductReel
          query={{ sort: "desc", limit: 4 }}
          title="Trending"
          subtitle="Subtitle"
          href="products"
        />
      </MaxWidthWrapper>
      <section className="border-t border-slate-200 bg-slate-50">
        <MaxWidthWrapper className="py-20">
          <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0">
            {FEATURES.map((feature) => (
              <div
                key={feature.name}
                className="text-center md:flex md:items-start md:text-left lg:block lg:text-center"
              >
                <div className="md:flex-shrink-0 flex justify-center">
                  <div className="h-16 w-16 flex items-center justify-center rounded-full bg-emerald-100 text-emerald-900">
                    <feature.Icon className="w-1/3 h-1/3" />
                  </div>
                </div>
                <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
                  <h3 className="font-medium text-lg text-slate-900">
                    {feature.name}
                  </h3>
                  <p className="mt-3 max-w-prose text-base text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  );
}
