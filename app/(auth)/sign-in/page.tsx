"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TAuthCredentialsValidator,
  AuthCredentialsValidator,
} from "@/lib/validators/auth-credentials";
import { trpc } from "@/trpc/client";
import { toast } from "sonner";
import { ZodError } from "zod";
import { useRouter, useSearchParams } from "next/navigation";

export default function SignInPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const isSeller = searchParams.get("type") === "seller";
  const origin = searchParams.get("origin");

  const continueAsSeller = () => {
    router.push("?type=seller");
  };

  const continueAsCustomer = () => {
    router.replace("/sign-in", undefined);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthCredentialsValidator>({
    resolver: zodResolver(AuthCredentialsValidator),
  });

  const { mutate, isLoading } = trpc.auth.signIn.useMutation({
    onSuccess: () => {
      toast.success("Signed in successfully");

      router.refresh();

      if (origin) {
        router.push(`/${origin}`);
        return;
      }

      if (isSeller) {
        router.push("/sell");
        return;
      }

      router.push("/");
    },
    onError: (err) => {
      if (err.data?.code === "UNAUTHORIZED") {
        toast.error("Invalid email or password");
      }
    },
  });

  const onSubmit = ({ email, password }: TAuthCredentialsValidator) => {
    mutate({ email, password });
  };

  return (
    <>
      <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col items-center space-y-2 text-center">
            <Image src="/auth.png" width={150} height={150} alt="Logo" />
            <h1 className="text-2xl font-bold">
              Sign in to your {isSeller ? "seller account" : "account"}
            </h1>
            <Link
              className={buttonVariants({
                variant: "link",
                className: "gap-1.5",
              })}
              href="/sign-up"
            >
              Don&apos;t have an account? Sign Up
              <ArrowRight className="w-4 h-4 mb-0.5" />
            </Link>
          </div>
          <div className="grid gap-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-2">
                <div className="grid gap-1 py-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    {...register("email")}
                    className={cn({
                      "focus-visible:ring-red-500": errors.email,
                    })}
                    placeholder="Email@example.com"
                  />
                  {errors?.email && (
                    <p className="text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-1 py-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    {...register("password")}
                    className={cn({
                      "focus-visible:ring-red-500": errors.password,
                    })}
                    placeholder="Password"
                    type="password"
                  />
                  {errors?.password && (
                    <p className="text-sm text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <Button>Sign In</Button>
                <p
                  className={buttonVariants({
                    variant: "link",
                    className: "mt-1",
                  })}
                >
                  Forgotten password?
                </p>
              </div>
            </form>
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute inset-0 flex items-center"
              >
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or
                </span>
              </div>
            </div>
            {isSeller ? (
              <Button
                variant="secondary"
                onClick={continueAsCustomer}
                disabled={isLoading}
              >
                Continue as customer
              </Button>
            ) : (
              <Button
                variant="secondary"
                onClick={continueAsSeller}
                disabled={isLoading}
              >
                Continue as seller
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
