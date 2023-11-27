import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Image from "next/image";
import NavItems from "./NavItems";
import { buttonVariants } from "./ui/button";

const Navbar = () => {
  const user = null;
  return (
    <div className="bg-white sticky z-50 top-0 inset-x-0 h-16 shadow-sm">
      <header className="relative bg-white">
        <MaxWidthWrapper>
          <div className="flex h-16 items-center">
            <div className="ml-4 flex lg:ml-0">
              <Link href="/">
                <Image src="/logo.png" width={40} height={40} alt="" />
              </Link>
            </div>
            <div className="hidden z-50 lg:ml-8 lg:block lg:self-stretch">
              <NavItems />
            </div>

            <div className="ml-auto flex items-center">
              <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                {user ? null : (
                  <Link
                    className={buttonVariants({ variant: "ghost" })}
                    href="/sign-in"
                  >
                    Sign In
                  </Link>
                )}

                {user ? null : (
                  <span className="h-6 w-px bg-slate-200" aria-hidden="true" />
                )}

                {user ? (
                  <div></div>
                ) : (
                  <Link
                    href="sign-up"
                    className={buttonVariants({ variant: "ghost" })}
                  >
                    Create an Account
                  </Link>
                )}

                {user ? (
                  <span className="h-6 w-px bg-slate-200" aria-hidden="true" />
                ) : null}

                {user ? null : (
                  <div className="flex lg:ml-6">
                    <span
                      className="h-6 w-px bg-slate-200"
                      aria-hidden="true"
                    />
                  </div>
                )}

                <div className="ml-4 flow-root lg:ml-6">{/* <Cart /> */}</div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  );
};

export default Navbar;
