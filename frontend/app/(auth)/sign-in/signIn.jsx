"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { handleGoogleSignIn } from "@/lib/auth/googleSignInServerAction";
import { ChromeIcon } from "lucide-react";
import { redirect } from "next/navigation";

const SignIn = () => {
  const isAuth = false;

  if (isAuth) {
    redirect("/playground");
  }
  return (
    <div className="grid place-items-center w-svw h-svh bg-background-material dark:bg-background-material-dark">
      <Card className="w-96">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            onClick={() => handleGoogleSignIn()}
            variant={'lg'}
            className="w-full bg-surface-container-high dark:bg-surface-container-high-dark"
          >
            Sign in with Google
            <ChromeIcon />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignIn;
