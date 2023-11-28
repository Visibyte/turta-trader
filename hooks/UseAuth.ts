import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useAuth = () => {
  const router = useRouter();
  const logOut = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/logout`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) throw new Error();

      toast.success("Logged out successfully.");

        router.push("/");
        router.refresh()
    } catch (error) {
      toast.error("An error occurred logging out. Please try again.");
    }
    };
    
    return {logOut}
};
