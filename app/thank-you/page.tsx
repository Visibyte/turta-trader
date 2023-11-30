import PaymentStatus from "@/components/PaymentStatus";
import { getPayloadClient } from "@/get-payload-client";
import { getServerSideUser } from "@/lib/payload-utils";
import { formatPrice } from "@/lib/utils";
import { Product, ProductFile, User } from "@/payload-types";
import { CATEGORIES } from "@/utils/Categories";
import { CheckCircle } from "lucide-react";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function ThankYouPage({ searchParams }: PageProps) {
  const orderId = searchParams.orderId;
  const nextCookies = cookies();

  const { user } = await getServerSideUser(nextCookies);
  const payload = await getPayloadClient();

  const { docs: orders } = await payload.find({
    collection: "orders",
    depth: 2,
    where: {
      id: {
        equals: orderId,
      },
    },
  });

  const [order] = orders;

  if (!order) return notFound();

  const orderUserId =
    typeof order.user === "string" ? order.user : order.user.id;

  if (orderUserId !== user?.id) {
    return redirect(`/sign-in?origin=thank-you?orderId=${orderId}`);
  }

  const products = order.products as Product[];

  const totalPrice = products.reduce(
    (total, product) => total + product.price,
    0
  );

  return (
    <main className="relative lg:min-h-full">
      <div className="hidden lg:block h-80 overflow-hidden lg:absolute lg:h-full lg:w-1/2 lg:pr-4 xl:pr-12">
        <Image
          fill
          src="/thank-you.jpg"
          alt="Thank you image"
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div>
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-32 xl:gap-x-24">
          <div className="lg:col-start-2">
            <div className="flex items-center mb-2">
              <div className="h-16 w-16 flex items-center mr-4 justify-center rounded-full bg-emerald-100 text-emerald-900">
                <CheckCircle className="w-1/2 h-1/2" />
              </div>
              <h1 className="text-4xl sm:text-5xl font-medium text-emerald-600 inline-block">
                Order Successful
              </h1>
            </div>
            <p className="text-base text-slate-900">
              Thanks for shopping with Turta Trader!
            </p>
            {order._isPaid ? (
              <p className="mt-2 text-base text-muted-foreground">
                Your order was processed successfully and your assets are
                available to download below. We&apos;ve sent a receipt to{" "}
                {typeof order.user !== "string" ? (
                  <span className="font-medium text-slate-900">
                    {order.user.email}
                  </span>
                ) : null}
                .
              </p>
            ) : (
              <p className="mt-2 text-base text-muted-foreground">
                Thanks for your order, we are currently processing it. Please
                hang on and we will email you confirmation to your email soon.
              </p>
            )}
            <div className="mt-16 text-sm font-medium">
              <div className="text-muted-foreground">Order number</div>
              <div className="mt-2 text-slate-900">{order.id}</div>
            </div>
            <ul className="mt-6 divide-y divide-slate-200 border-t border-slate-200 text-sm">
              {(order.products as Product[]).map((product) => {
                const label = CATEGORIES.find(
                  ({ value }) => value === product.category
                )?.label;

                const downloadUrl = (product.product_files as ProductFile)
                  .url as string;

                const { image } = product.images[0];

                return (
                  <li key={product.id} className="flex space-x-6 py-6">
                    <div className="relative w-24 h-24">
                      {typeof image !== "string" && image.url ? (
                        <Image
                          fill
                          src={image.url}
                          alt={product.name}
                          className="flex-none rounded-md bg-slate-100 object-cover object-center"
                        />
                      ) : null}
                    </div>
                    <div className="flex-auto flex flex-col justify-between">
                      <div className="space-y-1">
                        <h3 className="text-slate-900 text-lg">
                          {product.name}
                        </h3>
                        <p className="my-1 text-muted-foreground text-xs">
                          Category: {label}
                        </p>
                      </div>

                      {order._isPaid ? (
                        <a
                          href={downloadUrl}
                          download={product.name}
                          className="text-emerald-600 hover:underline underline-offset-2"
                        >
                          Download {product.name}
                        </a>
                      ) : null}
                    </div>
                    <p className="flex-none font-medium text-slate-900">
                      {formatPrice(product.price)}
                    </p>
                  </li>
                );
              })}
            </ul>
            <div className="space-y-6 border-t border-slate-200 pt-6 text-sm font-medium text-muted-foreground">
              <div className="flex justify-between">
                <p>Subtotal</p>
                <p className="text-slate-900">{formatPrice(totalPrice)}</p>
              </div>
              <div className="flex justify-between">
                <p>Transaction Fee</p>
                <p className="text-slate-900">{formatPrice(1)}</p>
              </div>
              <div className="flex items-center justify-between border-t border-slate-200 pt-6 text-slate-900">
                <p className="text-base">Total</p>
                <p className="text-base">{formatPrice(totalPrice + 1)}</p>
              </div>
            </div>

            <PaymentStatus
              isPaid={order._isPaid}
              orderEmail={(order.user as User).email}
              orderId={order.id}
            />

            <div className="mt-16 border-t border-slate-200 py-6 text-right">
              <Link
                href="/products"
                className="text-sm font-medium text-emerald-600 hover:text-emerald-500"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
