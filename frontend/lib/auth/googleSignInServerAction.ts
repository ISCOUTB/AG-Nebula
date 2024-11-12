"use server";
import { signIn } from "@/lib/auth/authConfig"

export const handleGoogleSignIn = async () => {
  try {
    await signIn("google", { redirectTo: "/playground"})
  } catch (error) {
    throw error;
  }
};
