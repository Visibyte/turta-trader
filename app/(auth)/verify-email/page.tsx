import Image from "next/image";

interface SearchParamsProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

export default function VerifyEmailPage({ searchParams }: SearchParamsProps) {
  const token = searchParams.token;
  const toEmail = searchParams.to;

  return (
    <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
      <div className="mx-auto w-full flex-col justify-center space-y-6 sm:w[350px]">
        {token && typeof token === "string" ? (
          <div className="grid gap-6">
            <VerifyEmail />
          </div>
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-1">
            <div className="relative mb-4 h-60 w-60 text-muted-foreground">
              <Image src="/email.png" fill alt="Email verification sent" />
            </div>
            <h2 className="text-2xl font-semibold">Check your email!</h2>
            {toEmail ? (
              <p className="text-muted-foreground text-center">
                We&apos;ve sent a verification email to{" "}
                <span className="font-bold">{toEmail}</span>.
              </p>
            ) : (
              <p className="text-muted-foreground text-center">
                We&apos;ve sent a verification email to your email address.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
