"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const SignInButton = () => {
  const router = useRouter();

  return (
    <Button
      variant={"lg"}
      className="bg-surface-dark text-on-surface-dark dark:bg-surface dark:text-on-surface"
      onClick={() => {
        router.push("/sign-in");
      }}
    >
      Sign in
    </Button>
  );
};

export default SignInButton;
