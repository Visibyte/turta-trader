"use client";

import { ShoppingBag } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Separator } from "./ui/separator";
import { formatPrice } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import Link from "next/link";
import Image from "next/image";

const Cart = () => {
  const itemCount = 0;
  const transactionFee = 1;
  return (
    <Sheet>
      <SheetTrigger className="group -m-2 flex items-center p-2">
        <ShoppingBag
          aria-hidden="true"
          className="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
        />
        <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
          0
        </span>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col pr-0 s:max-w-lg">
        <SheetHeader className="space-y-2.5 pr-6">
          <SheetTitle>Cart (0)</SheetTitle>
        </SheetHeader>
        {itemCount > 0 ? (
          <>
            <div className="flex w-full flex-col pr-6">
              Cart items will go here
            </div>
            <div className="space-y-4 pr-6">
              <Separator />
              <div className="space-y-2 text-sm">
                <div className="flex">
                  <span className="flex-1">Delivery Time</span>
                  <span>Instant</span>
                </div>
                <div className="flex">
                  <span className="flex-1">Transaction Fee</span>
                  <span>{formatPrice(transactionFee)}</span>
                </div>
                <div className="flex">
                  <span className="flex-1">Cart Total</span>
                  <span>{formatPrice(transactionFee)}</span>
                </div>
              </div>
              <SheetFooter>
                <SheetTrigger asChild>
                  <Link
                    href="/cart"
                    className={buttonVariants({
                      className: "w-full",
                    })}
                  >
                    Continue to Checkout
                  </Link>
                </SheetTrigger>
              </SheetFooter>
            </div>
          </>
        ) : (
          <div className="flex h-full flex-col justify-center items-center space-y-1">
            <div
              aria-hidden="true"
              className="flex flex-col relative mb-4 h-60 w-60 text-muted-foreground text-center"
            >
              <Image
                src="/logo.png"
                width={175}
                height={175}
                alt="Cart empty"
                className="self-center justify-self-center"
              />
              <span className="mt-4 text-base">
                Nothing here yet, try adding something to your cart!
              </span>
            </div>
            <SheetTrigger asChild>
              <Link
                href="/products"
                className={buttonVariants({
                  variant: "link",
                  size: "sm",
                  className: "text-sm text-muted-foreground",
                })}
              >
                Continue Shopping
              </Link>
            </SheetTrigger>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
