"use client";
import { handleSignOut } from "@/lib/auth/signOutServerAction";
import { Button } from "@/components/ui/button";

const SignOutButton = () => {
  return (
    <Button
      variant={"lg"}
      className="w-full bg-surface-dark text-on-surface-dark dark:bg-surface-container-highest-dark dark:text-error-dark"
      onClick={() => {
        handleSignOut();
      }}
    >
      Sign Out
    </Button>
  );
};

export default SignOutButton;