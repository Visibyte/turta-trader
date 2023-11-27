"use client";

import { trpc } from "@/trpc/client";
import { CheckCircle, Loader2, XCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

interface VerifyEmailProps {
  token: string;
}

const VerifyEmail = ({ token }: VerifyEmailProps) => {
  const { data, isLoading, isError } = trpc.auth.validateEmail.useQuery({
    token,
  });

  if (isError) {
    return (
      <div className="flex flex-col items-center gap-2">
        <XCircle className="h-8 w-8 text-red-500" />
        <h3 className="font-semibold text-xl">
          Whoops... Something went wrong!
        </h3>
        <p className="text-muted-foreground text-center mt-1">
          This verification token is likely invalid or expired. Please try
          signing up again.
        </p>
        <Link href="/sign-up" className={buttonVariants({ className: "mt-4" })}>
          Retry
        </Link>
      </div>
    );
  }

  if (data?.success) {
    return (
      <div className="flex flex-col items-center gap-2">
        <CheckCircle className="h-8 w-8 text-emerald-500" />
        <h3 className="font-semibold text-xl">You&apos;re verified!</h3>
        <p className="text-muted-foreground text-center mt-1">
          Thanks for validating your email!
        </p>
        <Link href="/sign-in" className={buttonVariants({ className: "mt-4" })}>
          Sign In
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="animate-spin h-8 w-8 text-zinc-300" />
        <h3 className="font-semibold text-xl">Verifying...</h3>
        <p className="text-muted-foreground text-center mt-1">
          Hang tight! We&apos;re validating your email.
        </p>
      </div>
    );
  }
};

export default VerifyEmail;
